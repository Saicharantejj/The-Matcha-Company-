import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import PageShell from '../components/PageShell'
import Reveal, { Rise, RiseInView, ImageReveal } from '../components/Motion'
import MoodMatcher from '../components/MoodMatcher'
import TaglineTicker from '../components/TaglineTicker'
import SachetGraphic from '../components/SachetGraphic'
import heroImg from '../assets/hero-iced-matcha-cutout.png'
import { products } from '../data/products'

const STEPS = [
  { n: '01', title: 'Tear', body: 'One sachet, one cup. The ratio is already decided, so there is nothing to measure and nothing to get wrong.' },
  { n: '02', title: 'Stir', body: 'Cold milk, oat, or water. It dissolves in about ten seconds against the side of the glass. No whisk, no bowl, no sieve.' },
  { n: '03', title: 'Drink', body: 'That is the whole method. The ceremony is lovely and we are not doing it on a Tuesday morning.' },
]

export default function Home() {
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  // The only parallax on the site. The glass holds its ground a little as the
  // page leaves, which reads as depth; everything else scrolls honestly.
  const glassY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <PageShell>
      {/* ── HERO ─────────────────────────────────────────────────────────────
          Asymmetric on purpose. The type takes seven of twelve columns and the
          glass takes six, so they overlap by one and the composition has a seam
          in it rather than a gutter. */}
      <section ref={heroRef} className="relative overflow-hidden bg-camel">
        <div className="mx-auto max-w-[100rem] px-5 pb-16 pt-10 sm:px-10 sm:pb-24 sm:pt-16">
          <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-6">
            <div className="lg:col-span-7 lg:pb-16">
              <Reveal>
                <p className="spec text-olive">Uji, Kyoto &rarr; your kitchen counter</p>
              </Reveal>

              <h1 className="mt-6 font-display text-mega tracking-display">
                <Rise delay={0.1}>Matcha,</Rise>
                <Rise delay={0.2}>minus the</Rise>
                <Rise delay={0.3} className="text-olive">ceremony</Rise>
              </h1>
            </div>

            {/* On mobile the glass is a full-width plate directly under the
                headline. On desktop it bleeds off the right edge. */}
            <motion.div
              style={reduceMotion ? undefined : { y: glassY }}
              className="relative -mr-5 mt-10 sm:-mr-10 lg:col-span-5 lg:mt-0 lg:-mr-16 xl:-mr-24"
            >
              <ImageReveal delay={0.35}>
                <img
                  src={heroImg}
                  alt="A glass of iced matcha made from a single sachet"
                  width="900"
                  height="1200"
                  fetchPriority="high"
                  className="ml-auto h-auto w-[86%] object-contain sm:w-[68%] lg:max-h-[64vh] lg:w-auto"
                />
              </ImageReveal>
            </motion.div>
          </div>

          {/* The fold's footer: the lede and the two actions, held to the left
              column so the page has a clear reading order. */}
          <div className="rule-heavy mt-12 pt-8 lg:mt-4 lg:grid lg:grid-cols-12 lg:gap-x-6">
            <Reveal className="lg:col-span-5">
              <p className="max-w-md font-body text-lede text-bark">
                Stone-ground leaf from a single region, blended with real fruit and sealed one
                cup at a time. Tear it, stir it, drink it.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:justify-end">
              <Link to="/matchas" className="btn">Shop the sachets</Link>
              <Link to="/matcha-kits" className="btn-outline">Try all five</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE CLAIM ────────────────────────────────────────────────────────
          One dark room in the middle of a paper site. No image, no card, no
          columns — a single sentence at size, which is the whole point of it. */}
      <section className="bg-ink py-24 sm:py-36">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <p className="spec text-linen">What is actually in it</p>
          <h2 className="mt-8 max-w-5xl font-display text-major tracking-display text-cream">
            <RiseInView>Most flavoured</RiseInView>
            <RiseInView delay={0.08}>matcha is sugar</RiseInView>
            <RiseInView delay={0.16}>with a green tint.</RiseInView>
          </h2>
          <Reveal delay={0.3} className="mt-10 max-w-xl">
            <p className="font-serif text-lede italic text-linen">
              Ours is single-region leaf, stone-ground slowly enough not to scorch, then blended
              with real fruit rather than flavouring. You can taste which one you picked.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── THE FIVE ─────────────────────────────────────────────────────────
          An index, not a card grid. Hovering a row swaps the plate on the left,
          which is the one interaction on this page worth remembering. */}
      <section className="bg-camel py-24 sm:py-32">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <div className="rule-heavy flex items-baseline justify-between gap-6 pt-8">
            <h2 className="font-display text-minor tracking-display">Five flavours</h2>
            <Link to="/matchas" className="link-draw font-mono text-spec uppercase">
              All sachets
            </Link>
          </div>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-10">
            {/* The plate. Sticky on desktop so it stays with the reader as the
                list moves; hidden on mobile, where each row carries its own. */}
            <div className="hidden lg:col-span-5 lg:block">
              <div className="sticky top-28 aspect-[4/5]">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <SachetGraphic swatch={p.swatch} flavor={p.flavor} />
                  </motion.div>
                ))}
              </div>
            </div>

            <ul className="lg:col-span-7">
              {products.map((p, i) => (
                <li
                  key={p.id}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="rule group py-7 first:border-t-0 first:pt-0"
                >
                  <Link to="/matchas" className="block">
                    <div className="flex items-baseline gap-5">
                      <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-display text-minor tracking-display transition-colors duration-300 group-hover:text-olive">
                        {p.flavor}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-lg pl-11 font-body text-sm leading-relaxed text-bark">
                      {p.blurb}
                    </p>
                    {/* Mobile carries the plate inline, since there is no room
                        for a sticky companion and no hover to drive it. */}
                    <div className="mt-5 aspect-[3/2] w-full pl-11 lg:hidden">
                      <SachetGraphic swatch={p.swatch} flavor={p.flavor} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── METHOD ───────────────────────────────────────────────────────────
          Three steps set as numerals on rules. No boxes, no icons. */}
      <section className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <h2 className="max-w-3xl font-display text-major tracking-display">
            <RiseInView>Ten seconds,</RiseInView>
            <RiseInView delay={0.08}>start to finish.</RiseInView>
          </h2>

          <div className="mt-16 grid gap-y-10 sm:grid-cols-3 sm:gap-x-10">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} className="rule pt-5">
                <span className="index-num">{step.n}</span>
                <h3 className="mt-4 font-display text-xl tracking-display">{step.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-bark">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOOD MATCHER ─────────────────────────────────────────────────── */}
      <section className="bg-camel py-24 sm:py-32">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <div className="rule-heavy pt-8">
            <h2 className="font-display text-minor tracking-display">Pick by mood instead</h2>
          </div>
          <Reveal delay={0.1} className="mt-10">
            <MoodMatcher />
          </Reveal>
        </div>
      </section>

      <TaglineTicker />

      {/* ── CLOSE ────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-28 sm:py-40">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <h2 className="max-w-4xl font-display text-major tracking-display text-cream">
            <RiseInView>Start with one</RiseInView>
            <RiseInView delay={0.08}>of each.</RiseInView>
          </h2>
          <div className="rule mt-12 flex flex-col gap-8 border-linen pt-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md font-serif text-lede italic text-linen">
              The Discovery Pack is five sachets, one of every flavour. It is the shortest route
              to knowing which one you actually reach for.
            </p>
            <Link
              to="/matcha-kits"
              className="btn shrink-0 border-cream bg-cream text-cocoa hover:bg-olive hover:text-cream"
            >
              See the bundles
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
