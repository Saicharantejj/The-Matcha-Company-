import pg from 'pg'

/**
 * One pool per warm serverless instance.
 *
 * Vercel may run many instances at once and each keeps its own pool, so the
 * connection string must point at a POOLED endpoint (Neon's `-pooler` host, or
 * Supabase's port 6543). Pointing at the direct endpoint will exhaust Postgres'
 * connection limit under any real traffic.
 *
 * POSTGRES_URL is what the Supabase marketplace integration injects, and it is
 * already the pooled 6543 endpoint. DATABASE_URL wins when both are set, so a
 * connection string set by hand still overrides the provisioned one.
 *
 * max is deliberately tiny for the same reason: the concurrency comes from
 * having many instances, not from many connections inside one.
 */
let pool

export function connectionString() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || null
}

/**
 * Drop `sslmode` from the URL.
 *
 * Supabase hands out connection strings ending `?sslmode=require`, and pg 8.16+
 * treats that as `verify-full` — it verifies the whole chain and throws
 * SELF_SIGNED_CERT_IN_CHAIN against the pooler, because this container has no
 * root for the certificate the pooler presents. The parameter also wins over
 * the ssl option below, so setting rejectUnauthorized there is not enough on
 * its own: the parameter has to go. The connection is still TLS either way;
 * what changes is whether the chain is verified against roots we do not have.
 */
export function withoutSslMode(url) {
  try {
    const u = new URL(url)
    u.searchParams.delete('sslmode')
    return u.toString()
  } catch {
    return url
  }
}

export function getPool() {
  const url = connectionString()
  if (!url) return null
  if (!pool) {
    pool = new pg.Pool({
      connectionString: withoutSslMode(url),
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
  if (!p) throw new Error('No database configured: set DATABASE_URL or POSTGRES_URL')
  return p.query(text, params)
}

/** Runs fn inside a transaction, rolling back on any throw. */
export async function transaction(fn) {
  const p = getPool()
  if (!p) throw new Error('No database configured: set DATABASE_URL or POSTGRES_URL')
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
