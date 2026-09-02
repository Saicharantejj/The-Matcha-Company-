import PageShell from '../components/PageShell'
import Reveal, { Words, RiseInView, ImageReveal, Parallax, StaggerGroup, StaggerItem } from '../components/Motion'
import ProductCard from '../components/ProductCard'
import OrganicShape from '../components/OrganicShape'
import { giftHampers } from '../data/products'

export default function GiftHampers() {
  return (
    <PageShell>
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#E9E7D0] px-6 pb-20 pt-16 sm:px-10 sm:pt-24 overflow-hidden border-b border-[#232E1E]/10">
        <OrganicShape className="-right-20 -top-20 h-[40rem] w-[40rem]" surface="lightBold" path={2} distance={50} side="right" />

        <div className="relative mx-auto max-w-[100rem]">
          <span className="spec text-[#4E6B3E] px-4 py-1.5 glass-pill rounded-full inline-block mb-6">
            Curated Gift Hampers
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[#232E1E] leading-[0.9]">
            <Words delay={0.1}>Gift Hampers.</Words>
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-xl font-serif text-xl italic text-[#232E1E]/80">
              Beautifully packaged Japanese Uji matcha hampers. Ready for gifting.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CATALOGUE GRID ──────────────────────────────────────────────── */}
      <section className="bg-[#E9E7D0] px-6 py-20 sm:px-10 pb-32">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            {giftHampers.map((hamper, i) => (
              <ProductCard key={hamper.id} product={hamper} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
