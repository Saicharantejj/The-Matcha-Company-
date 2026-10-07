import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchShopifyProducts, fetchShopifyCollectionByHandle } from '../lib/shopify/api'
import { PRODUCTS_CATALOGUE } from '../data/products'

const COLLECTION_METADATA = {
  all: {
    title: 'OFFICIAL CATALOGUE',
    badge: 'COMPLETE COLLECTION',
    description: 'Explore the 3 available flavours (Pudina, Jalapeño, Cheese) and flavours currently in progress.',
  },
  available: {
    title: 'AVAILABLE NOW',
    badge: '🔥 AVAILABLE FOR PURCHASE',
    description: 'Our 3 signature flavours: Pudina, Jalapeño, and Cheese. Available in 30g (₹129) and 70g (₹229) pouches with multi-pack savings.',
  },
  'coming-soon': {
    title: 'IN PROGRESS',
    badge: '🧪 COMING SOON',
    description: 'Flavours currently being perfected: Kashmiri Chilli Lime Garlic, South African Peri Peri, and Dark Chocolate Brownie.',
  },
}

export default function Shop() {
  const { handle: urlHandle } = useParams()
  const initialCategory = urlHandle ? urlHandle.toLowerCase() : 'all'

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [products, setProducts] = useState(() => PRODUCTS_CATALOGUE)
  const [searchFilter, setSearchFilter] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (urlHandle) {
      setActiveCategory(urlHandle.toLowerCase())
    }
  }, [urlHandle])

  const loadProducts = async () => {
    setError(null)
    try {
      if (urlHandle && urlHandle !== 'all' && urlHandle !== 'available' && urlHandle !== 'coming-soon') {
        const col = await fetchShopifyCollectionByHandle(urlHandle)
        if (col && Array.isArray(col.products) && col.products.length > 0) {
          setProducts(col.products)
          setIsLoading(false)
          return
        }
      }

      const liveProducts = await fetchShopifyProducts(25)
      if (liveProducts && Array.isArray(liveProducts) && liveProducts.length > 0) {
        setProducts(liveProducts)
      } else {
        setProducts(PRODUCTS_CATALOGUE)
      }
    } catch (err) {
      console.warn('[Shopify Storefront API Error]', err)
      setProducts(PRODUCTS_CATALOGUE)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [urlHandle])

  const currentMeta = COLLECTION_METADATA[activeCategory] || {
    title: activeCategory.replace(/-/g, ' ').toUpperCase(),
    badge: 'CHASKA COLLECTION',
    description: 'Explore our roasted lotus seed packs.',
  }

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (activeCategory === 'available') {
      list = list.filter((p) => !p.isComingSoon)
    } else if (activeCategory === 'coming-soon') {
      list = list.filter((p) => p.isComingSoon)
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase()
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.flavor?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.price || 999) - (b.price || 999))
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0))
    }

    return list
  }, [activeCategory, products, searchFilter, sortBy])

  return (
    <main className="min-h-screen pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-8 bg-[#0C122C]">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-xs text-stone-400 font-semibold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#FF5400] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-white font-bold">SHOP</span>
          {activeCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#FF5400] font-bold">{currentMeta.title}</span>
            </>
          )}
        </nav>

        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#131D4A] text-white space-y-4 sm:space-y-5 shadow-md relative overflow-hidden border border-[#243373]">
          <div className="max-w-2xl space-y-2.5 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
              {currentMeta.badge}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
              {currentMeta.title}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              {currentMeta.description}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#243373] relative z-10">
            {[
              { id: 'all', label: 'ALL FLAVOURS' },
              { id: 'available', label: 'AVAILABLE NOW (3 FLAVOURS)' },
              { id: 'coming-soon', label: 'IN PROGRESS (COMING SOON)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer hover-pop-subtle hover:scale-[1.02] active:scale-[0.98] ${
                  activeCategory === cat.id
                    ? 'bg-[#FF5400] text-white border-[#FF5400] shadow-sm'
                    : 'bg-[#1C2A6B] text-stone-200 border-[#243373] hover:bg-white/20 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#131D4A] border border-[#243373] shadow-xs">
          <div className="relative w-full sm:w-80 flex items-center">
            <span className="absolute left-3 text-stone-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search flavours & packs..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-[#1C2A6B] rounded-xl border border-[#243373] font-sans text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#FF5400]"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                className="absolute right-3 text-xs font-mono text-stone-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span className="font-mono text-xs text-stone-400 font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 bg-[#1C2A6B] rounded-xl border border-[#243373] font-mono text-xs font-bold text-stone-200 focus:outline-none focus:border-[#FF5400]"
            >
              <option value="featured">SORT: FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        {/* ── PRODUCT CONTENT AREA ────────────────────────────────────────── */}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[460px] rounded-3xl bg-[#131D4A] border border-[#243373] p-6 flex flex-col justify-between animate-pulse"
              >
                <div className="aspect-[4/3] w-full rounded-2xl bg-[#1C2A6B]" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 w-1/3 rounded bg-[#1C2A6B]" />
                  <div className="h-6 w-2/3 rounded bg-[#1C2A6B]" />
                  <div className="h-3 w-full rounded bg-[#1C2A6B]" />
                </div>
                <div className="h-10 w-full rounded-full bg-[#1C2A6B] mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="p-8 rounded-3xl bg-red-950/40 border border-red-900/60 text-center space-y-4">
            <span className="text-4xl">⚠️</span>
            <h2 className="font-display text-xl font-bold uppercase text-red-200">
              COULD NOT LOAD PRODUCTS
            </h2>
            <p className="font-sans text-sm text-stone-400 max-w-md mx-auto">
              {error}
            </p>
            <button
              type="button"
              onClick={loadProducts}
              className="btn btn-primary text-xs uppercase font-bold tracking-wider"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredProducts.map((p, idx) => (
              <ProductCard
                key={p.id || p.handle || idx}
                product={p}
                index={idx}
                colorMode="dark"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="p-12 sm:p-16 rounded-3xl bg-[#131D4A] border border-[#243373] text-center space-y-4">
            <span className="text-5xl">🍿</span>
            <h2 className="font-display text-xl font-bold uppercase text-white">
              NO FLAVOURS FOUND
            </h2>
            <p className="font-sans text-sm text-stone-400 max-w-md mx-auto">
              We couldn't find any products matching your search "{searchFilter}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchFilter('')
                setActiveCategory('all')
              }}
              className="btn btn-outline-dark text-xs uppercase font-bold tracking-wider"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
