import { useState, useMemo, useEffect } from 'react'
import { useParams, NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'
import { PRODUCTS_CATALOGUE } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { trackViewContent } from '../lib/metaPixel'
import { fetchShopifyProductByHandle, fetchShopifyProducts } from '../lib/shopify/api'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { handle } = useParams()
  const { addItem, openCart } = useCart()
  const { addToast } = useToast()

  const [qty, setQty] = useState(1)
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true)
      setError(null)
      setSelectedImgIndex(0)
      try {
        let foundProduct = null
        try {
          foundProduct = await fetchShopifyProductByHandle(handle)
        } catch (shopifyErr) {
          console.warn('[Shopify API Unavailable, using local catalog fallback]', shopifyErr.message)
        }

        // If Shopify didn't return the product, match from local PRODUCTS_CATALOGUE
        if (!foundProduct) {
          foundProduct = PRODUCTS_CATALOGUE.find(
            (p) => p.handle === handle || p.id === handle || p.id === `makhana-${handle}` || handle?.includes(p.flavor?.toLowerCase().replace(/\s+/g, '-'))
          )
        }

        if (foundProduct) {
          setProduct(foundProduct)
          // Load related products
          let related = []
          try {
            const allShopify = await fetchShopifyProducts(6)
            if (allShopify && allShopify.length > 0) {
              related = allShopify.filter((p) => p.handle !== handle).slice(0, 3)
            }
          } catch (e) {
            // fallback
          }
          if (related.length === 0) {
            related = PRODUCTS_CATALOGUE.filter((p) => p.handle !== handle && p.id !== foundProduct.id).slice(0, 3)
          }
          setRelatedProducts(related)
        } else {
          setProduct(null)
        }
      } catch (err) {
        console.error('[Product Fetch Error]', err)
        setError(err.message || 'Product not found')
      } finally {
        setIsLoading(false)
      }
    }

    if (handle) {
      loadProduct()
    }
  }, [handle])

  // Fire Meta Pixel ViewContent when product loads
  useEffect(() => {
    if (product) {
      trackViewContent(product)
    }
  }, [product])

  if (isLoading) {
    return (
      <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F5EEDD] flex items-center justify-center">
        <div className="mx-auto max-w-4xl w-full p-8 rounded-3xl bg-white/60 border border-[#17245B]/10 animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square rounded-2xl bg-[#17245B]/10" />
            <div className="space-y-4">
              <div className="h-4 w-1/4 rounded bg-[#17245B]/15" />
              <div className="h-8 w-3/4 rounded bg-[#17245B]/20" />
              <div className="h-4 w-1/3 rounded bg-[#17245B]/15" />
              <div className="h-24 w-full rounded bg-[#17245B]/10" />
              <div className="h-12 w-full rounded-full bg-[#17245B]/20" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product || error) {
    return <NotFound />
  }

  const handleAddToCart = () => {
    addItem(product, qty)
    addToast(`${qty}x ${product.name} added to cart!`, 'success')
  }

  const photoKey = product.id?.includes('cheese') ? 'chillyCheesePack'
    : product.id?.includes('pudhina') ? 'pudhinaPack'
    : product.id?.includes('barbeque') ? 'barbequePack'
    : product.id?.includes('peri-peri') ? 'periPeriPack'
    : product.id?.includes('black-pepper') ? 'blackPepperPack'
    : 'stashBox'

  const photoObj = photos[photoKey] || photos.masalaPouchHero
  
  // Build a comprehensive images list from product data or full campaign gallery
  const galleryImages = (product.images && product.images.length > 0)
    ? product.images.map((img) => ({ url: typeof img === 'string' ? img : (img.url || img.src), altText: img.altText || product.name }))
    : [
        { url: product.image || photoObj.src, altText: product.name },
        { url: photos.tabletopLifestyle.src, altText: 'CHASKA Tabletop Feast' },
        { url: photos.meshBagIngredients.src, altText: 'Fresh Ingredients & Spices' },
        { url: photos.newspaperComingSoon.src, altText: 'CHASKA Gazette Edition' },
      ]

  const activeImage = galleryImages[selectedImgIndex]?.url || galleryImages[0]?.url || photoObj.src

  // Flavor specific taste tags
  const tasteTags = product.id?.includes('cheese')
    ? ['AGED CHEDDAR DUST', 'GREEN CHILI HEAT', 'ROASTED GARLIC', 'SAVORY & CHEEZY']
    : product.id?.includes('pudhina')
    ? ['FRESH GARDEN MINT', 'TANGY DRY MANGO', 'KALA NAMAK BURST', 'HERBAL & COOL']
    : product.id?.includes('barbeque')
    ? ['HICKORY SMOKE GLAZE', 'SMOKED PAPRIKA', 'SWEET TOMATO TANG', 'BOLD & SMOKY']
    : product.id?.includes('peri-peri')
    ? ['FIERY BIRD’S EYE CHILI', 'GARLIC DUST', 'ZINGY LIME TWIST', 'EXTRA CRUNCHY']
    : product.id?.includes('black-pepper')
    ? ['HIMALAYAN PINK SALT', 'MALABAR BLACK PEPPER', 'GOLDEN ROASTED', 'LIGHT & PURE']
    : ['ALL-STAR STASH', 'SIGNATURE FLAVOR', 'PERFECT GIFT', 'MAXIMUM VALUE']

  // Occasions
  const occasions = [
    { title: 'DESK SNACK', desc: 'No greasy fingers on your keyboard while grinding through emails.', icon: '💻' },
    { title: 'MOVIE NIGHT', desc: 'Swap heavy buttery popcorn for light, guilt-free makhana crunch.', icon: '🍿' },
    { title: 'POST-WORKOUT', desc: 'Clean plant-protein & complex carbs to refuel after sweat sessions.', icon: '💪' },
    { title: 'MIDNIGHT CRAVING', desc: 'Satisfy late-night munchies without feeling bloated the next morning.', icon: '🌙' },
  ]

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F5EEDD]">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 font-mono text-xs text-[#17245B]/70 font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#E2AE35] transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#E2AE35] transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-[#E2AE35] line-clamp-1">{product.name}</span>
        </nav>

        {/* ── MAIN PRODUCT HERO (EDITORIAL SPLIT) ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
            {/* Left Column: Product Gallery / Image Stage */}
            <div className="lg:col-span-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                key={activeImage}
                transition={{ duration: 0.3 }}
                className="relative aspect-square w-full rounded-[2.5rem] bg-white border border-[#17245B]/15 shadow-xl p-8 flex items-center justify-center overflow-hidden"
              >
                {product.badge && (
                  <span className="absolute top-6 left-6 z-10 px-4 py-1.5 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold uppercase tracking-widest shadow-md">
                    {product.badge}
                  </span>
                )}

                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="h-full w-full object-contain rounded-2xl"
                  />
                ) : (
                  <span className="font-display text-8xl text-[#17245B]">🍿</span>
                )}
              </motion.div>

              {/* Interactive Thumbnail selector */}
              {galleryImages && galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImgIndex(i)}
                      className={`h-20 w-20 shrink-0 rounded-2xl bg-white border-2 p-1.5 overflow-hidden shadow-sm transition-all duration-200 ${
                        selectedImgIndex === i
                          ? 'border-[#E2AE35] scale-105 shadow-md ring-2 ring-[#E2AE35]/30'
                          : 'border-[#17245B]/15 opacity-70 hover:opacity-100 hover:border-[#17245B]/30'
                      }`}
                    >
                      <img src={img.url} alt={img.altText || product.name} className="h-full w-full object-cover rounded-xl" />
                    </button>
                  ))}
                </div>
              )}
            </div>

          {/* Right Column: Information, Specs & Add-to-Cart */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#17245B]/10 text-[#17245B] font-mono text-[10px] font-bold uppercase tracking-wider">
                  {product.size || '70G PACK'}
                </span>
                {product.spiceLevel && (
                  <span className="px-3 py-1 rounded-full bg-[#FAF6ED] text-[#A9223A] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {product.spiceLevel}
                  </span>
                )}
                {product.availableForSale === false && (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    SOLD OUT
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-4 pt-2">
                <span className="font-display text-3xl sm:text-4xl font-black text-[#17245B]">
                  {product.displayPrice}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <>
                    <span className="font-mono text-lg text-[#17245B]/60 line-through">
                      ₹{product.mrp}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#A9223A] bg-[#FFF0F2] px-2.5 py-1 rounded-full">
                      SAVE {product.discount}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="p-6 rounded-2xl bg-white border border-[#17245B]/12 space-y-3 shadow-sm">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#17245B]/70">
                FLAVOUR PROFILE
              </h3>
              <p className="font-sans text-sm text-[#17245B]/90 leading-relaxed font-medium">
                {product.description || product.blurb}
              </p>
            </div>

            {/* Taste Tags */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70">
                TASTE NOTES &amp; TEXTURE
              </span>
              <div className="flex flex-wrap gap-2">
                {tasteTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF6ED] border border-[#17245B]/15 font-mono text-[10px] font-bold text-[#17245B] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart Button */}
            <div className="space-y-4 pt-4 border-t border-[#17245B]/15">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#17245B]/20 rounded-full bg-white px-3 py-2 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="h-8 w-8 font-mono text-base font-bold text-[#17245B] hover:bg-[#E2AE35] hover:text-[#17245B] rounded-full transition-colors flex items-center justify-center disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="min-w-[2.5rem] text-center font-mono text-sm font-bold text-[#17245B]">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="h-8 w-8 font-mono text-base font-bold text-[#17245B] hover:bg-[#E2AE35] hover:text-[#17245B] rounded-full transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.availableForSale === false}
                  className="flex-1 btn bg-[#E2AE35] hover:bg-[#17245B] hover:text-[#F5EEDD] text-[#17245B] py-4 text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.availableForSale === false ? 'SOLD OUT' : `ADD TO STASH • ₹${(product.price * qty).toFixed(0)}`}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#17245B]/80 pt-2 px-2">
                <span>⚡ Ships within 24 Hours</span>
                <span>🍃 100% Roasted Lotus Seeds</span>
                <span>🇮🇳 Made in India</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── 2. NUTRITIONAL FACTS & INGREDIENTS ─────────────────────────────── */}
        <section className="p-8 sm:p-12 rounded-[2.5rem] bg-white border border-[#17245B]/15 shadow-xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
              CLEAN SNACKING SPECS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#17245B]">
              WHAT'S INSIDE THE PACK
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-[#17245B] uppercase">
                INGREDIENTS
              </h3>
              <p className="font-sans text-sm text-[#17245B]/90 leading-relaxed font-medium bg-[#FAF6ED] p-5 rounded-2xl border border-[#17245B]/10">
                {product.ingredients || 'Jumbo Foxnuts (Makhana), Olive Oil, Natural Spices, Sea Salt.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-[10px] font-bold">✓ GLUTEN FREE</span>
                <span className="px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-[10px] font-bold">✓ ZERO TRANS FAT</span>
                <span className="px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-[10px] font-bold">✓ NOT FRIED</span>
                <span className="px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-[10px] font-bold">✓ PLANT PROTEIN</span>
              </div>
            </div>

            {/* Nutrition Grid */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-[#17245B] uppercase">
                NUTRITIONAL VALUE (PER 70G PACK)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(product.nutrition || { calories: '132 kcal', protein: '4.2g', carbs: '21g', fat: '3.5g', fiber: '3.6g' }).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#17245B]/10 text-center">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#17245B]/60 block mb-1">
                      {key}
                    </span>
                    <span className="font-display text-base font-bold text-[#17245B]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. PERFECT OCCASIONS ─────────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
              SNACK ANYWHERE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#17245B]">
              PERFECT CRUNCH OCCASIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occ, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#17245B]/15 shadow-sm space-y-3 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block">{occ.icon}</span>
                <h3 className="font-display text-base font-bold uppercase text-[#17245B]">
                  {occ.title}
                </h3>
                <p className="font-sans text-xs text-[#17245B]/80 leading-relaxed font-medium">
                  {occ.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. RELATED PRODUCTS ──────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="space-y-8 pt-8 border-t border-[#17245B]/15">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                  MORE FLAVOURS
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#17245B]">
                  YOU MIGHT ALSO CRAVE
                </h2>
              </div>
              <Link to="/shop" className="font-mono text-xs font-bold uppercase text-[#17245B] hover:text-[#E2AE35] transition-colors">
                VIEW ALL ➔
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id || p.handle} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}

