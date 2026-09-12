import { NavLink } from 'react-router-dom'

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F5EEDD]">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#17245B] text-[#F5EEDD] font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
            TERMS &amp; CONDITIONS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] tracking-tight">
            TERMS OF SERVICE
          </h1>
          <p className="font-mono text-xs text-[#17245B]/80">
            Last updated: September 2026
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#17245B]/15 space-y-6 shadow-md text-[#17245B] text-sm leading-relaxed">
          <p>
            Welcome to <strong>CHASKA</strong>. By accessing or purchasing from our store, you agree to be bound by these terms.
          </p>
          <h2 className="font-display text-lg font-bold text-[#E2AE35]">PRODUCT INFORMATION</h2>
          <p>
            We strive to display our product prices, pack sizes, ingredients, and nutritional specifications accurately. Prices and discounts are subject to change without prior notice.
          </p>
          <h2 className="font-display text-lg font-bold text-[#E2AE35]">INTELLECTUAL PROPERTY</h2>
          <p>
            All brand logos, photography, visual elements, graphics, and text content belong strictly to CHASKA.
          </p>
        </div>

        <div className="text-center">
          <NavLink to="/" className="btn bg-[#E2AE35] text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD]">BACK TO HOME</NavLink>
        </div>
      </div>
    </main>
  )
}
