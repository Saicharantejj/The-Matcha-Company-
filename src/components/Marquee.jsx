// Infinite ticker at the very top of the page.
//
// Driven by a plain CSS keyframe animation rather than a per-frame JS
// transform: the browser can run this entirely on the compositor, off the main
// thread, so it costs nothing while the page is scrolling or animating
// elsewhere. The earlier scroll-velocity version recalculated and wrote a
// transform on every single frame, which competed with everything else.
export default function Marquee({ items }) {
  const content = items.join('   ///   ')
  return (
    <div className="w-full overflow-hidden border-b-2 border-ink bg-ink text-cream">
      <div className="marquee-track py-2 font-mono text-[11px] uppercase tracking-widest">
        <span className="whitespace-nowrap px-4">{content}</span>
        <span className="whitespace-nowrap px-4" aria-hidden="true">
          {content}
        </span>
      </div>
    </div>
  )
}
