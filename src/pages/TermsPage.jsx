import { NavLink } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function TermsPage() {
  return (
    <PageShell>
      <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F5EEDD]">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#17245B] text-[#E2AE35] font-mono text-xs font-black uppercase tracking-widest border border-[#E2AE35]/40 shadow-xs">
              TERMS &amp; CONDITIONS
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] tracking-tight">
              TERMS OF SERVICE
            </h1>
            <p className="font-mono text-xs text-[#17245B]/60">
              Last updated: September 2026
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF6ED] border border-[#17245B]/15 space-y-6 shadow-sm text-[#17245B] text-sm leading-relaxed">
            <p className="text-[#17245B]/85">
              Welcome to <strong>CHASKA</strong>. By accessing our online store or placing an order, you agree to these terms of service and our related fulfillment policies.
            </p>
            <h2 className="font-display text-base font-bold text-[#17245B] uppercase tracking-wide">1. PRICING &amp; PRODUCT DETAILS</h2>
            <p className="text-[#17245B]/85">
              We strive to keep all product prices, pack sizes, ingredients, and nutritional specifications accurate. In the event of an inadvertent technical discrepancy, we reserve the right to rectify pricing prior to shipment.
            </p>
            <h2 className="font-display text-base font-bold text-[#17245B] uppercase tracking-wide">2. INTELLECTUAL PROPERTY</h2>
            <p className="text-[#17245B]/85">
              All brand visual assets, recipes, packaging designs, photography, copy, and trademarks are the exclusive intellectual property of CHASKA.
            </p>
          </div>

          <div className="text-center">
            <NavLink to="/" className="btn px-8 py-3.5 text-xs font-bold uppercase tracking-wider">
              BACK TO HOME ➔
            </NavLink>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
