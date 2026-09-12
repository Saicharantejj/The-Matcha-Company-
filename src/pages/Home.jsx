import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import ProductCard from '../components/ProductCard'
import BuildYourBox from '../components/BuildYourBox'
import BenefitsGrid from '../components/BenefitsGrid'
import Reviews from '../components/Reviews'
import UgcGrid from '../components/UgcGrid'
import { fetchShopifyProducts } from '../lib/shopify/api'
import { photos } from '../data/photos'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function Home() {
  const [products, setProducts] = useState(PRODUCTS_CATALOGUE)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      try {
        const live = await fetchShopifyProducts(6)
        if (live && live.length > 0) {
          setProducts(live)
        } else {
          setProducts(PRODUCTS_CATALOGUE)
        }
      } catch (err) {
        console.warn('[Shopify API Offline/Locked, falling back to local catalog]', err)
        setProducts(PRODUCTS_CATALOGUE)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const flavouredPacks = products.filter((p) => p.category === 'Flavoured Makhana' || !p.category?.includes('Bundle'))

  return (
    <PageShell>
      {/* ── 1. PRODUCT CAMPAIGN HERO SECTION ──────────────────────────────── */}
      <section className="relative bg-[#F5EEDD] px-6 pt-6 pb-12 sm:px-12 sm:pt-8 sm:pb-14 border-b border-[#17245B]/15 flex items-center">
        <div className="mx-auto w-full max-w-[96rem]">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Bold Headline & Whitespace */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17245B] text-[#F5EEDD] font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
                ⚡ MODERN INDIAN SNACK BRAND <span className="text-[#E2AE35]">🍿</span>
              </span>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.85rem] font-black tracking-tight text-[#17245B] leading-[0.92] uppercase">
                MAKHANA KO <br />
                <span className="text-[#E2AE35]">CHASKA LAGA DIYA.</span>
              </h1>

              <p className="font-sans text-base sm:text-lg leading-relaxed text-[#17245B]/90 font-medium max-w-lg">
                Big crunch. Bold flavour. Bas boring nahi. Handpicked lotus seeds slow-roasted in small batches with chef-crafted seasonings.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/shop" className="btn shadow-md text-xs font-bold">
                  SHOP CHASKA ➔
                </Link>
                <Link to="/build-your-box" className="btn-indigo shadow-md text-xs font-bold">
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
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 shadow-pop bg-[#FAF6ED]"
              >
                <img
                  src={photos.tabletopLifestyle.src}
                  alt="CHASKA Tabletop Feast - Good Food, Good Company, Better Snacks"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#17245B]/15 flex items-center justify-between shadow-md">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#A9223A] uppercase tracking-wider">GOOD COMPANY • 2026</span>
                    <p className="font-display font-bold text-base text-[#17245B]">Masala Makhana Stash</p>
                  </div>
                  <Link to="/shop" className="px-4 py-2 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold hover:bg-[#17245B] hover:text-[#F5EEDD] transition-colors">
                    SHOP
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. FLAVOUR SHOWCASE ────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                AB BATAO, KAUNSA CHASKA?
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#17245B] leading-none">
                MEET YOUR NEW FAVOURITE SNACK.
              </h2>
            </div>
            <Link to="/shop" className="font-mono text-xs font-bold uppercase tracking-wider text-[#17245B] hover:text-[#E2AE35] transition-colors">
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
      <section className="py-28 bg-[#17245B] text-[#F5EEDD] border-b border-[#F5EEDD]/15 relative overflow-hidden" id="why-chaska">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                BRAND MANIFESTO
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase leading-tight tracking-tight text-white">
                MAKHANA KO BORING KISNE BOLA?
              </h2>
              <p className="text-[#F5EEDD]/90 text-base sm:text-lg leading-relaxed font-sans max-w-2xl font-medium">
                Makhana has been around forever. We just thought it deserved a little more chaska. Handpicked in Bihar wetlands, slow-roasted in small batches, and tossed in real spices for an absurdly addictive crunch.
              </p>
              <div className="pt-4">
                <Link to="/about" className="btn bg-[#E2AE35] text-[#17245B] hover:bg-white transition-colors">
                  OUR FULL STORY ➔
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#F5EEDD]/20 bg-white/5 p-2 shadow-2xl">
                <img
                  src={photos.newspaperComingSoon.src}
                  alt="CHASKA Newspaper - Good Food, Good Company, Better Snacks"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
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

