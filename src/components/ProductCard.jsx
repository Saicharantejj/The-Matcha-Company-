import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

// Flavour Identity System for subtle card accents & meaning
export function getFlavourTheme(handleOrName = '') {
  const str = (handleOrName || '').toLowerCase()
  if (str.includes('chocolate')) {
    return {
      key: 'chocolate',
      name: 'Chocolate',
      accent: '#D4AF37', // warm gold & cocoa
      badgeBg: '#FDF8EB',
      badgeText: '#8D6E18',
      glow: 'rgba(212, 175, 55, 0.28)',
      bgLight: '#FCF9F2',
      borderLight: 'rgba(212, 175, 55, 0.35)',
      spiceTag: 'Sweet & Salty 🍫',
      flavourPill: 'Dark Cocoa Glaze',
    }
  }
  if (str.includes('cheese-and-herbs') || (str.includes('cheese') && !str.includes('chilli-cheese'))) {
    return {
      key: 'cheese',
      name: 'Cheese & Herbs',
      accent: '#10B981', // emerald herb & cheddar gold
      badgeBg: '#ECFDF5',
      badgeText: '#047857',
      glow: 'rgba(16, 185, 129, 0.28)',
      bgLight: '#F2FAF5',
      borderLight: 'rgba(16, 185, 129, 0.35)',
      spiceTag: 'Cheesy Herb 🧀🌿',
      flavourPill: 'Aged Cheddar & Herb',
    }
  }
  if (str.includes('jalapeno') || str.includes('lime')) {
    return {
      key: 'jalapeno',
      name: 'Jalapeno',
      accent: '#4D8C24', // zesty jalapeno lime
      badgeBg: '#F4FBE8',
      badgeText: '#3B6D1B',
      glow: 'rgba(77, 140, 36, 0.28)',
      bgLight: '#F5FAED',
      borderLight: 'rgba(77, 140, 36, 0.35)',
      spiceTag: 'Fiery Zest 🌶️⚡',
      flavourPill: 'Smoky Jalapeno & Lime',
    }
  }
  if (str.includes('peri-peri') || str.includes('peri')) {
    return {
      key: 'peri',
      name: 'Peri Peri',
      accent: '#F04444', // chilli red
      badgeBg: '#FEF2F2',
      badgeText: '#DC2626',
      glow: 'rgba(240, 68, 68, 0.28)',
      bgLight: '#FFF5F5',
      borderLight: 'rgba(240, 68, 68, 0.35)',
      spiceTag: 'High Heat 🌶️',
      flavourPill: 'Bird’s Eye Chilli',
    }
  }
  if (str.includes('garlic')) {
    return {
      key: 'garlic',
      name: 'Kashmiri Garlic',
      accent: '#B91C1C', // deep kashmiri red
      badgeBg: '#FEF2F2',
      badgeText: '#991B1B',
      glow: 'rgba(185, 28, 28, 0.28)',
      bgLight: '#FFF5F5',
      borderLight: 'rgba(185, 28, 28, 0.35)',
      spiceTag: 'Warm Garlic 🧄🌶️',
      flavourPill: 'Golden Toasted Garlic',
    }
  }
  if (str.includes('pudhina') || str.includes('mint')) {
    return {
      key: 'pudhina',
      name: 'Pudhina',
      accent: '#52C878', // fresh garden mint
      badgeBg: '#F0FDF4',
      badgeText: '#15803D',
      glow: 'rgba(82, 200, 120, 0.28)',
      bgLight: '#F2FCF5',
      borderLight: 'rgba(82, 200, 120, 0.35)',
      spiceTag: 'Fresh Mint 🌿',
      flavourPill: 'Garden Spearmint',
    }
  }
  if (str.includes('try-all-5') || str.includes('trio') || str.includes('box')) {
    return {
      key: 'trio',
      name: 'Launch Trio Box',
      accent: '#FF5400', // signature chaska orange
      badgeBg: '#FFF4ED',
      badgeText: '#E04800',
      glow: 'rgba(255, 84, 0, 0.3)',
      bgLight: '#FFF8F4',
      borderLight: 'rgba(255, 84, 0, 0.35)',
      spiceTag: '3-In-1 Sampler 📦',
      flavourPill: 'All 3 Launch Flavours',
    }
  }
  return {
    key: 'classic',
    name: 'Roasted Makhana',
    accent: '#FF5400',
    badgeBg: '#FFF4ED',
    badgeText: '#E04800',
    glow: 'rgba(255, 84, 0, 0.25)',
    bgLight: '#FAF8F5',
    borderLight: 'rgba(255, 84, 0, 0.25)',
    spiceTag: 'Slow-Roasted',
    flavourPill: '100% Roasted',
  }
}

function ProductCardComponent({ product, index = 0, colorMode = 'auto' }) {
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

  const flavourTheme = getFlavourTheme(handleLower || name)
  const isLight = colorMode === 'light'

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`group relative flex flex-col h-full w-full rounded-3xl transition-all duration-300 overflow-hidden ${
        isLight
          ? 'bg-white border text-[#0B1230] shadow-sm hover:shadow-xl hover:-translate-y-1'
          : 'bg-[#131D4A] border border-[#243373] text-[#FAF8F5] shadow-card hover:shadow-2xl hover:-translate-y-1'
      } ${isComingSoon ? 'border-dashed opacity-90' : ''}`}
      style={{
        borderColor: isComingSoon ? undefined : flavourTheme.borderLight,
      }}
    >
      {/* Subtle top flavour accent strip */}
      <div
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: flavourTheme.accent }}
      />

      <div className="flex flex-col h-full p-4 sm:p-5">
        
        {/* Clickable Image Canvas with Flavour Accent Tint */}
        <Link
          to={productUrl}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl p-3 flex items-center justify-center transition-colors border"
          style={{
            backgroundColor: isLight ? flavourTheme.bgLight : 'rgba(23, 36, 91, 0.7)',
            borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
          }}
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
              <span className="px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FF5400] text-white shadow-2xs">
                ⭐ 3-IN-1 LAUNCH BOX
              </span>
            ) : discount ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FF5400] text-white shadow-2xs">
                {discount}
              </span>
            ) : (
              <span
                className="px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider uppercase rounded-full text-white shadow-2xs"
                style={{ backgroundColor: flavourTheme.accent }}
              >
                🔥 DROP 01
              </span>
            )}
          </div>

          {/* Flavour Tag Pill on top right */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className="px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-2xs"
              style={{
                backgroundColor: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(12,18,44,0.85)',
                color: flavourTheme.accent,
                border: `1px solid ${flavourTheme.borderLight}`,
              }}
            >
              {flavourTheme.flavourPill}
            </span>
          </div>

          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className={`h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out ${
                isComingSoon ? 'filter grayscale-30 brightness-95' : ''
              }`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display text-4xl">
              🍿
            </div>
          )}

          {/* Packet Highlight Pill */}
          {!isComingSoon && !isLaunchBox && (
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-[9px] font-mono text-white font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: flavourTheme.accent }} />
                <span>ROASTED NOT FRIED</span>
              </span>
              <span className="text-amber-300 font-bold">70g / 30g</span>
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="mt-4 flex flex-1 flex-col justify-between space-y-3.5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                  isLight ? 'text-stone-500' : 'text-stone-300'
                }`}
              >
                {isComingSoon
                  ? 'EXPERIMENTAL LAB • DROP 02'
                  : isLaunchBox
                  ? '3 POUCH SAMPLER (210G)'
                  : '70G / 30G POUCH'}
              </span>
              <span
                className="font-mono text-[10px] font-bold"
                style={{ color: flavourTheme.accent }}
              >
                {product.spiceLevel || flavourTheme.spiceTag}
              </span>
            </div>

            <Link to={productUrl} className="block group/title">
              <h3
                className={`font-display text-base sm:text-lg font-black group-hover/title:text-[#FF5400] transition-colors leading-snug uppercase ${
                  isLight ? 'text-[#0B1230]' : 'text-white'
                }`}
              >
                {name}
              </h3>
            </Link>

            <p
              className={`mt-1 font-sans text-xs leading-relaxed line-clamp-2 ${
                isLight ? 'text-stone-600' : 'text-stone-300'
              }`}
            >
              {product.blurb || product.description || 'Handpicked Bihar lotus seeds slow-roasted with authentic spices.'}
            </p>
          </div>

          {/* Pricing & CTA */}
          <div
            className={`pt-3 border-t space-y-2.5 ${
              isLight ? 'border-stone-200/80' : 'border-[#243373]'
            }`}
          >
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-display text-lg font-extrabold ${
                    isLight ? 'text-[#0B1230]' : 'text-white'
                  }`}
                >
                  {isComingSoon ? 'DROP 02' : priceFormatted}
                </span>
                {!isComingSoon && mrpFormatted && (
                  <span className="font-sans text-xs text-stone-400 line-through font-medium">
                    {mrpFormatted}
                  </span>
                )}
              </div>
              <span
                className={`font-mono text-[10px] font-bold uppercase ${
                  isLight ? 'text-stone-500' : 'text-stone-400'
                }`}
              >
                {isComingSoon ? '🔒 LOCKED' : isLaunchBox ? 'ALL 3 FLAVOURS' : '70G / 30G'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {isComingSoon ? (
                <button
                  type="button"
                  onClick={handleNotifyMe}
                  className="col-span-2 py-2.5 rounded-full bg-stone-900 hover:bg-[#FF5400] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer hover-pop-subtle hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>🔔 GET NOTIFIED (DROP 02)</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!isAvailable || isAdding}
                    className={`w-full py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer hover-pop-subtle hover:scale-[1.03] active:scale-[0.97] ${
                      !isAvailable
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : isAdded
                        ? 'bg-emerald-600 text-white'
                        : isAdding
                        ? 'bg-[#0B1230] text-white opacity-85'
                        : isLight
                        ? 'bg-[#0B1230] hover:bg-[#FF5400] text-white'
                        : 'bg-white hover:bg-[#FF5400] text-[#0C122C] hover:text-white'
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
                    className={`w-full py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider text-center transition-all hover-pop-subtle hover:scale-[1.03] active:scale-[0.97] ${
                      isLight
                        ? 'bg-stone-100 hover:bg-[#0B1230] text-[#0B1230] hover:text-white border border-stone-300/80 hover:border-[#0B1230]'
                        : 'bg-[#17245B] hover:bg-white text-white hover:text-[#0C122C] border border-[#243373] hover:border-white'
                    }`}
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

const ProductCard = memo(ProductCardComponent)
export default ProductCard
