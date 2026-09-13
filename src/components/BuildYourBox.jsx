import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { fetchShopifyProductByHandle } from '../lib/shopify/api'
import { photos } from '../data/photos'

export default function BuildYourBox() {
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('50g')
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
        console.warn('[BuildYourBox Shopify Error]', err)
      }
    }
    load()
  }, [])

  const variants = product?.variants || []
  const activeVariant = variants.find((v) => {
    const sizeOpt = v.selectedOptions?.find((o) => o.name?.toLowerCase() === 'size')?.value
    return sizeOpt === selectedSize || v.title?.toLowerCase().includes(selectedSize.toLowerCase())
  }) || variants[0]

  const isAvailable = activeVariant ? Boolean(activeVariant.availableForSale) : Boolean(product?.availableForSale)

  const price = activeVariant ? activeVariant.price : (selectedSize === '50g' ? 710 : 1410)
  const mrp = activeVariant?.mrp && activeVariant.mrp > price ? activeVariant.mrp : (selectedSize === '50g' ? 900 : 1600)
  const savings = mrp - price

  const handleAddBoxToCart = async () => {
    if (!isAvailable || isAdding) return

    setIsAdding(true)
    try {
      const selectedVariantId = activeVariant?.id || product?.variantId || product?.id
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

  const allFlavours = [
    { name: 'Peri Peri Makhana', spice: 'High Heat 🌶️', desc: 'Bird\'s eye chilli roast' },
    { name: 'Chilli Cheese Makhana', spice: 'Medium 🧀🌶️', desc: 'Sharp cheddar & green chili' },
    { name: 'Chilli Lime Makhana', spice: 'Tangy 🍋🌶️', desc: 'Zesty Mexican key lime' },
    { name: 'Kashmiri Garlic Chilli', spice: 'Warm 🧄🌶️', desc: 'Aromatic roasted garlic' },
    { name: 'Pudhina Makhana', spice: 'Zesty 🌿', desc: 'Fresh garden spearmint' },
  ]

  return (
    <section className="py-20 sm:py-24 bg-[#FAF6ED] border-y border-[#17245B]/15 relative overflow-hidden" id="build-your-box">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-xs font-extrabold uppercase tracking-widest shadow-2xs">
            ⭐ 5-IN-1 VARIETY BOX
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#17245B] leading-none">
            CHASKA <span className="text-[#A9223A]">TRY ALL 5.</span>
          </h2>
          <p className="text-[#17245B]/75 text-sm sm:text-base leading-relaxed font-normal">
            Can't pick one? Experience all 5 signature slow-roasted flavours in one complete stash box.
          </p>
        </div>

        {/* Box Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 5 Included Pouches */}
          <div className="lg:col-span-7 bg-white border border-[#17245B]/15 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#17245B] uppercase flex items-center justify-between">
              <span>ALL 5 POUCHES INCLUDED</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#17245B] text-[#F5EEDD] font-mono text-xs font-bold">
                5 / 5 FLAVOURS
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allFlavours.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF6ED] border border-[#17245B]/10 rounded-2xl p-3.5 flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-[9px] font-bold text-[#A9223A] uppercase block">
                      POUCH 0{idx + 1} • {selectedSize}
                    </span>
                    <p className="font-display font-bold text-sm text-[#17245B]">{item.name}</p>
                    <p className="font-sans text-[11px] text-[#17245B]/65">{item.desc}</p>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#17245B]/60">
                    {item.spice}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-mono text-[11px] text-[#17245B]/60 pt-2 border-t border-[#17245B]/10">
              ✓ Every box contains 1 pouch of each of our 5 flavours. No duplicate filler.
            </p>
          </div>

          {/* Right: Box Summary & Purchase */}
          <div className="lg:col-span-5 bg-white border border-[#17245B]/15 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-[#A9223A]">
                  STEP 1: SELECT SIZE
                </span>
                <div className="grid grid-cols-2 gap-2.5 mt-2">
                  {['50g', '100g'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 rounded-2xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all border-2 text-center ${
                        selectedSize === sz
                          ? 'border-[#17245B] bg-[#17245B] text-[#F5EEDD] shadow-xs'
                          : 'border-[#17245B]/20 bg-white text-[#17245B] hover:border-[#17245B]/40'
                      }`}
                    >
                      {sz} Box
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-4.5 rounded-2xl bg-[#FAF6ED] border border-[#17245B]/10 space-y-2">
                <div className="flex justify-between font-mono text-xs text-[#17245B]/70">
                  <span>5x {selectedSize} Pouches MRP</span>
                  <span className="line-through">₹{mrp}</span>
                </div>
                <div className="flex justify-between font-mono text-xs text-emerald-700 font-bold">
                  <span>Bundle Saving</span>
                  <span>-₹{savings}</span>
                </div>
                <div className="border-t border-[#17245B]/10 pt-2 flex justify-between items-baseline">
                  <span className="font-display text-base font-bold text-[#17245B] uppercase">Box Price</span>
                  <span className="font-display text-2xl font-black text-[#17245B]">₹{price}</span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[11px] text-[#17245B]/70">
                <p>✓ Free Pan-India Delivery on this box</p>
                <p>✓ Fresh nitrogen-flushed pouches</p>
                <p>✓ 100% slow-roasted, zero palm oil</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddBoxToCart}
                disabled={!isAvailable || isAdding}
                className={`w-full py-4 rounded-full font-mono text-xs font-black uppercase tracking-widest transition-all shadow-sm ${
                  !isAvailable
                    ? 'bg-[#17245B]/20 text-[#17245B]/40 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : isAdding
                    ? 'bg-[#17245B] text-[#F5EEDD]'
                    : 'bg-[#E2AE35] hover:bg-[#17245B] text-[#17245B] hover:text-[#F5EEDD]'
                }`}
              >
                {!isAvailable ? 'SOLD OUT' : isAdded ? 'ADDED TO STASH ✓' : isAdding ? 'ADDING...' : `ADD TRY ALL 5 TO STASH • ₹${price}`}
              </button>

              <Link
                to="/products/chaska-try-all-5"
                className="block text-center font-mono text-xs font-bold text-[#17245B]/70 hover:text-[#E2AE35] transition-colors"
              >
                View Full Product Details ➔
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
