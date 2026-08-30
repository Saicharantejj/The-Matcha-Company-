import { query } from './db.js'

export function send(res, status, body) {
  // Standard Node fields only. `res.status()` exists on Vercel's Node runtime
  // (it augments res the way Express does) but not on a plain http.Server,
  // which makes handlers untestable outside the platform and would break under
  // any other runtime.
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  // These endpoints are same-origin and must never be cached.
  res.setHeader('cache-control', 'no-store')
  res.end(JSON.stringify(body))
}

export function methodNotAllowed(res, allowed) {
  res.setHeader('allow', allowed.join(', '))
  return send(res, 405, { error: 'method_not_allowed' })
}

/**
 * Best-effort client IP. x-forwarded-for is set by Vercel's edge; the leftmost
 * entry is the original client. It is spoofable in general, which is why this
 * is only ever used for throttling and never for authorisation.
 */
export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

/**
 * Fixed-window throttle, counted in Postgres so it holds across instances.
 *
 * Returns true when the caller is over the limit. A throttle that cannot reach
 * the database fails OPEN: losing a genuine order is worse than serving one
 * extra request to somebody hammering the endpoint.
 */
export async function isRateLimited(bucketKey, { limit, windowSeconds }) {
  try {
    const { rows } = await query(
      `insert into rate_limit (bucket, window_start, count)
       values ($1, to_timestamp(floor(extract(epoch from now()) / $2) * $2), 1)
       on conflict (bucket, window_start)
         do update set count = rate_limit.count + 1
       returning count`,
      [bucketKey, windowSeconds],
    )
    return (rows[0]?.count ?? 0) > limit
  } catch (err) {
    console.error('[rate-limit] check failed, allowing request:', err.message)
    return false
  }
}

/** Body may arrive parsed or raw depending on runtime; handle both. */
export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }
  const chunks = []
  let bytes = 0
  for await (const chunk of req) {
    bytes += chunk.length
    // Refuse to buffer an unbounded body.
    if (bytes > 64 * 1024) return null
    chunks.push(chunk)
  }
  if (!chunks.length) return null
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return null
  }
}
