const REVIEWS = [
  {
    name: 'Aanya S.',
    role: 'Verified Buyer',
    location: 'Mumbai',
    quote: 'The Pudina Makhana is genuinely incredible. Perfectly slow-roasted, refreshing mint kick, and way better than fried chips when working late.',
    flavor: 'Pudina',
    rating: 5,
  },
  {
    name: 'Rohan Mehta',
    role: 'Verified Buyer',
    location: 'Bengaluru',
    quote: 'Finally a makhana brand that doesn’t taste like cardboard or boring diet food. Jalapeño is now our team’s daily desk stash.',
    flavor: 'Jalapeño',
    rating: 5,
  },
  {
    name: 'Tanya V.',
    role: 'Verified Buyer',
    location: 'Delhi NCR',
    quote: 'The Cheese Makhana Pack of 10 was the best decision. The packaging, the crunch, the cheddar dust—everything feels genuinely premium.',
    flavor: 'Cheese',
    rating: 5,
  },
]

export default function Reviews() {
  return (
    <section className="py-10 sm:py-14 bg-[#F7F2E8] text-[#0B1230] border-b border-[#E5DCC9] transition-colors" id="reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DCC9] pb-5">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5400]/10 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest border border-[#FF5400]/20">
              💬 REAL COMMUNITY WORDS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B1230]">
              PEOPLE ARE <span className="text-[#FF5400]">CRUNCHING.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-sm font-normal">
            Genuine feedback from snackers who made CHASKA their daily crunch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="bg-white border border-[#E5DCC9] rounded-3xl p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all hover-pop-card cursor-default"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#FF5400] text-sm">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="font-sans text-sm sm:text-base text-[#0B1230] leading-relaxed font-normal">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center justify-between font-mono text-xs">
                <div>
                  <h4 className="font-bold text-[#0B1230] flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <span className="text-emerald-700 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ Verified
                    </span>
                  </h4>
                  <span className="text-stone-500 text-[11px]">{rev.location}</span>
                </div>
                <span className="text-[#0B1230] text-[10px] font-semibold uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs">
                  {rev.flavor}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
