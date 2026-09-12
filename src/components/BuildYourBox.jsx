import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { fetchShopifyProducts } from '../lib/shopify/api'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function BuildYourBox() {
  const defaultPacks = PRODUCTS_CATALOGUE.filter((p) => p.category === 'Flavoured Makhana')
  const [flavorPacks, setFlavorPacks] = useState(defaultPacks)
  const [selectedFlavors, setSelectedFlavors] = useState(defaultPacks.slice(0, 4))
  const { addItem, openCart } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    async function load() {
      try {
        const live = await fetchShopifyProducts(10)
        if (live && live.length > 0) {
          const singles = live.filter((p) => p.category === 'Flavoured Makhana' || !p.name?.toLowerCase().includes('box'))
          setFlavorPacks(singles)
          if (singles.length >= 4) {
            setSelectedFlavors([singles[0], singles[1], singles[2], singles[3]])
          } else {
            setSelectedFlavors(singles)
          }
        }
      } catch (err) {
        console.warn('[BuildYourBox Shopify Error, using local catalog]', err)
      }
    }
    load()
  }, [])

  const varietyBoxProduct = flavorPacks.find((p) => p.name?.toLowerCase().includes('box') || p.id?.includes('variety')) || flavorPacks[0] || {
    id: 'chaska-custom-box',
    name: 'Custom 4-Pack Stash Box',
    price: 899,
    displayPrice: '₹899',
  }

  const handleSelectSlot = (index, product) => {
    const next = [...selectedFlavors]
    next[index] = product
    setSelectedFlavors(next)
  }

  const handleAddBoxToCart = () => {
    addItem(varietyBoxProduct, 1)
    addToast('Custom CHASKA Stash Box added to cart! 📦', 'success')
  }

  return (
    <section className="py-24 bg-[#F5EEDD] border-y border-[#17245B]/15 relative overflow-hidden" id="build-your-box">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
            STASH BUILDER
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#17245B] leading-none flex flex-wrap items-baseline gap-3">
            <span>BUILD YOUR BOX.</span>
            <span className="text-[#E2AE35] font-hindi text-3xl sm:text-5xl font-extrabold">अपना BOX बनाओ</span>
          </h2>
          <p className="text-[#17245B]/80 text-base font-body leading-relaxed font-medium">
            Pick your 4 favourite flavours. Mix it up. Make your perfect CHASKA snack stash.
          </p>
        </div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 4-Slot Selection Panel */}
          <div className="lg:col-span-7 bg-white border border-[#17245B]/15 rounded-3xl p-6 sm:p-10 shadow-card">
            <h3 className="font-display text-lg font-bold text-[#17245B] mb-6 flex items-center justify-between">
              <span>YOUR 4-PACK SELECTION</span>
              <span className="font-mono text-xs text-[#E2AE35] font-bold">4 / 4 SLOTS FILLED</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedFlavors.map((item, slotIdx) => (
                <div
                  key={slotIdx}
                  className="bg-[#FAF6ED] border border-[#17245B]/10 rounded-2xl p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-[#E2AE35] uppercase">SLOT 0{slotIdx + 1}</span>
                    <span className="font-mono text-[10px] text-[#17245B]/60 font-bold uppercase">70G PACK</span>
                  </div>

                  <div className="my-2 flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-white border border-[#17245B]/10 p-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image || photos.masalaPouchHero.src}
                        alt={item.flavor || item.name}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm sm:text-base text-[#17245B] line-clamp-1">{item.flavor || item.name}</p>
                      <p className="font-mono text-[10px] text-[#A9223A] font-bold">{item.spiceLevel || 'Chef Crafted'}</p>
                    </div>
                  </div>

                  <select
                    value={item.id}
                    onChange={(e) => {
                      const match = flavorPacks.find((p) => p.id === e.target.value)
                      if (match) handleSelectSlot(slotIdx, match)
                    }}
                    className="mt-3 w-full bg-white border border-[#17245B]/20 rounded-xl px-3 py-2 font-mono text-xs text-[#17245B] font-bold focus:outline-none focus:border-[#E2AE35] transition-colors"
                  >
                    {flavorPacks.map((fp) => (
                      <option key={fp.id} value={fp.id}>
                        {fp.flavor || fp.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary Card (Midnight Indigo) */}
          <div className="lg:col-span-5 bg-[#17245B] text-[#F5EEDD] rounded-3xl p-8 sm:p-10 shadow-pop flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-[10px] font-bold uppercase tracking-widest">
                BUNDLE SAVINGS
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-white leading-none">
                4-PACK STASH BOX
              </h3>
              <p className="text-[#F5EEDD]/90 text-sm leading-relaxed font-body">
                Save 10% on your box plus free shipping across India. Packed in our collectible box.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#F5EEDD]/20">
              <div className="flex justify-between font-mono text-xs text-[#F5EEDD]/80 font-bold">
                <span>Individual 4 Packs</span>
                <span className="line-through">₹796</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#F5EEDD]/80 font-bold">
                <span>Bundle Discount</span>
                <span className="text-[#E2AE35] font-extrabold">-₹97</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#F5EEDD]/80 font-bold">
                <span>Shipping</span>
                <span className="text-[#E2AE35] font-extrabold">FREE</span>
              </div>
              <div className="flex justify-between items-baseline font-display text-3xl font-black text-white pt-3 border-t border-[#F5EEDD]/20">
                <span>TOTAL</span>
                <span className="text-[#E2AE35]">₹699</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddBoxToCart}
              className="btn w-full py-4 text-center justify-center font-bold text-xs bg-[#E2AE35] hover:bg-white text-[#17245B] transition-colors shadow-lg"
            >
              ADD STASH BOX TO CART ➔
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}

