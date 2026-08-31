import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useCoarsePointer } from './Motion'

/**
 * A slight pull toward the cursor, for the handful of buttons that lead a
 * section — not every button on the site, or the effect stops meaning
 * "this one matters" and starts meaning nothing.
 *
 * Off for touch (there is no hover to pull toward) and for reduced motion.
 * The pull is capped at 8px and springs back hard on leave, so it reads as
 * the button noticing the cursor rather than chasing it.
 */
export default function Magnetic({ children, className = '', strength = 0.25 }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const coarse = useCoarsePointer()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 300, damping: 22, mass: 0.4 })

  if (reduceMotion || coarse) return <span className={className}>{children}</span>

  const onMove = (e) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    const px = e.clientX - (box.left + box.width / 2)
    const py = e.clientY - (box.top + box.height / 2)
    const max = 8
    x.set(Math.max(-max, Math.min(max, px * strength)))
    y.set(Math.max(-max, Math.min(max, py * strength)))
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  )
}
