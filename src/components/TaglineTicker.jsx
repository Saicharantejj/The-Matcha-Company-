const TAGLINES = [
  'Stone-ground, not powder-mixed',
  'Sourced from Uji, Kyoto',
  'Five flavours, one sachet',
  'Dissolves in ten seconds',
  'No whisk, no bowl, no sieve',
  'Sealed one cup at a time',
]

export default function TaglineTicker() {
  const items = [...TAGLINES, ...TAGLINES]
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-ink/15 bg-card/60 backdrop-blur-md py-6 sm:py-8"
    >
      <div className="marquee-track" style={{ animationDuration: '46s' }}>
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center whitespace-nowrap font-display text-lg tracking-display text-cocoa sm:text-xl"
          >
            {t}
            <span className="mx-8 text-[0.45em] text-olive opacity-80">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
