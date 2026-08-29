import PageShell from '../components/PageShell'
import Reveal, { Rise, ImageReveal } from '../components/Motion'
import SachetGraphic from '../components/SachetGraphic'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { matchaKits } from '../data/products'

/**
 * Bundles.
 *
 * Deliberately the widest page on the site. The catalogue is a lookbook grid
 * and the recipes are an index, so this one runs as full-width features —
 * one bundle per band, image and copy trading sides down the page, divided by
 * heavy rules. Nothing here is a card, and no two of these three pages should
 * be mistakable for one another at a glance.
 */
function KitFeature({ kit, index }) {
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleAdd = () => {
    addItem(kit, 'bundle')
    notify(`${kit.name} added`, { action: 'View cart', onAction: openCart })
  }

  const flipped = index % 2 === 1

  return (
    <article className="rule-heavy grid grid-cols-1 gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:gap-x-12">
      <ImageReveal
        className={`aspect-[5/4] lg:col-span-5 ${flipped ? 'lg:order-2 lg:col-start-8' : ''}`}
      >
        <SachetGraphic swatch={kit.swatch} flavor={kit.flavor} tone={flipped ? 'dark' : 'paper'} />
      </ImageReveal>

      <div className={`flex flex-col justify-center lg:col-span-6 ${flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
        <div className="flex items-baseline gap-5">
          <span className="index-num">{String(index + 1).padStart(2, '0')}</span>
          {kit.badge && <span className="spec text-olive">{kit.badge}</span>}
        </div>

        <h2 className="mt-4 max-w-lg font-display text-minor tracking-display">{kit.name}</h2>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-bark">{kit.blurb}</p>

        <ul className="mt-8 max-w-md">
          {kit.items.map((item) => (
            <li key={item} className="rule flex items-baseline gap-4 py-3">
              <span className="index-num text-olive">&mdash;</span>
              <span className="font-body text-sm text-bark">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <button type="button" onClick={handleAdd} className="btn">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default function MatchaKits() {
  return (
    <PageShell>
      <section className="bg-camel px-5 pb-14 pt-16 sm:px-10 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-[100rem]">
          <p className="spec text-olive">Boxed, bundled, and subscribed</p>
          <h1 className="mt-6 max-w-4xl font-display text-major tracking-display">
            <Rise delay={0.05}>Buy them</Rise>
            <Rise delay={0.15}>by the box.</Rise>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl font-serif text-lede italic text-bark">
              Six ways to buy more than one at a time &mdash; from a five-sachet taster to a
              hundred-count case for a café counter.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel px-5 pb-24 sm:px-10">
        <div className="mx-auto max-w-[100rem]">
          {matchaKits.map((kit, i) => (
            <KitFeature key={kit.id} kit={kit} index={i} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
