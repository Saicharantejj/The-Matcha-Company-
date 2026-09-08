import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { setSmoothScrollPaused } from '../lib/smoothScroll'

const FREE_SHIPPING_THRESHOLD = 499

function QtyStepper({ qty, onDecrement, onIncrement, name }) {
  return (
    <div className="inline-flex items-center border border-[#6E433D]/20 rounded-full bg-white overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${name}`}
        className="flex h-7 w-7 items-center justify-center font-mono text-xs text-[#6E433D] font-bold transition-colors hover:bg-[#D23D2D] hover:text-white"
      >
        –
      </button>
      <span
        aria-live="polite"
        className="min-w-[1.75rem] px-1 text-center font-mono text-xs tabular-nums text-[#6E433D] font-bold"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${name}`}
        className="flex h-7 w-7 items-center justify-center font-mono text-xs text-[#6E433D] font-bold transition-colors hover:bg-[#D23D2D] hover:text-white"
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
    subtotal,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    clearCart,
  } = useCart()
  const { notify } = useToast()

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
    notify('Online checkout for The Makhana Company is launching soon! 🍿', { duration: 4000 })
  }

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

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
            className="absolute inset-0 bg-[#6E433D]/30 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#6E433D]/15 bg-[#F8EECB] shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#6E433D]/10 px-6 py-5 bg-[#FBF4DC]">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D23D2D]">YOUR SNACK STASH</p>
                <h2 className="font-display text-xl font-bold text-[#6E433D]">
                  CART{count > 0 ? ` (${count})` : ''}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6E433D]/20 bg-white font-mono text-xs text-[#6E433D] hover:bg-[#D23D2D] hover:text-white transition-colors"
              >
                ✕
              </button>
            </header>

            {/* Free Shipping Line */}
            <div className="px-6 py-3 bg-[#F5C065]/20 border-b border-[#6E433D]/10">
              <div className="flex justify-between items-center text-xs font-mono text-[#6E433D] mb-1 font-bold">
                {remainingForFreeShipping > 0 ? (
                  <span>Add ₹{remainingForFreeShipping} more for FREE SHIPPING! ⚡</span>
                ) : (
                  <span className="text-[#31603D]">🎉 FREE SHIPPING UNLOCKED!</span>
                )}
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#6E433D]/15 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#D23D2D] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Body */}
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <h3 className="font-display text-xl font-bold text-[#6E433D]">Your cart is empty</h3>
                <p className="mt-2 font-body text-xs text-[#8A5D57] max-w-xs">
                  Browse our roasted makhana flavors and add your favorites to get started.
                </p>
                <Link to="/shop" onClick={closeCart} className="btn mt-6 text-xs">
                  EXPLORE FLAVORS
                </Link>
              </div>
            ) : (
              <>
                <ul data-lenis-prevent className="flex-1 divide-y divide-[#6E433D]/10 overflow-y-auto px-6 py-2">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-4 items-center">
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-[#6E433D]/15 bg-white font-display font-bold text-lg text-[#6E433D]">
                            🍿
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#D23D2D]">
                              {line.size || '70G PACK'}
                            </span>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-sm font-bold text-[#6E433D] leading-tight">
                                {line.name}
                              </h3>
                              <span className="font-mono text-xs tabular-nums text-[#6E433D] font-bold shrink-0">
                                ₹{line.price}
                              </span>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between">
                              <QtyStepper
                                qty={line.qty}
                                name={line.name}
                                onIncrement={() => increment(line.id)}
                                onDecrement={() => decrement(line.id)}
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(line.id)}
                                className="font-mono text-[10px] font-bold text-[#8A5D57] hover:text-[#D23D2D] transition-colors"
                              >
                                REMOVE
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <footer className="border-t border-[#6E433D]/15 bg-[#FBF4DC] px-6 py-5">
                  <div className="flex items-center justify-between font-mono text-xs text-[#8A5D57] font-bold uppercase">
                    <span>TOTAL PACKS</span>
                    <span className="tabular-nums text-[#6E433D]">{count}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between font-display text-xl font-bold text-[#6E433D]">
                    <span>SUBTOTAL</span>
                    <span className="tabular-nums text-[#D23D2D]">₹{subtotal}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckoutClick}
                    disabled={lines.length === 0}
                    className="btn mt-4 w-full text-center justify-center font-bold text-xs shadow-md disabled:opacity-50"
                  >
                    CHECKOUT (COMING SOON) ➔
                  </button>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-3 w-full font-mono text-[10px] uppercase font-bold tracking-widest text-[#8A5D57] hover:text-[#D23D2D] transition-colors"
                  >
                    CLEAR CART
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
