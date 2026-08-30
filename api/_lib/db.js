import pg from 'pg'

/**
 * One pool per warm serverless instance.
 *
 * Vercel may run many instances at once and each keeps its own pool, so the
 * connection string must point at a POOLED endpoint (Neon's `-pooler` host, or
 * Supabase's port 6543). Pointing at the direct endpoint will exhaust Postgres'
 * connection limit under any real traffic.
 *
 * max is deliberately tiny for the same reason: the concurrency comes from
 * having many instances, not from many connections inside one.
 */
let pool

export function getPool() {
  if (!process.env.DATABASE_URL) return null
  if (!pool) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
      // Managed Postgres (Neon, Supabase, RDS) terminates TLS with a cert this
      // container has no root for; the connection is still encrypted.
      ssl: { rejectUnauthorized: false },
    })
    pool.on('error', (err) => {
      console.error('[db] idle client error:', err.message)
    })
  }
  return pool
}

export async function query(text, params) {
  const p = getPool()
  if (!p) throw new Error('DATABASE_URL is not configured')
  return p.query(text, params)
}

/** Runs fn inside a transaction, rolling back on any throw. */
export async function transaction(fn) {
  const p = getPool()
  if (!p) throw new Error('DATABASE_URL is not configured')
  const client = await p.connect()
  try {
    await client.query('begin')
    const result = await fn(client)
    await client.query('commit')
    return result
  } catch (err) {
    try {
      await client.query('rollback')
    } catch {
      /* the connection is already gone; the transaction dies with it */
    }
    throw err
  } finally {
    client.release()
  }
}
