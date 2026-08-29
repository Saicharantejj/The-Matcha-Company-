import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, Package } from 'lucide-react'
import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import SachetGraphic from '../components/SachetGraphic'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { matchaKits } from '../data/products'

// How many sachets each bundle contains — drives the running total below.
const SACHET_COUNT = {
  'discovery-pack': 5,
  'gift-edition': 15,
  'cafe-bulk-case': 100,
  'single-flavor-10pack': 10,
  'travel-pack': 5,
  'monthly-flavor-box': 20,
}

function KitBundleCard({ kit, qty, onQty }) {
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) addItem(kit, 'bundle')
    notify(`${kit.name} ×${qty} added`, { action: 'View cart', onAction: openCart })
  }

  return (
    <StaggerItem>
      <div className="card-hard grid grid-cols-1 overflow-hidden sm:grid-cols-5">
        <div className="border-b-2 border-ink sm:col-span-2 sm:border-b-0 sm:border-r-2">
          <div className="aspect-[4/3] h-full w-full sm:aspect-auto">
            <SachetGraphic swatch={kit.swatch} badge={kit.badge} flavor={kit.flavor} />
          </div>
        </div>

        <div className="flex flex-col p-6 sm:col-span-3">
          <h3 className="font-display text-xl tracking-display">{kit.name}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{kit.blurb}</p>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-olive">
            Bundle Breakdown
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {kit.items.map((item) => (
              <li key={item} className="flex items-start gap-2 font-body text-sm text-ink/80">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-olive" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center border-2 border-ink">
              <button
                type="button"
                onClick={() => onQty(Math.max(1, qty - 1))}
                aria-label={`Fewer ${kit.name}`}
                className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <Minus size={13} strokeWidth={3} aria-hidden="true" />
              </button>
              <span className="min-w-[2.5rem] border-x-2 border-ink px-2 text-center font-mono text-xs tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => onQty(qty + 1)}
                aria-label={`More ${kit.name}`}
                className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <Plus size={13} strokeWidth={3} aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="btn-hard border-ink bg-olive text-cream"
            >
              Add Bundle to Cart
            </button>
          </div>
        </div>
      </div>
    </StaggerItem>
  )
}

export default function MatchaKits() {
  const [quantities, setQuantities] = useState({})
  const qtyOf = (id) => quantities[id] ?? 1

  // Running total across whatever the visitor has dialled up, so the effect of
  // the steppers is visible before anything reaches the cart.
  const totals = useMemo(() => {
    let bundles = 0
    let sachets = 0
    for (const kit of matchaKits) {
      const q = quantities[kit.id]
      if (!q) continue
      bundles += q
      sachets += q * (SACHET_COUNT[kit.id] ?? 0)
    }
    return { bundles, sachets }
  }, [quantities])

  return (
    <PageShell>
      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-olive">
              Sachet Packs &amp; Bundles
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-display sm:text-5xl">Matcha Kits</h1>
            <p className="mt-4 max-w-xl font-body text-base text-ink/75">
              Discovery packs, gift boxes, and bulk cases — sachets bundled by the occasion, for
              first-timers, gifting, and café-scale setups alike.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          {/* Bundle calculator — sticks to the top so the running total stays
              visible while you dial the quantities below it. */}
          <div className="sticky top-[104px] z-20 mb-8">
            <motion.div
              layout
              className="flex flex-wrap items-center justify-between gap-4 border-2 border-ink bg-card px-5 py-4"
              style={{ boxShadow: '4px 4px 0px 0px #4C382C' }}
            >
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/55">
                <Package size={13} strokeWidth={2.5} aria-hidden="true" />
                Bundle calculator
              </p>
              <div className="flex items-center gap-6">
                <Stat value={totals.bundles} label={totals.bundles === 1 ? 'bundle' : 'bundles'} />
                <div className="h-8 w-px bg-ink/20" />
                <Stat value={totals.sachets} label="sachets total" />
              </div>
            </motion.div>
          </div>

          <StaggerGroup className="flex flex-col gap-6 pb-6" stagger={0.1}>
            {matchaKits.map((kit) => (
              <KitBundleCard
                key={kit.id}
                kit={kit}
                qty={qtyOf(kit.id)}
                onQty={(q) => setQuantities((prev) => ({ ...prev, [kit.id]: q }))}
              />
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageShell>
  )
}

function Stat({ value, label }) {
  return (
    <div className="text-right">
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className="font-display text-2xl tabular-nums tracking-display text-olive"
      >
        {value}
      </motion.p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/55">{label}</p>
    </div>
  )
}
