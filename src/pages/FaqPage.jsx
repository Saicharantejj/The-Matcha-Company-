import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_DATA = [
  {
    category: 'PRODUCTS & FLAVORS',
    items: [
      {
        q: 'What is Makhana and why is it better than traditional chips?',
        a: 'Makhana (popped lotus seeds / foxnuts) is an ancient Indian superfood harvested naturally from wetlands. Unlike mass-market potato chips that are deep-fried in palm oil, our makhana is 100% slow-roasted in small batches. It contains 0% trans-fats, is naturally rich in plant protein, and delivers a crunch that never feels heavy.',
      },
      {
        q: 'Are your snacks gluten-free and vegan?',
        a: 'All our classic, spice, and herb flavors (Pink Salt & Pepper, Peri Peri Fiesta, Pudina & Lime) are 100% gluten-free and plant-based vegan. Our Smoky Cheddar contains dairy cheese solids, and Jaggery Sesame contains pure desi ghee.',
      },
      {
        q: 'Do you use palm oil or artificial preservatives?',
        a: 'Never! We roast exclusively using cold-pressed olive or sunflower oil in minimal quantities to help seasonings stick. We use zero artificial preservatives, zero MSG, and zero palm oil.',
      },
    ],
  },
  {
    category: 'ORDERS & SHIPPING',
    items: [
      {
        q: 'How long does shipping take across India?',
        a: 'Orders are dispatched within 24 hours from our roasting facility. Standard delivery takes 2 to 4 business days for metro cities, and 4 to 6 business days for the rest of India.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer 100% Free Pan-India Shipping on all orders over ₹499. For orders under ₹499, a flat delivery fee of ₹49 applies.',
      },
      {
        q: 'How can I track my package once dispatched?',
        a: 'As soon as your stash box is dispatched, you will receive an SMS and WhatsApp notification with your live courier tracking link.',
      },
    ],
  },
  {
    category: 'SHELF LIFE & STORAGE',
    items: [
      {
        q: 'How long does a pouch stay fresh and crunchy?',
        a: 'Unopened pouches retain maximum crunch for 9 months from the date of roasting. Once opened, seal the ziplock pouch tightly or transfer to an airtight jar to preserve peak crunchiness.',
      },
      {
        q: 'What should I do if my makhana loses its crunch?',
        a: 'If exposed to humidity after opening, pop your makhana in a dry pan over low heat for 60 seconds (or microwave for 15 seconds) to instantly restore maximum crispiness!',
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
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F5EEDD]">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E2AE35] text-[#17245B] font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
            GOT QUESTIONS?
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#17245B] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="font-mono text-sm text-[#17245B]/80 max-w-xl mx-auto">
            Everything you need to know about our roasted makhana, sourcing, shipping, and stash building.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-10">
          {FAQ_DATA.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35] px-2">
                // {cat.category}
              </h2>

              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`
                  const isOpen = openId === id

                  return (
                    <div
                      key={item.q}
                      className="bg-white/90 border border-[#17245B]/15 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-display text-lg font-bold text-[#17245B] pr-4">
                          {item.q}
                        </span>
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#F5EEDD] text-[#17245B] font-mono text-base font-bold transition-transform duration-300 ${isOpen ? 'rotate-45 bg-[#E2AE35] text-[#17245B]' : ''}`}>
                          +
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 border-t border-[#17245B]/10 text-sm font-sans text-[#17245B]/85 leading-relaxed">
                              {item.a}
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

        {/* CTA Footer (Midnight Indigo) */}
        <div className="p-8 rounded-3xl bg-[#17245B] text-[#F5EEDD] text-center space-y-4 shadow-lg border border-[#17245B]">
          <h3 className="font-display text-2xl font-bold uppercase text-[#F5EEDD]">
            STILL HAVE A QUESTION?
          </h3>
          <p className="font-mono text-xs text-[#F5EEDD]/80 max-w-md mx-auto">
            Our snack team is online 7 days a week to help with your orders or custom stash inquiries.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <NavLink to="/contact" className="btn bg-[#E2AE35] text-[#17245B] hover:bg-white">
              CONTACT US
            </NavLink>
            <NavLink to="/shop" className="btn-outline border-[#F5EEDD]/40 text-[#F5EEDD] hover:bg-[#F5EEDD] hover:text-[#17245B]">
              EXPLORE SHOP
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  )
}
