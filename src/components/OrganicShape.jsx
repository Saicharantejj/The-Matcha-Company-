import { useRef } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useScrollProgress, useCoarsePointer } from './Motion'

/**
 * A real organic shape — Mello's blob language, borrowed on purpose, kept off
 * everything the brand actually stands on.
 *
 * The design system is explicit that nothing here is rounded: every corner in
 * tailwind.config.js is forced back to 3-4px, and the comment above it says
 * structure comes from ink rules, not containers. That rule protects the
 * things people touch — buttons, cards, photo frames, the nav. It says
 * nothing about a shape that never becomes any of those. Used as a visible
 * layer behind a photograph or a heading, in the site's own colours, at an
 * opacity chosen to read against whatever it sits on rather than melt into
 * it, this adds the thing Mello does without moving a single existing
 * corner.
 *
 * `surface` picks a tone and strength that actually shows up on that
 * background — the previous version used an olive glow on an ink section,
 * which is a dark green shape on a near-identical dark green ground: real in
 * the DOM, invisible on screen. `dark` now reads light-on-ink; `light` reads
 * a deeper tone lifted just enough off camel or card to be seen without
 * looking like a stain.
 */
const TONES = {
  dark: { fill: '#F5F5DC', opacity: 0.16, blur: 'blur-2xl' },
  darkWarm: { fill: '#DCDCB8', opacity: 0.18, blur: 'blur-2xl' },
  light: { fill: '#1E6B27', opacity: 0.09, blur: 'blur-2xl' },
  lightBold: { fill: '#35803D', opacity: 0.13, blur: 'blur-xl' },
}

const PATHS = [
  'M431 78Q520 156 486 268Q452 380 356 452Q260 524 158 466Q56 408 62 288Q68 168 172 100Q276 32 342 55Q342 55 431 78Z',
  'M368 62Q470 96 498 210Q526 324 442 404Q358 484 244 470Q130 456 92 344Q54 232 128 140Q202 48 285 42Q368 36 368 62Z',
]

export default function OrganicShape({
  className = '',
  surface = 'dark',
  path = 0,
  distance = 60,
  scaleRange = [0.94, 1.1],
  side = 'right',
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const coarse = useCoarsePointer()
  const progress = useScrollProgress(ref)
  const { fill, opacity, blur } = TONES[surface] || TONES.dark
  const d = PATHS[path] || PATHS[0]

  const travel = coarse ? distance * 0.35 : distance
  const y = useTransform(progress, [0, 1], [travel, -travel])
  const scale = useTransform(progress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]])
  const rotate = useTransform(progress, [0, 1], [side === 'right' ? -8 : 8, side === 'right' ? 8 : -8])

  if (reduceMotion) {
    return (
      <div aria-hidden className={`pointer-events-none absolute ${className}`}>
        <svg viewBox="0 0 600 600" className={`h-full w-full ${blur}`} style={{ opacity }}>
          <path fill={fill} d={d} />
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
      <svg viewBox="0 0 600 600" className={`h-full w-full ${blur}`} style={{ opacity }}>
        <path fill={fill} d={d} />
      </svg>
    </motion.div>
  )
}
