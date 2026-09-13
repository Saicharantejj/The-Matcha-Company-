import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { photos } from '../data/photos'
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
  const [selectedSize, setSelectedSize] = useState('50g')
  const [selectedPack, setSelectedPack] = useState('Pack of 3')
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)

  // 1. Data Fetching
  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true)
      setError(null)
      setSelectedImgIndex(0)
      setQty(1)
      try {
        const foundProduct = await fetchShopifyProductByHandle(handle)

        if (foundProduct) {
          setProduct(foundProduct)
          // Load related products from Shopify
          try {
            const allShopify = await fetchShopifyProducts(8)
            if (allShopify && allShopify.length > 0) {
              setRelatedProducts(allShopify.filter((p) => p.handle !== handle).slice(0, 3))
            } else {
              setRelatedProducts([])
            }
          } catch {
            setRelatedProducts([])
          }
        } else {
          setProduct(null)
        }
      } catch (err) {
        console.error('[Shopify Product Fetch Error]', err)
        setError(err.message || 'Product not found on Shopify')
        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (handle) {
      loadProduct()
    }
  }, [handle])

  // 2. Meta Pixel ViewContent Tracking
  useEffect(() => {
    if (product) {
      trackViewContent(product)
    }
  }, [product])

  // 3. Scroll listener for mobile sticky add-to-cart bar
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 400px
      setShowStickyBar(window.scrollY > 420)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTryAll5 = product?.handle === 'chaska-try-all-5'

  // 4. Exact Shopify Variant Resolution
  const activeVariant = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return null

    if (isTryAll5) {
      const match = product.variants.find((v) => {
        const sizeOpt = v.selectedOptions?.find((o) => o.name?.toLowerCase() === 'size')?.value
        return sizeOpt === selectedSize || v.title?.toLowerCase().includes(selectedSize.toLowerCase())
      })
      return match || product.variants[0]
    }

    const match = product.variants.find((v) => {
      const options = v.selectedOptions || []
      const sizeOpt = options.find((o) => o.name?.toLowerCase() === 'size')?.value
      const packOpt = options.find((o) => o.name?.toLowerCase() === 'pack')?.value
      if (sizeOpt && packOpt) {
        return sizeOpt === selectedSize && packOpt === selectedPack
      }
      return (
        v.title?.toLowerCase().includes(selectedSize.toLowerCase()) &&
        v.title?.toLowerCase().includes(selectedPack.toLowerCase())
      )
    })
    return match || product.variants[0]
  }, [product, isTryAll5, selectedSize, selectedPack])

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#F5EEDD] flex items-center justify-center">
        <div className="mx-auto max-w-5xl w-full p-8 rounded-3xl bg-[#FAF6ED] border border-[#17245B]/15 animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square rounded-2xl bg-[#F5EEDD]" />
            <div className="space-y-4">
              <div className="h-4 w-1/4 rounded bg-[#17245B]/10" />
              <div className="h-8 w-3/4 rounded bg-[#17245B]/15" />
              <div className="h-4 w-1/3 rounded bg-[#17245B]/10" />
              <div className="h-24 w-full rounded bg-[#17245B]/5" />
              <div className="h-12 w-full rounded-full bg-[#17245B]/15" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product || error) {
    return <NotFound />
  }

  const isVariantAvailable = activeVariant ? Boolean(activeVariant.availableForSale) : Boolean(product?.availableForSale)

  const currentPrice = activeVariant ? activeVariant.price : (product?.price || 450)
  const currentMrp = (activeVariant?.mrp && activeVariant.mrp > currentPrice)
    ? activeVariant.mrp
    : (product?.mrp && product.mrp > currentPrice ? product.mrp : currentPrice)
  const currentDiscount = currentMrp > currentPrice ? `${Math.round(((currentMrp - currentPrice) / currentMrp) * 100)}% OFF` : null

  const handleAddToCart = async () => {
    if (!product || isAdding) return
    const packLabel = isTryAll5 ? `${selectedSize}` : `${selectedSize} • ${selectedPack}`
    const itemTitle = isTryAll5
      ? `${product.name} (${selectedSize})`
      : `${product.name} (${selectedSize}, ${selectedPack})`

    if (!isVariantAvailable) {
      addToast(`${itemTitle} is currently sold out.`, 'error')
      return
    }

    setIsAdding(true)
    try {
      const selectedVariantId = activeVariant?.id || product.variantId || product.id

      const itemToAdd = {
        ...product,
        id: selectedVariantId,
        variantId: selectedVariantId,
        availableForSale: isVariantAvailable,
        price: currentPrice,
        mrp: currentMrp,
        packSize: packLabel,
        size: packLabel,
        name: itemTitle,
        flavor: product.name,
        handle: product.handle,
        image: activeImage,
      }
      await addItem(itemToAdd, qty)
      setIsAdded(true)
      addToast(`${qty}x ${itemTitle} added to stash! 🍿`, 'success')
      setTimeout(() => {
        setIsAdded(false)
        setIsAdding(false)
      }, 1400)
    } catch {
      setIsAdding(false)
      addToast('Could not add to cart. Please try again.', 'error')
    }
  }

  const handleLower = (product.handle || '').toLowerCase()
  const photoKey = handleLower.includes('cheese') ? 'chillyCheesePack'
    : handleLower.includes('pudhina') ? 'pudhinaPack'
    : handleLower.includes('lime') ? 'yellowBasket'
    : handleLower.includes('garlic') ? 'meshBagIngredients'
    : handleLower.includes('peri-peri') ? 'periPeriPack'
    : handleLower.includes('try-all-5') || handleLower.includes('box') ? 'stashBox'
    : 'masalaPouchHero'

  const photoObj = photos[photoKey] || photos.masalaPouchHero
  
  // Gallery
  const galleryImages = (product.images && product.images.length > 0)
    ? product.images.map((img) => ({ url: typeof img === 'string' ? img : (img.url || img.src), altText: img.altText || product.name }))
    : [
        { url: product.image || photoObj.src, altText: product.name },
        { url: photos.tabletopLifestyle.src, altText: 'CHASKA Tabletop Feast' },
        { url: photos.meshBagIngredients.src, altText: 'Fresh Ingredients & Spices' },
        { url: photos.newspaperComingSoon.src, altText: 'CHASKA Gazette Edition' },
      ]

  const activeImage = galleryImages[selectedImgIndex]?.url || galleryImages[0]?.url || photoObj.src

  // Taste tags
  const tasteTags = handleLower.includes('cheese')
    ? ['AGED CHEDDAR DUST', 'GREEN CHILI HEAT', 'ROASTED GARLIC', 'SAVORY & CHEEZY']
    : handleLower.includes('pudhina')
    ? ['FRESH GARDEN MINT', 'TANGY DRY MANGO', 'KALA NAMAK BURST', 'HERBAL & COOL']
    : handleLower.includes('lime')
    ? ['CRISP KEY LIME ZEST', 'FIERY GREEN CHILLI', 'HIMALAYAN ROCK SALT', 'ZESTY & TANGY']
    : handleLower.includes('garlic')
    ? ['KASHMIRI RED CHILLI', 'TOASTED GOLDEN GARLIC', 'SMOKED PAPRIKA', 'BOLD & AROMATIC']
    : handleLower.includes('peri-peri')
    ? ['FIERY BIRD’S EYE CHILI', 'GARLIC DUST', 'ZINGY LIME TWIST', 'EXTRA CRUNCHY']
    : handleLower.includes('try-all-5')
    ? ['5 SIGNATURE FLAVOURS', 'PERI PERI + CHILLI CHEESE', 'CHILLI LIME + PUDHINA', 'KASHMIRI GARLIC CHILLI']
    : ['ALL-STAR STASH', 'SIGNATURE FLAVOR', 'PERFECT GIFT', 'MAXIMUM VALUE']

  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#F5EEDD]">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 font-mono text-xs text-[#17245B]/70 font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#E2AE35] transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#E2AE35] transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-[#17245B] font-extrabold line-clamp-1">{product.name}</span>
        </nav>

        {/* ── MAIN PRODUCT HERO (EDITORIAL SPLIT) ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Product Gallery / Image Stage */}
          <div className="lg:col-span-6 space-y-3.5">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              key={activeImage}
              transition={{ duration: 0.3 }}
              className="relative aspect-square w-full rounded-[2.5rem] bg-[#FAF6ED] border border-[#17245B]/15 shadow-sm p-6 sm:p-8 flex items-center justify-center overflow-hidden"
            >
              {/* Badge */}
              <div className="absolute top-5 left-5 z-10">
                {!isVariantAvailable ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#A9223A] text-white font-mono text-xs font-extrabold uppercase tracking-wider shadow-xs">
                    SOLD OUT
                  </span>
                ) : isTryAll5 ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#17245B] text-[#E2AE35] font-mono text-xs font-extrabold uppercase tracking-wider shadow-xs border border-[#E2AE35]/40">
                    ⭐ ALL 5 FLAVOURS
                  </span>
                ) : currentDiscount ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#17245B] text-[#E2AE35] font-mono text-xs font-extrabold uppercase tracking-wider shadow-xs border border-[#E2AE35]/40">
                    SAVE {currentDiscount}
                  </span>
                ) : null}
              </div>

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

            {/* Interactive Thumbnail Selector */}
            {galleryImages && galleryImages.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImgIndex(i)}
                    aria-label={`View photo ${i + 1}`}
                    className={`h-18 w-18 shrink-0 rounded-2xl bg-[#FAF6ED] border-2 p-1 overflow-hidden transition-all duration-200 ${
                      selectedImgIndex === i
                        ? 'border-[#17245B] scale-105 shadow-xs ring-2 ring-[#E2AE35]'
                        : 'border-[#17245B]/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.altText || product.name} className="h-full w-full object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Specs & Add-to-Cart */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Header & Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#17245B]/10 text-[#17245B] font-mono text-[10px] font-bold uppercase tracking-wider">
                  {isTryAll5 ? `${selectedSize} SAMPLER BOX` : `${selectedSize} • ${selectedPack}`}
                </span>
                {!isVariantAvailable ? (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    SOLD OUT
                  </span>
                ) : product.spiceLevel && !isTryAll5 ? (
                  <span className="px-3 py-1 rounded-full bg-[#FAF6ED] text-[#17245B] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#17245B]/20">
                    {product.spiceLevel}
                  </span>
                ) : null}
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3.5 pt-1">
                <span className="font-display text-3xl sm:text-4xl font-black text-[#17245B]">
                  ₹{Math.round(currentPrice)}
                </span>
                {currentMrp && currentMrp > currentPrice && (
                  <>
                    <span className="font-mono text-lg text-[#17245B]/50 line-through">
                      ₹{Math.round(currentMrp)}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-[#17245B] bg-[#E2AE35]/30 px-2.5 py-0.5 rounded-full border border-[#E2AE35]">
                      SAVE {currentDiscount}
                    </span>
                  </>
                )}
              </div>

              {/* Selectors */}
              <div className="space-y-4 pt-3">
                {/* 1. Size Options (50g, 100g) */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70 flex items-center justify-between">
                    <span>{isTryAll5 ? 'SELECT BOX SIZE:' : '1. SELECT POUCH SIZE:'}</span>
                    <span className="text-[#17245B] font-extrabold">{selectedSize} {isTryAll5 ? 'BOX' : 'POUCH'}</span>
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {['50g', '100g'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`py-3 px-4 rounded-2xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all border-2 text-center flex items-center justify-center gap-2 ${
                          selectedSize === sz
                            ? 'border-[#17245B] bg-[#17245B] text-[#F5EEDD] shadow-xs'
                            : 'border-[#17245B]/20 bg-[#FAF6ED] text-[#17245B] hover:border-[#17245B]/60'
                        }`}
                      >
                        <span>{sz} {isTryAll5 ? 'BOX' : 'POUCH'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Pack Options (Only for single flavour products) */}
                {!isTryAll5 && (
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70 flex items-center justify-between">
                      <span>2. SELECT QUANTITY PACK:</span>
                      <span className="text-[#17245B] font-extrabold">{selectedPack}</span>
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { label: 'Pack of 3', tag: 'POPULAR' },
                        { label: 'Pack of 6', tag: 'BEST VALUE' },
                        { label: 'Pack of 10', tag: 'PARTY PACK' },
                      ].map((pk) => (
                        <button
                          key={pk.label}
                          type="button"
                          onClick={() => setSelectedPack(pk.label)}
                          className={`py-3 px-2 rounded-2xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all border-2 text-center flex flex-col items-center justify-center gap-1 ${
                            selectedPack === pk.label
                              ? 'border-[#17245B] bg-[#17245B] text-[#F5EEDD] shadow-xs'
                              : 'border-[#17245B]/20 bg-[#FAF6ED] text-[#17245B] hover:border-[#17245B]/60'
                          }`}
                        >
                          <span className="text-[11px] leading-tight">{pk.label}</span>
                          <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-bold ${
                            selectedPack === pk.label ? 'bg-[#E2AE35] text-[#17245B]' : 'bg-[#17245B]/10 text-[#17245B]/80'
                          }`}>
                            {pk.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF6ED] border border-[#17245B]/15 space-y-2 shadow-2xs">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#17245B]/70">
                FLAVOUR PROFILE
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#17245B]/90 leading-relaxed font-normal">
                {product.description || product.blurb || 'Handpicked Bihar lotus seeds slow-roasted in small batches with authentic spices.'}
              </p>
            </div>

            {/* Taste Notes */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70">
                TASTE NOTES &amp; TEXTURE
              </span>
              <div className="flex flex-wrap gap-2">
                {tasteTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#FAF6ED] border border-[#17245B]/15 font-mono text-[10px] font-bold text-[#17245B] uppercase shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Stash */}
            <div className="space-y-3.5 pt-4 border-t border-[#17245B]/15">
              <div className="flex items-center gap-3.5">
                {/* Stepper */}
                <div className="flex items-center border border-[#17245B]/25 rounded-full bg-[#FAF6ED] px-2 py-1.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                    className="h-8 w-8 font-mono text-base font-bold text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD] rounded-full transition-colors flex items-center justify-center disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="min-w-[2.25rem] text-center font-mono text-sm font-extrabold text-[#17245B]">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="h-8 w-8 font-mono text-base font-bold text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD] rounded-full transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Add to Stash CTA */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!isVariantAvailable || isAdding}
                  className={`flex-1 btn py-4 text-xs font-black uppercase tracking-wider shadow-md transition-all ${
                    !isVariantAvailable
                      ? 'bg-[#17245B]/20 text-[#17245B]/40 cursor-not-allowed border-transparent'
                      : isAdded
                      ? 'bg-emerald-700 border-emerald-700 text-white'
                      : isAdding
                      ? 'bg-[#17245B] text-[#E2AE35] opacity-85'
                      : 'bg-[#17245B] hover:bg-[#17245B]/90 text-[#F5EEDD]'
                  }`}
                >
                  {!isVariantAvailable
                    ? 'SOLD OUT'
                    : isAdded
                    ? 'ADDED TO STASH ✓'
                    : isAdding
                    ? 'ADDING...'
                    : `ADD TO STASH • ₹${(currentPrice * qty).toFixed(0)}`}
                </button>
              </div>

              {!isVariantAvailable && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono font-bold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>This variant is currently sold out. Please select an alternative size or pack.</span>
                </div>
              )}

              {/* Guarantees */}
              <div className="flex items-center justify-between text-xs font-mono text-[#17245B]/75 pt-1 px-1">
                <span>⚡ Dispatches in 24h</span>
                <span>🍿 Slow-Roasted, Not Fried</span>
                <span>🇮🇳 Authentic Bihar Makhana</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── 2. NUTRITIONAL FACTS & INGREDIENTS ─────────────────────────────── */}
        <section className="p-6 sm:p-10 rounded-[2.5rem] bg-[#FAF6ED] border border-[#17245B]/15 shadow-xs space-y-6">
          <div className="space-y-1.5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#17245B]">
              CLEAN SNACKING SPECS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#17245B]">
              WHAT'S INSIDE THE POUCH
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-[#17245B] uppercase">
                INGREDIENTS
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#17245B]/90 leading-relaxed bg-[#F5EEDD] p-4.5 rounded-2xl border border-[#17245B]/10">
                {product.ingredients || 'Jumbo Foxnuts (Makhana), Olive Oil, Natural Spices, Sea Salt.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-[#17245B]/10 text-[#17245B] font-mono text-[10px] font-extrabold">✓ GLUTEN FREE</span>
                <span className="px-3 py-1 rounded-full bg-[#17245B]/10 text-[#17245B] font-mono text-[10px] font-extrabold">✓ ZERO PALM OIL</span>
                <span className="px-3 py-1 rounded-full bg-[#17245B]/10 text-[#17245B] font-mono text-[10px] font-extrabold">✓ NOT FRIED</span>
                <span className="px-3 py-1 rounded-full bg-[#17245B]/10 text-[#17245B] font-mono text-[10px] font-extrabold">✓ PLANT PROTEIN</span>
              </div>
            </div>

            {/* Nutrition Grid */}
            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-[#17245B] uppercase">
                NUTRITIONAL ESTIMATE (PER 50G SERVING)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.entries(product.nutrition || { calories: '132 kcal', protein: '4.2g', carbs: '21g', fat: '3.5g', fiber: '3.6g' }).map(([key, val]) => (
                  <div key={key} className="p-3.5 rounded-xl bg-[#F5EEDD] border border-[#17245B]/10 text-center">
                    <span className="font-mono text-[9px] font-bold uppercase text-[#17245B]/70 block mb-0.5">
                      {key}
                    </span>
                    <span className="font-display text-sm font-bold text-[#17245B]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. RELATED FLAVOURS ───────────────────────────────────────────── */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="space-y-8 pt-4">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#17245B]">
                  EXPLORE MORE
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#17245B]">
                  YOU MIGHT ALSO CRUNCH
                </h2>
              </div>
              <Link to="/shop" className="font-mono text-xs font-bold text-[#17245B] hover:text-[#E2AE35] transition-colors">
                VIEW ALL ➔
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id || p.handle} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── MOBILE STICKY BOTTOM BAR ───────────────────────────────────────── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF6ED]/95 backdrop-blur-md border-t border-[#17245B]/15 p-3 sm:hidden shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-[#17245B] truncate">
                  {product.name}
                </p>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#17245B]/70">
                  <span className="text-[#17245B] font-extrabold">₹{Math.round(currentPrice * qty)}</span>
                  <span>•</span>
                  <span className="truncate">{selectedSize}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isVariantAvailable || isAdding}
                className={`btn py-3 px-5 text-xs font-extrabold uppercase shrink-0 ${
                  !isVariantAvailable
                    ? 'bg-[#17245B]/20 text-[#17245B]/40 cursor-not-allowed border-transparent'
                    : isAdded
                    ? 'bg-emerald-700 text-white'
                    : isAdding
                    ? 'bg-[#17245B] text-[#E2AE35]'
                    : 'bg-[#17245B] text-[#F5EEDD]'
                }`}
              >
                {!isVariantAvailable ? 'SOLD OUT' : isAdded ? 'ADDED ✓' : isAdding ? 'ADDING...' : 'ADD TO STASH'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

