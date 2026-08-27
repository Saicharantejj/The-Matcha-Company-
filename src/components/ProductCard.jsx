import { useState } from 'react'
import { motion } from 'framer-motion'
import SachetGraphic from './SachetGraphic'

export default function ProductCard({ product, onAdd, index = 0 }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    onAdd?.(product)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="card-hard group flex flex-col overflow-hidden"
    >
      <div className="aspect-[4/3] w-full border-b border-chocolate">
        <SachetGraphic swatch={product.swatch} badge={product.badge} size={product.size} flavor={product.flavor} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base tracking-display">{product.name}</h3>

        {product.blurb && (
          <p className="mt-2 font-body text-sm leading-relaxed text-chocolate/70">{product.blurb}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags?.map((tag) => (
            <span key={tag} className="tag-outline">
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="btn-hard mt-5 w-full border-chocolate bg-olive text-cream disabled:opacity-70"
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}
