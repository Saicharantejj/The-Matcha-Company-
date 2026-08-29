const TAGLINES = [
  'Stone-ground, not powder-mixed',
  'Sourced from Uji, Kyoto',
  'Five flavours, one sachet',
  'Dissolves in ten seconds',
  'No whisk, no bowl, no sieve',
  'Sealed one cup at a time',
]

/**
 * The one ticker on the site.
 *
 * There used to be two — this, and a second strip of shouting capitals pinned
 * above the navigation on every page. Two scrolling marquees is a tic; one,
 * placed where the page wants a breath, is texture.
 *
 * It also stopped setting each line in a 3px-bordered box. Eight bordered pills
 * sliding past was more of the same boxed vocabulary the rest of the redesign
 * removed, so the lines now run as continuous type with a lozenge between them.
 */
export default function TaglineTicker() {
  const items = [...TAGLINES, ...TAGLINES]
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-ink bg-card py-6 sm:py-8"
    >
      <div className="marquee-track" style={{ animationDuration: '46s' }}>
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center whitespace-nowrap font-display text-lg tracking-display text-cocoa sm:text-xl"
          >
            {t}
            <span className="mx-8 text-[0.5em] text-olive">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
