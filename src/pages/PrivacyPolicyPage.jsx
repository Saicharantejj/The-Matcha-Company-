import { NavLink } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F8EECB]">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#6E433D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-widest">
            YOUR DATA &amp; PRIVACY
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#6E433D] tracking-tight">
            PRIVACY POLICY
          </h1>
          <p className="font-mono text-xs text-[#6E433D]/80">
            Last updated: September 2026
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#6E433D]/15 space-y-6 shadow-md text-[#6E433D] text-sm leading-relaxed">
          <p>
            At <strong>CHASKA</strong>, we value your privacy. We collect basic customer information (name, address, phone number, email) solely for fulfilling orders and communicating shipping updates.
          </p>
          <h2 className="font-display text-lg font-bold text-[#D23D2D]">DATA PROTECTION</h2>
          <p>
            We do not sell, rent, or lease your personal information to third parties. Payments are processed securely via SSL encrypted payment gateways.
          </p>
          <h2 className="font-display text-lg font-bold text-[#D23D2D]">COOKIES</h2>
          <p>
            We use essential local browser cookies to store your shopping cart preferences and stash items so you can resume your session seamlessly.
          </p>
        </div>

        <div className="text-center">
          <NavLink to="/" className="btn bg-[#D23D2D]">BACK TO HOME</NavLink>
        </div>
      </div>
    </main>
  )
}
