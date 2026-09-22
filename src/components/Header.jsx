import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { setSmoothScrollPaused } from '../lib/smoothScroll'
import ChaskaLogo from './ChaskaLogo'
import LiveBanner from './LiveBanner'

const NAV_LINKS = [
  { to: '/shop', label: 'SHOP' },
  { to: '/collections', label: 'COLLECTIONS' },
  { to: '/products/chaska-try-all-5', label: 'TRY ALL 5', isBadge: 'STARTER BOX' },
  { to: '/about', label: 'OUR STORY' },
  { to: '/b2b', label: 'B2B & GIFTS' },
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
    const onScroll = () => setScrolled(window.scrollY > 12)
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
      {/* ── LIVE RED MOVING ANNOUNCEMENT BANNER ────────────────────────── */}
      <LiveBanner />

      {/* ── MAIN NAVBAR ─────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-[#0C122C]/95 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#243373] shadow-2xs'
            : 'bg-[#0C122C] py-4 sm:py-4.5 border-b border-[#243373]/60'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
          
          {/* Logo */}
          <NavLink to="/" aria-label="CHASKA Home" className="group relative z-10 flex items-center">
            <ChaskaLogo className="h-6 sm:h-7 w-auto" showTagline />
          </NavLink>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-sans text-xs uppercase font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 py-1 hover-pop-subtle hover:-translate-y-0.5 ${
                    isActive
                      ? 'text-[#FF5400]'
                      : 'text-stone-700 dark:text-stone-300 hover:text-[#17245B] dark:hover:text-white'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.isBadge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[9px] text-[#FF5400] font-sans font-extrabold tracking-wide border border-[#FF5400]/20">
                    {link.isBadge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Search + Stash Cart + Mobile Hamburger */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">

            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search snacks"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-stone-200/80 dark:border-[#243373] bg-white dark:bg-[#131D4A] text-[#17245B] dark:text-stone-200 font-sans text-xs font-semibold tracking-wide hover:border-stone-400 dark:hover:border-indigo-400 transition-all shadow-2xs cursor-pointer hover-pop-subtle hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-xs">🔍</span>
              <span className="hidden sm:inline">SEARCH</span>
              <span className="hidden xl:inline-block px-1.5 py-0.2 rounded bg-stone-100 dark:bg-[#1C2A6B] text-[10px] font-mono text-stone-500 dark:text-stone-300 border border-stone-200 dark:border-[#243373]">⌘K</span>
            </button>

            {/* Cart Trigger */}
            <motion.button
              type="button"
              onClick={openCart}
              aria-label={`Open stash with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              animate={lastAddedId && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.25 }}
              className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#17245B] dark:bg-white text-white dark:text-[#17245B] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#FF5400] dark:hover:bg-[#FF5400] dark:hover:text-white transition-all shadow-2xs cursor-pointer hover-pop-subtle hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>STASH</span>
              <span className="inline-flex h-4.5 min-w-[1.125rem] px-1 items-center justify-center rounded-full bg-[#FF5400] group-hover:bg-white text-white group-hover:text-[#17245B] text-[10px] font-mono font-bold tabular-nums transition-colors">
                {cartCount}
              </span>
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/80 dark:border-[#243373] bg-white dark:bg-[#131D4A] lg:hidden shadow-2xs hover:border-stone-400 dark:hover:border-indigo-400 transition-all cursor-pointer hover-pop-subtle hover:scale-105 active:scale-95"
            >
              <div className="relative w-4 h-3 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-[#17245B] dark:bg-white rounded-full transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
                <span className={`h-0.5 w-full bg-[#17245B] dark:bg-white rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-0.5 w-full bg-[#17245B] dark:bg-white rounded-full transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
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
              className="fixed inset-x-0 top-[84px] z-40 bg-[#0C122C] border-b border-[#243373] shadow-xl lg:hidden rounded-b-3xl overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-6 space-y-6">
                
                {/* Mobile Search Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      if (onOpenSearch) onOpenSearch()
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] text-[#17245B] dark:text-stone-200 font-sans text-xs font-semibold shadow-2xs hover:border-stone-400 dark:hover:border-indigo-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>🔍</span>
                      <span>SEARCH FLAVOURS &amp; BOXES</span>
                    </span>
                    <span className="text-[#FF5400] font-bold">➔</span>
                  </button>
                </div>

                <ul className="space-y-3">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.to} className="border-b border-stone-200/50 dark:border-[#243373]/60 pb-2.5">
                      <NavLink
                        to={link.to}
                        className="flex items-center justify-between font-display text-xl font-bold text-[#17245B] dark:text-white hover:text-[#FF5400] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span>{link.label}</span>
                          {link.isBadge && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[9px] text-[#FF5400] font-sans font-extrabold tracking-wide border border-[#FF5400]/20">
                              {link.isBadge}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-stone-400 dark:text-stone-400">0{i + 1}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-stone-200/50 dark:border-[#243373] space-y-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    HELP &amp; POLICIES
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {SECONDARY_MOBILE_LINKS.map((sLink) => (
                      <NavLink
                        key={sLink.to}
                        to={sLink.to}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] font-sans text-xs font-medium text-[#17245B] dark:text-stone-300 hover:text-[#FF5400] text-center shadow-2xs transition-colors"
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
