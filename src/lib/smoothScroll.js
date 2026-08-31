import Lenis from 'lenis'

/**
 * Smooth scrolling, as one shared instance.
 *
 * Lenis takes the wheel and animates the scroll position itself, which is what
 * turns a stepped trackpad scroll into a continuous one and what makes every
 * scroll-linked animation on the site read as a single movement rather than as
 * a series of jumps.
 *
 * It is deliberately off in three cases:
 *
 *   prefers-reduced-motion   hijacking the scroll is exactly the thing that
 *                            setting asks us not to do
 *   touch devices            iOS and Android already scroll beautifully, and
 *                            replacing native momentum with a JS loop makes a
 *                            phone feel worse, not better
 *   no matchMedia            an environment old enough to lack it gets the
 *                            plain scroll it expects
 *
 * The instance is module-level rather than in context because two things
 * outside React's tree need it: the route change that resets scroll position,
 * and the overlays that must stop the page moving underneath them.
 */
let lenis = null

export function initSmoothScroll() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
  // Coarse pointer means a finger. Leave native momentum alone.
  if (window.matchMedia('(pointer: coarse)').matches) return undefined

  lenis = new Lenis({
    // Long enough to feel carried, short enough not to feel laggy when you
    // flick the wheel twice.
    duration: 1.05,
    // The same curve as the rest of the site's motion, in function form.
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    // Anything marked data-lenis-prevent scrolls itself — the cart drawer's
    // contents, for one, which must not move the page behind it.
    prevent: (node) => node.hasAttribute?.('data-lenis-prevent'),
  })

  let frame = requestAnimationFrame(function loop(time) {
    lenis.raf(time)
    frame = requestAnimationFrame(loop)
  })

  return () => {
    cancelAnimationFrame(frame)
    lenis.destroy()
    lenis = null
  }
}

/** Jump to the top with no animation — for route changes, which are not scrolls. */
export function scrollToTopImmediately() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

/**
 * Freeze the page while an overlay owns the screen. The drawer and the mobile
 * menu already set overflow:hidden on the body; Lenis runs its own loop and
 * would keep animating past it, so it has to be told as well.
 */
export function setSmoothScrollPaused(paused) {
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
