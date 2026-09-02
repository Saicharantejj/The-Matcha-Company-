import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise, RiseInView, EASE } from '../components/Motion'
import Magnetic from '../components/Magnetic'
import OrganicShape from '../components/OrganicShape'
import TaglineTicker from '../components/TaglineTicker'
import ProductCard from '../components/ProductCard'
import Photo from '../components/Photo'
import { photos } from '../data/photos'
import { useShopifyProducts } from '../context/ShopifyContext'

const STEPS = [
  { n: '01', title: 'Tear', body: 'One sachet, one cup. Pre-portioned Japanese Uji matcha powder ready for your daily routine.' },
  { n: '02', title: 'Stir', body: 'Stir directly into cold or warm milk or water. Dissolves quickly and smoothly.' },
  { n: '03', title: 'Drink', body: 'Enjoy stone-ground Uji matcha quality on your counter in seconds.' },
]

export default function Home() {
  const { products } = useShopifyProducts()
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroParallax = useTransform(heroProgress, [0, 1], [0, -40])

  const powderProducts = products.filter((p) => p.category === 'Matcha Powder')
  const kitProducts = products.filter((p) => p.category === 'Matcha Kits')
  const hamperProducts = products.filter((p) => p.category === 'Gift Hampers')

  return (
    <PageShell>
      {/* ── HERO SECTION ────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative isolate min-h-[85vh] bg-[#E9E7D0] px-6 pb-20 pt-16 sm:px-10 sm:pt-24 overflow-hidden flex items-center"
      >
        <OrganicShape
          className="-right-20 top-10 h-[46rem] w-[46rem]"
          surface="lightBold"
          path={0}
          distance={80}
          side="right"
        />
        <OrganicShape
          className="-left-32 bottom-0 h-[38rem] w-[38rem]"
          surface="glass"
          path={1}
          distance={50}
          side="left"
        />

        <div className="relative mx-auto w-full max-w-[100rem]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Bold Typography & CTAs */}
            <motion.div
              className="lg:col-span-7"
              style={reduceMotion ? undefined : { y: heroParallax }}
            >
              <Reveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-pill rounded-full mb-6">
                  <span className="h-2 w-2 rounded-full bg-[#5C8A2E] animate-pulse" />
                  <span className="spec text-[#4E6B3E] text-xs">Uji, Kyoto &rarr; Your Kitchen Counter</span>
                </div>
              </Reveal>

              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#232E1E] leading-[0.88]">
                <Rise delay={0.25}>Pure Japanese</Rise>
                <Rise delay={0.38} className="text-[#4E6B3E] italic">Uji Matcha.</Rise>
              </h1>

              <Reveal delay={0.65} className="mt-8 max-w-xl">
                <p className="font-body text-lg leading-relaxed text-[#232E1E]/80">
                  Single-origin Uji matcha leaf, stone-ground on granite mills. Pre-portioned sachets, curated matcha kits, and premium gift hampers.
                </p>
              </Reveal>

              <Reveal delay={0.8} className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link to="/matchas" className="btn border-[#4E6B3E] bg-[#4E6B3E] text-[#F8F5EB] shadow-lg">
                    Matcha Powder &rarr;
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/matcha-kits" className="btn-outline">
                    Matcha Kits
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/gift-hampers" className="btn-outline">
                    Gift Hampers
                  </Link>
                </Magnetic>
              </Reveal>

              <Reveal delay={0.95} className="mt-12 border-t border-[#232E1E]/15 pt-6">
                <div className="grid grid-cols-3 gap-6 max-w-lg">
                  <div>
                    <span className="block font-display text-2xl text-[#4E6B3E]">100%</span>
                    <span className="spec text-[0.65rem] text-[#232E1E]/70">Single Origin</span>
                  </div>
                  <div>
                    <span className="block font-display text-2xl text-[#4E6B3E]">Stone Ground</span>
                    <span className="spec text-[0.65rem] text-[#232E1E]/70">Uji, Kyoto</span>
                  </div>
                  <div>
                    <span className="block font-display text-2xl text-[#4E6B3E]">Up to 30%</span>
                    <span className="spec text-[0.65rem] text-[#232E1E]/70">Bulk Savings</span>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            {/* Right Column: Featured Image */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
                className="relative rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl border border-[#232E1E]/15"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-md">
                  <Photo photo={photos.counterKit} className="h-full w-full object-cover" priority />
                  <div className="absolute top-4 right-4 glass-dark px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-[#F8F5EB]">
                    BEST VALUE
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#232E1E]/12 pt-4">
                  <div>
                    <h3 className="font-display text-2xl text-[#232E1E]">Matcha Powder Pack of 20</h3>
                    <p className="spec text-[#4E6B3E]">₹2,100 &middot; 30% OFF</p>
                  </div>
                  <Link to="/matchas" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#4E6B3E] text-[#F8F5EB] hover:bg-[#232E1E] transition-colors">
                    &rarr;
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MATCHA POWDER SECTION (PACK OPTIONS & SAVINGS) ────────────────────────── */}
      <section className="relative bg-[#F8F5EB] py-24 sm:py-32 px-6 sm:px-10 border-t border-b border-[#232E1E]/10">
        <div className="relative mx-auto max-w-[100rem]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#232E1E] pb-6 mb-12">
            <div>
              <span className="spec text-[#4E6B3E]">Single Serve Packets</span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#232E1E] mt-1">Matcha Powder</h2>
              <p className="mt-2 font-body text-base text-[#232E1E]/80">
                Choose from 5, 10, or 20 sachet packs. Save up to 30% on larger packs.
              </p>
            </div>
            <Link to="/matchas" className="link-draw font-mono text-spec uppercase text-[#4E6B3E] font-bold mt-4 sm:mt-0">
              View All Powder Packs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {powderProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MATCHA KITS SECTION ───────────────────────────────────────────────────── */}
      <section className="relative bg-[#E9E7D0] py-24 sm:py-32 px-6 sm:px-10 border-b border-[#232E1E]/10">
        <div className="relative mx-auto max-w-[100rem]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#232E1E] pb-6 mb-12">
            <div>
              <span className="spec text-[#4E6B3E]">Curated Sets</span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#232E1E] mt-1">Matcha Kits</h2>
              <p className="mt-2 font-body text-base text-[#232E1E]/80">
                Essential Uji matcha kits designed for daily ritual.
              </p>
            </div>
            <Link to="/matcha-kits" className="link-draw font-mono text-spec uppercase text-[#4E6B3E] font-bold mt-4 sm:mt-0">
              View Matcha Kits &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            {kitProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GIFT HAMPERS SECTION ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#F8F5EB] py-24 sm:py-32 px-6 sm:px-10 border-b border-[#232E1E]/10">
        <div className="relative mx-auto max-w-[100rem]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#232E1E] pb-6 mb-12">
            <div>
              <span className="spec text-[#4E6B3E]">Special Edition</span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#232E1E] mt-1">Gift Hampers</h2>
              <p className="mt-2 font-body text-base text-[#232E1E]/80">
                Premium boxed hampers for special occasions and gifting.
              </p>
            </div>
            <Link to="/gift-hampers" className="link-draw font-mono text-spec uppercase text-[#4E6B3E] font-bold mt-4 sm:mt-0">
              View Gift Hampers &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            {hamperProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── METHOD SECTION ────────────────────────────────────────────────────────── */}
      <section className="bg-[#E9E7D0] py-24 sm:py-32 px-6 sm:px-10">
        <div className="mx-auto max-w-[100rem]">
          <div className="max-w-3xl">
            <span className="spec text-[#4E6B3E]">Simple Preparation</span>
            <h2 className="font-display text-4xl sm:text-6xl text-[#232E1E] mt-2">
              Ten seconds, start to finish.
            </h2>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-4">
              <div className="glass-panel p-4 rounded-xl shadow-md">
                <Photo photo={photos.counterKit} className="w-full rounded-lg" natural parallax={20} />
                <p className="spec mt-4 px-2 text-[#4E6B3E]">Stone-ground Uji matcha</p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1}>
                  <div className="glass-card p-6 rounded-xl h-full flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-2xl font-bold text-[#4E6B3E]">{step.n}</span>
                      <h3 className="mt-4 font-display text-2xl text-[#232E1E]">{step.title}</h3>
                      <p className="mt-3 font-body text-sm leading-relaxed text-[#232E1E]/80">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TaglineTicker />

      {/* ── CLOSE CTA SECTION ───────────────────────────────────────────────── */}
      <section className="bg-[#232E1E] text-[#F8F5EB] py-28 sm:py-36 px-6 sm:px-10 relative overflow-hidden">
        <OrganicShape className="left-[-10%] top-1/2 h-[38rem] w-[38rem] -translate-y-1/2" surface="dark" distance={40} side="left" />
        <div className="relative mx-auto max-w-[100rem]">
          <h2 className="max-w-4xl font-display text-5xl sm:text-7xl text-[#F8F5EB] leading-[0.9]">
            <RiseInView>Japanese Uji Matcha</RiseInView>
            <RiseInView delay={0.08} className="text-[#C4D2B8] italic">delivered to your door.</RiseInView>
          </h2>
          <div className="mt-12 flex flex-col gap-8 border-t border-[#F8F5EB]/20 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md font-serif text-xl italic text-[#C4D2B8]">
              Single-origin Uji matcha sachets, curated kits, and gift hampers.
            </p>
            <Link
              to="/matchas"
              className="btn border-[#F8F5EB] bg-[#F8F5EB] text-[#232E1E] hover:bg-[#4E6B3E] hover:text-[#F8F5EB] hover:border-[#4E6B3E] shadow-xl shrink-0"
            >
              Shop Matcha Powder &rarr;
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
