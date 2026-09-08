import { NavLink } from 'react-router-dom'

export default function ReturnsPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F8EECB]">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-widest">
            100% CRUNCH GUARANTEE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#6E433D] tracking-tight">
            RETURNS &amp; REFUNDS
          </h1>
          <p className="font-mono text-xs text-[#6E433D]/80">
            Last updated: September 2026
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#6E433D]/15 space-y-8 shadow-md text-[#6E433D] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase text-[#D23D2D]">
              1. OUR GUARANTEE
            </h2>
            <p className="text-sm">
              We stand 100% behind the quality, freshness, and crunch of every pouch we ship. Because makhana is an edible food item, we cannot accept returns of opened pouches for safety reasons. However, if your order arrives damaged, unsealed, or incorrect, we will replace it immediately!
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase text-[#D23D2D]">
              2. DAMAGED OR INCORRECT SHIPMENTS
            </h2>
            <p className="text-sm">
              If you receive a package that is damaged or missing items, please email us at <strong>hello@themakhanacompany.com</strong> within 48 hours of delivery along with a photo of the package. We will issue a free replacement pack or a full refund to your original payment method.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase text-[#D23D2D]">
              3. REFUND TIMELINES
            </h2>
            <p className="text-sm">
              Approved refunds are processed within 48 hours. Depending on your bank, the credited amount will reflect in your UPI or card statement within 3 to 5 business days.
            </p>
          </section>
        </div>

        <div className="text-center">
          <NavLink to="/contact" className="btn bg-[#D23D2D]">
            CONTACT SUPPORT
          </NavLink>
        </div>
      </div>
    </main>
  )
}
