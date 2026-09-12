import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { MakhanaSymbol } from '../components/MakhanaGraphic'

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-[#F5EEDD] px-6 py-24 sm:px-12 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <MakhanaSymbol className="w-16 h-16 mb-6 text-[#17245B]" />
        <span className="font-mono text-xs font-bold text-[#E2AE35] uppercase tracking-widest">404 &middot; PAGE NOT FOUND</span>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] mt-2">
          LOOKS LIKE THIS SNACK WENT MISSING.
        </h1>
        <p className="font-sans text-sm text-[#17245B]/80 max-w-md mt-3">
          The page you are looking for doesn't exist or has moved. Head back to the CHASKA stash.
        </p>
        <Link to="/" className="btn bg-[#E2AE35] text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD] mt-8 text-xs font-bold">
          BACK TO SNACKING ➔
        </Link>
      </section>
    </PageShell>
  )
}
