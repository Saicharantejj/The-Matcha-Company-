import { NavLink } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function ReturnsPage() {
  return (
    <PageShell>
      <main className="min-h-screen pt-4 sm:pt-6 pb-12 sm:pb-16 px-6 sm:px-12 bg-[#0C122C]">
        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5400]/10 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest">
              100% CRUNCH GUARANTEE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] dark:text-white tracking-normal">
              RETURNS &amp; REFUNDS
            </h1>
            <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
              Last updated: September 2026
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#131D4A] border border-[#243373] space-y-8 shadow-xs text-stone-100 leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
                1. OUR GUARANTEE
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-4 font-normal">
                We stand 100% behind the freshness, crunch, and bold spice seasoning of every pouch we ship. Because roasted makhana is a consumable food item, we cannot accept returns of opened packages for safety and hygiene reasons. However, if your order arrives damaged, unsealed, or incorrect, we will replace it immediately without hassle.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
                2. DAMAGED OR INCORRECT SHIPMENTS
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-4 font-normal">
                If you receive an unsealed or damaged package, please email us at <strong>snackchaska@gmail.com</strong> within 48 hours of delivery with a photo. We will immediately dispatch a free replacement box or refund your original payment method.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#17245B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400]" />
                3. REFUND TIMELINES
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-4 font-normal">
                Approved refunds are initiated within 24–48 hours. Depending on your bank or UPI provider, the credited amount will reflect in your account within 3 to 5 business days.
              </p>
            </section>
          </div>

          <div className="text-center">
            <NavLink to="/contact" className="btn px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm">
              TALK TO OUR TEAM ➔
            </NavLink>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
