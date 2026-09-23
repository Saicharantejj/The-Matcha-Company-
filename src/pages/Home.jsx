import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import ProductDiscovery from '../components/ProductDiscovery'
import FlavourDiscovery from '../components/FlavourDiscovery'
import BenefitsGrid from '../components/BenefitsGrid'
import TryAll5Feature from '../components/TryAll5Feature'
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

  // Find Launch Trio Box product bundle
  const tryAll5Product = products.find((p) => p.handle === 'chaska-try-all-5') || null

  return (
    <PageShell>
      {/* ── 1. WHO IS CHASKA? BRAND INTRODUCTION HERO ──────────────────────── */}
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

            {/* Right Column: Hero Photo Stage */}
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
                  fetchPriority="high"
                  decoding="sync"
                  width={1080}
                  height={1350}
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
              <span>⭐ 3-IN-1 LAUNCH TRIO</span>
              <span className="text-[#FF5400]">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. PRODUCT DISCOVERY: WARM IVORY EDITORIAL ROSTER ──────────────── */}
      <ProductDiscovery products={products} />

      {/* ── 3. HEALTHIER SNACKING: FRESH NATURAL MINT CRUNCH CRAFT ─────────── */}
      <BenefitsGrid />

      {/* ── 4. FLAVOUR DISCOVERY: PLAYFUL COLOUR & FLAVOUR IDENTITIES ─────── */}
      <FlavourDiscovery />

      {/* ── 5. BRAND CREDIBILITY: THE FOUR CORE PILLARS (DEEP NAVY) ─────────── */}
      <FourPillars />

      {/* ── 6. SOCIAL PROOF & COMMUNITY: WARM IVORY WORDS & MOMENTS ────────── */}
      <Reviews />
      <UgcGrid />

      {/* ── 7. THE CONVERSION SAMPLER: THE LAUNCH TRIO BOX (ACTION) ─────────── */}
      <TryAll5Feature product={tryAll5Product} />

      {/* ── 8. BRAND MANIFESTO & FINAL CLOSING CTA (DEEP NAVY) ──────────────── */}
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
                  SHOP DROP 01 ➔
                </Link>
                <Link
                  to="/products/chaska-try-all-5"
                  className="px-6 py-4 rounded-full border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors hover-pop-subtle"
                >
                  GET THE LAUNCH TRIO 📦
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
