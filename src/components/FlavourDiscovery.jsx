import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'

const FLAVOURS = [
  {
    handle: 'peri-peri-makhana',
    name: 'Peri Peri',
    hindi: 'पेरी पेरी',
    tagline: 'Thoda teekha. Full chaska.',
    personality: 'Fiery bird’s eye chili with a sharp lemon zing and roasted garlic dust. Bold, loud, addictive.',
    accent: '#FF5400',
    bg: '#FFF6F2',
    darkBg: '#1A120E',
    tag: 'BESTSELLER 🌶️',
    spice: 'Fiery Heat',
    image: photos.periPeriPack.src,
  },
  {
    handle: 'chilli-cheese-makhana',
    name: 'Chilli Cheese',
    hindi: 'चिली चीज़',
    tagline: 'Cheesy, spicy, dangerously snackable.',
    personality: 'Melted sharp cheddar cheese dust blended with slow green chili fire. Pure snack indulgence.',
    accent: '#D97706',
    bg: '#FFFDF5',
    darkBg: '#1A170E',
    tag: 'CHEEZY CRUNCH 🧀',
    spice: 'Medium Heat',
    image: photos.chillyCheesePack.src,
  },
  {
    handle: 'chilli-lime-makhana',
    name: 'Chilli Lime',
    hindi: 'चिली लाइम',
    tagline: 'Zesty lime meets slow chili heat.',
    personality: 'Mexican key lime zest with crushed sun-dried red chilies and pink rock salt. Super tart.',
    accent: '#16A34A',
    bg: '#F5FCF7',
    darkBg: '#0F1A12',
    tag: 'TART & SPICY 🍋',
    spice: 'Tangy Heat',
    image: photos.yellowBasket.src,
  },
  {
    handle: 'kashmiri-garlic-chilli-makhana',
    name: 'Kashmiri Garlic Chilli',
    hindi: 'कश्मीरी लहसुन',
    tagline: 'Warm garlic with Kashmiri chili warmth.',
    personality: 'Slow-roasted golden garlic infused with mild, deeply aromatic Kashmiri red chili flakes.',
    accent: '#B91C1C',
    bg: '#FEF6F6',
    darkBg: '#1A1010',
    tag: 'AROMATIC ROAST 🧄',
    spice: 'Warm Spice',
    image: photos.meshBagIngredients.src,
  },
  {
    handle: 'pudhina-makhana',
    name: 'Pudhina',
    hindi: 'पुदीना',
    tagline: 'Crisp garden spearmint & rock salt.',
    personality: 'Shade-dried garden spearmint crushed with tangy amchur and roasted black rock salt.',
    accent: '#0D9488',
    bg: '#F2FCFA',
    darkBg: '#0E1A18',
    tag: 'COOLING MINT 🌿',
    spice: 'Cool & Zesty',
    image: photos.pudhinaPack.src,
  },
]

export default function FlavourDiscovery() {
  const [activeFlavour, setActiveFlavour] = useState(FLAVOURS[0])

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#0C0C0C] border-b border-stone-200/80 dark:border-stone-800 transition-colors" id="flavours">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
              KAUNSA CHASKA?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#141414] dark:text-white">
              CHOOSE YOUR FLAVOUR.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-sm font-normal">
            5 signature handcrafted profiles. 100% slow-roasted in small batches.
          </p>
        </div>

        {/* Flavour Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {FLAVOURS.map((f) => {
            const isSelected = activeFlavour.handle === f.handle

            return (
              <button
                key={f.handle}
                type="button"
                onClick={() => setActiveFlavour(f)}
                onMouseEnter={() => setActiveFlavour(f)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-[#141414] dark:border-[#FF5400] bg-[#FAF8F5] dark:bg-[#1A1A1A] shadow-xs'
                    : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#141414] hover:border-stone-400 dark:hover:border-stone-600'
                }`}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                    {f.tag}
                  </span>
                  <p className="font-display text-base font-bold text-[#141414] dark:text-white leading-snug">
                    {f.name}
                  </p>
                  <p className="font-sans text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {f.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between font-sans text-[11px] font-semibold text-stone-600 dark:text-stone-400">
                  <span>{f.spice}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#FF5400]' : 'bg-transparent'}`} />
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Flavour Stage / Reveal */}
        <motion.div
          key={activeFlavour.handle}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-6 sm:p-10 border border-stone-200/80 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xs bg-[#FAF8F5] dark:bg-[#141414] transition-colors"
        >
          <div className="space-y-3.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#202020] font-sans text-xs font-semibold text-[#141414] dark:text-stone-200 shadow-2xs border border-stone-200/60 dark:border-stone-700">
              <span>{activeFlavour.tagline}</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-[#141414] dark:text-white leading-tight">
              {activeFlavour.name} Makhana
            </h3>

            <p className="font-sans text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {activeFlavour.personality}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to={`/products/${activeFlavour.handle}`}
                className="btn px-7 py-3 text-xs font-bold shadow-xs"
              >
                EXPLORE {activeFlavour.name.toUpperCase()} ➔
              </Link>
              <span className="font-sans text-xs font-medium text-stone-500 dark:text-stone-400">
                Packs from ₹150/pouch
              </span>
            </div>
          </div>

          <div className="h-44 w-44 sm:h-52 sm:w-52 shrink-0 rounded-2xl bg-white dark:bg-[#202020] p-2 shadow-2xs border border-stone-200/60 dark:border-stone-700 overflow-hidden">
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
