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
      src: photos.masalaPouchHero.src,
      tag: 'SIGNATURE 50G POUCH',
      badge: 'OFFICIAL PACK',
      title: 'Masala Makhana Pouch',
      caption: 'Slow-roasted Bihar lotus seeds in chef-crafted masala',
    },
    {
      src: photos.tabletopLifestyle.src,
      tag: 'TABLETOP RITUAL',
      badge: 'BETTER SNACKS',
      title: 'Feast & Cocktail Hour',
      caption: 'Crisp lotus pops served in traditional brass bowl',
    },
    {
      src: photos.meshBagIngredients.src,
      tag: 'REAL INGREDIENTS',
      badge: 'FARM FRESH',
      title: 'Whole Spices & Farm Red Chilies',
      caption: '100% real pantry ingredients, zero artificial colors',
    },
    {
      src: photos.newspaperComingSoon.src,
      tag: 'CHASKA GAZETTE',
      badge: 'PRINT EDITION',
      title: 'Good Food, Good Company',
      caption: 'Better snacks for modern everyday cravings',
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

  return (
    <PageShell>
      {/* ── 1. PRODUCT CAMPAIGN HERO SECTION ──────────────────────────────── */}
      <section className="relative bg-[#F5EEDD] px-4 pt-6 pb-14 sm:px-8 sm:pt-10 sm:pb-20 border-b border-[#17245B]/15 flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Bold Headline & Copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-black uppercase tracking-wider shadow-xs">
                  🔥 100% SLOW-ROASTED MAKHANA
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17245B] text-[#F5EEDD] font-mono text-xs font-bold uppercase tracking-wider">
                  ⚡ ZERO PALM OIL • GLUTEN FREE
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.75rem] font-black tracking-tight text-[#17245B] leading-[0.94] uppercase">
                MAKHANA KO <br />
                <span className="text-[#A9223A]">CHASKA</span> <span className="text-[#E2AE35]">LAGA DIYA.</span>
              </h1>

              <p className="font-sans text-base sm:text-lg leading-relaxed text-[#17245B]/85 font-medium max-w-lg">
                Big crunch. Bold flavour. Bas boring nahi. Handpicked Bihar lotus seeds slow-roasted in small batches with chef-crafted seasonings.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link to="/shop" className="btn px-8 py-4 text-xs font-black shadow-md tracking-wider">
                  SHOP CHASKA ➔
                </Link>
                <Link
                  to="/products/chaska-try-all-5"
                  className="btn-indigo px-7 py-4 text-xs font-black tracking-wider shadow-md"
                >
                  TRY ALL 5 BOX
                </Link>
              </div>

              {/* Micro specs */}
              <div className="pt-3 flex flex-wrap items-center gap-6 font-mono text-xs text-[#17245B]/80 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-extrabold">✓</span> 5 Signature Flavours
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-extrabold">✓</span> 100% Roasted, Not Fried
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-extrabold">✓</span> Free Shipping &gt; ₹499
                </span>
              </div>
            </motion.div>

            {/* Right Column: Hero Photo Stage with Provided Photos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-3"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 shadow-card bg-white">
                <img
                  src={activeHeroPhoto.src}
                  alt={activeHeroPhoto.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#A9223A] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-xs">
                  {activeHeroPhoto.badge}
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#17245B]/90 text-[#F5EEDD] backdrop-blur-md border border-white/10 flex items-center justify-between shadow-md">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#E2AE35] uppercase tracking-wider block">
                      {activeHeroPhoto.tag}
                    </span>
                    <p className="font-display font-bold text-sm sm:text-base text-white leading-tight">
                      {activeHeroPhoto.title}
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="px-3.5 py-1.5 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-black hover:bg-white transition-colors shadow-xs"
                  >
                    SHOP
                  </Link>
                </div>
              </div>

              {/* Photo Selector Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {heroPhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroPhotoIndex(idx)}
                    aria-label={`View ${item.title}`}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      heroPhotoIndex === idx
                        ? 'border-[#E2AE35] ring-2 ring-[#E2AE35]/40 scale-105 shadow-xs'
                        : 'border-[#17245B]/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={item.src} alt={item.tag} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. TICKER RIBBON ───────────────────────────────────────────────── */}
      <div className="bg-[#17245B] text-[#F5EEDD] py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-widest border-b border-[#17245B]/15 overflow-hidden shadow-2xs">
        <div className="flex items-center justify-around gap-6 whitespace-nowrap overflow-x-auto no-scrollbar">
          <span>🍿 100% SLOW ROASTED</span>
          <span className="text-[#E2AE35]">★</span>
          <span>🌶️ ZERO PALM OIL</span>
          <span className="text-[#E2AE35]">★</span>
          <span>💥 CRACKLING CRUNCH</span>
          <span className="text-[#E2AE35]">★</span>
          <span>🇮🇳 BIHAR LOTUS SEEDS</span>
          <span className="text-[#E2AE35]">★</span>
          <span>⚡ FREE SHIPPING OVER ₹499</span>
        </div>
      </div>

      {/* ── 3. OFFICIAL CAMPAIGN PHOTO SHOWCASE ("THE SIGNATURE CHASKA DROP") ─ */}
      <section className="py-16 sm:py-20 bg-[#FAF6ED] border-b border-[#17245B]/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A9223A] flex items-center gap-1.5">
                🔥 OFFICIAL 2026 CAMPAIGN PHOTOS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B]">
                THE SIGNATURE <span className="text-[#A9223A]">CHASKA</span> DROP
              </h2>
            </div>
            <Link to="/shop" className="btn-indigo text-xs font-bold shadow-md self-start sm:self-auto">
              SHOP ALL FLAVOURS ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 50g Signature Masala Pouch */}
            <div className="group rounded-3xl overflow-hidden border border-[#17245B]/15 bg-white shadow-card hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-[#17245B]">
                  <img
                    src={photos.masalaPouchHero.src}
                    alt="CHASKA 50g Masala Makhana Pouch"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-[#A9223A] uppercase tracking-wider">
                    SIGNATURE POUCH • 50G
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#17245B]">
                    MASALA MAKHANA POUCH
                  </h3>
                  <p className="font-sans text-xs text-[#17245B]/80 leading-relaxed font-medium">
                    Slow-roasted Bihar lotus seeds enrobed in signature secret spices. Big crunch, zero frying.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link to="/shop" className="font-mono text-xs font-bold text-[#17245B] hover:text-[#E2AE35] transition-colors inline-flex items-center gap-1">
                  GRAB THIS PACK ➔
                </Link>
              </div>
            </div>

            {/* Card 2: Fresh Ingredients & Whole Spices (Red Mesh Bag) */}
            <div className="group rounded-3xl overflow-hidden border border-[#17245B]/15 bg-white shadow-card hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-[#A9223A]">
                  <img
                    src={photos.meshBagIngredients.src}
                    alt="CHASKA Real Ingredients in Red Mesh Net Bag"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-[#A9223A] uppercase tracking-wider">
                    REAL WHOLE SPICES
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#17245B]">
                    FARM FRESH &amp; HONEST
                  </h3>
                  <p className="font-sans text-xs text-[#17245B]/80 leading-relaxed font-medium">
                    Fresh red chillies, sun-dried heirloom tomatoes, and pure rock salt tossed in cold-pressed oil.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link to="/about" className="font-mono text-xs font-bold text-[#17245B] hover:text-[#E2AE35] transition-colors inline-flex items-center gap-1">
                  OUR SOURCING STORY ➔
                </Link>
              </div>
            </div>

            {/* Card 3: The CHASKA Gazette (Newspaper Edition) */}
            <div className="group rounded-3xl overflow-hidden border border-[#17245B]/15 bg-white shadow-card hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-[#17245B]">
                  <img
                    src={photos.newspaperComingSoon.src}
                    alt="The CHASKA Gazette Edition 2026"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-[#17245B] uppercase tracking-wider">
                    THE PRINT EDITION • 2026
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#17245B]">
                    GOOD FOOD, GOOD COMPANY
                  </h3>
                  <p className="font-sans text-xs text-[#17245B]/80 leading-relaxed font-medium">
                    Better snacks made for conversation, cocktails, midnight cravings, and desk crunching.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link to="/products/chaska-try-all-5" className="font-mono text-xs font-bold text-[#17245B] hover:text-[#E2AE35] transition-colors inline-flex items-center gap-1">
                  BUILD YOUR STASH ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FLAVOUR DISCOVERY ("KAUNSA CHASKA?") ────────────────────────── */}
      <FlavourDiscovery />

      {/* ── 5. CHASKAA TRY ALL 5 (MAJOR CONVERSION FEATURE) ────────────────── */}
      <TryAll5Feature product={tryAll5Product} />

      {/* ── 6. SINGLE FLAVOUR PACKS CATALOGUE GRID ─────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#17245B]/15" id="all-products">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-xs font-extrabold uppercase tracking-widest">
                🍿 THE CRUNCH LINEUP
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B]">
                SIGNATURE <span className="text-[#A9223A]">FLAVOUR PACKS.</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="font-mono text-xs font-bold uppercase tracking-wider text-[#17245B] hover:text-[#E2AE35] transition-colors"
            >
              VIEW FULL CATALOGUE ➔
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[460px] rounded-3xl bg-[#FAF6ED] border border-[#17245B]/10 p-6 animate-pulse" />
              ))}
            </div>
          ) : singleFlavours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {singleFlavours.map((product, i) => (
                <ProductCard key={product.id || product.handle} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#FAF6ED] border border-dashed border-[#17245B]/20 p-12 text-center space-y-3 max-w-md mx-auto">
              <span className="text-4xl block">🍿</span>
              <h3 className="font-display text-lg font-bold uppercase text-[#17245B]">
                Flavours Loading From Shopify
              </h3>
              <p className="font-sans text-xs text-[#17245B]/70 font-medium">
                Retrieving live small-batch inventory from store...
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ── 7. WHY THE CRUNCH? (EDITORIAL BENEFITS) ────────────────────────── */}
      <BenefitsGrid />

      {/* ── 8. FOUR FOUNDATIONAL PILLARS ───────────────────────────────────── */}
      <FourPillars />

      {/* ── 9. BRAND MANIFESTO ─────────────────────────────────────────────── */}
      <section className="py-24 sm:py-28 bg-[#17245B] text-[#F5EEDD] border-b border-[#F5EEDD]/15 relative overflow-hidden" id="why-chaska">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                BRAND MANIFESTO
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase leading-tight tracking-tight text-white">
                MAKHANA KO BORING <br />
                <span className="text-[#E2AE35]">KISNE BOLA?</span>
              </h2>
              <p className="text-[#F5EEDD]/85 text-base sm:text-lg leading-relaxed font-sans font-medium max-w-xl">
                Makhana has been around forever. We just thought it deserved a little more chaska. Handpicked in Bihar wetlands, slow-roasted in small batches, and tossed in real spices for an absurdly addictive crunch.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link to="/about" className="btn px-8 py-4 text-xs font-black shadow-md">
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
