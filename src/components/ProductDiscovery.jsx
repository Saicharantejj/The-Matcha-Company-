import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { PRODUCTS_CATALOGUE } from '../data/products'

export default function ProductDiscovery({ products = [] }) {
  // Use passed products or fallback to official launch catalogue
  const sourceProducts = products && products.length > 0 ? products : PRODUCTS_CATALOGUE

  // Filter the official Drop 01 lineup: 3 single flavours + the 3-Pack Launch Trio
  const launchPacks = [
    sourceProducts.find((p) => p.handle?.includes('chocolate')) || PRODUCTS_CATALOGUE[0],
    sourceProducts.find((p) => p.handle?.includes('cheese-and-herbs') || (p.handle?.includes('cheese') && !p.handle?.includes('chilli-cheese'))) || PRODUCTS_CATALOGUE[1],
    sourceProducts.find((p) => p.handle?.includes('jalapeno')) || PRODUCTS_CATALOGUE[2],
    sourceProducts.find((p) => p.handle?.includes('try-all-5') || p.handle?.includes('trio')) || PRODUCTS_CATALOGUE[3],
  ].filter(Boolean)

  const flavourPills = [
    { label: 'Dark Cocoa', color: '#D4AF37', icon: '🍫' },
    { label: 'Aged Cheddar', color: '#10B981', icon: '🧀' },
    { label: 'Fiery Jalapeno', color: '#4D8C24', icon: '🌶️' },
    { label: '3-In-1 Sampler', color: '#FF5400', icon: '📦' },
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#F7F2E8] text-[#0B1230] border-b border-[#E5DCC9] relative overflow-hidden" id="products">
      {/* Subtle organic warmth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE9D6]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8F5EB]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* Section Header with Typographic Rhythm */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E5DCC9] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5400] animate-pulse" />
                OFFICIAL DROP 01 ROSTER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0B1230]/5 text-[#0B1230] font-mono text-[10px] font-bold uppercase border border-[#0B1230]/10">
                4 LAUNCH ITEMS
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-black uppercase tracking-tight text-[#0B1230] leading-[1.02]">
              BIG CRUNCH. <br className="hidden sm:block" />
              <span className="text-[#FF5400]">ZERO BORING.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Handpicked whole Bihar lotus pops slow-roasted in small artisanal batches. 100% roasted, zero palm oil, real spices and chef seasonings. Meet your new daily crunch.
            </p>
          </div>

          {/* Flavour quick tags & Shop link */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              {flavourPills.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#0B1230] font-mono text-[11px] font-bold border border-stone-200 shadow-2xs"
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
              ALL PACKS ➔
            </Link>
          </div>
        </div>

        {/* 4-Card Responsive Grid on Warm Ivory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {launchPacks.map((prod, idx) => (
            <ProductCard
              key={prod.id || prod.handle || idx}
              product={prod}
              index={idx}
              colorMode="light"
            />
          ))}
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
          </div>

          <Link
            to="/shop"
            className="font-mono text-xs font-bold text-[#FF5400] hover:text-[#0B1230] transition-colors flex items-center gap-1"
          >
            <span>VIEW ALL POUCH SIZES &amp; MULTI-PACKS</span>
            <span>➔</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
