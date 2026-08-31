import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise, RiseInView, StaggerGroup, StaggerItem } from '../components/Motion'
import Photo from '../components/Photo'
import { photos } from '../data/photos'

const TIMELINE = [
  {
    year: '1958',
    title: 'The Sato Family Field',
    text: 'Three generations back, our sourcing partner\'s grandfather plants his first rows of tencha in Uji, on terraces shaded by reed screens.',
  },
  {
    year: '1991',
    title: 'Stone Mills Installed',
    text: 'The farm moves to traditional granite stone-milling — grinding tencha leaves slowly enough that the matcha never overheats or oxidizes.',
  },
  {
    year: '2019',
    title: 'We Meet In Uji',
    text: 'Our founder visits the farm during harvest season, tastes a bowl whisked tableside, and spends the next two years figuring out how to bring it home as something you could tear open and stir, not something you\'d need a ceremony for.',
  },
  {
    year: '2022',
    title: 'First Sachet, Bengaluru',
    text: 'Drink Yojo launches with one flavor: Vanilla Matcha, packed into single-serve sachets from that same Uji farm\'s leaves.',
  },
  {
    year: '2026',
    title: 'Where We Are Now',
    text: 'Five flavors — Strawberry, Blueberry, Mango, Ube, and Vanilla — plus recipe kits and sachet bundles. Same farm, same stone mills, still no ceremony required.',
  },
]

export default function OurStory() {
  const [activeYear, setActiveYear] = useState(TIMELINE[2].year)
  const activeEntry = TIMELINE.find((t) => t.year === activeYear)

  return (
    <PageShell>
      {/* ── OPENING ──────────────────────────────────────────────────────────
          The story page is the one place the site is allowed to be quiet and
          slow. No grid, no columns, just a statement and a lot of paper. */}
      <section className="bg-camel px-5 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-[100rem]">
          <p className="spec text-olive">Since 1958 &middot; Uji, Kyoto</p>
          <h1 className="mt-6 max-w-5xl font-display text-major tracking-display">
            <Rise delay={0.05}>A farm in Uji.</Rise>
            <Rise delay={0.15}>A sachet at</Rise>
            <Rise delay={0.25}>your door.</Rise>
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-10 max-w-xl font-serif text-lede italic text-bark">
              We did not set out to reinvent matcha. We set out to remove everything standing
              between a good cup and the people who would actually drink it daily.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SOURCING ─────────────────────────────────────────────────────────
          A wide plate with the copy set into the band beneath it, rather than
          the old fifty-fifty split. The picture gets to be a picture —
          a photograph now, rather than the drawn placeholder that stood in
          while the brand had no pictures of its own. It is held to the width
          the file actually has instead of being bled across the viewport,
          because a photograph enlarged past its own pixels is a blurry one. */}
      <section className="bg-camel px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="lg:col-span-6">
            <Photo photo={photos.cupBlossoms} className="w-full" natural priority parallax={34} />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <span className="index-num">01</span>
            <h2 className="mt-4 font-display text-minor tracking-display">One farm, not a blend</h2>
            <p className="mt-5 max-w-lg font-body text-lede text-bark">
                Most matcha on a shelf is blended across harvests and regions to hit a price. Ours
                comes off a single shaded terrace in Uji &mdash; the same family, the same rows,
                every order.
            </p>
          </div>
        </div>
      </section>

      {/* ── MILLING ─────────────────────────────────────────────────────── */}
      <section className="bg-camel px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="lg:col-span-6">
            <Photo photo={photos.bowlsFlatlay} className="w-full" natural parallax={28} />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <span className="index-num">02</span>
            <h2 className="mt-4 font-display text-minor tracking-display">Ground slow, on stone</h2>
            <p className="mt-5 max-w-lg font-body text-lede text-bark">
                Granite mills turn out about thirty grams an hour &mdash; slow enough that friction
                never heats the leaf. Heat is what makes matcha bitter and dull. We would rather
                wait.
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────────
          The years lost their boxes and the green lozenge that sprang between
          them. They are numerals on a rule now; the active one is simply the
          one in olive. */}
      <section className="bg-ink px-5 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[100rem]">
          <h2 className="font-display text-minor tracking-display text-cream">Sixty-eight years</h2>

          <div
            aria-label="Choose a year"
            role="group"
            className="no-scrollbar mt-10 flex gap-10 overflow-x-auto border-b border-linen pb-5"
          >
            {TIMELINE.map((entry) => {
              const isActive = entry.year === activeYear
              return (
                <button
                  key={entry.year}
                  aria-pressed={isActive}
                  onClick={() => setActiveYear(entry.year)}
                  className={`shrink-0 font-mono text-spec tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-cream' : 'text-linen hover:text-cream'
                  }`}
                >
                  {entry.year}
                  <span
                    className={`mt-2 block h-px w-full origin-left bg-cream transition-transform duration-500 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
              className="mt-12 grid gap-6 lg:grid-cols-12"
            >
              <h3 className="font-display text-minor tracking-display text-cream lg:col-span-4">
                {activeEntry.title}
              </h3>
              <p className="max-w-2xl font-body text-lede text-linen lg:col-span-7 lg:col-start-6">
                {activeEntry.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── RULES ────────────────────────────────────────────────────────── */}
      <section className="bg-camel px-5 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[100rem]">
          <h2 className="max-w-3xl font-display text-major tracking-display">
            <RiseInView>Three rules we</RiseInView>
            <RiseInView delay={0.08}>do not break.</RiseInView>
          </h2>

          <StaggerGroup className="mt-16 grid gap-y-10 sm:grid-cols-3 sm:gap-x-10">
            {[
              {
                n: '01',
                title: 'Single origin, always',
                text: 'No blending harvests to protect a margin. If the Uji harvest is short we sell less matcha, not worse matcha.',
              },
              {
                n: '02',
                title: 'Built for a Tuesday',
                text: 'Matcha treated as an occasion gets drunk like one. Ours lives in a drawer, not on a shelf you admire.',
              },
              {
                n: '03',
                title: 'Keep only what helps',
                text: 'The ceremony is beautiful and it is optional. We kept the parts that make the drink better and dropped the parts that only make it slower.',
              },
            ].map((item) => (
              <StaggerItem key={item.n} className="rule pt-5">
                <span className="index-num">{item.n}</span>
                <h3 className="mt-4 font-display text-xl tracking-display">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-bark">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageShell>
  )
}
