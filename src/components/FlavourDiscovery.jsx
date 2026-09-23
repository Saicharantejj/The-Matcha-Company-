import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { photos } from '../data/photos'
import { useToast } from './Toast'

const LAUNCH_FLAVOURS = [
  {
    handle: 'chocolate-makhana',
    name: 'Chocolate Makhana',
    packetName: 'CHOCOLATE MAKHANA',
    tagline: 'Dark Cocoa Glaze • Sea Salt • Pure Crunch',
    personality: 'Slow-roasted jumbo lotus pops enrobed in decadent dark cocoa glaze, caramelized raw sugar, and crystal Himalayan rock salt. Dessert meets crunch without the guilt.',
    specs: ['ROASTED NOT FRIED', 'INDIAN FLAVOURS REAL INGREDIENTS', '70g & 30g POUCHES'],
    accent: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.3)',
    borderAccent: '#D4AF37',
    badge: '🔥 DROP 01 LAUNCH',
    spice: 'Sweet & Salty 🍫',
    image: photos.chocolateMakhanaPack.src,
    price: '₹199',
    mrp: '₹219',
    flavourNote: 'Decadent dark cocoa & Himalayan rock salt',
  },
  {
    handle: 'cheese-and-herbs-makhana',
    name: 'Cheese and Herbs Makhana',
    packetName: 'CHEESE AND HERBS MAKHANA',
    tagline: 'Aged Cheddar • Mountain Oregano • Roasted Butter',
    personality: 'Savory perfection. Whole roasted Bihar lotus seeds tossed in sharp aged cheddar cheese dust, dried wild mountain oregano, rubbed thyme, and slow-roasted garlic butter.',
    specs: ['ROASTED NOT FRIED', 'INDIAN FLAVOURS REAL INGREDIENTS', '70g & 30g POUCHES'],
    accent: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    borderAccent: '#10B981',
    badge: '🔥 DROP 01 LAUNCH',
    spice: 'Cheesy Herb 🧀🌿',
    image: photos.cheeseAndHerbsMakhanaPack.src,
    price: '₹199',
    mrp: '₹219',
    flavourNote: 'Sharp cheddar dust & sun-dried mountain herbs',
  },
  {
    handle: 'jalapeno-makhana',
    name: 'Jalapeño Makhana',
    packetName: 'JALAPEÑO MAKHANA',
    tagline: 'Smoky Green Jalapeño • Citrus Lime • High Crunch',
    personality: 'Electrifying crunch. Whole lotus seeds slow-roasted and tossed in fiery sun-dried green jalapeno chili, tangy Mexican lime zest, and pink Himalayan rock salt for an instant rush.',
    specs: ['ROASTED NOT FRIED', 'INDIAN FLAVOURS REAL INGREDIENTS', '70g & 30g POUCHES'],
    accent: '#4D8C24',
    secondaryAccent: '#C8E86B',
    glowColor: 'rgba(77, 140, 36, 0.3)',
    borderAccent: '#4D8C24',
    badge: '🔥 DROP 01 LAUNCH',
    spice: 'Fiery Zest 🌶️⚡',
    image: photos.jalapenoMakhanaPack.src,
    price: '₹199',
    mrp: '₹219',
    flavourNote: 'Sun-dried green chili & Mexican lime zest',
  },
]

const COMING_SOON_FLAVOURS = [
  {
    name: 'Peri Peri Makhana',
    heat: 'High Heat 🌶️',
    note: 'African Bird’s Eye Chili & Garlic Dust',
    status: 'BATCH 02 TESTING',
    accent: '#F04444',
    border: 'rgba(240, 68, 68, 0.4)',
    bg: 'rgba(240, 68, 68, 0.1)',
  },
  {
    name: 'Kashmiri Garlic Chilli',
    heat: 'Warm Garlic 🧄🌶️',
    note: 'Toasted Golden Garlic & Fragrant Red Flakes',
    status: 'RECIPE LOCKED',
    accent: '#B91C1C',
    border: 'rgba(185, 28, 28, 0.4)',
    bg: 'rgba(185, 28, 28, 0.1)',
  },
  {
    name: 'Pudina Makhana',
    heat: 'Fresh Mint 🌿',
    note: 'Garden Spearmint, Amchur & Roasted Rock Salt',
    status: 'IN THE ROASTER',
    accent: '#0D9488',
    border: 'rgba(13, 148, 136, 0.4)',
    bg: 'rgba(13, 148, 136, 0.1)',
  },
]

export default function FlavourDiscovery() {
  const [activeFlavour, setActiveFlavour] = useState(LAUNCH_FLAVOURS[0])
  const { addToast } = useToast()

  const handleNotifyDrop02 = (flavorName) => {
    addToast(`You're subscribed to ${flavorName} VIP Drop 02 alerts! 🧪🚀`, 'success')
  }

  return (
    <section className="py-20 sm:py-28 bg-[#0C122C] text-[#FAF8F5] border-b border-[#243373] relative overflow-hidden" id="flavours">
      {/* Dynamic ambient background glow tied to the selected flavour */}
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: activeFlavour.accent }}
      />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-[#17245B]/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#243373] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5400] animate-pulse" />
                KAUNSA CHASKA?
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 font-mono text-[10px] font-bold uppercase border border-emerald-800/50">
                3 OFFICIAL LAUNCH FLAVOURS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              DROP 01: <span className="text-[#FF5400]">CHOOSE YOUR CRUNCH.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-300 font-normal leading-relaxed">
              Three uncompromising recipes slow-roasted with Bihar lotus seeds and chef-crafted seasonings. Pick your daily crunch or sample all three. Ek packet se kaam nahi chalega.
            </p>
          </div>

          <Link
            to="/shop"
            className="btn-outline text-xs font-bold uppercase tracking-wider shrink-0"
          >
            SEE ALL LAUNCH PACKS ➔
          </Link>
        </div>

        {/* 3 Launch Flavour Selectors with Flavour-Specific Identies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {LAUNCH_FLAVOURS.map((f, idx) => {
            const isSelected = activeFlavour.handle === f.handle

            return (
              <button
                key={f.handle}
                type="button"
                onClick={() => setActiveFlavour(f)}
                className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer overflow-hidden hover-pop-card ${
                  isSelected
                    ? 'bg-[#17245B] shadow-card scale-[1.02]'
                    : 'bg-[#131D4A]/80 border-[#243373] hover:border-stone-400'
                }`}
                style={{
                  borderColor: isSelected ? f.borderAccent : undefined,
                  boxShadow: isSelected ? `0 12px 36px -10px ${f.glowColor}` : undefined,
                }}
              >
                {/* Flavour top indicator line */}
                <div
                  className="h-1 -mt-6 -mx-6 mb-2 shrink-0 transition-opacity"
                  style={{
                    backgroundColor: f.accent,
                    opacity: isSelected ? 1 : 0.4,
                  }}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white shadow-2xs"
                      style={{ backgroundColor: f.accent }}
                    >
                      FLAVOUR 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-stone-300">
                      {f.spice}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase leading-tight tracking-tight">
                      {f.packetName}
                    </h3>
                    <p className="font-sans text-xs text-stone-300 mt-1 line-clamp-2">
                      {f.flavourNote}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#243373] flex items-center justify-between font-mono text-[11px] font-bold">
                  <span className="text-white">{f.price} (70g)</span>
                  <span
                    className="flex items-center gap-1 transition-colors"
                    style={{ color: isSelected ? f.accent : '#FF5400' }}
                  >
                    {isSelected ? 'ACTIVE SELECTION ★' : 'TAP TO PREVIEW ➔'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Dynamic Highlight Stage for Selected Launch Flavour */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFlavour.handle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-6 sm:p-10 lg:p-12 border-2 bg-[#131D4A] shadow-card relative overflow-hidden"
            style={{
              borderColor: activeFlavour.borderAccent,
              boxShadow: `0 24px 50px -15px ${activeFlavour.glowColor}`,
            }}
          >
            {/* Subtle decorative flavour gradient on the card background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-500"
              style={{
                background: `radial-gradient(circle at top right, ${activeFlavour.accent} 0%, transparent 60%)`,
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Info Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-3.5 py-1 rounded-full text-white font-mono text-[11px] font-black uppercase tracking-wider shadow-2xs"
                    style={{ backgroundColor: activeFlavour.accent }}
                  >
                    {activeFlavour.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2A6B] text-stone-200 font-mono text-[11px] font-bold uppercase border border-[#243373]">
                    70G OFFICIAL POUCH
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-stone-200 font-mono text-[11px] font-bold uppercase">
                    {activeFlavour.spice}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
                    {activeFlavour.packetName}
                  </h3>
                  <p
                    className="font-mono text-xs sm:text-sm font-bold mt-2 uppercase tracking-wide"
                    style={{ color: activeFlavour.accent }}
                  >
                    {activeFlavour.tagline}
                  </p>
                </div>

                <p className="font-sans text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
                  {activeFlavour.personality}
                </p>

                {/* Packet Spec Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {activeFlavour.specs.map((spec) => (
                    <div
                      key={spec}
                      className="p-2.5 rounded-xl bg-[#0C122C] border border-[#243373] text-center font-mono text-[10px] font-black text-stone-200 uppercase flex items-center justify-center gap-1.5"
                    >
                      <span style={{ color: activeFlavour.accent }}>✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/products/${activeFlavour.handle}`}
                    className="btn px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-sm hover-pop"
                    style={{
                      borderColor: activeFlavour.accent,
                    }}
                  >
                    SHOP {activeFlavour.packetName} ({activeFlavour.price}) ➔
                  </Link>
                  <Link
                    to="/products/chaska-try-all-5"
                    className="font-mono text-xs font-bold text-stone-300 hover:text-[#FF5400] transition-colors py-2 flex items-center gap-1"
                  >
                    <span>OR GET IN THE 3-PACK LAUNCH TRIO 📦</span>
                  </Link>
                </div>
              </div>

              {/* Right Image Stage with Flavour-Toned Backdrop */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  className="relative aspect-[3/4] w-full max-w-sm rounded-3xl overflow-hidden border-2 bg-stone-900 shadow-2xl p-2 group"
                  style={{ borderColor: activeFlavour.borderAccent }}
                >
                  <img
                    src={activeFlavour.image}
                    alt={activeFlavour.packetName}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold uppercase tracking-widest border border-white/20">
                    70g / 30g POUCH
                  </div>
                  <div
                    className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/85 backdrop-blur-md text-white font-mono text-[10px] flex items-center justify-between border"
                    style={{ borderColor: activeFlavour.borderAccent }}
                  >
                    <span className="font-bold" style={{ color: activeFlavour.accent }}>
                      {activeFlavour.packetName}
                    </span>
                    <span className="text-white/80">{activeFlavour.price}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── DROP 02: THE EXPERIMENTAL LAB (COMING SOON) ────────────────────── */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#17245B] text-white border border-[#243373] space-y-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400] flex items-center gap-2">
                <span>🔒 THE EXPERIMENTAL LAB</span>
                <span>•</span>
                <span>DROP 02 VAULT</span>
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                ROASTING IN THE LAB (COMING SOON)
              </h3>
            </div>
            <span className="font-mono text-xs text-stone-300">
              Not for sale yet • Join the VIP Tasting List
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMING_SOON_FLAVOURS.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-2xl bg-white/5 border space-y-3 flex flex-col justify-between hover-pop-card"
                style={{ borderColor: item.border }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border"
                      style={{
                        color: item.accent,
                        backgroundColor: item.bg,
                        borderColor: item.border,
                      }}
                    >
                      {item.status}
                    </span>
                    <span className="font-mono text-xs text-stone-300">
                      {item.heat}
                    </span>
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-black uppercase text-white leading-tight">
                    {item.name}
                  </h4>
                  <p className="font-sans text-xs text-stone-300 mt-1">
                    {item.note}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleNotifyDrop02(item.name)}
                  className="w-full py-2.5 rounded-xl text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all border cursor-pointer mt-2 hover-pop-subtle hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: item.bg,
                    borderColor: item.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = item.accent
                    e.currentTarget.style.borderColor = item.accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = item.bg
                    e.currentTarget.style.borderColor = item.border
                  }}
                >
                  🔔 GET NOTIFIED
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
