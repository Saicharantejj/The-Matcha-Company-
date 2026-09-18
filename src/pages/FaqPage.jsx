import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'

const FAQ_DATA = [
  {
    category: 'PRODUCTS & FLAVOURS',
    items: [
      {
        q: 'What is Makhana and why is it better than traditional fried snacks?',
        a: 'Makhana (popped lotus seeds / foxnuts) is harvested naturally from wetlands in Bihar. Unlike mass-market potato chips that are deep-fried in palm oil, our makhana is 100% slow-roasted in small batches. It is naturally airy, light, gluten-free, and delivers a crackling crunch without feeling heavy or oily.',
      },
      {
        q: 'Are your flavours gluten-free?',
        a: 'Yes! All 5 of our signature flavours (Peri Peri, Chilli Cheese, Chilli Lime, Kashmiri Garlic Chilli, and Pudhina) are 100% gluten-free and slow-roasted with zero palm oil.',
      },
      {
        q: 'What oil do you use for roasting?',
        a: 'We use minimal cold-pressed vegetable oil purely to adhere the natural spices to each makhana pop. We never deep-fry and we never use palm oil.',
      },
    ],
  },
  {
    category: 'ORDERS & SHIPPING',
    items: [
      {
        q: 'How long does shipping take across India?',
        a: 'Orders are dispatched within 24 hours directly from our roasting ovens. Standard delivery takes 2 to 4 business days for metro cities, and 4 to 6 business days for the rest of India.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer 100% Free Nationwide Shipping on all orders over ₹499. For smaller orders under ₹499, standard shipping is flat ₹50.',
      },
      {
        q: 'How can I track my order once dispatched?',
        a: 'As soon as your stash is packed and dispatched, you will receive tracking updates via SMS and email with live courier delivery status.',
      },
    ],
  },
  {
    category: 'SHELF LIFE & STORAGE',
    items: [
      {
        q: 'How long do CHASKA pouches stay fresh and crunchy?',
        a: 'Unopened pouches retain maximum crunch for 9 months from the date of roasting. Once opened, seal the pouch tightly or transfer to an airtight jar to preserve peak crispiness.',
      },
      {
        q: 'What should I do if my makhana loses its crunch due to humidity?',
        a: 'If exposed to humidity after opening, toss your makhana in a dry warm pan for 60 seconds (or microwave for 15 seconds) to instantly restore that shatteringly crisp crunch!',
      },
    ],
  },
]

export default function FaqPage() {
  const [openId, setOpenId] = useState('0-0')

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <PageShell>
      <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#FAF8F5]">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF5400]/10 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest">
              GOT QUESTIONS?
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#141414] tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="font-sans text-sm text-stone-600 max-w-lg mx-auto font-normal">
              Everything you need to know about our roasted makhana, sourcing, shelf life, and shipping.
            </p>
          </div>

          {/* Accordions */}
          <div className="space-y-10">
            {FAQ_DATA.map((cat, catIdx) => (
              <div key={cat.category} className="space-y-3.5">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500 px-1">
                  // {cat.category}
                </h2>

                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => {
                    const id = `${catIdx}-${itemIdx}`
                    const isOpen = openId === id

                    return (
                      <div
                        key={item.q}
                        className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
                      >
                        <button
                          type="button"
                          onClick={() => toggleAccordion(id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                        >
                          <span className="font-display text-base font-bold text-[#141414] pr-4">
                            {item.q}
                          </span>
                          <span
                            className={`font-mono text-lg font-bold text-stone-400 transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-45 text-[#FF5400]' : ''
                            }`}
                          >
                            +
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-6 pb-6 pt-1 border-t border-stone-100">
                                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                                  {item.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#141414] text-white text-center space-y-4 shadow-md border border-stone-800">
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
              Still Have Questions?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-md mx-auto font-normal">
              Our team is always happy to chat about flavours, orders, or custom corporate gifting.
            </p>
            <div className="pt-2">
              <NavLink
                to="/contact"
                className="btn px-7 py-3.5 text-xs font-bold shadow-sm"
              >
                CONTACT US ➔
              </NavLink>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
