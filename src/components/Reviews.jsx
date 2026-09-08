const REVIEWS = [
  {
    name: 'Aanya S.',
    role: 'Verified Buyer',
    location: 'Mumbai',
    quote: 'The Peri Peri Makhana is genuinely insane. Perfectly roasted, super crunchy, and way better than fried chips.',
    flavor: 'Spicy Peri Peri Fiesta',
  },
  {
    name: 'Rohan Mehta',
    role: 'Verified Buyer',
    location: 'Bengaluru',
    quote: 'Finally a makhana brand that doesn’t taste like cardboard or diet food. Pudina Lime is my daily desk snack.',
    flavor: 'Creamy Pudina & Lime',
  },
  {
    name: 'Tanya V.',
    role: 'Verified Buyer',
    location: 'Delhi NCR',
    quote: 'The packaging, the crunch, the cheesy flavor—everything feels super premium. Ordered the 5-Flavor Variety Box.',
    flavor: 'Variety Box',
  },
]

export default function Reviews() {
  return (
    <section className="py-24 bg-white border-b border-[#6E433D]/15">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
        
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D23D2D]">
            COMMUNITY REVIEWS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#6E433D] leading-none">
            PEOPLE ARE CRUNCHING.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="bg-[#F8EECB] border border-[#6E433D]/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm"
            >
              <p className="font-body text-sm sm:text-base text-[#6E433D] leading-relaxed font-medium mb-8">
                "{rev.quote}"
              </p>

              <div className="pt-4 border-t border-[#6E433D]/15 flex items-center justify-between font-mono text-xs">
                <div>
                  <h4 className="font-bold text-[#6E433D]">{rev.name}</h4>
                  <span className="text-[#8A5D57] text-[10px]">{rev.location}</span>
                </div>
                <span className="text-[#D23D2D] text-[10px] uppercase font-bold">{rev.flavor}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
