import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'

export default function FourPillars() {
  const pillars = [
    {
      id: 'roasted',
      num: '01',
      title: '100% OVEN ROASTED',
      tag: 'ZERO DEEP FRYING',
      lead: 'Slow-roasted in radiant dry ovens.',
      description: 'Never dipped into boiling commercial palm oil. Our seeds expand with heat, locking in a shattering, lightweight crunch without any greasy film on your fingers.',
      stat: '0% PALM OIL',
      statLabel: 'Zero industrial fats',
      accentColor: '#FF5400',
      badgeBg: 'bg-[#FF5400]/15 text-[#FF5400] border-[#FF5400]/30',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ),
    },
    {
      id: 'protein',
      num: '02',
      title: 'SUPERFOOD PLANT PROTEIN',
      tag: 'ANCIENT LOTUS POPS',
      lead: '~4.2g Vegan protein per pouch.',
      description: 'Handpicked Bihar lotus seeds naturally deliver plant-based protein, dietary fiber, magnesium, and potassium. Slow-digesting fuel that keeps hunger at bay without post-snack lethargy.',
      stat: '~4.2g PROTEIN',
      statLabel: 'Per 30g serving',
      accentColor: '#10B981',
      badgeBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ),
    },
    {
      id: 'oils',
      num: '03',
      title: 'COLD-PRESSED & OLIVE OIL',
      tag: 'ZERO TRANS FAT',
      lead: 'Lightly tossed in cold-pressed fats.',
      description: 'We reject cheap hydrogenated oils. Every batch is finished with cold-pressed sunflower oil and extra-virgin olive oil for clean digestion, zero cholesterol, and crisp lightness.',
      stat: '0g TRANS FAT',
      statLabel: 'Heart-smart lipids',
      accentColor: '#0EA5E9',
      badgeBg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
      ),
    },
    {
      id: 'spices',
      num: '04',
      title: 'REAL PANTRY SPICES',
      tag: 'CLEAN LABEL TRANSPARENCY',
      lead: 'Chef-crafted kitchen seasonings.',
      description: 'Real sun-dried Kashmiri chillies, aged cheddar dust, pure dark cocoa, and Himalayan pink rock salt. Zero artificial food dyes, zero MSG, and zero synthetic preservatives.',
      stat: '100% REAL',
      statLabel: 'Whole Indian spices',
      accentColor: '#F59E0B',
      badgeBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
        </svg>
      ),
    },
  ]

  const comparisonRows = [
    {
      metric: 'Cooking Method',
      chaska: '100% Radiant Dry Oven Roasted',
      chaskaBadge: 'ROASTED',
      conventional: 'Deep-fried in reused palm oil vats',
    },
    {
      metric: 'Total Fat Content',
      chaska: '70% Less Fat (~3.5g per serving)',
      chaskaBadge: 'LOW FAT',
      conventional: '14g - 18g heavy saturated fats',
    },
    {
      metric: 'Plant Protein & Fiber',
      chaska: '~4.2g Natural Protein + 3.5g Fiber',
      chaskaBadge: 'HIGH PROTEIN',
      conventional: '<1g Protein, zero dietary fiber',
    },
    {
      metric: 'Quality of Oils',
      chaska: 'Extra Virgin Olive & Cold-Pressed Oil',
      chaskaBadge: 'CLEAN OILS',
      conventional: 'Commercial Palm Olein & Trans Fats',
    },
    {
      metric: 'Finger & Screen Test',
      chaska: 'Clean fingers, zero oily keyboard residue',
      chaskaBadge: 'CLEAN CRUNCH',
      conventional: 'Thick greasy film & orange dust stains',
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#0B1230] text-[#FAF8F5] border-b border-[#243373] relative overflow-hidden" id="pillars">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5400]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10 space-y-16">
        
        {/* ── EDITORIAL HEADER ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-10">
          <div className="lg:col-span-8 space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-widest border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                THE HEALTHIER SNACKING STANDARD
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-stone-300 font-mono text-[11px] font-medium uppercase tracking-wider border border-white/10">
                100% INGREDIENT TRANSPARENCY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.02]">
              WHY WE ARE <span className="text-[#FF5400]">ACTUALLY HEALTHY.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed font-normal">
              Most &quot;healthy snacks&quot; are either deep-fried junk disguised in green packaging or tasteless cardboard. CHASKA is built differently: authentic whole Bihar lotus seeds, dry oven roasted for explosive crunch, tossed in cold-pressed oils.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <Link
              to="/custom-gift-pack"
              className="px-6 py-3.5 rounded-full bg-[#FFF9EF] text-[#0B1230] hover:bg-[#FF5400] hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-wider shadow-md hover-pop"
            >
              CUSTOMISE GIFT PACK ➔
            </Link>
            <Link
              to="/shop"
              className="btn px-7 py-3.5 text-xs font-bold tracking-wider shadow-sm hover-pop"
            >
              SHOP DROP 01 ➔
            </Link>
          </div>
        </div>

        {/* ── 4 HEALTH PILLARS: BENTO EDITORIAL CARDS ────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl bg-[#131D4A] border border-[#243373] p-7 flex flex-col justify-between space-y-6 hover:border-[#FF5400]/60 transition-all duration-300 hover-pop-card group"
            >
              {/* Top Meta: Num & Icon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-[#0C122C] border border-[#243373] flex items-center justify-center text-white/90 group-hover:text-[#FF5400] transition-colors">
                    {pillar.icon}
                  </div>
                  <span className={`font-mono text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${pillar.badgeBg}`}>
                    {pillar.tag}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-1">
                    PILLAR {pillar.num}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-[#FF5400] font-semibold mt-1">
                    {pillar.lead}
                  </p>
                </div>

                <p className="font-sans text-xs text-stone-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Stat Chip */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-display text-base font-black text-white block">
                    {pillar.stat}
                  </span>
                  <span className="font-mono text-[10px] text-stone-400 block">
                    {pillar.statLabel}
                  </span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  ✓ VERIFIED
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── THE CLEAN CRUNCH AUDIT: EDITORIAL COMPARISON DOSSIER ────────── */}
        <div className="rounded-3xl bg-[#131D4A] border-2 border-[#243373] overflow-hidden shadow-2xl">
          
          {/* Dossier Header */}
          <div className="p-6 sm:p-8 border-b border-[#243373] bg-[#0C122C]/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#FF5400] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5400] animate-pulse" />
                THE CLEAN CRUNCH AUDIT
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                HOW CHASKA COMPARES TO REGULAR FRIED CHIPS
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                ✓ 70% LESS FAT
              </span>
              <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 font-mono text-xs font-bold border border-sky-500/30">
                ✓ ~4g PROTEIN
              </span>
            </div>
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#243373]">
            
            {/* Left 7 Columns: Comparison Table */}
            <div className="lg:col-span-7 divide-y divide-white/10">
              {comparisonRows.map((row) => (
                <div key={row.metric} className="p-5 sm:p-6 space-y-3 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-300">
                      {row.metric}
                    </span>
                    <span className="font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#10B981]/20 text-emerald-400 border border-emerald-500/30">
                      {row.chaskaBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* CHASKA */}
                    <div className="p-3 rounded-2xl bg-[#0C122C]/90 border border-[#10B981]/40 space-y-1">
                      <span className="font-mono text-[10px] font-bold text-[#10B981] uppercase block">
                        CHASKA ROASTED LOTUS POPS
                      </span>
                      <p className="font-sans font-semibold text-white">
                        {row.chaska}
                      </p>
                    </div>

                    {/* Conventional Chips */}
                    <div className="p-3 rounded-2xl bg-[#0C122C]/40 border border-white/10 space-y-1 opacity-70">
                      <span className="font-mono text-[10px] font-bold text-stone-400 uppercase block">
                        ORDINARY FRIED POTATO CHIPS
                      </span>
                      <p className="font-sans text-stone-400">
                        {row.conventional}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right 5 Columns: Visual Craft Vignette & Nutrition Credentials */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#0C122C]/60 to-[#131D4A]">
              <div className="space-y-4">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-[#243373] relative group">
                  <img
                    src={photos.yellowBasket.src}
                    alt="Golden slow-roasted makhana pops"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C122C] via-transparent to-transparent p-4 flex items-end">
                    <span className="font-mono text-[10px] font-black uppercase text-white bg-[#FF5400] px-3 py-1 rounded-full shadow-xs">
                      100% SLOW-ROASTED BIHAR LOTUS SEEDS
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                    ANCIENT AYURVEDIC SUPERFOOD
                  </h4>
                  <p className="font-sans text-xs text-stone-300 leading-relaxed">
                    Makhana (Foxnuts / Euryale Ferox) has been praised for thousands of years in India for its natural cooling properties, kidney support, and low glycemic index. We simply gave it modern roasting discipline and bold chef seasonings.
                  </p>
                </div>
              </div>

              {/* Bottom Quick Facts Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#0C122C] border border-[#243373] space-y-0.5">
                  <span className="text-emerald-400 font-bold block">LOW GI</span>
                  <span className="text-stone-400 text-[10px]">Diabetic &amp; Heart Friendly</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0C122C] border border-[#243373] space-y-0.5">
                  <span className="text-[#FF5400] font-bold block">135 KCAL</span>
                  <span className="text-stone-400 text-[10px]">Light daily snacking</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
