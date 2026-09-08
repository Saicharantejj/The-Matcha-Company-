import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { setSmoothScrollPaused } from '../lib/smoothScroll'

const NAV_LINKS = [
  { to: '/shop', label: 'SHOP' },
  { to: '/build-your-box', label: 'BUILD YOUR BOX' },
  { to: '/about', label: 'ABOUT' },
]

const SECONDARY_MOBILE_LINKS = [
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'CONTACT' },
  { to: '/shipping', label: 'SHIPPING & RETURNS' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count: cartCount, openCart, lastAddedId } = useCart()
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    setSmoothScrollPaused(menuOpen)
    return () => {
      document.body.style.overflow = ''
      setSmoothScrollPaused(false)
    }
  }, [menuOpen])

  return (
    <>
      {/* ── FIRE RED ANNOUNCEMENT BAR ─────────────────────────────────────── */}
      <div className="bg-[#D23D2D] text-[#F8EECB] py-2 px-4 text-center font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest border-b border-[#6E433D]/20">
        <span>⚡ ROASTED NOT FRIED. 100% FREE SHIPPING ON ORDERS OVER ₹499</span>
      </div>

      {/* ── VANILLA CREAM GLASS NAVBAR ──────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'glass-header py-3.5 shadow-md'
            : 'bg-[#F8EECB]/90 backdrop-blur-md py-5 border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[96rem] items-center justify-between px-6 sm:px-12">
          
          {/* Logo / Brand Mark */}
          <NavLink to="/" aria-label="CHASKA" className="group relative z-10 flex items-center gap-3">
            <span className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#6E433D] leading-none group-hover:text-[#D23D2D] transition-colors">
              CHASKA
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-mono text-xs uppercase font-bold tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-[#D23D2D] border-b-2 border-[#D23D2D] pb-0.5' : 'text-[#6E433D] hover:text-[#D23D2D]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="relative z-10 flex items-center gap-4">
            {/* Cart Trigger */}
            <motion.button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              animate={lastAddedId && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#6E433D]/20 bg-white text-[#6E433D] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#D23D2D] hover:text-[#D23D2D] transition-all shadow-sm"
            >
              <span>CART</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D23D2D] text-[#F8EECB] text-[10px] font-mono font-bold tabular-nums">
                {cartCount}
              </span>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6E433D]/20 bg-white lg:hidden shadow-sm hover:border-[#D23D2D]"
            >
              <div className="relative w-4 h-3.5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-[#6E433D] rounded-full transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`h-0.5 w-full bg-[#6E433D] rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-0.5 w-full bg-[#6E433D] rounded-full transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>

        </div>

        {/* ── MOBILE NAV DRAWER ──────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-[96px] z-40 bg-[#F8EECB] border-b border-[#6E433D]/20 shadow-xl lg:hidden rounded-b-3xl overflow-hidden"
            >
              <nav aria-label="Mobile navigation" className="flex flex-col px-8 py-8 space-y-6">
                <ul className="space-y-4">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.to} className="border-b border-[#6E433D]/10 pb-3">
                      <NavLink
                        to={link.to}
                        className="flex items-center justify-between font-display text-2xl font-bold text-[#6E433D] hover:text-[#D23D2D]"
                      >
                        {link.label}
                        <span className="font-mono text-xs text-[#D23D2D]">0{i + 1}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#6E433D]/10 space-y-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D23D2D]">
                    MORE PAGES
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {SECONDARY_MOBILE_LINKS.map((sLink) => (
                      <NavLink
                        key={sLink.to}
                        to={sLink.to}
                        className="px-4 py-2.5 rounded-full bg-white/80 border border-[#6E433D]/15 font-mono text-xs font-bold text-[#6E433D] hover:text-[#D23D2D] text-center"
                      >
                        {sLink.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
