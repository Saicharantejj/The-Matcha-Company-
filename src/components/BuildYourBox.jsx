import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { fetchShopifyProductByHandle } from '../lib/shopify/api'
import { photos } from '../data/photos'

export default function BuildYourBox() {
  const [product, setProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    async function load() {
      try {
        const p = await fetchShopifyProductByHandle('chaska-try-all-5')
        if (p) setProduct(p)
      } catch (err) {
        console.warn('[LaunchTrioBox Shopify Error]', err)
      }
    }
    load()
  }, [])

  const variants = product?.variants || []
  const activeVariant = variants[0] || null

  const isAvailable = activeVariant ? Boolean(activeVariant.availableForSale) : Boolean(product?.availableForSale ?? true)
  const price = 499
  const mrp = 599
  const savings = mrp - price

  const handleAddBoxToCart = async () => {
    if (!isAvailable || isAdding) return

    setIsAdding(true)
    try {
      const selectedVariantId = activeVariant?.id || product?.variantId || product?.id || 'variant-trio-launch'
      const itemToAdd = {
        ...product,
        id: selectedVariantId,
        variantId: selectedVariantId,
        availableForSale: isAvailable,
        price,
        mrp,
        size: '3x 70g Pouches (210g)',
        packSize: '3x 70g Pouches (210g)',
        name: 'The Launch Trio Box (All 3 Flavours)',
        flavor: 'The Launch Trio Box',
        handle: 'chaska-try-all-5',
        image: photos.tabletopLifestyle.src,
      }
      await addItem(itemToAdd, 1)
      setIsAdded(true)
      addToast('The Launch Trio Box (3 Flavours) added to stash! 📦', 'success')
      setTimeout(() => {
        setIsAdded(false)
        setIsAdding(false)
      }, 1400)
    } catch {
      setIsAdding(false)
      addToast('Could not add to cart. Please try again.', 'error')
    }
  }

  const launchTrioPouches = [
    {
      num: '01',
      name: 'CHOCOLATE MAKHANA',
      sub: 'ROASTED NOT FRIED • INDIAN FLAVOURS REAL INGREDIENTS',
      badge: 'SWEET & SALTY 🍫',
      tagline: 'Dark Cocoa Glaze • Sea Salt • Lotus Crunch',
      size: '70g',
      color: '#D4AF37',
      bgColor: '#2B1405',
      image: photos.chocolateMakhanaPack.src,
    },
    {
      num: '02',
      name: 'CHEESE AND HERBS MAKHANA',
      sub: 'ROASTED NOT FRIED • INDIAN FLAVOURS REAL INGREDIENTS',
      badge: 'CHEEZY HERB 🧀🌿',
      tagline: 'Aged Cheddar • Mountain Oregano • Garlic Butter',
      size: '70g',
      color: '#10B981',
      bgColor: '#0B291B',
      image: photos.cheeseAndHerbsMakhanaPack.src,
    },
    {
      num: '03',
      name: 'JALAPENO MAKHANA',
      sub: 'ROASTED NOT FRIED • INDIAN FLAVOURS REAL INGREDIENTS',
      badge: 'FIERY ZEST 🌶️⚡',
      tagline: 'Green Jalapeno • Tangy Lime • High Voltage Heat',
      size: '70g',
      color: '#EF4444',
      bgColor: '#1E2C0F',
      image: photos.jalapenoMakhanaPack.src,
    },
  ]

  const comingSoonTeasers = [
    { name: 'Peri Peri Makhana', heat: 'High Heat 🌶️' },
    { name: 'Kashmiri Garlic Chilli', heat: 'Warm Garlic 🧄' },
    { name: 'Pudhina Makhana', heat: 'Garden Mint 🌿' },
  ]

  return (
    <section className="py-20 sm:py-24 bg-[#0C122C] border-y border-[#243373] relative overflow-hidden" id="build-your-box">
      {/* Subtle Atmospheric Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#FF5400]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#1C2A6B]/30 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        
        {/* Section Header with Smooth Drift Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-3 mb-12 sm:mb-16"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
              🔥 OFFICIAL DROP 01
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C2A6B] text-stone-200 font-mono text-xs font-semibold uppercase tracking-wider border border-[#243373]">
              ALL 3 LAUNCH POUCHES (210G)
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            THE LAUNCH <span className="text-[#FF5400]">TRIO BOX.</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
            Can’t pick one? Taste the entire initial drop! Contains 1 full-size 70g pouch each of our 3 official launch flavours: Chocolate, Cheese &amp; Herbs, and Jalapeno.
          </p>
        </motion.div>

        {/* Box Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 3 Included Launch Pouches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-[#131D4A] border border-[#243373] rounded-3xl p-6 sm:p-8 shadow-card space-y-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-[#243373]">
                <h3 className="font-display text-base sm:text-lg font-black text-white uppercase tracking-wide">
                  3 OFFICIAL POUCHES INCLUDED
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-600/90 border border-emerald-500/40 text-white font-mono text-xs font-bold shadow-2xs">
                  100% ROASTED NOT FRIED
                </span>
              </div>

              {/* 3 Detailed Cards with Subtle Hover Lift */}
              <div className="space-y-3.5 mt-4">
                {launchTrioPouches.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -2 }}
                    className="group relative bg-[#1C2A6B]/80 hover:bg-[#1C2A6B] border border-[#243373] hover:border-[#FF5400]/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-300 shadow-2xs hover:shadow-[0_8px_24px_rgba(255,84,0,0.12)] cursor-default"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-[#243373] p-1 shadow-inner">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain rounded-lg group-hover:scale-106 transition-transform duration-500 ease-out"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-[#FF5400] uppercase tracking-wider">
                            POUCH {item.num} • {item.size}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-stone-300 bg-[#131D4A] px-2 py-0.5 rounded-full border border-[#243373]">
                            {item.badge}
                          </span>
                        </div>
                        <h4 className="font-display font-black text-sm sm:text-base text-white uppercase leading-tight truncate">
                          {item.name}
                        </h4>
                        <p className="font-sans text-xs text-stone-300 leading-snug line-clamp-1">
                          {item.tagline}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-black text-white bg-[#131D4A] px-3 py-1.5 rounded-full border border-[#243373] shrink-0 group-hover:border-[#FF5400]/50 transition-colors">
                      1x 70g
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Drop 02 In The Lab Teaser Box with Subtle Pulsing Live Indicator */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase text-amber-300 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  DROP 02 COOKING IN THE LAB:
                </span>
                <span className="font-mono text-[10px] font-bold text-amber-300 uppercase bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  LOCKED 🔒
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {comingSoonTeasers.map((c) => (
                  <span
                    key={c.name}
                    className="px-2.5 py-1 rounded-lg bg-[#131D4A] border border-amber-500/20 font-mono text-[10px] font-semibold text-stone-200 hover:border-amber-500/50 transition-colors"
                  >
                    {c.name} ({c.heat})
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Box Summary & Purchase with Floating Card & Micro-interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 bg-[#131D4A] border border-[#243373] rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Subtle corner light highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5400]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Product Badge & Title */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5400]">
                  OFFICIAL DROP 01 LAUNCH SAMPLER
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase leading-none">
                  THE LAUNCH TRIO
                </h3>
                <p className="font-sans text-xs text-stone-300">
                  Total 210g net weight • 3 airtight nitrogen-flushed pouches • Zero deep fry.
                </p>
              </div>

              {/* Price Calculation Card */}
              <div className="p-5 rounded-2xl bg-[#1C2A6B] border border-[#243373] space-y-2.5 shadow-inner">
                <div className="flex justify-between font-mono text-xs text-stone-300">
                  <span>3x 70g Pouches MRP</span>
                  <span className="line-through text-stone-400">₹{mrp}</span>
                </div>
                <div className="flex justify-between font-mono text-xs text-emerald-400 font-bold">
                  <span>Launch Bundle Savings</span>
                  <span className="bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-700/60">
                    -₹{savings} (17% OFF)
                  </span>
                </div>
                <div className="border-t border-[#243373] pt-3 flex justify-between items-baseline">
                  <span className="font-display text-base font-bold text-white uppercase">Trio Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-black text-white">₹{price}</span>
                    <span className="font-mono text-xs text-stone-400">all 3 included</span>
                  </div>
                </div>
              </div>

              {/* Perks Checklist */}
              <div className="space-y-2 font-mono text-xs text-stone-300">
                <p className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Free Pan-India Delivery
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> 100% Roasted, Not Fried
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Indian Flavours, Real Ingredients
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> 3x 70g Individual Pouches (210g)
                </p>
              </div>
            </div>

            {/* CTA Button with Tactile Spring Interaction */}
            <div className="space-y-3 pt-4 border-t border-[#243373] relative z-10">
              <motion.button
                type="button"
                onClick={handleAddBoxToCart}
                disabled={!isAvailable || isAdding}
                whileHover={isAvailable && !isAdding ? { scale: 1.015 } : {}}
                whileTap={isAvailable && !isAdding ? { scale: 0.985 } : {}}
                transition={{ duration: 0.15 }}
                className={`w-full btn py-4 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer ${
                  !isAvailable
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed border-transparent'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : isAdding
                    ? 'bg-[#FF5400] text-white opacity-85'
                    : 'bg-[#FF5400] hover:bg-[#E04800] text-white'
                }`}
              >
                {!isAvailable
                  ? 'SOLD OUT'
                  : isAdded
                  ? 'ADDED TO STASH ✓'
                  : isAdding
                  ? 'ADDING...'
                  : `ADD LAUNCH TRIO TO STASH • ₹${price}`}
              </motion.button>

              <Link
                to="/products/chaska-try-all-5"
                className="group block text-center font-mono text-xs font-bold text-stone-300 hover:text-[#FF5400] transition-colors"
              >
                View Full Box Details <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">➔</span>
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

