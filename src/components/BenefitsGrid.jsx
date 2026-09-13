import { photos } from '../data/photos'

export default function BenefitsGrid() {
  return (
    <section className="py-24 sm:py-28 bg-[#FAF6ED] border-b border-[#17245B]/15" id="benefits">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 space-y-2.5">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A9223A]">
            WHY THE CRUNCH?
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#17245B] leading-none">
            BETTER SNACKS. <span className="text-[#E2AE35]">ZERO SHORTCUTS.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#17245B]/80 font-medium">
            Lotus seeds have been crunching in Indian homes for centuries. We just brought small-batch roasting discipline and chef-crafted spice blends.
          </p>
        </div>

        {/* Editorial Typography & Photography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Editorial Statements */}
          <div className="lg:col-span-7 space-y-10">
            
            <div className="border-b border-[#17245B]/15 pb-8 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-[10px] font-extrabold uppercase">
                  100% SLOW-ROASTED
                </span>
                <span className="font-hindi text-xs font-bold text-[#A9223A]">
                  तेल नहीं, सिर्फ़ ताज़ा भुना!
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#17245B] tracking-tight">
                ROASTED. NEVER FRIED.
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#17245B]/80 font-medium leading-relaxed max-w-xl">
                Slow-roasted in small artisanal batches to seal in natural airiness without deep frying in palm oil.
              </p>
            </div>

            <div className="border-b border-[#17245B]/15 pb-8 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#17245B]/10 text-[#17245B] font-mono text-[10px] font-extrabold uppercase">
                  JUMBO LOTUS SEEDS
                </span>
                <span className="font-hindi text-xs font-bold text-[#17245B]">
                  करारा ऐसा, रुकना मुश्किल!
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#17245B] tracking-tight">
                LIGHT. SERIOUSLY CRUNCHY.
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#17245B]/80 font-medium leading-relaxed max-w-xl">
                Handpicked jumbo kernels delivering an unapologetically loud, shatteringly crisp crunch in every handful.
              </p>
            </div>

            <div className="pb-2 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-[10px] font-extrabold uppercase">
                  CHEF CRAFTED
                </span>
                <span className="font-hindi text-xs font-bold text-[#A9223A]">
                  हर दाने में असली चस्का!
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#17245B] tracking-tight">
                AUTHENTIC SPICES ONLY.
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#17245B]/80 font-medium leading-relaxed max-w-xl">
                Crafted with real pantry spices—Himalayan rock salt, sun-dried garden mint, bird's eye chilli, and aged cheddar. Zero artificial colours.
              </p>
            </div>

          </div>

          {/* Right Column: Macro Photography Showcase */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 shadow-sm bg-white relative group">
              <img
                src={photos.heroMakhanaBowl.src}
                alt="Macro texture of slow-roasted makhana"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#17245B]/15 text-xs font-mono text-[#17245B] font-bold flex justify-between items-center shadow-xs">
                <span>BIHAR LOTUS SEEDS</span>
                <span className="text-[#A9223A] font-hindi">100% प्राकृतिक 🍃</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
