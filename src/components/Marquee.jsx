import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion'

const wrap = (min, max, v) => {
  const range = max - min
  return min + (((v - min) % range) + range) % range
}

/**
 * Ticker whose speed and direction respond to how fast (and which way) the
 * visitor is scrolling. It always drifts at a base rate; scrolling adds to
 * that, and scrolling up flips it into reverse.
 *
 * Driven by a per-frame transform rather than a CSS animation, because the
 * speed has to change continuously.
 */
export default function Marquee({ items, baseVelocity = -2.4 }) {
  const reduceMotion = useReducedMotion()
  const content = items.join('   ///   ')

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  // Scrolling hard adds up to ~5x the resting speed.
  const velocityFactor = useTransform(smoothVelocity, [-1800, 0, 1800], [-5, 0, 5], {
    clamp: false,
  })

  const directionRef = useRef(1)

  useAnimationFrame((_t, delta) => {
    if (reduceMotion) return
    let moveBy = directionRef.current * baseVelocity * (delta / 1000)

    // Scroll direction sets the travel direction; its magnitude adds speed.
    const factor = velocityFactor.get()
    if (factor < 0) directionRef.current = -1
    else if (factor > 0) directionRef.current = 1

    moveBy += directionRef.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  // Two copies sit side by side; wrapping over one copy's width (-50%..0)
  // makes the seam invisible.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  return (
    <div className="w-full overflow-hidden border-b-2 border-ink bg-ink text-cream">
      <motion.div
        style={reduceMotion ? undefined : { x }}
        className={`flex w-max py-2 font-mono text-[11px] uppercase tracking-widest ${
          reduceMotion ? 'marquee-track' : ''
        }`}
      >
        {/* Four copies so the track is always wider than any viewport, which is
            what lets the -50% wrap read as continuous. */}
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="whitespace-nowrap px-4" aria-hidden={i > 0}>
            {content}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
