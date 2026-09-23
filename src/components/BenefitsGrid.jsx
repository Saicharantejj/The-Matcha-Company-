import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'

export default function BenefitsGrid() {
  const benefitCards = [
    {
      tag: '100% SLOW-ROASTED',
      badge: 'ZERO PALM OIL',
      badgeColor: 'text-[#FF5400] bg-[#FF5400]/10 border-[#FF5400]/30',
      title: 'ROASTED. NEVER FRIED.',
      description:
        'Slow-roasted in small batches to lock in pure crackling crunch without deep frying in palm oil. Your fingers stay clean, your conscience cleaner.',
      hindi: 'तेल नहीं, सिर्फ़ ताज़ा भुना',
    },
    {
      tag: 'PREMIUM OILS',
      badge: 'OLIVE & COLD-PRESSED',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
      title: 'OLIVE OIL & CLEAN CRUNCH.',
      description:
        'Lightly tossed with real olive oil and cold-pressed sunflower oil instead of cheap industrial fats. No heavy, greasy aftertaste.',
      hindi: 'असली तेल, साफ़ स्वाद',
    },
    {
      tag: 'PANTRY SPICES',
      badge: 'ZERO ARTIFICIAL COLOURS',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
      title: 'BOLD FLAVOUR, BAS BORING NAHI.',
      description:
        'Aged cheddar dust, dark cocoa glaze, wild mountain herbs, and sun-dried chillies. Chef-crafted to satisfy cravings without testing your patience.',
      hindi: 'हर दाने में असली चस्का',
    },
    {
      tag: 'BIHAR LOTUS SEEDS',
      badge: '~135 KCAL • ~4G PROTEIN',
      badgeColor: 'text-sky-400 bg-sky-950/60 border-sky-800/40',
      title: 'LIGHT EVERYDAY MUNCHING.',
      description:
        'Handpicked jumbo makhana delivering a loud, shatteringly crisp crunch. Light on the stomach with natural plant protein so the snack scene stays sorted.',
      hindi: 'पेट भी खुश, मूड भी',
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#0C122C] border-b border-[#243373] relative overflow-hidden" id="benefits">
      {/* Subtle ambient lighting for depth */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#FF5400]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#1C2A6B]/25 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        
        {/* Editorial Grid: Left Philosophy & Right 4 Benefit Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: Headline & Philosophy ──────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5400]/20 text-[#FF5400] font-mono text-[11px] font-bold uppercase tracking-widest border border-[#FF5400]/30">
                  ⚡ BETTER SNACKING ERA
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C2A6B] text-stone-200 font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#243373]">
                  100% FACTUAL CRAFT
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight text-white leading-[1.02]">
                YOUR SNACKING ERA <br />
                <span className="text-[#FF5400]">JUST GOT BETTER.</span>
              </h2>
            </div>

            <p className="font-sans text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
              We didn’t set out to build another boring, preachy "diet snack." Makhana has been popping in Indian homes for centuries—we just gave it slow-roasting discipline, olive oil, and chef-crafted spice blends.
            </p>

            <div className="p-5 rounded-2xl bg-[#131D4A] border border-[#243373] space-y-3">
              <span className="font-mono text-[11px] font-bold uppercase text-[#FF5400] tracking-wider block">
                THE CHASKA DIFFERENCE:
              </span>
              <ul className="space-y-2 font-mono text-xs text-stone-200">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Handpicked Bihar wetlands lotus seeds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Oven slow-roasted • Zero palm oil deep-frying</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Real olive oil &amp; cold-pressed seasonings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Pet bhi khush, mood bhi</span>
                </li>
              </ul>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="btn px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm hover-pop"
              >
                SHOP THE DROP ➔
              </Link>
              <Link
                to="/about"
                className="font-mono text-xs font-bold text-stone-300 hover:text-[#FF5400] transition-colors py-2"
              >
                READ ROASTING PROCESS ↗
              </Link>
            </div>

            {/* Subtle Visual Anchor */}
            <div className="hidden sm:block pt-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#243373] shadow-md group">
                <img
                  src={photos.yellowBasket.src}
                  alt="Golden slow-roasted lotus seed pops"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C122C]/90 via-[#0C122C]/30 to-transparent p-4 flex items-end justify-between">
                  <span className="font-mono text-[10px] font-bold text-stone-200 uppercase tracking-wider">
                    BATCH-ROASTED LOTUS POPS
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#FF5400] uppercase bg-[#0C122C]/80 px-2 py-0.5 rounded-full border border-[#FF5400]/30">
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
                className="rounded-3xl bg-[#131D4A] border border-[#243373] hover:border-[#FF5400]/50 p-6 sm:p-7 flex flex-col justify-between space-y-5 transition-all duration-300 hover-pop-card group shadow-sm cursor-default"
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
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-snug group-hover:text-stone-100 transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed font-normal mt-2.5">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#243373]/80 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-stone-400 italic font-sans text-xs">
                    {card.hindi}
                  </span>
                  <span className="text-[#FF5400] font-bold text-[10px]">
                    0{idx + 1}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Bottom Full-width Verified Quality Strip */}
            <div className="sm:col-span-2 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#17245B] to-[#131D4A] border border-[#243373] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  ✓ VERIFIED NUTRITION DATA
                </span>
                <p className="font-sans text-xs text-stone-200">
                  Average per 30g serving: ~135 kcal, ~4g natural plant protein, zero trans fat.
                </p>
              </div>
              <Link
                to="/products/chaska-try-all-5"
                className="font-mono text-xs font-bold text-[#FF5400] hover:text-white transition-colors shrink-0 flex items-center gap-1"
              >
                TRY ALL 3 IN LAUNCH TRIO ➔
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
