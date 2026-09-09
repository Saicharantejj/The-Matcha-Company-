import { useState, useMemo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchShopifyProducts } from '../lib/shopify/api'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const liveProducts = await fetchShopifyProducts(25)
      setProducts(liveProducts || [])
    } catch (err) {
      console.error('[Shopify Products Fetch Error]', err)
      setError(err.message || 'Unable to connect to Shopify store.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') return products
    if (activeCategory === 'FLAVOURS') {
      return products.filter((p) => p.category === 'Flavoured Makhana' || !p.category?.includes('Bundle'))
    }
    if (activeCategory === 'BUNDLES') {
      return products.filter((p) => p.category === 'Snack Bundles' || p.category === 'Gift Hampers' || p.name?.toLowerCase().includes('box') || p.name?.toLowerCase().includes('hamper'))
    }
    return products
  }, [activeCategory, products])

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
              Handpicked lotus seeds slow-roasted in small batches by CHASKA. Powered by our official Shopify commerce store.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#F8EECB]/15 relative z-10">
            {[
              { id: 'ALL', label: 'ALL PRODUCTS' },
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

        {/* ── PRODUCT CONTENT AREA ────────────────────────────────────────── */}

        {/* 1. Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-[460px] rounded-3xl bg-white/60 border border-[#6E433D]/10 p-6 flex flex-col justify-between animate-pulse"
              >
                <div className="aspect-[4/3] w-full rounded-2xl bg-[#6E433D]/10" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 w-1/3 rounded bg-[#6E433D]/15" />
                  <div className="h-6 w-3/4 rounded bg-[#6E433D]/20" />
                  <div className="h-3 w-full rounded bg-[#6E433D]/10" />
                </div>
                <div className="h-10 w-full rounded-full bg-[#6E433D]/15 mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && error && (
          <div className="rounded-3xl bg-white border border-[#D23D2D]/30 p-10 sm:p-14 text-center space-y-5 shadow-card max-w-2xl mx-auto">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0EC] text-3xl">
              ⚠️
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#6E433D]">
              Unable to load Shopify products
            </h3>
            <p className="font-mono text-xs text-[#6E433D]/80 leading-relaxed max-w-md mx-auto">
              {error}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={loadProducts}
                className="btn bg-[#D23D2D] hover:bg-[#6E433D] px-8 py-3.5 text-xs font-bold shadow-md"
              >
                RETRY SHOPIFY CONNECTION
              </button>
            </div>
          </div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="rounded-3xl bg-white border border-[#6E433D]/15 p-12 sm:p-16 text-center space-y-4 shadow-card max-w-xl mx-auto">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF6EE] text-3xl">
              🍿
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#6E433D]">
              No products found
            </h3>
            <p className="font-mono text-xs text-[#6E433D]/70 max-w-sm mx-auto">
              No products are currently available in the selected category from Shopify.
            </p>
          </div>
        )}

        {/* 4. Populated Product Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id || product.handle} product={product} index={i} />
            ))}
          </div>
        )}

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
