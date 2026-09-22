import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import ProductCard from '../components/ProductCard'
import FlavourDiscovery from '../components/FlavourDiscovery'
import TryAll5Feature from '../components/TryAll5Feature'
import BenefitsGrid from '../components/BenefitsGrid'
import FourPillars from '../components/FourPillars'
import UgcGrid from '../components/UgcGrid'
import Reviews from '../components/Reviews'
import { fetchShopifyProducts } from '../lib/shopify/api'
import { photos } from '../data/photos'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0)

  const heroPhotos = [
    {
      src: photos.chocolateMakhanaPack.src,
      tag: 'OFFICIAL DROP 01',
      badge: 'CHOCOLATE MAKHANA',
      title: 'Chocolate Makhana',
      caption: 'Roasted Not Fried • Indian Flavours Real Ingredients',
    },
    {
      src: photos.cheeseAndHerbsMakhanaPack.src,
      tag: 'OFFICIAL DROP 01',
      badge: 'CHEESE & HERBS',
      title: 'Cheese & Herbs Makhana',
      caption: 'Aged Cheddar • Wild Mountain Herbs • 70g & 30g Pouches',
    },
    {
      src: photos.jalapenoMakhanaPack.src,
      tag: 'OFFICIAL DROP 01',
      badge: 'JALAPENO MAKHANA',
      title: 'Jalapeno Makhana',
      caption: 'Sun-Dried Green Jalapeno • Zesty Citrus Lime Crunch',
    },
    {
      src: photos.tabletopLifestyle.src,
      tag: 'THE LAUNCH TRIO',
      badge: '3-PACK SAMPLER',
      title: 'The Launch Trio Box',
      caption: 'All 3 Official Launch Flavours in 1 Box (210g)',
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

  // Separate Try All 5 from single flavours
  const tryAll5Product = products.find((p) => p.handle === 'chaska-try-all-5') || null
  const singleFlavours = products.filter((p) => p.handle !== 'chaska-try-all-5')
  const drop01Flavours = singleFlavours.filter((p) => !p.isComingSoon)
  const drop02Flavours = singleFlavours.filter((p) => p.isComingSoon)

  return (
    <PageShell>
      {/* ── 1. PRODUCT CAMPAIGN HERO SECTION ──────────────────────────────── */}
      <section className="relative bg-[#0C122C] px-4 pt-8 pb-16 sm:px-8 sm:pt-14 sm:pb-24 border-b border-[#243373] flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Bold Editorial Headline & Copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-7"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[#FF5400] font-mono text-[11px] font-bold uppercase tracking-wider">
                  🔥 100% ROASTED NOT FRIED
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-[#1C2A6B] text-[#17245B] dark:text-stone-200 font-mono text-[11px] font-semibold uppercase tracking-wider border border-transparent dark:border-[#243373]">
                  INDIAN FLAVOURS REAL INGREDIENTS
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.75rem] font-black tracking-tight text-[#17245B] dark:text-white leading-[0.96] uppercase">
                MAKHANA KO <br />
                <span className="text-[#FF5400]">CHASKA</span> <span>LAGA DIYA.</span>
              </h1>

              <p className="font-sans text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-300 font-normal max-w-xl">
                Big crunch. Bold flavour. Bas boring nahi. Handpicked Bihar lotus seeds slow-roasted in small batches with chef-crafted seasonings.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/shop" className="btn px-8 py-4 text-xs font-bold tracking-wider shadow-sm hover-pop">
                  SHOP DROP 01 ➔
                </Link>
                <Link
                  to="/products/chaska-try-all-5"
                  className="px-7 py-4 text-xs font-bold tracking-wider rounded-full bg-[#17245B] dark:bg-white text-white dark:text-[#17245B] hover:bg-[#FF5400] dark:hover:bg-[#FF5400] dark:hover:text-white transition-all shadow-sm cursor-pointer hover-pop hover:scale-[1.02] active:scale-[0.98]"
                >
                  LAUNCH TRIO BOX
                </Link>
              </div>

              {/* Micro specs */}
              <div className="pt-2 flex flex-wrap items-center gap-6 font-mono text-xs text-stone-600 dark:text-stone-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> 3 Official Launch Flavours
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> 100% Roasted, Not Fried
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Free Shipping &gt; ₹499
                </span>
              </div>
            </motion.div>

            {/* Right Column: Hero Photo Stage with Provided Photos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-3.5"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#243373] shadow-md bg-[#131D4A]">
                <img
                  src={activeHeroPhoto.src}
                  alt={activeHeroPhoto.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#17245B] text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {activeHeroPhoto.badge}
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#17245B]/90 text-white backdrop-blur-md border border-white/10 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#FF5400] uppercase tracking-wider block">
                      {activeHeroPhoto.tag}
                    </span>
                    <p className="font-display font-bold text-sm sm:text-base text-white leading-tight mt-0.5">
                      {activeHeroPhoto.title}
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="px-3.5 py-1.5 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold hover:bg-[#E04800] transition-colors shadow-xs"
                  >
                    SHOP
                  </Link>
                </div>
              </div>

              {/* Photo Selector Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5">
                {heroPhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroPhotoIndex(idx)}
                    aria-label={`View ${item.title}`}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer hover-pop-subtle hover:scale-105 active:scale-95 ${
                      heroPhotoIndex === idx
                        ? 'border-[#FF5400] ring-2 ring-[#FF5400]/30 scale-105 shadow-sm'
                        : 'border-stone-200/80 dark:border-[#243373] opacity-70 hover:opacity-100 hover:border-stone-400'
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

      {/* ── 2. TICKER RIBBON (ULTRA-SMOOTH CONTINUOUS TICKER) ─────────────── */}
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
              <span>⭐ 3-IN-1 LAUNCH TRIO</span>
              <span className="text-[#FF5400]">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. OFFICIAL CAMPAIGN PHOTO SHOWCASE ("THE SIGNATURE CHASKA DROP") ─ */}
      <section className="py-20 sm:py-24 bg-[#0C122C] border-b border-[#243373]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400] flex items-center gap-1.5">
                🔥 OFFICIAL 2026 CAMPAIGN PHOTOS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B] dark:text-white">
                THE SIGNATURE <span className="text-[#FF5400]">CHASKA</span> DROP
              </h2>
            </div>
            <Link to="/shop" className="btn-outline dark:border-[#243373] dark:text-stone-200 dark:hover:border-white text-xs font-bold shadow-xs self-start sm:self-auto">
              SHOP ALL FLAVOURS ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Chocolate Makhana */}
            <div className="group rounded-3xl overflow-hidden border border-[#243373] bg-[#131D4A] shadow-xs hover-pop-card hover:border-[#FF5400]/40 transition-all flex flex-col justify-between cursor-default">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-stone-900 p-2">
                  <img
                    src={photos.chocolateMakhanaPack.src}
                    alt="CHASKA Chocolate Makhana Pouch"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-7 space-y-2.5">
                  <span className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                    ROASTED NOT FRIED • 70G & 30G POUCHES
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#17245B] dark:text-white">
                    CHOCOLATE MAKHANA
                  </h3>
                  <p className="font-sans text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    Dark cocoa glaze, caramelized raw sugar, and Himalayan rock salt. Decadent sweet &amp; salty crunch without frying.
                  </p>
                </div>
              </div>
              <div className="px-7 pb-7 pt-0 flex items-center justify-between">
                <Link to="/products/chocolate-makhana" className="font-mono text-xs font-bold text-[#17245B] dark:text-stone-200 hover:text-[#FF5400] dark:hover:text-[#FF5400] transition-colors inline-flex items-center gap-1">
                  SHOP CHOCOLATE ➔
                </Link>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">₹199</span>
              </div>
            </div>

            {/* Card 2: Cheese and Herbs Makhana */}
            <div className="group rounded-3xl overflow-hidden border border-[#243373] bg-[#131D4A] shadow-xs hover-pop-card hover:border-[#FF5400]/40 transition-all flex flex-col justify-between cursor-default">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-stone-900 p-2">
                  <img
                    src={photos.cheeseAndHerbsMakhanaPack.src}
                    alt="CHASKA Cheese and Herbs Makhana Pouch"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-7 space-y-2.5">
                  <span className="font-mono text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                    INDIAN FLAVOURS REAL INGREDIENTS • 70G & 30G
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#17245B] dark:text-white">
                    CHEESE AND HERBS MAKHANA
                  </h3>
                  <p className="font-sans text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    Sharp aged cheddar cheese dust blended with wild mountain oregano, rubbed thyme, and roasted garlic butter.
                  </p>
                </div>
              </div>
              <div className="px-7 pb-7 pt-0 flex items-center justify-between">
                <Link to="/products/cheese-and-herbs-makhana" className="font-mono text-xs font-bold text-[#17245B] dark:text-stone-200 hover:text-[#FF5400] dark:hover:text-[#FF5400] transition-colors inline-flex items-center gap-1">
                  SHOP CHEESE &amp; HERBS ➔
                </Link>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">₹199</span>
              </div>
            </div>

            {/* Card 3: Jalapeno Makhana */}
            <div className="group rounded-3xl overflow-hidden border border-[#243373] bg-[#131D4A] shadow-xs hover-pop-card hover:border-[#FF5400]/40 transition-all flex flex-col justify-between cursor-default">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-stone-900 p-2">
                  <img
                    src={photos.jalapenoMakhanaPack.src}
                    alt="CHASKA Jalapeno Makhana Pouch"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-7 space-y-2.5">
                  <span className="font-mono text-[10px] font-bold text-[#EF4444] uppercase tracking-wider">
                    ROASTED NOT FRIED • 70G & 30G POUCHES
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#17245B] dark:text-white">
                    JALAPENO MAKHANA
                  </h3>
                  <p className="font-sans text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    Smoky green jalapeno chili, tangy Mexican lime zest, and pink rock salt for an immediate surge of crunchy heat.
                  </p>
                </div>
              </div>
              <div className="px-7 pb-7 pt-0 flex items-center justify-between">
                <Link to="/products/jalapeno-makhana" className="font-mono text-xs font-bold text-[#17245B] dark:text-stone-200 hover:text-[#FF5400] dark:hover:text-[#FF5400] transition-colors inline-flex items-center gap-1">
                  SHOP JALAPENO ➔
                </Link>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">₹199</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FLAVOUR DISCOVERY ("KAUNSA CHASKA?") ────────────────────────── */}
      <FlavourDiscovery />

      {/* ── 5. CHASKA TRY ALL 5 (MAJOR CONVERSION FEATURE) ─────────────────── */}
      <TryAll5Feature product={tryAll5Product} />

      {/* ── 6. SINGLE FLAVOUR PACKS CATALOGUE GRID ─────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#0C122C] border-b border-[#243373]" id="all-products">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          
          {/* Drop 01 Section */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold uppercase tracking-widest">
                  🔥 DROP 01: AVAILABLE NOW
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B] dark:text-white">
                  OFFICIAL <span className="text-[#FF5400]">LAUNCH FLAVOURS.</span>
                </h2>
              </div>
              <Link
                to="/shop"
                className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 hover:text-[#FF5400] dark:hover:text-[#FF5400] transition-colors"
              >
                VIEW FULL CATALOGUE ➔
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-[460px] rounded-3xl bg-[#131D4A] border border-[#243373] p-6 animate-pulse" />
                ))}
              </div>
            ) : drop01Flavours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {drop01Flavours.map((product, i) => (
                  <ProductCard key={product.id || product.handle} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl bg-[#131D4A] border border-dashed border-[#243373] p-12 text-center space-y-3 max-w-md mx-auto">
                <span className="text-4xl block">🍿</span>
                <h3 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white">
                  Loading Official Launch Flavours
                </h3>
              </div>
            )}
          </div>

          {/* Drop 02 Section */}
          {drop02Flavours.length > 0 && (
            <div className="space-y-8 pt-8 border-t border-stone-200/80 dark:border-[#243373]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 dark:bg-[#1C2A6B] text-[#17245B] dark:text-stone-200 font-mono text-xs font-bold uppercase tracking-widest">
                    🔒 DROP 02: IN THE EXPERIMENTAL LAB
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#17245B] dark:text-white">
                    COMING SOON <span className="text-[#FF5400]">(NOT FOR SALE YET)</span>
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    Get VIP notifications the moment these experimental recipes drop.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {drop02Flavours.map((product, i) => (
                  <ProductCard key={product.id || product.handle} product={product} index={i} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── 7. WHY THE CRUNCH? (EDITORIAL BENEFITS) ────────────────────────── */}
      <BenefitsGrid />

      {/* ── 8. FOUR FOUNDATIONAL PILLARS ───────────────────────────────────── */}
      <FourPillars />

      {/* ── 9. BRAND MANIFESTO ─────────────────────────────────────────────── */}
      <section className="py-24 sm:py-28 bg-[#17245B] dark:bg-[#0C122C] text-[#FAF8F5] border-b border-[#243373] relative overflow-hidden" id="why-chaska">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-7">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
                BRAND MANIFESTO
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase leading-tight tracking-tight text-white">
                MAKHANA KO BORING <br />
                <span className="text-[#FF5400]">KISNE BOLA?</span>
              </h2>
              <p className="text-stone-200 text-base sm:text-lg leading-relaxed font-sans font-normal max-w-xl">
                Makhana has been around forever. We just thought it deserved a little more chaska. Handpicked in Bihar wetlands, slow-roasted in small batches, and tossed in real spices for an absurdly addictive crunch.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/about" className="btn px-8 py-4 text-xs font-bold shadow-sm">
                  OUR FULL STORY ➔
                </Link>
                <Link
                  to="/products/chaska-try-all-5"
                  className="px-6 py-4 rounded-full border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  TRY ALL 5
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

      {/* ── 10. LIFESTYLE CAMPAIGN GALLERY ─────────────────────────────────── */}
      <UgcGrid />

      {/* ── 11. COMMUNITY REVIEWS ──────────────────────────────────────────── */}
      <Reviews />

    </PageShell>
  )
}
