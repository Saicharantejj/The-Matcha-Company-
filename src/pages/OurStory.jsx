import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import BenefitsGrid from '../components/BenefitsGrid'
import { photos } from '../data/photos'

export default function OurStory() {
  return (
    <PageShell>
      {/* Header */}
      <section className="bg-[#F5EEDD] px-6 py-20 sm:px-12 sm:py-28 border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem]">
          <div className="max-w-4xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold uppercase tracking-widest">
              OUR STORY
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#17245B] leading-[0.92]">
              MAKHANA HAS BEEN AROUND FOREVER. WE GAVE IT A CHASKA.
            </h1>
            <p className="font-sans text-lg sm:text-xl text-[#17245B]/85 leading-relaxed max-w-2xl font-medium">
              CHASKA was born out of a simple truth: snacking should never be boring. We took an ancient Indian superfood and gave it the bold, unapologetic flavour it deserved.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 1: Philosophy & The Print Edition */}
      <section className="bg-white py-24 px-6 sm:px-12 border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                // THE CHASKA PHILOSOPHY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] leading-tight">
                SLOW-ROASTED. BIG CRUNCH. ZERO GUILT.
              </h2>
              <p className="font-sans text-base text-[#17245B]/85 leading-relaxed">
                Makhana has been harvested in Bihar wetlands for centuries. Naturally light, airy, and packed with plant protein, it was often hidden in plain diet snack aisles or traditional fasting bowls.
              </p>
              <p className="font-sans text-base text-[#17245B]/85 leading-relaxed">
                We roast handpicked jumbo foxnuts in small artisanal batches with cold-pressed oils and chef-crafted spice blends — from fiery bird’s eye chili and Himalayan pink salt to spearmint pudina and aged cheddar.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/shop" className="btn bg-[#E2AE35] text-[#17245B] hover:bg-[#17245B] hover:text-[#F5EEDD]">
                  SHOP CHASKA ➔
                </Link>
                <Link to="/build-your-box" className="btn-outline border-[#17245B]/30 text-[#17245B]">
                  BUILD YOUR BOX
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 shadow-xl bg-[#FAF6ED] p-3">
                <img
                  src={photos.newspaperComingSoon.src}
                  alt="CHASKA Newspaper Edition"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Narrative Section 2: Real Ingredients */}
      <section className="bg-[#FAF6ED] py-24 px-6 sm:px-12 border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 shadow-xl bg-white p-3">
                <img
                  src={photos.meshBagIngredients.src}
                  alt="CHASKA Fresh Ingredients in Mesh Bag"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A9223A]">
                // SOURCING &amp; QUALITY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] leading-tight">
                REAL SPICES. NO JUNK. EVER.
              </h2>
              <p className="font-sans text-base text-[#17245B]/85 leading-relaxed">
                No palm oil, no artificial flavor enhancers, no synthetic colors. Just 100% whole jumbo lotus seeds, real whole spices, sun-ripened tomatoes, fresh mint, and stone-ground chili.
              </p>
              <p className="font-sans text-base text-[#17245B]/85 leading-relaxed">
                Every batch is slow-roasted to an explosive 5/5 crunch rating, then sealed fresh in nitrogen-flushed pouches so that first crunch is as crisp as if it came right out of the roaster.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Narrative Section 3: The Tabletop Ritual */}
      <section className="bg-white py-24 px-6 sm:px-12 border-b border-[#17245B]/15">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                // GOOD FOOD, GOOD COMPANY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] leading-tight">
                BETTER SNACKS FOR EVERY MOMENT.
              </h2>
              <p className="font-sans text-base text-[#17245B]/85 leading-relaxed">
                Whether you're hosting house parties, grinding through work at your desk, playing cards on the weekend, or mixing drinks with friends — CHASKA is crafted to be your signature companion.
              </p>
              <div className="pt-4">
                <Link to="/shop" className="btn bg-[#17245B] text-[#F5EEDD] hover:bg-[#E2AE35] hover:text-[#17245B]">
                  EXPLORE ALL 5 FLAVOURS ➔
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 shadow-xl bg-[#FAF6ED] p-3">
                <img
                  src={photos.tabletopLifestyle.src}
                  alt="CHASKA Tabletop Ritual"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <BenefitsGrid />
    </PageShell>
  )
}

