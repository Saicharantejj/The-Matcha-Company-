const SWATCH = {
  matcha: '#6F9E28',
  moss: '#7C8438',
  olive: '#43481D',
}

// Stylized inline SVG sachet/pouch used across catalog, kit and bundle cards
// in place of a photo — this is the product now, not a made drink. Sits on a
// flavor-tinted glow + fine dot texture so the dark field reads as a
// considered backdrop rather than empty negative space.
export default function SachetGraphic({ swatch = 'matcha', badge, size, flavor, className = '' }) {
  const fill = SWATCH[swatch] || SWATCH.matcha
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-ink ${className}`}>
      {/* flavor-tinted ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: fill }}
      />
      {/* fine dot texture, matching the page's own grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F6EFC6 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />
      {badge && (
        <span className="absolute left-3 top-3 z-10 border border-cream/70 bg-ink/60 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-cream backdrop-blur-sm">
          {badge}
        </span>
      )}
      {size && (
        <span className="absolute bottom-3 right-3 z-10 border border-cream/70 bg-ink/60 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-cream backdrop-blur-sm">
          {size}
        </span>
      )}
      <div className="relative flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]">
        <svg viewBox="0 0 120 150" className="h-32 w-auto drop-shadow-[0_10px_14px_rgba(0,0,0,0.4)] sm:h-36 lg:h-40">
          {/* pouch body */}
          <path
            d="M14 28 Q14 18 24 18 L96 18 Q106 18 106 28 L106 128 Q106 140 94 140 L26 140 Q14 140 14 128 Z"
            fill={fill}
            stroke="#F0E5D2"
            strokeWidth="2"
          />
          {/* heat-seal band */}
          <rect x="14" y="18" width="92" height="9" fill="#4C382C" opacity="0.28" />
          {/* tear notch */}
          <path d="M52 18 L60 27 L68 18 Z" fill="#F0E5D2" />
          {/* side seams */}
          <line x1="14" y1="18" x2="14" y2="140" stroke="#4C382C" strokeWidth="1" opacity="0.25" />
          <line x1="106" y1="18" x2="106" y2="140" stroke="#4C382C" strokeWidth="1" opacity="0.25" />
          {/* label patch */}
          <rect x="18" y="58" width="84" height="42" fill="#F0E5D2" stroke="#4C382C" strokeWidth="1.5" />
        </svg>
        {flavor && (
          <span className="pointer-events-none absolute left-1/2 top-[52%] w-[62%] -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[9px] font-bold uppercase leading-tight tracking-tight text-ink">
            {flavor}
          </span>
        )}
      </div>
    </div>
  )
}
