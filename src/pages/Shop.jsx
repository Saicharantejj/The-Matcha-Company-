import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchShopifyProducts, fetchShopifyCollectionByHandle } from '../lib/shopify/api'

const COLLECTION_METADATA = {
  all: {
    title: 'ALL PRODUCTS',
    badge: 'THE FULL CRUNCH CATALOGUE',
    description: 'Handpicked lotus seeds slow-roasted in small batches by CHASKA. Powered by our official Shopify commerce store.',
  },
  'best-sellers': {
    title: 'BEST SELLERS',
    badge: 'MOST LOVED SNACKS ⭐',
    description: 'The highest rated, most re-ordered flavours that our community can’t get enough of.',
  },
  flavours: {
    title: 'SINGLE FLAVOUR PACKS',
    badge: 'INDIVIDUAL PACKS • 70G',
    description: 'Signature roasted makhana pops tossed in real spices, herbs, and seasonings.',
  },
  bundles: {
    title: 'VARIETY BOXES & HAMPERS',
    badge: 'VALUE BUNDLES • SAVE UP TO 15%',
    description: 'Multi-flavor stash boxes and limited edition gift hampers for ultimate snacking value.',
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
    description: 'Explore our premium roasted lotus seed packs and hampers.',
  }

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (activeCategory === 'best-sellers') {
      list = list.filter((p) => p.badge?.includes('BESTSELLER') || p.id?.includes('peri-peri') || p.id?.includes('cheese') || p.name?.toLowerCase().includes('variety'))
    } else if (activeCategory === 'flavours') {
      list = list.filter((p) => p.category === 'Flavoured Makhana' || !p.category?.includes('Bundle'))
    } else if (activeCategory === 'bundles') {
      list = list.filter((p) => p.category === 'Snack Bundles' || p.category === 'Gift Hampers' || p.name?.toLowerCase().includes('box') || p.name?.toLowerCase().includes('hamper'))
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
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F5EEDD]">
      <div className="mx-auto max-w-[96rem] space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 font-mono text-xs text-[#17245B]/70 font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#E2AE35] transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[#E2AE35] transition-colors">COLLECTIONS</Link>
          <span>/</span>
          <span className="text-[#E2AE35]">{currentMeta.title}</span>
        </nav>

        {/* Header Banner (Midnight Indigo) */}
        <div className="p-8 sm:p-14 rounded-[2.5rem] bg-[#17245B] text-[#F5EEDD] space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold uppercase tracking-widest">
              {currentMeta.badge}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
              {currentMeta.title}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#F5EEDD]/80 leading-relaxed">
              {currentMeta.description}
            </p>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#F5EEDD]/15 relative z-10">
            {[
              { id: 'all', label: 'ALL PRODUCTS', to: '/collections/all' },
              { id: 'best-sellers', label: '⭐ BEST SELLERS', to: '/collections/best-sellers' },
              { id: 'flavours', label: 'SINGLE FLAVOURS', to: '/collections/flavours' },
              { id: 'bundles', label: 'BOXES & BUNDLES', to: '/collections/bundles' },
            ].map((cat) => (
              <Link
                key={cat.id}
                to={cat.to}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#E2AE35] text-[#17245B] shadow-md scale-105'
                    : 'bg-white/10 text-[#F5EEDD] border border-[#F5EEDD]/20 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#17245B]/15 shadow-sm">
          <div className="relative w-full sm:w-80 flex items-center">
            <span className="absolute left-3 text-[#17245B]/40 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search in collection..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF6ED] rounded-xl border border-[#17245B]/10 font-sans text-xs text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                className="absolute right-3 text-xs font-mono text-[#17245B]/50 hover:text-[#17245B]"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="font-mono text-xs text-[#17245B]/70 font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'ITEM' : 'ITEMS'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#FAF6ED] rounded-xl border border-[#17245B]/10 font-mono text-xs font-bold text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
            >
              <option value="featured">SORT: FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>


        {/* ── PRODUCT CONTENT AREA ────────────────────────────────────────── */}

        {/* 1. Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-[460px] rounded-3xl bg-white/60 border border-[#17245B]/10 p-6 flex flex-col justify-between animate-pulse"
              >
                <div className="aspect-[4/3] w-full rounded-2xl bg-[#17245B]/10" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 w-1/3 rounded bg-[#17245B]/15" />
                  <div className="h-6 w-3/4 rounded bg-[#17245B]/20" />
                  <div className="h-3 w-full rounded bg-[#17245B]/10" />
                </div>
                <div className="h-10 w-full rounded-full bg-[#17245B]/15 mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && error && (
          <div className="rounded-3xl bg-white border border-[#E2AE35]/40 p-10 sm:p-14 text-center space-y-5 shadow-card max-w-2xl mx-auto">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF6ED] text-3xl">
              ⚠️
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#17245B]">
              Unable to load Shopify products
            </h3>
            <p className="font-mono text-xs text-[#17245B]/80 leading-relaxed max-w-md mx-auto">
              {error}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={loadProducts}
                className="btn bg-[#E2AE35] text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD] px-8 py-3.5 text-xs font-bold shadow-md"
              >
                RETRY SHOPIFY CONNECTION
              </button>
            </div>
          </div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="rounded-3xl bg-white border border-[#17245B]/15 p-12 sm:p-16 text-center space-y-4 shadow-card max-w-xl mx-auto">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF6ED] text-3xl">
              🍿
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#17245B]">
              No products found
            </h3>
            <p className="font-mono text-xs text-[#17245B]/70 max-w-sm mx-auto">
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

        {/* Custom Box Banner (Midnight Indigo) */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#17245B] text-[#F5EEDD] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold uppercase">
              10% BUNDLE SAVINGS
            </span>
            <h2 className="font-display text-3xl font-bold uppercase text-white">
              BUILD YOUR CUSTOM CHASKA STASH
            </h2>
            <p className="font-mono text-xs text-[#F5EEDD]/80 leading-relaxed">
              Select your exact ratio of sweet, spicy, and savory flavors in our interactive stash builder.
            </p>
          </div>
          <Link to="/build-your-box" className="btn bg-[#E2AE35] text-[#17245B] hover:bg-white px-8 py-4 text-xs font-bold shrink-0">
            BUILD YOUR BOX &rarr;
          </Link>
        </div>

      </div>
    </main>
  )
}

