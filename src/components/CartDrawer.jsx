import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { setSmoothScrollPaused } from '../lib/smoothScroll'
import { trackInitiateCheckout } from '../lib/metaPixel'
import { SHOPIFY_DOMAIN } from '../lib/shopify/client'

const FREE_SHIPPING_THRESHOLD = 499

function QtyStepper({ quantity, onDecrement, onIncrement, name }) {
  const displayQty = typeof quantity === 'number' && !isNaN(quantity) && quantity > 0 ? quantity : 1

  return (
    <div className="inline-flex items-center border border-black/10 rounded-full bg-white overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${name}`}
        className="flex h-7 w-7 items-center justify-center font-mono text-xs text-[#141414] font-bold transition-colors hover:bg-[#141414] hover:text-white"
      >
        −
      </button>
      <span
        aria-live="polite"
        className="min-w-[1.75rem] px-1 text-center font-mono text-xs tabular-nums text-[#141414] font-bold select-none"
      >
        {displayQty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${name}`}
        className="flex h-7 w-7 items-center justify-center font-mono text-xs text-[#141414] font-bold transition-colors hover:bg-[#141414] hover:text-white"
      >
        +
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const {
    lines,
    count,
    subtotal: rawSubtotal,
    checkoutUrl,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
  } = useCart()

  const safeSubtotal = typeof rawSubtotal === 'number' && !isNaN(rawSubtotal) && rawSubtotal >= 0 ? rawSubtotal : 0
  const progressPercent = safeSubtotal === 0 ? 0 : Math.min(100, Math.round((safeSubtotal / FREE_SHIPPING_THRESHOLD) * 100))
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - safeSubtotal)

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setSmoothScrollPaused(true)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      setSmoothScrollPaused(false)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeCart])

  const handleCheckoutClick = () => {
    trackInitiateCheckout(lines, safeSubtotal)
    const targetUrl = checkoutUrl || `https://${SHOPIFY_DOMAIN}/cart`
    window.location.href = targetUrl
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Your CHASKA stash cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-full sm:w-[440px] flex-col bg-[#FAF8F5] shadow-2xl sm:rounded-l-3xl overflow-hidden border-l border-black/10"
          >
            {/* ── TOP HEADER ──────────────────────────────────────────────── */}
            <header className="flex items-center justify-between border-b border-black/5 px-6 py-4.5 bg-white">
              <div className="flex items-center gap-2.5">
                <span className="font-display text-lg font-bold uppercase tracking-tight text-[#141414]">
                  YOUR CHASKA STASH
                </span>
                {count > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-bold tabular-nums shadow-2xs">
                    {count}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white font-mono text-xs text-[#141414] hover:bg-[#141414] hover:text-white transition-colors"
              >
                ✕
              </button>
            </header>

            {/* ── FREE SHIPPING PROGRESS BAR ──────────────────────────────── */}
            <div className="px-6 py-3 bg-[#F5F2EB] border-b border-black/5">
              <div className="flex justify-between items-center text-xs font-sans mb-1.5 font-semibold">
                {remainingForFreeShipping > 0 ? (
                  <span className="text-[#141414]/75">
                    Add <strong className="text-[#FF5400]">₹{remainingForFreeShipping}</strong> for FREE Shipping
                  </span>
                ) : (
                  <span className="text-emerald-700 flex items-center gap-1 font-bold">
                    <span>✓</span> FREE NATIONWIDE SHIPPING UNLOCKED
                  </span>
                )}
                <span className="text-[#141414] font-bold text-[11px]">{progressPercent}%</span>
              </div>
              <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#FF5400] h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* ── CART ITEMS SCROLLABLE LIST ──────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="h-14 w-14 rounded-full bg-white border border-black/10 flex items-center justify-center text-2xl shadow-2xs">
                    🍿
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-base font-bold text-[#141414] uppercase">
                      YOUR STASH IS EMPTY
                    </p>
                    <p className="font-sans text-xs text-[#141414]/60 max-w-xs font-normal">
                      Big crunch. Bold flavours. Ek packet se kaam nahi chalega.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="btn px-6 py-2.5 text-xs font-bold"
                  >
                    EXPLORE SNACKS ➔
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {lines.map((item) => {
                    const itemTitle = item.name || item.flavor || 'CHASKA Makhana'
                    const variantLabel = item.size && item.size !== 'Default Title' ? item.size : 'Standard Pack'
                    const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0
                    const itemTotal = (itemPrice * (item.quantity || 1)).toFixed(0)

                    return (
                      <motion.div
                        key={item.id || item.variantId}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-3.5 rounded-2xl bg-white border border-black/8 shadow-2xs flex gap-3.5 items-center justify-between"
                      >
                        {/* Image Thumbnail */}
                        <div className="h-16 w-16 shrink-0 rounded-xl bg-[#FAF8F5] border border-black/5 p-1 flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={itemTitle} className="h-full w-full object-cover rounded-lg" />
                          ) : (
                            <span className="text-xl">🍿</span>
                          )}
                        </div>

                        {/* Middle: Details & Stepper */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="font-display text-sm font-bold text-[#141414] truncate">
                            {itemTitle}
                          </p>
                          <p className="font-sans text-[11px] text-[#141414]/50 font-medium truncate">
                            {variantLabel}
                          </p>

                          <div className="pt-1 flex items-center gap-3">
                            <QtyStepper
                              quantity={item.quantity}
                              onDecrement={() => decrement(item.id || item.variantId)}
                              onIncrement={() => increment(item.id || item.variantId)}
                              name={itemTitle}
                            />
                            <button
                              type="button"
                              onClick={() => removeItem(item.id || item.variantId)}
                              className="font-sans text-[11px] text-[#141414]/40 hover:text-red-600 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Right: Price */}
                        <div className="text-right shrink-0">
                          <span className="font-display text-sm font-bold text-[#141414] block">
                            ₹{itemTotal}
                          </span>
                          {item.quantity > 1 && (
                            <span className="font-mono text-[10px] text-[#141414]/40 block">
                              ₹{itemPrice}/ea
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* ── BOTTOM SUMMARY & CHECKOUT CTA ───────────────────────────── */}
            {lines.length > 0 && (
              <footer className="border-t border-black/10 bg-white p-6 space-y-4">
                <div className="space-y-2 font-sans text-xs">
                  <div className="flex justify-between text-[#141414]/70">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#141414]">₹{Math.round(safeSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#141414]/70">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-emerald-700">
                      {remainingForFreeShipping === 0 ? 'FREE' : '₹50'}
                    </span>
                  </div>
                  <div className="border-t border-black/5 pt-2 flex justify-between items-baseline">
                    <span className="font-display text-base font-bold text-[#141414] uppercase">Total</span>
                    <span className="font-display text-2xl font-black text-[#141414]">
                      ₹{Math.round(safeSubtotal + (remainingForFreeShipping === 0 ? 0 : 50))}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="btn-orange w-full py-4 text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <span>➔</span>
                </button>

                <div className="text-center">
                  <p className="font-sans text-[11px] text-[#141414]/50 flex items-center justify-center gap-1.5">
                    <span>🔒</span>
                    <span>Official Shopify Checkout • UPI, Cards &amp; NetBanking</span>
                  </p>
                </div>
              </footer>
            )}

          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
