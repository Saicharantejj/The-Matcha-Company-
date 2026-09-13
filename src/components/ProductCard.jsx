import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

export default function ProductCard({ product, index = 0 }) {
  const { addItem, openCart } = useCart()
  const { addToast } = useToast()
  const navigate = useNavigate()
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
      }, 1400)
    } catch (err) {
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

  // Playful tagline accents
  const playfulTag = handleLower.includes('cheese') ? 'Cheezy. Teekha. Dil se.'
    : handleLower.includes('pudhina') ? 'Thanda mint. Kadak chaska.'
    : handleLower.includes('lime') ? 'Zesty lime. Smoky punch.'
    : handleLower.includes('garlic') ? 'Kashmiri warmth. Garlic crunch.'
    : handleLower.includes('peri-peri') ? 'Teekha hai. Par rukoge nahi.'
    : handleLower.includes('try-all-5') || handleLower.includes('box') ? 'All 5 Flavours. Ek saath.'
    : 'Chef roasted. No maida.'

  const isTryAll5 = handleLower.includes('try-all-5')

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative flex flex-col h-full w-full rounded-3xl bg-white border border-[#17245B]/15 shadow-sm hover:shadow-md hover:border-[#E2AE35]/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col h-full p-5 sm:p-6">
        
        {/* Clickable Image Canvas */}
        <Link
          to={productUrl}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#FAF6ED] p-4 flex items-center justify-center group-hover:bg-[#F5EEDD] transition-colors border border-[#17245B]/10"
        >
          {/* Badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
            {!isAvailable ? (
              <span className="px-2.5 py-1 font-mono text-[9px] font-extrabold tracking-wider uppercase rounded-full bg-[#A9223A] text-white shadow-xs">
                SOLD OUT
              </span>
            ) : isTryAll5 ? (
              <span className="px-2.5 py-1 font-mono text-[9px] font-extrabold tracking-wider uppercase rounded-full bg-[#17245B] text-[#F5EEDD] shadow-xs">
                ⭐ ALL 5 FLAVOURS
              </span>
            ) : discount ? (
              <span className="px-2.5 py-1 font-mono text-[9px] font-extrabold tracking-wider uppercase rounded-full bg-[#E2AE35] text-[#17245B] shadow-xs">
                {discount}
              </span>
            ) : null}
          </div>

          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display text-4xl text-[#17245B]">
              🍿
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/65">
                {isTryAll5 ? 'VARIETY SAMPLER BOX' : (product.size || '50G & 100G POUCHES')}
              </span>
              {product.spiceLevel && !isTryAll5 && (
                <span className="font-mono text-[10px] font-extrabold text-[#A9223A] flex items-center gap-0.5">
                  <span>🌶️</span> {product.spiceLevel.replace(/[🌶️🧀🌿]/g, '').trim()}
                </span>
              )}
            </div>

            <Link to={productUrl} className="block group/title">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#17245B] group-hover/title:text-[#E2AE35] transition-colors leading-snug">
                {name}
              </h3>
            </Link>

            <p className="mt-1 font-hindi text-xs font-semibold text-[#17245B]/90 italic">
              "{playfulTag}"
            </p>

            <p className="mt-1.5 font-sans text-xs leading-relaxed text-[#17245B]/75 line-clamp-2">
              {product.description || product.blurb || 'Handpicked Bihar lotus seeds slow-roasted with authentic spices.'}
            </p>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-3.5 border-t border-[#17245B]/10 space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-black text-[#17245B]">{priceFormatted}</span>
                {mrpFormatted && (
                  <span className="font-mono text-xs text-[#17245B]/50 line-through">
                    {mrpFormatted}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] font-bold text-[#17245B]/70">
                {isTryAll5 ? '5 POUCHES' : 'FROM ₹150/POUCH'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!isAvailable || isAdding}
                className={`w-full py-2.5 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                  !isAvailable
                    ? 'bg-[#17245B]/15 text-[#17245B]/40 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : isAdding
                    ? 'bg-[#17245B] text-[#F5EEDD] opacity-85'
                    : 'bg-[#E2AE35] hover:bg-[#17245B] text-[#17245B] hover:text-[#F5EEDD]'
                }`}
              >
                {!isAvailable ? (
                  'SOLD OUT'
                ) : isAdded ? (
                  'ADDED ✓'
                ) : isAdding ? (
                  'ADDING...'
                ) : (
                  '+ ADD TO STASH'
                )}
              </button>
              <Link
                to={productUrl}
                className="w-full py-2.5 rounded-full bg-white border border-[#17245B]/20 text-[#17245B] font-mono text-[11px] font-bold uppercase tracking-wider text-center hover:bg-[#17245B] hover:text-[#F5EEDD] transition-colors"
              >
                CUSTOMIZE
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.article>
  )
}
