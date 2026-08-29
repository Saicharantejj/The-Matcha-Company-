import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Pulls its child toward the pointer once the pointer comes within `threshold`
 * pixels of the element's edge, then springs back on leave.
 *
 * Listens on the window rather than on the element, because the pull has to
 * begin *before* the pointer actually reaches the element.
 */
export default function Magnetic({ children, className = '', threshold = 30, strength = 0.38 }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 320, damping: 20, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (reduceMotion) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      // Distance to the element's box, not its centre — so the threshold means
      // the same thing for a wide button as for a small one.
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom)
      if (Math.hypot(dx, dy) <= threshold) {
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      } else if (x.get() !== 0 || y.get() !== 0) {
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduceMotion, threshold, strength, x, y])

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  )
}
