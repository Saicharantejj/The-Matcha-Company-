import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

export default function TryAll5Feature({ product }) {
  const { addItem, openCart } = useCart()
  const { addToast } = useToast()

  const [selectedSize, setSelectedSize] = useState('50g')
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  // Find the real Shopify variant based on selected size
  const variants = product?.variants || []
  const activeVariant = variants.find((v) => {
    const sizeOpt = v.selectedOptions?.find((o) => o.name?.toLowerCase() === 'size')?.value
    return sizeOpt === selectedSize || v.title?.toLowerCase().includes(selectedSize.toLowerCase())
  }) || variants[0]

  const isAvailable = activeVariant ? Boolean(activeVariant.availableForSale) : Boolean(product?.availableForSale)

  const price = activeVariant ? activeVariant.price : (selectedSize === '50g' ? 710 : 1410)
  const mrp = activeVariant?.mrp && activeVariant.mrp > price ? activeVariant.mrp : (selectedSize === '50g' ? 900 : 1600)
  const discount = Math.round(((mrp - price) / mrp) * 100)

  const handleAddToCart = async () => {
    if (!product) return

    if (!isAvailable) {
      addToast('Chaska Try All 5 is currently sold out.', 'error')
      return
    }

    setIsAdding(true)
    try {
      const selectedVariantId = activeVariant?.id || product.variantId || product.id
      const itemToAdd = {
        ...product,
        id: selectedVariantId,
        variantId: selectedVariantId,
        availableForSale: isAvailable,
        price,
        mrp,
        size: `${selectedSize} Sampler Box`,
        packSize: `${selectedSize} Sampler Box`,
        name: `Chaska Try All 5 (${selectedSize})`,
        flavor: 'Chaska Try All 5',
        handle: 'chaska-try-all-5',
        image: photos.stashBox.src,
      }
      await addItem(itemToAdd, 1)
      setIsAdded(true)
      addToast(`Chaska Try All 5 (${selectedSize}) added to stash! 📦`, 'success')
      setTimeout(() => {
        setIsAdded(false)
        setIsAdding(false)
      }, 1400)
    } catch {
      setIsAdding(false)
      addToast('Could not add to cart. Please try again.', 'error')
    }
  }

  const flavoursIncluded = [
    { name: 'Peri Peri', emoji: '🌶️', desc: 'Bird\'s eye chili roast' },
    { name: 'Chilli Cheese', emoji: '🧀', desc: 'Sharp cheddar & green chili' },
    { name: 'Chilli Lime', emoji: '🍋', desc: 'Zesty key lime & chili dust' },
    { name: 'Kashmiri Garlic', emoji: '🧄', desc: 'Warm garlic & Kashmiri chili' },
    { name: 'Pudhina', emoji: '🌿', desc: 'Garden mint & pink rock salt' },
  ]

  return (
    <section className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#141416]/10 relative overflow-hidden" id="try-all-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Container */}
        <div className="relative rounded-[2.5rem] bg-[#141416] text-[#FAF7F2] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl border border-[#FAF7F2]/10">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#FF4D15]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Value Proposition & Size Selector */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D15] text-white font-mono text-xs font-extrabold uppercase tracking-widest shadow-xs">
                  ⭐ THE OFFICIAL STARTER BOX
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider">
                  SAVE ₹40 OVER SINGLES
                </span>
              </div>

              <div className="space-y-2">
                <p className="font-hindi text-lg sm:text-xl font-bold text-[#FF4D15]">
                  Can't pick one? Try all five.
                </p>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none">
                  EK BOX. <span className="text-[#FF4D15]">PAANCH</span> CHASKE.
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed max-w-xl font-normal">
                Experience the complete CHASKA universe in one sampler box. Contains exactly 1 pouch of each of our 5 signature slow-roasted flavours. No guesswork, no compromises.
              </p>

              {/* 5 Flavour Pills Breakdown */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#FAF7F2]/60">
                  WHAT'S INSIDE EVERY BOX:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {flavoursIncluded.map((flv) => (
                    <div
                      key={flv.name}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2"
                    >
                      <span className="text-base">{flv.emoji}</span>
                      <div className="min-w-0">
                        <p className="font-display text-xs font-bold text-white truncate">{flv.name}</p>
                        <p className="font-mono text-[9px] text-[#FAF7F2]/50 truncate">{flv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selector + Pricing */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Size Toggle */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FAF7F2]/60">
                      CHOOSE BOX SIZE:
                    </span>
                    <div className="inline-flex rounded-full bg-white/10 p-1 border border-white/10">
                      {['50g', '100g'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-5 py-2 rounded-full font-mono text-xs font-extrabold uppercase tracking-wider transition-all ${
                            selectedSize === sz
                              ? 'bg-[#FF4D15] text-white shadow-xs'
                              : 'text-[#FAF7F2]/70 hover:text-white'
                          }`}
                        >
                          {sz} Box
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-3xl sm:text-4xl font-black text-white">
                        ₹{price}
                      </span>
                      {mrp > price && (
                        <span className="font-mono text-base text-white/50 line-through">
                          ₹{mrp}
                        </span>
                      )}
                      <span className="font-mono text-xs font-extrabold text-[#FF4D15] bg-[#FF4D15]/20 px-2 py-0.5 rounded-full">
                        {discount}% OFF
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[#FAF7F2]/60">
                      Includes 5 individual {selectedSize} pouches
                    </p>
                  </div>

                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isAvailable || isAdding}
                    className={`btn px-8 py-4 text-xs font-black tracking-widest shadow-md transition-all ${
                      !isAvailable
                        ? 'bg-white/20 text-white/40 cursor-not-allowed border-transparent'
                        : isAdded
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isAdding
                        ? 'bg-[#E63E07] text-white opacity-85'
                        : 'bg-[#FF4D15] hover:bg-[#E63E07] text-white'
                    }`}
                  >
                    {!isAvailable ? 'CURRENTLY SOLD OUT' : isAdded ? 'ADDED TO STASH ✓' : isAdding ? 'ADDING...' : `ADD TRY ALL 5 TO STASH • ₹${price}`}
                  </button>

                  <Link
                    to="/products/chaska-try-all-5"
                    className="px-6 py-4 rounded-full border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    VIEW DETAILS ➔
                  </Link>
                </div>

              </div>

            </div>

            {/* Right Column: Hero Box Imagery */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-white/5 p-3 shadow-2xl group">
                <img
                  src={photos.tabletopLifestyle.src}
                  alt="CHASKA Try All 5 Makhana Sampler Box"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#FF4D15] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                  5 FULL PACKS
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#141416]/90 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex justify-between items-center">
                  <span className="font-bold text-[#FF4D15]">ZERO GUESSWORK</span>
                  <span className="text-[#FAF7F2]/80">5 x {selectedSize} Pouches</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
