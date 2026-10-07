import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function ProductDiscovery({ products = [] }) {
  const sourceProducts = products && products.length > 0 ? products : PRODUCTS_CATALOGUE

  // Filter ONLY the 3 available live flavours
  const availablePacks = [
    sourceProducts.find((p) => p.handle === 'pudina' || p.handle?.includes('pud')) || PRODUCTS_CATALOGUE[0],
    sourceProducts.find((p) => p.handle === 'jalapeno' || p.handle?.includes('jal')) || PRODUCTS_CATALOGUE[1],
    sourceProducts.find((p) => p.handle === 'cheese' || p.handle?.includes('cheese')) || PRODUCTS_CATALOGUE[2],
  ].filter(Boolean)

  // In-progress coming soon flavours (strictly non-purchasable)
  const comingSoonPacks = [
    sourceProducts.find((p) => p.handle === 'kashmiri-chilli-lime-garlic' || p.handle?.includes('kashmiri') || p.handle?.includes('garlic')) || PRODUCTS_CATALOGUE[3],
    sourceProducts.find((p) => p.handle === 'south-african-peri-peri' || p.handle?.includes('peri')) || PRODUCTS_CATALOGUE[4],
    sourceProducts.find((p) => p.handle === 'dark-chocolate-brownie' || p.handle?.includes('brownie') || p.handle?.includes('chocolate')) || PRODUCTS_CATALOGUE[5],
  ].filter(Boolean)

  const flavourPills = [
    { label: 'Pudina', color: '#0D9488', icon: '🌿' },
    { label: 'Jalapeño', color: '#4D8C24', icon: '🌶️' },
    { label: 'Cheese', color: '#107B4F', icon: '🧀' },
  ]

  return (
    <section className="py-10 sm:py-14 bg-[#F7F2E8] text-[#0B1230] border-b border-[#E5DCC9] relative overflow-hidden" id="products">
      {/* Subtle organic warmth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE9D6]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8F5EB]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1380px] px-4 sm:px-8 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Header with Typographic Rhythm */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E5DCC9] pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5400] animate-pulse" />
                AVAILABLE FLAVOURS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0B1230]/5 text-[#0B1230] font-mono text-[10px] font-bold uppercase border border-[#0B1230]/10">
                3 LIVE FLAVOURS • 30G &amp; 70G
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-black uppercase tracking-tight text-[#0B1230] leading-[1.02]">
              BIG CRUNCH. <br className="hidden sm:block" />
              <span className="text-[#FF5400]">ZERO COMPROMISE.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Handpicked whole Bihar lotus pops slow-roasted in small batches. 100% roasted with zero deep frying, real spices, and authentic ingredients. Starting at ₹129 for 30g and ₹229 for 70g.
            </p>
          </div>

          {/* Flavour quick tags & Shop link */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              {flavourPills.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white font-mono text-[11px] font-black shadow-2xs"
                  style={{
                    border: `1.5px solid ${pill.color}`,
                    color: pill.color,
                  }}
                >
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </span>
              ))}
            </div>

            <Link
              to="/shop"
              className="btn-outline-dark text-xs font-bold uppercase tracking-wider shrink-0"
            >
              EXPLORE ALL PACKS ➔
            </Link>
          </div>
        </div>

        {/* 3-Card Responsive Grid for Live Available Flavours */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-600">
              AVAILABLE NOW FOR PURCHASE
            </span>
            <span className="font-mono text-xs font-bold text-[#FF5400]">
              PACK OF 10: BEST SELLER (20% OFF)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
            {availablePacks.map((prod, idx) => (
              <ProductCard
                key={prod.id || prod.handle || idx}
                product={prod}
                index={idx}
                colorMode="light"
              />
            ))}
          </div>
        </div>

        {/* ── COMING SOON / IN PROGRESS SECTION ───────────────────────────── */}
        <div className="pt-8 border-t border-[#E5DCC9] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400] flex items-center gap-1.5">
                <span>🧪</span> COMING SOON • IN PROGRESS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#0B1230]">
                FUTURE FLAVOURS ROASTING IN THE LAB
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600">
                These flavours are currently in development and are not yet available for purchase.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-stone-500 uppercase px-3 py-1 rounded-full bg-white border border-[#E5DCC9]">
              3 UPCOMING RECIPES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
            {comingSoonPacks.map((prod, idx) => (
              <ProductCard
                key={prod.id || prod.handle || idx}
                product={prod}
                index={idx}
                colorMode="light"
              />
            ))}
          </div>
        </div>

        {/* Bottom Trust & Satisfaction Strip */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-[#E5DCC9] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs font-bold text-stone-700">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600">✓</span> Free Shipping Over ₹499
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600">✓</span> 100% Roasted, Never Fried
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600">✓</span> Bihar Lotus Seeds
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#FF5400]">★</span> Pack of 10: 20% OFF (Best Seller)
            </span>
          </div>

          <Link
            to="/shop"
            className="font-mono text-xs font-bold text-[#FF5400] hover:text-[#0B1230] transition-colors flex items-center gap-1"
          >
            <span>VIEW ALL SIZES &amp; PACK DISCOUNTS</span>
            <span>➔</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
