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
    <footer className="bg-[#17245B] text-[#F5EEDD] pt-20 pb-12 border-t-4 border-[#E2AE35] overflow-hidden">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        {/* Top Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F5EEDD]/15">
          <div className="lg:col-span-6 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
              GET A LITTLE CHASKA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get secret flavor drops &amp; 15% off your first stash box.
            </h2>
          </div>

          <div className="lg:col-span-6 flex items-center">
            {submitted ? (
              <div className="p-5 bg-white/10 border border-[#F5EEDD]/20 rounded-2xl w-full text-center">
                <p className="font-mono text-sm text-[#E2AE35] font-bold">Welcome to the club! Check your email for your 15% discount code.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-[#F5EEDD]/20 rounded-full px-6 py-4 text-sm text-white placeholder-[#F5EEDD]/60 focus:outline-none focus:border-[#E2AE35] transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#A9223A] hover:text-[#F5EEDD] transition-colors shadow-sm"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 border-b border-[#F5EEDD]/15 text-xs font-mono text-[#F5EEDD]/80">
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#E2AE35]">SHOP</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/shop" className="hover:text-white transition-colors">All Makhana</NavLink></li>
              <li><NavLink to="/shop" className="hover:text-white transition-colors">Bestsellers</NavLink></li>
              <li><NavLink to="/build-your-box" className="hover:text-white transition-colors">Build Your Box</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#E2AE35]">ABOUT</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/about" className="hover:text-white transition-colors">Our Story</NavLink></li>
              <li><NavLink to="/about#why-chaska" className="hover:text-white transition-colors">Why Chaska</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-white transition-colors">Contact Us</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#E2AE35]">HELP</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/faq" className="hover:text-white transition-colors">FAQ</NavLink></li>
              <li><NavLink to="/shipping" className="hover:text-white transition-colors">Shipping Policy</NavLink></li>
              <li><NavLink to="/returns" className="hover:text-white transition-colors">Return Policy</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#E2AE35]">LEGAL</p>
            <ul className="space-y-2.5">
              <li><NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-white transition-colors">Terms of Service</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#E2AE35]">SOCIAL</p>
            <ul className="space-y-2.5">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram ↗</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Minimal Wordmark */}
        <div className="py-12 border-b border-[#F5EEDD]/15 text-center flex items-center justify-center">
          <NavLink to="/" className="inline-block group max-w-2xl w-full px-6">
            <ChaskaLogo className="w-full h-auto max-h-24 opacity-95 group-hover:opacity-100 transition-opacity" inverted color="#E2AE35" accentColor="#E2AE35" />
          </NavLink>
        </div>

        {/* Legal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs font-mono text-[#F5EEDD]/70 gap-4">
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

