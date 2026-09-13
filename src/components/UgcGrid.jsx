import { photos } from '../data/photos'

const GALLERY_ITEMS = [
  {
    img: photos.tabletopLifestyle.src,
    tag: 'TABLETOP RITUAL',
    title: 'Feast & Cocktail Hour',
    subtitle: 'Signature Roasted Lotus Seed Pops with Drinks',
  },
  {
    img: photos.newspaperComingSoon.src,
    tag: 'THE PRINT EDITION',
    title: 'Good Food, Good Company',
    subtitle: 'The CHASKA Gazette 2026',
  },
  {
    img: photos.meshBagIngredients.src,
    tag: 'FARM HONEST',
    title: 'Whole Spices & Farm Chillies',
    subtitle: '100% Real Ingredients, Slow-Roasted',
  },
  {
    img: photos.yellowBasket.src,
    tag: 'EXTRA CRUNCH',
    title: 'Shatteringly Crisp Bites',
    subtitle: 'Golden Popped Bihar Makhana',
  },
  {
    img: photos.masalaPouchHero.src,
    tag: 'SIGNATURE POUCH',
    title: 'Matte Masala Pack',
    subtitle: 'Roasted in Small Artisanal Batches',
  },
  {
    img: photos.handPour.src,
    tag: 'TRADITIONAL ROAST',
    title: 'Handcrafted With Pride',
    subtitle: 'Authentic Indian Snack Culture',
  },
]

export default function UgcGrid() {
  return (
    <section className="py-20 sm:py-24 bg-[#FAF6ED] border-b border-[#17245B]/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-xs font-extrabold uppercase tracking-widest">
              📷 SPOTTED SNACKING
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B]">
              GOOD FOOD. <span className="text-[#E2AE35]">BETTER SNACKS.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#17245B]/70 max-w-sm font-medium">
            From late-night coding sessions to weekend cocktail tables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#17245B]/15 bg-white shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17245B]/90 via-[#17245B]/25 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="font-mono text-[10px] font-extrabold text-[#E2AE35] uppercase tracking-widest mb-1">
                  {item.tag}
                </span>
                <h3 className="font-display text-lg font-bold uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#F5EEDD]/85 mt-0.5">
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
