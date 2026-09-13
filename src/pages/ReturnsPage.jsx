import { NavLink } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function ReturnsPage() {
  return (
    <PageShell>
      <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#FAF7F2]">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4D15]/10 text-[#FF4D15] font-mono text-xs font-bold uppercase tracking-widest">
              100% CRUNCH GUARANTEE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#141416] tracking-tight">
              RETURNS &amp; REFUNDS
            </h1>
            <p className="font-mono text-xs text-[#141416]/60">
              Last updated: September 2026
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#141416]/10 space-y-8 shadow-sm text-[#141416] leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#141416] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D15]" />
                1. OUR GUARANTEE
              </h2>
              <p className="text-sm text-[#141416]/80 leading-relaxed pl-4">
                We stand 100% behind the freshness, crunch, and bold spice seasoning of every pouch we ship. Because roasted makhana is a consumable food item, we cannot accept returns of opened packages for safety and hygiene reasons. However, if your order arrives damaged, unsealed, or incorrect, we will replace it immediately without hassle.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#141416] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D15]" />
                2. DAMAGED OR INCORRECT SHIPMENTS
              </h2>
              <p className="text-sm text-[#141416]/80 leading-relaxed pl-4">
                If you receive an unsealed or damaged package, please email us at <strong>hello@chaskasnacks.com</strong> or WhatsApp our support line within 48 hours of delivery with a photo. We will immediately dispatch a free replacement box or refund your original payment method.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#141416] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D15]" />
                3. REFUND TIMELINES
              </h2>
              <p className="text-sm text-[#141416]/80 leading-relaxed pl-4">
                Approved refunds are initiated within 24–48 hours. Depending on your bank or UPI provider, the credited amount will reflect in your account within 3 to 5 business days.
              </p>
            </section>
          </div>

          <div className="text-center">
            <NavLink to="/contact" className="btn bg-[#141416] text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full hover:bg-[#FF4D15] transition-colors">
              TALK TO OUR TEAM ➔
            </NavLink>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
