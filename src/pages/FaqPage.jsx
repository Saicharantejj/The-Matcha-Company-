import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#F5EEDD]">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#17245B] text-[#E2AE35] font-mono text-xs font-black uppercase tracking-widest border border-[#E2AE35]/40 shadow-xs">
            GOT QUESTIONS?
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="font-sans text-sm text-[#17245B]/80 max-w-lg mx-auto">
            Everything you need to know about our roasted makhana, sourcing, shelf life, and shipping.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-10">
          {FAQ_DATA.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-3.5">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#17245B]/70 px-1">
                // {cat.category}
              </h2>

              <div className="space-y-2.5">
                {cat.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`
                  const isOpen = openId === id

                  return (
                    <div
                      key={item.q}
                      className="bg-[#FAF6ED] border border-[#17245B]/15 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(id)}
                        className="w-full px-5 py-4.5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-display text-base font-bold text-[#17245B] pr-4">
                          {item.q}
                        </span>
                        <span
                          className={`font-mono text-base font-bold text-[#17245B] transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-45 text-[#E2AE35]' : ''
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
                            <div className="px-5 pb-5 pt-1 border-t border-[#17245B]/10">
                              <p className="font-sans text-xs sm:text-sm text-[#17245B]/80 leading-relaxed font-normal">
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
        <div className="p-8 rounded-3xl bg-[#17245B] text-[#F5EEDD] text-center space-y-3 shadow-md border border-[#E2AE35]/20">
          <h3 className="font-display text-2xl font-bold uppercase text-[#F5EEDD]">
            Still Have Questions?
          </h3>
          <p className="font-sans text-xs text-[#F5EEDD]/80 max-w-md mx-auto">
            Our team is always happy to chat about flavours, orders, or custom corporate gifting.
          </p>
          <div className="pt-2">
            <NavLink
              to="/contact"
              className="btn px-7 py-3 text-xs font-bold shadow-xs bg-[#E2AE35] text-[#17245B] hover:bg-white"
            >
              CONTACT US ➔
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  )
}
