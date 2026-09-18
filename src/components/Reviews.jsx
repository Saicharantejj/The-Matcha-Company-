const REVIEWS = [
  {
    name: 'Aanya S.',
    role: 'Verified Buyer',
    location: 'Mumbai',
    quote: 'The Peri Peri Makhana is genuinely insane. Perfectly slow-roasted, super crunchy, and way better than fried chips when working late.',
    flavor: 'Peri Peri Makhana',
    rating: 5,
  },
  {
    name: 'Rohan Mehta',
    role: 'Verified Buyer',
    location: 'Bengaluru',
    quote: 'Finally a makhana brand that doesn’t taste like cardboard or boring diet food. Chilli Lime is now our team’s daily desk stash.',
    flavor: 'Chilli Lime Makhana',
    rating: 5,
  },
  {
    name: 'Tanya V.',
    role: 'Verified Buyer',
    location: 'Delhi NCR',
    quote: 'The Try All 5 Box was the perfect starting point. The packaging, the crunch, the cheddar cheese dust—everything feels genuinely premium.',
    flavor: 'Chaska Try All 5 Box',
    rating: 5,
  },
]

export default function Reviews() {
  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#0C0C0C] border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest">
              💬 REAL COMMUNITY WORDS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#141414] dark:text-white">
              PEOPLE ARE <span className="text-[#FF5400]">CRUNCHING.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm font-normal">
            Genuine feedback from snackers who made CHASKA their daily stash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="bg-[#FAF8F5] dark:bg-[#141414] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#FF5400] text-sm">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="font-sans text-sm sm:text-base text-[#141414] dark:text-stone-200 leading-relaxed font-normal">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between font-mono text-xs">
                <div>
                  <h4 className="font-bold text-[#141414] dark:text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ✓ Verified
                    </span>
                  </h4>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">{rev.location}</span>
                </div>
                <span className="text-stone-700 dark:text-stone-300 text-[10px] font-semibold uppercase tracking-wider bg-white dark:bg-[#202020] px-2.5 py-1 rounded-lg border border-stone-200/80 dark:border-stone-700 shadow-2xs">
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
