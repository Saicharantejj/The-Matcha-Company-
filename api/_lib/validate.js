import { products, diyKits, matchaKits } from '../../src/data/products.js'

/**
 * The server's copy of the catalog, keyed by id.
 *
 * The client posts ids and quantities only. Names and kinds are re-derived
 * here rather than trusted from the request, so a tampered payload cannot
 * invent a product, rename one, or smuggle markup into the confirmation email.
 */
const CATALOG = new Map([
  ...products.map((p) => [p.id, { name: p.name, kind: 'sachet' }]),
  ...diyKits.map((k) => [k.id, { name: k.name, kind: 'diy-kit' }]),
  ...matchaKits.map((k) => [k.id, { name: k.name, kind: 'bundle' }]),
])

export const MAX_LINE_QTY = 99
export const MAX_LINES = 40

// Deliberately permissive: the only reliable test of an address is sending to
// it. This rejects the obviously-not-an-address, nothing more.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function str(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function field(errors, key, value, { required = true, max, min = 1 } = {}) {
  const v = str(value)
  if (!v) {
    if (required) errors.push(`${key}_required`)
    return null
  }
  if (v.length < min) errors.push(`${key}_too_short`)
  if (max && v.length > max) errors.push(`${key}_too_long`)
  return v
}

export function validateEmail(value) {
  const v = str(value).toLowerCase()
  if (!v) return { error: 'email_required' }
  if (v.length > 254 || !EMAIL_RE.test(v)) return { error: 'email_invalid' }
  return { email: v }
}

/**
 * Validates an order payload and resolves its lines against the catalog.
 * Returns { errors } or { order } — never partially-valid data.
 */
export function validateOrder(body) {
  const errors = []
  if (!body || typeof body !== 'object') return { errors: ['body_invalid'] }

  // Honeypot: a real person never sees or fills this field.
  if (str(body.company)) return { errors: ['rejected'] }

  const customerName = field(errors, 'name', body.name, { max: 120, min: 2 })
  const address = field(errors, 'address', body.address, { max: 300, min: 5 })
  const city = field(errors, 'city', body.city, { max: 120 })
  const postcode = field(errors, 'postcode', body.postcode, { max: 20 })
  const phone = field(errors, 'phone', body.phone, { required: false, max: 40 })
  const notes = field(errors, 'notes', body.notes, { required: false, max: 1000 })

  const emailResult = validateEmail(body.email)
  if (emailResult.error) errors.push(emailResult.error)

  const rawItems = Array.isArray(body.items) ? body.items : null
  if (!rawItems || rawItems.length === 0) errors.push('items_required')
  else if (rawItems.length > MAX_LINES) errors.push('items_too_many')

  const items = []
  if (rawItems) {
    const seen = new Set()
    for (const raw of rawItems.slice(0, MAX_LINES)) {
      const id = str(raw?.id)
      const known = CATALOG.get(id)
      if (!known) {
        errors.push('item_unknown')
        continue
      }
      // Collapse duplicate ids rather than writing two rows for one product.
      if (seen.has(id)) continue
      seen.add(id)

      const qty = Number(raw?.qty)
      if (!Number.isInteger(qty) || qty < 1 || qty > MAX_LINE_QTY) {
        errors.push('item_qty_invalid')
        continue
      }
      items.push({ id, qty, name: known.name, kind: known.kind })
    }
    if (items.length === 0 && !errors.includes('items_required')) {
      errors.push('items_required')
    }
  }

  if (errors.length) return { errors: [...new Set(errors)] }

  return {
    order: {
      customerName,
      email: emailResult.email,
      phone,
      address,
      city,
      postcode,
      notes,
      items,
      itemCount: items.reduce((sum, i) => sum + i.qty, 0),
    },
  }
}
