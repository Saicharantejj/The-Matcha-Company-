import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { photos } from '../data/photos'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { trackViewContent } from '../lib/metaPixel'
import { fetchShopifyProductByHandle, fetchShopifyProducts } from '../lib/shopify/api'
import { OFFICIAL_WEIGHTS, PACK_OPTIONS, getPricing, getTotalWeightGrams } from '../data/pricing'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { handle } = useParams()
  const { addItem } = useCart()
  const { addToast } = useToast()

  const [qty, setQty] = useState(1)
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState('70g')
  const [selectedPack, setSelectedPack] = useState('3 Pack')
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
      setShowStickyBar(window.scrollY > 420)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTryAll5 = product?.handle === 'chaska-try-all-5' || product?.handle === 'chaska-launch-trio'

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
        return (
          sizeOpt.toLowerCase().includes(selectedSize.toLowerCase()) &&
          (packOpt.toLowerCase().includes(selectedPack.toLowerCase()) || packOpt.includes(selectedPack.replace(/\D/g, '')))
        )
      }
      return (
        v.title?.toLowerCase().includes(selectedSize.toLowerCase()) &&
        (v.title?.toLowerCase().includes(selectedPack.toLowerCase()) || v.title?.includes(selectedPack.replace(/\D/g, '')))
      )
    })
    return match || product.variants[0]
  }, [product, isTryAll5, selectedSize, selectedPack])

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#0C122C] flex items-center justify-center">
        <div className="mx-auto max-w-5xl w-full p-8 rounded-3xl bg-[#131D4A] border border-[#243373] animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square rounded-2xl bg-stone-100 dark:bg-[#1C2A6B]" />
            <div className="space-y-4">
              <div className="h-4 w-1/4 rounded bg-stone-100 dark:bg-[#1C2A6B]" />
              <div className="h-8 w-3/4 rounded bg-stone-100 dark:bg-[#1C2A6B]" />
              <div className="h-4 w-1/3 rounded bg-stone-100 dark:bg-[#1C2A6B]" />
              <div className="h-24 w-full rounded bg-stone-100 dark:bg-[#1C2A6B]" />
              <div className="h-12 w-full rounded-full bg-stone-200 dark:bg-[#1C2A6B]" />
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

  // Pricing calculation according to official matrix
  const currentPricing = isTryAll5
    ? {
        price: product?.price || 499,
        mrp: product?.mrp || 599,
        discount: '17% OFF',
        perPack: 166,
        packCount: 3,
        savings: 100,
        badge: '3-IN-1 BOX',
      }
    : getPricing(selectedSize, selectedPack)

  const currentPrice = currentPricing.price
  const currentMrp = currentPricing.mrp
  const currentDiscount = currentPricing.discount
  const netWeightGrams = isTryAll5 ? 210 : getTotalWeightGrams(selectedSize, selectedPack)

  const handleAddToCart = async () => {
    if (!product || isAdding) return
    const packLabel = isTryAll5 ? '3 Packs (210g)' : `${selectedSize} • ${selectedPack}`
    const itemTitle = isTryAll5
      ? `${product.name} (3x 70g Pouches, 210g)`
      : `${product.name} (${selectedSize}, ${selectedPack})`

    if (!isVariantAvailable) {
      addToast(`${itemTitle} is currently sold out.`, 'error')
      return
    }

    setIsAdding(true)
    try {
      const selectedVariantId = activeVariant?.id || product.variantId || product.id
      const uniqueItemId = isTryAll5
        ? `${product.handle || 'chaska-trio'}`
        : `${product.handle || product.id}-${selectedSize}-${selectedPack.replace(/\s+/g, '')}`

      const itemToAdd = {
        ...product,
        id: uniqueItemId,
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


  const isComingSoon = Boolean(product.isComingSoon)

  const handleNotifyMe = () => {
    addToast(`You're on the VIP waitlist for ${product.name}! We'll alert you the second Drop 02 goes live. 🚀`, 'success')
  }

  const handleLower = (product.handle || '').toLowerCase()
  const photoKey = handleLower.includes('chocolate') ? 'chocolateMakhanaPack'
    : handleLower.includes('cheese-and-herbs') || (handleLower.includes('cheese') && !handleLower.includes('chilli-cheese')) ? 'cheeseAndHerbsMakhanaPack'
    : handleLower.includes('jalapeno') ? 'jalapenoMakhanaPack'
    : handleLower.includes('cheese') ? 'cheeseAndHerbsMakhanaPack'
    : handleLower.includes('pudhina') ? 'pudhinaPack'
    : handleLower.includes('lime') ? 'yellowBasket'
    : handleLower.includes('garlic') ? 'meshBagIngredients'
    : handleLower.includes('peri-peri') ? 'periPeriPack'
    : handleLower.includes('try-all-5') || handleLower.includes('trio') || handleLower.includes('box') ? 'tabletopLifestyle'
    : 'chocolateMakhanaPack'

  const photoObj = photos[photoKey] || photos.chocolateMakhanaPack
  
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
  const tasteTags = handleLower.includes('chocolate')
    ? ['DARK COCOA GLAZE', 'CARAMELIZED RAW SUGAR', 'HIMALAYAN SEA SALT', 'SWEET & SALTY INDULGENCE']
    : handleLower.includes('cheese-and-herbs') || handleLower.includes('cheese')
    ? ['AGED SHARP CHEDDAR', 'WILD MOUNTAIN OREGANO', 'RUBBED THYME', 'ROASTED GARLIC BUTTER']
    : handleLower.includes('jalapeno')
    ? ['SUN-DRIED GREEN JALAPENO', 'MEXICAN KEY LIME ZEST', 'SMOKED PAPRIKA', 'FIERY ELECTRIC CRUNCH']
    : handleLower.includes('pudhina')
    ? ['FRESH GARDEN MINT', 'TANGY DRY MANGO', 'KALA NAMAK BURST', 'HERBAL & COOL']
    : handleLower.includes('garlic')
    ? ['KASHMIRI RED CHILLI', 'TOASTED GOLDEN GARLIC', 'SMOKED PAPRIKA', 'BOLD & AROMATIC']
    : handleLower.includes('peri-peri')
    ? ['FIERY BIRD’S EYE CHILI', 'GARLIC DUST', 'ZINGY LIME TWIST', 'EXTRA CRUNCHY']
    : handleLower.includes('try-all-5') || handleLower.includes('trio')
    ? ['3 OFFICIAL LAUNCH FLAVOURS', 'CHOCOLATE MAKHANA (70G)', 'CHEESE & HERBS (70G)', 'JALAPENO MAKHANA (70G)']
    : ['ALL-STAR STASH', 'SIGNATURE FLAVOR', 'PERFECT GIFT', 'MAXIMUM VALUE']

  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#0C122C]">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 font-mono text-xs text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
          <Link to="/" className="hover:text-[#FF5400] transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#FF5400] transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-[#17245B] dark:text-white font-bold line-clamp-1">{product.name}</span>
        </nav>

        {/* ── MAIN PRODUCT HERO (EDITORIAL SPLIT) ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Product Gallery / Image Stage */}
          <div className="lg:col-span-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={activeImage}
              transition={{ duration: 0.3 }}
              className="relative aspect-square w-full rounded-3xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] shadow-sm p-6 sm:p-10 flex items-center justify-center overflow-hidden"
            >
              {/* Badge */}
              <div className="absolute top-5 left-5 z-10">
                {isComingSoon ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-[#FF5400]/40 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
                    🔒 DROP 02 • COMING SOON
                  </span>
                ) : !isVariantAvailable ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
                    SOLD OUT
                  </span>
                ) : isTryAll5 ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
                    ⭐ 3-IN-1 LAUNCH BOX (210G)
                  </span>
                ) : currentDiscount ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
                    {currentDiscount}
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
                    🔥 DROP 01
                  </span>
                )}
              </div>

              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full object-contain rounded-2xl"
                />
              ) : (
                <span className="font-display text-8xl text-[#17245B] dark:text-white">🍿</span>
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
                    className={`h-20 w-20 shrink-0 rounded-2xl bg-white dark:bg-[#131D4A] border-2 p-1 overflow-hidden transition-all duration-200 cursor-pointer hover-pop-subtle hover:scale-105 active:scale-95 ${
                      selectedImgIndex === i
                        ? 'border-[#FF5400] scale-105 shadow-sm ring-2 ring-[#FF5400]/30'
                        : 'border-stone-200/80 dark:border-[#243373] opacity-70 hover:opacity-100 hover:border-stone-400'
                    }`}
                  >
                    <img src={img.url} alt={img.altText || product.name} className="h-full w-full object-cover rounded-xl" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Specs & Add-to-Cart */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header & Badges */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {isComingSoon ? (
                  <span className="px-3 py-1 rounded-full bg-stone-900 border border-[#FF5400]/40 text-[#FF5400] font-mono text-[10px] font-bold uppercase tracking-wider">
                    🧪 DROP 02 • IN THE LAB
                  </span>
                ) : (
                  <>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                      🔥 DROP 01 LAUNCH
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#1C2A6B] text-stone-200 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {isTryAll5 ? '3-PACK SAMPLER BOX (210G)' : `${selectedSize.toUpperCase()} OFFICIAL POUCH`}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      {isTryAll5 ? 'ALL 3 FLAVOURS' : selectedPack === '3 Pack' ? 'PACK OF 3 (DEFAULT)' : selectedPack.toUpperCase()}
                    </span>
                  </>
                )}
                {!isComingSoon && !isVariantAvailable && (
                  <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                    SOLD OUT
                  </span>
                )}
                {product.spiceLevel && !isTryAll5 && (
                  <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-[#1C2A6B] text-stone-700 dark:text-stone-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-stone-200 dark:border-[#243373]">
                    {product.spiceLevel}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] dark:text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Mention Pack of 3 Prominent Banner */}
              {!isComingSoon && !isTryAll5 && (
                <div className={`p-3.5 rounded-2xl border transition-all ${
                  selectedPack === '3 Pack'
                    ? 'bg-[#FF5400]/10 border-[#FF5400]/40 text-[#FF5400]'
                    : 'bg-[#131D4A] border-[#243373] text-stone-300'
                }`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{selectedPack === '3 Pack' ? '⭐' : '🍿'}</span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wide">
                        {selectedPack === '3 Pack'
                          ? `PACK OF 3 (${selectedSize === '70g' ? '3 × 70g = 210g' : '3 × 30g = 90g'})`
                          : `${selectedPack} (${netWeightGrams}g Total Weight)`}
                      </span>
                    </div>
                    {selectedPack === '3 Pack' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FF5400] text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                        DEFAULT • BESTSELLER
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-stone-300 mt-1 font-normal leading-relaxed">
                    {selectedPack === '3 Pack'
                      ? `Default selection is the Pack of 3! Includes 3 sealed ${selectedSize} pouches. Save ₹${currentPricing.savings} vs MRP.`
                      : `Contains ${currentPricing.packCount} sealed ${selectedSize} pouches (${netWeightGrams}g total).`}
                  </p>
                </div>
              )}

              {/* Price & Savings */}
              {isComingSoon ? (
                <div className="pt-1">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#FF5400] uppercase">
                    DROP 02 • COMING SOON
                  </span>
                  <p className="font-sans text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Expected ₹199 (70g Pouch) • Small batch Bihar roastery release
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-baseline gap-3.5 pt-1">
                  <span className="font-display text-3xl sm:text-4xl font-black text-[#17245B] dark:text-white">
                    ₹{Math.round(currentPrice)}
                  </span>
                  {currentMrp && currentMrp > currentPrice && (
                    <>
                      <span className="font-mono text-lg text-stone-400 dark:text-stone-500 line-through">
                        ₹{Math.round(currentMrp)}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {currentDiscount}
                      </span>
                    </>
                  )}
                  {currentPricing.packCount > 1 && (
                    <span className="font-mono text-xs font-bold text-[#FF5400] bg-[#FF5400]/10 px-2.5 py-1 rounded-full border border-[#FF5400]/20">
                      ₹{currentPricing.perPack} / pouch
                    </span>
                  )}
                </div>
              )}

              {/* Official Pouch Callout */}
              {!isComingSoon && !isTryAll5 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs font-bold text-stone-300">
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200 dark:border-[#243373]">
                    ✓ ROASTED NOT FRIED
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200 dark:border-[#243373]">
                    ✓ {selectedSize} OFFICIAL POUCH
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200 dark:border-[#243373] text-[#FF5400]">
                    ✓ {selectedPack.toUpperCase()} ({netWeightGrams}G TOTAL)
                  </span>
                </div>
              )}
            </div>

            {/* ── 1. WEIGHT SELECTOR (70g vs 30g — NO 50g) ────────────────── */}
            {!isComingSoon && !isTryAll5 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-300">
                    1. SELECT WEIGHT <span className="text-[#FF5400]">• OFFICIAL SIZES</span>
                  </label>
                  <span className="font-mono text-[10px] text-stone-400">
                    {selectedSize === '70g' ? '70g Standard Jumbo Pouch' : '30g Snack Pouch'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {OFFICIAL_WEIGHTS.map((w) => {
                    const isSelected = selectedSize === w.id
                    const pricingForWeight = getPricing(w.id, selectedPack)
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setSelectedSize(w.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer hover-pop-subtle hover:-translate-y-1 hover:scale-[1.015] ${
                          isSelected
                            ? 'border-[#FF5400] bg-[#1C2A6B] shadow-md ring-2 ring-[#FF5400]/40'
                            : 'border-[#243373] bg-[#131D4A] hover:border-[#FF5400]/50 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-display text-lg font-black text-white">
                            {w.label}
                          </span>
                          <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-[#FF5400] text-white' : 'bg-[#0C122C] text-stone-300'
                          }`}>
                            {w.badge}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-stone-300 text-[11px]">{w.title}</span>
                          <span className="font-bold text-[#FF5400]">₹{pricingForWeight.price}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── 2. PACK QUANTITY SELECTOR (1, 3, 5, 10 Pack) ─────────────── */}
            {!isComingSoon && !isTryAll5 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-300">
                    2. SELECT PACK QUANTITY <span className="text-[#FF5400]">• DEFAULT: PACK OF 3</span>
                  </label>
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase">
                    {selectedPack === '3 Pack' ? '★ POPULAR CHOICE' : `${selectedPack}`}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PACK_OPTIONS.map((pack) => {
                    const isSelected = selectedPack === pack.id
                    const pricing = getPricing(selectedSize, pack.id)
                    const totalGrams = getTotalWeightGrams(selectedSize, pack.id)
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => setSelectedPack(pack.id)}
                        className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer hover-pop-subtle hover:-translate-y-1 hover:scale-[1.02] ${
                          isSelected
                            ? 'border-[#FF5400] bg-[#1C2A6B] shadow-md ring-2 ring-[#FF5400]/40'
                            : 'border-[#243373] bg-[#131D4A] hover:border-[#FF5400]/50 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {pack.badge && (
                          <span className={`absolute -top-2.5 right-2 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                            isSelected || pack.badge === 'POPULAR'
                              ? 'bg-[#FF5400] text-white'
                              : 'bg-emerald-600 text-white'
                          }`}>
                            {pack.badge}
                          </span>
                        )}
                        <div>
                          <div className="font-display text-sm sm:text-base font-extrabold text-white">
                            {pack.id}
                          </div>
                          <div className="font-mono text-[10px] text-stone-400 mt-0.5">
                            {totalGrams}g ({pack.count} × {selectedSize})
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 flex flex-col">
                          <span className="font-display text-base font-bold text-white">
                            ₹{pricing.price}
                          </span>
                          <span className="font-mono text-[10px] text-stone-300">
                            ₹{pricing.perPack}/pack
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}


            {/* Description Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] space-y-2 shadow-2xs">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-400">
                FLAVOUR PROFILE
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-normal">
                {product.description || product.blurb || 'Handpicked Bihar lotus seeds slow-roasted in small batches with authentic spices.'}
              </p>
            </div>

            {/* Taste Notes */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                TASTE NOTES &amp; TEXTURE
              </span>
              <div className="flex flex-wrap gap-2">
                {tasteTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-stone-100 dark:bg-[#1C2A6B] font-mono text-[10px] font-bold text-stone-700 dark:text-stone-300 uppercase hover-pop-subtle cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Coming Soon VIP State VS Live Checkout Action */}
            {isComingSoon ? (
              <div className="p-6 rounded-3xl bg-stone-900 text-white border border-[#FF5400]/40 space-y-4 shadow-md mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧪</span>
                  <div>
                    <h4 className="font-display text-base font-bold uppercase text-white">
                      IN THE EXPERIMENTAL LAB
                    </h4>
                    <p className="font-mono text-xs text-[#FF5400]">
                      Drop 02 VIP Early Access
                    </p>
                  </div>
                </div>
                <p className="font-sans text-xs text-stone-300 leading-relaxed font-normal">
                  This recipe is currently simmering in our small-batch Bihar roasting facility. It is not open for purchase yet. Join the Drop 02 VIP list to receive priority notification the minute it launches.
                </p>
                <button
                  type="button"
                  onClick={handleNotifyMe}
                  className="w-full btn py-4 text-xs font-bold uppercase tracking-wider bg-[#FF5400] hover:bg-[#E04800] text-white shadow-sm cursor-pointer"
                >
                  🔔 GET VIP DROP 02 NOTIFICATION
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 pt-4 border-t border-stone-200/80 dark:border-[#243373]">
                <div className="flex items-center gap-3.5">
                  {/* Stepper */}
                  <div className="flex items-center border border-stone-200 dark:border-[#243373] rounded-full bg-white dark:bg-[#1C2A6B] px-2 py-1.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                      className="h-8 w-8 font-mono text-base font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#131D4A] rounded-full transition-colors flex items-center justify-center disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="min-w-[2.25rem] text-center font-mono text-sm font-bold text-[#17245B] dark:text-white">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="h-8 w-8 font-mono text-base font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#131D4A] rounded-full transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Stash CTA */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isVariantAvailable || isAdding}
                    className={`flex-1 btn py-4 text-xs font-bold uppercase tracking-wider shadow-sm transition-all ${
                      !isVariantAvailable
                        ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed border-transparent'
                        : isAdded
                        ? 'bg-emerald-600 text-white'
                        : isAdding
                        ? 'bg-[#FF5400] text-white opacity-85'
                        : 'bg-[#FF5400] hover:bg-[#E04800] text-white'
                    }`}
                  >
                    {!isVariantAvailable
                      ? 'SOLD OUT'
                      : isAdded
                      ? 'ADDED TO STASH ✓'
                      : isAdding
                      ? 'ADDING...'
                      : isTryAll5
                      ? `ADD TRIO BOX TO STASH • ₹${(currentPrice * qty).toFixed(0)}`
                      : selectedPack === '3 Pack'
                      ? `ADD PACK OF 3 TO STASH • ₹${(currentPrice * qty).toFixed(0)}`
                      : `ADD ${selectedPack.toUpperCase()} TO STASH • ₹${(currentPrice * qty).toFixed(0)}`}
                  </button>
                </div>

                {!isVariantAvailable && (
                  <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-xs font-mono font-bold flex items-center gap-2">
                    <span>⚠️</span>
                    <span>This pouch is currently sold out.</span>
                  </div>
                )}

                {/* Guarantees */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 pt-1 px-1">
                  <span>⚡ Dispatches in 24h</span>
                  <span>🍿 100% Roasted Not Fried</span>
                  <span>🇮🇳 {selectedSize} Official Pouch</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── 2. NUTRITIONAL FACTS & INGREDIENTS ─────────────────────────────── */}
        <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] shadow-xs space-y-6">
          <div className="space-y-1.5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
              CLEAN SNACKING SPECS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#17245B] dark:text-white">
              WHAT'S INSIDE THE POUCH
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-[#17245B] dark:text-white uppercase">
                INGREDIENTS
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-[#FAF8F5] dark:bg-[#1C2A6B] p-5 rounded-2xl border border-stone-200/80 dark:border-[#243373] font-normal">
                {product.ingredients || 'Jumbo Foxnuts (Makhana), Olive Oil, Natural Spices, Sea Salt.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-[#1C2A6B] text-stone-700 dark:text-stone-300 font-mono text-[10px] font-bold">✓ GLUTEN FREE</span>
                <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-[#1C2A6B] text-stone-700 dark:text-stone-300 font-mono text-[10px] font-bold">✓ ZERO PALM OIL</span>
                <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-[#1C2A6B] text-stone-700 dark:text-stone-300 font-mono text-[10px] font-bold">✓ NOT FRIED</span>
                <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-[#1C2A6B] text-stone-700 dark:text-stone-300 font-mono text-[10px] font-bold">✓ PLANT PROTEIN</span>
              </div>
            </div>

            {/* Nutrition Grid */}
            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-[#17245B] dark:text-white uppercase">
                NUTRITIONAL ESTIMATE (PER {selectedSize.toUpperCase()} SERVING)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(product.nutrition || { calories: '132 kcal', protein: '4.2g', carbs: '21g', fat: '3.5g', fiber: '3.6g' }).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] text-center">
                    <span className="font-mono text-[9px] font-bold uppercase text-stone-500 dark:text-stone-400 block mb-0.5">
                      {key}
                    </span>
                    <span className="font-display text-sm font-bold text-[#17245B] dark:text-white">
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
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
                  EXPLORE MORE
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#17245B] dark:text-white">
                  YOU MIGHT ALSO CRUNCH
                </h2>
              </div>
              <Link to="/shop" className="font-mono text-xs font-bold text-[#17245B] dark:text-stone-300 hover:text-[#FF5400] transition-colors">
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
            className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0C122C]/95 backdrop-blur-md border-t border-stone-200 dark:border-[#243373] p-3.5 sm:hidden shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-[#17245B] dark:text-white truncate">
                  {product.name}
                </p>
                <div className="flex items-center gap-1.5 font-mono text-xs text-stone-500 dark:text-stone-400">
                  <span className="text-[#17245B] dark:text-white font-bold">
                    {isComingSoon ? 'DROP 02' : `₹${Math.round(currentPrice * qty)}`}
                  </span>
                  <span>•</span>
                  <span className="truncate">
                    {isComingSoon ? 'COMING SOON' : `${selectedPack} (${selectedSize})`}
                  </span>
                </div>
              </div>

              {isComingSoon ? (
                <button
                  type="button"
                  onClick={handleNotifyMe}
                  className="btn py-3 px-5 text-xs font-bold uppercase shrink-0 bg-[#FF5400] text-white cursor-pointer"
                >
                  🔔 NOTIFY ME
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!isVariantAvailable || isAdding}
                  className={`btn py-3 px-5 text-xs font-bold uppercase shrink-0 ${
                    !isVariantAvailable
                      ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed border-transparent'
                      : isAdded
                      ? 'bg-emerald-600 text-white'
                      : isAdding
                      ? 'bg-[#FF5400] text-white opacity-80'
                      : 'bg-[#FF5400] text-white'
                  }`}
                >
                  {!isVariantAvailable
                    ? 'SOLD OUT'
                    : isAdded
                    ? 'ADDED ✓'
                    : isAdding
                    ? 'ADDING...'
                    : selectedPack === '3 Pack'
                    ? 'ADD PACK OF 3'
                    : `ADD ${selectedPack.toUpperCase()}`}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
