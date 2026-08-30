import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { placeOrder, messageFor } from '../lib/api'

// Mirrors the pouch colours in SachetGraphic, so a cart line looks like the
// product it came from.
const SWATCH = {
  matcha: '#6F9E28',
  moss: '#7C8438',
  olive: '#43481D',
  strawberry: '#A6483C',
  blueberry: '#4A5570',
  mango: '#AD6413',
  ube: '#6E5A8C',
  vanilla: '#9E7A3A',
}

const KIND_LABEL = {
  sachet: 'Sachet',
  'diy-kit': 'DIY Kit',
  bundle: 'Bundle',
}

// Small square pouch mark used per cart line — reads as the product without
// pulling the full SachetGraphic's glow/texture into a 56px box.
function LineMark({ swatch }) {
  const fill = SWATCH[swatch] || SWATCH.matcha
  return (
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-ink bg-ink">
      <svg viewBox="0 0 120 150" className="h-9 w-auto" aria-hidden="true">
        <path
          d="M14 28 Q14 18 24 18 L96 18 Q106 18 106 28 L106 128 Q106 140 94 140 L26 140 Q14 140 14 128 Z"
          fill={fill}
          stroke="#F0E5D2"
          strokeWidth="3"
        />
        <path d="M52 18 L60 27 L68 18 Z" fill="#F0E5D2" />
        <rect x="18" y="62" width="84" height="34" fill="#F0E5D2" />
      </svg>
    </div>
  )
}

function QtyStepper({ qty, onDecrement, onIncrement, name }) {
  return (
    <div className="inline-flex items-center border border-ink">
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
        className="min-w-[2.25rem] border-x border-ink px-2 text-center font-mono text-xs tabular-nums"
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

/**
 * One labelled input. Errors are announced per-field rather than only as a
 * summary, so a screen reader lands on the problem instead of hearing that
 * something, somewhere, is wrong.
 */
function Field({ id, label, value, onChange, type = 'text', required = true, autoComplete, ...rest }) {
  return (
    <label htmlFor={id} className="block">
      <span className="spec block">
        {label}
        {!required && <span className="ml-1 normal-case tracking-normal text-bark">(optional)</span>}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-ink bg-transparent pb-2 font-body text-sm text-cocoa placeholder:text-bark focus:outline-none focus:border-olive"
        {...rest}
      />
    </label>
  )
}

const EMPTY_DETAILS = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postcode: '',
  notes: '',
}

export default function CartDrawer() {
  const { lines, count, isOpen, closeCart, increment, decrement, removeItem, clearCart } = useCart()
  const [placed, setPlaced] = useState(null)
  const [checkingOut, setCheckingOut] = useState(false)
  const [details, setDetails] = useState(EMPTY_DETAILS)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  // Honeypot. Hidden from people, irresistible to naive bots.
  const [company, setCompany] = useState('')

  // Close on Escape, and lock body scroll while the panel is open.
  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeCart])

  // Reset back to the item list whenever the drawer is reopened. The typed
  // details are deliberately kept, so closing the panel by accident midway
  // through checkout does not cost the visitor their address.
  useEffect(() => {
    if (isOpen) {
      setPlaced(null)
      setCheckingOut(false)
      setError(null)
    }
  }, [isOpen])

  // Editing any field clears the previous error. Leaving a stale "your name is
  // required" sitting under a filled-in name field reads as though the form is
  // still broken after the visitor has already fixed it.
  const update = (key) => (value) => {
    setDetails((prev) => ({ ...prev, [key]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)

    const result = await placeOrder({
      ...details,
      company,
      items: lines.map((line) => ({ id: line.id, qty: line.qty })),
    })

    setSubmitting(false)
    if (!result.ok) {
      setError(messageFor(result))
      return
    }

    // Only clear once the server has actually accepted it — if the request
    // failed, the visitor still has their cart to retry with.
    setPlaced({ ref: result.data.reference, items: result.data.itemCount, emailed: result.data.emailed })
    setDetails(EMPTY_DETAILS)
    clearCart()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Your cart">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-ink/60"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink bg-card shadow-[-6px_0_0_0_rgba(76,56,44,0.18)]"
          >
            <header className="flex items-center justify-between border-b border-ink px-5 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-olive">Your order</p>
                <h2 className="mt-1 font-display text-xl tracking-display">
                  Cart{count > 0 ? ` (${count})` : ''}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center border border-ink bg-transparent font-mono text-sm text-cocoa transition-colors hover:bg-ink hover:text-cream"
              >
                ✕
              </button>
            </header>

            {placed ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center border border-ink bg-moss font-mono text-xl text-cream">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-2xl tracking-display">Order requested</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-bark">
                  We've logged {placed.items} {placed.items === 1 ? 'item' : 'items'} against reference{' '}
                  <span className="font-mono text-cocoa">{placed.ref}</span>.{' '}
                  {placed.emailed
                    ? 'A confirmation is on its way to your inbox.'
                    : 'Keep this reference — we confirm every order by email before it ships.'}
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="btn mt-7"
                >
                  Keep Browsing
                </button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-bark">
                  Nothing here yet
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-display">Your cart is empty</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-bark">
                  Pick a flavor sachet, a recipe kit, or a bundle and it'll show up here.
                </p>
                <Link
                  to="/matchas"
                  onClick={closeCart}
                  className="btn mt-7"
                >
                  Shop the Sachets
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/15 overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-4">
                          <LineMark swatch={line.swatch} />

                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[9px] uppercase tracking-widest text-olive">
                              {KIND_LABEL[line.kind] || 'Item'}
                              {line.size ? ` · ${line.size}` : ''}
                            </p>
                            <h3 className="mt-1 font-display text-sm leading-snug tracking-display">
                              {line.name}
                            </h3>

                            <div className="mt-3 flex items-center gap-3">
                              <QtyStepper
                                qty={line.qty}
                                name={line.name}
                                onIncrement={() => increment(line.id)}
                                onDecrement={() => decrement(line.id)}
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(line.id)}
                                className="font-mono text-[10px] uppercase tracking-widest text-bark underline underline-offset-4 transition-colors hover:text-cocoa"
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

                <footer className="border-t border-ink px-5 py-5">
                  {checkingOut ? (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid gap-5">
                        <Field id="name" label="Name" value={details.name} onChange={update('name')} autoComplete="name" />
                        <Field id="email" label="Email" type="email" value={details.email} onChange={update('email')} autoComplete="email" />
                        <Field id="phone" label="Phone" type="tel" required={false} value={details.phone} onChange={update('phone')} autoComplete="tel" />
                        <Field id="address" label="Address" value={details.address} onChange={update('address')} autoComplete="street-address" />
                        <div className="grid grid-cols-2 gap-5">
                          <Field id="city" label="City" value={details.city} onChange={update('city')} autoComplete="address-level2" />
                          <Field id="postcode" label="Postcode" value={details.postcode} onChange={update('postcode')} autoComplete="postal-code" />
                        </div>
                        <Field id="notes" label="Notes" required={false} value={details.notes} onChange={update('notes')} />
                      </div>

                      {/* Honeypot: off-screen, unfocusable, never announced. */}
                      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                        <label htmlFor="company">Company</label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>

                      {error && (
                        <p role="alert" className="mt-5 border-l-2 border-olive pl-3 font-body text-sm text-cocoa">
                          {error}
                        </p>
                      )}

                      <p className="mt-5 font-body text-xs leading-relaxed text-bark">
                        Nothing is charged here. We confirm pricing and delivery by email first.
                      </p>

                      <button type="submit" disabled={submitting} className="btn mt-4 w-full disabled:opacity-60">
                        {submitting ? 'Sending…' : `Place order (${count})`}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCheckingOut(false); setError(null) }}
                        className="mt-3 w-full font-mono text-[10px] uppercase tracking-widest text-bark underline underline-offset-4 transition-colors hover:text-cocoa"
                      >
                        Back to cart
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                        <span className="text-bark">Total items</span>
                        <span className="tabular-nums text-cocoa">{count}</span>
                      </div>
                      <p className="mt-3 font-body text-xs leading-relaxed text-bark">
                        We confirm pricing and delivery by email — nothing is charged here.
                      </p>

                      <button type="button" onClick={() => setCheckingOut(true)} className="btn mt-4 w-full">
                        Checkout
                      </button>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="mt-3 w-full font-mono text-[10px] uppercase tracking-widest text-bark underline underline-offset-4 transition-colors hover:text-cocoa"
                      >
                        Clear cart
                      </button>
                    </>
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
