/**
 * PLACEHOLDER imagery for the story pages.
 *
 * The brand has no photography of the farm, so rather than dressing the page
 * with stock images of somebody else's tea field, these are drawn marks in the
 * brand's own greens. They are deliberately reductive — a horizon, some shaded
 * terraces, a low sun — so they read as an intentional illustration rather than
 * as a picture that failed to load. Replace with real Uji photography when it
 * exists.
 */
export default function FieldGraphic({ variant = 'rows', className = '' }) {
  if (variant === 'rows') {
    return (
      <svg
        viewBox="0 0 800 500"
        role="img"
        aria-label="Illustration of shaded tea terraces"
        className={className}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="800" height="500" fill="#43481D" />
        {/* Low sun, sitting on the horizon rather than floating in a corner. */}
        <circle cx="608" cy="150" r="58" fill="#F6EFC6" opacity="0.9" />
        {/* Terraces. Each band is a filled sweep, not a stroke, so the field
            reads as ground receding rather than as a stack of lines. */}
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${182 + i * 46} Q400 ${150 + i * 52} 800 ${182 + i * 46} L800 ${212 + i * 46} Q400 ${180 + i * 52} 0 ${212 + i * 46} Z`}
            fill="#7C8438"
            opacity={0.22 + i * 0.1}
          />
        ))}
      </svg>
    )
  }

  if (variant === 'leaf') {
    return (
      <svg
        viewBox="0 0 800 500"
        role="img"
        aria-label="Illustration of a tencha leaf"
        className={className}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="800" height="500" fill="#4C382C" />
        <g transform="translate(400 250)">
          {/* A single leaf, built from two arcs and a midrib. */}
          <path
            d="M0 -150 C110 -92 132 62 0 150 C-132 62 -110 -92 0 -150 Z"
            fill="#43481D"
            stroke="#7C8438"
            strokeWidth="2.5"
          />
          <line x1="0" y1="-150" x2="0" y2="150" stroke="#7C8438" strokeWidth="2" opacity="0.8" />
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <path
                d={`M0 ${-104 + i * 40} Q46 ${-88 + i * 40} 72 ${-54 + i * 40}`}
                stroke="#7C8438"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <path
                d={`M0 ${-104 + i * 40} Q-46 ${-88 + i * 40} -72 ${-54 + i * 40}`}
                stroke="#7C8438"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
            </g>
          ))}
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 800 500" aria-hidden="true" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="500" fill="#7C8438" />
      <rect y="300" width="800" height="200" fill="#43481D" />
      <rect y="400" width="800" height="100" fill="#4C382C" />
    </svg>
  )
}
