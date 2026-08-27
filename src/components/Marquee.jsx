// Infinite scrolling ticker in Courier Prime, used at the very top of the page.
export default function Marquee({ items }) {
  const content = items.join('   ///   ')
  return (
    <div className="w-full overflow-hidden border-b border-chocolate bg-chocolate text-cream">
      <div className="marquee-track py-2 font-mono text-[11px] uppercase tracking-widest">
        <span className="whitespace-nowrap px-4">{content}</span>
        <span className="whitespace-nowrap px-4" aria-hidden="true">{content}</span>
      </div>
    </div>
  )
}
