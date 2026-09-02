import { useRef, useState } from 'react'
import { subscribe, messageFor } from '../lib/api'
import { Link } from 'react-router-dom'
import Reveal from './Motion'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
]

const EXPLORE = [
  { to: '/matchas', label: 'Matcha Powder' },
  { to: '/matcha-kits', label: 'Matcha Kits' },
  { to: '/gift-hampers', label: 'Gift Hampers' },
  { to: '/our-story', label: 'Our Story' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [company, setCompany] = useState('')
  const submittingRef = useRef(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || submittingRef.current) return
    submittingRef.current = true
    setSending(true)
    setError(null)

    const result = await subscribe(email, company)

    setSending(false)
    submittingRef.current = false
    if (!result.ok) {
      setError(messageFor(result))
      return
    }
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="bg-ink text-cream border-t border-linen/10">
      <div className="mx-auto max-w-[100rem] px-5 pb-12 pt-24 sm:px-10 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <h2 className="spec text-linen">How it works</h2>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-linen/80">
              Online only. Order any flavour and it ships to your door &mdash; one sachet, stirred
              into milk or water, no whisk anywhere in the process.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="spec text-linen">Explore</h2>
            <ul className="mt-5">
              {EXPLORE.map((link) => (
                <li key={link.to} className="border-t border-linen/15 first:border-t-0">
                  <Link
                    to={link.to}
                    className="block py-3 font-body text-sm text-cream transition-colors duration-300 hover:text-linen"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="spec text-linen">One email a month</h2>
            <form onSubmit={handleSubmit} className="mt-5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-4 border-b border-linen/30 pb-3 transition-colors focus-within:border-linen">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent font-body text-sm text-cream placeholder:text-linen/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="shrink-0 font-mono text-spec uppercase text-cream transition-all duration-300 hover:text-linen disabled:opacity-60"
                >
                  {sending ? 'Joining…' : 'Join'}
                </button>
              </div>

              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="footer-company">Company</label>
                <input
                  id="footer-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </form>
            <p aria-live="polite" className="mt-3 font-body text-sm text-linen/70">
              {error || (submitted ? "You're on the list." : 'New flavours and nothing else.')}
            </p>
          </div>
        </div>

        <Reveal className="mt-28">
          <p
            aria-hidden="true"
            className="font-display leading-[0.8] tracking-display text-cream select-none opacity-95"
            style={{ fontSize: 'clamp(3rem, 17vw, 19rem)' }}
          >
            <span className="block">Drink</span>
            <span className="block">Yojo</span>
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 border-t border-linen/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec text-linen/60">
            &copy; {new Date().getFullYear()} Drink Yojo
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-spec uppercase text-linen/70 transition-colors duration-300 hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
