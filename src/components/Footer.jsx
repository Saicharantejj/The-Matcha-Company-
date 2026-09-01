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
  { to: '/matchas', label: 'Sachets' },
  { to: '/matcha-kits', label: 'Bundles' },
  { to: '/diy-kits', label: 'Recipes' },
  { to: '/our-story', label: 'Uji' },
]

/**
 * The footer is the last impression, so it gets the wordmark at full size and
 * very little else — three short columns on hairlines and a sign-up that is a
 * ruled line rather than a boxed input. The wordmark now sits at the bottom
 * where it closes the page, instead of at the top where it competed with the
 * closing section above it.
 */
export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  // Honeypot, same trick as the checkout form.
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
    // The API accepted the subscription. Deliberately no email is sent to Meta.
  }

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[100rem] px-5 pb-10 pt-20 sm:px-10 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <h2 className="spec text-linen">How it works</h2>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-linen">
              Online only. Order any flavour and it ships to your door &mdash; one sachet, stirred
              into milk or water, no whisk anywhere in the process.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="spec text-linen">Explore</h2>
            <ul className="mt-5">
              {EXPLORE.map((link) => (
                <li key={link.to} className="rule border-linen/30 first:border-t-0">
                  <Link
                    to={link.to}
                    className="block py-2.5 font-body text-sm text-cream transition-colors duration-300 hover:text-linen"
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
              <div className="flex items-center gap-4 border-b border-linen pb-3">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent font-body text-sm text-cream placeholder:text-linen focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="shrink-0 font-mono text-spec uppercase text-cream transition-colors duration-300 hover:text-linen disabled:opacity-60"
                >
                  {sending ? 'Joining…' : 'Join'}
                </button>
              </div>

              {/* Honeypot: off-screen, unfocusable, never announced. */}
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
            <p aria-live="polite" className="mt-3 font-body text-sm text-linen">
              {error || (submitted ? "You're on the list." : 'New flavours and nothing else.')}
            </p>
          </div>
        </div>

        <Reveal className="mt-24">
          {/* Decorative: the company name is already announced in the
              copyright line below, so this closing mark is not read twice. */}
          <p
            aria-hidden="true"
            className="font-display leading-[0.82] tracking-display text-cream"
            style={{ fontSize: 'clamp(2.5rem, 16vw, 18rem)' }}
          >
            <span className="block">Drink</span>
            <span className="block">Yojo</span>
          </p>
        </Reveal>

        <div className="rule mt-10 flex flex-col gap-4 border-linen/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec text-linen">
            &copy; {new Date().getFullYear()} Drink Yojo
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-spec uppercase text-linen transition-colors duration-300 hover:text-cream"
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
