import { useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { photos } from '../data/photos'

export default function B2bPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Corporate Gifting',
    quantity: '50-200 units',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const useCases = [
    {
      icon: '🎁',
      title: 'CORPORATE GIFTING & DIWALI HAMPERS',
      desc: 'Bespoke gift boxes with custom branding, handwritten notes, and premium variety packs for team appreciation or client festivals.',
    },
    {
      icon: '☕',
      title: 'CAFES, BARS & BREWERIES',
      desc: 'The ultimate high-margin bar snack. Salty, smoky, and spicy makhana pops that pair cleanly with craft beers and artisan coffee.',
    },
    {
      icon: '💻',
      title: 'OFFICE PANTRIES & CO-WORKING',
      desc: 'Keep teams energized with guilt-free, non-greasy snacking that leaves keyboards clean. Monthly pantry subscriptions available.',
    },
    {
      icon: '🎉',
      title: 'WEDDINGS, EVENTS & PARTIES',
      desc: 'Custom mini-pouches and personalized welcome hampers for destination weddings, summits, and VIP event swag bags.',
    },
    {
      icon: '🏪',
      title: 'RETAIL & GOURMET STORES',
      desc: 'High sell-through FMCG snack displays with eye-catching packaging designed for modern Indian shelf appeal.',
    },
    {
      icon: '📦',
      title: 'CUSTOM PACK SIZES & BULK ORDERS',
      desc: 'Direct dispatch from our Bihar roasting facilities in food-grade bulk bags or custom branded packaging.',
    },
  ]

  return (
    <PageShell>
      {/* ── B2B HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative bg-[#17245B] text-[#F5EEDD] px-6 py-20 sm:px-12 sm:py-24 border-b border-[#F5EEDD]/15 overflow-hidden">
        <div className="mx-auto max-w-[96rem] grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold uppercase tracking-widest">
              ⚡ CORPORATE, WHOLESALE &amp; BULK
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]">
              UPGRADE YOUR <br />
              <span className="text-[#E2AE35]">SNACK OFFERING.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#F5EEDD]/90 leading-relaxed max-w-xl font-medium">
              From premium festive employee gift boxes to high-margin cafe snack counters and office pantries — bring the addictive crunch of CHASKA to your business.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#b2b-form"
                className="btn bg-[#E2AE35] text-[#17245B] hover:bg-white text-xs font-bold shadow-md"
              >
                REQUEST A B2B QUOTE ➔
              </a>
              <a
                href="https://wa.me/919999999999?text=Hi%20CHASKA%20Team%2C%20I%20am%20interested%20in%20a%20B2B%20%2F%20bulk%20order."
                target="_blank"
                rel="noreferrer"
                className="btn-outline text-[#F5EEDD] border-white/30 hover:bg-white/10 text-xs font-bold"
              >
                WHATSAPP B2B DESK
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#F5EEDD]/20 shadow-2xl bg-white/5 p-2">
              <img
                src={photos.comingSoonPoster.src}
                alt="CHASKA B2B Bulk Jars and Pouches"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES & TIERS ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F5EEDD] border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
              WHERE CHASKA SHINES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B]">
              TAILORED FOR EVERY BUSINESS NEED
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="p-8 rounded-3xl bg-white border border-[#17245B]/12 shadow-sm space-y-3 hover:shadow-md hover:border-[#E2AE35] transition-all"
              >
                <span className="text-3xl block">{uc.icon}</span>
                <h3 className="font-display text-base font-bold uppercase text-[#17245B]">
                  {uc.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#17245B]/80 leading-relaxed font-medium">
                  {uc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── B2B INQUIRY FORM ─────────────────────────────────────────────── */}
      <section id="b2b-form" className="py-20 bg-white border-b border-[#17245B]/15">
        <div className="mx-auto max-w-4xl px-6 sm:px-12">
          <div className="p-8 sm:p-14 rounded-[2.5rem] bg-[#FAF6ED] border border-[#17245B]/15 shadow-xl space-y-8">
            <div className="space-y-3 text-center max-w-xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                GET A FAST B2B PROPOSAL
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#17245B]">
                REQUEST A BULK QUOTE
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#17245B]/80 font-medium">
                Our corporate team responds within 4 business hours with custom pricing, samples, and logistics timelines.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-[#17245B] text-[#F5EEDD] text-center space-y-4">
                <span className="text-4xl block">🍿</span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#E2AE35]">
                  Quote Request Received!
                </h3>
                <p className="font-sans text-sm text-[#F5EEDD]/90 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong> from <strong>{formData.company}</strong>. Our business manager will reach out to <strong>{formData.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#17245B]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#17245B]/20 rounded-2xl px-5 py-3.5 text-sm text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#17245B]">
                      Company / Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Tech / Cafe Blue"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white border border-[#17245B]/20 rounded-2xl px-5 py-3.5 text-sm text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#17245B]">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#17245B]/20 rounded-2xl px-5 py-3.5 text-sm text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#17245B]">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#17245B]/20 rounded-2xl px-5 py-3.5 text-sm text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#17245B]">
                      Requirement Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white border border-[#17245B]/20 rounded-2xl px-5 py-3.5 text-sm text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
                    >
                      <option>Corporate Gifting &amp; Hampers</option>
                      <option>Cafe / Bar / Brewery Supply</option>
                      <option>Office Pantry Subscription</option>
                      <option>Wedding &amp; Event Favors</option>
                      <option>Retail Store Distribution</option>
                      <option>Custom Bulk Makhana</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#17245B]">
                      Estimated Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-white border border-[#17245B]/20 rounded-2xl px-5 py-3.5 text-sm text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
                    >
                      <option>50 – 200 units</option>
                      <option>200 – 500 units</option>
                      <option>500 – 2,000 units</option>
                      <option>2,000+ units</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold uppercase text-[#17245B]">
                    Project Details / Specific Flavors or Deadlines
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your event, delivery date, custom branding needs, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white border border-[#17245B]/20 rounded-2xl p-5 text-sm text-[#17245B] focus:outline-none focus:border-[#E2AE35]"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="btn bg-[#E2AE35] text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD] px-10 py-4 text-xs font-bold uppercase tracking-wider shadow-lg"
                  >
                    SUBMIT B2B INQUIRY ➔
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
