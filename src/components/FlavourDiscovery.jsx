import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'

const FLAVOURS = [
  {
    handle: 'peri-peri-makhana',
    name: 'Peri Peri',
    hindi: 'पेरी पेरी',
    mood: 'Spicy wala mood? 🌶️',
    personality: 'African bird\'s eye chilli with a sharp citrus zing. Hot, bold, addictive.',
    accent: '#FF4D15',
    bg: '#FFF5F0',
    border: 'hover:border-[#FF4D15]',
    tag: 'FIESTA CRUNCH',
    spice: '🌶️🌶️ High Heat',
    image: photos.periPeriPack.src,
  },
  {
    handle: 'chilli-cheese-makhana',
    name: 'Chilli Cheese',
    hindi: 'चिली चीज़',
    mood: 'Cheddar crave? 🧀',
    personality: 'Creamy sharp cheddar cheese dust with slow green chilli heat. Pure comfort.',
    accent: '#D97706',
    bg: '#FFFBEB',
    border: 'hover:border-[#D97706]',
    tag: 'CHEEZY CRUNCH',
    spice: '🌶️ Medium Spice',
    image: photos.chillyCheesePack.src,
  },
  {
    handle: 'chilli-lime-makhana',
    name: 'Chilli Lime',
    hindi: 'चिली लाइम',
    mood: 'Thoda tangy? 🍋',
    personality: 'Zesty key lime paired with smoky crushed chillies and pink salt. Super tart.',
    accent: '#15803D',
    bg: '#F0FDF4',
    border: 'hover:border-[#15803D]',
    tag: 'ZESTY PUNCH',
    spice: '🌶️ Tangy Heat',
    image: photos.yellowBasket.src,
  },
  {
    handle: 'kashmiri-garlic-chilli-makhana',
    name: 'Kashmiri Garlic Chilli',
    hindi: 'कश्मीरी लहसुन',
    mood: 'Garlic ka scene? 🧄',
    personality: 'Slow-roasted garlic cloves infused with mild vibrant Kashmiri red chilies.',
    accent: '#B91C1C',
    bg: '#FEF2F2',
    border: 'hover:border-[#B91C1C]',
    tag: 'AROMATIC WARMTH',
    spice: '🌶️ Savoury Warm',
    image: photos.meshBagIngredients.src,
  },
  {
    handle: 'pudhina-makhana',
    name: 'Pudhina',
    hindi: 'पुदीना',
    mood: 'Herbal & cool? 🌿',
    personality: 'Shade-dried garden spearmint with tangy amchur and Kala Namak rock salt.',
    accent: '#0D9488',
    bg: '#F0FDFA',
    border: 'hover:border-[#0D9488]',
    tag: 'COOL MINT CRUNCH',
    spice: '🍃 Refreshing Zest',
    image: photos.pudhinaPack.src,
  },
]

export default function FlavourDiscovery() {
  const [activeFlavour, setActiveFlavour] = useState(FLAVOURS[0])

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#141416]/10" id="flavours">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF4D15]/10 text-[#FF4D15] font-mono text-xs font-extrabold uppercase tracking-widest">
              🔥 KAUNSA CHASKA?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#141416]">
              CHOOSE YOUR <span className="text-[#FF4D15]">CRUNCH MOOD.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#141416]/70 max-w-sm">
            5 signature handcrafted profiles. Roasted slow in small batches for genuine crunch.
          </p>
        </div>

        {/* Flavour Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {FLAVOURS.map((f) => {
            const isSelected = activeFlavour.handle === f.handle

            return (
              <button
                key={f.handle}
                type="button"
                onClick={() => setActiveFlavour(f)}
                onMouseEnter={() => setActiveFlavour(f)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-[#FF4D15] bg-[#FAF7F2] shadow-sm ring-2 ring-[#FF4D15]/20 -translate-y-1'
                    : 'border-[#141416]/10 bg-white hover:border-[#141416]/30'
                }`}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#FF4D15] uppercase block mb-1">
                    {f.tag}
                  </span>
                  <p className="font-display text-base sm:text-lg font-bold text-[#141416] leading-snug">
                    {f.name}
                  </p>
                  <p className="font-hindi text-xs text-[#141416]/60">
                    {f.hindi}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#141416]/8 flex items-center justify-between font-mono text-[10px] font-bold text-[#141416]/70">
                  <span>{f.spice}</span>
                  <span className={isSelected ? 'text-[#FF4D15]' : 'text-transparent'}>●</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Flavour Stage / Reveal */}
        <motion.div
          key={activeFlavour.handle}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl p-6 sm:p-10 border border-[#141416]/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs"
          style={{ backgroundColor: activeFlavour.bg }}
        >
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white font-mono text-xs font-bold text-[#141416] shadow-2xs">
              <span>{activeFlavour.mood}</span>
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#141416] leading-tight">
              {activeFlavour.name} Makhana
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#141416]/85 leading-relaxed font-medium">
              {activeFlavour.personality}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to={`/products/${activeFlavour.handle}`}
                className="btn px-7 py-3.5 text-xs font-bold"
              >
                EXPLORE {activeFlavour.name.toUpperCase()} ➔
              </Link>
              <span className="font-mono text-xs font-bold text-[#141416]/70">
                Packs from ₹450 (Pack of 3)
              </span>
            </div>
          </div>

          <div className="h-44 w-44 sm:h-56 sm:w-56 shrink-0 rounded-2xl bg-white p-2.5 shadow-sm border border-[#141416]/10 overflow-hidden">
            <img
              src={activeFlavour.image}
              alt={activeFlavour.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
