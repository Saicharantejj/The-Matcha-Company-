import { useRef } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useScrollProgress, useCoarsePointer } from './Motion'

const TONES = {
  dark: { fill: '#E9E7D0', opacity: 0.16, blur: 'blur-2xl' },
  darkWarm: { fill: '#C4D2B8', opacity: 0.18, blur: 'blur-2xl' },
  light: { fill: '#4E6B3E', opacity: 0.09, blur: 'blur-2xl' },
  lightBold: { fill: '#C4D2B8', opacity: 0.13, blur: 'blur-xl' },
  glass: { fill: '#F8F5EB', opacity: 0.22, blur: 'blur-3xl' },
}

const PATHS = [
  'M431 78Q520 156 486 268Q452 380 356 452Q260 524 158 466Q56 408 62 288Q68 168 172 100Q276 32 342 55Q342 55 431 78Z',
  'M368 62Q470 96 498 210Q526 324 442 404Q358 484 244 470Q130 456 92 344Q54 232 128 140Q202 48 285 42Q368 36 368 62Z',
  'M410 90Q490 170 470 290Q450 410 330 460Q210 510 130 430Q50 350 70 230Q90 110 210 70Q330 30 410 90Z',
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
