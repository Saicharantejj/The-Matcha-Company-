import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import FieldGraphic from '../components/FieldGraphic'

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
    text: 'The Matcha Company launches with one flavor: Vanilla Matcha, packed into single-serve sachets from that same Uji farm\'s leaves.',
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
      {/* INTRO */}
      <section className="border-b border-chocolate bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-moss">Our Story</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl tracking-display sm:text-5xl lg:text-6xl">
              A farm in Uji. A shop in Bengaluru. No ceremony in between.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-chocolate/75 sm:text-lg">
              We didn't set out to reinvent matcha — just to strip out everything standing between
              a good cup and the people who'd actually drink it daily.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SPLIT SCREEN BLOCK 1 */}
      <section className="border-b border-chocolate bg-camel">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <Reveal className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20 lg:order-1">
            <p className="font-mono text-xs uppercase tracking-widest text-moss">01 — Sourcing</p>
            <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">
              One farm, not a blend
            </h2>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-chocolate/75">
              Most "matcha" on shelves is blended from multiple harvests and regions to hit a price
              point. Ours comes from a single shaded terrace in Uji, Kyoto — the same family, the
              same rows, every single order.
            </p>
          </Reveal>
          <div className="order-1 aspect-[4/3] border-b border-chocolate lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l">
            <FieldGraphic variant="rows" className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* SPLIT SCREEN BLOCK 2 (reversed) */}
      <section className="border-b border-chocolate bg-camel">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="aspect-[4/3] border-b border-chocolate lg:aspect-auto lg:border-b-0 lg:border-r">
            <FieldGraphic variant="leaf" className="h-full w-full" />
          </div>
          <Reveal className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20">
            <p className="font-mono text-xs uppercase tracking-widest text-moss">02 — Milling</p>
            <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">
              Ground slow, on stone
            </h2>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-chocolate/75">
              Granite stone mills grind about 30 grams an hour — slow enough that friction never
              heats the leaf. Heat is what turns good matcha bitter and dull. We'd rather wait.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-b border-chocolate bg-card">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-10 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-moss">Since 1958</p>
            <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">The Uji Timeline</h2>
            <p className="mt-3 font-body text-sm text-chocolate/70">
              Tap a year to read what happened.
            </p>
          </Reveal>

          <div className="relative">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-6">
              {TIMELINE.map((entry) => {
                const isActive = entry.year === activeYear
                return (
                  <button
                    key={entry.year}
                    onClick={() => setActiveYear(entry.year)}
                    className="relative flex-shrink-0 border border-chocolate px-5 py-3 font-mono text-sm tracking-widest transition-colors"
                    style={{
                      backgroundColor: isActive ? '#43481D' : 'transparent',
                      color: isActive ? '#F6EFC6' : '#2B1F16',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="timeline-active"
                        className="absolute inset-0 -z-10 bg-olive"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    {entry.year}
                  </button>
                )
              })}
            </div>

            <div className="h-px w-full bg-chocolate/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-8 max-w-2xl"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-moss">{activeEntry.year}</p>
                <h3 className="mt-2 font-display text-2xl tracking-display sm:text-3xl">
                  {activeEntry.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-chocolate/75">
                  {activeEntry.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SOURCING PHILOSOPHY */}
      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-10 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-moss">Philosophy</p>
            <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">
              Three rules we don't break
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                n: '01',
                title: 'Single Origin, Always',
                text: 'No blending harvests to hit a margin. If the Uji harvest is short, we sell less matcha — not worse matcha.',
              },
              {
                n: '02',
                title: 'Built For Every Day',
                text: 'Matcha treated like an occasion gets used like one. Ours is a sachet in a drawer — meant for your Tuesday, not a special trip.',
              },
              {
                n: '03',
                title: 'Skip What Doesn\'t Serve You',
                text: 'The tea ceremony is beautiful — and optional. We keep the parts that make the drink better, drop the parts that just make it slower.',
              },
            ].map((item) => (
              <StaggerItem key={item.n}>
                <div className="card-hard h-full p-6">
                  <p className="font-mono text-xs text-moss">{item.n}</p>
                  <h3 className="mt-3 font-display text-lg tracking-display">{item.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-chocolate/70">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageShell>
  )
}
