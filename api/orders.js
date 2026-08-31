import { randomBytes } from 'node:crypto'
import { transaction, getPool } from './_lib/db.js'
import { send, methodNotAllowed, clientIp, isRateLimited, readJson } from './_lib/http.js'
import { validateOrder } from './_lib/validate.js'
import { sendCustomerConfirmation, sendOwnerNotification } from './_lib/email.js'

// Crockford-ish alphabet: no I, O, U or 1, so a reference read down a phone
// line or copied off a screen cannot be mistyped into a different valid one.
const ALPHABET = '23456789ACDEFGHJKLMNPQRSTVWXYZ'

function makeReference() {
  const bytes = randomBytes(6)
  let out = ''
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length]
  return `YOJO-${out}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST'])

  if (!getPool()) {
    // Never pretend an order was taken when there is nowhere to put it.
    console.error('[orders] no database configured (DATABASE_URL or POSTGRES_URL)')
    return send(res, 503, { error: 'orders_unavailable' })
  }

  const body = await readJson(req)
  if (!body) return send(res, 400, { error: 'body_invalid' })

  const { errors, order } = validateOrder(body)
  if (errors) return send(res, 400, { error: 'validation_failed', fields: errors })

  const limited = await isRateLimited(`orders:${clientIp(req)}`, {
    limit: 8,
    windowSeconds: 600,
  })
  if (limited) return send(res, 429, { error: 'too_many_requests' })

  // Retry only on a reference collision, which the unique index enforces.
  // Everything else is a real failure and should surface immediately.
  let saved = null
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const reference = makeReference()
    try {
      await transaction(async (client) => {
        const { rows } = await client.query(
          `insert into orders
             (reference, customer_name, email, phone, address, city, postcode, notes, item_count)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
           returning id`,
          [
            reference,
            order.customerName,
            order.email,
            order.phone,
            order.address,
            order.city,
            order.postcode,
            order.notes,
            order.itemCount,
          ],
        )
        const orderId = rows[0].id

        // One multi-row insert rather than a query per line.
        const values = []
        const params = []
        order.items.forEach((item, i) => {
          const o = i * 5
          values.push(`($${o + 1},$${o + 2},$${o + 3},$${o + 4},$${o + 5})`)
          params.push(orderId, item.id, item.name, item.kind, item.qty)
        })
        await client.query(
          `insert into order_items (order_id, product_id, name, kind, qty)
           values ${values.join(',')}`,
          params,
        )
      })
      saved = { ...order, reference }
      break
    } catch (err) {
      if (err?.code === '23505' && attempt < 3) continue // duplicate reference
      console.error('[orders] insert failed:', err.message)
      return send(res, 500, { error: 'order_failed' })
    }
  }

  if (!saved) return send(res, 500, { error: 'order_failed' })

  // The order is committed from here on, so nothing below may turn into a
  // failure response. Mail is best-effort: a provider outage must not tell the
  // customer their order failed and invite them to place it twice. Failures are
  // logged for follow-up instead.
  const [customer, owner] = await Promise.all([
    sendCustomerConfirmation(saved),
    sendOwnerNotification(saved),
  ])
  if (!customer.ok) console.error('[orders] customer email failed:', customer.error)
  if (!owner.ok) console.error('[orders] owner email failed:', owner.error)

  return send(res, 201, {
    reference: saved.reference,
    itemCount: saved.itemCount,
    emailed: customer.ok,
  })
}

