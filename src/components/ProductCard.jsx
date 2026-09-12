import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

export default function ProductCard({ product, index = 0 }) {
  const { addItem, openCart } = useCart()
  const { addToast } = useToast()
  const navigate = useNavigate()

  if (!product) return null

  const name = product.title || product.name || product.flavor || 'CHASKA Makhana'
  const handle = product.handle || product.id
  const productUrl = `/product/${handle}`

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    addToast(`${name} added to stash!`, 'success')
  }

  const priceFormatted = product.displayPrice || (typeof product.price === 'number' ? `₹${Math.round(product.price)}` : `₹${product.price || 199}`)
  const mrpFormatted = product.mrp && product.mrp > product.price ? (product.displayMrp || `₹${Math.round(product.mrp)}`) : null

  const photoKey = product.id?.includes('cheese') || handle?.includes('cheese') ? 'chillyCheesePack'
    : product.id?.includes('pudhina') || handle?.includes('pudhina') ? 'pudhinaPack'
    : product.id?.includes('barbeque') || handle?.includes('barbeque') ? 'barbequePack'
    : product.id?.includes('peri-peri') || handle?.includes('peri-peri') ? 'periPeriPack'
    : product.id?.includes('black-pepper') || handle?.includes('black-pepper') ? 'blackPepperPack'
    : product.id?.includes('box') || handle?.includes('box') ? 'stashBox'
    : 'yellowBasket'

  const photoObj = photos[photoKey] || photos.brandPoster
  const displayImage = product.image || (product.images && product.images[0]?.url) || photoObj?.src

  // Playful flavor descriptors
  const playfulTag = handle?.includes('cheese') ? 'Cheezy. Teekha. Dil se.'
    : handle?.includes('pudhina') ? 'Thanda mint. Kadak chaska.'
    : handle?.includes('barbeque') ? 'Smoky. Hot. Non-stop crunch.'
    : handle?.includes('peri-peri') ? 'Teekha hai. Par rukoge nahi.'
    : handle?.includes('black-pepper') ? 'Pure rock salt. Malabar pepper.'
    : handle?.includes('box') ? '5 Flavours. Pure chaska.'
    : 'Mega stash. Party sorted.'

  // Accent badge colors (Master brand system: Blue & Red)
  const isSpicy = handle?.includes('peri-peri') || handle?.includes('barbeque') || handle?.includes('chilly') || handle?.includes('cheese')
  const badgeBg = isSpicy ? '#A9223A' : '#17245B'
  const badgeText = '#F5EEDD'
  const isAvailable = product.availableForSale !== false

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col h-full w-full rounded-3xl bg-white border-2 border-[#17245B]/10 shadow-sm hover:shadow-xl hover:border-[#A9223A]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col h-full p-6">
        
        {/* Product Image Container (Clickable) */}
        <Link to={productUrl} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#FAF6ED] p-4 flex items-center justify-center group-hover:bg-[#F5EEDD] transition-colors border border-[#17245B]/5">
          {product.badge && (
            <span
              className="absolute top-3 left-3 z-10 px-3 py-1 font-mono text-[9px] font-extrabold tracking-widest uppercase rounded-full shadow-md flex items-center gap-1"
              style={{ backgroundColor: badgeBg, color: badgeText }}
            >
              {isSpicy ? '🔥 ' : '⚡ '}{product.badge}
            </span>
          )}

          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display text-4xl text-[#17245B]">
              🍿
            </div>
          )}
        </Link>

        {/* Details */}
        <div className="mt-5 flex flex-1 flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70">
                {product.size || '70G PACK'}
              </span>
              {product.spiceLevel && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-extrabold text-[#A9223A]">
                  <span>🌶️</span> {product.spiceLevel}
                </span>
              )}
            </div>

            <Link to={productUrl} className="block group/title">
              <h3 className="font-display text-xl font-bold text-[#17245B] group-hover/title:text-[#A9223A] transition-colors leading-snug">
                {name}
              </h3>
            </Link>

            <p className="mt-1.5 font-hindi text-xs font-bold text-[#A9223A] italic">
              "{playfulTag}"
            </p>

            <p className="mt-2 font-sans text-xs leading-relaxed text-[#17245B]/80 line-clamp-2">
              {product.description || product.blurb || 'Handpicked lotus seeds roasted with authentic spices.'}
            </p>
          </div>

          {/* Footer Price & Buttons */}
          <div className="pt-4 border-t border-[#17245B]/10 space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-black text-[#17245B]">{priceFormatted}</span>
                {mrpFormatted && (
                  <span className="font-mono text-xs text-[#A9223A]/70 line-through">
                    {mrpFormatted}
                  </span>
                )}
              </div>
              {product.crunchRating && (
                <span className="font-mono text-[10px] font-bold text-[#17245B]">
                  CRUNCH {product.crunchRating}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!isAvailable}
                className="w-full py-2.5 rounded-full bg-[#17245B] text-white font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-[#A9223A] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAvailable ? '+ ADD' : 'SOLD OUT'}
              </button>
              <Link
                to={productUrl}
                className="w-full py-2.5 rounded-full bg-white border border-[#17245B]/25 text-[#17245B] font-mono text-[11px] font-bold uppercase tracking-wider text-center hover:bg-[#17245B] hover:text-white transition-colors"
              >
                VIEW
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.article>
  )
}
