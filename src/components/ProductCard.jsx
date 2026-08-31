import FlavorPlate from './FlavorPlate'
import { ImageReveal } from './Motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

/**
 * A product in the catalogue — a plate and a caption, not a card.
 *
 * The old version wrapped every product in a bordered box with an offset
 * shadow, a hover lift, an aspect-4/3 crop and a full-width button, which is
 * the same object the kits and the bundles were also using. Four pages of
 * identical boxes is why the site read as one component repeated.
 *
 * Here the image is tall, uncropped by any container, and the type sits
 * underneath it on a hairline, the way a catalogue plate is captioned. Adding
 * to the cart is a text action, not a filled bar competing with the product.
 */
export default function ProductCard({ product, index = 0 }) {
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleAdd = () => {
    addItem(product, 'sachet')
    notify(`${product.flavor} added`, { action: 'View cart', onAction: openCart })
  }

  return (
    <article className="group flex h-full w-full flex-col">
      <div className="relative">
        {/* The plate is already clipped by the reveal, so the hover push has
            somewhere to go: the picture grows inside a frame that does not.
            Nine-tenths of a second and four percent — slow and small enough
            that it reads as the object leaning towards you. */}
        <ImageReveal delay={(index % 3) * 0.08} className="aspect-[4/5] w-full">
          <FlavorPlate
            item={product}
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none group-hover:scale-[1.04]"
          />
        </ImageReveal>
        {product.badge && (
          <span className="spec absolute left-0 top-0 z-10 bg-olive px-3 py-1.5 text-cream">
            {product.badge}
          </span>
        )}
      </div>

      <div className="rule mt-5 flex flex-1 flex-col pt-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none group-hover:-translate-y-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg tracking-display">{product.flavor}</h3>
          <span className="index-num">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <p className="mt-2 font-body text-sm leading-relaxed text-bark">{product.blurb}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <span className="spec">{product.size}</span>
          <button
            type="button"
            onClick={handleAdd}
            className="link-draw font-mono text-spec uppercase"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
