import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise, RiseInView, EASE } from '../components/Motion'
import MoodMatcher from '../components/MoodMatcher'
import TaglineTicker from '../components/TaglineTicker'
import FlavorPlate from '../components/FlavorPlate'
import Photo from '../components/Photo'
import { products } from '../data/products'
import { photos } from '../data/photos'

const STEPS = [
  { n: '01', title: 'Tear', body: 'One sachet, one cup. The ratio is already decided, so there is nothing to measure and nothing to get wrong.' },
  { n: '02', title: 'Stir', body: 'Cold milk, oat, or water. It dissolves in about ten seconds against the side of the glass. No whisk, no bowl, no sieve.' },
  { n: '03', title: 'Drink', body: 'That is the whole method. The ceremony is lovely and we are not doing it on a Tuesday morning.' },
]

/**
 * One flavour in the index, which takes the sticky plate when it reaches the
 * middle of the screen.
 *
 * The section already swapped the plate on hover, and that is still the fastest
 * way to browse it with a mouse. But hovering is not scrolling: reading down
 * the list left the plate showing whatever was pointed at last, and on a
 * trackpad that is usually nothing. The observer band is the middle tenth of
 * the viewport, so a row takes the plate as it arrives at eye level and holds
 * it until the next one does.
 */
function FlavourRow({ index, isActive, onActivate, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActivate(index)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index, onActivate])

  return (
    <li
      ref={ref}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      data-active={isActive || undefined}
      className="rule group py-7 first:border-t-0 first:pt-0"
    >
      {children}
    </li>
  )
}

export default function Home() {
  const [active, setActive] = useState(0)
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // The fold's own scroll, start to end. The powder drifts up a little slower
  // than the type leaving above it and closes very slightly as it goes, so the
  // fold reads as a room being left rather than as a panel scrolling off.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const powderY = useTransform(heroProgress, [0, 1], ['0%', '14%'])
  const powderScale = useTransform(heroProgress, [0, 1], [1, 1.07])
  const foldFade = useTransform(heroProgress, [0, 0.75], [1, 0])

  return (
    <PageShell>
      {/* ── HERO ─────────────────────────────────────────────────────────────
          One photograph, one sentence. The cut-out glass that used to hold the
          right-hand columns is gone: against the powder it read as a second
          picture pasted over the first, and the fold says more with the leaf
          alone than it did with a product shot floating on top of it.

          The whole fold stands on a photograph of the powder itself, run
          full bleed behind the type. Ink brown on mid-green is nowhere near
          readable, so the type inverts to cream and the picture carries a
          scrim: 70% ink under the words, which puts cream at about 6:1, easing
          to 25% across the right, where nothing is set and the grain is worth
          seeing at full strength. Any lighter under the type and the headline
          stops clearing AA; any heavier and there is no point having a
          photograph there at all. */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[78vh] flex-col justify-end overflow-hidden bg-ink"
      >
        {photos.powderTexture && (
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={reduceMotion ? undefined : { y: powderY, scale: powderScale }}
          >
            {/* The powder settles out of a slight over-scale as the page
                arrives — the same gesture ImageReveal uses on every other
                photograph, played slower because this one is the whole fold. */}
            <motion.img
              src={photos.powderTexture.src}
              alt=""
              width={photos.powderTexture.width}
              height={photos.powderTexture.height}
              fetchPriority="high"
              className="h-full w-full object-cover"
              initial={reduceMotion ? false : { scale: 1.09, opacity: 0.55 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.9, ease: EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/55 to-ink/25" />
          </motion.div>
        )}

        <motion.div
          className="mx-auto w-full max-w-[100rem] px-5 pb-14 pt-32 sm:px-10 sm:pb-16 sm:pt-40"
          style={reduceMotion ? undefined : { opacity: foldFade }}
        >
          <Reveal delay={0.2}>
            <p className="spec text-linen">Uji, Kyoto &rarr; your kitchen counter</p>
          </Reveal>

          {/* The three lines climb out one after another, and the eyebrow, the
              rule and the buttons are spaced around them so the fold assembles
              over about a second and a half rather than appearing at once. */}
          <h1 className="mt-6 max-w-5xl font-display text-mega tracking-display text-cream">
            <Rise delay={0.35}>Matcha,</Rise>
            <Rise delay={0.47}>minus the</Rise>
            <Rise delay={0.59} className="text-linen">ceremony</Rise>
          </h1>

          {/* The fold's footer: the lede on the left, the two actions on the
              right, divided from the headline by the heavy rule. */}
          <div className="rule-heavy mt-14 border-linen pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
            <Reveal delay={0.95} className="lg:col-span-5">
              <p className="max-w-md font-body text-lede text-linen">
                Stone-ground leaf from a single region, blended with real fruit and sealed one
                cup at a time. Tear it, stir it, drink it.
              </p>
            </Reveal>
            <Reveal delay={1.1} className="mt-8 flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:justify-end">
              <Link to="/matchas" className="btn border-cream bg-cream text-cocoa hover:bg-olive hover:text-cream">
                Shop the sachets
              </Link>
              <Link to="/matcha-kits" className="btn-outline border-cream text-cream hover:bg-cream hover:text-cocoa">
                Try all five
              </Link>
            </Reveal>
          </div>
        </motion.div>
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
              <Photo photo={photos.toolsGreenWood} delay={0.15} className="aspect-[5/4] w-full" parallax={44} />
              <p className="spec mt-4 text-linen">The same leaf, whisked the long way</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FIVE ─────────────────────────────────────────────────────────
          An index, not a card grid. The plate on the left belongs to whichever
          row is at eye level, so reading down the list plays the five flavours
          in order without touching anything — and hovering still overrides it
          for anyone browsing with a mouse. */}
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
                    animate={{
                      opacity: i === active ? 1 : 0,
                      scale: i === active ? 1 : 1.03,
                    }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <FlavorPlate item={p} />
                  </motion.div>
                ))}
              </div>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {products.map((p, i) => (
                <FlavourRow
                  key={p.id}
                  index={i}
                  isActive={i === active}
                  onActivate={setActive}
                >
                  <Link to="/matchas" className="block">
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`index-num transition-colors duration-500 ${
                          i === active ? 'text-olive' : ''
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* The row holding the plate says so, quietly: it steps
                          in from its numeral and takes the olive. */}
                      <h3
                        className={`font-display text-minor tracking-display transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-olive motion-reduce:transform-none ${
                          i === active ? 'text-olive lg:translate-x-1' : ''
                        }`}
                      >
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
                </FlavourRow>
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
              <Photo photo={photos.counterKit} className="w-full" natural parallax={38} />
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
            <Photo photo={photos.bowlsFlatlay} className="w-full" natural parallax={62} />
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
