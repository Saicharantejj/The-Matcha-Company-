import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
      size: '50 g',
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
      size: '50 g',
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
      size: '50 g',
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
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
              🔥 OFFICIAL DROP 01
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-200 dark:bg-[#1C2A6B] text-stone-800 dark:text-stone-200 font-mono text-xs font-semibold uppercase tracking-wider">
              ALL 3 LAUNCH POUCHES (210G)
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#17245B] dark:text-white leading-tight">
            THE LAUNCH <span className="text-[#FF5400]">TRIO BOX.</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            Can’t pick one? Taste the entire initial drop! Contains 1 full-size 70g pouch each of our 3 official launch flavours: Chocolate, Cheese &amp; Herbs, and Jalapeno.
          </p>
        </div>

        {/* Box Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 3 Included Launch Pouches */}
          <div className="lg:col-span-7 bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-[#243373]">
              <h3 className="font-display text-base sm:text-lg font-black text-[#17245B] dark:text-white uppercase">
                3 OFFICIAL POUCHES INCLUDED
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold">
                100% ROASTED NOT FRIED
              </span>
            </div>

            {/* 3 Detailed Cards */}
            <div className="space-y-3.5">
              {launchTrioPouches.map((item) => (
                <div
                  key={item.name}
                  className="group relative bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#FF5400] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-200 dark:border-[#243373]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#FF5400] uppercase tracking-wider">
                          POUCH {item.num} • {item.size}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-stone-500 dark:text-stone-300">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-[#17245B] dark:text-white uppercase leading-tight">
                        {item.name}
                      </h4>
                      <p className="font-sans text-xs text-stone-500 dark:text-stone-300 leading-snug">
                        {item.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-black text-[#17245B] dark:text-white bg-white dark:bg-[#131D4A] px-3 py-1.5 rounded-full border border-stone-200 dark:border-[#243373] shrink-0">
                    1x 70g
                  </span>
                </div>
              ))}
            </div>

            {/* Drop 02 In The Lab Teaser Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  🧪 DROP 02 COOKING IN THE LAB (COMING SOON):
                </span>
                <span className="font-mono text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                  LOCKED 🔒
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {comingSoonTeasers.map((c) => (
                  <span
                    key={c.name}
                    className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-[#131D4A] border border-amber-500/20 font-mono text-[10px] font-semibold text-stone-700 dark:text-stone-200"
                  >
                    {c.name} ({c.heat})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Box Summary & Purchase */}
          <div className="lg:col-span-5 bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Product Badge & Title */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF5400]">
                  OFFICIAL DROP 01 LAUNCH SAMPLER
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-[#17245B] dark:text-white uppercase leading-none">
                  THE LAUNCH TRIO
                </h3>
                <p className="font-sans text-xs text-stone-500 dark:text-stone-300">
                  Total 210g net weight • 3 airtight nitrogen-flushed pouches • Zero deep fry.
                </p>
              </div>

              {/* Price Calculation */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] space-y-2.5">
                <div className="flex justify-between font-mono text-xs text-stone-500 dark:text-stone-300">
                  <span>3x 70g Pouches MRP</span>
                  <span className="line-through">₹{mrp}</span>
                </div>
                <div className="flex justify-between font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>Launch Bundle Savings</span>
                  <span>-₹{savings} (17% OFF)</span>
                </div>
                <div className="border-t border-stone-200/80 dark:border-[#243373] pt-3 flex justify-between items-baseline">
                  <span className="font-display text-base font-bold text-[#17245B] dark:text-white uppercase">Trio Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-black text-[#17245B] dark:text-white">₹{price}</span>
                    <span className="font-mono text-xs text-stone-400 dark:text-stone-500">all 3 included</span>
                  </div>
                </div>
              </div>

              {/* Perks */}
              <div className="space-y-2 font-mono text-xs text-stone-600 dark:text-stone-300">
                <p className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Free Pan-India Delivery
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> 100% Roasted, Not Fried
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Indian Flavours, Real Ingredients
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> 70g Individual Pouches
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-4 border-t border-stone-200/80 dark:border-[#243373]">
              <button
                type="button"
                onClick={handleAddBoxToCart}
                disabled={!isAvailable || isAdding}
                className={`w-full btn py-4 text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                  !isAvailable
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed border-transparent'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : isAdding
                    ? 'bg-[#FF5400] text-white opacity-85'
                    : 'bg-[#FF5400] hover:bg-[#E04800] text-white'
                }`}
              >
                {!isAvailable ? 'SOLD OUT' : isAdded ? 'ADDED TO STASH ✓' : isAdding ? 'ADDING...' : `ADD LAUNCH TRIO TO STASH • ₹${price}`}
              </button>

              <Link
                to="/products/chaska-try-all-5"
                className="block text-center font-mono text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-[#FF5400] transition-colors"
              >
                View Full Box Details ➔
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
