import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { setSmoothScrollPaused } from '../lib/smoothScroll'
import { EASE } from './Motion'

const NAV_LINKS = [
  { to: '/matchas', label: 'Matcha Powder' },
  { to: '/matcha-kits', label: 'Matcha Kits' },
  { to: '/gift-hampers', label: 'Gift Hampers' },
  { to: '/our-story', label: 'Our Story' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count: cartCount, openCart, lastAddedId } = useCart()
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-[#F8F5EB]/90 backdrop-blur-xl border-b border-[#232E1E]/12 shadow-sm'
          : 'bg-[#E9E7D0]/70 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[100rem] items-center justify-between px-6 py-5 sm:px-10">
        <NavLink to="/" aria-label="Drink Yojo — home" className="relative z-10">
          <motion.div
            aria-hidden="true"
            className="flex items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="block font-display text-2xl uppercase leading-none tracking-tight text-[#232E1E] font-bold">
              Drink Yōjō
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[0.65rem] font-mono font-bold uppercase tracking-widest text-[#4E6B3E] bg-[#C4D2B0]/40 border border-[#4E6B3E]/20 rounded-full">
              Uji Matcha
            </span>
          </motion.div>
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.to}
              initial={reduceMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.055, ease: EASE }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `link-draw font-mono text-spec uppercase tracking-widest ${
                    isActive ? 'text-[#4E6B3E] font-bold' : 'text-[#232E1E] hover:text-[#4E6B3E]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="relative z-10 flex items-center gap-6"
          initial={reduceMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
        >
          <motion.button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            animate={lastAddedId && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#4E6B3E] text-[#F8F5EB] font-mono text-spec uppercase tracking-widest shadow-md hover:bg-[#232E1E] transition-all duration-300"
          >
            <span>Cart</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F8F5EB] text-[#232E1E] text-[0.7rem] font-bold tabular-nums">
              {cartCount}
            </span>
          </motion.button>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#232E1E]/20 bg-[#F8F5EB] lg:hidden"
          >
            <span
              className={`h-0.5 w-4 bg-[#232E1E] transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'
              }`}
            />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 top-[73px] z-40 bg-[#F8F5EB]/98 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Primary" className="flex h-full flex-col justify-between px-6 pb-12 pt-8">
              <ul className="space-y-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.4, ease: EASE }}
                    className="border-b border-[#232E1E]/10 pb-4"
                  >
                    <NavLink
                      to={link.to}
                      className="flex items-center justify-between font-display text-3xl text-[#232E1E]"
                    >
                      {link.label}
                      <span className="index-num text-lg">{String(i + 1).padStart(2, '0')}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="p-6 glass-panel rounded-lg">
                <p className="spec text-[#4E6B3E] mb-2">Single-Region Uji Matcha</p>
                <p className="font-serif text-lg italic text-[#232E1E]">
                  Stone-ground in Uji, Kyoto. Enjoyed on your kitchen counter in ten seconds.
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
