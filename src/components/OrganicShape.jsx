import { useRef } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useScrollProgress, useCoarsePointer } from './Motion'

/**
 * A soft, organic glow — the one place the site borrows Mello's blob
 * language rather than its own hard-edged one.
 *
 * The brand's own design system is explicit that nothing here is rounded:
 * every corner in tailwind.config.js is forced back to 3-4px, and index.css
 * documents why — structure comes from ink rules, not from containers. An
 * oversized rounded shape used as a frame or a card would break that on
 * sight. Used as pure atmosphere behind a dark section, sitting entirely
 * behind flat photography and square-cornered type, it does not: nothing it
 * touches becomes rounded, it only puts a little depth in the air.
 *
 * Two are used on the whole site, both in `ink` sections where a blurred
 * glow reads as light rather than as a decoration competing with a
 * photograph. It drifts and breathes slowly against scroll — never fast
 * enough to be watched, only enough to keep a still section from feeling
 * inert.
 */
export default function OrganicShape({
  className = '',
  tone = 'olive',
  distance = 60,
  scaleRange = [0.94, 1.08],
  side = 'right',
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const coarse = useCoarsePointer()
  const progress = useScrollProgress(ref)

  const travel = coarse ? distance * 0.35 : distance
  const y = useTransform(progress, [0, 1], [travel, -travel])
  const scale = useTransform(progress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]])
  const rotate = useTransform(progress, [0, 1], [side === 'right' ? -6 : 6, side === 'right' ? 6 : -6])

  const fill = tone === 'matcha' ? '#4A9C4F' : tone === 'moss' ? '#35803D' : '#1E6B27'

  if (reduceMotion) {
    return (
      <div aria-hidden className={`pointer-events-none absolute ${className}`}>
        <svg viewBox="0 0 600 600" className="h-full w-full opacity-[0.14] blur-3xl">
          <path
            fill={fill}
            d="M431 78Q520 156 486 268Q452 380 356 452Q260 524 158 466Q56 408 62 288Q68 168 172 100Q276 32 342 55Q342 55 431 78Z"
          />
        </svg>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ y, scale, rotate, willChange: 'transform' }}
    >
      <svg viewBox="0 0 600 600" className="h-full w-full opacity-[0.14] blur-3xl">
        <path
          fill={fill}
          d="M431 78Q520 156 486 268Q452 380 356 452Q260 524 158 466Q56 408 62 288Q68 168 172 100Q276 32 342 55Q342 55 431 78Z"
        />
      </svg>
    </motion.div>
  )
}
