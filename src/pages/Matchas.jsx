import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise, EASE } from '../components/Motion'
import ProductCard from '../components/ProductCard'
import Photo from '../components/Photo'
import OrganicShape from '../components/OrganicShape'
import { photos } from '../data/photos'
import { useMetaPixelCategoryView } from '../lib/metaPixel'
import { useShopifyProducts } from '../context/ShopifyContext'

export default function Matchas() {
  const { products } = useShopifyProducts()
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const powderProducts = useMemo(
    () => products.filter((p) => p.category === 'Matcha Powder' || p.name?.toLowerCase().includes('pack')),
    [products]
  )

  useMetaPixelCategoryView('Matcha Powder', powderProducts)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], [0, -30])

  return (
    <PageShell>
      {/* ── HERO SECTION: WARM IVORY CATALOGUE ─────────────────────────── */}
      <section
        ref={heroRef}
        className="relative bg-[#E9E7D0] px-6 pb-20 pt-16 sm:px-10 sm:pt-24 overflow-hidden border-b border-[#232E1E]/10"
      >
        <OrganicShape className="-right-20 -top-20 h-[40rem] w-[40rem]" surface="lightBold" path={1} distance={50} side="right" />

        <div className="relative mx-auto max-w-[100rem]">
          <motion.div style={reduceMotion ? undefined : { y: heroY }}>
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-pill rounded-full mb-6">
                <span className="spec text-[#4E6B3E] text-xs">Japanese Uji Matcha Powder &middot; Single Serve Sachets</span>
              </div>
            </Reveal>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[#232E1E] leading-[0.9]">
              <Rise delay={0.25}>Matcha Powder</Rise>
              <Rise delay={0.38} className="text-[#4E6B3E] italic">Packs.</Rise>
            </h1>

            <Reveal delay={0.55} className="mt-8 max-w-xl">
              <p className="font-body text-lg text-[#232E1E]/80 leading-relaxed">
                Stone-ground single-origin Uji matcha, pre-portioned into single-serve sachets. Choose your pack size and save on bulk options.
              </p>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* ── SAVINGS HIGHLIGHT INTERSTITIAL ──────────────────────────────── */}
      <section className="bg-[#F8F5EB] px-6 py-16 sm:px-10 border-b border-[#232E1E]/10">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="glass-panel p-4 rounded-xl shadow-md">
              <Photo photo={photos.glassesOverhead} className="w-full rounded-lg" natural priority parallax={30} />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <span className="spec text-[#4E6B3E]">Single Origin Uji Leaf</span>
            <p className="mt-3 max-w-lg font-serif text-xl italic text-[#232E1E]">
              Every sachet contains shade-grown tencha milled slowly on granite stone mills in Uji, Kyoto.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-x-6 gap-y-6 border-t border-[#232E1E]/15 pt-6">
              <div>
                <dt className="spec">Pack of 5</dt>
                <dd className="mt-1 font-body text-sm font-bold text-[#232E1E]">₹750</dd>
              </div>
              <div>
                <dt className="spec">Pack of 10</dt>
                <dd className="mt-1 font-body text-sm font-bold text-[#4E6B3E]">₹1,350 (10% OFF)</dd>
              </div>
              <div>
                <dt className="spec">Pack of 20</dt>
                <dd className="mt-1 font-body text-sm font-bold text-[#4E6B3E]">₹2,100 (30% OFF)</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS CATALOGUE GRID ─────────────────────────────────────── */}
      <section className="bg-[#E9E7D0] px-6 py-20 sm:px-10 pb-32">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {powderProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
