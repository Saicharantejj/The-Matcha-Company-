import { photos } from '../data/photos'

const GALLERY_ITEMS = [
  {
    img: photos.tabletopLifestyle.src,
    tag: 'GOOD COMPANY',
    title: 'Tabletop Feast & Cocktail Hour',
    subtitle: '100g Jar & 50g Pouch with Roasted Lotus Pops',
  },
  {
    img: photos.newspaperComingSoon.src,
    tag: 'CHASKA GAZETTE',
    title: 'Good Food, Good Company, Better Snacks',
    subtitle: 'The 2026 Print Edition Launch',
  },
  {
    img: photos.meshBagIngredients.src,
    tag: 'REAL INGREDIENTS',
    title: 'Whole Spices & Farm Fresh Red Chilies',
    subtitle: 'Slow-Roasted, Never Fried',
  },
  {
    img: photos.comingSoonPoster.src,
    tag: 'STAY TUNED',
    title: 'Big Crunch, Bold Flavour',
    subtitle: 'Signature Jars and Pouches',
  },
  {
    img: photos.masalaPouchHero.src,
    tag: 'SIGNATURE PACK',
    title: '50g Masala Makhana Matte Pouch',
    subtitle: 'Roasted in Small Artisanal Batches',
  },
  {
    img: photos.brandPoster.src,
    tag: 'HERITAGE ART',
    title: 'Indian Snack Revolution',
    subtitle: 'Authentic Bihar Lotus Seeds',
  },
]

export default function UgcGrid() {
  return (
    <section className="py-24 bg-[#F5EEDD] border-b border-[#17245B]/15">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
            CAMPAIGN &amp; LIFESTYLE GALLERY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B] leading-none flex flex-wrap items-baseline gap-3">
            <span>SPOTTED SNACKING.</span>
            <span className="text-[#E2AE35] font-hindi text-2xl sm:text-4xl font-extrabold">हर जगह CHASKA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 bg-white shadow-card hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17245B]/90 via-[#17245B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end text-white">
                <span className="font-mono text-[10px] font-bold text-[#E2AE35] uppercase tracking-widest mb-1">
                  {item.tag}
                </span>
                <h3 className="font-display text-lg font-bold uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#F5EEDD]/80 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

