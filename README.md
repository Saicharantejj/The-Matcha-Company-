# Drink Yojo

A multi-page marketing site for a fictional matcha-sachet brand, built with React, React Router, Tailwind CSS, and Framer Motion. The catalog is single-serve flavored matcha sachets (Strawberry, Blueberry, Mango, Ube, Vanilla) — no made-to-order drinks, no prices shown. Design is driven entirely by the token system in `src/index.css` / `tailwind.config.js` — camel ground, cream cards, chocolate ink, deep olive actions, moss/matcha fills, hard 3–4px corners, and a Josefin Sans / Instrument Sans / Courier Prime type system.

## Quick start

```bash
npm install
npm run dev       # local dev server (Vite)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

Requires Node 18+.

## Pages

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/pages/Home.jsx` | 50/50 hero (with the attached iced-matcha photo + scroll parallax), Mood Matcher tabs, tagline ticker, Featured Flavors grid |
| `/matchas` | `src/pages/Matchas.jsx` | All 5 sachet flavors as a single catalog grid |
| `/diy-kits` | `src/pages/DiyKits.jsx` | Recipe kits, each built around one flavor sachet, with expandable "what's included" checklists |
| `/matcha-kits` | `src/pages/MatchaKits.jsx` | Sachet packs & bundles (discovery pack, gift box, bulk case, etc.) with breakdowns |
| `/our-story` | `src/pages/OurStory.jsx` | Editorial layout, split-screen blocks, interactive Uji timeline, sourcing philosophy |

## Structure

```
src/
  assets/            hero product photo
  components/        Header, Footer, Marquee, ProductCard, MoodMatcher, SachetGraphic,
                      FieldGraphic, Reveal (scroll-in animation helpers), PageShell
  data/products.js    all product / kit / mood copy in one place — edit here to
                      change flavors, tags, or catalog contents (no price fields)
  pages/              one file per route
  App.jsx             router + AnimatePresence page transitions + cart state
  index.css           design tokens, base styles, .btn-hard / .card-hard / .tag-outline
```

## Notes

- No prices are shown anywhere on the site by design — cards keep an "Add to Cart" action,
  ready to wire up to real pricing/checkout whenever that's decided.
- Product imagery for the catalog, DIY kits and bundles is rendered as stylized inline SVG
  sachets (`SachetGraphic.jsx`) and field/leaf motifs (`FieldGraphic.jsx`) rather than stock
  photos, color-matched to the palette. Swap in real packaging photography by replacing the
  `<SachetGraphic />` usages with `<img>` tags.
- Cart state is in-memory only (lifted in `App.jsx`) — there's no checkout flow, just an
  "Add to Cart" counter in the header, ready to wire up to a real cart/store.
- `rounded-full` is remapped to 4px in `tailwind.config.js` so no accidental pill shapes
  can slip in.

## Backend — order capture

Orders and newsletter signups are handled by two Vercel Functions in `api/`,
backed by Postgres. There are no payments: an order is a request that you
confirm by email.

```
api/orders.js        POST — validate, save, email customer + owner
api/subscribe.js     POST — newsletter signup
api/_lib/            db pool, validation, email, http helpers
db/schema.sql        run once against your database
scripts/             apply-schema.mjs — runs db/schema.sql without psql
                     orders.mjs       — read captured orders and subscribers
```

### Setup

1. **Create a Postgres database.** The site runs on Supabase, provisioned
   through the Vercel Marketplace (`vercel integration add supabase --plan free
   -m region=bom1`), which injects `POSTGRES_URL` and friends into the project.
   Neon or any other Postgres works too — set `DATABASE_URL` by hand instead.
2. **Run the schema** — it is idempotent, so re-running is safe:
   ```sh
   node scripts/apply-schema.mjs     # reads .env.local, no psql needed
   psql "$DATABASE_URL" -f db/schema.sql   # or the same thing with psql
   ```
3. **Set the environment variables** in Vercel → Settings → Environment
   Variables. See `.env.example` for the full list and what each one does.

The connection string **must be pooled** — Neon's `-pooler` host, or Supabase's
port 6543, which is what the integration's `POSTGRES_URL` already points at. Every warm serverless instance opens its own pool, so
a direct connection will exhaust Postgres' connection limit under real traffic.

Email is optional. With `RESEND_API_KEY` unset, orders are still saved
normally; the emails are skipped and the skip is logged. That way the site
works before the mail domain is verified.

### Design notes

- The client posts product **ids and quantities only**. Names and kinds are
  re-derived server-side from `src/data/products.js`, so a tampered request
  cannot invent a product, rename one, or inject markup into the email.
- The cart is only cleared once the server has accepted the order, so a failed
  request leaves the visitor their cart to retry with.
- Email is best-effort and never fails the request: the order is already
  committed, and telling somebody it failed invites a duplicate.
- Both forms carry an off-screen honeypot field, and both endpoints are
  throttled per IP in Postgres (in-memory counters are useless across
  serverless instances).
