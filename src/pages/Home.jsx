import { Link } from 'react-router-dom'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { ArrowRight, Leaf, Package, Timer } from 'lucide-react'
import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import MoodMatcher from '../components/MoodMatcher'
import TaglineTicker from '../components/TaglineTicker'
import ProductCard from '../components/ProductCard'
import SplitText from '../components/SplitText'
import Magnetic from '../components/Magnetic'
import heroImg from '../assets/hero-iced-matcha-cutout.png'
import { products, FLAVORS } from '../data/products'

// Accent squares that drift around the glass at different scroll rates. Depth
// is what sells it — each one gets its own speed, size and starting offset.
const ACCENTS = [
  { top: '12%', left: '4%', size: 26, depth: 1.0, color: '#6F9E28', spin: 12 },
  { top: '30%', left: '84%', size: 16, depth: 1.9, color: '#43481D', spin: -18 },
  { top: '62%', left: '2%', size: 18, depth: 1.5, color: '#7C8438', spin: 22 },
  { top: '78%', left: '76%', size: 30, depth: 0.7, color: '#6F9E28', spin: -10 },
  { top: '48%', left: '92%', size: 12, depth: 2.4, color: '#43481D', spin: 30 },
]

const FEATURED_IDS = ['strawberry-sachet', 'mango-sachet', 'ube-sachet']

// One drifting accent square. `depth` scales how far it travels against the
// scroll — higher means it moves more, so it reads as nearer the viewer.
function AccentSquare({ top, left, size, depth, color, spin, progress, reduceMotion }) {
  const y = useTransform(progress, [0, 1], [0, -260 * depth])
  const rotate = useTransform(progress, [0, 1], [0, spin * 6])
  const opacity = useTransform(progress, [0, 0.7, 1], [1, 0.5, 0])
  return (
    <motion.div style={{ top, left, y, rotate, opacity }} className="absolute">
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 3 + depth * 1.6, ease: 'easeInOut', repeat: Infinity }}
        style={{ width: size, height: size, backgroundColor: color }}
        className="border-2 border-ink"
      />
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const reduceMotion = useReducedMotion()

  // The cup drifts rather than slides. Scrolling lets it lag behind the page
  // (positive y against the page's upward travel reads as parallax depth),
  // tilting and shrinking as it goes, then fading out over the last stretch.
  // The spring keeps the drift from feeling mechanically pinned to the wheel.
  const drift = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const heroImgY = useTransform(drift, [0, 1], [0, 150])
  const heroImgRotate = useTransform(drift, [0, 1], [0, 7])
  const heroImgScale = useTransform(drift, [0, 1], [1, 0.88])
  const heroImgOpacity = useTransform(drift, [0, 0.55, 1], [1, 0.9, 0])
  // The cast shadow stays put while the cup floats above it, and tightens as
  // the cup lifts — that contrast is what sells the float as depth.
  const shadowScale = useTransform(drift, [0, 1], [1, 0.7])
  const shadowOpacity = useTransform(drift, [0, 1], [1, 0])

  // Mouse-driven 3D tilt on the glass. Pointer position is tracked across the
  // whole hero, not just the image, so the glass reacts as you approach it.
  const pointerX = useMotionValue(0) // -0.5 … 0.5
  const pointerY = useMotionValue(0)
  const tiltSpring = { stiffness: 200, damping: 24, mass: 0.6 }
  const glassRotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), tiltSpring)
  const glassRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), tiltSpring)

  const handleHeroPointer = (e) => {
    if (reduceMotion) return
    const r = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - r.left) / r.width - 0.5)
    pointerY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const resetHeroPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  return (
    <PageShell>
      {/* HERO */}
      <section
        ref={heroRef}
        onPointerMove={handleHeroPointer}
        onPointerLeave={resetHeroPointer}
        className="relative overflow-hidden border-b-2 border-ink bg-camel"
      >
        {/* Parallax accent squares — behind everything, drifting at their own
            rates so the hero reads as layered rather than flat. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          {ACCENTS.map((a, i) => (
            <AccentSquare key={i} {...a} progress={drift} reduceMotion={reduceMotion} />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          {/* The glass is pinned to the right half on desktop. Each element below
              owns exactly one transform source — Framer's inline transform
              silently overrides Tailwind's, so layout uses flex, never
              translate utilities, on anything Framer also animates. */}
          <div className="pointer-events-none mb-8 flex justify-center lg:absolute lg:inset-0 lg:z-0 lg:mb-0 lg:items-center lg:justify-end">
            <motion.div
              style={{
                y: heroImgY,
                rotate: heroImgRotate,
                scale: heroImgScale,
                opacity: heroImgOpacity,
              }}
              className="relative flex flex-col items-center lg:mr-[-1%]"
            >
              {/* idle float — its own element so its y never fights the
                  scroll-driven y on the parent */}
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                className="flex justify-center"
                style={{ perspective: 1000 }}
              >
                {/* 3D tilt lives on its own element, inside the perspective one */}
                <motion.img
                  src={heroImg}
                  alt="Iced matcha made from one of our flavor sachets"
                  style={{ rotateX: glassRotateX, rotateY: glassRotateY }}
                  className="h-[300px] w-auto object-contain drop-shadow-[0_24px_20px_rgba(76,56,44,0.3)] sm:h-[420px] lg:h-[640px] xl:h-[720px]"
                />
              </motion.div>

              {/* cast shadow sits below and stays behind, so the glass reads as
                  lifting off it rather than dragging it along */}
              <motion.div
                aria-hidden="true"
                style={{ scaleX: shadowScale, opacity: shadowOpacity }}
                className="-mt-4 h-8 w-48 bg-ink/25 blur-xl sm:w-64 lg:-mt-6 lg:h-10 lg:w-80"
              />
            </motion.div>
          </div>

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 lg:pr-6"
            >
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-olive">
                <Leaf size={14} strokeWidth={2.5} aria-hidden="true" />
                Made for everyday
              </p>
              {/* Kinetic split reveal — each glyph springs in on a stagger */}
              <h1 className="font-display text-[13vw] leading-[0.95] tracking-display sm:text-6xl lg:text-7xl">
                <SplitText text="Matcha, minus" as="span" className="block" delay={0.15} />
                <SplitText text="the ceremony" as="span" className="block" delay={0.42} />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-md font-body text-base leading-relaxed text-ink/80 sm:text-lg"
              >
                Good matcha shouldn't need a café visit or a bamboo whisk. Just tear a sachet, stir, and go.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.98, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Magnetic>
                  <Link to="/matchas" className="btn-hard border-ink bg-olive text-cream">
                    Shop the Sachets
                    <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/matcha-kits" className="btn-hard border-ink bg-transparent text-ink">
                    Bulk &amp; Cafés
                  </Link>
                </Magnetic>
              </motion.div>

              <div className="mt-10 flex items-center gap-6 border-t border-ink/15 pt-6">
                <div>
                  <p className="font-display text-2xl tracking-display text-olive">4.8/5</p>
                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/60">
                    <Package size={12} strokeWidth={2.5} aria-hidden="true" />
                    2,300+ orders
                  </p>
                </div>
                <div className="h-8 w-px bg-ink/20" />
                <div>
                  <p className="font-display text-2xl tracking-display text-olive">5</p>
                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/60">
                    <Timer size={12} strokeWidth={2.5} aria-hidden="true" />
                    Sachet flavors
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-ink/15 pt-6">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ink/55">
                  One sachet, stirred with milk or water
                </p>
                <div className="flex flex-wrap gap-2">
                  {FLAVORS.map((flavor) => (
                    <span key={flavor} className="tag-outline">
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* empty column keeps the text at half-width on desktop so the
                absolutely positioned cup has room to sit (and slide) behind it */}
            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* MOOD MATCHER */}
      <section className="border-b border-ink bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-8 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-olive">Not sure where to start?</p>
            <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">Find your flavor</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MoodMatcher />
          </Reveal>
        </div>
      </section>

      {/* TAGLINE TICKER */}
      <TaglineTicker />

      {/* FEATURED SPECIALS */}
      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-olive">Fan favorites</p>
              <h2 className="mt-2 font-display text-3xl tracking-display sm:text-4xl">Featured Flavors</h2>
            </div>
            <Link
              to="/matchas"
              className="font-mono text-xs uppercase tracking-widest text-olive underline underline-offset-4 hover:text-ink"
            >
              View full catalog →
            </Link>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-ink bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl tracking-display text-cream sm:text-5xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-cream/75">
              Order online and we'll ship it out, or set your café up with a standing order.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Link to="/matchas" className="btn-hard border-cream bg-cream text-ink">
                  Shop Now
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/our-story" className="btn-hard border-cream bg-transparent text-cream">
                  Our Story
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
