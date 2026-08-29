const TAGLINES = [
  'STONE-GROUND, NOT POWDER-MIXED',
  'NO BAMBOO WHISK REQUIRED',
  'SOURCED FROM UJI, KYOTO',
  'FIVE FLAVORS, ONE SACHET',
  'MIXES IN UNDER 10 SECONDS',
  'CAFÉ QUALITY, ZERO PREP',
  'SMALL BATCH, EVERY WEEK',
  'ZERO CEREMONY NECESSARY',
]

export default function TaglineTicker() {
  const items = [...TAGLINES, ...TAGLINES]
  return (
    <div className="overflow-hidden border-y border-ink bg-card py-5">
      <div className="marquee-track" style={{ animationDuration: '32s' }}>
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="mx-2 whitespace-nowrap border-[3px] border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
