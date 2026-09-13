import { NavLink } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F5EEDD]">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#17245B] text-[#E2AE35] font-mono text-xs font-black uppercase tracking-widest border border-[#E2AE35]/40 shadow-xs">
              YOUR DATA &amp; PRIVACY
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] tracking-tight">
              PRIVACY POLICY
            </h1>
            <p className="font-mono text-xs text-[#17245B]/60">
              Last updated: September 2026
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF6ED] border border-[#17245B]/15 space-y-6 shadow-sm text-[#17245B] text-sm leading-relaxed">
            <p className="text-[#17245B]/85">
              At <strong>CHASKA</strong>, we respect your privacy. We collect basic customer details (name, shipping address, phone number, and email) solely for the purpose of order processing, courier tracking, and customer support.
            </p>
            <h2 className="font-display text-base font-bold text-[#17245B] uppercase tracking-wide">1. DATA PROTECTION &amp; SECURITY</h2>
            <p className="text-[#17245B]/85">
              We never sell, rent, or lease your personal information. Payment transactions are handled directly through encrypted, PCI-DSS compliant Shopify gateways. We do not store sensitive payment card details on our servers.
            </p>
            <h2 className="font-display text-base font-bold text-[#17245B] uppercase tracking-wide">2. COOKIES &amp; LOCAL SESSIONS</h2>
            <p className="text-[#17245B]/85">
              We use secure session cookies to remember items in your stash, preserve your active cart across visits, and ensure a smooth checkout experience.
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
