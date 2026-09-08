import { NavLink } from 'react-router-dom'

export default function ShippingPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F8EECB]">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#31603D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-widest">
            LOGISTICS &amp; DELIVERY
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#6E433D] tracking-tight">
            SHIPPING POLICY
          </h1>
          <p className="font-mono text-xs text-[#6E433D]/80">
            Last updated: September 2026
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#6E433D]/15 space-y-8 shadow-md text-[#6E433D] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase text-[#D23D2D]">
              1. FREE SHIPPING THRESHOLD
            </h2>
            <p className="text-sm">
              We offer <strong>Free Standard Shipping</strong> across India on all orders over <strong>₹499</strong>. For orders totaling ₹499 or less, a flat shipping fee of <strong>₹49</strong> is applied at checkout to cover courier handling.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase text-[#D23D2D]">
              2. PROCESSING &amp; DISPATCH TIMELINES
            </h2>
            <p className="text-sm">
              All orders are packed and dispatched directly from our Bihar &amp; Noida roasting facilities within <strong>24 hours</strong> of placement (excluding Sundays and national holidays).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase text-[#D23D2D]">
              3. ESTIMATED DELIVERY TIMES
            </h2>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 Business Days</li>
              <li><strong>Tier 2 &amp; Tier 3 Cities:</strong> 3 to 5 Business Days</li>
              <li><strong>Rest of India &amp; North East:</strong> 4 to 6 Business Days</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold uppercase text-[#D23D2D]">
              4. LIVE ORDER TRACKING
            </h2>
            <p className="text-sm">
              Once your shipment leaves our facility, you will receive an automated SMS and WhatsApp alert containing your live tracking ID and courier link (Bluedart, Delhivery, or Xpressbees).
            </p>
          </section>
        </div>

        <div className="text-center">
          <NavLink to="/shop" className="btn bg-[#D23D2D]">
            BACK TO SHOP
          </NavLink>
        </div>
      </div>
    </main>
  )
}
