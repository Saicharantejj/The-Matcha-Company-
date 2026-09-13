import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FourPillars() {
  const pillars = [
    {
      icon: '⭐',
      title: 'COMMUNITY LOVED',
      subtitle: '4.9★ Across India',
      description: 'Tested and re-ordered by snack lovers across the country. Handcrafted small batches with authentic roasted crunch.',
      badge: 'COMMUNITY LOVED',
      badgeColor: 'bg-[#FF4D15] text-white',
      cardBorder: 'border-white/10 hover:border-[#FF4D15]',
      cta: { label: 'READ REVIEWS ➔', to: '/about' },
    },
    {
      icon: '💰',
      title: 'HONEST VALUE',
      subtitle: 'Up to 15% Pack Savings',
      description: 'Jumbo foxnuts, zero filler. Try All 5 Sampler Box or multi-pack savings (Pack of 3, 6, and 10) for maximum crunch per rupee.',
      badge: 'BEST VALUE',
      badgeColor: 'bg-[#FF4D15] text-white',
      cardBorder: 'border-white/10 hover:border-[#FF4D15]',
      cta: { label: 'TRY ALL 5 ➔', to: '/products/chaska-try-all-5' },
    },
    {
      icon: '🧭',
      title: 'FAST DISCOVERY',
      subtitle: 'Shop by Flavour & Pack',
      description: 'Pick by spice mood, single packs, or sampler box in seconds. Instant search, clean cart drawer, and frictionless checkout.',
      badge: '5 SIGNATURE FLAVOURS',
      badgeColor: 'bg-white/15 text-white',
      cardBorder: 'border-white/10 hover:border-[#FF4D15]',
      cta: { label: 'VIEW ALL ➔', to: '/collections' },
    },
    {
      icon: '⚡',
      title: 'FRESH DISPATCH',
      subtitle: 'Free Shipping Over ₹499',
      description: 'Direct to your door from our roasting ovens. Fast nationwide dispatch with reliable real-time tracking.',
      badge: 'FAST DISPATCH',
      badgeColor: 'bg-[#FF4D15] text-white',
      cardBorder: 'border-white/10 hover:border-[#FF4D15]',
      cta: { label: 'EXPLORE SHOP ➔', to: '/shop' },
    },
  ]

  return (
    <section className="py-20 bg-[#141416] text-[#FAF7F2] border-b border-[#FAF7F2]/10 relative overflow-hidden">
      {/* Subtle background warmth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4D15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D15] text-white font-mono text-xs font-bold uppercase tracking-widest">
              🔥 THE CHASKA STANDARD
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              BUILT ON FOUR <span className="text-[#FF4D15]">CORE PILLARS.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-medium">
              Every pouch of CHASKA is roasted with care, priced fairly, and delivered with obsession for crunch.
            </p>
          </div>
          <Link
            to="/shop"
            className="btn px-7 py-3.5 text-xs font-bold shrink-0 self-start md:self-auto shadow-md"
          >
            SHOP THE DROP ➔
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className={`p-7 rounded-3xl bg-white/5 border ${pillar.cardBorder} transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-sm hover:-translate-y-1`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{pillar.icon}</span>
                  <span className={`font-mono text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${pillar.badgeColor} shadow-2xs`}>
                    {pillar.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs text-[#FF4D15] font-bold mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>
                <p className="font-sans text-xs text-[#FAF7F2]/75 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  to={pillar.cta.to}
                  className="font-mono text-xs font-bold text-white group-hover:text-[#FF4D15] transition-colors flex items-center justify-between"
                >
                  <span>{pillar.cta.label}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
