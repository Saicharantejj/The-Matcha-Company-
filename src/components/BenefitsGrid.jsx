import { photos } from '../data/photos'

export default function BenefitsGrid() {
  return (
    <section className="py-24 sm:py-28 bg-[#FAF8F5] dark:bg-[#0C122C] border-b border-stone-200/80 dark:border-[#243373] transition-colors" id="benefits">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
            WHY THE CRUNCH?
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#17245B] dark:text-white leading-tight">
            BETTER SNACKS. <span className="text-[#FF5400]">ZERO SHORTCUTS.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
            Lotus seeds have been crunching in Indian homes for centuries. We just brought small-batch roasting discipline and chef-crafted spice blends.
          </p>
        </div>

        {/* Editorial Typography & Photography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Editorial Statements */}
          <div className="lg:col-span-7 space-y-10">
            
            <div className="border-b border-stone-200/80 dark:border-[#243373] pb-8 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[#FF5400] font-mono text-[10px] font-bold uppercase">
                  100% SLOW-ROASTED
                </span>
                <span className="font-hindi text-xs font-semibold text-[#17245B] dark:text-stone-200">
                  तेल नहीं, सिर्फ़ ताज़ा भुना!
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#17245B] dark:text-white tracking-tight">
                ROASTED. NEVER FRIED.
              </h3>
              <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 font-normal leading-relaxed max-w-xl">
                Slow-roasted in small artisanal batches to seal in natural airiness without deep frying in palm oil.
              </p>
            </div>

            <div className="border-b border-stone-200/80 dark:border-[#243373] pb-8 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-[#1C2A6B] text-[#17245B] dark:text-stone-200 font-mono text-[10px] font-bold uppercase">
                  JUMBO LOTUS SEEDS
                </span>
                <span className="font-hindi text-xs font-semibold text-[#17245B] dark:text-stone-200">
                  करारा ऐसा, रुकना मुश्किल!
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#17245B] dark:text-white tracking-tight">
                LIGHT. SERIOUSLY CRUNCHY.
              </h3>
              <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 font-normal leading-relaxed max-w-xl">
                Handpicked jumbo kernels delivering an unapologetically loud, shatteringly crisp crunch in every handful.
              </p>
            </div>

            <div className="pb-2 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[#FF5400] font-mono text-[10px] font-bold uppercase">
                  CHEF CRAFTED
                </span>
                <span className="font-hindi text-xs font-semibold text-[#17245B] dark:text-stone-200">
                  हर दाने में असली चस्का!
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#17245B] dark:text-white tracking-tight">
                AUTHENTIC SPICES ONLY.
              </h3>
              <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 font-normal leading-relaxed max-w-xl">
                Crafted with real pantry spices—Himalayan rock salt, sun-dried garden mint, bird's eye chilli, and aged cheddar. Zero artificial colours.
              </p>
            </div>

          </div>

          {/* Right Column: Macro Photography Showcase */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone-200/80 dark:border-[#243373] shadow-md bg-white dark:bg-[#131D4A] relative group">
              <img
                src={photos.heroMakhanaBowl.src}
                alt="Macro texture of slow-roasted makhana"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-[#131D4A]/95 backdrop-blur-md border border-stone-200/80 dark:border-[#243373] text-xs font-mono text-[#17245B] dark:text-white font-bold flex justify-between items-center shadow-sm">
                <span>BIHAR LOTUS SEEDS</span>
                <span className="text-[#FF5400] font-hindi">100% प्राकृतिक 🍃</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
