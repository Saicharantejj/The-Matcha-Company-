import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import ProductCard from '../components/ProductCard'
import BuildYourBox from '../components/BuildYourBox'
import BenefitsGrid from '../components/BenefitsGrid'
import Reviews from '../components/Reviews'
import UgcGrid from '../components/UgcGrid'
import FourPillars from '../components/FourPillars'
import { fetchShopifyProducts } from '../lib/shopify/api'
import { photos } from '../data/photos'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function Home() {
  const [products, setProducts] = useState(PRODUCTS_CATALOGUE)
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
      src: photos.meshBagIngredients.src,
      tag: 'REAL INGREDIENTS',
      badge: 'FARM FRESH',
      title: 'Whole Spices & Farm Red Chilies',
      caption: '100% real ingredients, zero artificial colors or flavours',
    },
    {
      src: photos.newspaperComingSoon.src,
      tag: 'CHASKA GAZETTE',
      badge: '2026 EDITION',
      title: 'Good Food, Good Company',
      caption: 'Better snacks for modern everyday cravings',
    },
    {
      src: photos.tabletopLifestyle.src,
      tag: 'TABLETOP SPREAD',
      badge: 'BETTER SNACKS',
      title: 'Tabletop Feast & Cocktail Hour',
      caption: 'Crisp lotus pops served in traditional brass bowl',
    },
  ]

  const activeHeroPhoto = heroPhotos[heroPhotoIndex] || heroPhotos[0]

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
      <section className="relative bg-[#F5EEDD] px-6 pt-8 pb-14 sm:px-12 sm:pt-10 sm:pb-16 border-b border-[#17245B]/15 flex items-center">
        <div className="mx-auto w-full max-w-[96rem]">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Bold Headline & Whitespace */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A9223A] text-white font-mono text-xs font-extrabold uppercase tracking-wider shadow-sm">
                  🔥 100% SLOW-ROASTED MAKHANA
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17245B] text-[#F5EEDD] font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
                  ⚡ MODERN INDIAN CRUNCH <span className="text-[#E2AE35]">🍿</span>
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.85rem] font-black tracking-tight text-[#17245B] leading-[0.92] uppercase">
                MAKHANA KO <br />
                <span className="text-[#A9223A]">CHASKA</span> <span className="text-[#E2AE35]">LAGA DIYA.</span>
              </h1>

              <p className="font-sans text-base sm:text-lg leading-relaxed text-[#17245B]/90 font-medium max-w-lg">
                Big crunch. Bold flavour. Bas boring nahi. Handpicked Bihar lotus seeds slow-roasted in small batches with chef-crafted seasonings.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/shop" className="btn-lacquer shadow-lg text-xs font-bold px-8 py-4">
                  SHOP CHASKA ➔
                </Link>
                <Link to="/build-your-box" className="btn-indigo shadow-lg text-xs font-bold px-8 py-4">
                  BUILD YOUR BOX
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Photo Stage with Provided Photos */}
            <div className="lg:col-span-5 space-y-3">
              <motion.div
                key={activeHeroPhoto.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#17245B] shadow-pop bg-[#17245B]"
              >
                <img
                  src={activeHeroPhoto.src}
                  alt={activeHeroPhoto.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#A9223A] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                  {activeHeroPhoto.badge}
                </div>
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#17245B]/95 text-[#F5EEDD] backdrop-blur-md border border-[#F5EEDD]/20 flex items-center justify-between shadow-xl">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#E2AE35] uppercase tracking-wider">
                      {activeHeroPhoto.tag}
                    </span>
                    <p className="font-display font-bold text-sm sm:text-base text-white leading-tight">
                      {activeHeroPhoto.title}
                    </p>
                  </div>
                  <Link to="/shop" className="px-3.5 py-1.5 rounded-full bg-[#A9223A] text-white font-mono text-xs font-bold hover:bg-[#E2AE35] hover:text-[#17245B] transition-colors shadow-sm">
                    SHOP
                  </Link>
                </div>
              </motion.div>

              {/* Photo Selector Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {heroPhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroPhotoIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      heroPhotoIndex === idx
                        ? 'border-[#A9223A] ring-2 ring-[#A9223A]/40 scale-105 shadow-md'
                        : 'border-[#17245B]/20 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={item.src} alt={item.tag} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 1.25 DUAL-BAND TICKER RIBBON (MIDNIGHT INDIGO & CHILLI RED) ──── */}
      <div className="border-b border-[#17245B]/15 overflow-hidden shadow-xs">
        {/* Band 1: Midnight Indigo */}
        <div className="bg-[#17245B] text-[#F5EEDD] py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-around gap-4 whitespace-nowrap overflow-x-auto no-scrollbar">
          <span>🍿 100% SLOW ROASTED</span>
          <span className="text-[#E2AE35]">★</span>
          <span>🌶️ ZERO PALM OIL</span>
          <span className="text-[#E2AE35]">★</span>
          <span>💥 CRACKLING CRUNCH</span>
          <span className="text-[#E2AE35]">★</span>
          <span>🇮🇳 BIHAR LOTUS SEEDS</span>
          <span className="text-[#E2AE35]">★</span>
          <span>⚡ ADDICTIVE MASALAS</span>
        </div>
        {/* Band 2: Chilli Red */}
        <div className="bg-[#A9223A] text-white py-2 px-4 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-around gap-4 whitespace-nowrap overflow-x-auto no-scrollbar">
          <span>🔥 KARARE. CHATPATE. ADDICTIVE.</span>
          <span className="text-[#E2AE35]">•</span>
          <span>📦 FLAT 15% OFF CODE: CHASKA15</span>
          <span className="text-[#E2AE35]">•</span>
          <span>⚡ FREE NATIONWIDE SHIPPING OVER ₹499</span>
          <span className="text-[#E2AE35]">•</span>
          <span>🍿 NO MAIDA • NO ARTIFICIAL COLOURS</span>
        </div>
      </div>

      {/* ── 1.5 OFFICIAL CAMPAIGN PHOTO SHOWCASE (OVER MEET YOUR NEW SNACK) ─ */}
      <section className="py-16 bg-[#FAF6ED] border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#A9223A] text-white font-mono text-xs font-bold uppercase tracking-widest">
                🔥 OFFICIAL 2026 CAMPAIGN PHOTOS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B]">
                THE SIGNATURE <span className="text-[#A9223A]">CHASKA</span> DROP
              </h2>
            </div>
            <Link to="/shop" className="btn-indigo text-xs font-bold shadow-md">
              SHOP ALL FLAVOURS ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 50g Signature Masala Pouch (Midnight Indigo Accent) */}
            <div className="group rounded-3xl overflow-hidden border-2 border-[#17245B]/20 bg-white shadow-card hover:border-[#17245B] hover:shadow-xl transition-all">
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
                  Masala Makhana Pouch
                </h3>
                <p className="font-sans text-xs text-[#17245B]/80 leading-relaxed font-medium">
                  Slow-roasted Bihar lotus seeds enrobed in signature secret spices. Big crunch, zero frying.
                </p>
                <div className="pt-2">
                  <Link to="/shop" className="font-mono text-xs font-bold text-[#A9223A] hover:text-[#17245B] transition-colors">
                    GRAB THIS PACK ➔
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Fresh Ingredients & Whole Spices (Chilli Red Accent) */}
            <div className="group rounded-3xl overflow-hidden border-2 border-[#A9223A]/30 bg-white shadow-card hover:border-[#A9223A] hover:shadow-xl transition-all">
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
                  Farm Fresh &amp; Honest
                </h3>
                <p className="font-sans text-xs text-[#17245B]/80 leading-relaxed font-medium">
                  Fresh red chillies, sun-dried heirloom tomatoes, and pure rock salt tossed in cold-pressed oil.
                </p>
                <div className="pt-2">
                  <Link to="/about" className="font-mono text-xs font-bold text-[#17245B] hover:text-[#A9223A] transition-colors">
                    OUR SOURCING STORY ➔
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: The CHASKA Gazette (Midnight Indigo Accent) */}
            <div className="group rounded-3xl overflow-hidden border-2 border-[#17245B]/20 bg-white shadow-card hover:border-[#17245B] hover:shadow-xl transition-all">
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
                  Good Food, Good Company
                </h3>
                <p className="font-sans text-xs text-[#17245B]/80 leading-relaxed font-medium">
                  Better snacks made for conversation, cocktails, midnight cravings, and desk crunching.
                </p>
                <div className="pt-2">
                  <Link to="/build-your-box" className="font-mono text-xs font-bold text-[#17245B] hover:text-[#A9223A] transition-colors">
                    BUILD YOUR STASH ➔
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FLAVOUR SHOWCASE ────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A9223A]">
                🔥 AB BATAO, KAUNSA CHASKA?
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#17245B] leading-none">
                MEET YOUR NEW <span className="text-[#A9223A]">CHASKA.</span>
              </h2>
            </div>
            <Link to="/shop" className="font-mono text-xs font-bold uppercase tracking-wider text-[#17245B] hover:text-[#A9223A] transition-colors">
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

      {/* ── 4.5 FOUR FOUNDATIONAL PILLARS (TRUST, VALUE, NAVIGATION, OFFERS) ── */}
      <FourPillars />

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

