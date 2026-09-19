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
    specs: ['ROASTED NOT FRIED', 'INDIAN FLAVOURS REAL INGREDIENTS', '50 g POUCH'],
    accent: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    borderAccent: '#D4AF37',
    badge: '🔥 DROP 01 LAUNCH',
    spice: 'Sweet & Salty 🍫',
    image: photos.chocolateMakhanaPack.src,
    price: '₹199',
    mrp: '₹219',
  },
  {
    handle: 'cheese-and-herbs-makhana',
    name: 'Cheese and Herbs Makhana',
    packetName: 'CHEESE AND HERBS MAKHANA',
    tagline: 'Aged Cheddar • Mountain Oregano • Roasted Butter',
    personality: 'Savory perfection. Whole roasted Bihar lotus seeds tossed in sharp aged cheddar cheese dust, dried wild mountain oregano, rubbed thyme, and slow-roasted garlic butter.',
    specs: ['ROASTED NOT FRIED', 'INDIAN FLAVOURS REAL INGREDIENTS', '50 g POUCH'],
    accent: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    borderAccent: '#10B981',
    badge: '🔥 DROP 01 LAUNCH',
    spice: 'Cheesy Herb 🧀🌿',
    image: photos.cheeseAndHerbsMakhanaPack.src,
    price: '₹199',
    mrp: '₹219',
  },
  {
    handle: 'jalapeno-makhana',
    name: 'Jalapeno Makhana',
    packetName: 'JALAPENO MAKHANA',
    tagline: 'Smoky Green Jalapeno • Citrus Lime • High Crunch',
    personality: 'Electrifying crunch. Whole lotus seeds slow-roasted and tossed in fiery sun-dried green jalapeno chili, tangy Mexican lime zest, and pink Himalayan rock salt for an instant rush.',
    specs: ['ROASTED NOT FRIED', 'INDIAN FLAVOURS REAL INGREDIENTS', '50 g POUCH'],
    accent: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.25)',
    borderAccent: '#EF4444',
    badge: '🔥 DROP 01 LAUNCH',
    spice: 'Fiery Zest 🌶️⚡',
    image: photos.jalapenoMakhanaPack.src,
    price: '₹199',
    mrp: '₹219',
  },
]

const COMING_SOON_FLAVOURS = [
  {
    name: 'Peri Peri Makhana',
    heat: 'High Heat 🌶️',
    note: 'African Bird’s Eye Chili & Garlic Dust',
    status: 'BATCH 02 TESTING',
  },
  {
    name: 'Kashmiri Garlic Chilli',
    heat: 'Warm Garlic 🧄🌶️',
    note: 'Toasted Golden Garlic & Fragrant Red Flakes',
    status: 'RECIPE LOCKED',
  },
  {
    name: 'Pudhina Makhana',
    heat: 'Fresh Mint 🌿',
    note: 'Garden Spearmint, Amchur & Roasted Rock Salt',
    status: 'IN THE ROASTER',
  },
]

export default function FlavourDiscovery() {
  const [activeFlavour, setActiveFlavour] = useState(LAUNCH_FLAVOURS[0])
  const { addToast } = useToast()

  const handleNotifyDrop02 = (flavorName) => {
    addToast(`You're subscribed to ${flavorName} VIP Drop 02 alerts! 🧪🚀`, 'success')
  }

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#0C122C] border-b border-stone-200/80 dark:border-[#243373] transition-colors" id="flavours">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
                KAUNSA CHASKA?
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold uppercase">
                3 OFFICIAL LAUNCH FLAVOURS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B] dark:text-white leading-tight">
              DROP 01: <span className="text-[#FF5400]">CHOOSE YOUR CRUNCH.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
              We launched with exactly 3 uncompromising recipes, hand-printed on the official packets. 100% roasted not fried.
            </p>
          </div>

          <Link
            to="/shop"
            className="btn-outline dark:border-[#243373] dark:text-stone-200 dark:hover:border-white text-xs font-bold uppercase tracking-wider shrink-0"
          >
            SEE ALL LAUNCH PACKS ➔
          </Link>
        </div>

        {/* 3 Launch Flavour Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {LAUNCH_FLAVOURS.map((f, idx) => {
            const isSelected = activeFlavour.handle === f.handle

            return (
              <button
                key={f.handle}
                type="button"
                onClick={() => setActiveFlavour(f)}
                className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-[#FAF8F5] dark:bg-[#131D4A] shadow-card scale-[1.02]'
                    : 'bg-white dark:bg-[#0C122C] border-stone-200/80 dark:border-[#243373] hover:border-stone-400 dark:hover:border-stone-500'
                }`}
                style={{
                  borderColor: isSelected ? f.borderAccent : undefined,
                  boxShadow: isSelected ? `0 10px 30px -10px ${f.glowColor}` : undefined,
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: f.accent }}
                    >
                      FLAVOUR 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-300">
                      {f.spice}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-[#17245B] dark:text-white uppercase leading-tight tracking-tight">
                      {f.packetName}
                    </h3>
                    <p className="font-sans text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                      {f.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200/70 dark:border-[#243373] flex items-center justify-between font-mono text-[11px] font-bold">
                  <span className="text-[#17245B] dark:text-white">{f.price} (50g)</span>
                  <span className="text-[#FF5400] flex items-center gap-1">
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
            className="rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-stone-200/80 dark:border-[#243373] bg-[#FAF8F5] dark:bg-[#131D4A] shadow-card relative overflow-hidden"
            style={{
              borderColor: activeFlavour.borderAccent,
              boxShadow: `0 20px 40px -15px ${activeFlavour.glowColor}`,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Info Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-3.5 py-1 rounded-full text-white font-mono text-[11px] font-black uppercase tracking-wider"
                    style={{ backgroundColor: activeFlavour.accent }}
                  >
                    {activeFlavour.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-200 dark:bg-[#1C2A6B] text-[#17245B] dark:text-stone-200 font-mono text-[11px] font-bold uppercase">
                    50g OFFICIAL POUCH
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] dark:text-white tracking-tight leading-none">
                    {activeFlavour.packetName}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#FF5400] mt-2 uppercase">
                    {activeFlavour.tagline}
                  </p>
                </div>

                <p className="font-sans text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                  {activeFlavour.personality}
                </p>

                {/* Packet Spec Badges (ROASTED NOT FRIED, INDIAN FLAVOURS REAL INGREDIENTS) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {activeFlavour.specs.map((spec) => (
                    <div
                      key={spec}
                      className="p-2.5 rounded-xl bg-white dark:bg-[#0C122C] border border-stone-200/80 dark:border-[#243373] text-center font-mono text-[10px] font-black text-[#17245B] dark:text-stone-200 uppercase"
                    >
                      ✓ {spec}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/products/${activeFlavour.handle}`}
                    className="btn px-8 py-4 text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    SHOP {activeFlavour.packetName} ({activeFlavour.price}) ➔
                  </Link>
                  <Link
                    to="/products/chaska-try-all-5"
                    className="font-mono text-xs font-bold text-[#17245B] dark:text-stone-300 hover:text-[#FF5400] transition-colors"
                  >
                    OR GET IN THE 3-PACK LAUNCH TRIO 📦
                  </Link>
                </div>
              </div>

              {/* Right Image Stage */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative aspect-[3/4] w-full max-w-sm rounded-3xl overflow-hidden border-2 border-stone-200 dark:border-[#243373] bg-stone-900 shadow-2xl p-2 group">
                  <img
                    src={activeFlavour.image}
                    alt={activeFlavour.packetName}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold uppercase tracking-widest border border-white/20">
                    50 g POUCH
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── DROP 02: THE EXPERIMENTAL LAB (COMING SOON) ────────────────────── */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#17245B] dark:bg-[#131D4A] text-white border border-[#243373] space-y-6 shadow-md relative overflow-hidden">
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
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-[#FF5400] uppercase bg-[#FF5400]/20 px-2.5 py-0.5 rounded-full border border-[#FF5400]/30">
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
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#FF5400] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-colors border border-white/15 cursor-pointer mt-2"
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
