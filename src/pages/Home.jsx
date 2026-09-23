import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import ProductDiscovery from '../components/ProductDiscovery'
import BenefitsGrid from '../components/BenefitsGrid'
import FourPillars from '../components/FourPillars'
import Reviews from '../components/Reviews'
import UgcGrid from '../components/UgcGrid'
import { fetchShopifyProducts } from '../lib/shopify/api'
import { photos } from '../data/photos'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function Home() {
  const [products, setProducts] = useState(() => PRODUCTS_CATALOGUE)
  const [, setIsLoading] = useState(false)
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0)

  const heroPhotos = [
    {
      src: photos.meshBagIngredients.src,
      tag: 'AVAILABLE NOW',
      badge: 'PUDINA',
      title: 'Pudina Makhana',
      caption: 'Garden Mint • Pink Rock Salt • 30g & 70g Pouches',
    },
    {
      src: photos.jalapenoMakhanaPack.src,
      tag: 'AVAILABLE NOW',
      badge: 'JALAPEÑO',
      title: 'Jalapeño Makhana',
      caption: 'Sun-Dried Green Jalapeño • Zesty Citrus Lime Crunch',
    },
    {
      src: photos.cheeseAndHerbsMakhanaPack.src,
      tag: 'AVAILABLE NOW',
      badge: 'CHEESE',
      title: 'Cheese Makhana',
      caption: 'Rich Cheddar Dust • Slow-Roasted Butter • 30g & 70g Pouches',
    },
  ]

  const activeHeroPhoto = heroPhotos[heroPhotoIndex] || heroPhotos[0]

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      try {
        const live = await fetchShopifyProducts(10)
        if (live && Array.isArray(live)) {
          setProducts(live)
        } else {
          setProducts([])
        }
      } catch (err) {
        console.warn('[Shopify Storefront API Error on Home]', err)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return (
    <PageShell>
      {/* ── 1. HERO SECTION (EDITORIAL DEEP NAVY / WARM ACCENT) ───────────── */}
      <section className="relative overflow-hidden bg-[#0C122C] text-[#FAF8F5] pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-[#243373]">
        {/* Subtle decorative mesh gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF5400]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#1E3A8A]/25 rounded-full blur-[110px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Brand Statement */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              
              {/* Release Tag Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#131D4A] border border-[#243373] text-stone-200 font-mono text-xs font-bold uppercase tracking-wider shadow-xs hover-pop-subtle">
                <span className="w-2 h-2 rounded-full bg-[#FF5400] animate-ping" />
                <span>3 SIGNATURE FLAVOURS AVAILABLE NOW</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-black uppercase tracking-tight leading-[0.96] text-[#FAF8F5]">
                  WELCOME TO A <br />
                  <span className="text-[#FF5400] drop-shadow-sm">HEALTHIER SNACKING</span> <br />
                  <span className="text-[#E5DCC9]">ERA.</span>
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#FF5400] font-bold tracking-widest uppercase pt-2">
                  100% SLOW-ROASTED BIHAR LOTUS POPS • ZERO PALM OIL • CRACKLING CRUNCH
                </p>
              </div>

              {/* Editorial Intro Copy */}
              <p className="font-sans text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-normal">
                Slow-roasted whole foxnuts in small artisanal batches. Clean ingredients, authentic spices, and zero deep-frying. Experience Pudina, Jalapeño, and Cheese.
              </p>

              {/* Primary Call to Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/shop"
                  className="btn btn-primary px-8 py-4 text-xs font-bold uppercase tracking-wider text-center shadow-sm hover-pop flex items-center justify-center gap-2"
                >
                  <span>SHOP FLAVOURS</span>
                  <span>➔</span>
                </Link>
                <Link
                  to="/custom-gift-pack"
                  className="btn-outline-dark px-7 py-4 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
                >
                  <span>CUSTOM GIFT PACK [BUILD YOURS]</span>
                </Link>
              </div>

              {/* Quick Trust Badges Strip */}
              <div className="pt-4 border-t border-[#243373] flex flex-wrap items-center gap-6 font-mono text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF5400] font-bold">✓</span>
                  <span>30g &amp; 70g Pouches</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF5400] font-bold">✓</span>
                  <span>Pack of 10: 20% OFF</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF5400] font-bold">✓</span>
                  <span>Free Shipping &gt; ₹499</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Product Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 relative"
            >
              {/* Product Card Container with Warm Glow */}
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#131D4A] to-[#0C122C] border-2 border-[#243373] shadow-2xl p-6 sm:p-8 flex flex-col justify-between mb-4">
                
                {/* Floating Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-3.5 py-1 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {activeHeroPhoto.badge}
                  </span>
                  <span className="font-mono text-xs text-stone-300">
                    30G • 70G
                  </span>
                </div>

                {/* Center Image Stage */}
                <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
                  <motion.img
                    key={activeHeroPhoto.src}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    src={activeHeroPhoto.src}
                    alt={activeHeroPhoto.title}
                    className="max-h-[300px] w-auto object-contain rounded-2xl drop-shadow-2xl"
                  />
                </div>

                {/* Bottom Card Strip */}
                <div className="relative z-10 pt-3 border-t border-[#243373]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg font-black text-white uppercase tracking-tight">
                        {activeHeroPhoto.title}
                      </p>
                      <p className="font-sans text-xs text-stone-300 font-normal">
                        {activeHeroPhoto.caption}
                      </p>
                    </div>
                    <Link
                      to="/shop"
                      className="px-4 py-1.5 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold hover:bg-[#E04800] transition-colors shadow-xs"
                    >
                      BUY
                    </Link>
                  </div>
                </div>
              </div>

              {/* Photo Selector Thumbnails */}
              <div className="grid grid-cols-3 gap-2.5">
                {heroPhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroPhotoIndex(idx)}
                    aria-label={`View ${item.title}`}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer hover-pop-subtle hover:scale-105 active:scale-95 ${
                      heroPhotoIndex === idx
                        ? 'border-[#FF5400] ring-2 ring-[#FF5400]/30 scale-105 shadow-sm'
                        : 'border-[#243373] opacity-70 hover:opacity-100 hover:border-[#FFF9EF]'
                    }`}
                  >
                    <img src={item.src} alt={item.tag} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TICKER RIBBON (CONTINUOUS BRAND STATEMENTS) ─────────────────────── */}
      <div className="bg-[#17245B] dark:bg-[#0C122C] text-[#FAF8F5] py-3 border-b border-[#243373] overflow-hidden select-none">
        <div className="live-marquee-track" style={{ animationDuration: '38s' }}>
          {[1, 2].map((k) => (
            <div key={k} className="flex items-center gap-8 whitespace-nowrap px-4 font-mono text-xs font-bold uppercase tracking-widest shrink-0">
              <span>🍿 100% SLOW ROASTED</span>
              <span className="text-[#FF5400]">★</span>
              <span>🌶️ ZERO PALM OIL</span>
              <span className="text-[#FF5400]">★</span>
              <span>💥 CRACKLING CRUNCH</span>
              <span className="text-[#FF5400]">★</span>
              <span>🇮🇳 BIHAR LOTUS SEEDS</span>
              <span className="text-[#FF5400]">★</span>
              <span>⚡ FREE SHIPPING OVER ₹499</span>
              <span className="text-[#FF5400]">★</span>
              <span>👑 PACK OF 10: BEST SELLER (20% OFF)</span>
              <span className="text-[#FF5400]">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. BRAND CREDIBILITY: THE FOUR HEALTHIER SNACKING PILLARS ─────── */}
      <FourPillars />

      {/* ── 3. HEALTHIER SNACKING: FRESH NATURAL MINT CRUNCH CRAFT ─────────── */}
      <BenefitsGrid />

      {/* ── 4. PRODUCT DISCOVERY: WARM IVORY EDITORIAL ROSTER ──────────────── */}
      <ProductDiscovery products={products} />

      {/* ── 5. SOCIAL PROOF & COMMUNITY: WARM IVORY WORDS & MOMENTS ────────── */}
      <Reviews />
      <UgcGrid />

      {/* ── 6. CUSTOM GIFT PACK SPOTLIGHT (ACTION) ─────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#0C122C] text-[#FAF8F5] border-b border-[#243373] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#131D4A] to-[#1A265E] border border-[#243373] flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 max-w-xl">
              <span className="px-3.5 py-1 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs inline-block">
                CUSTOM GIFT PACK
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                BUILD YOUR OWN <br /><span className="text-[#FF5400]">CHASKA STASH BOX</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                Choose your favourite flavours between Pudina, Jalapeño, and Cheese. Select from 3-Pack, 5-Pack, or 10-Pack gift formats with up to 20% savings.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link to="/custom-gift-pack" className="btn px-8 py-4 text-xs font-bold shadow-sm hover-pop text-center">
                BUILD YOUR PACK ➔
              </Link>
              <Link to="/shop" className="btn-outline-dark px-6 py-4 text-xs font-bold text-center">
                BROWSE ALL 🍿
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. BRAND MANIFESTO & FINAL CLOSING CTA (DEEP NAVY) ──────────────── */}
      <section className="py-24 sm:py-28 bg-[#17245B] dark:bg-[#0C122C] text-[#FAF8F5] border-b border-[#243373] relative overflow-hidden" id="why-chaska">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-7">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
                  BRAND MANIFESTO
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-stone-200 font-mono text-[10px] font-bold uppercase">
                  SNACK KA SCENE SORTED
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase leading-tight tracking-tight text-white">
                MAKHANA KO BORING <br />
                <span className="text-[#FF5400]">KISNE BOLA?</span>
              </h2>

              <p className="text-stone-200 text-base sm:text-lg leading-relaxed font-sans font-normal max-w-xl">
                Makhana has been around forever. We just thought it deserved a little more chaska. Handpicked in Bihar wetlands, slow-roasted in small batches, and tossed in real spices for an absurdly addictive crunch. Thoda aur crunch ho jaaye? Chaska lag gaya.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/shop" className="btn px-8 py-4 text-xs font-bold shadow-sm hover-pop">
                  SHOP FLAVOURS ➔
                </Link>
                <Link
                  to="/custom-gift-pack"
                  className="px-6 py-4 rounded-full border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors hover-pop-subtle"
                >
                  BUILD A GIFT PACK 🎁
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-white/5 p-2 shadow-2xl">
                <img
                  src={photos.newspaperComingSoon.src}
                  alt="CHASKA Gazette - Good Food, Good Company, Better Snacks"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageShell>
  )
}
