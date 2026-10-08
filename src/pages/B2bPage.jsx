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
      <section className="relative bg-[#17245B] dark:bg-[#131D4A] text-white px-4 pt-4 sm:pt-6 pb-8 sm:pb-10 sm:px-8 border-b border-white/10 dark:border-[#243373] overflow-hidden transition-colors">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF5400] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
              ⚡ CORPORATE, WHOLESALE &amp; BULK
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-normal text-white leading-[0.96]">
              UPGRADE YOUR <br />
              <span className="text-[#FF5400]">SNACK OFFERING.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl font-normal">
              From premium festive employee gift boxes to high-margin cafe counters and office pantries — bring the addictive crunch of CHASKA to your workplace.
            </p>
            <div className="pt-2 flex flex-wrap gap-3.5">
              <a
                href="#b2b-form"
                className="btn px-7 py-3.5 text-xs font-bold shadow-sm"
              >
                REQUEST A B2B QUOTE ➔
              </a>
              <a
                href="mailto:snackchaska@gmail.com"
                className="px-6 py-3.5 rounded-full border border-white/20 text-stone-200 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                EMAIL B2B DESK
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/5] max-h-[380px] rounded-3xl overflow-hidden border border-white/10 dark:border-[#243373] shadow-2xl bg-white/5 p-2.5">
              <img
                src="/images/catalog/hero_three_jars.webp"
                alt="CHASKA B2B Bulk Jars and Pouches"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES & TIERS ────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#0C122C] border-b border-[#243373]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              WHERE CHASKA SHINES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-normal text-[#17245B] dark:text-white">
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
                className="p-8 rounded-3xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] shadow-xs space-y-3 hover:shadow-md transition-all"
              >
                <span className="text-3xl block">{uc.icon}</span>
                <h3 className="font-display text-base font-bold uppercase text-[#17245B] dark:text-white">
                  {uc.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  {uc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2026 CATALOGUE: JARS, SIZES & CORPORATE GIFTING ────────────────── */}
      <section className="py-12 sm:py-16 bg-[#131D4A] border-b border-[#243373] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#243373] pb-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
                2026 CATALOGUE LINEUP
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                OUR JAR RANGE &amp; GIFT FORMATS
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-md font-normal leading-relaxed">
              From our signature 6-flavour spectrum to low-MOQ corporate hampers and custom branding on all jar sizes.
            </p>
          </div>

          {/* Full 6 Jars Lineup Showcase */}
          <div className="rounded-3xl overflow-hidden border border-[#243373] bg-[#0C122C] p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-stone-300 uppercase tracking-wider">
                ★ 6 SIGNATURE PROFILES: FROM GENTLY SALTED TO PROPERLY FIERY
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FF5400]/20 text-[#FF5400] font-mono text-[11px] font-bold uppercase">
                100% SLOW-ROASTED
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[21/9] sm:aspect-[24/9]">
              <img
                src="/images/catalog/all_six_jars_lineup.webp"
                alt="CHASKA 6 Jar Flavour Spectrum: Pink Salt, Cheese, Pudhina, Barbeque, Jalapeno, Peri Peri"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Catalog Format Cards: 70g/100g Jars + Curated Gift Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: 70g & 100g Premium Jars */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0C122C] border border-[#243373] shadow-md flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-full sm:w-44 aspect-square rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-[#131D4A]">
                <img
                  src="/images/catalog/peri_peri_jar_clean.webp"
                  alt="CHASKA 70g and 100g Premium Jars"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  TWO JAR SIZES: 70G &amp; 100G
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                  CLEAR RETAIL &amp; DESK JARS
                </h3>
                <ul className="font-sans text-xs sm:text-sm text-stone-300 space-y-1.5 font-normal">
                  <li className="flex items-center gap-2">✓ <strong>Low MOQ:</strong> 100 jars accessible for first orders</li>
                  <li className="flex items-center gap-2">✓ <strong>Shelf Life:</strong> 12 months sealed freshness</li>
                  <li className="flex items-center gap-2">✓ <strong>Custom Logo:</strong> Custom branding on 70g &amp; 100g jars</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Curated Corporate Gift Boxes */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0C122C] border border-[#243373] shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-[#FF5400]/20 text-[#FF5400] font-mono text-[10px] font-bold uppercase tracking-wider">
                  CURATED HAMPERS
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                  THE EASY BOX • THE FULL CHASKA • THE FIRE BOX
                </h3>
                <p className="font-sans text-xs text-stone-300 font-normal">
                  Pre-configured gift boxes tailored for employee appreciation, festive Diwali drops, and VIP conference attendee kits.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[3/1]">
                <img
                  src="/images/catalog/curated_gift_boxes.webp"
                  alt="Curated CHASKA Gift Boxes: The Easy Box, The Full Chaska, The Fire Box"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B INQUIRY FORM ─────────────────────────────────────────────── */}
      <section id="b2b-form" className="py-10 sm:py-14 bg-[#0C122C] border-b border-[#243373]">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#131D4A] border border-[#243373] shadow-xs space-y-6">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
                GET A FAST B2B PROPOSAL
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#17245B] dark:text-white">
                REQUEST A BULK QUOTE
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-normal">
                Our team responds within 4 business hours with custom pricing, sample packs, and dispatch timelines.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-[#17245B] dark:bg-[#1C2A6B] text-white text-center space-y-3">
                <span className="text-4xl block">🍿</span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#FF5400]">
                  Quote Request Received!
                </h3>
                <p className="font-sans text-sm text-stone-300 max-w-md mx-auto font-normal">
                  Thank you, <strong>{formData.name}</strong> from <strong>{formData.company}</strong>. Our business team will reach out to <strong>{formData.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-xl px-4 py-3 text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Studio / Cafe Blue"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-xl px-4 py-3 text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@acme.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-xl px-4 py-3 text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-xl px-4 py-3 text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                      Requirement Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-xl px-4 py-3 font-mono text-xs font-bold text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    >
                      <option value="Corporate Gifting">Corporate Gifting &amp; Hampers</option>
                      <option value="Cafe / Bar Snacking">Cafe / Bar Snack Counter</option>
                      <option value="Office Pantry Subscription">Office Pantry Recurring Subscription</option>
                      <option value="Weddings & Events">Weddings &amp; VIP Event Favors</option>
                      <option value="Wholesale / Retail">Wholesale / Gourmet Retail</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                      Estimated Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-white dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-xl px-4 py-3 font-mono text-xs font-bold text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    >
                      <option value="50-200 units">50 – 200 units</option>
                      <option value="200-500 units">200 – 500 units</option>
                      <option value="500-1000 units">500 – 1,000 units</option>
                      <option value="1000+ units">1,000+ units</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400">
                    Additional Notes or Customization Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your event dates, custom packaging ideas, or target budget..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] rounded-xl px-4 py-3 text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-full py-4 text-xs font-bold uppercase tracking-wider shadow-sm"
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
