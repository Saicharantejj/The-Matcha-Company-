import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { MakhanaSymbol } from '../components/MakhanaGraphic'

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-cream px-6 py-24 sm:px-12 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <MakhanaSymbol className="w-16 h-16 mb-6 text-charcoal" />
        <span className="font-mono text-xs font-medium text-muted uppercase tracking-widest">404 &middot; PAGE NOT FOUND</span>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-charcoal mt-2">
          PAGE NOT FOUND.
        </h1>
        <p className="font-body text-base text-muted max-w-md mt-3">
          The page you are looking for might have been moved or doesn't exist. Head back to our product catalogue.
        </p>
        <Link to="/" className="btn mt-8">
          RETURN HOME ➔
        </Link>
      </section>
    </PageShell>
  )
}
