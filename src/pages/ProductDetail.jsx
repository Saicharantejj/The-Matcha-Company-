import { useState, useMemo, useEffect } from 'react'
import { useParams, NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRODUCTS_CATALOGUE } from '../data/products'
import { photos } from '../data/photos'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { trackViewContent } from '../lib/metaPixel'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { handle } = useParams()
  const { addItem, openCart } = useCart()
  const { addToast } = useToast()

  const [qty, setQty] = useState(1)

  // Find product by handle or id
  const product = useMemo(() => {
    return PRODUCTS_CATALOGUE.find((p) => p.handle === handle || p.id === handle)
  }, [handle])

  useEffect(() => {
    if (product) {
      trackViewContent(product)
    }
  }, [product])

  if (!product) {
    return <NotFound />
  }

  const handleAddToCart = () => {
    addItem(product, qty)
    addToast(`${qty}x ${product.name} added to cart!`, 'success')
  }

  const photoKey = product.id === 'makhana-chilly-cheese' ? 'chillyCheesePack'
    : product.id === 'makhana-pudhina' ? 'pudhinaPack'
    : product.id === 'makhana-barbeque' ? 'barbequePack'
    : product.id === 'makhana-peri-peri' ? 'periPeriPack'
    : product.id === 'makhana-black-pepper' ? 'blackPepperPack'
    : product.id === 'makhana-variety-box' ? 'stashBox'
    : 'yellowBasket'

  const photoObj = photos[photoKey] || photos.brandPoster

  // Related products
  const relatedProducts = PRODUCTS_CATALOGUE.filter((p) => p.id !== product.id).slice(0, 3)

  // Flavor specific taste tags
  const tasteTags = product.id === 'makhana-chilly-cheese'
    ? ['AGED CHEDDAR DUST', 'GREEN CHILI HEAT', 'ROASTED GARLIC', 'SAVORY & CHEEZY']
    : product.id === 'makhana-pudhina'
    ? ['FRESH GARDEN MINT', 'TANGY DRY MANGO', 'KALA NAMAK BURST', 'HERBAL & COOL']
    : product.id === 'makhana-barbeque'
    ? ['HICKORY SMOKE GLAZE', 'SMOKED PAPRIKA', 'SWEET TOMATO TANG', 'BOLD & SMOKY']
    : product.id === 'makhana-peri-peri'
    ? ['FIERY BIRD’S EYE CHILI', 'GARLIC DUST', 'ZINGY LIME TWIST', 'EXTRA CRUNCHY']
    : product.id === 'makhana-black-pepper'
    ? ['HIMALAYAN PINK SALT', 'MALABAR BLACK PEPPER', 'GOLDEN ROASTED', 'LIGHT & PURE']
    : ['ALL-STAR STASH', '5 SIGNATURE FLAVORS', 'PERFECT GIFT', 'MAXIMUM VALUE']

  // Occasions
  const occasions = [
    { title: 'DESK SNACK', desc: 'No greasy fingers on your keyboard while grinding through emails.', icon: '💻' },
    { title: 'MOVIE NIGHT', desc: 'Swap heavy buttery popcorn for light, guilt-free makhana crunch.', icon: '🍿' },
    { title: 'POST-WORKOUT', desc: 'Clean plant-protein & complex carbs to refuel after sweat sessions.', icon: '💪' },
    { title: 'MIDNIGHT CRAVING', desc: 'Satisfy late-night munchies without feeling bloated the next morning.', icon: '🌙' },
  ]

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F8EECB]">
      <div className="mx-auto max-w-[90rem] space-y-16">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#6E433D]/70">
          <NavLink to="/" className="hover:text-[#D23D2D]">HOME</NavLink>
          <span>/</span>
          <NavLink to="/shop" className="hover:text-[#D23D2D]">SHOP</NavLink>
          <span>/</span>
          <span className="text-[#6E433D] font-bold truncate">{product.name}</span>
        </nav>

        {/* ── SECTION 1: PRODUCT HERO ─────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery / Image Box */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-[2.5rem] bg-white border border-[#6E433D]/15 p-8 flex items-center justify-center shadow-xl overflow-hidden">
              {product.badge && (
                <span className="absolute top-6 left-6 z-10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest rounded-full bg-[#D23D2D] text-[#F8EECB] shadow-md">
                  {product.badge}
                </span>
              )}
              {photoObj ? (
                <img
                  src={photoObj.src}
                  alt={product.name}
                  className="h-full w-full object-cover rounded-3xl"
                />
              ) : (
                <div className="font-display text-8xl">🍿</div>
              )}
            </div>
          </div>

          {/* Product Purchase Actions */}
          <div className="lg:col-span-6 space-y-8 p-8 sm:p-10 rounded-[2.5rem] bg-white/90 border border-[#6E433D]/15 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#F8EECB] font-mono text-xs font-bold uppercase text-[#6E433D]">
                  {product.size || '70G PACK'}
                </span>
                {product.spiceLevel && (
                  <span className="px-3 py-1 rounded-full bg-[#FFF0EC] font-mono text-xs font-bold text-[#D23D2D]">
                    {product.spiceLevel}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#6E433D] leading-tight">
                {product.name}
              </h1>

              <p className="font-sans text-base text-[#6E433D]/85 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-4 p-4 rounded-2xl bg-[#FAF6EE] border border-[#6E433D]/10">
              <span className="font-mono text-3xl font-bold text-[#6E433D]">
                {product.displayPrice || `₹${product.price}`}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="font-mono text-sm text-[#6E433D]/60 line-through">
                  ₹{product.mrp}
                </span>
              )}
              {product.discount && (
                <span className="px-2.5 py-1 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold">
                  {product.discount}
                </span>
              )}
              <span className="ml-auto font-mono text-xs text-[#31603D] font-bold">
                ✓ IN STOCK
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold uppercase text-[#6E433D]">QUANTITY:</span>
                <div className="flex items-center border border-[#6E433D]/20 rounded-full bg-white px-3 py-1.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="h-8 w-8 rounded-full flex items-center justify-center font-mono text-lg font-bold text-[#6E433D] hover:bg-[#F8EECB]"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-bold text-[#6E433D]">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="h-8 w-8 rounded-full flex items-center justify-center font-mono text-lg font-bold text-[#6E433D] hover:bg-[#F8EECB]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full btn bg-[#D23D2D] hover:bg-[#6E433D] py-4 text-sm font-bold shadow-lg"
                >
                  ADD TO STASH CART 🛒
                </button>
                <Link
                  to="/build-your-box"
                  className="w-full btn-outline border-[#6E433D]/30 py-4 text-xs font-bold text-center"
                >
                  ADD TO 4-PACK BOX 📦
                </Link>
              </div>
            </div>

            {/* Micro Benefits Banner */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#6E433D]/10 text-center font-mono text-[10px] font-bold uppercase text-[#6E433D]/80">
              <div className="p-2 rounded-xl bg-[#FAF6EE]">🔥 ROASTED NOT FRIED</div>
              <div className="p-2 rounded-xl bg-[#FAF6EE]">⚡ 0% TRANS FAT</div>
              <div className="p-2 rounded-xl bg-[#FAF6EE]">🚚 FREE SHIP &gt; ₹499</div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: WHAT IT TASTES LIKE ─────────────────────────────── */}
        <section className="p-8 sm:p-12 rounded-[2.5rem] bg-[#6E433D] text-[#F8EECB] space-y-8 shadow-xl">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5C065]">
              // SENSORY TASTE PROFILE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              WHAT IT TASTES LIKE
            </h2>
            <p className="font-sans text-lg text-[#F8EECB]/90 max-w-2xl">
              "{product.blurb}"
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {tasteTags.map((tag) => (
              <span key={tag} className="px-5 py-2.5 rounded-full bg-white/10 border border-[#F8EECB]/20 font-mono text-xs font-bold text-[#F5C065]">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: WHAT'S INSIDE (INGREDIENTS & NUTRITION) ───────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#6E433D]/15 space-y-6 shadow-md">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
              CLEAN INGREDIENTS
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#6E433D]">
              WHAT’S INSIDE
            </h3>
            <p className="font-sans text-sm text-[#6E433D]/85 leading-relaxed">
              {product.ingredients}
            </p>
            <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#31603D]/20 text-xs font-mono text-[#31603D] font-bold">
              ✓ NO PALM OIL • NO MSG • NO ARTIFICIAL COLOURS OR FLAVOURS
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#6E433D]/15 space-y-6 shadow-md">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#31603D]">
              MACRO BREAKDOWN
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#6E433D]">
              NUTRITION FACTS
            </h3>
            
            {product.nutrition && (
              <div className="divide-y divide-[#6E433D]/10 font-mono text-xs text-[#6E433D]">
                <div className="py-2.5 flex justify-between"><span>CALORIES</span><span className="font-bold">{product.nutrition.calories}</span></div>
                <div className="py-2.5 flex justify-between"><span>PLANT PROTEIN</span><span className="font-bold text-[#31603D]">{product.nutrition.protein}</span></div>
                <div className="py-2.5 flex justify-between"><span>DIETARY FIBER</span><span className="font-bold">{product.nutrition.fiber}</span></div>
                <div className="py-2.5 flex justify-between"><span>COMPLEX CARBS</span><span className="font-bold">{product.nutrition.carbs}</span></div>
                <div className="py-2.5 flex justify-between"><span>GOOD FATS</span><span className="font-bold">{product.nutrition.fat}</span></div>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 4: HOW TO ENJOY IT ─────────────────────────────────── */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
              SNACKING OCCASIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#6E433D]">
              HOW TO ENJOY IT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occ) => (
              <div key={occ.title} className="p-6 rounded-3xl bg-white border border-[#6E433D]/15 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl">{occ.icon}</span>
                <h3 className="font-display text-lg font-bold uppercase text-[#6E433D]">{occ.title}</h3>
                <p className="font-sans text-xs text-[#6E433D]/80 leading-relaxed">{occ.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: RELATED PRODUCTS ────────────────────────────────── */}
        <section className="space-y-8 pt-8 border-t border-[#6E433D]/15">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
                IF YOU LIKE THIS, TRY...
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#6E433D]">
                EXPLORE OTHER FLAVORS
              </h2>
            </div>
            <NavLink to="/shop" className="font-mono text-xs font-bold uppercase text-[#D23D2D] hover:underline">
              VIEW ALL FLAVORS &rarr;
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* ── SECTION 6: BUILD YOUR BOX CTA BANNER ───────────────────────── */}
        <section className="p-8 sm:p-12 rounded-[2.5rem] bg-[#31603D] text-[#F8EECB] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#F8EECB] text-[#31603D] font-mono text-xs font-bold uppercase">
              10% BUNDLE SAVINGS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              BUILD YOUR CUSTOM 4-PACK STASH
            </h2>
            <p className="font-mono text-xs text-[#F8EECB]/80 leading-relaxed">
              Mix and match your favorite roasted makhana flavors into a custom stash box and save 10% automatically!
            </p>
          </div>
          <NavLink to="/build-your-box" className="btn bg-[#D23D2D] text-[#F8EECB] hover:bg-[#6E433D] px-8 py-4 text-xs font-bold shrink-0">
            BUILD YOUR BOX NOW &rarr;
          </NavLink>
        </section>

      </div>
    </main>
  )
}
