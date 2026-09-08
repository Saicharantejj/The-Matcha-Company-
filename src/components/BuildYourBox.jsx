import { useState } from 'react'
import { PRODUCTS_CATALOGUE } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

export default function BuildYourBox() {
  const flavorPacks = PRODUCTS_CATALOGUE.filter((p) => p.category === 'Flavoured Makhana')
  const varietyBoxProduct = PRODUCTS_CATALOGUE.find((p) => p.id === 'makhana-variety-box') || PRODUCTS_CATALOGUE[0]

  const [selectedFlavors, setSelectedFlavors] = useState([
    flavorPacks[0],
    flavorPacks[1],
    flavorPacks[2],
    flavorPacks[3],
  ])

  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleSelectSlot = (index, product) => {
    const next = [...selectedFlavors]
    next[index] = product
    setSelectedFlavors(next)
  }

  const handleAddBoxToCart = () => {
    addItem(varietyBoxProduct, 1)
    notify(`Custom Stash Box added to cart!`, { action: 'View Cart', onAction: openCart })
  }

  return (
    <section className="py-24 bg-[#F8EECB] border-y border-[#6E433D]/15 relative overflow-hidden" id="build-your-box">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
            STASH BUILDER
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#6E433D] leading-none">
            BUILD YOUR BOX.
          </h2>
          <p className="text-[#8A5D57] text-base font-body leading-relaxed font-medium">
            Pick your 4 favourite flavours. Mix it up. Make your perfect snack stash.
          </p>
        </div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 4-Slot Selection Panel */}
          <div className="lg:col-span-7 bg-white border border-[#6E433D]/15 rounded-3xl p-6 sm:p-10 shadow-card">
            <h3 className="font-display text-lg font-bold text-[#6E433D] mb-6 flex items-center justify-between">
              <span>YOUR 4-PACK SELECTION</span>
              <span className="font-mono text-xs text-[#31603D] font-bold">4 / 4 SLOTS FILLED</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedFlavors.map((item, slotIdx) => (
                <div
                  key={slotIdx}
                  className="bg-[#FBF4DC] border border-[#6E433D]/10 rounded-2xl p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-[#D23D2D] uppercase">SLOT 0{slotIdx + 1}</span>
                  </div>

                  <div className="my-2">
                    <p className="font-display font-bold text-base text-[#6E433D]">{item.flavor}</p>
                    <p className="font-mono text-[10px] text-[#8A5D57] font-bold uppercase">70G PACK</p>
                  </div>

                  <select
                    value={item.id}
                    onChange={(e) => {
                      const match = flavorPacks.find((p) => p.id === e.target.value)
                      if (match) handleSelectSlot(slotIdx, match)
                    }}
                    className="mt-3 w-full bg-white border border-[#6E433D]/20 rounded-xl px-3 py-2 font-mono text-xs text-[#6E433D] font-bold focus:outline-none focus:border-[#D23D2D] transition-colors"
                  >
                    {flavorPacks.map((fp) => (
                      <option key={fp.id} value={fp.id}>
                        {fp.flavor}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="lg:col-span-5 bg-[#31603D] text-[#F8EECB] rounded-3xl p-8 sm:p-10 shadow-pop flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#F5C065] text-[#6E433D] font-mono text-[10px] font-bold uppercase tracking-widest">
                BUNDLE SAVINGS
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-white leading-none">
                4-PACK STASH BOX
              </h3>
              <p className="text-[#F8EECB]/90 text-sm leading-relaxed font-body">
                Save 10% on your box plus free shipping across India. Packed in our collectible box.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#F8EECB]/20">
              <div className="flex justify-between font-mono text-xs text-[#F8EECB]/80 font-bold">
                <span>Individual 4 Packs</span>
                <span className="line-through">₹796</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#F8EECB]/80 font-bold">
                <span>Bundle Discount</span>
                <span className="text-[#F5C065] font-extrabold">-₹97</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#F8EECB]/80 font-bold">
                <span>Shipping</span>
                <span className="text-[#F5C065] font-extrabold">FREE</span>
              </div>
              <div className="flex justify-between items-baseline font-display text-3xl font-black text-white pt-3 border-t border-[#F8EECB]/20">
                <span>TOTAL</span>
                <span className="text-[#F5C065]">₹699</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddBoxToCart}
              className="btn w-full py-4 text-center justify-center font-bold text-xs bg-[#D23D2D] hover:bg-white hover:text-[#6E433D] text-[#F8EECB] transition-colors shadow-lg"
            >
              ADD STASH BOX TO CART ➔
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
