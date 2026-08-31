/**
 * Pouch colours.
 *
 * The greens are the brand palette and cover anything that is not a single
 * flavour — bundles, mixed packs, the discovery kit.
 *
 * The five flavour colours deliberately step outside that palette. Drawn in the
 * house greens, five different products were five near-identical pouches and
 * ube — a famously purple ingredient — was green. Each is a dusty,
 * low-saturation version of its fruit so it still sits on the camel paper
 * rather than shouting off it.
 *
 * Every flavour clears 3:1 against both the card plate it stands on (#FCFAE9)
 * and the cream label it carries (#F5F5DC), which is the large-shape contrast
 * floor. Vanilla is the awkward one: a pale custard yellow scores about 1.5
 * against cream paper and simply vanishes, so it is set at the darker caramel
 * end of vanilla instead. Mango is warmed past plain ochre so it does not read
 * as the same colour as vanilla at a glance.
 */
const SWATCH = {
  matcha: '#5C8A2E',
  moss: '#C4D2B8',
  olive: '#4E6B3E',

  strawberry: '#A6483C', // 5.53:1 on the plate
  blueberry: '#4A5570',  // 7.08:1
  mango: '#AD6413',      // 4.34:1
  ube: '#6E5A8C',        // 5.70:1
  vanilla: '#9E7A3A',    // 3.77:1
}

/**
 * The sachet, drawn as packaging rather than as an icon.
 */
export default function SachetGraphic({ swatch = 'matcha', flavor, tone = 'paper', className = '' }) {
  const fill = SWATCH[swatch] || SWATCH.matcha
  const dark = tone === 'dark'

  return (
    <div
      className={`relative flex h-full w-full items-end justify-center overflow-hidden ${
        dark ? 'bg-ink' : 'bg-card'
      } ${className}`}
    >
      <svg
        viewBox="0 0 200 300"
        role="img"
        aria-label={flavor ? `${flavor} matcha sachet` : 'Matcha sachet'}
        className="h-[74%] w-auto"
      >
        {/* Contact shadow. One soft ellipse under the object. */}
        <ellipse cx="100" cy="272" rx="62" ry="9" fill="#232E1E" opacity={dark ? 0.5 : 0.18} />

        {/* Body. Slightly wider at the base than the seal. */}
        <path
          d="M46 40 L154 40 L160 258 Q160 268 149 268 L51 268 Q40 268 40 258 Z"
          fill={fill}
          stroke="#232E1E"
          strokeWidth="1.5"
        />

        {/* The gusset fold catching light down the left third. */}
        <path d="M46 40 L74 40 L70 268 L51 268 Q40 268 40 258 Z" fill="#F8F5EB" opacity="0.13" />

        {/* Heat-sealed crimp along the top, drawn as real serration. */}
        <path
          d="M46 40 L154 40 L154 22 L46 22 Z"
          fill={fill}
          opacity="0.75"
        />
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1={48 + i * 8}
            y1="22"
            x2={48 + i * 8}
            y2="40"
            stroke="#232E1E"
            strokeWidth="1"
            opacity="0.28"
          />
        ))}

        {/* Tear notch, cut into the crimp on the right. */}
        <path d="M154 28 L144 33 L154 38 Z" fill={dark ? '#232E1E' : '#F8F5EB'} />

        {/* Paper label. */}
        <rect
          x="40"
          y="150"
          width="120"
          height="76"
          fill="#E9E7D0"
          stroke="#232E1E"
          strokeWidth="1.5"
        />

        <text
          x="100"
          y="184"
          textAnchor="middle"
          className="font-display"
          fontSize="15"
          textLength={Math.min(100, (flavor || 'Matcha').length * 10)}
          lengthAdjust="spacingAndGlyphs"
          fill="#232E1E"
        >
          {(flavor || 'Matcha').toUpperCase()}
        </text>
        <text
          x="100"
          y="207"
          textAnchor="middle"
          className="font-mono"
          fontSize="8"
          letterSpacing="2"
          fill="#4E6B3E"
        >
          UJI &middot; 10G
        </text>
      </svg>
    </div>
  )
}
