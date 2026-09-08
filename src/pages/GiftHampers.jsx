import PageShell from '../components/PageShell'
import ProductCard from '../components/ProductCard'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function GiftHampers() {
  const bundles = PRODUCTS_CATALOGUE.filter((p) => p.category === 'Snack Bundles' || p.category === 'Gift Hampers')

  return (
    <PageShell>
      <section className="bg-[#FDFBF7] px-5 py-16 sm:px-10 sm:py-24 border-b border-ink/10">
        <div className="mx-auto max-w-[96rem]">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0EC] text-[#FF3B00] font-mono text-xs font-bold uppercase tracking-widest border border-[#FF3B00]/20">
              🎁 GIFTING & BUNDLES
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-ink leading-tight">
              SNACK STASH HAMPERS.
            </h1>
            <p className="text-cocoa text-base sm:text-lg font-body leading-relaxed max-w-xl">
              Curated makhana gift hampers and party boxes designed for sharing, celebrations, or flexing your snack stash.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFDF7] px-5 py-20 sm:px-10 pb-32">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-8">
            {bundles.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
