import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ChaskaLogo from './ChaskaLogo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#141414] dark:bg-black text-[#FAF8F5] pt-16 sm:pt-20 pb-12 border-t border-stone-800 overflow-hidden transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Top Newsletter / Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800">
          <div className="lg:col-span-6 space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-2xs">
              GET THE CHASKA DROP
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              MAKHANA KO CHASKA LAGA DIYA.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-md font-normal leading-relaxed">
              Get secret flavour drops, early tasting invites &amp; 15% off your first stash order.
            </p>
          </div>

          <div className="lg:col-span-6 flex items-center">
            {submitted ? (
              <div className="p-4 bg-white/5 border border-white/15 rounded-2xl w-full text-center">
                <p className="font-sans text-xs text-[#FF5400] font-semibold">
                  ✓ Welcome to the stash club! Check your inbox for your 15% code.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#FF5400] transition-colors font-sans"
                />
                <button
                  type="submit"
                  className="btn-orange px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-stone-800 text-xs font-sans text-stone-400">
          {/* 1. SHOP */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-white">SHOP</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/shop" className="hover:text-[#FF5400] transition-colors">All Products</NavLink></li>
              <li><NavLink to="/collections/best-sellers" className="hover:text-[#FF5400] transition-colors">Best Sellers</NavLink></li>
              <li><NavLink to="/products/chaska-try-all-5" className="hover:text-[#FF5400] transition-colors">Try All 5 Box</NavLink></li>
              <li><NavLink to="/collections" className="hover:text-[#FF5400] transition-colors">Collections</NavLink></li>
            </ul>
          </div>

          {/* 2. ABOUT */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-white">ABOUT</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/about" className="hover:text-[#FF5400] transition-colors">Our Story</NavLink></li>
              <li><NavLink to="/b2b" className="hover:text-[#FF5400] transition-colors">B2B &amp; Corporate</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-[#FF5400] transition-colors">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* 3. HELP */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-white">HELP</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/faq" className="hover:text-[#FF5400] transition-colors">FAQ</NavLink></li>
              <li><NavLink to="/policies/shipping" className="hover:text-[#FF5400] transition-colors">Shipping Info</NavLink></li>
              <li><NavLink to="/policies/returns" className="hover:text-[#FF5400] transition-colors">Returns &amp; Refunds</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-[#FF5400] transition-colors">Customer Care</NavLink></li>
            </ul>
          </div>

          {/* 4. POLICIES */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-white">POLICIES</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/policies/privacy" className="hover:text-[#FF5400] transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/policies/terms" className="hover:text-[#FF5400] transition-colors">Terms of Service</NavLink></li>
              <li><NavLink to="/policies/shipping" className="hover:text-[#FF5400] transition-colors">Shipping Policy</NavLink></li>
            </ul>
          </div>

          {/* 5. CONNECT */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <p className="font-bold uppercase tracking-wider text-white">CONNECT</p>
            <ul className="space-y-2.5">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#FF5400] transition-colors">Instagram ↗</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#FF5400] transition-colors">Twitter / X ↗</a></li>
              <li className="pt-2 text-stone-300 text-[12px] font-sans font-medium">
                <a href="mailto:snackchaska@gmail.com" className="hover:text-[#FF5400] transition-colors">
                  snackchaska@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Wordmark Footer Banner */}
        <div className="py-10 border-b border-stone-800 text-center flex items-center justify-center">
          <NavLink to="/" className="inline-block group max-w-lg w-full px-4">
            <ChaskaLogo className="w-full h-auto max-h-16 opacity-80 group-hover:opacity-100 transition-opacity" inverted color="#FAF8F5" accentColor="#FF5400" />
          </NavLink>
        </div>

        {/* Legal Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs font-sans text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} CHASKA SNACKS. All rights reserved.</p>
          <div className="flex gap-4">
            <NavLink to="/policies/privacy" className="hover:text-white transition-colors">Privacy</NavLink>
            <NavLink to="/policies/terms" className="hover:text-white transition-colors">Terms</NavLink>
            <NavLink to="/policies/shipping" className="hover:text-white transition-colors">Shipping</NavLink>
          </div>
        </div>

      </div>
    </footer>
  )
}
