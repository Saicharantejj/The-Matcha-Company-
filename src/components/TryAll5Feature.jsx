import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

export default function TryAll5Feature({ product }) {
  const { addItem } = useCart()
  const { addToast } = useToast()

  const [activePhotoIdx, setActivePhotoIdx] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const variants = product?.variants || []
  const activeVariant = variants[0] || null

  const isAvailable = activeVariant ? Boolean(activeVariant.availableForSale) : Boolean(product?.availableForSale ?? true)
  const price = 499
  const mrp = 599
  const discount = Math.round(((mrp - price) / mrp) * 100)

  const launchPouches = [
    {
      name: 'Chocolate Makhana',
      tag: 'DARK COCOA GLAZE & HIMALAYAN SALT',
      size: '50g Pouch',
      packetName: 'CHOCOLATE MAKHANA',
      image: photos.chocolateMakhanaPack.src,
      accent: '#D4AF37',
    },
    {
      name: 'Cheese and Herbs Makhana',
      tag: 'AGED CHEDDAR & MOUNTAIN HERBS',
      size: '50g Pouch',
      packetName: 'CHEESE AND HERBS MAKHANA',
      image: photos.cheeseAndHerbsMakhanaPack.src,
      accent: '#10B981',
    },
    {
      name: 'Jalapeno Makhana',
      tag: 'FIERY GREEN JALAPENO & CITRUS LIME',
      size: '50g Pouch',
      packetName: 'JALAPENO MAKHANA',
      image: photos.jalapenoMakhanaPack.src,
      accent: '#EF4444',
    },
  ]

  const showcaseImages = [
    { src: photos.chocolateMakhanaPack.src, label: 'CHOCOLATE' },
    { src: photos.cheeseAndHerbsMakhanaPack.src, label: 'CHEESE & HERBS' },
    { src: photos.jalapenoMakhanaPack.src, label: 'JALAPENO' },
    { src: photos.tabletopLifestyle.src, label: 'TRIO SPREAD' },
  ]

  const handleAddToCart = async () => {
    if (!isAvailable) {
      addToast('The Launch Trio Box is currently sold out.', 'error')
      return
    }

    setIsAdding(true)
    try {
      const selectedVariantId = activeVariant?.id || product?.variantId || product?.id || 'variant-trio-feature'
      const itemToAdd = {
        ...product,
        id: selectedVariantId,
        variantId: selectedVariantId,
        availableForSale: isAvailable,
        price,
        mrp,
        size: '3x 50g Pouches (150g)',
        packSize: '3x 50g Pouches (150g)',
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
      }, 1200)
    } catch {
      setIsAdding(false)
      addToast('Could not add to cart. Please try again.', 'error')
    }
  }

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0C122C] border-b border-stone-200/80 dark:border-[#243373] relative overflow-hidden transition-colors" id="try-all-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Luxury Container */}
        <div className="relative rounded-3xl bg-[#17245B] dark:bg-[#131D4A] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-card border border-[#243373]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Value Proposition & Flavours */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-2xs">
                  THE LAUNCH TRIO
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider border border-white/10">
                  ALL 3 INITIAL FLAVOURS INCLUDED
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none">
                  THREE FLAVOURS. <br />
                  <span className="text-[#FF5400]">MAXIMUM CHASKA.</span>
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl font-normal">
                Can’t pick just one? Taste the official initial drop! Contains 1 full-size 50g pouch each of Chocolate, Cheese &amp; Herbs, and Jalapeno. Handpicked Bihar lotus seeds, 100% roasted not fried.
              </p>

              {/* 3 Flavour List Breakdown */}
              <div className="space-y-2.5 pt-1">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-300 block">
                  ALL 3 OFFICIAL POUCHES INSIDE THE BOX:
                </span>
                <div className="space-y-2">
                  {launchPouches.map((flv, idx) => (
                    <div
                      key={flv.name}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        activePhotoIdx === idx
                          ? 'bg-white/15 border-[#FF5400] shadow-sm'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-[#FF5400] bg-white/10 px-2.5 py-1 rounded-lg">
                          0{idx + 1}
                        </span>
                        <div>
                          <p className="font-display text-sm font-bold text-white uppercase">{flv.name}</p>
                          <p className="font-sans text-[11px] text-stone-300">{flv.tag}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        {flv.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-white/15 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] font-bold text-stone-300 uppercase">3 POUCHES SAMPLER</span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-3xl font-black text-white">₹{price}</span>
                      <span className="font-mono text-sm text-stone-400 line-through">₹{mrp}</span>
                      <span className="font-mono text-xs font-bold text-[#FF5400] bg-[#FF5400]/20 px-2 py-0.5 rounded-full border border-[#FF5400]/30">
                        {discount}% OFF
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isAvailable || isAdding}
                    className={`btn px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-sm transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : isAdding
                        ? 'bg-[#FF5400] text-white opacity-85'
                        : 'bg-[#FF5400] hover:bg-[#E04800] text-white'
                    }`}
                  >
                    {isAdded ? 'ADDED TO STASH ✓' : isAdding ? 'ADDING...' : `ADD LAUNCH TRIO • ₹${price}`}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-stone-300 font-mono text-[11px]">
                  <span>✓ Free Pan-India Shipping</span>
                  <span>✓ 100% Roasted Not Fried</span>
                  <span>✓ Fresh Airtight Pouches</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Pouch Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 bg-stone-900 shadow-2xl p-2">
                <img
                  src={showcaseImages[activePhotoIdx]?.src || photos.chocolateMakhanaPack.src}
                  alt="CHASKA Official Launch Pouch"
                  className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white font-mono text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  {showcaseImages[activePhotoIdx]?.label}
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] flex items-center justify-between border border-white/15">
                  <span className="text-[#FF5400] font-bold">ROASTED NOT FRIED</span>
                  <span>50 g NET WEIGHT</span>
                </div>
              </div>

              {/* Showcase Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {showcaseImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhotoIdx(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activePhotoIdx === i
                        ? 'border-[#FF5400] ring-2 ring-[#FF5400]/40 scale-105 shadow-md'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
