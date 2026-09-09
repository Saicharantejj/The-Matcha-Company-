import { useState, useMemo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { PRODUCTS_CATALOGUE, getLiveProducts } from '../data/products'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [productsList, setProductsList] = useState(PRODUCTS_CATALOGUE)

  useEffect(() => {
    async function load() {
      const live = await getLiveProducts()
      if (live && live.length > 0) {
        setProductsList(live)
      }
    }
    load()
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') return productsList
    if (activeCategory === 'FLAVOURS') return productsList.filter((p) => p.category === 'Flavoured Makhana')
    if (activeCategory === 'BUNDLES') return productsList.filter((p) => p.category === 'Snack Bundles' || p.category === 'Gift Hampers')
    return productsList
  }, [activeCategory, productsList])

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F8EECB]">
      <div className="mx-auto max-w-[96rem] space-y-12">
        
        {/* Header Banner */}
        <div className="p-8 sm:p-14 rounded-[2.5rem] bg-[#6E433D] text-[#F8EECB] space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-widest">
              THE FULL CRUNCH CATALOGUE
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
              SHOP CHASKA
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#F8EECB]/80 leading-relaxed">
              Handpicked lotus seeds slow-roasted in small batches by CHASKA. Explore single packs or curated variety stash boxes.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#F8EECB]/15 relative z-10">
            {[
              { id: 'ALL', label: 'ALL MAKHANA' },
              { id: 'FLAVOURS', label: 'SINGLE FLAVORS' },
              { id: 'BUNDLES', label: 'VARIETY BOXES & GIFTS' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#D23D2D] text-[#F8EECB] shadow-md scale-105'
                    : 'bg-white/10 text-[#F8EECB] border border-[#F8EECB]/20 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id || product.handle} product={product} index={i} />
          ))}
        </div>

        {/* Custom Box Banner */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#31603D] text-[#F8EECB] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#F8EECB] text-[#31603D] font-mono text-xs font-bold uppercase">
              10% BUNDLE SAVINGS
            </span>
            <h2 className="font-display text-3xl font-bold uppercase text-white">
              BUILD YOUR CUSTOM CHASKA STASH
            </h2>
            <p className="font-mono text-xs text-[#F8EECB]/80 leading-relaxed">
              Select your exact ratio of sweet, spicy, and savory flavors in our interactive stash builder.
            </p>
          </div>
          <NavLink to="/build-your-box" className="btn bg-[#D23D2D] text-[#F8EECB] hover:bg-[#6E433D] px-8 py-4 text-xs font-bold shrink-0">
            BUILD YOUR BOX &rarr;
          </NavLink>
        </div>

      </div>
    </main>
  )
}
