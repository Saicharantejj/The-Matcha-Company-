import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { setSmoothScrollPaused } from '../lib/smoothScroll'

const FREE_SHIPPING_THRESHOLD = 499

function QtyStepper({ quantity, onDecrement, onIncrement, name }) {
  const displayQty = typeof quantity === 'number' && !isNaN(quantity) && quantity > 0 ? quantity : 1

  return (
    <div className="inline-flex items-center border border-[#6E433D]/20 rounded-full bg-white overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${name}`}
        className="flex h-7 w-8 items-center justify-center font-mono text-sm text-[#6E433D] font-bold transition-colors hover:bg-[#D23D2D] hover:text-white"
      >
        −
      </button>
      <span
        aria-live="polite"
        className="min-w-[1.75rem] px-2 text-center font-mono text-xs tabular-nums text-[#6E433D] font-bold select-none"
      >
        {displayQty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${name}`}
        className="flex h-7 w-8 items-center justify-center font-mono text-sm text-[#6E433D] font-bold transition-colors hover:bg-[#D23D2D] hover:text-white"
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
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    clearCart,
  } = useCart()
  const { addToast } = useToast()

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
    addToast('Online checkout for The Makhana Company is launching soon! 🍿', 'info')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Your snack stash cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#6E433D]/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-full sm:w-[450px] flex-col bg-[#F8EECB] shadow-2xl sm:rounded-l-3xl overflow-hidden border-l border-[#6E433D]/15"
          >
            {/* ── TOP HEADER ──────────────────────────────────────────────── */}
            <header className="flex items-center justify-between border-b border-[#6E433D]/15 px-6 py-5 bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl font-bold uppercase tracking-tight text-[#6E433D]">
                  YOUR SNACK STASH
                </span>
                {count > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold tabular-nums">
                    {count}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6E433D]/20 bg-white font-mono text-xs text-[#6E433D] hover:bg-[#D23D2D] hover:text-white transition-colors shadow-sm"
              >
                ✕
              </button>
            </header>

            {/* ── SHIPPING PROGRESS ────────────────────────────────────────── */}
            <div className="px-6 py-3 bg-[#FFF8EC] border-b border-[#6E433D]/10">
              <div className="flex justify-between items-center text-xs font-mono text-[#6E433D] mb-1.5 font-bold">
                {remainingForFreeShipping > 0 ? (
                  <span>₹{remainingForFreeShipping} away from free shipping</span>
                ) : (
                  <span className="text-[#31603D]">FREE SHIPPING UNLOCKED! 🎉</span>
                )}
                <span className="text-[#D23D2D] font-mono font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#6E433D]/15 h-2 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-[#D23D2D] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* ── CART BODY ───────────────────────────────────────────────── */}
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-white border border-[#6E433D]/15 flex items-center justify-center text-4xl shadow-sm">
                  🍿
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold uppercase text-[#6E433D]">
                    YOUR SNACK STASH IS EMPTY
                  </h3>
                  <p className="font-sans text-xs text-[#6E433D]/70 max-w-xs mx-auto leading-relaxed">
                    Looks like you haven't added any crunch yet.
                  </p>
                </div>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="btn bg-[#D23D2D] text-[#F8EECB] hover:bg-[#6E433D] px-8 py-3.5 text-xs font-bold shadow-md"
                >
                  EXPLORE MAKHANA &rarr;
                </Link>
              </div>
            ) : (
              <>
                {/* Scrollable Item List */}
                <ul
                  data-lenis-prevent
                  className="flex-1 divide-y divide-[#6E433D]/10 overflow-y-auto px-6 py-4 space-y-4"
                >
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const itemQty = typeof line.quantity === 'number' && !isNaN(line.quantity) && line.quantity > 0
                        ? line.quantity
                        : (typeof line.qty === 'number' && !isNaN(line.qty) && line.qty > 0 ? line.qty : 1)
                      
                      const itemPrice = typeof line.price === 'number' && !isNaN(line.price) ? line.price : 199

                      return (
                        <motion.li
                          key={line.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="pt-4 first:pt-0"
                        >
                          <div className="flex gap-4 p-4 rounded-2xl bg-white border border-[#6E433D]/12 shadow-sm">
                            {/* Product Image */}
                            <div className="h-16 w-16 shrink-0 rounded-xl bg-[#FAF6EE] border border-[#6E433D]/10 p-1 flex items-center justify-center overflow-hidden">
                              {line.image ? (
                                <img
                                  src={line.image}
                                  alt={line.name}
                                  className="h-full w-full object-cover rounded-lg"
                                />
                              ) : (
                                <span className="font-display text-2xl">🍿</span>
                              )}
                            </div>

                            {/* Details */}
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex items-start justify-between gap-2">
                                <Link
                                  to={`/product/${line.slug || line.handle || line.id}`}
                                  onClick={closeCart}
                                  className="font-display text-sm font-bold text-[#6E433D] hover:text-[#D23D2D] leading-snug line-clamp-2"
                                >
                                  {line.name}
                                </Link>
                                <span className="font-mono text-sm font-bold text-[#6E433D] shrink-0">
                                  ₹{itemPrice}
                                </span>
                              </div>

                              <p className="font-mono text-[10px] font-bold uppercase text-[#6E433D]/60">
                                {line.packSize || line.size || '70g Pack'}
                              </p>

                              {/* Stepper + Remove */}
                              <div className="pt-2 flex items-center justify-between gap-2">
                                <QtyStepper
                                  quantity={itemQty}
                                  name={line.name}
                                  onIncrement={() => increment(line.id)}
                                  onDecrement={() => decrement(line.id)}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeItem(line.id)}
                                  className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#6E433D]/60 hover:text-[#D23D2D] transition-colors"
                                >
                                  REMOVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>

                {/* ── BOTTOM STICKY AREA ──────────────────────────────────────── */}
                <footer className="border-t border-[#6E433D]/15 bg-white/90 backdrop-blur-md px-6 py-5 space-y-4 shadow-lg">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#6E433D]/70">
                      SUBTOTAL
                    </span>
                    <span className="font-display text-2xl font-black text-[#D23D2D]">
                      ₹{safeSubtotal}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckoutClick}
                    className="btn w-full bg-[#D23D2D] hover:bg-[#6E433D] py-4 text-xs font-bold shadow-md tracking-wider uppercase text-center justify-center"
                  >
                    CHECKOUT NOW &rarr;
                  </button>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#6E433D]/70 pt-1">
                    <Link
                      to="/shop"
                      onClick={closeCart}
                      className="hover:text-[#D23D2D] underline font-bold"
                    >
                      CONTINUE SHOPPING
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="hover:text-[#D23D2D] transition-colors"
                    >
                      CLEAR STASH
                    </button>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
