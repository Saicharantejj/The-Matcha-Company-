import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FourPillars() {
  const pillars = [
    {
      icon: '🔥',
      title: '100% OVEN ROASTED',
      subtitle: 'Zero Palm Oil • Never Fried',
      description: 'Slow-roasted in radiant hot-air ovens to seal in explosive crunch. Never dunked in boiling industrial fats. Your fingers stay clean, and your gut stays light.',
      badge: '0% PALM OIL',
      badgeColor: 'bg-[#FF5400]/20 text-[#FF5400] border border-[#FF5400]/30',
      stat: '0% Deep-Frying',
      cta: { label: 'READ ROASTING PROCESS ➔', to: '/about' },
    },
    {
      icon: '🌱',
      title: 'SUPERFOOD PLANT PROTEIN',
      subtitle: '~4g Protein • Low Glycemic Index',
      description: 'Handpicked Bihar lotus seeds naturally packed with vegan protein, dietary fiber, magnesium, and potassium. Slow-burning energy without blood sugar spikes or post-snack lethargy.',
      badge: '~4G PROTEIN',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      stat: '~135 kcal / Serving',
      cta: { label: 'VIEW NUTRITION DATA ➔', to: '/shop' },
    },
    {
      icon: '🫒',
      title: 'HEART-HEALTHY CLEAN OILS',
      subtitle: 'Cold-Pressed & Olive Oil',
      description: 'Lightly tossed in pure cold-pressed sunflower oil and extra-virgin olive oil instead of cheap refined hydrogenated oils. 100% zero trans fat, zero cholesterol.',
      badge: 'ZERO TRANS FAT',
      badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
      stat: 'Zero Cholesterol',
      cta: { label: 'CHECK INGREDIENTS ➔', to: '/shop' },
    },
    {
      icon: '🌿',
      title: 'REAL PANTRY SPICES',
      subtitle: 'Zero MSG • No Artificial Colours',
      description: 'Seasoned exclusively with real Indian kitchen spices: sun-dried chillies, aged cheese dust, raw cocoa, and Himalayan pink rock salt. Chef-crafted bold flavour—bas boring nahi.',
      badge: '100% CLEAN LABEL',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      stat: 'Zero Preservatives',
      cta: { label: 'EXPLORE FLAVOURS ➔', to: '/collections' },
    },
  ]

  const healthMetrics = [
    { label: 'LESS FAT THAN POTATO CHIPS', value: '70%', highlight: true },
    { label: 'SLOW-ROASTED IN RADIANT OVENS', value: '100%', highlight: false },
    { label: 'NATURAL VEGAN PLANT PROTEIN', value: '~4g', highlight: false },
    { label: 'PALM OIL & TRANS FATS', value: '0g', highlight: true },
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#0B1230] text-[#FAF8F5] border-b border-[#243373] relative overflow-hidden transition-colors" id="pillars">
      {/* Subtle ambient warmth & green botanical glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5400]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10 space-y-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
              🌱 THE HEALTHIER SNACKING STANDARD
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              BUILT ON FOUR <span className="text-[#FF5400]">HEALTHY PILLARS.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
              Snacking shouldn&apos;t feel like a regret. Every batch of CHASKA is dry-roasted for crunch, crafted with heart-smart cold-pressed oils, and packed with ancient superfood nutrition.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/custom-gift-pack"
              className="px-6 py-3.5 rounded-full bg-white/10 text-white hover:bg-[#FF5400] transition-colors font-mono text-xs font-bold uppercase tracking-wider shrink-0 shadow-xs"
            >
              CUSTOMISE GIFT PACK 🎁
            </Link>
            <Link
              to="/shop"
              className="btn-orange px-7 py-3.5 text-xs font-bold shrink-0 shadow-sm hover-pop"
            >
              SHOP HEALTHY CRUNCH ➔
            </Link>
          </div>
        </div>

        {/* 4 Health Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-[#131D4A] border border-[#243373] hover:border-[#FF5400]/50 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-sm hover-pop-card cursor-default"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{pillar.icon}</span>
                  <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs text-[#FF5400] font-bold mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>
                <p className="font-sans text-xs text-stone-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#243373] flex items-center justify-between">
                <span className="font-mono text-[10px] text-stone-400 uppercase">
                  {pillar.stat}
                </span>
                <Link
                  to={pillar.cta.to}
                  className="font-mono text-xs font-bold text-stone-300 group-hover:text-[#FF5400] transition-colors flex items-center gap-1"
                >
                  <span>{pillar.cta.label}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── NUTRITIONAL COMPARISON STRIP ───────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17245B] via-[#131D4A] to-[#0E173D] border border-[#243373] shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {healthMetrics.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <span className={`font-display text-3xl sm:text-4xl lg:text-5xl font-black ${
                  metric.highlight ? 'text-[#FF5400]' : 'text-emerald-400'
                }`}>
                  {metric.value}
                </span>
                <p className="font-mono text-[11px] sm:text-xs text-stone-300 uppercase tracking-wider font-semibold">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-400 gap-2">
            <span>✓ Verified laboratory nutrition data per 30g serving</span>
            <span className="text-emerald-400 font-semibold">Low Glycemic Index • Heart &amp; Diabetic Friendly</span>
          </div>
        </div>

      </div>
    </section>
  )
}
