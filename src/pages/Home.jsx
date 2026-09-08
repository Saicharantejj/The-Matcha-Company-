import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import ProductCard from '../components/ProductCard'
import BuildYourBox from '../components/BuildYourBox'
import BenefitsGrid from '../components/BenefitsGrid'
import Reviews from '../components/Reviews'
import UgcGrid from '../components/UgcGrid'
import { PRODUCTS_CATALOGUE } from '../data/products'
import { photos } from '../data/photos'

export default function Home() {
  const flavouredPacks = PRODUCTS_CATALOGUE.filter((p) => p.category === 'Flavoured Makhana')

  return (
    <PageShell>
      {/* ── 1. PRODUCT CAMPAIGN HERO SECTION ──────────────────────────────── */}
      <section className="relative min-h-[85vh] bg-[#F8EECB] px-6 py-16 sm:px-12 sm:py-24 border-b border-[#6E433D]/15 flex items-center">
        <div className="mx-auto w-full max-w-[96rem]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Bold Headline & Whitespace */}
            <div className="lg:col-span-7 space-y-8">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
                ⚡ MODERN INDIAN SNACK BRAND
              </span>

              <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight text-[#6E433D] leading-[0.92] uppercase">
                MAKHANA KO <br />
                <span className="text-[#D23D2D]">CHASKA LAGA DIYA.</span>
              </h1>

              <p className="font-sans text-lg sm:text-xl leading-relaxed text-[#6E433D]/90 font-medium max-w-lg">
                Big crunch. Bold flavour. Bas boring nahi. Handpicked lotus seeds slow-roasted in small batches with chef-crafted seasonings.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/shop" className="btn shadow-md text-xs font-bold">
                  SHOP CHASKA ➔
                </Link>
                <Link to="/build-your-box" className="btn-green shadow-md text-xs font-bold">
                  BUILD YOUR BOX
                </Link>
              </div>
            </div>

            {/* Right Column: Large Editorial Product Image */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#6E433D]/15 shadow-pop bg-[#FBF4DC]"
              >
                <img
                  src={photos.heroMakhanaBowl.src}
                  alt="Golden Roasted Makhana Bowl"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#6E433D]/15 flex items-center justify-between shadow-md">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#D23D2D] uppercase">SIGNATURE FLAVOUR</span>
                    <p className="font-display font-bold text-base text-[#6E433D]">Fiery Peri Peri Makhana</p>
                  </div>
                  <Link to="/shop" className="px-4 py-2 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold hover:bg-[#6E433D] transition-colors">
                    SHOP
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. FLAVOUR SHOWCASE ────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#6E433D]/15">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
                AB BATAO, KAUNSA CHASKA?
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#6E433D] leading-none">
                MEET YOUR NEW FAVOURITE SNACK.
              </h2>
            </div>
            <Link to="/shop" className="font-mono text-xs font-bold uppercase tracking-wider text-[#D23D2D] hover:text-[#6E433D] transition-colors">
              VIEW CATALOGUE ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {flavouredPacks.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. BUILD YOUR BOX ──────────────────────────────────────────────── */}
      <BuildYourBox />

      {/* ── 4. WHY THE CRUNCH? (EDITORIAL BENEFITS) ────────────────────────── */}
      <BenefitsGrid />

      {/* ── 5. BRAND MANIFESTO ────────────────────────────────────────────── */}
      <section className="py-28 bg-[#6E433D] text-[#F8EECB] border-b border-[#F8EECB]/15 relative overflow-hidden" id="why-chaska">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5C065]">
                BRAND MANIFESTO
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase leading-tight tracking-tight text-white">
                MAKHANA KO BORING KISNE BOLA?
              </h2>
              <p className="text-[#F8EECB]/90 text-base sm:text-lg leading-relaxed font-sans max-w-2xl font-medium">
                Makhana has been around forever. We just thought it deserved a little more chaska. Handpicked in Bihar wetlands, slow-roasted in small batches, and tossed in real spices for an absurdly addictive crunch.
              </p>
              <div className="pt-4">
                <Link to="/about" className="btn bg-[#D23D2D] text-[#F8EECB] hover:bg-[#31603D] transition-colors">
                  OUR FULL STORY ➔
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="aspect-square rounded-3xl overflow-hidden border border-[#F8EECB]/20 bg-white/5 p-2 shadow-2xl">
                <img
                  src={photos.brandPoster.src}
                  alt="CHASKA Brand Art Poster"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. LIFESTYLE GALLERY ───────────────────────────────────────────── */}
      <UgcGrid />

      {/* ── 7. CUSTOMER REVIEWS ────────────────────────────────────────────── */}
      <Reviews />

    </PageShell>
  )
}
