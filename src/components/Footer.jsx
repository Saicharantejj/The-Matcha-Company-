import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const SOCIALS = ['Instagram', 'TikTok', 'X / Twitter', 'Pinterest']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-chocolate bg-chocolate text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[13vw] leading-[0.9] tracking-display text-cream sm:text-6xl lg:text-8xl">
            The Matcha
            <br />
            Company
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-cream/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.05}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-matcha">Store Hours</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-cream/85">
              Open daily<br />
              7:00 AM – 6:00 PM<br />
              Kitchen closes 5:30 PM
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-matcha">Visit</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-cream/85">
              14th Cross, Indiranagar<br />
              Bengaluru, KA 560038<br />
              +91 98765 43210
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-matcha">Explore</h3>
            <ul className="mt-3 space-y-2 font-body text-sm text-cream/85">
              <li><Link to="/matchas" className="hover:text-matcha">Our Matchas</Link></li>
              <li><Link to="/diy-kits" className="hover:text-matcha">DIY Kits</Link></li>
              <li><Link to="/matcha-kits" className="hover:text-matcha">Matcha Kits</Link></li>
              <li><Link to="/our-story" className="hover:text-matcha">Our Story</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-matcha">Stay In The Loop</h3>
            <p className="mt-3 font-body text-sm text-cream/85">
              One email a month. No spam, just new drops.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex border border-cream/40">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-transparent px-3 py-2.5 font-mono text-xs text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                className="whitespace-nowrap border-l border-cream/40 bg-matcha px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-chocolate transition-colors hover:bg-cream"
              >
                Join
              </button>
            </form>
            {submitted && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-matcha">
                You're on the list.
              </p>
            )}
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/20 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
            © {new Date().getFullYear()} The Matcha Company. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-mono text-[10px] uppercase tracking-widest text-cream/70 hover:text-matcha"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
