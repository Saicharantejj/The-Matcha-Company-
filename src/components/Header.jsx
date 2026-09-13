import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { setSmoothScrollPaused } from '../lib/smoothScroll'
import ChaskaLogo from './ChaskaLogo'

const NAV_LINKS = [
  { to: '/shop', label: 'SHOP', hindi: 'दुकान' },
  { to: '/collections', label: 'COLLECTIONS', hindi: 'कलेक्शन' },
  { to: '/products/chaska-try-all-5', label: 'TRY ALL 5', hindi: 'सैंपलर', isBadge: 'SAMPLER' },
  { to: '/about', label: 'OUR STORY', hindi: 'कहानी' },
  { to: '/b2b', label: 'B2B & GIFTS', hindi: 'थोक' },
]

const SECONDARY_MOBILE_LINKS = [
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'CONTACT' },
  { to: '/policies/shipping', label: 'SHIPPING' },
  { to: '/policies/returns', label: 'RETURNS' },
]

export default function Header({ onOpenSearch }) {
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
      {/* ── TOP BANNER TICKER ────────────────────────────────────────── */}
      <div className="bg-[#17245B] text-[#F5EEDD] py-2 px-4 text-center font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider border-b border-[#E2AE35]/30 flex items-center justify-center gap-2 shadow-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E2AE35] text-[#17245B] text-[10px] font-sans tracking-wide font-extrabold shadow-xs">
          🔥 NEW DROP
        </span>
        <span className="truncate">
          KARARE. CHATPATE. ADDICTIVE. 🍿 <span className="text-[#E2AE35]">FREE SHIPPING</span> OVER ₹499
        </span>
      </div>

      {/* ── MAIN NAVBAR ─────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'glass-header py-3 sm:py-3.5 shadow-sm'
            : 'bg-[#F5EEDD]/90 backdrop-blur-md py-4 sm:py-4.5 border-b border-[#17245B]/10'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
          
          {/* Logo */}
          <NavLink to="/" aria-label="CHASKA Home" className="group relative z-10 flex items-center">
            <ChaskaLogo className="h-6 sm:h-7.5 w-auto" color="#17245B" accentColor="#E2AE35" showTagline />
          </NavLink>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 xl:gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-sans text-xs sm:text-[13px] uppercase font-bold tracking-wider transition-colors duration-200 flex items-center gap-1.5 py-1 ${
                    isActive
                      ? 'text-[#17245B] border-b-2 border-[#17245B]'
                      : 'text-[#17245B]/80 hover:text-[#17245B]'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.isBadge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E2AE35] text-[10px] text-[#17245B] font-sans font-extrabold tracking-wide">
                    {link.isBadge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Search + Cart + Mobile Hamburger */}
          <div className="relative z-10 flex items-center gap-2.5 sm:gap-3.5">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search snacks"
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full border border-[#17245B]/20 bg-white text-[#17245B] font-sans text-xs font-bold uppercase tracking-wider hover:border-[#17245B] hover:bg-[#FAF6ED] transition-all shadow-xs"
            >
              <span className="text-xs">🔍</span>
              <span className="hidden sm:inline">SEARCH</span>
              <span className="hidden xl:inline-block px-1.5 py-0.2 rounded bg-[#F5EEDD] text-[10px] text-[#17245B]/70 border border-[#17245B]/15">⌘K</span>
            </button>

            {/* Cart Trigger */}
            <motion.button
              type="button"
              onClick={openCart}
              aria-label={`Open cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              animate={lastAddedId && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative inline-flex items-center gap-2 px-3.5 py-2 sm:px-4.5 sm:py-2 rounded-full bg-[#17245B] text-[#F5EEDD] font-sans text-xs font-black uppercase tracking-wider hover:bg-[#E2AE35] hover:text-[#17245B] transition-all shadow-sm"
            >
              <span>STASH</span>
              <span className="inline-flex h-5 min-w-[1.25rem] px-1 items-center justify-center rounded-full bg-[#E2AE35] text-[#17245B] text-[10px] font-sans font-extrabold tabular-nums shadow-xs">
                {cartCount}
              </span>
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17245B]/20 bg-white lg:hidden shadow-xs hover:border-[#17245B]"
            >
              <div className="relative w-4 h-3 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-[#17245B] rounded-full transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
                <span className={`h-0.5 w-full bg-[#17245B] rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-0.5 w-full bg-[#17245B] rounded-full transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
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
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 top-[88px] sm:top-[92px] z-40 bg-[#F5EEDD] border-b border-[#17245B]/15 shadow-xl lg:hidden rounded-b-3xl overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-6 space-y-6">
                
                {/* Mobile Search Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    if (onOpenSearch) onOpenSearch()
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#17245B]/15 text-[#17245B] font-sans text-xs font-bold shadow-xs"
                >
                  <span className="flex items-center gap-2">
                    <span>🔍</span>
                    <span>SEARCH FLAVOURS &amp; BOXES</span>
                  </span>
                  <span className="text-[#17245B]">➔</span>
                </button>

                <ul className="space-y-3">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.to} className="border-b border-[#17245B]/10 pb-2.5">
                      <NavLink
                        to={link.to}
                        className="flex items-center justify-between font-display text-xl font-bold text-[#17245B] hover:text-[#E2AE35]"
                      >
                        <div className="flex items-center gap-2">
                          <span>{link.label}</span>
                          <span className="text-xs font-hindi font-normal text-[#17245B]/60">({link.hindi})</span>
                        </div>
                        <span className="font-sans text-xs text-[#E2AE35] font-bold">0{i + 1}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-[#17245B]/10 space-y-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#17245B]/70">
                    HELP &amp; POLICIES
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {SECONDARY_MOBILE_LINKS.map((sLink) => (
                      <NavLink
                        key={sLink.to}
                        to={sLink.to}
                        className="px-3 py-2 rounded-xl bg-white border border-[#17245B]/15 font-sans text-xs font-bold text-[#17245B] hover:text-[#E2AE35] text-center shadow-xs"
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
