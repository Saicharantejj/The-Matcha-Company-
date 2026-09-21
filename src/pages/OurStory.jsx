import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import BenefitsGrid from '../components/BenefitsGrid'
import FourPillars from '../components/FourPillars'
import { photos } from '../data/photos'

export default function OurStory() {
  return (
    <PageShell>
      {/* Header */}
      <section className="bg-[#0C122C] px-4 py-16 sm:px-8 sm:py-24 border-b border-[#243373]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest">
              OUR STORY
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#17245B] dark:text-white leading-[0.96]">
              MAKHANA HAS BEEN AROUND FOREVER. WE GAVE IT A <span className="text-[#FF5400]">CHASKA.</span>
            </h1>
            <p className="font-sans text-base sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl font-normal">
              CHASKA was born out of a simple truth: snacking should never be boring. We took an ancient Indian superfood and gave it the bold, unapologetic flavour it deserved.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 1: Philosophy & The Print Edition */}
      <section className="bg-[#0C122C] py-20 sm:py-24 px-4 sm:px-8 border-b border-[#243373]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                // THE CHASKA PHILOSOPHY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] dark:text-white leading-tight">
                SLOW-ROASTED. BIG CRUNCH. <span className="text-[#FF5400]">PURE ADDICTION.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                Makhana has been harvested in Bihar wetlands for centuries. Naturally light, airy, and gluten-free, it was often hidden in plain diet snack aisles or traditional fasting bowls.
              </p>
              <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                We slow-roast handpicked jumbo foxnuts in small artisanal batches with cold-pressed oils and chef-crafted spice blends — from fiery bird's eye chili and Himalayan rock salt to garden spearmint and aged cheddar.
              </p>
              <div className="pt-2 flex flex-wrap gap-3.5">
                <Link to="/shop" className="btn px-7 py-3.5 text-xs font-bold shadow-sm">
                  SHOP CHASKA ➔
                </Link>
                <Link
                  to="/products/chaska-try-all-5"
                  className="btn-outline dark:border-[#243373] dark:text-stone-200 dark:hover:border-white px-7 py-3.5 text-xs font-bold"
                >
                  TRY ALL 5 BOX
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#243373] shadow-md bg-[#131D4A] p-2.5">
                <img
                  src={photos.newspaperComingSoon.src}
                  alt="CHASKA Newspaper Edition"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Narrative Section 2: Real Ingredients */}
      <section className="bg-[#0C122C] py-20 sm:py-24 px-4 sm:px-8 border-b border-[#243373]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#243373] shadow-md bg-[#131D4A] p-2.5">
                <img
                  src={photos.meshBagIngredients.src}
                  alt="CHASKA Fresh Ingredients in Mesh Bag"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                // SOURCING &amp; HONEST DISCIPLINE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#17245B] dark:text-white leading-tight">
                REAL SPICES. <span className="text-[#FF5400]">ZERO SHORTCUTS.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                Zero palm oil, zero artificial colour powders, zero deep frying. Just 100% whole jumbo lotus seeds, real stone-ground spices, sun-dried garden herbs, and pink rock salt.
              </p>
              <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                Every batch is slow-roasted to an explosive crunch rating, sealed fresh in airtight pouches so that first crunch is as crackling as if it came right off the roaster.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsGrid />

      {/* Four Pillars */}
      <FourPillars />

    </PageShell>
  )
}
