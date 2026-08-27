import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import MoodMatcher from '../components/MoodMatcher'
import TaglineTicker from '../components/TaglineTicker'
import ProductCard from '../components/ProductCard'
import heroImg from '../assets/hero-iced-matcha-cutout.png'
import { products, FLAVORS } from '../data/products'

const FEATURED_IDS = ['strawberry-sachet', 'mango-sachet', 'ube-sachet']

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // The cup sits big on the right at rest, fully clear of the text column.
  // As the hero scrolls past, it slides hard to the left — sliding under the
  // (opaque) text column, which progressively masks it out of view, wiping
  // it away well before it scrolls out of the viewport — while it also
  // shrinks a touch and only fades at the very end, once it's already
  // hidden behind the text, so nothing is left peeking out.
  const heroImgX = useTransform(scrollYProgress, [0, 1], [0, -560])
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 0.82])
  const heroImgOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])

  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  return (
    <PageShell>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden border-b border-chocolate bg-camel">
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          {/* Big cup, sitting behind the text column. On lg it's pinned to the
              right side and vertically centered; on scroll it slides left and
              up, sliding under the (opaque) text column until it's masked out
              of view, shrinking and fading the rest of the way to nothing. */}
          <div className="pointer-events-none mb-8 flex justify-center lg:absolute lg:inset-0 lg:z-0 lg:mb-0 lg:items-center lg:justify-end">
            <motion.div
              style={{ x: heroImgX, y: heroImgY, scale: heroImgScale, opacity: heroImgOpacity }}
              className="relative flex justify-center lg:mr-[-1%]"
            >
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-1/2 h-9 w-56 -translate-x-1/2 bg-chocolate/20 blur-lg sm:w-72 lg:w-80"
              />
              <img
                src={heroImg}
                alt="Iced matcha made from one of our flavor sachets"
                className="relative h-[300px] w-auto object-contain drop-shadow-[0_24px_20px_rgba(43,31,22,0.35)] sm:h-[420px] lg:h-[640px] xl:h-[720px]"
              />
            </motion.div>
          </div>

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 bg-camel lg:pr-6"
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-moss">
                Made for everyday
              </p>
              <h1 className="font-display text-[13vw] leading-[0.95] tracking-display sm:text-6xl lg:text-7xl">
                Matcha, minus
                <br />
                the ceremony
              </h1>
              <p className="mt-6 max-w-md font-body text-base leading-relaxed text-chocolate/80 sm:text-lg">
                Good matcha shouldn't need a café visit or a bamboo whisk. Just tear a sachet, stir, and go.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/matchas"
                  className="btn-hard border-chocolate bg-olive text-cream"
                >
                  Shop the Sachets
                </Link>
                <Link
                  to="/matcha-kits"
                  className="btn-hard border-chocolate bg-transparent text-chocolate"
                >
                  Bulk &amp; Cafés
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 border-t border-chocolate/15 pt-6">
                <div>
                  <p className="font-display text-2xl tracking-display text-olive">4.8/5</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-chocolate/60">2,300+ orders</p>
                </div>
                <div className="h-8 w-px bg-chocolate/20" />
                <div>
                  <p className="font-display text-2xl tracking-display text-olive">5</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-chocolate/60">Sachet flavors</p>
                </div>
              </div>

              <div className="mt-10 border-t border-chocolate/15 pt-6">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-chocolate/55">
                  One sachet, stirred with milk or water
                </p>
                <div className="flex flex-wrap gap-2">
                  {FLAVORS.map((flavor) => (
                    <span key={flavor} className="tag-outline">
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* empty column keeps the text at half-width on desktop so the
                absolutely positioned cup has room to sit (and slide) behind it */}
            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* MOOD MATCHER */}
      <section className="border-b border-chocolate bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-8 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-moss">Not sure where to start?</p>
            <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">Find your flavor</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MoodMatcher />
          </Reveal>
        </div>
      </section>

      {/* TAGLINE TICKER */}
      <TaglineTicker />

      {/* FEATURED SPECIALS */}
      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-moss">Fan favorites</p>
              <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">Featured Flavors</h2>
            </div>
            <Link
              to="/matchas"
              className="font-mono text-xs uppercase tracking-widest text-olive underline underline-offset-4 hover:text-chocolate"
            >
              View full catalog →
            </Link>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-chocolate bg-chocolate">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl tracking-display text-cream sm:text-5xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-cream/75">
              Order online and we'll ship it out, or set your café up with a standing order.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/matchas" className="btn-hard border-cream bg-matcha text-chocolate">
                Shop Now
              </Link>
              <Link to="/our-story" className="btn-hard border-cream bg-transparent text-cream">
                Our Story
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
