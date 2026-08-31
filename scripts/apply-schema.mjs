/**
 * Apply db/schema.sql to the database.
 *
 *   node scripts/apply-schema.mjs
 *
 * The README's `psql "$DATABASE_URL" -f db/schema.sql` is still the canonical
 * way to do this, but psql is not installed everywhere and the project already
 * depends on `pg`, so this does the same job with no extra tooling. The schema
 * is idempotent, so running it twice is safe.
 *
 * DDL goes over the SESSION-mode endpoint (Supabase's port 5432), never the
 * transaction pooler on 6543: pgbouncer in transaction mode does not keep a
 * session for the length of a multi-statement migration.
 */
import fs from 'node:fs'
import path from 'node:path'
import pg from 'pg'
import { withoutSslMode } from '../api/_lib/db.js'

function readEnvFile(file) {
  if (!fs.existsSync(file)) return {}
  const out = {}
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#') || !t.includes('=')) continue
    const [k, ...rest] = t.split('=')
    out[k] = rest.join('=').replace(/^"|"$/g, '')
  }
  return out
}

const env = { ...readEnvFile('.env.local'), ...process.env }
const url =
  env.POSTGRES_URL_NON_POOLING || env.DATABASE_URL_NON_POOLING || env.DATABASE_URL || env.POSTGRES_URL

if (!url) {
  console.error(
    'No connection string. Set POSTGRES_URL_NON_POOLING or DATABASE_URL,\n' +
      'or run `vercel env pull` to fetch the provisioned ones.',
  )
  process.exit(1)
}

const client = new pg.Client({
  connectionString: withoutSslMode(url),
  ssl: { rejectUnauthorized: false },
})
await client.connect()

const file = path.join('db', 'schema.sql')
await client.query(fs.readFileSync(file, 'utf8'))
console.log(`applied ${file}`)

const { rows } = await client.query(
  `select table_name from information_schema.tables
    where table_schema = 'public' and table_type = 'BASE TABLE' order by table_name`,
)
console.log('tables:', rows.map((r) => r.table_name).join(', ') || '(none)')

await client.end()
