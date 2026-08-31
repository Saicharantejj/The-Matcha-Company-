import { query, getPool } from './_lib/db.js'
import { send, methodNotAllowed, clientIp, isRateLimited, readJson } from './_lib/http.js'
import { validateEmail } from './_lib/validate.js'
import { sendSubscribeNotification } from './_lib/email.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST'])

  if (!getPool()) {
    console.error('[subscribe] no database configured (DATABASE_URL or POSTGRES_URL)')
    return send(res, 503, { error: 'subscribe_unavailable' })
  }

  const body = await readJson(req)
  if (!body) return send(res, 400, { error: 'body_invalid' })
  if (typeof body.company === 'string' && body.company.trim()) {
    // Honeypot. Answer 200 so a bot learns nothing from the response.
    return send(res, 200, { subscribed: true })
  }

  const { email, error } = validateEmail(body.email)
  if (error) return send(res, 400, { error })

  if (await isRateLimited(`subscribe:${clientIp(req)}`, { limit: 5, windowSeconds: 600 })) {
    return send(res, 429, { error: 'too_many_requests' })
  }

  try {
    // Signing up twice is not an error, and re-subscribing should undo a
    // previous unsubscribe rather than fail on the unique index.
    const { rows } = await query(
      `insert into subscribers (email)
       values ($1)
       on conflict (lower(email))
         do update set unsubscribed_at = null
       returning (xmax = 0) as is_new`,
      [email],
    )
    if (rows[0]?.is_new) {
      const notified = await sendSubscribeNotification(email)
      if (!notified.ok && !notified.skipped) {
        console.error('[subscribe] notification failed:', notified.error)
      }
    }
    return send(res, 200, { subscribed: true })
  } catch (err) {
    console.error('[subscribe] failed:', err.message)
    return send(res, 500, { error: 'subscribe_failed' })
  }
}
