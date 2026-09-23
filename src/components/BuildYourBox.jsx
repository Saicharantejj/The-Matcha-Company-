import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { photos } from '../data/photos'

const BOX_TIERS = [
  {
    id: 'trio',
    name: 'Trio Sampler Box',
    capacity: 3,
    price: 499,
    mrp: 599,
    discount: '17% OFF',
    tag: 'STARTER GIFT',
    description: '3 full-sized signature pouches in a premium gift sleeve.',
  },
  {
    id: 'celebration',
    name: 'Celebration Gift Box',
    capacity: 5,
    price: 799,
    mrp: 995,
    discount: '20% OFF',
    tag: '★ MOST POPULAR',
    popular: true,
    description: '5 custom curated pouches with festive magnetic gift packaging.',
  },
  {
    id: 'party',
    name: 'Grand Party Hamper',
    capacity: 8,
    price: 1199,
    mrp: 1592,
    discount: '25% OFF',
    tag: 'BEST VALUE',
    description: '8 custom pouches for sharing, family gifting, and celebrations.',
  },
]

const FLAVOUR_OPTIONS = [
  {
    id: 'chocolate-makhana',
    name: 'Chocolate Makhana',
    tagline: 'Dark Cocoa Glaze • Himalayan Salt',
    spice: 'Sweet & Salty 🍫',
    size: '70g Pouch',
    accent: '#D4AF37',
    badgeColor: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30',
    image: photos.chocolateMakhanaPack.src,
    nutrition: '~142 kcal • 3.8g Protein',
  },
  {
    id: 'cheese-and-herbs',
    name: 'Cheese & Herbs Makhana',
    tagline: 'Aged Cheddar • Mountain Oregano',
    spice: 'Cheesy Herb 🧀🌿',
    size: '70g Pouch',
    accent: '#10B981',
    badgeColor: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30',
    image: photos.cheeseAndHerbsMakhanaPack.src,
    nutrition: '~136 kcal • 4.4g Protein',
  },
  {
    id: 'jalapeno',
    name: 'Jalapeno Makhana',
    tagline: 'Smoky Green Jalapeno • Citrus Lime',
    spice: 'Fiery Zest 🌶️⚡',
    size: '70g Pouch',
    accent: '#EF4444',
    badgeColor: 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30',
    image: photos.jalapenoMakhanaPack.src,
    nutrition: '~131 kcal • 4.1g Protein',
  },
  {
    id: 'peri-peri',
    name: 'Peri Peri Makhana',
    tagline: 'Bird’s Eye Chili • Smoked Garlic',
    spice: 'High Heat 🌶️🔥',
    size: '50g Pouch',
    accent: '#F43F5E',
    badgeColor: 'bg-[#F43F5E]/20 text-[#F43F5E] border-[#F43F5E]/30',
    image: photos.masalaPack.src,
    nutrition: '~132 kcal • 4.0g Protein',
  },
  {
    id: 'kashmiri-garlic',
    name: 'Kashmiri Garlic Chilli',
    tagline: 'Toasted Garlic • Kashmiri Mirch',
    spice: 'Warm Garlic 🧄🌶️',
    size: '50g Pouch',
    accent: '#EA580C',
    badgeColor: 'bg-[#EA580C]/20 text-[#EA580C] border-[#EA580C]/30',
    image: photos.meshBagIngredients.src,
    nutrition: '~134 kcal • 4.2g Protein',
  },
  {
    id: 'pudhina',
    name: 'Pudhina Makhana',
    tagline: 'Garden Spearmint • Tangy Amchur',
    spice: 'Fresh Mint 🌿',
    size: '50g Pouch',
    accent: '#0D9488',
    badgeColor: 'bg-[#0D9488]/20 text-[#0D9488] border-[#0D9488]/30',
    image: photos.pudhinaPack.src,
    nutrition: '~130 kcal • 4.1g Protein',
  },
]

const BOX_THEMES = [
  { id: 'royal', name: 'Royal Midnight Navy & Gold', icon: '👑' },
  { id: 'festive', name: 'Festive Celebrations Ribbon', icon: '🎀' },
  { id: 'kraft', name: 'Artisanal Eco-Kraft Box', icon: '🌿' },
]

export default function BuildYourBox() {
  const [selectedTierId, setSelectedTierId] = useState('celebration')
  const [selections, setSelections] = useState({
    'chocolate-makhana': 2,
    'cheese-and-herbs': 2,
    'jalapeno': 1,
    'peri-peri': 0,
    'kashmiri-garlic': 0,
    'pudhina': 0,
  })
  const [boxTheme, setBoxTheme] = useState('royal')
  const [recipientName, setRecipientName] = useState('')
  const [giftNote, setGiftNote] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const { addItem, openCart } = useCart()
  const { addToast } = useToast()

  const activeTier = BOX_TIERS.find((t) => t.id === selectedTierId) || BOX_TIERS[1]

  // Calculate total packs selected
  const totalPacks = useMemo(() => {
    return Object.values(selections).reduce((sum, q) => sum + (Number(q) || 0), 0)
  }, [selections])

  const slotsRemaining = Math.max(0, activeTier.capacity - totalPacks)
  const isComplete = totalPacks === activeTier.capacity
  const isOverfilled = totalPacks > activeTier.capacity

  // Flavour breakdown list
  const selectedFlavoursList = useMemo(() => {
    return FLAVOUR_OPTIONS.map((f) => ({
      ...f,
      qty: selections[f.id] || 0,
    })).filter((f) => f.qty > 0)
  }, [selections])

  // Handle flavour quantity updates
  const handleUpdateQty = (flavourId, delta) => {
    setSelections((prev) => {
      const current = prev[flavourId] || 0
      const next = Math.max(0, current + delta)
      return { ...prev, [flavourId]: next }
    })
  }

  // Quick auto-fill
  const handleAutoFill = () => {
    const target = activeTier.capacity
    const newSelections = {
      'chocolate-makhana': 0,
      'cheese-and-herbs': 0,
      'jalapeno': 0,
      'peri-peri': 0,
      'kashmiri-garlic': 0,
      'pudhina': 0,
    }

    if (target === 3) {
      newSelections['chocolate-makhana'] = 1
      newSelections['cheese-and-herbs'] = 1
      newSelections['jalapeno'] = 1
    } else if (target === 5) {
      newSelections['chocolate-makhana'] = 2
      newSelections['cheese-and-herbs'] = 2
      newSelections['jalapeno'] = 1
    } else {
      newSelections['chocolate-makhana'] = 2
      newSelections['cheese-and-herbs'] = 2
      newSelections['jalapeno'] = 2
      newSelections['peri-peri'] = 1
      newSelections['pudhina'] = 1
    }

    setSelections(newSelections)
    addToast(`Auto-balanced ${target} packs in your box! 🍿`, 'info')
  }

  // Clear selections
  const handleClear = () => {
    const cleared = {}
    FLAVOUR_OPTIONS.forEach((f) => {
      cleared[f.id] = 0
    })
    setSelections(cleared)
  }

  // Add custom gift box to cart
  const handleAddToCart = async () => {
    if (totalPacks === 0) {
      addToast('Please select at least 1 flavour pack for your gift box.', 'error')
      return
    }

    if (totalPacks < activeTier.capacity) {
      addToast(`Please add ${slotsRemaining} more pack${slotsRemaining > 1 ? 's' : ''} to complete your ${activeTier.name}!`, 'info')
      return
    }

    setIsAdding(true)
    try {
      const summaryParts = selectedFlavoursList.map((f) => `${f.qty}x ${f.name}`)
      const summaryString = summaryParts.join(', ')

      const customBoxItem = {
        id: `custom-gift-box-${Date.now()}`,
        name: `Custom Gift Pack (${activeTier.name})`,
        flavor: `Custom Gift Pack (${activeTier.name})`,
        size: `${totalPacks} Packs: ${summaryString}`,
        packSize: `${totalPacks} Packs`,
        price: activeTier.price,
        mrp: activeTier.mrp,
        image: photos.tabletopLifestyle.src,
        recipient: recipientName.trim() || undefined,
        giftNote: giftNote.trim() || undefined,
        boxTheme: BOX_THEMES.find((t) => t.id === boxTheme)?.name,
        breakdown: summaryString,
        availableForSale: true,
      }

      await addItem(customBoxItem, 1)
      addToast(`🎉 Added your Custom Gift Pack to Stash!`, 'success')
      openCart()
    } catch (err) {
      console.error(err)
      addToast('Could not add to cart. Please try again.', 'error')
    } finally {
      setIsAdding(false)
    }
  }

  // Flattened array of packs for visual slot representation
  const visualPacks = useMemo(() => {
    const list = []
    selectedFlavoursList.forEach((f) => {
      for (let i = 0; i < f.qty; i++) {
        list.push(f)
      }
    })
    return list
  }, [selectedFlavoursList])

  return (
    <section className="py-12 sm:py-20 bg-[#0C122C] text-[#FAF8F5] relative overflow-hidden" id="custom-gift-pack">
      {/* Background atmospheric ambient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FF5400]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#1C2A6B]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* ── HEADER BANNER ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5400]/15 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest border border-[#FF5400]/30 shadow-2xs">
            <span>🎁</span>
            <span>CUSTOMISE YOUR GIFT PACK</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            BUILD YOUR <span className="text-[#FF5400]">DREAM PACK.</span>
          </h1>

          <p className="font-sans text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Pick your favourite roasted flavours, choose how many packs of each you crave, and personalise with a custom gift box &amp; handwritten greeting note.
          </p>
        </div>

        {/* ── STEP 1: SELECT BOX CAPACITY & SAVINGS ────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5400] text-white font-mono text-xs font-black">
                1
              </span>
              <h2 className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-wide">
                SELECT GIFT BOX SIZE
              </h2>
            </div>
            <span className="font-mono text-xs text-stone-400">
              Up to 25% Bundle Savings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BOX_TIERS.map((tier) => {
              const isSelected = tier.id === selectedTierId
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`p-5 rounded-3xl border-2 text-left transition-all duration-200 relative flex flex-col justify-between space-y-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#17245B] border-[#FF5400] shadow-xl shadow-[#FF5400]/10 scale-[1.02]'
                      : 'bg-[#131D4A] border-[#243373] hover:border-stone-400/50 opacity-90 hover:opacity-100'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {tier.tag}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-lg font-bold text-white uppercase tracking-tight">
                        {tier.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-stone-200 font-mono text-xs font-bold">
                        {tier.capacity} Packs
                      </span>
                    </div>
                    <p className="font-sans text-xs text-stone-300 mt-1 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-black text-[#FF5400]">
                        ₹{tier.price}
                      </span>
                      <span className="font-mono text-xs text-stone-400 line-through">
                        ₹{tier.mrp}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-emerald-400">
                      {tier.discount}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MAIN WORKSPACE: FLAVOUR SELECTION & LIVE BOX PREVIEW ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: FLAVOUR SELECTION ROSTER */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#243373]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5400] text-white font-mono text-xs font-black">
                  2
                </span>
                <h2 className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-wide">
                  CUSTOMISE FLAVOURS &amp; PACKS
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="font-mono text-xs text-[#FF5400] hover:underline cursor-pointer font-bold"
                >
                  ⚡ Auto-Fill
                </button>
                <span className="text-stone-600">•</span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-mono text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FLAVOUR_OPTIONS.map((flavour) => {
                const qty = selections[flavour.id] || 0
                return (
                  <motion.div
                    key={flavour.id}
                    layout
                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                      qty > 0
                        ? 'bg-[#131D4A] border-[#FF5400]/80 shadow-md'
                        : 'bg-[#10183D] border-[#243373] hover:border-[#243373]/90'
                    }`}
                  >
                    <div className="flex gap-3.5 items-start">
                      {/* Pouch thumbnail */}
                      <div className="h-20 w-16 shrink-0 rounded-2xl bg-[#0C122C] border border-[#243373] overflow-hidden p-1 flex items-center justify-center relative">
                        <img
                          src={flavour.image}
                          alt={flavour.name}
                          className="h-full w-full object-cover rounded-xl"
                          loading="lazy"
                        />
                        {qty > 0 && (
                          <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-black flex items-center justify-center shadow-xs">
                            {qty}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${flavour.badgeColor}`}>
                            {flavour.spice}
                          </span>
                          <span className="font-mono text-[10px] text-stone-400">
                            {flavour.size}
                          </span>
                        </div>
                        <h3 className="font-display text-sm font-bold text-white uppercase leading-snug truncate">
                          {flavour.name}
                        </h3>
                        <p className="font-sans text-[11px] text-stone-300 leading-snug line-clamp-1">
                          {flavour.tagline}
                        </p>
                        <p className="font-mono text-[10px] text-emerald-400 font-semibold">
                          {flavour.nutrition}
                        </p>
                      </div>
                    </div>

                    {/* Stepper controls */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-xs text-stone-300">
                        {qty === 0 ? 'Not added' : `${qty} in box`}
                      </span>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(flavour.id, 1)}
                          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#FF5400] text-white font-mono text-xs font-bold transition-all flex items-center gap-1 cursor-pointer hover-pop-subtle"
                        >
                          <span>+ ADD</span>
                        </button>
                      ) : (
                        <div className="inline-flex items-center rounded-full bg-[#0C122C] border border-[#243373] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(flavour.id, -1)}
                            className="h-7 w-8 flex items-center justify-center font-mono text-xs font-bold text-stone-300 hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label={`Decrease ${flavour.name}`}
                          >
                            −
                          </button>
                          <span className="min-w-[1.75rem] px-1 text-center font-mono text-xs font-bold text-white tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(flavour.id, 1)}
                            className="h-7 w-8 flex items-center justify-center font-mono text-xs font-bold text-stone-300 hover:bg-[#FF5400] hover:text-white transition-colors cursor-pointer"
                            aria-label={`Increase ${flavour.name}`}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* RIGHT 5 COLS: REAL-TIME BOX VISUALIZER & CHECKOUT PANEL */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Box summary card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#131D4A] border-2 border-[#243373] shadow-2xl space-y-6">
              
              {/* Progress Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>📦</span>
                    <span>{activeTier.name}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FF5400] bg-[#FF5400]/10 px-2.5 py-1 rounded-full border border-[#FF5400]/20">
                    {totalPacks} of {activeTier.capacity} Packs
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#0C122C] h-2 rounded-full overflow-hidden border border-[#243373]">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isComplete
                        ? 'bg-emerald-500'
                        : isOverfilled
                        ? 'bg-amber-400'
                        : 'bg-gradient-to-r from-[#FF5400] to-amber-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.round((totalPacks / activeTier.capacity) * 100))}%`,
                    }}
                  />
                </div>

                {/* Status Indicator */}
                <div className="font-mono text-xs">
                  {isComplete ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <span>✓</span> Box is complete &amp; ready to pack!
                    </span>
                  ) : slotsRemaining > 0 ? (
                    <span className="text-stone-300">
                      Select <strong className="text-[#FF5400]">{slotsRemaining} more pack{slotsRemaining > 1 ? 's' : ''}</strong> to fill this box.
                    </span>
                  ) : (
                    <span className="text-amber-400">
                      You have selected {totalPacks} packs ({totalPacks - activeTier.capacity} extra).
                    </span>
                  )}
                </div>
              </div>

              {/* ── REAL-TIME VISUAL PACK SLOTS ──────────────────────────── */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  PACK SLOTS PREVIEW:
                </span>
                
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-3 rounded-2xl bg-[#0C122C] border border-[#243373]/80 min-h-[90px] items-center">
                  {Array.from({ length: Math.max(activeTier.capacity, totalPacks) }).map((_, slotIdx) => {
                    const pack = visualPacks[slotIdx]
                    return (
                      <motion.div
                        key={slotIdx}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 relative text-center border transition-all ${
                          pack
                            ? 'bg-[#17245B] border-[#FF5400]/60 shadow-xs'
                            : 'bg-transparent border-dashed border-[#243373] text-stone-500'
                        }`}
                      >
                        {pack ? (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <span className="text-base sm:text-lg">🍿</span>
                            <span className="font-mono text-[8px] font-bold text-white truncate max-w-full leading-none mt-1">
                              {pack.name.split(' ')[0]}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-xs text-stone-500 font-mono">+</span>
                            <span className="font-mono text-[7px] text-stone-500 uppercase">Empty</span>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* ── STEP 3: GIFT PERSONALIZATION ──────────────────────────── */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5400] text-white font-mono text-[10px] font-black">
                    3
                  </span>
                  <span className="font-display text-sm font-bold uppercase text-white tracking-wide">
                    PERSONALISE YOUR GIFT (OPTIONAL)
                  </span>
                </div>

                {/* Box Theme selection */}
                <div className="grid grid-cols-3 gap-2">
                  {BOX_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setBoxTheme(theme.id)}
                      className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                        boxTheme === theme.id
                          ? 'bg-[#0C122C] border-[#FF5400] text-white font-bold'
                          : 'bg-[#0C122C]/40 border-[#243373] text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="text-base block">{theme.icon}</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider block mt-1 truncate">
                        {theme.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Recipient & Note */}
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Recipient's Name (e.g. Sneha)"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0C122C] border border-[#243373] text-xs font-sans text-white placeholder-stone-500 focus:outline-none focus:border-[#FF5400] transition-colors"
                  />
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Gift Message (e.g. Happy Snacking! With love...)"
                    rows={2}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0C122C] border border-[#243373] text-xs font-sans text-white placeholder-stone-500 focus:outline-none focus:border-[#FF5400] transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                  <span>✓</span>
                  <span>Free handwritten greeting card &amp; luxury gift wrap</span>
                </div>
              </div>

              {/* ── PRICE & ADD TO CART CTA ───────────────────────────────── */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">
                      TOTAL PACK VALUE:
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-black text-white">
                        ₹{activeTier.price}
                      </span>
                      <span className="font-mono text-sm text-stone-400 line-through">
                        ₹{activeTier.mrp}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                      Save ₹{activeTier.mrp - activeTier.price}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400 block mt-1">
                      Free Shipping Included
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-4 rounded-full bg-[#FF5400] hover:bg-[#E04800] text-white font-sans text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[#FF5400]/25 cursor-pointer hover-pop hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAdding ? (
                    <span>PACKING YOUR BOX...</span>
                  ) : (
                    <>
                      <span>ADD CUSTOM GIFT PACK TO CART</span>
                      <span>➔</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quality & Delivery Assurance */}
            <div className="p-4 rounded-2xl bg-[#0C122C] border border-[#243373] grid grid-cols-2 gap-3 text-center font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-[#FF5400] font-bold block">100% ROASTED</span>
                <span className="text-stone-400 text-[10px]">Zero Palm Oil</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-emerald-400 font-bold block">DISPATCH 24H</span>
                <span className="text-stone-400 text-[10px]">Airtight Sealed</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
