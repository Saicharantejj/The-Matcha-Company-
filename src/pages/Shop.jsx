import { useState, useMemo } from 'react'
import PageShell from '../components/PageShell'
import ProductCard from '../components/ProductCard'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('ALL')

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') return PRODUCTS_CATALOGUE
    if (activeCategory === 'FLAVOURS') return PRODUCTS_CATALOGUE.filter((p) => p.category === 'Flavoured Makhana')
    if (activeCategory === 'BUNDLES') return PRODUCTS_CATALOGUE.filter((p) => p.category === 'Snack Bundles' || p.category === 'Gift Hampers')
    return PRODUCTS_CATALOGUE
  }, [activeCategory])


  return (
    <PageShell>
      {/* Header */}
      <section className="bg-cream px-6 py-16 sm:px-12 sm:py-24 border-b border-black/10">
        <div className="mx-auto max-w-[96rem]">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
              CATALOGUE
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-charcoal leading-tight">
              ROASTED MAKHANA.
            </h1>
            <p className="text-muted text-base sm:text-lg font-body leading-relaxed max-w-xl">
              Handpicked lotus seeds slow-roasted in small batches. Choose individual packs or curated variety stash boxes.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-12 flex flex-wrap items-center gap-3 pt-6 border-t border-black/10">
            {['ALL', 'FLAVOURS', 'BUNDLES'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'bg-white text-charcoal border border-black/15 hover:border-charcoal'
                }`}
              >
                {cat === 'ALL' ? 'ALL PRODUCTS' : cat === 'FLAVOURS' ? 'SINGLE PACKS' : 'BOXES & BUNDLES'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-surface px-6 py-20 sm:px-12 pb-32">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
