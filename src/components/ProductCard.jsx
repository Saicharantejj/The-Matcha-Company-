import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) return null

  const name = product.title || product.name || product.flavor || 'CHASKA Makhana'
  const handle = product.handle || product.id
  const productUrl = `/products/${handle}`

  const isAvailable = Boolean(product.availableForSale)

  const handleAdd = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAvailable) {
      addToast(`${name} is currently sold out.`, 'error')
      return
    }

    setIsAdding(true)
    try {
      await addItem(product, 1)
      setIsAdded(true)
      addToast(`${name} added to stash! 🍿`, 'success')
      setTimeout(() => {
        setIsAdded(false)
        setIsAdding(false)
      }, 1200)
    } catch {
      setIsAdding(false)
      addToast('Could not add to cart. Please try again.', 'error')
    }
  }

  const priceFormatted = product.displayPrice || (typeof product.price === 'number' ? `₹${Math.round(product.price)}` : `₹${product.price || 199}`)
  const mrpFormatted = product.mrp && product.mrp > product.price ? (product.displayMrp || `₹${Math.round(product.mrp)}`) : null
  const discount = product.discount || (product.mrp && product.mrp > product.price ? `${Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF` : null)

  const handleLower = (handle || '').toLowerCase()
  const photoKey = handleLower.includes('cheese') ? 'chillyCheesePack'
    : handleLower.includes('pudhina') ? 'pudhinaPack'
    : handleLower.includes('lime') ? 'yellowBasket'
    : handleLower.includes('garlic') ? 'meshBagIngredients'
    : handleLower.includes('peri-peri') ? 'periPeriPack'
    : handleLower.includes('try-all-5') || handleLower.includes('box') ? 'stashBox'
    : 'masalaPouchHero'

  const photoObj = photos[photoKey] || photos.brandPoster
  const displayImage = product.image || (product.images && product.images[0]?.url) || photoObj?.src

  const isTryAll5 = handleLower.includes('try-all-5')

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative flex flex-col h-full w-full rounded-2xl bg-white dark:bg-[#141414] border border-stone-200/80 dark:border-stone-800 shadow-2xs hover:shadow-card hover:border-[#FF5400]/40 transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col h-full p-4 sm:p-5">
        
        {/* Clickable Image Canvas */}
        <Link
          to={productUrl}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#FAF8F5] dark:bg-[#1C1C1C] p-3 flex items-center justify-center group-hover:bg-[#F5F2EB] dark:group-hover:bg-[#222222] transition-colors border border-stone-200/40 dark:border-stone-700/40"
        >
          {/* Badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
            {!isAvailable ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-red-600 text-white shadow-2xs">
                SOLD OUT
              </span>
            ) : isTryAll5 ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#141414] dark:bg-stone-800 text-white shadow-2xs">
                ⭐ ALL 5 FLAVOURS
              </span>
            ) : discount ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FF5400] text-white shadow-2xs">
                {discount}
              </span>
            ) : null}
          </div>

          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display text-4xl text-[#141414] dark:text-white">
              🍿
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="mt-4 flex flex-1 flex-col justify-between space-y-3.5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {isTryAll5 ? '5-IN-1 STARTER BOX' : (product.size || '50G & 100G POUCHES')}
              </span>
              {product.spiceLevel && !isTryAll5 && (
                <span className="font-sans text-[11px] font-semibold text-[#FF5400]">
                  {product.spiceLevel.replace(/[🌶️🧀🌿]/g, '').trim()}
                </span>
              )}
            </div>

            <Link to={productUrl} className="block group/title">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#141414] dark:text-white group-hover/title:text-[#FF5400] transition-colors leading-snug">
                {name}
              </h3>
            </Link>

            <p className="mt-1 font-sans text-xs leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2">
              {product.description || product.blurb || 'Handpicked Bihar lotus seeds slow-roasted with authentic spices.'}
            </p>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg font-extrabold text-[#141414] dark:text-white">{priceFormatted}</span>
                {mrpFormatted && (
                  <span className="font-sans text-xs text-stone-400 dark:text-stone-500 line-through font-medium">
                    {mrpFormatted}
                  </span>
                )}
              </div>
              <span className="font-sans text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase">
                {isTryAll5 ? '5 POUCHES' : 'FROM ₹150/POUCH'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!isAvailable || isAdding}
                className={`w-full py-2.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-1 ${
                  !isAvailable
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : isAdding
                    ? 'bg-[#141414] dark:bg-stone-100 text-white dark:text-[#141414] opacity-85'
                    : 'bg-[#141414] dark:bg-stone-100 hover:bg-[#FF5400] dark:hover:bg-[#FF5400] text-white dark:text-[#141414] dark:hover:text-white'
                }`}
              >
                {!isAvailable ? (
                  'SOLD OUT'
                ) : isAdded ? (
                  'ADDED ✓'
                ) : isAdding ? (
                  'ADDING...'
                ) : (
                  '+ ADD'
                )}
              </button>
              <Link
                to={productUrl}
                className="w-full py-2.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-700 text-[#141414] dark:text-stone-200 font-sans text-[11px] font-semibold uppercase tracking-wider text-center hover:bg-[#141414] dark:hover:bg-white hover:text-white dark:hover:text-[#141414] hover:border-[#141414] dark:hover:border-white transition-colors"
              >
                VIEW PACK
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.article>
  )
}
