// Decorative stylized "tea field" SVG used in editorial sections where we don't
// have real photography — rows of shaded terraces in the brand's olive palette.
export default function FieldGraphic({ variant = 'rows', className = '' }) {
  if (variant === 'rows') {
    return (
      <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="300" fill="#43481D" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${40 + i * 28} Q200 ${10 + i * 28} 400 ${40 + i * 28}`}
            stroke="#7C8438"
            strokeWidth="10"
            fill="none"
            opacity={0.5 + (i % 3) * 0.15}
          />
        ))}
        <circle cx="330" cy="55" r="26" fill="#F6EFC6" opacity="0.85" />
      </svg>
    )
  }

  if (variant === 'leaf') {
    return (
      <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="300" fill="#2B1F16" />
        <g transform="translate(200,150)">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="0"
              rx="150"
              ry="46"
              fill="none"
              stroke="#6F9E28"
              strokeWidth="2"
              opacity={0.25 + i * 0.1}
              transform={`rotate(${i * 30})`}
            />
          ))}
          <circle r="18" fill="#6F9E28" />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#7C8438" />
      <rect x="0" y="180" width="400" height="120" fill="#43481D" />
      <rect x="0" y="220" width="400" height="80" fill="#2B1F16" />
    </svg>
  )
}
