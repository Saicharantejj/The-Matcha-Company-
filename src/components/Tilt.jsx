import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Tilts its children in 3D toward the pointer.
 *
 * The element owning the perspective is separate from the element being
 * rotated, because a single element cannot both establish perspective for
 * itself and be transformed by it.
 */
export default function Tilt({
  children,
  className = '',
  max = 9,
  scale = 1.02,
  perspective = 900,
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)

  // -0.5 … 0.5, relative position of the pointer within the element.
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 260, damping: 22, mass: 0.5 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)
  const s = useSpring(useMotionValue(1), spring)

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const handleEnter = () => s.set(scale)
  const handleLeave = () => {
    px.set(0)
    py.set(0)
    s.set(1)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{ perspective }}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, scale: s, transformStyle: 'preserve-3d' }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
