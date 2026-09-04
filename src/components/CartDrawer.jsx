import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useShopifyProducts } from '../context/ShopifyContext'
import { setSmoothScrollPaused } from '../lib/smoothScroll'

const SWATCH = {
  matcha: '#5C8A2E',
  moss: '#C4D2B8',
  olive: '#4E6B3E',
}

function LineMark({ swatch }) {
  const fill = SWATCH[swatch] || SWATCH.matcha
  return (
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-ink/20 bg-ink">
      <svg viewBox="0 0 120 150" className="h-9 w-auto" aria-hidden="true">
        <path
          d="M14 28 Q14 18 24 18 L96 18 Q106 18 106 28 L106 128 Q106 140 94 140 L26 140 Q14 140 14 128 Z"
          fill={fill}
          stroke="#F8F5EB"
          strokeWidth="3"
        />
        <path d="M52 18 L60 27 L68 18 Z" fill="#F8F5EB" />
        <rect x="18" y="62" width="84" height="34" fill="#F8F5EB" />
      </svg>
    </div>
  )
}

function QtyStepper({ qty, onDecrement, onIncrement, name }) {
  return (
    <div className="inline-flex items-center border border-ink/20 bg-card/60 backdrop-blur-sm">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${name}`}
        className="flex h-8 w-8 items-center justify-center font-mono text-sm leading-none text-cocoa transition-colors hover:bg-ink hover:text-cream"
      >
        –
      </button>
      <span
        aria-live="polite"
        className="min-w-[2.25rem] border-x border-ink/20 px-2 text-center font-mono text-xs tabular-nums text-cocoa font-bold"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${name}`}
        className="flex h-8 w-8 items-center justify-center font-mono text-sm leading-none text-cocoa transition-colors hover:bg-ink hover:text-cream"
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
    cartCost,
    checkoutUrl,
    error: cartError,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    clearCart,
    addItem,
  } = useCart()
  const { products: catalogueProducts, testProduct } = useShopifyProducts()
  const [error, setError] = useState(null)
  const checkoutStartedRef = useRef(false)

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

  useEffect(() => {
    if (isOpen) {
      setError(null)
      checkoutStartedRef.current = false
    }
  }, [isOpen])

  const beginCheckout = () => {
    if (checkoutStartedRef.current || lines.length === 0) return
    if (!checkoutUrl || typeof checkoutUrl !== 'string') {
      setError('Checkout URL is unavailable. Please check that products have active Shopify variants.')
      return
    }
    checkoutStartedRef.current = true
    window.location.href = checkoutUrl
  }

  const handleAddTestProduct = () => {
    if (!testProduct) return
    addItem(testProduct)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Your cart">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink/10 bg-card/85 shadow-glass-xl backdrop-blur-2xl backdrop-saturate-150"
          >
            <header className="flex items-center justify-between border-b border-ink/15 px-6 py-5">
              <div>
                <p className="spec text-olive">Your order</p>
                <h2 className="mt-1 font-display text-2xl tracking-display">
                  Cart{count > 0 ? ` (${count})` : ''}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center border border-ink/20 bg-transparent font-mono text-sm text-cocoa transition-colors hover:bg-ink hover:text-cream"
              >
                ✕
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="spec text-bark/60">Nothing here yet</p>
                <h3 className="mt-3 font-display text-2xl tracking-display">Your cart is empty</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-bark">
                  Pick a Matcha Powder pack, a Matcha Kit, or a Gift Hamper to add it here.
                </p>
                <Link to="/matchas" onClick={closeCart} className="btn mt-8">
                  Shop Matcha Powder
                </Link>

                {testProduct && (
                  <button
                    type="button"
                    onClick={handleAddTestProduct}
                    className="mt-6 font-mono text-[0.65rem] uppercase tracking-widest text-[#4E6B3E] hover:underline"
                  >
                    [Dev Test] Add Matcha Test Product to Cart
                  </button>
                )}
              </div>
            ) : (
              <>
                <ul data-lenis-prevent className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6 py-2">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-5">
                          <LineMark swatch={line.swatch} />

                          <div className="min-w-0 flex-1">
                            <p className="spec text-olive">
                              {line.size ? line.size : 'Matcha Product'}
                            </p>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="mt-1 font-display text-base leading-snug tracking-display">
                                {line.name}
                              </h3>
                              {(() => {
                                const raw = parseFloat(line.price)
                                const catMatch = catalogueProducts?.find((p) => p.variantId === line.variantId || p.handle === line.handle || p.name === line.name)
                                const displayVal = Number.isFinite(raw) && raw > 0 ? raw : (catMatch?.price || line.price)
                                return (
                                  displayVal ? (
                                    <span className="mt-1 font-mono text-xs tabular-nums text-cocoa font-bold shrink-0">
                                      {line.currency === 'INR' || !line.currency ? '₹' : ''}
                                      {displayVal} {line.currency && line.currency !== 'INR' ? line.currency : ''}
                                    </span>
                                  ) : null
                                )
                              })()}
                            </div>

                            <div className="mt-3 flex items-center gap-4">
                              <QtyStepper
                                qty={line.qty}
                                name={line.name}
                                onIncrement={() => increment(line.id)}
                                onDecrement={() => decrement(line.id)}
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(line.id)}
                                className="spec text-bark/60 underline underline-offset-4 transition-colors hover:text-cocoa"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-ink/15 bg-card/40 px-6 py-6 backdrop-blur-md">
                  <div className="flex items-center justify-between font-mono text-spec uppercase">
                    <span className="text-bark">Total items</span>
                    <span className="tabular-nums text-cocoa font-bold">{count}</span>
                  </div>
                  {cartCost?.subtotalAmount && parseFloat(cartCost.subtotalAmount) > 0 && (
                    <div className="mt-3 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest">
                      <span className="text-bark">Subtotal</span>
                      <span className="tabular-nums text-cocoa">
                        {cartCost.currencyCode === 'INR' ? '₹' : ''}
                        {cartCost.subtotalAmount} {cartCost.currencyCode !== 'INR' ? cartCost.currencyCode : ''}
                      </span>
                    </div>
                  )}

                  {(cartError || error) && (
                    <p role="alert" className="mt-3 border-l-2 border-olive pl-3 font-body text-xs text-cocoa">
                      {cartError || error}
                    </p>
                  )}

                  <p className="mt-3 font-body text-xs leading-relaxed text-bark">
                    Redirects to secure Shopify hosted checkout to complete your order.
                  </p>

                  <button
                    type="button"
                    onClick={beginCheckout}
                    disabled={lines.length === 0}
                    className="btn mt-5 w-full disabled:opacity-50"
                  >
                    Checkout
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-3 w-full font-mono text-spec uppercase tracking-widest text-bark/60 underline underline-offset-4 transition-colors hover:text-cocoa"
                  >
                    Clear cart
                  </button>

                  {testProduct && (
                    <div className="mt-4 pt-3 border-t border-ink/10 text-center">
                      <button
                        type="button"
                        onClick={handleAddTestProduct}
                        className="font-mono text-[0.65rem] uppercase tracking-widest text-[#4E6B3E] hover:underline"
                      >
                        [Dev Test] Add Matcha Test Product to Cart
                      </button>
                    </div>
                  )}
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
