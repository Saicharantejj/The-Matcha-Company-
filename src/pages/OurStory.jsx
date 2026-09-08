import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import BenefitsGrid from '../components/BenefitsGrid'
import { photos } from '../data/photos'

export default function OurStory() {
  return (
    <PageShell>
      {/* Header */}
      <section className="bg-cream px-6 py-20 sm:px-12 sm:py-28 border-b border-black/10">
        <div className="mx-auto max-w-[96rem]">
          <div className="max-w-4xl space-y-6">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
              ABOUT US
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-charcoal leading-[0.92]">
              MAKANA HAS ALWAYS BEEN AROUND. WE JUST THINK IT DESERVES BETTER.
            </h1>
            <p className="font-body text-xl text-muted leading-relaxed max-w-2xl">
              We started The Makhana Company to liberate lotus seeds from plain diet snack aisles. Handpicked in Bihar, slow-roasted in small batches, and tossed in real spices.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="bg-surface py-24 px-6 sm:px-12 border-b border-black/10">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-charcoal leading-tight">
                ROASTED IN SMALL BATCHES.
              </h2>
              <p className="font-body text-base text-muted leading-relaxed">
                Makhana has been harvested in Bihar for centuries. Naturally light, airy, and nutrient-rich, it was often relegated to traditional fasting food or bland diet snacks.
              </p>
              <p className="font-body text-base text-muted leading-relaxed">
                We roast jumbo makhana kernels in small artisanal batches with cold-pressed olive oil, seasoning them with Himalayan pink salt, spearmint, chili, and aged cheddar.
              </p>
              <div className="pt-4">
                <Link to="/shop" className="btn">
                  SHOP FLAVOURS ➔
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-square rounded-3xl overflow-hidden border border-black/10 shadow-card bg-neutral-subtle">
                <img
                  src={photos.heroMakhanaBowl.src}
                  alt="Makhana Bowl"
                  className="w-full h-full object-cover"
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
