import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

export default function ProductCard({ product, index = 0 }) {
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const name = product.name || product.flavor

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 'Makhana Pack')
    notify(`${name} added to cart`, { action: 'View Cart', onAction: openCart })
  }

  const priceFormatted = product.displayPrice || `₹${product.price}`

  const photoKey = product.id === 'makhana-pink-salt' ? 'pinkSaltPack'
    : product.id === 'makhana-peri-peri' ? 'periPeriPack'
    : product.id === 'makhana-pudina-lime' ? 'pudinaPack'
    : product.id === 'makhana-smoky-cheese' ? 'cheddarPack'
    : product.id === 'makhana-jaggery-sesame' ? 'jaggeryPack'
    : 'stashBox'

  const photoObj = photos[photoKey]

  // Accent badge colors
  const badgeBg = product.swatch === 'chili' ? '#D23D2D' : product.swatch === 'pudina' ? '#31603D' : '#F5C065'
  const badgeText = product.swatch === 'cheddar' || product.swatch === 'butter' ? '#6E433D' : '#F8EECB'

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative flex flex-col h-full w-full rounded-2xl bg-white border border-[#6E433D]/15 shadow-card hover:shadow-pop transition-all duration-300 overflow-hidden"
    >
      <Link to={`/product/${product.handle || product.id}`} className="flex flex-col h-full p-5">
        
        {/* Product Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#FBF4DC] p-3 flex items-center justify-center">
          {product.badge && (
            <span
              className="absolute top-3 left-3 z-10 px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest uppercase rounded-full shadow-sm"
              style={{ backgroundColor: badgeBg, color: badgeText }}
            >
              {product.badge}
            </span>
          )}

          {photoObj ? (
            <img
              src={photoObj.src}
              alt={product.name}
              className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display text-4xl text-[#6E433D]">
              🍿
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-5 flex flex-1 flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8A5D57]">
                {product.size || '70G PACK'}
              </span>
              {product.spiceLevel && (
                <span className="font-mono text-[10px] font-bold text-[#D23D2D]">
                  {product.spiceLevel}
                </span>
              )}
            </div>

            <h3 className="font-display text-lg font-bold text-[#6E433D] group-hover:text-[#D23D2D] transition-colors leading-snug">
              {name}
            </h3>

            <p className="mt-1.5 font-body text-xs leading-relaxed text-[#6E433D]/80 line-clamp-2">
              {product.blurb}
            </p>
          </div>

          {/* Footer Price & Add Button */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#6E433D]/10">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-bold text-[#6E433D]">{priceFormatted}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="font-mono text-xs text-[#8A5D57] line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-[#6E433D] transition-colors shadow-sm shrink-0"
            >
              + ADD
            </button>
          </div>
        </div>

      </Link>
    </motion.article>
  )
}
