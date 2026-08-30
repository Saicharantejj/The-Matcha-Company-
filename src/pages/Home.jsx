import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import PageShell from '../components/PageShell'
import Reveal, { Rise, RiseInView, ImageReveal } from '../components/Motion'
import MoodMatcher from '../components/MoodMatcher'
import TaglineTicker from '../components/TaglineTicker'
import FlavorPlate from '../components/FlavorPlate'
import Photo from '../components/Photo'
import heroImg from '../assets/hero-iced-matcha-cutout.png'
import { products } from '../data/products'
import { photos } from '../data/photos'

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
          in it rather than a gutter.

          The whole fold now stands on a photograph of the powder itself, run
          full bleed behind the type. Ink brown on mid-green is nowhere near
          readable, so the type inverts to cream and the picture carries a scrim
          — dark enough at the left, where the words are, to clear AA, and
          thinner at the right, where the grain can still be seen. If the
          texture file is missing the fold falls back to flat ink and the
          contrast holds either way. */}
      <section ref={heroRef} className="relative isolate overflow-hidden bg-ink">
        {photos.powderTexture && (
          <div aria-hidden className="absolute inset-0 -z-10">
            <img
              src={photos.powderTexture.src}
              alt=""
              width={photos.powderTexture.width}
              height={photos.powderTexture.height}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/45" />
          </div>
        )}

        <div className="mx-auto max-w-[100rem] px-5 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-6">
            <div className="lg:col-span-7 lg:pb-16">
              <Reveal>
                <p className="spec text-linen">Uji, Kyoto &rarr; your kitchen counter</p>
              </Reveal>

              <h1 className="mt-6 font-display text-mega tracking-display text-cream">
                <Rise delay={0.1}>Matcha,</Rise>
                <Rise delay={0.2}>minus the</Rise>
                <Rise delay={0.3} className="text-linen">ceremony</Rise>
              </h1>
            </div>

            {/* The glass used to hang off the right edge on a negative margin
                and get sliced in half by the section's overflow. Bleeding a
                photograph off the page is fine; bleeding the product you are
                selling through the middle of the cup is not.

                It now sits whole, bottom-aligned with the type so it lands on
                the same line as the rule below. The 421px cap is the file's own
                width — past that it is being invented, and this asset is small
                enough that every pixel of upscale shows. */}
            <motion.div
              style={reduceMotion ? undefined : { y: glassY }}
              className="mt-12 flex justify-center lg:col-span-5 lg:mt-0 lg:justify-end"
            >
              <ImageReveal
                delay={0.35}
                className="w-[72%] max-w-[280px] sm:max-w-[340px] lg:w-full lg:max-w-[421px]"
              >
                <img
                  src={heroImg}
                  alt="A glass of iced matcha made from a single sachet"
                  width="421"
                  height="620"
                  fetchPriority="high"
                  className="h-auto w-full object-contain"
                />
              </ImageReveal>
            </motion.div>
          </div>

          {/* The fold's footer: the lede and the two actions, held to the left
              column so the page has a clear reading order. */}
          <div className="rule-heavy mt-12 border-linen pt-8 lg:mt-4 lg:grid lg:grid-cols-12 lg:gap-x-6">
            <Reveal className="lg:col-span-5">
              <p className="max-w-md font-body text-lede text-linen">
                Stone-ground leaf from a single region, blended with real fruit and sealed one
                cup at a time. Tear it, stir it, drink it.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:justify-end">
              <Link to="/matchas" className="btn border-cream bg-cream text-cocoa hover:bg-olive hover:text-cream">
                Shop the sachets
              </Link>
              <Link to="/matcha-kits" className="btn-outline border-cream text-cream hover:bg-cream hover:text-cocoa">
                Try all five
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE CLAIM ────────────────────────────────────────────────────────
          One dark room in the middle of a paper site. The sentence still runs
          the section — it holds seven of twelve columns and nothing is allowed
          to interrupt it — and the photograph beside it is the evidence for
          the claim rather than decoration on top of it. */}
      <section className="bg-ink py-24 sm:py-36">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12">
            <div className="lg:col-span-7">
              <p className="spec text-linen">What is actually in it</p>
              <h2 className="mt-8 max-w-5xl font-display text-major tracking-display text-cream">
                <RiseInView>Most flavoured</RiseInView>
                <RiseInView delay={0.08}>matcha is sugar</RiseInView>
                <RiseInView delay={0.16}>with a green tint.</RiseInView>
              </h2>
              <Reveal delay={0.3} className="mt-10 max-w-xl">
                <p className="font-serif text-lede italic text-linen">
                  Ours is single-region leaf, stone-ground slowly enough not to scorch, then
                  blended with real fruit rather than flavouring. You can taste which one you
                  picked.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 lg:col-span-5 lg:mt-0">
              <Photo photo={photos.toolsGreenWood} delay={0.15} className="aspect-[5/4] w-full" />
              <p className="spec mt-4 text-linen">The same leaf, whisked the long way</p>
            </div>
          </div>
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
            <div className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 aspect-[4/5] w-full">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <FlavorPlate item={p} />
                  </motion.div>
                ))}
              </div>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
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
                    <div className="mt-5 pl-11 lg:hidden">
                      <div className="aspect-[4/5] w-full max-w-[15rem]">
                        <FlavorPlate item={p} />
                      </div>
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

          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
            {/* The whole method, photographed: tin, sifter, whisk, glass. It
                sits beside the steps rather than above them so the numerals
                still carry the reading. */}
            <div className="lg:col-span-3">
              <Photo photo={photos.counterKit} className="w-full" natural />
              <p className="spec mt-4">Everything the method needs</p>
            </div>

            <div className="grid gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:col-span-8 lg:col-start-5">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.08} className="rule pt-5">
                  <span className="index-num">{step.n}</span>
                  <h3 className="mt-4 font-display text-xl tracking-display">{step.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-bark">{step.body}</p>
                </Reveal>
              ))}
            </div>
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

      {/* ── THE FIELD ────────────────────────────────────────────────────────
          A breath before the close, set to the same pattern the story page
          uses: half the width for the picture, the other half for what it is
          a picture of. The photograph is never drawn wider than the file
          actually is — stretched across the viewport it went soft — so the
          column it does not need belongs to the copy. */}
      <section className="bg-camel px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="lg:col-span-6">
            <Photo photo={photos.bowlsFlatlay} className="w-full" natural />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <span className="index-num">Uji, Kyoto</span>
            <h2 className="mt-4 font-display text-minor tracking-display">
              Where the green comes from
            </h2>
            <p className="mt-5 max-w-lg font-body text-lede text-bark">
              One shaded terrace, one family, and granite mills that turn out thirty grams an
              hour. Everything we do after that is packaging.
            </p>
            <Link to="/our-story" className="link-draw mt-7 inline-block font-mono text-spec uppercase">
              Read the whole story
            </Link>
          </div>
        </div>
      </section>

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
