import { Link } from 'react-router-dom'

const LIVE_ITEMS = [
  {
    badge: 'LIVE FLAVOURS',
    text: 'AVAILABLE NOW • PUDINA • JALAPEÑO • CHEESE IN STOCK',
    link: '/shop',
  },
  {
    badge: 'FREE DELIVERY',
    text: 'FREE NATIONWIDE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹499',
    link: '/shop',
  },
  {
    badge: 'BEST SELLER',
    text: 'PACK OF 10: BEST SELLER • ENJOY 20% OFF ON 30G & 70G PACKS',
    link: '/shop',
  },
  {
    badge: 'ROASTED NOT FRIED',
    text: '100% SLOW-ROASTED BIHAR LOTUS POPS • ZERO PALM OIL • ZERO GUILT CRUNCH',
    link: '/about',
  },
  {
    badge: 'OFFICIAL SIZES',
    text: 'AVAILABLE IN 30G (₹129) & 70G (₹229) • PACKS OF 1, 3, 5 & 10 (UP TO 20% OFF)',
    link: '/shop',
  },
  {
    badge: 'FRESH DISPATCH',
    text: 'HANDCRAFTED IN SMALL BATCHES • NITROGEN SEALED • DISPATCHING WITHIN 24 HOURS',
    link: '/shop',
  },
]

export default function LiveBanner() {
  // Seamless loop requires duplicating the track
  const duplicatedItems = [...LIVE_ITEMS, ...LIVE_ITEMS]

  return (
    <div
      role="region"
      aria-label="Live Announcement Banner"
      className="relative z-50 w-full overflow-hidden bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] text-white py-2 sm:py-2.5 border-b border-red-700/60 shadow-[0_2px_14px_rgba(220,38,38,0.28)] flex items-center select-none"
    >
      {/* Pinned Left LIVE Indicator Pill */}
      <div className="relative z-20 pl-3 sm:pl-5 pr-2 sm:pr-3 flex items-center shrink-0">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/30 text-white font-mono text-[10px] font-black uppercase tracking-widest backdrop-blur-xs shadow-xs hover-pop-subtle">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="text-white font-bold">LIVE</span>
        </div>
      </div>

      {/* Edge Gradient Fades for Ultra-Smooth Dissolve Effect */}
      <div className="pointer-events-none absolute left-14 sm:left-24 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#991B1B] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#991B1B] to-transparent z-10" />

      {/* Moving Text Track */}
      <div className="flex-1 overflow-hidden relative">
        <div className="live-marquee-track">
          {duplicatedItems.map((item, index) => (
            <Link
              key={`${item.badge}-${index}`}
              to={item.link}
              className="inline-flex items-center gap-2.5 mx-4 sm:mx-6 group/item cursor-pointer shrink-0 transition-opacity hover:opacity-95"
            >
              <span className="px-2 py-0.5 rounded-full bg-black/30 text-[9px] font-mono font-extrabold tracking-wider uppercase border border-white/25 text-white/95 group-hover/item:bg-white group-hover/item:text-red-700 transition-colors shadow-2xs">
                {item.badge}
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wide text-white group-hover/item:text-amber-200 transition-colors uppercase whitespace-nowrap">
                {item.text}
              </span>
              <span className="text-white/45 text-[10px] ml-2 select-none font-sans">
                ★
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
