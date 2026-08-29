import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Anything matching this counts as "interactive" — the cursor snaps to its box.
const INTERACTIVE = 'a, button, [data-cursor="snap"]'
const TEXT_FIELD = 'input, textarea, select'

/**
 * Hard square cursor that trails the pointer and snaps to the bounding box of
 * whatever interactive element is under it. mix-blend-difference flips it
 * against whatever it crosses, so it stays visible on camel, card and ink alike.
 *
 * Only mounts for fine pointers (real mice). Touch users keep native behaviour,
 * and reduced-motion users get no custom cursor at all. The native cursor is
 * hidden via a class this component adds, so if the JS never runs the pointer
 * is never left invisible.
 */
export default function MagneticCursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [snapped, setSnapped] = useState(false)
  const [visible, setVisible] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const w = useMotionValue(14)
  const h = useMotionValue(14)

  // Looser spring on position (a trail), tighter on size (snap feels instant).
  const sx = useSpring(x, { stiffness: 750, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 750, damping: 40, mass: 0.4 })
  const sw = useSpring(w, { stiffness: 550, damping: 42 })
  const sh = useSpring(h, { stiffness: 550, damping: 42 })

  useEffect(() => {
    if (reduceMotion) return undefined
    const mq = window.matchMedia('(pointer: fine)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [reduceMotion])

  useEffect(() => {
    if (!enabled) return undefined
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      setVisible(true)
      const el = e.target instanceof Element ? e.target : null
      const target = el && !el.closest(TEXT_FIELD) ? el.closest(INTERACTIVE) : null
      if (target) {
        const r = target.getBoundingClientRect()
        // Sit on the element as a frame rather than a dot.
        x.set(r.left + r.width / 2)
        y.set(r.top + r.height / 2)
        w.set(r.width + 12)
        h.set(r.height + 12)
        setSnapped(true)
      } else {
        x.set(e.clientX)
        y.set(e.clientY)
        w.set(14)
        h.set(14)
        setSnapped(false)
      }
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y, w, h])

  if (!enabled) return null

  return (
    // Outer element carries the Framer transform (x/y); the inner one carries
    // the CSS centering transform. Splitting them keeps Framer's inline
    // transform from silently overriding Tailwind's translate utilities.
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[110] mix-blend-difference"
    >
      <motion.div
        style={{
          width: sw,
          height: sh,
          backgroundColor: snapped ? 'transparent' : '#6F9E28',
          borderColor: '#6F9E28',
          borderWidth: snapped ? 2 : 0,
          borderStyle: 'solid',
          opacity: visible ? (down ? 0.6 : 1) : 0,
        }}
        className="-translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  )
}
