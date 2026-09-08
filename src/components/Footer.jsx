import { useState } from 'react'
import { NavLink } from 'react-router-dom'

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
    <footer className="bg-[#6E433D] text-[#F8EECB] pt-20 pb-12 border-t-4 border-[#D23D2D] overflow-hidden">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        {/* Top Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F8EECB]/15">
          <div className="lg:col-span-6 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5C065]">
              GET A LITTLE CHASKA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get secret flavor drops &amp; 15% off your first stash box.
            </h2>
          </div>

          <div className="lg:col-span-6 flex items-center">
            {submitted ? (
              <div className="p-5 bg-white/10 border border-[#F8EECB]/20 rounded-2xl w-full text-center">
                <p className="font-mono text-sm text-[#F5C065] font-bold">Welcome to the club! Check your email for your 15% discount code.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-[#F8EECB]/20 rounded-full px-6 py-4 text-sm text-white placeholder-[#F8EECB]/60 focus:outline-none focus:border-[#F5C065] transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#31603D] transition-colors shadow-sm"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 border-b border-[#F8EECB]/15 text-xs font-mono text-[#F8EECB]/80">
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">SHOP</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/shop" className="hover:text-white transition-colors">All Makhana</NavLink></li>
              <li><NavLink to="/shop" className="hover:text-white transition-colors">Bestsellers</NavLink></li>
              <li><NavLink to="/build-your-box" className="hover:text-white transition-colors">Build Your Box</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">ABOUT</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/about" className="hover:text-white transition-colors">Our Story</NavLink></li>
              <li><NavLink to="/about#why-chaska" className="hover:text-white transition-colors">Why Chaska</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-white transition-colors">Contact Us</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">HELP</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/faq" className="hover:text-white transition-colors">FAQ</NavLink></li>
              <li><NavLink to="/shipping" className="hover:text-white transition-colors">Shipping Policy</NavLink></li>
              <li><NavLink to="/returns" className="hover:text-white transition-colors">Return Policy</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">LEGAL</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-white transition-colors">Terms of Service</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">SOCIAL</p>
            <ul className="space-y-2.5">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram ↗</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Minimal Wordmark */}
        <div className="py-12 border-b border-[#F8EECB]/15 text-center">
          <NavLink to="/" className="inline-block group">
            <h1 className="font-display text-[14vw] font-black uppercase leading-none tracking-tighter text-[#F8EECB]/90 group-hover:text-white transition-colors select-none">
              CHASKA
            </h1>
          </NavLink>
        </div>

        {/* Legal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs font-mono text-[#F8EECB]/70 gap-4">
          <p>© {new Date().getFullYear()} CHASKA. All rights reserved.</p>
          <div className="flex gap-6">
            <NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms" className="hover:text-white transition-colors">Terms of Service</NavLink>
          </div>
        </div>

      </div>
    </footer>
  )
}
