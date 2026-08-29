import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, Clock, Plus, Utensils } from 'lucide-react'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import SachetGraphic from '../components/SachetGraphic'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { diyKits } from '../data/products'

const DIFFICULTY_COLOR = {
  EASY: 'bg-moss text-cream',
  MEDIUM: 'bg-olive text-cream',
  HARD: 'bg-ink text-cream',
}

function KitCard({ kit }) {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(() => new Set())
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const handleAdd = () => {
    addItem(kit, 'diy-kit')
    notify(`${kit.name} added`, { action: 'View cart', onAction: openCart })
  }

  const toggle = (item) =>
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(item) ? next.delete(item) : next.add(item)
      return next
    })

  return (
    <div className="card-hard flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/10] w-full border-b-2 border-ink">
        <SachetGraphic swatch={kit.swatch} badge={kit.badge} flavor={kit.flavor} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg tracking-display">{kit.name}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-bark">{kit.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="tag-outline flex items-center gap-1.5">
            <Clock size={11} strokeWidth={2.5} aria-hidden="true" />
            {kit.prepTime}
          </span>
          <span
            className={`border-2 border-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
              DIFFICULTY_COLOR[kit.difficulty] || ''
            }`}
          >
            {kit.difficulty}
          </span>
          <span className="tag-outline flex items-center gap-1.5">
            <Utensils size={11} strokeWidth={2.5} aria-hidden="true" />
            {kit.servings}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 flex items-center justify-between border-t-2 border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-widest text-olive"
        >
          What's Included
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown size={15} strokeWidth={2.5} aria-hidden="true" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="mt-3 space-y-2">
                {kit.includes.map((item) => {
                  const isChecked = checked.has(item)
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => toggle(item)}
                        aria-pressed={isChecked}
                        className="flex w-full items-start gap-2.5 text-left font-body text-sm text-bark"
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center border-2 border-ink transition-colors ${
                            isChecked ? 'bg-moss text-cream' : 'bg-transparent'
                          }`}
                        >
                          {isChecked && <Check size={10} strokeWidth={3.5} aria-hidden="true" />}
                        </span>
                        <span className={isChecked ? 'line-through opacity-55' : ''}>{item}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={handleAdd}
            className="btn-hard w-full border-ink bg-olive text-cream"
          >
            <Plus size={14} strokeWidth={3} aria-hidden="true" />
            Add Kit to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// Card geometry. The roll maths needs these as plain numbers, so they drive the
// layout as well rather than being restated as Tailwind classes that could
// silently drift out of step with the transforms below.
const CARD_W = 380
const CARD_GAP = 24
const TRACK_PAD = 32

/**
 * One card on the moving track.
 *
 * Reacts to how far its own centre sits from the centre of the viewport, so the
 * row reads as a physical reel rather than a flat strip sliding past: the card
 * under the eye is upright and full size, and the ones heading off to either
 * side tilt away and recede.
 *
 * Rotation and scale are deliberately coupled. A card at full tilt is also at
 * its smallest, which keeps its rotated bounding box no taller than an upright
 * card at rest — otherwise the corners would clip against the overflow-hidden
 * on the pinned container.
 *
 * Everything derives from the shared x motion value, so this runs on the
 * compositor without a React render per frame.
 */
function RollingCard({ kit, index, x, viewportW }) {
  // Signed distance in px from the viewport centre; negative is to the left.
  const offset = useTransform(x, (tx) =>
    viewportW ? TRACK_PAD + index * (CARD_W + CARD_GAP) + CARD_W / 2 + tx - viewportW / 2 : 0,
  )

  // Reach slightly beyond one card, so an immediate neighbour lands mid-tilt and
  // cards further out ease into the limit instead of snapping straight to it.
  const reach = (CARD_W + CARD_GAP) * 1.4
  const rotate = useTransform(offset, [-reach, 0, reach], [-6, 0, 6])
  const scale = useTransform(offset, [-reach, 0, reach], [0.92, 1, 0.92])

  return (
    <motion.div style={{ width: CARD_W, rotate, scale }} className="flex-shrink-0">
      <KitCard kit={kit} />
    </motion.div>
  )
}

/**
 * Pins the viewport and converts vertical scroll into horizontal travel across
 * the kit cards, then releases back to normal scrolling.
 *
 * The pinned section gets a tall spacer whose height equals the horizontal
 * distance to travel, so the scroll "spent" here matches the distance covered —
 * that is what keeps the effect from feeling arbitrary.
 *
 * This lives in its own component, mounted only once the pinned layout is
 * actually chosen. useScroll binds its target ref on first render; if it
 * mounted alongside the fallback it would capture a null ref and never track.
 */
function PinnedKits({ kits }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  // The reel maths is measured against the centre of the viewport, so the cards
  // need its width as well as the distance the track has to travel.
  const [viewportW, setViewportW] = useState(0)

  // Measure before paint so the first frame is already correct.
  useLayoutEffect(() => {
    const measure = () => {
      const el = trackRef.current
      if (!el) return
      setViewportW(window.innerWidth)
      setDistance(Math.max(el.scrollWidth - window.innerWidth + 96, 0))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [kits.length])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -distance])

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 w-full max-w-7xl px-5 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-olive">
            Scroll to browse — {kits.length} kits
          </p>
        </div>
        <motion.div
          ref={trackRef}
          data-testid="kit-track"
          style={{ x, gap: CARD_GAP, paddingLeft: TRACK_PAD, paddingRight: TRACK_PAD }}
          className="flex w-max"
        >
          {kits.map((kit, i) => (
            <RollingCard key={kit.id} kit={kit} index={i} x={x} viewportW={viewportW} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Chooses between the pinned horizontal showcase and an ordinary grid.
 *
 * Falls back to the grid on coarse pointers, narrow viewports, or when the
 * visitor prefers reduced motion — scroll-jacking on a phone is hostile and
 * cannot be escaped by scrolling faster.
 */
function HorizontalKits({ kits }) {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (reduceMotion) return undefined
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [reduceMotion])

  if (!enabled) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {kits.map((kit) => (
            <KitCard key={kit.id} kit={kit} />
          ))}
        </div>
      </div>
    )
  }

  return <PinnedKits kits={kits} />
}

export default function DiyKits() {
  return (
    <PageShell>
      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-olive">Make It Yourself</p>
            <h1 className="mt-2 font-display text-4xl tracking-display sm:text-5xl">DIY Kits</h1>
            <p className="mt-4 max-w-xl font-body text-base text-bark">
              Each kit builds one recipe around a flavor sachet — pre-portioned, no whisk or
              ceremony required. Just what you need, plus a recipe card.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel">
        <HorizontalKits kits={diyKits} />
      </section>
    </PageShell>
  )
}
