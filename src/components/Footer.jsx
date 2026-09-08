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
              JOIN THE CRUNCH CLUB
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get secret flavor drops &amp; 15% off your first stash box.
            </h2>
          </div>

          <div className="lg:col-span-6 flex items-center">
            {submitted ? (
              <div className="p-4 bg-white/10 border border-[#F8EECB]/20 rounded-2xl w-full text-center">
                <p className="font-mono text-sm text-[#F5C065] font-bold">Welcome to the club! Check your email for your 15% code.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-[#F8EECB]/20 rounded-full px-5 py-3.5 text-sm text-white placeholder-[#F8EECB]/60 focus:outline-none focus:border-[#F5C065] transition-colors"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#31603D] transition-colors shadow-sm"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-[#F8EECB]/15 text-xs font-mono text-[#F8EECB]/80">
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">SHOP MAKHANA</p>
            <ul className="space-y-2">
              <li><NavLink to="/shop" className="hover:text-white transition-colors">All Flavors</NavLink></li>
              <li><NavLink to="/shop?flavor=spicy" className="hover:text-white transition-colors">Peri Peri Fiesta</NavLink></li>
              <li><NavLink to="/shop?flavor=mint" className="hover:text-white transition-colors">Pudina &amp; Lime</NavLink></li>
              <li><NavLink to="/build-box" className="hover:text-white transition-colors">Build Your Box</NavLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">ABOUT</p>
            <ul className="space-y-2">
              <li><NavLink to="/our-story" className="hover:text-white transition-colors">Our Story</NavLink></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Why The Crunch</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">SUPPORT</p>
            <ul className="space-y-2">
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping &amp; Returns</a></li>
              <li><a href="mailto:hello@themakhanacompany.com" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-[#F5C065]">COMMUNITY</p>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
            </ul>
          </div>
        </div>

        {/* Minimal Wordmark */}
        <div className="py-12 border-b border-[#F8EECB]/15 text-center">
          <h1 className="font-display text-[10vw] font-black uppercase leading-none tracking-tighter text-[#F8EECB]/90 select-none">
            THE MAKHANA CO.
          </h1>
        </div>

        {/* Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs font-mono text-[#F8EECB]/70 gap-4">
          <p>© {new Date().getFullYear()} THE MAKHANA COMPANY. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
