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
    <section className="py-20 sm:py-24 bg-white border-b border-[#17245B]/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E2AE35]/20 text-[#17245B] font-mono text-xs font-extrabold uppercase tracking-widest">
              💬 REAL COMMUNITY WORDS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#17245B]">
              PEOPLE ARE <span className="text-[#A9223A]">CRUNCHING.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#17245B]/70 max-w-sm font-medium">
            Genuine feedback from snackers who made CHASKA their daily stash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="bg-[#FAF6ED] border border-[#17245B]/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#E2AE35] text-sm">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="font-sans text-sm sm:text-base text-[#17245B] leading-relaxed font-medium">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#17245B]/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <h4 className="font-bold text-[#17245B] flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <span className="text-emerald-700 text-[10px] font-extrabold bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                      ✓ Verified
                    </span>
                  </h4>
                  <span className="text-[#17245B]/60 text-[11px]">{rev.location}</span>
                </div>
                <span className="text-[#17245B] text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-1 rounded-lg border border-[#17245B]/10 shadow-2xs">
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
