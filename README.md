# The Matcha Company

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
