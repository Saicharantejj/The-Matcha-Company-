import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import BenefitsGrid from '../components/BenefitsGrid'
import { photos } from '../data/photos'

export default function OurStory() {
  return (
    <PageShell>
      {/* Header */}
      <section className="bg-[#F8EECB] px-6 py-20 sm:px-12 sm:py-28 border-b border-[#6E433D]/15">
        <div className="mx-auto max-w-[96rem]">
          <div className="max-w-4xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-widest">
              OUR STORY
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#6E433D] leading-[0.92]">
              MAKHANA HAS BEEN AROUND FOREVER. WE GAVE IT A CHASKA.
            </h1>
            <p className="font-sans text-lg sm:text-xl text-[#6E433D]/85 leading-relaxed max-w-2xl font-medium">
              CHASKA was born out of a simple truth: snacking should never be boring. We took an ancient Indian superfood and gave it the bold, unapologetic flavour it deserved.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="bg-white py-24 px-6 sm:px-12 border-b border-[#6E433D]/15">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#31603D]">
                // THE CHASKA PHILOSOPHY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#6E433D] leading-tight">
                SLOW-ROASTED. BIG CRUNCH. ZERO GUILT.
              </h2>
              <p className="font-sans text-base text-[#6E433D]/85 leading-relaxed">
                Makhana has been harvested in Bihar wetlands for centuries. Naturally light, airy, and packed with plant protein, it was often hidden in plain diet snack aisles or traditional fasting bowls.
              </p>
              <p className="font-sans text-base text-[#6E433D]/85 leading-relaxed">
                We roast handpicked jumbo foxnuts in small artisanal batches with cold-pressed oils and chef-crafted spice blends — from fiery bird’s eye chili and Himalayan pink salt to spearmint pudina and aged cheddar.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/shop" className="btn bg-[#D23D2D] hover:bg-[#6E433D]">
                  SHOP CHASKA ➔
                </Link>
                <Link to="/build-your-box" className="btn-outline border-[#6E433D]/30 text-[#6E433D]">
                  BUILD YOUR BOX
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-square rounded-3xl overflow-hidden border border-[#6E433D]/15 shadow-xl bg-[#FAF6EE] p-2">
                <img
                  src={photos.heroMakhanaBowl.src}
                  alt="Chaska Makhana Bowl"
                  className="w-full h-full object-cover rounded-2xl"
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
