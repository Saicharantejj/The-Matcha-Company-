import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'

export default function BenefitsGrid() {
  const benefitCards = [
    {
      tag: '100% SLOW-ROASTED',
      badge: 'ZERO PALM OIL',
      badgeColor: 'text-[#FF5400] bg-[#FFF2EB] border-[#FFD8C2]',
      title: 'ROASTED. NEVER FRIED.',
      description:
        'Slow-roasted in small batches to lock in pure crackling crunch without deep frying in palm oil. Your fingers stay clean, your conscience cleaner.',
      hindi: 'तेल नहीं, सिर्फ़ ताज़ा भुना',
    },
    {
      tag: 'PREMIUM OILS',
      badge: 'OLIVE & COLD-PRESSED',
      badgeColor: 'text-[#15803D] bg-[#ECFDF5] border-[#A7F3D0]',
      title: 'OLIVE OIL & CLEAN CRUNCH.',
      description:
        'Lightly tossed with real olive oil and cold-pressed sunflower oil instead of cheap industrial fats. No heavy, greasy aftertaste.',
      hindi: 'असली तेल, साफ़ स्वाद',
    },
    {
      tag: 'PANTRY SPICES',
      badge: 'ZERO ARTIFICIAL COLOURS',
      badgeColor: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
      title: 'BOLD FLAVOUR, BAS BORING NAHI.',
      description:
        'Aged cheddar dust, dark cocoa glaze, wild mountain herbs, and sun-dried chillies. Chef-crafted to satisfy cravings without testing your patience.',
      hindi: 'हर दाने में असली चस्का',
    },
    {
      tag: 'BIHAR LOTUS SEEDS',
      badge: '~135 KCAL • ~4G PROTEIN',
      badgeColor: 'text-[#0369A1] bg-[#F0F9FF] border-[#BAE6FD]',
      title: 'LIGHT EVERYDAY MUNCHING.',
      description:
        'Handpicked jumbo makhana delivering a loud, shatteringly crisp crunch. Light on the stomach with natural plant protein so the snack scene stays sorted.',
      hindi: 'पेट भी खुश, मूड भी',
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#F0F7F2] text-[#0B1230] border-b border-[#D2E7D7] relative overflow-hidden" id="benefits">
      {/* Subtle ambient fresh mint & herbal lighting */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#52C878]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#E2F5E7]/70 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        
        {/* Editorial Grid: Left Philosophy & Right 4 Benefit Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: Headline & Philosophy ──────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B703C]/10 text-[#1B703C] font-mono text-[11px] font-bold uppercase tracking-widest border border-[#1B703C]/20">
                  ⚡ BETTER EVERYDAY SNACKING
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#0B1230] font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#D2E7D7] shadow-2xs">
                  100% FACTUAL CRAFT
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight text-[#0B1230] leading-[1.02]">
                YOUR SNACKING ERA <br />
                <span className="text-[#FF5400]">JUST GOT BETTER.</span>
              </h2>
            </div>

            <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
              We didn’t set out to build another boring, preachy "diet snack." Makhana has been popping in Indian homes for centuries—we just gave it slow-roasting discipline, real olive oil, and chef-crafted seasonings.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-[#D5EAD9] shadow-2xs space-y-3">
              <span className="font-mono text-[11px] font-bold uppercase text-[#FF5400] tracking-wider block">
                THE CHASKA DIFFERENCE:
              </span>
              <ul className="space-y-2 font-mono text-xs text-stone-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Handpicked Bihar wetlands lotus seeds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Oven slow-roasted • Zero palm oil deep-frying</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Real olive oil &amp; cold-pressed seasonings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Pet bhi khush, mood bhi</span>
                </li>
              </ul>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="btn-navy px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm hover-pop"
              >
                SHOP DROP 01 ➔
              </Link>
              <Link
                to="/about"
                className="font-mono text-xs font-bold text-[#1B703C] hover:text-[#FF5400] transition-colors py-2 flex items-center gap-1"
              >
                <span>READ ROASTING PROCESS</span>
                <span>↗</span>
              </Link>
            </div>

            {/* Subtle Visual Anchor */}
            <div className="hidden sm:block pt-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#D2E7D7] shadow-sm group">
                <img
                  src={photos.yellowBasket.src}
                  alt="Golden slow-roasted lotus seed pops"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1230]/90 via-[#0B1230]/30 to-transparent p-4 flex items-end justify-between">
                  <span className="font-mono text-[10px] font-bold text-stone-200 uppercase tracking-wider">
                    BATCH-ROASTED LOTUS POPS
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#FF5400] uppercase bg-[#0B1230]/80 px-2 py-0.5 rounded-full border border-[#FF5400]/30">
                    SHATTERING CRUNCH
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 4 Editorial Compact Benefit Cards ────────── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefitCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl bg-white border border-[#D5EAD9] hover:border-[#15803D]/40 p-6 sm:p-7 flex flex-col justify-between space-y-5 transition-all duration-300 hover-pop-card group shadow-2xs hover:shadow-md cursor-default"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#FF5400] uppercase tracking-widest">
                      {card.tag}
                    </span>
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-[#0B1230] tracking-tight leading-snug group-hover:text-[#1B703C] transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mt-2.5">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-stone-500 italic font-sans text-xs">
                    {card.hindi}
                  </span>
                  <span className="text-[#15803D] font-bold text-[10px]">
                    0{idx + 1}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Bottom Full-width Verified Quality Strip */}
            <div className="sm:col-span-2 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#E2F5E7] to-[#EDFAF1] border border-[#BDE5C5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-bold text-[#15803D] uppercase tracking-wider flex items-center gap-1.5">
                  <span>✓</span> VERIFIED NUTRITION DATA
                </span>
                <p className="font-sans text-xs text-stone-700">
                  Average per 30g serving: ~135 kcal, ~4g natural plant protein, zero trans fat.
                </p>
              </div>
              <Link
                to="/custom-gift-pack"
                className="font-mono text-xs font-bold text-[#FF5400] hover:text-[#0B1230] transition-colors shrink-0 flex items-center gap-1"
              >
                <span>CUSTOMISE YOUR GIFT PACK</span>
                <span>➔</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
