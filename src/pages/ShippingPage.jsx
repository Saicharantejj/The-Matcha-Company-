import { NavLink } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function ShippingPage() {
  return (
    <PageShell>
      <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#FAF7F2]">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4D15]/10 text-[#FF4D15] font-mono text-xs font-bold uppercase tracking-widest">
              LOGISTICS &amp; DELIVERY
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#141416] tracking-tight">
              SHIPPING POLICY
            </h1>
            <p className="font-mono text-xs text-[#141416]/60">
              Last updated: September 2026
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#141416]/10 space-y-8 shadow-sm text-[#141416] leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#141416] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D15]" />
                1. FREE SHIPPING THRESHOLD
              </h2>
              <p className="text-sm text-[#141416]/80 leading-relaxed pl-4">
                We offer <strong>Free Standard Shipping</strong> across India on all orders over <strong>₹499</strong>. For orders totaling ₹499 or less, a flat shipping fee of <strong>₹49</strong> is applied at checkout to cover courier handling.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#141416] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D15]" />
                2. PROCESSING &amp; DISPATCH TIMELINES
              </h2>
              <p className="text-sm text-[#141416]/80 leading-relaxed pl-4">
                All orders are packed and dispatched directly from our Bihar &amp; Noida roasting facilities within <strong>24 hours</strong> of placement (excluding Sundays and national holidays).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#141416] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D15]" />
                3. ESTIMATED DELIVERY TIMES
              </h2>
              <ul className="list-disc pl-9 text-sm text-[#141416]/80 space-y-2">
                <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 Business Days</li>
                <li><strong>Tier 2 &amp; Tier 3 Cities:</strong> 3 to 5 Business Days</li>
                <li><strong>Rest of India &amp; North East:</strong> 4 to 6 Business Days</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase text-[#141416] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D15]" />
                4. LIVE ORDER TRACKING
              </h2>
              <p className="text-sm text-[#141416]/80 leading-relaxed pl-4">
                Once your shipment leaves our facility, you will receive an automated SMS and WhatsApp alert containing your live tracking ID and courier link (Bluedart, Delhivery, or Xpressbees).
              </p>
            </section>
          </div>

          <div className="text-center">
            <NavLink to="/shop" className="btn bg-[#141416] text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full hover:bg-[#FF4D15] transition-colors">
              BACK TO SHOP ➔
            </NavLink>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
