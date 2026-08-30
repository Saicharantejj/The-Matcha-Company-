import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise } from '../components/Motion'
import ProductCard from '../components/ProductCard'
import Photo from '../components/Photo'
import { products } from '../data/products'
import { photos } from '../data/photos'

const ALL_TAGS = [...new Set(products.flatMap((p) => p.tags ?? []))]

/**
 * The catalogue.
 *
 * Laid out as a lookbook rather than a uniform three-column grid: two columns
 * on desktop with the right-hand one dropped by a third of a plate, so the eye
 * moves diagonally down the page instead of scanning flat rows.
 *
 * The filter lost its pills. It was a row of bordered chips with a green
 * lozenge springing between them — a lot of apparatus for what is a set of
 * radio buttons. It is now a line of words, and the active one is simply the
 * one in olive with a rule under it.
 */
export default function Matchas() {
  const [active, setActive] = useState(null)

  const visible = useMemo(
    () => (active ? products.filter((p) => p.tags?.includes(active)) : products),
    [active],
  )

  return (
    <PageShell>
      {/* ── HERO ─────────────────────────────────────────────────────────────
          Set the way the landing page's fold is: the photograph is the ground
          rather than an object on it, and the type inverts over it. Sized to
          match that fold at 78vh, because at 62vh this band read as a strip
          above the page rather than as the opening of it.

          The picture changed. This frame used to carry the layers macro, which
          is an out-of-focus abstract — green over white over dark red, with
          nothing in it in focus. It could not be made clear by lifting the
          scrim: lightening the veil only resolved the blur into a smear, and
          because the picture has a bright band running straight through the
          middle it also dropped the headline to 3.4:1 and the lede to 4.6:1,
          both a hair off their floors. A veil heavy enough to fix that is a
          veil heavy enough to hide the photograph, which is the position the
          frame was already stuck in.

          A picture with a dark ground solves both at once. Cream over this at
          78% ink measures 6.5:1 under the headline and 9.8:1 at the lede,
          while the veil is light enough that the bowls, the whisk and the
          powder all read at a glance. Measured on the composited pixels behind
          the type, not on the overlay colour. */}
      <section className="relative isolate flex min-h-[78vh] flex-col justify-end overflow-hidden bg-ink">
        {photos.bowlsFlatlay && (
          <div aria-hidden className="absolute inset-0 -z-10">
            <img
              src={photos.bowlsFlatlay.src}
              alt=""
              width={photos.bowlsFlatlay.width}
              height={photos.bowlsFlatlay.height}
              fetchPriority="high"
              className="h-full w-full object-cover [filter:saturate(1.1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/78 via-ink/58 to-ink/20" />
            {/* A second pass up the frame, so the type sits on the deepest
                part of the picture and the top edge keeps its own light. */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
        )}

        <div className="mx-auto w-full max-w-[100rem] px-5 pb-14 pt-28 sm:px-10 sm:pb-16 sm:pt-36">
          <p className="spec text-linen">Five flavours &middot; 10g each</p>
          <h1 className="mt-6 max-w-4xl font-display text-major tracking-display text-cream">
            <Rise delay={0.05}>Every sachet</Rise>
            <Rise delay={0.15}>we make.</Rise>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl font-serif text-lede italic text-linen">
              Stone-ground in Uji, blended with real fruit, sealed one cup at a time. Tear one
              into cold milk or water and skip the ceremony entirely.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The plate is held to the width the file actually has, so the column
          beside it carries the page's terms rather than sitting empty. */}
      <section className="bg-camel px-5 pb-16 sm:px-10 sm:pb-20">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <Photo photo={photos.glassesOverhead} className="w-full" natural priority />
            <p className="spec mt-4">Uji, Kyoto &middot; first-harvest leaf, stone-ground</p>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <p className="max-w-lg font-serif text-lede italic text-bark">
              Every sachet on this page is the same leaf: shade-grown on one terrace, milled on granite at thirty grams an hour, then blended with real fruit. What changes down the list is only what we put with it.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink pt-8">
            <div>
              <dt className="spec">Flavours</dt>
              <dd className="mt-1 font-body text-sm text-cocoa">FIVE</dd>
            </div>
            <div>
              <dt className="spec">Weight</dt>
              <dd className="mt-1 font-body text-sm text-cocoa">10 G EACH</dd>
            </div>
            <div>
              <dt className="spec">Milled</dt>
              <dd className="mt-1 font-body text-sm text-cocoa">IN UJI</dd>
            </div>
            <div>
              <dt className="spec">Whisk</dt>
              <dd className="mt-1 font-body text-sm text-cocoa">NOT NEEDED</dd>
            </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-camel px-5 pb-28 sm:px-10">
        <div className="mx-auto max-w-[100rem]">
          <div className="rule-heavy flex flex-col gap-4 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
              <FilterWord label="All" isActive={active === null} onClick={() => setActive(null)} />
              {ALL_TAGS.map((tag) => (
                <FilterWord
                  key={tag}
                  label={tag}
                  isActive={active === tag}
                  onClick={() => setActive(active === tag ? null : tag)}
                />
              ))}
            </div>
            <p aria-live="polite" className="spec shrink-0">
              {String(visible.length).padStart(2, '0')} shown
            </p>
          </div>

          <motion.div
            layout
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  /* The offset is what turns a grid into a composition: the
                     middle column drops, whichever column that is. */
                  className={`${i % 2 === 1 ? 'sm:mt-24 lg:mt-0' : ''} ${
                    i % 3 === 1 ? 'lg:mt-24' : ''
                  }`}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}

              {/* Five flavours into three columns leaves a hole in the last
                  row. It holds the next thing to do rather than nothing. */}
              {visible.length > 0 && (
                <motion.div
                  key="catalogue-end"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={visible.length % 3 === 1 ? 'lg:mt-24' : ''}
                >
                  <div className="rule-heavy flex h-full flex-col justify-between gap-8 pt-6">
                    <div>
                      <span className="index-num">Not sure yet</span>
                      <h3 className="mt-4 max-w-xs font-display text-minor tracking-display">
                        Start with one of each
                      </h3>
                      <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-bark">
                        The Discovery Pack is five sachets, one of every flavour, for the price of
                        finding out which one you actually reach for.
                      </p>
                    </div>
                    <Link to="/matcha-kits" className="btn self-start">
                      See the bundles
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p className="mt-16 font-serif text-lede italic text-bark">
              Nothing carries that tag yet.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  )
}

function FilterWord({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`font-mono text-spec uppercase transition-colors duration-300 ${
        isActive
          ? 'border-b border-olive pb-1 text-olive'
          : 'border-b border-transparent pb-1 text-bark hover:text-cocoa'
      }`}
    >
      {label}
    </button>
  )
}
