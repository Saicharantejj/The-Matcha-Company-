import FlavorPlate from './FlavorPlate'
import { ImageReveal } from './Motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { useMetaPixelProductView } from '../lib/metaPixel'

export default function ProductCard({ product, index = 0 }) {
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const productRef = useMetaPixelProductView(product)
  const name = product.name || product.flavor

  const handleAdd = () => {
    addItem(product, product.category || 'Matcha')
    notify(`${name} added`, { action: 'View cart', onAction: openCart })
  }

  const priceFormatted = product.displayPrice || `₹${product.price}`
  const hasMrpDiscount = product.mrp && product.mrp > product.price

  return (
    <article ref={productRef} className="group glass-card p-5 rounded-xl flex h-full w-full flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#E9E7D0]/50 p-2 border border-[#232E1E]/8">
        <ImageReveal delay={(index % 3) * 0.08} className="h-full w-full">
          <FlavorPlate
            item={product}
            className="transition-transform duration-[700ms] ease-out motion-reduce:transition-none group-hover:scale-105"
          />
        </ImageReveal>
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 text-[0.65rem] font-mono font-bold tracking-widest uppercase bg-[#4E6B3E] text-[#F8F5EB] rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-[#232E1E] group-hover:text-[#4E6B3E] transition-colors">
              {name}
            </h3>
            {product.size && (
              <span className="spec text-[0.65rem] text-[#4E6B3E] block mt-1">{product.size}</span>
            )}
          </div>
          <span className="index-num text-sm text-[#4E6B3E] opacity-70 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="mt-2.5 font-body text-sm leading-relaxed text-[#232E1E]/80">{product.blurb}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6 border-t border-[#232E1E]/10">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-bold text-[#232E1E]">{priceFormatted}</span>
              {hasMrpDiscount && (
                <span className="font-mono text-xs text-[#232E1E]/50 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            {product.discount && (
              <span className="font-mono text-[0.65rem] font-bold text-[#4E6B3E]">
                {product.discount}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 rounded-full bg-[#4E6B3E] text-[#F8F5EB] font-mono text-spec uppercase tracking-widest text-[0.65rem] hover:bg-[#232E1E] transition-all shadow-sm group-hover:shadow-md shrink-0"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
