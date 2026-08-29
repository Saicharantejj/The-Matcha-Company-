import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { moods, products } from '../data/products'
import SachetGraphic from './SachetGraphic'
import Magnetic from './Magnetic'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

export default function MoodMatcher() {
  const [activeId, setActiveId] = useState(moods[0].id)
  const { addItem, openCart } = useCart()
  const { notify } = useToast()
  const active = moods.find((m) => m.id === activeId)
  const activeProduct = products.find((p) => p.id === active.productId)

  const handleAdd = () => {
    if (!activeProduct) return
    addItem(activeProduct, 'sachet')
    notify(`${activeProduct.flavor} added`, { action: 'View cart', onAction: openCart })
  }

  return (
    <div className="card-hard overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b-2 border-ink p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
          <p className="font-mono text-xs uppercase tracking-widest text-olive">Mood Matcher</p>
          <h3 className="mt-2 font-display text-2xl tracking-display sm:text-3xl">
            Tell us how you feel
          </h3>
          <p className="mt-2 font-body text-sm text-ink/70">
            Five moods, five flavors. Tap one to see which sachet we'd hand you.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {moods.map((mood) => {
              const isActive = mood.id === activeId
              return (
                <button
                  key={mood.id}
                  onClick={() => setActiveId(mood.id)}
                  aria-pressed={isActive}
                  className={`relative border-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'border-ink text-cream'
                      : 'border-ink/40 text-ink/70 hover:border-ink hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 -z-10 bg-olive"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {mood.label}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-7 border-t-2 border-ink/15 pt-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-olive">
                We'd hand you
              </p>
              <h4 className="mt-1 font-display text-xl tracking-display">{active.drink}</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/75">{active.note}</p>

              <div className="mt-5">
                <Magnetic className="inline-block">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="btn-hard border-ink bg-olive text-cream"
                  >
                    <Plus size={14} strokeWidth={3} aria-hidden="true" />
                    Add This Sachet
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[280px] bg-ink">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute inset-0"
            >
              <SachetGraphic
                swatch={activeProduct?.swatch}
                badge="SACHET"
                size={activeProduct?.size}
                flavor={activeProduct?.flavor}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
