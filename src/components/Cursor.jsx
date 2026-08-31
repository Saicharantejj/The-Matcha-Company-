import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useCoarsePointer } from './Motion'

/**
 * A companion ring that trails the pointer.
 *
 * Deliberately NOT a cursor replacement. Hiding the system cursor to draw your
 * own is the thing that makes a site feel like a showreel: the arrow you have
 * used for thirty years disappears, precision goes with it, and every click
 * costs a moment of hunting. The native cursor stays exactly where it is. This
 * is a ring that follows a few frames behind it and swells over anything
 * clickable — enough to register as attention, not enough to be a toy.
 *
 * Off entirely for touch (there is no pointer to follow) and for
 * prefers-reduced-motion (a permanently animating element is precisely what
 * that setting is asking us not to render).
 */
export default function Cursor() {
  const reduceMotion = useReducedMotion()
  const coarse = useCoarsePointer()
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Light spring: enough lag to feel like it is following, not enough to feel
  // like it is lost.
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.35 })

  useEffect(() => {
    if (reduceMotion || coarse) return undefined

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setActive(Boolean(e.target?.closest?.(INTERACTIVE)))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduceMotion, coarse, x, y])

  if (reduceMotion || coarse) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
      style={{ x: sx, y: sy }}
      initial={false}
    >
      <motion.span
        className="block rounded-full border border-olive"
        animate={{
          width: active ? 42 : 18,
          height: active ? 42 : 18,
          x: active ? -21 : -9,
          y: active ? -21 : -9,
          opacity: visible ? (active ? 0.55 : 0.3) : 0,
          backgroundColor: active ? 'rgba(30,107,39,0.06)' : 'rgba(30,107,39,0)',
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}
