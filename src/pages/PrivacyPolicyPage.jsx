import { NavLink } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#FAF8F5] dark:bg-[#0C0C0C] transition-colors duration-300">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5400]/10 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest">
              YOUR DATA &amp; PRIVACY
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#141414] dark:text-white tracking-tight">
              PRIVACY POLICY
            </h1>
            <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
              Last updated: September 2026
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-xs text-[#141414] dark:text-stone-100 text-sm leading-relaxed transition-colors duration-300">
            <p className="text-stone-600 dark:text-stone-300 font-normal">
              At <strong>CHASKA</strong>, we respect your privacy. We collect basic customer details (name, shipping address, phone number, and email) solely for the purpose of order processing, courier tracking, and customer support.
            </p>
            <h2 className="font-display text-base font-bold text-[#141414] dark:text-white uppercase tracking-wide">1. DATA PROTECTION &amp; SECURITY</h2>
            <p className="text-stone-600 dark:text-stone-300 font-normal">
              We never sell, rent, or lease your personal information. Payment transactions are handled directly through encrypted, PCI-DSS compliant Shopify gateways. We do not store sensitive payment card details on our servers.
            </p>
            <h2 className="font-display text-base font-bold text-[#141414] dark:text-white uppercase tracking-wide">2. COOKIES &amp; LOCAL SESSIONS</h2>
            <p className="text-stone-600 dark:text-stone-300 font-normal">
              We use secure session cookies to remember items in your stash, preserve your active cart across visits, and ensure a smooth checkout experience.
            </p>
          </div>

          <div className="text-center">
            <NavLink to="/" className="btn px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm">
              BACK TO HOME ➔
            </NavLink>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
