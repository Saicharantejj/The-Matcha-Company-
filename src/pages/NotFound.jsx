import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { MakhanaSymbol } from '../components/MakhanaGraphic'

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-[#FAF7F2] px-6 py-28 sm:px-12 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <MakhanaSymbol className="w-16 h-16 mb-6 text-[#FF4D15]" />
        <span className="font-mono text-xs font-bold text-[#FF4D15] uppercase tracking-widest bg-[#FF4D15]/10 px-3 py-1 rounded-full">
          404 &middot; PAGE NOT FOUND
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#141416] mt-4 tracking-tight">
          LOOKS LIKE THIS SNACK WENT MISSING.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#141416]/70 max-w-md mt-3 leading-relaxed">
          The page you are looking for doesn't exist or has moved. Head back to explore our roasted makhana flavours.
        </p>
        <Link 
          to="/shop" 
          className="btn bg-[#FF4D15] text-white hover:bg-[#E03D07] mt-8 px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
        >
          BACK TO SNACKING ➔
        </Link>
      </section>
    </PageShell>
  )
}
