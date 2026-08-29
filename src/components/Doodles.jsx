import { motion, useReducedMotion } from 'framer-motion'

/**
 * Hand-drawn marginalia for the landing page.
 *
 * Every mark is a stroked path with no fill, drawn on a deliberately loose
 * geometry — the curves are slightly off-true and the sun's rays vary in
 * length, because a set of mathematically perfect strokes reads as clip art
 * rather than as something someone sketched in the margin.
 *
 * They animate by stroke-dash rather than by opacity, so each one draws itself
 * the way it would have been drawn. All of them are decorative: they carry no
 * information the copy doesn't already give, so they are hidden from assistive
 * tech and they skip the draw-on entirely for reduced-motion visitors.
 */
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Returns a plain factory rather than a hook, so the per-stroke delays can be
// built inside a map without calling a hook in a loop.
function useDrawFactory() {
  const reduceMotion = useReducedMotion()
  return (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
        }
}

export function Crown({ className = '', delay = 0.5 }) {
  const draw = useDrawFactory()
  return (
    <svg viewBox="0 0 200 170" aria-hidden="true" className={className}>
      <motion.path
        {...STROKE}
        {...draw(delay)}
        d="M22 140 C20 116 26 64 31 42 C33 33 41 33 46 42 C55 58 65 82 73 94 C78 101 85 100 89 92 C96 76 101 46 105 30 C107 20 115 20 118 30 C124 50 131 78 137 92 C141 100 148 101 153 94 C161 82 170 58 176 44 C180 34 188 35 189 45 C192 70 194 118 192 140"
      />
      <motion.path {...STROKE} {...draw(delay + 0.25)} d="M22 140 C62 149 152 149 192 140" />
      <motion.ellipse
        {...STROKE}
        {...draw(delay + 0.45)}
        cx="76"
        cy="114"
        rx="9"
        ry="14"
        transform="rotate(-8 76 114)"
      />
    </svg>
  )
}

// Rays are generated rather than hand-listed, but their lengths cycle through
// three values so the disc doesn't end up inside a perfect gear.
const RAYS = Array.from({ length: 12 }, (_, i) => {
  const a = ((i * 30 - 90) * Math.PI) / 180
  const outer = 74 + (i % 3) * 6
  return {
    x1: 100 + Math.cos(a) * 52,
    y1: 100 + Math.sin(a) * 52,
    x2: 100 + Math.cos(a) * outer,
    y2: 100 + Math.sin(a) * outer,
  }
})

export function Sun({ className = '', delay = 0.6 }) {
  const draw = useDrawFactory()
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <motion.path
        {...STROKE}
        {...draw(delay)}
        d="M100 62 C122 62 139 79 139 100 C139 122 121 139 100 139 C78 139 61 121 61 100 C61 78 79 62 100 62"
      />
      {RAYS.map((r, i) => (
        <motion.line
          key={i}
          {...STROKE}
          {...draw(delay + 0.3 + i * 0.04)}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
        />
      ))}
    </svg>
  )
}

const PETALS = Array.from({ length: 6 }, (_, i) => i * 60)

export function Flower({ className = '', delay = 0.9 }) {
  const draw = useDrawFactory()
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      {PETALS.map((deg, i) => (
        <motion.ellipse
          key={deg}
          {...STROKE}
          strokeWidth={4}
          {...draw(delay + i * 0.08)}
          cx="50"
          cy="31"
          rx="11"
          ry="18"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  )
}

export function Arrow({ className = '', delay = 1 }) {
  const draw = useDrawFactory()
  return (
    <svg viewBox="0 0 220 130" aria-hidden="true" className={className}>
      <motion.path {...STROKE} {...draw(delay)} d="M14 22 C72 8 152 46 198 116" />
      {/* Barbs sit at roughly 35 degrees either side of the curve's tangent
          where it leaves the tip, so the head points along the line. */}
      <motion.path {...STROKE} {...draw(delay + 0.55)} d="M14 22 L38 32" />
      <motion.path {...STROKE} {...draw(delay + 0.55)} d="M14 22 L32 3" />
    </svg>
  )
}
