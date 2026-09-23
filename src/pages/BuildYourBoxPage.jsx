import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import BuildYourBox from '../components/BuildYourBox'
import BenefitsGrid from '../components/BenefitsGrid'
import Reviews from '../components/Reviews'

export default function BuildYourBoxPage() {
  useEffect(() => {
    document.title = 'Customise Gift Pack | Build Your Box | CHASKA'
  }, [])

  return (
    <PageShell>
      {/* Breadcrumb strip */}
      <div className="bg-[#0C122C] border-b border-[#243373] px-4 py-3 sm:px-8 text-xs font-mono">
        <div className="mx-auto max-w-7xl flex items-center gap-2 text-stone-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#FF5400] font-bold">Custom Gift Pack</span>
        </div>
      </div>

      <BuildYourBox />
      <BenefitsGrid />
      <Reviews />
    </PageShell>
  )
}
