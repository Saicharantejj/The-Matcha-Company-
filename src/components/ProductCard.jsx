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

  const isComingSoon = Boolean(product.isComingSoon)
  const isAvailable = Boolean(product.availableForSale) && !isComingSoon

  const handleNotifyMe = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToast(`You're on the VIP waitlist for ${name}! We'll alert you the second Drop 02 goes live. 🚀`, 'success')
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isComingSoon) {
      handleNotifyMe(e)
      return
    }
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
  const photoKey = handleLower.includes('chocolate') ? 'chocolateMakhanaPack'
    : handleLower.includes('cheese-and-herbs') || (handleLower.includes('cheese') && !handleLower.includes('chilli-cheese')) ? 'cheeseAndHerbsMakhanaPack'
    : handleLower.includes('jalapeno') ? 'jalapenoMakhanaPack'
    : handleLower.includes('cheese') ? 'cheeseAndHerbsMakhanaPack'
    : handleLower.includes('pudhina') ? 'pudhinaPack'
    : handleLower.includes('lime') ? 'yellowBasket'
    : handleLower.includes('garlic') ? 'meshBagIngredients'
    : handleLower.includes('peri-peri') ? 'periPeriPack'
    : handleLower.includes('try-all-5') || handleLower.includes('trio') || handleLower.includes('box') ? 'tabletopLifestyle'
    : 'masalaPouchHero'

  const photoObj = photos[photoKey] || photos.brandPoster
  const displayImage = product.image || (product.images && product.images[0]?.url) || photoObj?.src

  const isLaunchBox = handleLower.includes('try-all-5') || handleLower.includes('trio')

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`group relative flex flex-col h-full w-full rounded-3xl bg-white dark:bg-[#131D4A] border transition-all duration-300 overflow-hidden ${
        isComingSoon
          ? 'border-dashed border-stone-300 dark:border-[#243373] opacity-90'
          : 'border-stone-200/80 dark:border-[#243373] shadow-2xs hover:shadow-card hover:border-[#FF5400]/40'
      }`}
    >
      <div className="flex flex-col h-full p-4 sm:p-5">
        
        {/* Clickable Image Canvas */}
        <Link
          to={productUrl}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#FAF8F5] dark:bg-[#1C2A6B] p-3 flex items-center justify-center group-hover:bg-[#F5F2EB] dark:group-hover:bg-[#23337A] transition-colors border border-stone-200/40 dark:border-[#243373]"
        >
          {/* Badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
            {isComingSoon ? (
              <span className="px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase rounded-full bg-stone-900/90 text-[#FF5400] backdrop-blur-xs border border-[#FF5400]/40 shadow-xs">
                🔒 DROP 02 • COMING SOON
              </span>
            ) : !isAvailable ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-red-600 text-white shadow-2xs">
                SOLD OUT
              </span>
            ) : isLaunchBox ? (
              <span className="px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#17245B] dark:bg-[#FF5400] text-white shadow-2xs">
                ⭐ 3-IN-1 LAUNCH BOX
              </span>
            ) : discount ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FF5400] text-white shadow-2xs">
                {discount}
              </span>
            ) : (
              <span className="px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-600 text-white shadow-2xs">
                🔥 DROP 01
              </span>
            )}
          </div>

          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className={`h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out ${
                isComingSoon ? 'filter grayscale-30 brightness-95' : ''
              }`}
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display text-4xl text-[#17245B] dark:text-white">
              🍿
            </div>
          )}

          {/* Packet Highlight Pill */}
          {!isComingSoon && !isLaunchBox && (
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-[9px] font-mono text-white font-semibold">
              <span>ROASTED NOT FRIED</span>
              <span className="text-amber-400">50g</span>
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="mt-4 flex flex-1 flex-col justify-between space-y-3.5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {isComingSoon
                  ? 'EXPERIMENTAL LAB • DROP 02'
                  : isLaunchBox
                  ? '3 POUCH SAMPLER (150G)'
                  : '50G OFFICIAL POUCH'}
              </span>
              {product.spiceLevel && !isLaunchBox && (
                <span className="font-mono text-[10px] font-bold text-[#FF5400]">
                  {product.spiceLevel}
                </span>
              )}
            </div>

            <Link to={productUrl} className="block group/title">
              <h3 className="font-display text-base sm:text-lg font-black text-[#17245B] dark:text-white group-hover/title:text-[#FF5400] transition-colors leading-snug uppercase">
                {name}
              </h3>
            </Link>

            <p className="mt-1 font-sans text-xs leading-relaxed text-stone-600 dark:text-stone-300 line-clamp-2">
              {product.blurb || product.description || 'Handpicked Bihar lotus seeds slow-roasted with authentic spices.'}
            </p>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-3 border-t border-stone-100 dark:border-[#243373] space-y-2.5">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg font-extrabold text-[#17245B] dark:text-white">
                  {isComingSoon ? 'DROP 02' : priceFormatted}
                </span>
                {!isComingSoon && mrpFormatted && (
                  <span className="font-sans text-xs text-stone-400 dark:text-stone-500 line-through font-medium">
                    {mrpFormatted}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase">
                {isComingSoon ? '🔒 LOCKED' : isLaunchBox ? 'ALL 3 FLAVOURS' : '50G PACK'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {isComingSoon ? (
                <button
                  type="button"
                  onClick={handleNotifyMe}
                  className="col-span-2 py-2.5 rounded-full bg-stone-900 hover:bg-[#FF5400] text-white dark:bg-stone-800 dark:hover:bg-[#FF5400] font-mono text-[11px] font-bold uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>🔔 GET NOTIFIED (DROP 02)</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!isAvailable || isAdding}
                    className={`w-full py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-1 ${
                      !isAvailable
                        ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                        : isAdded
                        ? 'bg-emerald-600 text-white'
                        : isAdding
                        ? 'bg-[#17245B] dark:bg-white text-white dark:text-[#17245B] opacity-85'
                        : 'bg-[#17245B] dark:bg-white hover:bg-[#FF5400] dark:hover:bg-[#FF5400] text-white dark:text-[#17245B] dark:hover:text-white'
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
                    className="w-full py-2.5 rounded-full bg-white dark:bg-[#131D4A] border border-stone-200 dark:border-[#243373] text-[#17245B] dark:text-stone-200 font-mono text-[11px] font-bold uppercase tracking-wider text-center hover:bg-[#17245B] dark:hover:bg-white hover:text-white dark:hover:text-[#17245B] hover:border-[#17245B] dark:hover:border-white transition-colors"
                  >
                    VIEW PACK
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.article>
  )
}
