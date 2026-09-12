import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FourPillars() {
  const pillars = [
    {
      icon: '⭐',
      title: 'SOCIAL PROOF',
      subtitle: '4.9★ from 10,000+ Desks',
      description: 'Tested, loved, and restocked by midnight munchers, foodies, and snack enthusiasts across India. 100% genuine reviews.',
      badge: 'COMMUNITY LOVED',
      badgeColor: 'bg-[#E2AE35] text-[#17245B]',
      cardBorder: 'border-[#E2AE35]/30 hover:border-[#E2AE35]',
      cardBg: 'bg-white/5',
      cta: { label: 'READ REVIEWS ➔', to: '/about' },
    },
    {
      icon: '💰',
      title: 'VALUE FOR MONEY',
      subtitle: 'Up to 15% Bundle Savings',
      description: 'Big packs, zero filler. Build your custom 4-pack stash or grab multi-flavor party hampers with maximum crunch per rupee.',
      badge: 'MAX SAVINGS',
      badgeColor: 'bg-[#A9223A] text-white',
      cardBorder: 'border-[#A9223A]/50 hover:border-[#A9223A]',
      cardBg: 'bg-gradient-to-b from-[#A9223A]/20 to-white/5',
      cta: { label: 'BUILD YOUR BOX ➔', to: '/build-your-box' },
    },
    {
      icon: '🧭',
      title: 'EASE OF NAVIGATION',
      subtitle: 'Shop by Flavour & Pack',
      description: 'Discover by spice level, single packs, or variety boxes in seconds. Quick search, 1-click cart, and zero friction to checkout.',
      badge: 'FAST DISCOVERY',
      badgeColor: 'bg-[#17245B] text-[#F5EEDD] border border-white/20',
      cardBorder: 'border-[#F5EEDD]/20 hover:border-[#E2AE35]',
      cardBg: 'bg-white/5',
      cta: { label: 'VIEW COLLECTIONS ➔', to: '/collections' },
    },
    {
      icon: '⚡',
      title: 'OFFERS & DISCOUNTS',
      subtitle: 'Free Delivery Over ₹499',
      description: 'Automatic savings on multi-packs, seasonal drop discounts, and welcome codes delivered straight to your inbox.',
      badge: 'FLAT 15% OFF',
      badgeColor: 'bg-[#A9223A] text-white',
      cardBorder: 'border-[#A9223A]/50 hover:border-[#A9223A]',
      cardBg: 'bg-gradient-to-b from-[#A9223A]/20 to-white/5',
      cta: { label: 'EXPLORE OFFERS ➔', to: '/shop' },
    },
  ]

  return (
    <section className="py-20 bg-[#17245B] text-[#F5EEDD] border-b border-[#F5EEDD]/15 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A9223A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#17245B]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[96rem] px-6 sm:px-12 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A9223A] text-white font-mono text-xs font-bold uppercase tracking-widest">
              🔥 THE CHASKA PROMISE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              BUILT ON FOUR <span className="text-[#A9223A]">CORE PILLARS.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#F5EEDD]/85 leading-relaxed font-medium">
              Every pack of CHASKA is roasted with integrity, priced with fairness, and delivered with obsession for customer satisfaction.
            </p>
          </div>
          <Link
            to="/shop"
            className="btn-lacquer shadow-lg text-xs font-bold shrink-0 self-start md:self-auto px-7 py-3.5"
          >
            SHOP THE DROP ➔
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`p-8 rounded-3xl ${pillar.cardBg} border-2 ${pillar.cardBorder} transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-lg hover:-translate-y-1`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{pillar.icon}</span>
                  <span className={`font-mono text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${pillar.badgeColor} shadow-sm`}>
                    {pillar.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs text-[#E2AE35] font-bold mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>
                <p className="font-sans text-xs text-[#F5EEDD]/80 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F5EEDD]/10">
                <Link
                  to={pillar.cta.to}
                  className="font-mono text-xs font-bold text-[#E2AE35] group-hover:text-[#A9223A] transition-colors inline-flex items-center gap-1"
                >
                  {pillar.cta.label}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
