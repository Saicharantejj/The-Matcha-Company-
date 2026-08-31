/**
 * Read what the site has captured, from the terminal.
 *
 *   node scripts/orders.mjs           # the 20 most recent orders
 *   node scripts/orders.mjs 50        # the 50 most recent
 *
 * Read-only. Reads the connection string from .env.local, so run
 * `vercel env pull` first if that file is missing or stale.
 */
import fs from 'node:fs'
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
const url = env.DATABASE_URL || env.POSTGRES_URL || env.POSTGRES_URL_NON_POOLING
if (!url) {
  console.error('No connection string. Run `vercel env pull` first.')
  process.exit(1)
}

const limit = Number(process.argv[2]) || 20
const client = new pg.Client({ connectionString: withoutSslMode(url), ssl: { rejectUnauthorized: false } })
await client.connect()

const { rows: orders } = await client.query(
  `select o.reference, o.customer_name, o.email, o.phone, o.city, o.postcode,
          o.item_count, o.status, o.created_at,
          string_agg(i.name || ' x' || i.qty, ', ' order by i.id) as items
     from orders o
     left join order_items i on i.order_id = o.id
    group by o.id
    order by o.created_at desc
    limit $1`,
  [limit],
)

console.log(`\nOrders (${orders.length})`)
if (orders.length === 0) console.log('  none yet')
for (const o of orders) {
  console.log(`\n  ${o.reference}  ${o.status}  ${new Date(o.created_at).toLocaleString()}`)
  console.log(`  ${o.customer_name} · ${o.email}${o.phone ? ' · ' + o.phone : ''}`)
  console.log(`  ${o.city} ${o.postcode}`)
  console.log(`  ${o.items || '(no lines)'}`)
}

const { rows: subs } = await client.query(
  `select email, created_at, unsubscribed_at from subscribers
    order by created_at desc limit $1`,
  [limit],
)
console.log(`\n\nSubscribers (${subs.length})`)
if (subs.length === 0) console.log('  none yet')
for (const s of subs) {
  const when = new Date(s.created_at).toLocaleString()
  console.log(`  ${s.email}  ${when}${s.unsubscribed_at ? '  (unsubscribed)' : ''}`)
}

await client.end()
