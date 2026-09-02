import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise, RiseInView, StaggerGroup, StaggerItem } from '../components/Motion'
import Photo from '../components/Photo'
import OrganicShape from '../components/OrganicShape'
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
    title: 'First Pack, Bengaluru',
    text: 'Drink Yōjō launches with single-serve Japanese Uji matcha sachets from that same Uji farm\'s leaves.',
  },
  {
    year: '2026',
    title: 'Where We Are Now',
    text: 'Single-serve matcha powder packs, curated matcha kits, and gift hampers. Same farm, same stone mills, still no ceremony required.',
  },
]

export default function OurStory() {
  const [activeYear, setActiveYear] = useState(TIMELINE[2].year)
  const activeEntry = TIMELINE.find((t) => t.year === activeYear)

  return (
    <PageShell>
      {/* ── OPENING ────────────────────────────────────────────────────────── */}
      <section className="bg-camel px-5 pb-20 pt-20 sm:px-10 sm:pb-32 sm:pt-28">
        <div className="mx-auto max-w-[100rem]">
          <p className="spec text-olive">Since 1958 &middot; Uji, Kyoto</p>
          <h1 className="mt-8 max-w-5xl font-display text-mega tracking-display">
            <Rise delay={0.05}>A farm in Uji.</Rise>
            <Rise delay={0.15}>A sachet at</Rise>
            <Rise delay={0.25}>your door.</Rise>
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-12 max-w-xl font-serif text-lede italic text-bark">
              We did not set out to reinvent matcha. We set out to remove everything standing
              between a good cup and the people who would actually drink it daily.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SOURCING ───────────────────────────────────────────────────────── */}
      <section className="bg-camel px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="lg:col-span-6">
            <Photo photo={photos.cupBlossoms} className="w-full" natural priority parallax={66} />
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
      <section className="bg-camel px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="lg:col-span-6">
            <Photo photo={photos.bowlsFlatlay} className="w-full" natural parallax={56} />
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

      {/* ── TIMELINE ───────────────────────────────────────────────────────── */}
      <section className="section-editorial bg-ink px-5 py-28 sm:px-10 sm:py-40">
        <OrganicShape className="left-[-12%] top-0 h-[36rem] w-[36rem]" surface="darkWarm" path={1} distance={54} side="left" />
        <div className="relative mx-auto max-w-[100rem]">
          <h2 className="font-display text-minor tracking-display text-cream">Sixty-eight years</h2>

          <div
            aria-label="Choose a year"
            role="group"
            className="no-scrollbar mt-12 flex gap-10 overflow-x-auto border-b border-linen/20 pb-6"
          >
            {TIMELINE.map((entry) => {
              const isActive = entry.year === activeYear
              return (
                <button
                  key={entry.year}
                  aria-pressed={isActive}
                  onClick={() => setActiveYear(entry.year)}
                  className={`shrink-0 font-mono text-spec tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-cream font-bold' : 'text-linen/60 hover:text-cream'
                  }`}
                >
                  {entry.year}
                  <span
                    className={`mt-2 block h-0.5 w-full origin-left bg-cream transition-transform duration-500 ${
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
              className="mt-14 grid gap-8 lg:grid-cols-12 glass-dark p-8 sm:p-12"
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
      <section className="bg-camel px-5 py-28 sm:px-10 sm:py-36">
        <div className="mx-auto max-w-[100rem]">
          <h2 className="max-w-3xl font-display text-major tracking-display">
            <RiseInView>Three rules we</RiseInView>
            <RiseInView delay={0.08}>do not break.</RiseInView>
          </h2>

          <StaggerGroup className="mt-20 grid gap-y-12 sm:grid-cols-3 sm:gap-x-12">
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
              <StaggerItem key={item.n} className="card-glass p-8">
                <span className="index-num text-olive">{item.n}</span>
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
