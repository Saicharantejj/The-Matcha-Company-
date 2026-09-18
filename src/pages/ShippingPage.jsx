import { NavLink } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function ShippingPage() {
  return (
    <PageShell>
      <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#FAF8F5] dark:bg-[#0C122C] transition-colors duration-300">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5400]/10 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest">
              LOGISTICS &amp; DELIVERY
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] dark:text-white tracking-tight">
              SHIPPING POLICY
            </h1>
            <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
              Last updated: September 2026
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] space-y-8 shadow-xs text-[#17245B] dark:text-stone-100 leading-relaxed transition-colors duration-300">
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
                1. FREE SHIPPING THRESHOLD
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-4 font-normal">
                We offer <strong>Free Standard Shipping</strong> across India on all orders over <strong>₹499</strong>. For orders totaling ₹499 or less, a flat shipping fee of <strong>₹50</strong> is applied at checkout to cover courier handling.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
                2. PROCESSING &amp; DISPATCH TIMELINES
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-4 font-normal">
                All orders are packed and dispatched directly from our Bihar &amp; Noida roasting facilities within <strong>24 hours</strong> of placement (excluding Sundays and national holidays).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
                3. ESTIMATED DELIVERY TIMES
              </h2>
              <ul className="list-disc pl-9 text-sm text-stone-600 dark:text-stone-300 space-y-2 font-normal">
                <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 Business Days</li>
                <li><strong>Tier 2 &amp; Tier 3 Cities:</strong> 3 to 5 Business Days</li>
                <li><strong>Rest of India &amp; North East:</strong> 4 to 6 Business Days</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
                4. LIVE ORDER TRACKING
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-4 font-normal">
                Once your shipment leaves our facility, you will receive an automated SMS and WhatsApp alert containing your live tracking ID and courier link (Bluedart, Delhivery, or Xpressbees).
              </p>
            </section>
          </div>

          <div className="text-center">
            <NavLink to="/shop" className="btn px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm">
              BACK TO SHOP ➔
            </NavLink>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
