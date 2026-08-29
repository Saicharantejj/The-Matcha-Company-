import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * In-view detection, on a plain IntersectionObserver.
 *
 * Framer's own whileInView would do this too; this exists for one property it
 * does not give us. Anything already on screen when the component mounts is
 * measured with getBoundingClientRect and shown immediately, rather than
 * waiting for an observer callback that arrives a frame or more later. Above
 * the fold that difference is the hero image, and it should never be a frame
 * behind the headline it sits next to.
 *
 * rootMargin starts the reveal just before an element arrives, and the observer
 * disconnects once it has fired so nothing keeps watching a plate that is
 * already open.
 */
function useInView(ref, { once = true, rootMargin = '0px 0px 80px 0px' } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    // Without IntersectionObserver, show the content rather than hide it.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    // Anything already on screen at mount is shown without waiting for the
    // observer's first callback. This is measured, not observed, so it holds
    // even where callbacks are delayed — a tab restored from the background,
    // for instance, where Chrome does not deliver intersection records. The
    // failure this guards against is an invisible product image, which is a far
    // worse outcome than a reveal that does not play.
    const box = el.getBoundingClientRect()
    const viewportH = window.innerHeight || document.documentElement.clientHeight
    if (box.top < viewportH && box.bottom > 0) {
      setInView(true)
      if (once) return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, once, rootMargin])

  return inView
}

/**
 * The site's motion vocabulary — three gestures, not thirty.
 *
 * What was here before was a single fade-and-rise applied thirty times, plus a
 * character-by-character spring on the hero that bounced each glyph in on a
 * rotation. Everything moved, everything moved the same way, and none of it
 * meant anything.
 *
 * These three are meant to be used sparingly and for different jobs:
 *
 *   Rise         a line of display type climbing out from behind its own
 *                baseline. One line per call, because a real line break is the
 *                only honest way to know where a line ends.
 *   ImageReveal  a photograph uncovered by a moving edge while it settles back
 *                from a slight over-scale. Never a fade.
 *   Reveal       the quiet one, for everything else. Deliberately smaller and
 *                slower than the old default so it registers as arrival rather
 *                than as animation.
 *
 * The easing is the same cubic curve throughout — fast out, long settle, no
 * overshoot. Nothing here bounces.
 */
const EASE = [0.22, 1, 0.36, 1]

export function Rise({ children, delay = 0, className = '', as: Tag = 'span' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <Tag className={className}>{children}</Tag>

  return (
    <Tag className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}

/**
 * Same gesture, but triggered by scroll rather than on mount, for display type
 * further down the page.
 */
export function RiseInView({ children, delay = 0, className = '', as: Tag = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <Tag className={className}>{children}</Tag>

  return (
    <Tag ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={inView ? { y: 0 } : { y: '105%' }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}

export function ImageReveal({ children, delay = 0, className = '', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.06 }}
        animate={
          inView
            ? { clipPath: 'inset(0 0 0% 0)', scale: 1 }
            : { clipPath: 'inset(0 0 100% 0)', scale: 1.06 }
        }
        transition={{ duration: 0.95, delay, ease: EASE }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function Reveal({ children, delay = 0, className = '', as = 'div', amount = 0.25 }) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerGroup({ children, className = '', stagger = 0.09, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
