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
      glow: 'rgba(212, 175, 55, 0.38)',
      bgLight: '#FCF9F2',
      hoverBgLight: '#FAF2E1', // warm rich cocoa-gold cream
      hoverBgDark: '#221B14',
      borderLight: 'rgba(212, 175, 55, 0.4)',
      borderHover: '#D4AF37',
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
      glow: 'rgba(16, 185, 129, 0.38)',
      bgLight: '#F2FAF5',
      hoverBgLight: '#E8F7EE', // fresh herbal cream tint
      hoverBgDark: '#12251D',
      borderLight: 'rgba(16, 185, 129, 0.4)',
      borderHover: '#10B981',
      spiceTag: 'Cheesy Herb 🧀🌿',
      flavourPill: 'Aged Cheddar & Herb',
    }
  }
  if (str.includes('jalapeno') || str.includes('lime')) {
    return {
      key: 'jalapeno',
      name: 'Jalapeno',
      accent: '#4D8C24', // zesty jalapeno lime
      secondaryAccent: '#C8E86B',
      badgeBg: '#F4FBE8',
      badgeText: '#3B6D1B',
      glow: 'rgba(77, 140, 36, 0.38)',
      bgLight: '#F5FAED',
      hoverBgLight: '#EFF8E3', // zesty fresh lime/jalapeno tint
      hoverBgDark: '#172514',
      borderLight: 'rgba(77, 140, 36, 0.4)',
      borderHover: '#4D8C24',
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
      glow: 'rgba(240, 68, 68, 0.38)',
      bgLight: '#FFF5F5',
      hoverBgLight: '#FEE8E8', // warm fiery red cream
      hoverBgDark: '#281515',
      borderLight: 'rgba(240, 68, 68, 0.4)',
      borderHover: '#F04444',
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
      glow: 'rgba(185, 28, 28, 0.38)',
      bgLight: '#FFF5F5',
      hoverBgLight: '#FDE6E6',
      hoverBgDark: '#251313',
      borderLight: 'rgba(185, 28, 28, 0.4)',
      borderHover: '#B91C1C',
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
      glow: 'rgba(82, 200, 120, 0.38)',
      bgLight: '#F2FCF5',
      hoverBgLight: '#E6F6EC',
      hoverBgDark: '#12251B',
      borderLight: 'rgba(82, 200, 120, 0.4)',
      borderHover: '#52C878',
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
      glow: 'rgba(255, 84, 0, 0.38)',
      bgLight: '#FFF8F4',
      hoverBgLight: '#FFEFE3', // warm Chaska orange cream
      hoverBgDark: '#291815',
      borderLight: 'rgba(255, 84, 0, 0.4)',
      borderHover: '#FF5400',
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
    glow: 'rgba(255, 84, 0, 0.3)',
    bgLight: '#FAF8F5',
    hoverBgLight: '#FFF3EB',
    hoverBgDark: '#241B20',
    borderLight: 'rgba(255, 84, 0, 0.3)',
    borderHover: '#FF5400',
    spiceTag: 'Slow-Roasted',
    flavourPill: '100% Roasted',
  }
}

function ProductCardComponent({ product, index = 0, colorMode = 'auto' }) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col h-full w-full rounded-3xl overflow-hidden cursor-pointer ${
        isLight ? 'text-[#0B1230]' : 'text-[#FAF8F5]'
      } ${isComingSoon ? 'border-dashed opacity-90' : ''}`}
      style={{
        backgroundColor: isHovered
          ? (isLight ? flavourTheme.hoverBgLight : flavourTheme.hoverBgDark)
          : (isLight ? '#FFFFFF' : '#131D4A'),
        borderWidth: '2px',
        borderColor: isHovered
          ? flavourTheme.borderHover
          : (isLight ? flavourTheme.borderLight : '#243373'),
        transform: isHovered
          ? 'translate3d(0, -10px, 0) scale3d(1.025, 1.025, 1)'
          : 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
        boxShadow: isHovered
          ? `0 24px 50px -12px ${flavourTheme.glow}, 0 8px 24px -6px rgba(11, 18, 48, 0.16)`
          : (isLight ? '0 4px 20px rgba(0, 0, 0, 0.06)' : '0 4px 20px rgba(12, 18, 44, 0.5)'),
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.28s ease, border-color 0.28s ease, box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, background-color, box-shadow',
      }}
    >
      {/* Top flavour accent indicator bar */}
      <div
        className="h-1.5 w-full shrink-0 transition-opacity duration-300"
        style={{
          backgroundColor: flavourTheme.accent,
          opacity: isHovered ? 1 : 0.8,
        }}
      />

      <div className="flex flex-col h-full p-5 sm:p-6">
        
        {/* Clickable Image Canvas with Flavour Accent Tint */}
        <Link
          to={productUrl}
          className="relative aspect-[1/1] w-full overflow-hidden rounded-2xl p-4 flex items-center justify-center transition-all duration-300 border"
          style={{
            backgroundColor: isHovered
              ? (isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(23, 36, 91, 0.95)')
              : (isLight ? flavourTheme.bgLight : 'rgba(23, 36, 91, 0.7)'),
            borderColor: isHovered
              ? flavourTheme.borderHover
              : (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'),
          }}
        >
          {/* Badge */}
          <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1 items-start">
            {isComingSoon ? (
              <span className="px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase rounded-full bg-stone-900/90 text-[#FF5400] backdrop-blur-xs border border-[#FF5400]/40 shadow-xs">
                🔒 DROP 02 • COMING SOON
              </span>
            ) : !isAvailable ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-red-600 text-white shadow-2xs">
                SOLD OUT
              </span>
            ) : isLaunchBox ? (
              <span className="px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FF5400] text-white shadow-sm">
                ⭐ 3-IN-1 LAUNCH BOX
              </span>
            ) : discount ? (
              <span className="px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FF5400] text-white shadow-sm">
                {discount}
              </span>
            ) : (
              <span
                className="px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider uppercase rounded-full text-white shadow-sm"
                style={{ backgroundColor: flavourTheme.accent }}
              >
                🔥 DROP 01
              </span>
            )}
          </div>

          {/* Flavour Tag Pill on top right */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span
              className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-2xs transition-all duration-300"
              style={{
                backgroundColor: isHovered
                  ? flavourTheme.accent
                  : (isLight ? 'rgba(255,255,255,0.95)' : 'rgba(12,18,44,0.9)'),
                color: isHovered ? '#FFFFFF' : flavourTheme.accent,
                border: `1.5px solid ${flavourTheme.accent}`,
              }}
            >
              {flavourTheme.flavourPill}
            </span>
          </div>

          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className={`h-full w-full object-cover rounded-xl transition-transform duration-500 ease-out ${
                isHovered ? 'scale-106' : 'scale-100'
              } ${isComingSoon ? 'filter grayscale-30 brightness-95' : ''}`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display text-5xl">
              🍿
            </div>
          )}

          {/* Packet Highlight Pill */}
          {!isComingSoon && !isLaunchBox && (
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-[10px] font-mono text-white font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: flavourTheme.accent }} />
                <span>ROASTED NOT FRIED</span>
              </span>
              <span className="text-amber-300 font-bold">70g / 30g</span>
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="mt-5 flex flex-1 flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
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
                className="font-mono text-[11px] font-bold"
                style={{ color: flavourTheme.accent }}
              >
                {product.spiceLevel || flavourTheme.spiceTag}
              </span>
            </div>

            <Link to={productUrl} className="block group/title">
              <h3
                className={`font-display text-lg sm:text-xl font-black group-hover/title:text-[#FF5400] transition-colors leading-snug uppercase tracking-tight ${
                  isLight ? 'text-[#0B1230]' : 'text-white'
                }`}
              >
                {name}
              </h3>
            </Link>

            <p
              className={`mt-1.5 font-sans text-xs sm:text-[13px] leading-relaxed line-clamp-2 ${
                isLight ? 'text-stone-600' : 'text-stone-300'
              }`}
            >
              {product.blurb || product.description || 'Handpicked Bihar lotus seeds slow-roasted with authentic spices.'}
            </p>
          </div>

          {/* Pricing & CTA */}
          <div
            className={`pt-3.5 border-t space-y-3 ${
              isLight ? 'border-stone-200/80' : 'border-[#243373]'
            }`}
          >
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2.5">
                <span
                  className={`font-display text-xl sm:text-2xl font-black ${
                    isLight ? 'text-[#0B1230]' : 'text-white'
                  }`}
                >
                  {isComingSoon ? 'DROP 02' : priceFormatted}
                </span>
                {!isComingSoon && mrpFormatted && (
                  <span className="font-sans text-xs sm:text-sm text-stone-400 line-through font-medium">
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

            <div className="grid grid-cols-2 gap-2.5">
              {isComingSoon ? (
                <button
                  type="button"
                  onClick={handleNotifyMe}
                  className="col-span-2 py-3 rounded-full bg-stone-900 hover:bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer hover-pop-subtle hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>🔔 GET NOTIFIED (DROP 02)</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!isAvailable || isAdding}
                    className={`w-full py-3 sm:py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center gap-1 cursor-pointer hover-pop-subtle hover:scale-[1.03] active:scale-[0.97] ${
                      !isAvailable
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : isAdded
                        ? 'bg-emerald-600 text-white'
                        : isAdding
                        ? 'bg-[#FF5400] text-white opacity-85'
                        : isHovered
                        ? 'bg-[#FF5400] text-white hover:bg-[#E04800]'
                        : isLight
                        ? 'bg-[#0B1230] text-white hover:bg-[#FF5400]'
                        : 'bg-white text-[#0C122C] hover:bg-[#FF5400] hover:text-white'
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
                    className={`w-full py-3 sm:py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 hover-pop-subtle hover:scale-[1.03] active:scale-[0.97] ${
                      isLight
                        ? 'bg-white/80 hover:bg-[#0B1230] text-[#0B1230] hover:text-white border border-stone-300 hover:border-[#0B1230] shadow-2xs'
                        : 'bg-[#17245B] hover:bg-white text-white hover:text-[#0C122C] border border-[#243373] hover:border-white shadow-2xs'
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
