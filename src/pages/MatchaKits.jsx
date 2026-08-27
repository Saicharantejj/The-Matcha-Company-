import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import { useState } from 'react'
import SachetGraphic from '../components/SachetGraphic'
import { useCart } from '../context/CartContext'
import { matchaKits } from '../data/products'

function KitBundleCard({ kit }) {
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCart()

  const handleAdd = () => {
    addItem(kit, 'bundle')
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <StaggerItem>
      <motion.div className="card-hard group grid grid-cols-1 overflow-hidden sm:grid-cols-5">
        <div className="border-b border-chocolate sm:col-span-2 sm:border-b-0 sm:border-r">
          <div className="aspect-[4/3] h-full w-full sm:aspect-auto">
            <SachetGraphic swatch={kit.swatch} badge={kit.badge} flavor={kit.flavor} />
          </div>
        </div>

        <div className="flex flex-col p-6 sm:col-span-3">
          <h3 className="font-display text-xl tracking-display">{kit.name}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-chocolate/70">{kit.blurb}</p>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-moss">
            Bundle Breakdown
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {kit.items.map((item) => (
              <li key={item} className="flex items-start gap-2 font-body text-sm text-chocolate/80">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-olive" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleAdd}
              className="btn-hard w-full border-chocolate bg-olive text-cream sm:w-auto"
            >
              {added ? 'Added ✓' : 'Add Bundle to Cart'}
            </button>
            {added && (
              <button
                type="button"
                onClick={openCart}
                className="font-mono text-[10px] uppercase tracking-widest text-olive underline underline-offset-4 hover:text-chocolate"
              >
                View cart
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  )
}

export default function MatchaKits() {
  return (
    <PageShell>
      <section className="border-b border-chocolate bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-moss">Sachet Packs &amp; Bundles</p>
            <h1 className="mt-2 font-display text-4xl tracking-display sm:text-5xl">Matcha Kits</h1>
            <p className="mt-4 max-w-xl font-body text-base text-chocolate/75">
              Discovery packs, gift boxes, and bulk cases — sachets bundled by the occasion, for
              first-timers, gifting, and café-scale setups alike.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <StaggerGroup className="flex flex-col gap-6 pb-6" stagger={0.1}>
            {matchaKits.map((kit) => (
              <KitBundleCard key={kit.id} kit={kit} />
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageShell>
  )
}
