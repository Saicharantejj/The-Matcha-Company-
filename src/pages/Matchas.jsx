import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

// Every distinct tag across the catalog, in first-seen order.
const ALL_TAGS = [...new Set(products.flatMap((p) => p.tags ?? []))]

export default function Matchas() {
  const [active, setActive] = useState(null)

  const visible = useMemo(
    () => (active ? products.filter((p) => p.tags?.includes(active)) : products),
    [active],
  )

  return (
    <PageShell>
      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-olive">Five Flavors</p>
            <h1 className="mt-2 font-display text-4xl tracking-display sm:text-5xl">Our Matchas</h1>
            <p className="mt-4 max-w-xl font-body text-base text-ink/75">
              Stone-ground matcha, sourced from Uji, Kyoto — blended into single-serve sachets.
              Tear, stir into milk or water, and skip the ceremony entirely.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/50">
                <SlidersHorizontal size={12} strokeWidth={2.5} aria-hidden="true" />
                Filter
              </span>
              <FilterChip label="All" isActive={active === null} onClick={() => setActive(null)} />
              {ALL_TAGS.map((tag) => (
                <FilterChip
                  key={tag}
                  label={tag}
                  isActive={active === tag}
                  onClick={() => setActive(active === tag ? null : tag)}
                />
              ))}
            </div>
            <p
              aria-live="polite"
              className="font-mono text-xs uppercase tracking-widest text-ink/50"
            >
              {visible.length} {visible.length === 1 ? 'flavor' : 'flavors'}
            </p>
          </Reveal>

          {/* `layout` on each item makes the grid reflow fluidly when the
              filter changes, rather than snapping to the new arrangement. */}
          <motion.div layout className="mt-6 grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p className="pb-20 font-body text-sm text-ink/60">
              No sachets carry that tag yet.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  )
}

function FilterChip({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`relative border-2 border-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
        isActive ? 'text-cream' : 'text-ink/70 hover:text-ink'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 -z-10 bg-olive"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      )}
      {label}
    </button>
  )
}
