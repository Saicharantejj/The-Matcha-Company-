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
      title: 'CORPORATE GIFTING & FESTIVE HAMPERS',
      desc: 'Bespoke gift boxes with custom branding, handwritten notes, and premium variety packs for team appreciation or festive client gifting.',
    },
    {
      icon: '☕',
      title: 'CAFES, BARS & BREWERIES',
      desc: 'The ultimate high-margin bar snack. Salty, smoky, and spicy makhana pops that pair cleanly with craft drinks and specialty coffee.',
    },
    {
      icon: '💻',
      title: 'OFFICE PANTRIES & CO-WORKING',
      desc: 'Keep teams energized with non-greasy snacking that leaves keyboards clean. Monthly recurring pantry replenishment available.',
    },
    {
      icon: '🎉',
      title: 'WEDDINGS, EVENTS & PARTIES',
      desc: 'Custom mini-pouches and curated welcome hampers for destination weddings, conferences, and event swag bags.',
    },
    {
      icon: '🏪',
      title: 'RETAIL & GOURMET STORES',
      desc: 'High sell-through FMCG snack displays with eye-catching branding designed for modern Indian shelf appeal.',
    },
    {
      icon: '📦',
      title: 'BULK ORDERS & CUSTOM STASH',
      desc: 'Direct dispatch from our Bihar roasting facilities in food-grade bulk bags or custom packaged assortments.',
    },
  ]

  return (
    <PageShell>
      {/* ── B2B HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative bg-[#17245B] text-[#F5EEDD] px-4 py-16 sm:px-8 sm:py-24 border-b border-[#E2AE35]/20 overflow-hidden">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-black uppercase tracking-widest shadow-xs">
              ⚡ CORPORATE, WHOLESALE &amp; BULK
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F5EEDD] leading-[0.95]">
              UPGRADE YOUR <br />
              <span className="text-[#E2AE35]">SNACK OFFERING.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#F5EEDD]/85 leading-relaxed max-w-xl font-normal">
              From premium festive employee gift boxes to high-margin cafe counters and office pantries — bring the addictive crunch of CHASKA to your workplace.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#b2b-form"
                className="btn-indigo px-7 py-3.5 text-xs font-black shadow-md bg-[#E2AE35] text-[#17245B] hover:bg-white"
              >
                REQUEST A B2B QUOTE ➔
              </a>
              <a
                href="mailto:b2b@snackchaska.shop"
                className="px-6 py-3.5 rounded-full border border-[#F5EEDD]/30 text-[#F5EEDD] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F5EEDD]/10 transition-colors"
              >
                EMAIL B2B DESK
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#E2AE35]/30 shadow-2xl bg-white/5 p-2.5">
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
      <section className="py-20 sm:py-24 bg-[#F5EEDD] border-b border-[#17245B]/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#17245B]/70">
              WHERE CHASKA SHINES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B]">
              TAILORED FOR EVERY OCCASION
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
                className="p-7 rounded-3xl bg-[#FAF6ED] border border-[#17245B]/15 shadow-xs space-y-3 hover:shadow-md hover:border-[#17245B]/40 transition-all"
              >
                <span className="text-3xl block">{uc.icon}</span>
                <h3 className="font-display text-base font-bold uppercase text-[#17245B]">
                  {uc.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#17245B]/80 leading-relaxed font-normal">
                  {uc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── B2B INQUIRY FORM ─────────────────────────────────────────────── */}
      <section id="b2b-form" className="py-20 bg-[#FAF6ED] border-b border-[#17245B]/15">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="p-7 sm:p-12 rounded-[2.5rem] bg-[#F5EEDD] border border-[#17245B]/15 shadow-sm space-y-6">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#17245B]/70">
                GET A FAST B2B PROPOSAL
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#17245B]">
                REQUEST A BULK QUOTE
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#17245B]/80">
                Our team responds within 4 business hours with custom pricing, sample packs, and dispatch timelines.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-[#17245B] text-[#F5EEDD] text-center space-y-3">
                <span className="text-4xl block">🍿</span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#E2AE35]">
                  Quote Request Received!
                </h3>
                <p className="font-sans text-sm text-[#F5EEDD]/90 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong> from <strong>{formData.company}</strong>. Our business team will reach out to <strong>{formData.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-[#17245B]/70">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF6ED] border border-[#17245B]/15 rounded-xl px-4 py-3 text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-[#17245B]/70">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Studio / Cafe Blue"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#FAF6ED] border border-[#17245B]/15 rounded-xl px-4 py-3 text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-[#17245B]/70">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@acme.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF6ED] border border-[#17245B]/15 rounded-xl px-4 py-3 text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-[#17245B]/70">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF6ED] border border-[#17245B]/15 rounded-xl px-4 py-3 text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-[#17245B]/70">
                      Requirement Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#FAF6ED] border border-[#17245B]/15 rounded-xl px-4 py-3 font-mono text-xs font-bold text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    >
                      <option value="Corporate Gifting">Corporate Gifting &amp; Hampers</option>
                      <option value="Cafe / Bar Snacking">Cafe / Bar Snack Counter</option>
                      <option value="Office Pantry Subscription">Office Pantry Recurring Subscription</option>
                      <option value="Weddings & Events">Weddings &amp; VIP Event Favors</option>
                      <option value="Wholesale / Retail">Wholesale / Gourmet Retail</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-[#17245B]/70">
                      Estimated Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-[#FAF6ED] border border-[#17245B]/15 rounded-xl px-4 py-3 font-mono text-xs font-bold text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    >
                      <option value="50-200 units">50 – 200 units</option>
                      <option value="200-500 units">200 – 500 units</option>
                      <option value="500-1000 units">500 – 1,000 units</option>
                      <option value="1000+ units">1,000+ units</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase text-[#17245B]/70">
                    Additional Notes or Customization Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your event dates, custom packaging ideas, or target budget..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#FAF6ED] border border-[#17245B]/15 rounded-xl px-4 py-3 text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-full py-4 text-xs font-extrabold uppercase tracking-widest shadow-md"
                >
                  SUBMIT B2B INQUIRY ➔
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
