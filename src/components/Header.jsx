import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import logoWordmark from '../assets/logo-wordmark-ink.png'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { to: '/matchas', label: 'Sachets' },
  { to: '/matcha-kits', label: 'Bundles' },
  { to: '/diy-kits', label: 'Recipes' },
  { to: '/our-story', label: 'Uji' },
]

/**
 * Site chrome.
 *
 * Two things went. The scrolling ticker that used to sit above the bar — a
 * strip of shouting capitals in the first 30px of every page — and the cart
 * button's offset shadow, which made the most utilitarian control on the site
 * also the loudest thing in the header.
 *
 * What replaced them: the bar is transparent over the top of a page and only
 * draws its paper and its hairline once you have scrolled past the fold, so the
 * landing page opens on an uninterrupted image. Navigation is set small and
 * wide-tracked, and hover is an underline drawn in from the left rather than a
 * colour change.
 *
 * Mobile gets a composed full-screen panel rather than the old squeezed
 * dropdown: the same four destinations set large enough to be the page.
 */
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

  // A route change should never leave the panel hanging open behind the new page.
  useEffect(() => setMenuOpen(false), [pathname])

  // The panel takes over the screen, so the page underneath must not scroll.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 bg-camel transition-colors duration-500 ${
        scrolled || menuOpen ? 'border-b border-ink' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-5 sm:px-10">
        <NavLink to="/" aria-label="The Matcha Company — home" className="relative z-10">
          <img
            src={logoWordmark}
            alt="The Matcha Company"
            width="220"
            height="56"
            className="h-8 w-auto sm:h-9"
          />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `link-draw font-mono text-spec uppercase ${isActive ? 'text-olive' : 'text-cocoa'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-6">
          <motion.button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            animate={lastAddedId && !reduceMotion ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="link-draw font-mono text-spec uppercase"
          >
            Cart <span className="tabular-nums">({cartCount})</span>
          </motion.button>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-6 w-6 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-px w-5 bg-cocoa transition-transform duration-300 ${
                menuOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-5 bg-cocoa transition-transform duration-300 ${
                menuOpen ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[73px] z-40 bg-camel lg:hidden"
          >
            <nav aria-label="Primary" className="flex h-full flex-col justify-between px-5 pb-12 pt-8">
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rule py-5 first:border-t-0"
                  >
                    <NavLink
                      to={link.to}
                      className="flex items-baseline justify-between font-display text-minor tracking-display"
                    >
                      {link.label}
                      <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <p className="font-serif text-lede italic text-bark">
                Stone-ground in Uji. Opened at your kitchen counter.
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
