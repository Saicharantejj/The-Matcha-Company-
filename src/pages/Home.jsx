import { Link, NavLink } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import MoodMatcher from '../components/MoodMatcher'
import ProductCard from '../components/ProductCard'
import SplitText from '../components/SplitText'
import { Crown, Sun, Flower, Arrow } from '../components/Doodles'
import heroImg from '../assets/hero-iced-matcha-cutout.png'
import logoWordmark from '../assets/logo-wordmark-ink.png'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const FEATURED_IDS = ['strawberry-sachet', 'mango-sachet', 'ube-sachet']

// Short, landing-page nav — the full route list lives in the sticky header on
// every other page.
const HERO_NAV = [
  { to: '/matchas', label: 'Matchas' },
  { to: '/diy-kits', label: 'Kits' },
  { to: '/our-story', label: 'Story' },
]

const TICKER = [
  'Cold matcha',
  'No whisk, no drama',
  'Five flavors',
  'One sachet, one minute',
  'Stone-ground from Uji',
  'Zero ceremony',
]

/**
 * The lime strip that closes the hero. Duplicated content scrolls seamlessly on
 * the shared .marquee-track keyframe, so it runs on the compositor rather than
 * costing a frame of JS.
 */
function HeroTicker() {
  const run = [...TICKER, ...TICKER]
  return (
    <div className="overflow-hidden border-y-2 border-olive bg-lime py-3">
      <div className="marquee-track" style={{ animationDuration: '38s' }}>
        {run.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center whitespace-nowrap font-display text-lg tracking-display text-olive sm:text-xl"
          >
            {item}
            <span aria-hidden="true" className="mx-6 text-base">
              &#9829;
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const reduceMotion = useReducedMotion()
  const { count: cartCount, openCart } = useCart()

  // The glass drifts rather than slides: it lags the page's upward travel and
  // shrinks slightly, which reads as depth. The spring keeps it off the wheel.
  const drift = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const heroImgY = useTransform(drift, [0, 1], [0, 110])
  const heroImgScale = useTransform(drift, [0, 1], [1, 0.92])

  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean)
  const hero = featured[0]

  return (
    <PageShell>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-sage pt-8 sm:pt-12">
        {/* Cart still needs a home now that the sticky header is hidden here. */}
        <div className="mx-auto flex max-w-7xl justify-end px-5 sm:px-8">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            className="rounded-[999px] border-2 border-olive px-5 py-2 font-mono text-xs uppercase tracking-widest text-olive transition-colors hover:bg-olive hover:text-sage"
          >
            Cart (<span className="tabular-nums">{cartCount}</span>)
          </button>
        </div>

        {/* Wordmark over nav, both centred */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 flex flex-col items-center"
        >
          <Link to="/" aria-label="The Matcha Company — home">
            <img src={logoWordmark} alt="The Matcha Company" className="h-14 w-auto sm:h-20" />
          </Link>
          <nav className="mt-3 flex items-center gap-8">
            {HERO_NAV.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="font-display text-lg tracking-display text-olive underline-offset-8 transition-all hover:underline sm:text-xl"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </motion.div>

        {/* Headline, flanked by marginalia */}
        <div className="relative mx-auto mt-12 max-w-6xl px-5 text-center sm:mt-16 sm:px-8">
          <Crown
            className="pointer-events-none absolute -left-2 top-0 hidden w-32 text-matcha lg:block xl:w-40"
            delay={0.75}
          />
          <Sun
            className="pointer-events-none absolute -right-2 top-6 hidden w-32 text-matcha lg:block xl:w-40"
            delay={0.85}
          />

          <h1 className="font-display text-[13vw] leading-[0.92] tracking-display text-olive sm:text-6xl lg:text-8xl">
            <SplitText text="Matcha, minus" as="span" className="block" delay={0.15} />
            <SplitText text="the ceremony" as="span" className="block" delay={0.42} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/matchas"
              className="inline-flex items-center gap-2 rounded-[14px] bg-lime px-8 py-4 font-body text-base font-semibold text-olive transition-transform hover:-translate-y-0.5"
            >
              Shop the sachets
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <Link
              to="/our-story"
              className="inline-flex items-center rounded-[14px] border-2 border-olive px-8 py-4 font-body text-base font-semibold text-olive transition-colors hover:bg-olive hover:text-sage"
            >
              Our story
            </Link>
          </motion.div>
        </div>

        {/* Product callout, the glass, and the handwritten note */}
        <div className="mx-auto mt-14 max-w-7xl px-5 sm:mt-20 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]">
            <Reveal delay={0.15} className="order-2 lg:order-none lg:pt-10">
              <div className="relative border-l-4 border-olive pl-4">
                <p className="font-display text-xl tracking-display text-olive">{hero?.flavor}</p>
                <p className="mt-1 font-body text-sm text-fern">Stone-ground &middot; served over ice</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-fern">
                  {hero?.size}
                </p>
                <Arrow
                  className="pointer-events-none absolute -right-4 top-8 hidden w-40 translate-x-full text-olive xl:block"
                  delay={1.15}
                />
              </div>
            </Reveal>

            <motion.div
              style={reduceMotion ? undefined : { y: heroImgY, scale: heroImgScale }}
              className="order-1 flex justify-center lg:order-none"
            >
              <img
                src={heroImg}
                alt="Iced matcha made from one of our flavor sachets"
                className="h-[280px] w-auto object-contain sm:h-[380px] lg:h-[440px]"
              />
            </motion.div>

            <Reveal delay={0.25} className="order-3 lg:order-none lg:justify-self-end lg:pt-16">
              <div className="flex items-center gap-3">
                <Flower className="w-12 flex-shrink-0 text-matcha" delay={1.2} />
                <p className="max-w-[13rem] -rotate-3 font-hand text-2xl leading-tight text-olive">
                  One sachet, one minute, zero ceremony
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <HeroTicker />

      {/* MOOD MATCHER */}
      <section className="bg-sage">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-8 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-matcha">
              Not sure where to start?
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-display text-olive sm:text-4xl">
              Find your flavor
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MoodMatcher />
          </Reveal>
        </div>
      </section>

      {/* FEATURED SPECIALS */}
      <section className="bg-sage">
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-matcha">Fan favorites</p>
              <h2 className="mt-2 font-display text-3xl tracking-display text-olive sm:text-4xl">
                Featured Flavors
              </h2>
            </div>
            <Link
              to="/matchas"
              className="font-mono text-xs uppercase tracking-widest text-olive underline underline-offset-4 transition-colors hover:text-fern"
            >
              View full catalog &rarr;
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
      <section className="border-t-2 border-olive bg-olive">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl tracking-display text-sage sm:text-5xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-sage">
              Order online and we'll ship it out, or set your caf&eacute; up with a standing order.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/matchas"
                className="inline-flex items-center gap-2 rounded-[14px] bg-lime px-8 py-4 font-body text-base font-semibold text-olive transition-transform hover:-translate-y-0.5"
              >
                Shop now
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
              <Link
                to="/matcha-kits"
                className="inline-flex items-center rounded-[14px] border-2 border-sage px-8 py-4 font-body text-base font-semibold text-sage transition-colors hover:bg-sage hover:text-olive"
              >
                Bulk &amp; caf&eacute;s
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
