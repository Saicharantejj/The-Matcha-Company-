import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Marquee from './Marquee'
import logoWordmark from '../assets/logo-wordmark-ink.png'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/matchas', label: 'Our Matchas' },
  { to: '/diy-kits', label: 'DIY Kits' },
  { to: '/matcha-kits', label: 'Matcha Kits' },
  { to: '/our-story', label: 'Our Story' },
]

const TICKER_ITEMS = [
  'MATCHA, MINUS THE CEREMONY',
  'FIVE FLAVORS, SHIPPED NATIONWIDE',
  'STONE-GROUND, SOURCED FROM UJI',
  'ONE SACHET, ONE MINUTE',
  'NO WHISK REQUIRED',
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count: cartCount, openCart, lastAddedId } = useCart()

  return (
    <header className="sticky top-0 z-50">
      <Marquee items={TICKER_ITEMS} />
      <div className="border-b-2 border-ink bg-camel">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <NavLink to="/" aria-label="The Matcha Company — home" className="flex items-center">
            <img src={logoWordmark} alt="The Matcha Company" className="h-11 w-auto sm:h-14" />
          </NavLink>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive ? 'text-olive' : 'text-ink/70 hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative pb-1">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-olive"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              animate={lastAddedId ? { scale: [1, 1.09, 1] } : { scale: 1 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="border border-ink bg-olive px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#4C382C]"
              style={{ boxShadow: '3px 3px 0px 0px #4C382C' }}
            >
              Cart (<span className="tabular-nums">{cartCount}</span>)
            </motion.button>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-ink bg-card lg:hidden"
            >
              <span className={`h-[1.5px] w-5 bg-ink transition-transform ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`h-[1.5px] w-5 bg-ink transition-transform ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-ink bg-card lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `border-b border-ink/10 py-2.5 font-mono text-xs uppercase tracking-widest ${
                        isActive ? 'text-olive' : 'text-ink/70'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
