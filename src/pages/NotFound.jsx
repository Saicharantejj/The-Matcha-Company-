import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { MakhanaSymbol } from '../components/MakhanaGraphic'

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-[#FAF8F5] px-6 py-28 sm:px-12 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <MakhanaSymbol className="w-16 h-16 mb-6 text-[#141414]" color="#141414" />
        <span className="font-mono text-xs font-bold text-[#FF5400] uppercase tracking-widest bg-[#FF5400]/10 px-3.5 py-1 rounded-full">
          404 &middot; PAGE NOT FOUND
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#141414] mt-4 tracking-tight">
          LOOKS LIKE THIS SNACK WENT MISSING.
        </h1>
        <p className="font-sans text-sm sm:text-base text-stone-600 max-w-md mt-3 leading-relaxed font-normal">
          The page you are looking for doesn't exist or has moved. Head back to explore our roasted makhana flavours.
        </p>
        <Link 
          to="/shop" 
          className="btn mt-8 px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm"
        >
          BACK TO SNACKING ➔
        </Link>
      </section>
    </PageShell>
  )
}
