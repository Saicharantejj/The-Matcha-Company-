import { photos } from '../data/photos'

export default function BenefitsGrid() {
  return (
    <section className="py-28 bg-[#F8EECB] border-b border-[#6E433D]/15" id="benefits">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
            INGREDIENTS &amp; SOURCING
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#6E433D] leading-none">
            WHY THE CRUNCH? <span className="text-[#D23D2D] font-hindi text-3xl sm:text-5xl font-extrabold font-normal ml-2">क्यों है ये ख़ास</span>
          </h2>
        </div>

        {/* Editorial Typography & Photography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Editorial Statements */}
          <div className="lg:col-span-7 space-y-12">
            
            <div className="border-b border-[#6E433D]/15 pb-8 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-[10px] font-bold">100% ROASTED</span>
                <span className="font-hindi text-xs font-bold text-[#D23D2D]">तेल नहीं, सिर्फ़ ताज़ा भुना!</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#D23D2D] tracking-tight">
                ROASTED. NOT FRIED.
              </h3>
              <p className="font-sans text-base text-[#6E433D]/90 font-medium leading-relaxed max-w-xl">
                Slow-roasted in small artisanal batches to preserve natural crispiness without greasy deep-frying.
              </p>
            </div>

            <div className="border-b border-[#6E433D]/15 pb-8 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#31603D] text-[#F8EECB] font-mono text-[10px] font-bold">SUPER CRUNCH</span>
                <span className="font-hindi text-xs font-bold text-[#31603D]">करारा ऐसा, रुकना मुश्किल!</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#31603D] tracking-tight">
                LIGHT. SERIOUSLY CRUNCHY.
              </h3>
              <p className="font-sans text-base text-[#6E433D]/90 font-medium leading-relaxed max-w-xl">
                Airy, popped lotus seed kernels delivering an absurdly satisfying crunch with zero trans fats.
              </p>
            </div>

            <div className="pb-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#F5C065] text-[#6E433D] font-mono text-[10px] font-bold">REAL SPICES</span>
                <span className="font-hindi text-xs font-bold text-[#6E433D]">हर दाने में असली चस्का!</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#6E433D] tracking-tight">
                BOLD INDIAN FLAVOURS.
              </h3>
              <p className="font-sans text-base text-[#6E433D]/90 font-medium leading-relaxed max-w-xl">
                Crafted with real spices—Himalayan pink salt, dried garden mint leaves, bird’s eye chili, and aged cheddar.
              </p>
            </div>

          </div>

          {/* Right Column: Macro Photography Showcase */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#6E433D]/15 shadow-card bg-[#FBF4DC] relative group">
              <img
                src={photos.heroMakhanaBowl.src}
                alt="Macro texture of roasted makhana"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#6E433D]/15 text-xs font-mono text-[#6E433D] font-bold flex justify-between items-center">
                <span>BIHAR LOTUS SEEDS</span>
                <span className="text-[#31603D] font-hindi">100% प्राकृतिक 🍃</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
