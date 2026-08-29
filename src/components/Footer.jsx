import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import logoWordmark from '../assets/logo-wordmark-cream.png'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
]

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
    <footer className="border-t border-ink bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <img
            src={logoWordmark}
            alt="The Matcha Company"
            className="h-28 w-auto sm:h-40 lg:h-52"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-cream/20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cream">How It Works</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-cream/70">
              We're online only — order any flavor and it ships to your door.
              One sachet, stirred into milk or water. No whisk, no ceremony.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cream">Explore</h3>
            <ul className="mt-3 space-y-2 font-body text-sm text-cream/70">
              <li><Link to="/matchas" className="hover:text-cream">Our Matchas</Link></li>
              <li><Link to="/diy-kits" className="hover:text-cream">DIY Kits</Link></li>
              <li><Link to="/matcha-kits" className="hover:text-cream">Matcha Kits</Link></li>
              <li><Link to="/our-story" className="hover:text-cream">Our Story</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cream">Stay In The Loop</h3>
            <p className="mt-3 font-body text-sm text-cream/70">
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
                className="whitespace-nowrap border-l border-cream/40 bg-cream px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-camel"
              >
                Join
              </button>
            </form>
            {submitted && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-cream">
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
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] uppercase tracking-widest text-cream/60 transition-colors hover:text-cream"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
