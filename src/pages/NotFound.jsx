import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { MakhanaSymbol } from '../components/MakhanaGraphic'

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-[#F8EECB] px-6 py-24 sm:px-12 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <MakhanaSymbol className="w-16 h-16 mb-6 text-[#6E433D]" />
        <span className="font-mono text-xs font-bold text-[#D23D2D] uppercase tracking-widest">404 &middot; PAGE NOT FOUND</span>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#6E433D] mt-2">
          LOOKS LIKE THIS SNACK WENT MISSING.
        </h1>
        <p className="font-sans text-sm text-[#6E433D]/80 max-w-md mt-3">
          The page you are looking for doesn't exist or has moved. Head back to the CHASKA stash.
        </p>
        <Link to="/" className="btn bg-[#D23D2D] hover:bg-[#6E433D] mt-8 text-xs font-bold">
          BACK TO SNACKING ➔
        </Link>
      </section>
    </PageShell>
  )
}
