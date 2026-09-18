import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchShopifyProducts, fetchShopifyCollectionByHandle } from '../lib/shopify/api'

const COLLECTION_METADATA = {
  all: {
    title: 'ALL PRODUCTS',
    badge: 'THE FULL CRUNCH CATALOGUE',
    description: 'Slow-roasted Bihar lotus seeds in chef-crafted small batches. 100% natural spices, zero frying.',
  },
  'best-sellers': {
    title: 'BEST SELLERS',
    badge: 'COMMUNITY FAVOURITES ⭐',
    description: 'Our most-ordered flavour profiles and variety boxes for instant snacking satisfaction.',
  },
  flavours: {
    title: 'SINGLE FLAVOUR PACKS',
    badge: 'INDIVIDUAL FLAVOUR PACKS',
    description: 'Signature roasted makhana packs available in 50g & 100g with Pack of 3, 6, and 10 options.',
  },
  bundles: {
    title: 'VARIETY SAMPLER BOXES',
    badge: 'ALL 5 FLAVOURS IN ONE BOX',
    description: 'Chaska Try All 5 Sampler Box. Experience every single flavour in one convenient drop.',
  },
}

export default function Shop() {
  const { handle: urlHandle } = useParams()
  const initialCategory = urlHandle ? urlHandle.toLowerCase() : 'all'

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [products, setProducts] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (urlHandle) {
      setActiveCategory(urlHandle.toLowerCase())
    }
  }, [urlHandle])

  const loadProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (urlHandle && urlHandle !== 'all' && urlHandle !== 'best-sellers' && urlHandle !== 'flavours' && urlHandle !== 'bundles') {
        const col = await fetchShopifyCollectionByHandle(urlHandle)
        if (col && Array.isArray(col.products)) {
          setProducts(col.products)
          setIsLoading(false)
          return
        }
      }

      const liveProducts = await fetchShopifyProducts(25)
      if (liveProducts && Array.isArray(liveProducts)) {
        setProducts(liveProducts)
      } else {
        setProducts([])
      }
    } catch (err) {
      console.warn('[Shopify Storefront API Error]', err)
      setError(err.message || 'Unable to connect to Shopify Storefront API')
      setProducts([])
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
    description: 'Explore our premium roasted lotus seed packs and sampler boxes.',
  }

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (activeCategory === 'best-sellers') {
      list = list.filter((p) => p.handle?.includes('peri-peri') || p.handle?.includes('cheese') || p.handle?.includes('try-all-5'))
    } else if (activeCategory === 'flavours') {
      list = list.filter((p) => p.handle !== 'chaska-try-all-5')
    } else if (activeCategory === 'bundles') {
      list = list.filter((p) => p.handle === 'chaska-try-all-5' || p.category?.includes('Bundle') || p.name?.toLowerCase().includes('box'))
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
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [activeCategory, products, searchFilter, sortBy])

  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#FAF8F5] dark:bg-[#0C0C0C] transition-colors">
      <div className="mx-auto max-w-7xl space-y-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-xs text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#FF5400] transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[#FF5400] transition-colors">COLLECTIONS</Link>
          <span>/</span>
          <span className="text-[#141414] dark:text-white font-bold">{currentMeta.title}</span>
        </nav>

        {/* Header Banner */}
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#141414] dark:bg-[#121212] text-white space-y-6 shadow-md relative overflow-hidden border border-stone-800">
          <div className="max-w-2xl space-y-3.5 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
              {currentMeta.badge}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none">
              {currentMeta.title}
            </h1>
            <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
              {currentMeta.description}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-stone-800 relative z-10">
            {[
              { id: 'all', label: 'ALL PRODUCTS', to: '/collections/all' },
              { id: 'best-sellers', label: '⭐ BEST SELLERS', to: '/collections/best-sellers' },
              { id: 'flavours', label: 'SINGLE FLAVOURS', to: '/collections/flavours' },
              { id: 'bundles', label: 'TRY ALL 5 BOX', to: '/collections/bundles' },
            ].map((cat) => (
              <Link
                key={cat.id}
                to={cat.to}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4.5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#FF5400] text-white shadow-xs'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#141414] border border-stone-200/80 dark:border-stone-800 shadow-xs">
          <div className="relative w-full sm:w-80 flex items-center">
            <span className="absolute left-3 text-stone-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search flavours & packs..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-[#FAF8F5] dark:bg-[#1E1E1E] rounded-xl border border-stone-200/80 dark:border-stone-700 font-sans text-xs text-[#141414] dark:text-white placeholder-stone-400 focus:outline-none focus:border-[#FF5400]"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                className="absolute right-3 text-xs font-mono text-stone-400 hover:text-[#141414] dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span className="font-mono text-xs text-stone-500 dark:text-stone-400 font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 bg-[#FAF8F5] dark:bg-[#1E1E1E] rounded-xl border border-stone-200/80 dark:border-stone-700 font-mono text-xs font-bold text-stone-700 dark:text-stone-200 focus:outline-none focus:border-[#FF5400]"
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
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-[460px] rounded-3xl bg-white dark:bg-[#141414] border border-stone-200/80 dark:border-stone-800 p-6 flex flex-col justify-between animate-pulse"
              >
                <div className="aspect-[4/3] w-full rounded-2xl bg-stone-100 dark:bg-stone-800" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 w-1/3 rounded bg-stone-100 dark:bg-stone-800" />
                  <div className="h-6 w-3/4 rounded bg-stone-100 dark:bg-stone-800" />
                  <div className="h-3 w-full rounded bg-stone-100 dark:bg-stone-800" />
                </div>
                <div className="h-10 w-full rounded-full bg-stone-200 dark:bg-stone-800 mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-3xl bg-white dark:bg-[#141414] border border-red-200 dark:border-red-900/60 p-10 text-center space-y-4 shadow-sm max-w-lg mx-auto">
            <span className="text-3xl block">⚠️</span>
            <h3 className="font-display text-xl font-bold uppercase text-[#141414] dark:text-white">
              Unable to load Shopify catalogue
            </h3>
            <p className="font-mono text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {error}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={loadProducts}
                className="btn px-6 py-3 text-xs font-bold shadow-sm"
              >
                RELOAD CATALOGUE ➔
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="rounded-3xl bg-white dark:bg-[#141414] border border-stone-200/80 dark:border-stone-800 p-12 text-center space-y-3 shadow-xs max-w-md mx-auto">
            <span className="text-3xl block">🍿</span>
            <h3 className="font-display text-lg font-bold uppercase text-[#141414] dark:text-white">
              No products found
            </h3>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-normal">
              Try adjusting your filter or search query.
            </p>
          </div>
        )}

        {/* Populated Product Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id || product.handle} product={product} index={i} />
            ))}
          </div>
        )}

        {/* Try All 5 Callout Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141414] dark:bg-[#121212] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-stone-800">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-bold uppercase">
              ALL 5 FLAVOURS IN ONE BOX
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
              CAN'T DECIDE? GET THE TRY ALL 5 BOX
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              1 pouch each of Peri Peri, Chilli Cheese, Chilli Lime, Kashmiri Garlic Chilli, and Pudhina.
            </p>
          </div>
          <Link
            to="/products/chaska-try-all-5"
            className="btn px-7 py-3.5 text-xs font-bold shrink-0 shadow-sm"
          >
            EXPLORE TRY ALL 5 ➔
          </Link>
        </div>

      </div>
    </main>
  )
}
