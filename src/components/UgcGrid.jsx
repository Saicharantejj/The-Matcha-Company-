import { photos } from '../data/photos'

const GALLERY_ITEMS = [
  { img: photos.lifestyleCrunch.src, title: 'Desk Setup Crunch' },
  { img: photos.lifestyleParty.src, title: 'Party Bowl Stash' },
  { img: photos.lifestyleFriends.src, title: 'Shared Snack Moment' },
  { img: photos.heroMakhanaBowl.src, title: 'Golden Roast Bowl' },
]

export default function UgcGrid() {
  return (
    <section className="py-24 bg-[#F8EECB] border-b border-[#6E433D]/15">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
            CAMPAIGN GALLERY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#6E433D] leading-none">
            SPOTTED SNACKING.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#6E433D]/15 bg-white shadow-card"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6E433D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-end">
                <span className="font-mono text-xs text-[#F8EECB] font-bold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
