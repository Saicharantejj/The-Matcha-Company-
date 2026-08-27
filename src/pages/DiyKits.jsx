import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import SachetGraphic from '../components/SachetGraphic'
import { diyKits } from '../data/products'

const DIFFICULTY_COLOR = {
  EASY: 'bg-matcha text-chocolate',
  MEDIUM: 'bg-moss text-cream',
  HARD: 'bg-chocolate text-cream',
}

function KitCard({ kit, index, onAdd }) {
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    onAdd?.(kit)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="card-hard flex flex-col overflow-hidden"
    >
      <div className="aspect-[16/10] w-full border-b border-chocolate">
        <SachetGraphic swatch={kit.swatch} badge={kit.badge} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg tracking-display">{kit.name}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-chocolate/70">{kit.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="tag-outline">⏱ {kit.prepTime}</span>
          <span className={`border border-chocolate px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${DIFFICULTY_COLOR[kit.difficulty] || ''}`}>
            {kit.difficulty}
          </span>
          <span className="tag-outline">{kit.servings}</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-5 flex items-center justify-between border-t border-chocolate/15 pt-4 font-mono text-[11px] uppercase tracking-widest text-olive"
        >
          What's Included
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-base leading-none">
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="mt-3 space-y-2">
                {kit.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-sm text-chocolate/80">
                    <span className="mt-1 h-3 w-3 flex-shrink-0 border border-chocolate bg-matcha" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleAdd}
          className="btn-hard mt-5 w-full border-chocolate bg-olive text-cream"
        >
          {added ? 'Added ✓' : 'Add Kit to Cart'}
        </button>
      </div>
    </motion.div>
  )
}

export default function DiyKits({ onAddToCart }) {
  return (
    <PageShell>
      <section className="border-b border-chocolate bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-moss">Make It Yourself</p>
            <h1 className="mt-2 font-display text-4xl tracking-display sm:text-5xl">DIY Kits</h1>
            <p className="mt-4 max-w-xl font-body text-base text-chocolate/75">
              Each kit builds one recipe around a flavor sachet — pre-portioned, no whisk or
              ceremony required. Just what you need, plus a recipe card.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <StaggerGroup className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
            {diyKits.map((kit, i) => (
              <StaggerItem key={kit.id}>
                <KitCard kit={kit} index={i} onAdd={onAddToCart} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageShell>
  )
}
