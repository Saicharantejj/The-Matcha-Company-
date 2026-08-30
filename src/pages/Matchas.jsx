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
      {/* The title held the left two-thirds and nothing held the rest. The
          macro goes there: it is the inside of the glass a sachet ends up in,
          which is a better argument for the page than more paper. */}
      <section className="bg-camel px-5 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-24">
        <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <p className="spec text-olive">Five flavours &middot; 10g each</p>
            <h1 className="mt-6 max-w-4xl font-display text-major tracking-display">
              <Rise delay={0.05}>Every sachet</Rise>
              <Rise delay={0.15}>we make.</Rise>
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-xl font-serif text-lede italic text-bark">
                Stone-ground in Uji, blended with real fruit, sealed one cup at a time. Tear one
                into cold milk or water and skip the ceremony entirely.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Photo photo={photos.layersMacro} className="aspect-[4/5] w-full" delay={0.2} priority />
            <p className="spec mt-4">Ten seconds after the sachet goes in</p>
          </div>
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
