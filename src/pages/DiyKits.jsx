import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import Reveal, { Rise, Parallax } from '../components/Motion'
import FlavorPlate from '../components/FlavorPlate'
import Photo from '../components/Photo'
import OrganicShape from '../components/OrganicShape'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import { diyKits } from '../data/products'
import { photos } from '../data/photos'

function KitRow({ kit, index }) {
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
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })

  const panelId = `kit-panel-${kit.id}`

  return (
    <article className="group/row glass-card p-6 sm:p-10 rounded-2xl mb-8 border border-[#4E6B3E]/20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="flex items-center gap-4">
            <span className="index-num text-base text-[#4E6B3E]">{String(index + 1).padStart(2, '0')}</span>
            {kit.badge && <span className="spec text-xs px-3 py-1 bg-[#4E6B3E] text-[#F8F5EB] rounded-full">{kit.badge}</span>}
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-[#232E1E]">{kit.name}</h2>
          <p className="mt-3 font-serif text-xl italic text-[#4E6B3E]">{kit.blurb}</p>
          <p className="mt-4 font-body text-sm leading-relaxed text-[#232E1E]/80">{kit.method}</p>

          <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#E9E7D0]/60 border border-[#232E1E]/10">
            <div>
              <dt className="spec text-[0.65rem]">Time</dt>
              <dd className="mt-1 font-body text-sm font-bold text-[#232E1E]">{kit.prepTime}</dd>
            </div>
            <div>
              <dt className="spec text-[0.65rem]">Effort</dt>
              <dd className="mt-1 font-body text-sm font-bold text-[#232E1E]">{kit.difficulty}</dd>
            </div>
            <div>
              <dt className="spec text-[0.65rem]">Makes</dt>
              <dd className="mt-1 font-body text-sm font-bold text-[#232E1E]">{kit.servings}</dd>
            </div>
            <div>
              <dt className="spec text-[0.65rem]">You Add</dt>
              <dd className="mt-1 font-body text-sm font-bold text-[#232E1E]">{kit.youAdd[0]}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={handleAdd} className="btn border-[#4E6B3E] bg-[#4E6B3E] text-[#F8F5EB] shadow-md">
              Add Kit to Cart &rarr;
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="btn-outline"
            >
              {open ? 'Hide Box Contents' : "What's in the Box?"}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-6 rounded-xl bg-[#F8F5EB] border border-[#4E6B3E]/20 shadow-inner">
                  <span className="spec text-[#4E6B3E] mb-3 block">Box Contents Checklist</span>
                  <ul className="space-y-2">
                    {kit.includes.map((item) => {
                      const isChecked = checked.has(item)
                      return (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => toggle(item)}
                            aria-pressed={isChecked}
                            className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#E9E7D0]/50 transition-colors text-left"
                          >
                            <span
                              className={`h-5 w-5 rounded-md border flex items-center justify-center font-bold text-xs transition-colors ${
                                isChecked ? 'bg-[#4E6B3E] border-[#4E6B3E] text-[#F8F5EB]' : 'border-[#232E1E]/30 bg-white'
                              }`}
                            >
                              {isChecked ? '✓' : ''}
                            </span>
                            <span
                              className={`font-body text-sm ${
                                isChecked ? 'text-[#232E1E]/50 line-through' : 'text-[#232E1E] font-medium'
                              }`}
                            >
                              {item}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Parallax distance={index % 2 === 0 ? 30 : -30} className="lg:col-span-5">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#E9E7D0]/60 p-3 border border-[#232E1E]/10">
            <FlavorPlate
              item={kit}
              className="h-full w-full object-cover rounded-lg transition-transform duration-700 group-hover/row:scale-105"
            />
          </div>
        </Parallax>
      </div>
    </article>
  )
}

export default function DiyKits() {
  return (
    <PageShell>
      <section className="relative bg-[#E9E7D0] px-6 pb-20 pt-16 sm:px-10 sm:pt-24 overflow-hidden border-b border-[#232E1E]/10">
        <OrganicShape className="-right-20 -top-20 h-[40rem] w-[40rem]" surface="lightBold" path={2} distance={50} side="right" />

        <div className="relative mx-auto max-w-[100rem]">
          <span className="spec text-[#4E6B3E] px-4 py-1.5 glass-pill rounded-full inline-block mb-6">
            Six Pre-Portioned Recipes
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[#232E1E] leading-[0.9]">
            <Rise delay={0.05}>Things to make</Rise>
            <Rise delay={0.15} className="text-[#4E6B3E] italic">with one sachet.</Rise>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl font-serif text-xl italic text-[#232E1E]/80">
              Each kit is one recipe, pre-portioned, with the sachets and the card in the box. Nothing here needs a whisk and nothing takes longer than the washing up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#E9E7D0] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-[100rem]">
          {diyKits.map((kit, i) => (
            <KitRow key={kit.id} kit={kit} index={i} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
