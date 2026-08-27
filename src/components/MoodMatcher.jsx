import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { moods, products } from '../data/products'
import SachetGraphic from './SachetGraphic'
import { useCart } from '../context/CartContext'

export default function MoodMatcher() {
  const [activeId, setActiveId] = useState(moods[0].id)
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCart()
  const active = moods.find((m) => m.id === activeId)
  const activeProduct = products.find((p) => p.id === active.productId)

  const handleAdd = () => {
    if (!activeProduct) return
    addItem(activeProduct, 'sachet')
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="card-hard overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b border-chocolate p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="font-mono text-xs uppercase tracking-widest text-moss">Mood Matcher</p>
          <h3 className="mt-2 font-display text-2xl tracking-display sm:text-3xl">
            Tell us how you feel
          </h3>
          <p className="mt-2 font-body text-sm text-chocolate/70">
            Five moods, five flavors. Tap one to see which sachet we'd hand you.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {moods.map((mood) => {
              const isActive = mood.id === activeId
              return (
                <button
                  key={mood.id}
                  onClick={() => setActiveId(mood.id)}
                  className={`relative border px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'border-chocolate bg-olive text-cream'
                      : 'border-chocolate/40 bg-transparent text-chocolate/70 hover:border-chocolate hover:text-chocolate'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mood-pill"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-7 border-t border-chocolate/15 pt-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-moss">We'd hand you</p>
              <h4 className="mt-1 font-display text-xl tracking-display">{active.drink}</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-chocolate/75">{active.note}</p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn-hard border-chocolate bg-olive text-cream"
                >
                  {added ? 'Added ✓' : 'Add This Sachet'}
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
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[260px] bg-chocolate">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
