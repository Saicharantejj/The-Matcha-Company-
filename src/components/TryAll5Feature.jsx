import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

export default function TryAll5Feature({ product }) {
  const { addItem } = useCart()
  const { addToast } = useToast()

  const [selectedSize, setSelectedSize] = useState('50g')
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  // Resolve against actual Shopify variant for Try All 5
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
      }, 1200)
    } catch {
      setIsAdding(false)
      addToast('Could not add to cart. Please try again.', 'error')
    }
  }

  const flavoursIncluded = [
    { name: 'Peri Peri', tag: 'FIERY BIRD’S EYE CHILI' },
    { name: 'Chilli Cheese', tag: 'AGED CHEDDAR & GREEN CHILI' },
    { name: 'Chilli Lime', tag: 'KEY LIME & CRUSHED CHILI' },
    { name: 'Kashmiri Garlic', tag: 'ROASTED GARLIC & RED CHILI' },
    { name: 'Pudhina', tag: 'GARDEN MINT & ROCK SALT' },
  ]

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0C122C] border-b border-stone-200/80 dark:border-[#243373] relative overflow-hidden transition-colors" id="try-all-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Luxury Container */}
        <div className="relative rounded-3xl bg-[#17245B] dark:bg-[#131D4A] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-card border border-[#243373]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Value Proposition & Size Selector */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-2xs">
                  THE STARTER SAMPLER
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider border border-white/10">
                  ALL 5 FLAVOURS INCLUDED
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
                  YOUR CHASKA. <br />
                  <span className="text-[#FF5400]">YOUR RULES.</span>
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl font-normal">
                Can't pick just one? Experience the complete Chaska lineup. Contains 1 pouch of each of our 5 signature slow-roasted flavours. Zero guesswork.
              </p>

              {/* 5 Flavour List Breakdown */}
              <div className="space-y-2 pt-1">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-stone-300">
                  WHAT'S INSIDE EVERY BOX:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {flavoursIncluded.map((flv, idx) => (
                    <div
                      key={flv.name}
                      className="p-3 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-display text-xs font-bold text-white">{flv.name}</p>
                        <p className="font-sans text-[10px] text-stone-300">{flv.tag}</p>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#FF5400]">
                        0{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selector + Pricing */}
              <div className="pt-4 border-t border-white/15 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Size Toggle */}
                  <div className="space-y-1.5">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-stone-300">
                      CHOOSE BOX SIZE:
                    </span>
                    <div className="inline-flex rounded-full bg-white/10 p-1 border border-white/10">
                      {['50g', '100g'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
                            selectedSize === sz
                              ? 'bg-[#FF5400] text-white shadow-xs'
                              : 'text-stone-300 hover:text-white'
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
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                        ₹{price}
                      </span>
                      {mrp > price && (
                        <span className="font-sans text-base text-stone-300 line-through font-medium">
                          ₹{mrp}
                        </span>
                      )}
                      <span className="font-mono text-xs font-bold text-white bg-[#FF5400] px-2 py-0.5 rounded-full">
                        {discount}% OFF
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-stone-300">
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
                    className={`btn-orange px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all ${
                      !isAvailable
                        ? 'bg-white/20 text-white/40 cursor-not-allowed border-transparent'
                        : isAdded
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isAdding
                        ? 'bg-white text-[#17245B] opacity-85'
                        : 'bg-[#FF5400] hover:bg-white text-white hover:text-[#17245B]'
                    }`}
                  >
                    {!isAvailable ? 'SOLD OUT' : isAdded ? 'ADDED TO STASH ✓' : isAdding ? 'ADDING...' : `ADD TRY ALL 5 TO STASH • ₹${price}`}
                  </button>

                  <Link
                    to="/products/chaska-try-all-5"
                    className="px-6 py-3.5 rounded-full border border-white/20 text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    DETAILS ➔
                  </Link>
                </div>

              </div>

            </div>

            {/* Right Column: Hero Box Imagery */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-2 shadow-2xl group">
                <img
                  src={photos.tabletopLifestyle.src}
                  alt="CHASKA Try All 5 Makhana Sampler Box"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-2xs">
                  5 FULL PACKS
                </div>
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-[#17245B]/90 backdrop-blur-md border border-white/15 text-xs font-sans text-white flex justify-between items-center">
                  <span className="font-semibold text-[#FF5400]">ZERO GUESSWORK</span>
                  <span className="text-stone-300">5 x {selectedSize} Pouches</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
