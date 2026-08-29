import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SachetGraphic from './SachetGraphic'
import Tilt from './Tilt'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

export default function ProductCard({ product, index = 0 }) {
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleAdd = () => {
    addItem(product, 'sachet')
    notify(`${product.flavor} added`, { action: 'View cart', onAction: openCart })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Tilt className="h-full">
        {/* is-tilting hands the transform to Framer so the CSS hover-lift
            doesn't fight the tilt; only the shadow still animates in CSS. */}
        <div className="card-hard is-tilting group flex h-full flex-col overflow-hidden">
          <div className="aspect-[4/3] w-full border-b-2 border-ink">
            <SachetGraphic
              swatch={product.swatch}
              badge={product.badge}
              size={product.size}
              flavor={product.flavor}
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-base tracking-display">{product.name}</h3>

            {product.blurb && (
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{product.blurb}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags?.map((tag) => (
                <span key={tag} className="tag-outline">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <button
                type="button"
                onClick={handleAdd}
                className="btn-hard w-full border-ink bg-olive text-cream"
              >
                <Plus size={14} strokeWidth={3} aria-hidden="true" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}
