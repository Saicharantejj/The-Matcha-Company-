import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise } from '../components/Motion'
import SachetGraphic from '../components/SachetGraphic'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { diyKits } from '../data/products'

/**
 * Recipes.
 *
 * Set as an index — a numbered list you read down, where opening a row reveals
 * what is in the box. The catalogue is a lookbook and the bundles are
 * full-width features, so this page earns its own shape rather than being the
 * same grid of boxes a third time.
 *
 * The checklist survived from the old version because it is genuinely useful
 * when you are standing in a kitchen, but it no longer lives inside a card
 * inside a card.
 */
function KitRow({ kit, index }) {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(() => new Set())
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleAdd = () => {
    addItem(kit, 'diy-kit')
    notify(`${kit.name} added`, { action: 'View cart', onAction: openCart })
  }

  const toggle = (item) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })

  const panelId = `kit-panel-${kit.id}`

  return (
    <article className="rule first:border-t-0">
      <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex items-baseline gap-5 lg:col-span-1">
          <span className="index-num">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="lg:col-span-6">
          <h2 className="font-display text-minor tracking-display">{kit.name}</h2>
          <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-bark">{kit.blurb}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <dt className="spec">Time</dt>
              <dd className="mt-1 font-body text-sm text-cocoa">{kit.prepTime}</dd>
            </div>
            <div>
              <dt className="spec">Effort</dt>
              <dd className="mt-1 font-body text-sm text-cocoa">{kit.difficulty}</dd>
            </div>
            <div>
              <dt className="spec">Makes</dt>
              <dd className="mt-1 font-body text-sm text-cocoa">{kit.servings}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <button type="button" onClick={handleAdd} className="btn">
              Add kit to cart
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="link-draw font-mono text-spec uppercase"
            >
              {open ? 'Hide contents' : "What's in the box"}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-7 max-w-md">
                  {kit.includes.map((item) => {
                    const isChecked = checked.has(item)
                    return (
                      <li key={item} className="rule">
                        <button
                          type="button"
                          onClick={() => toggle(item)}
                          aria-pressed={isChecked}
                          className="flex w-full items-baseline gap-4 py-3 text-left"
                        >
                          <span
                            className={`mt-1 h-2.5 w-2.5 shrink-0 border border-ink transition-colors duration-300 ${
                              isChecked ? 'bg-olive' : 'bg-transparent'
                            }`}
                          />
                          <span
                            className={`font-body text-sm transition-colors duration-300 ${
                              isChecked ? 'text-bark line-through' : 'text-cocoa'
                            }`}
                          >
                            {item}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="aspect-[4/3] lg:col-span-5 lg:aspect-[4/5]">
          <SachetGraphic swatch={kit.swatch} flavor={kit.flavor} />
        </div>
      </div>
    </article>
  )
}

export default function DiyKits() {
  return (
    <PageShell>
      <section className="bg-camel px-5 pb-14 pt-16 sm:px-10 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-[100rem]">
          <p className="spec text-olive">Six recipes &middot; sachet included</p>
          <h1 className="mt-6 max-w-4xl font-display text-major tracking-display">
            <Rise delay={0.05}>Things to make</Rise>
            <Rise delay={0.15}>with one sachet.</Rise>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl font-serif text-lede italic text-bark">
              Each kit is one recipe, pre-portioned, with the sachets and the card in the box.
              Nothing here needs a whisk and nothing takes longer than the washing up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel px-5 pb-24 sm:px-10">
        <div className="mx-auto max-w-[100rem]">
          {diyKits.map((kit, i) => (
            <KitRow key={kit.id} kit={kit} index={i} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
