import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { moods } from '../data/products'
import { useShopifyProducts } from '../context/ShopifyContext'
import FlavorPlate from './FlavorPlate'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { useMetaPixelProductView } from '../lib/metaPixel'

export default function MoodMatcher() {
  const { products } = useShopifyProducts()
  const [activeId, setActiveId] = useState(moods[0].id)
  const { addItem, openCart } = useCart()
  const { notify } = useToast()
  const active = moods.find((m) => m.id === activeId)
  const activeProduct = products.find((p) => p.id === active.productId) || products[0]
  const productRef = useMetaPixelProductView(activeProduct)

  const handleAdd = () => {
    if (!activeProduct) return
    addItem(activeProduct, 'sachet')
    notify(`${activeProduct.flavor} added`, { action: 'View cart', onAction: openCart })
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      {/* Mood Selector Buttons List */}
      <ul className="lg:col-span-5 space-y-3">
        {moods.map((mood, i) => {
          const isActive = mood.id === activeId
          return (
            <li key={mood.id}>
              <button
                type="button"
                onClick={() => setActiveId(mood.id)}
                aria-pressed={isActive}
                className={`flex w-full items-center justify-between p-4 sm:p-5 rounded-xl text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-[#4E6B3E] text-[#F8F5EB] shadow-lg translate-x-2'
                    : 'bg-[#F8F5EB]/60 text-[#232E1E] hover:bg-[#F8F5EB] border border-[#232E1E]/10 hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm font-bold ${isActive ? 'text-[#C4D2B8]' : 'text-[#4E6B3E]'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`font-display text-2xl ${isActive ? 'text-[#F8F5EB]' : 'text-[#232E1E]'}`}>
                    {mood.label}
                  </span>
                </div>
                <span className={`text-lg transition-transform ${isActive ? 'translate-x-1 text-[#F8F5EB]' : 'text-[#4E6B3E]'}`}>
                  &rarr;
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Recommended Sachet Showcase Box */}
      <div className="lg:col-span-7">
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#4E6B3E]/20 shadow-xl bg-[#F8F5EB]/95">
          <div className="grid gap-8 sm:grid-cols-12 items-center">
            {/* Product Image */}
            <div ref={productRef} className="sm:col-span-6 aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#E9E7D0]/60 p-3 border border-[#232E1E]/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full w-full"
                >
                  <FlavorPlate item={activeProduct ?? {}} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Recommendation Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="sm:col-span-6 flex flex-col justify-between"
              >
                <div>
                  <span className="spec text-[#4E6B3E] px-3 py-1 bg-[#C4D2B0]/40 rounded-full border border-[#4E6B3E]/20 inline-block mb-3">
                    Recommended Match
                  </span>
                  <h4 className="font-display text-3xl text-[#232E1E]">{active.drink}</h4>
                  <p className="mt-4 font-body text-sm leading-relaxed text-[#232E1E]/80">{active.note}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#232E1E]/10">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="btn w-full border-[#4E6B3E] bg-[#4E6B3E] text-[#F8F5EB] shadow-md hover:bg-[#232E1E]"
                  >
                    Add {activeProduct?.flavor} Sachet &rarr;
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
