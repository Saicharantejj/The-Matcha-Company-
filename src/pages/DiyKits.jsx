import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Clock, Plus, Utensils } from 'lucide-react'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import SachetGraphic from '../components/SachetGraphic'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { diyKits } from '../data/products'

const DIFFICULTY_COLOR = {
  EASY: 'bg-moss text-cream',
  MEDIUM: 'bg-olive text-cream',
  HARD: 'bg-ink text-cream',
}

function KitCard({ kit, index = 0 }) {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(() => new Set())
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleAdd = () => {
    addItem(kit, 'diy-kit')
    notify(`${kit.name} added`, { action: 'View cart', onAction: openCart })
  }

  const toggle = (item) =>
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(item) ? next.delete(item) : next.add(item)
      return next
    })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {/* Hover lift is pure CSS — no per-pointer-move JS, no 3D layer. */}
      <div className="card-hard group flex h-full flex-col overflow-hidden">
        <div className="aspect-[16/10] w-full border-b-2 border-ink">
          <SachetGraphic swatch={kit.swatch} badge={kit.badge} flavor={kit.flavor} />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg tracking-display">{kit.name}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-bark">{kit.blurb}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="tag-outline flex items-center gap-1.5">
              <Clock size={11} strokeWidth={2.5} aria-hidden="true" />
              {kit.prepTime}
            </span>
            <span
              className={`border-2 border-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
                DIFFICULTY_COLOR[kit.difficulty] || ''
              }`}
            >
              {kit.difficulty}
            </span>
            <span className="tag-outline flex items-center gap-1.5">
              <Utensils size={11} strokeWidth={2.5} aria-hidden="true" />
              {kit.servings}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-5 flex items-center justify-between border-t-2 border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-widest text-olive"
          >
            What's Included
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
              <ChevronDown size={15} strokeWidth={2.5} aria-hidden="true" />
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
                  {kit.includes.map((item) => {
                    const isChecked = checked.has(item)
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => toggle(item)}
                          aria-pressed={isChecked}
                          className="flex w-full items-start gap-2.5 text-left font-body text-sm text-bark"
                        >
                          <span
                            className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center border-2 border-ink transition-colors ${
                              isChecked ? 'bg-moss text-cream' : 'bg-transparent'
                            }`}
                          >
                            {isChecked && <Check size={10} strokeWidth={3.5} aria-hidden="true" />}
                          </span>
                          <span className={isChecked ? 'line-through opacity-55' : ''}>{item}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-5">
            <button
              type="button"
              onClick={handleAdd}
              className="btn-hard w-full border-ink bg-olive text-cream"
            >
              <Plus size={14} strokeWidth={3} aria-hidden="true" />
              Add Kit to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DiyKits() {
  return (
    <PageShell>
      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-olive">Make It Yourself</p>
            <h1 className="mt-2 font-display text-4xl tracking-display sm:text-5xl">DIY Kits</h1>
            <p className="mt-4 max-w-xl font-body text-base text-bark">
              Each kit builds one recipe around a flavor sachet — pre-portioned, no whisk or
              ceremony required. Just what you need, plus a recipe card.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="font-mono text-xs uppercase tracking-widest text-bark">
              {diyKits.length} {diyKits.length === 1 ? 'kit' : 'kits'}
            </p>
          </Reveal>

          {/* `layout` on each item makes the grid reflow fluidly if the set ever
              changes, rather than snapping to the new arrangement. */}
          <motion.div layout className="mt-6 grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {diyKits.map((kit, i) => (
                <motion.div
                  key={kit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                >
                  <KitCard kit={kit} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageShell>
  )
}
