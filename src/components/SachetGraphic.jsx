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
  matcha: '#4A9C4F',
  moss: '#35803D',
  olive: '#1E6B27',

  strawberry: '#A6483C', // 5.53:1 on the plate
  blueberry: '#4A5570',  // 7.08:1
  mango: '#AD6413',      // 4.34:1
  ube: '#6E5A8C',        // 5.70:1
  vanilla: '#9E7A3A',    // 3.77:1
}

/**
 * The sachet, drawn as packaging rather than as an icon.
 *
 * PLACEHOLDER: this stands in for product photography the brand does not have
 * yet. The photographs in src/data/photos.js are of matcha being made, not of
 * the sachets themselves, so they carry the story and catalogue bands while
 * every one of the five flavours is still represented here by a drawing. It is
 * built to survive being shown large, but it should be replaced by real shots
 * of the sachets when they exist.
 *
 * What changed from the previous version: the blurred colour glow behind it and
 * the dot grid over it are gone, along with the two floating badge pills. A
 * product shot with UI chrome stuck to its corners reads as a component, not as
 * a product, so the metadata now lives in the layout around the image and the
 * frame holds nothing but the object and its shadow.
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
        {/* Contact shadow. One soft ellipse under the object, the way a real
            product shot grounds a standing pouch — not a drop shadow on a box. */}
        <ellipse cx="100" cy="272" rx="62" ry="9" fill="#114817" opacity={dark ? 0.5 : 0.18} />

        {/* Body. Slightly wider at the base than the seal, so it reads as a
            filled pouch standing up rather than as a flat rectangle. */}
        <path
          d="M46 40 L154 40 L160 258 Q160 268 149 268 L51 268 Q40 268 40 258 Z"
          fill={fill}
          stroke="#114817"
          strokeWidth="1.5"
        />

        {/* The gusset fold catching light down the left third. */}
        <path d="M46 40 L74 40 L70 268 L51 268 Q40 268 40 258 Z" fill="#FCFAE9" opacity="0.13" />

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
            stroke="#114817"
            strokeWidth="1"
            opacity="0.28"
          />
        ))}

        {/* Tear notch, cut into the crimp on the right. */}
        <path d="M154 28 L144 33 L154 38 Z" fill={dark ? '#114817' : '#FCFAE9'} />

        {/* Paper label. Deliberately off-centre and low on the body — a band
            sitting where a hand would hold it, not a panel centred in a box. */}
        <rect
          x="40"
          y="150"
          width="120"
          height="76"
          fill="#F5F5DC"
          stroke="#114817"
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
          fill="#0D3612"
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
          fill="#2C5E32"
        >
          UJI &middot; 10G
        </text>
      </svg>
    </div>
  )
}
