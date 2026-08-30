import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { moods, products } from '../data/products'
import FlavorPlate from './FlavorPlate'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

/**
 * Picking a flavour by mood.
 *
 * Was a bordered box containing a second bordered box, with the moods as a row
 * of pills that slid a green lozenge around on a spring. The lozenge is gone —
 * it was the bounciest thing on the site and it existed to decorate a radio
 * group — and so is the outer box. The moods are now a list you read down, the
 * active one held in olive, with the recommendation opposite.
 */
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
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
      <ul className="lg:col-span-5">
        {moods.map((mood, i) => {
          const isActive = mood.id === activeId
          return (
            <li key={mood.id} className="rule first:border-t-0">
              <button
                type="button"
                onClick={() => setActiveId(mood.id)}
                aria-pressed={isActive}
                className="flex w-full items-baseline gap-5 py-4 text-left"
              >
                <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`font-display text-xl tracking-display transition-colors duration-300 ${
                    isActive ? 'text-olive' : 'text-cocoa hover:text-olive'
                  }`}
                >
                  {mood.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="lg:col-span-7 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="aspect-[4/5] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <FlavorPlate item={activeProduct ?? {}} />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-col lg:mt-0"
          >
            <p className="spec text-olive">We&rsquo;d hand you</p>
            <h4 className="mt-3 font-display text-xl tracking-display">{active.drink}</h4>
            <p className="mt-3 font-body text-sm leading-relaxed text-bark">{active.note}</p>
            <button
              type="button"
              onClick={handleAdd}
              className="link-draw mt-6 self-start font-mono text-spec uppercase"
            >
              Add this sachet
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
