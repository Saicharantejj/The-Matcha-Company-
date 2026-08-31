import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Reveal, { Rise } from '../components/Motion'

const ELSEWHERE = [
  { to: '/matchas', label: 'Every sachet we make' },
  { to: '/matcha-kits', label: 'Boxes and bundles' },
  { to: '/diy-kits', label: 'Things to make with one sachet' },
  { to: '/our-story', label: 'The farm in Uji' },
]

/**
 * The page for an address that is not a page.
 *
 * It exists because the router used to match nothing and render nothing: a
 * mistyped or long-dead URL left the header and footer wrapped around an empty
 * middle, which reads as a broken site rather than as a wrong turn. This says
 * what happened and points at the four places worth going instead.
 */
export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-camel px-5 pb-24 pt-16 sm:px-10 sm:pb-32 sm:pt-24">
        <div className="mx-auto max-w-[100rem]">
          <p className="spec text-olive">404 &middot; nothing at this address</p>
          <h1 className="mt-6 max-w-4xl font-display text-major tracking-display">
            <Rise delay={0.05}>That page has</Rise>
            <Rise delay={0.15}>steeped away.</Rise>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl font-serif text-lede italic text-bark">
              Either the address was mistyped or we moved something without leaving a
              forwarding note. The rest of the site is where it was.
            </p>
          </Reveal>

          <ul className="mt-14 max-w-2xl">
            {ELSEWHERE.map((item, i) => (
              <li key={item.to} className="rule first:border-t-0">
                <Link to={item.to} className="group flex items-baseline gap-5 py-6">
                  <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-minor tracking-display transition-colors duration-300 group-hover:text-olive">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link to="/" className="btn">Back to the front</Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
