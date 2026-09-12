import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchShopifyProducts } from '../lib/shopify/api'
import { PRODUCTS_CATALOGUE } from '../data/products'

const QUICK_TAGS = [
  'Masala',
  'Peri Peri',
  'Chilly Cheese',
  'Pudhina',
  'Barbeque',
  'Variety Box',
]

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState(PRODUCTS_CATALOGUE)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const live = await fetchShopifyProducts(25)
        if (live && live.length > 0) {
          setProducts(live)
        }
      } catch {
        // Fallback to catalogue
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  const filtered = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.name?.toLowerCase().includes(q) ||
          p.flavor?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.ingredients?.toLowerCase().includes(q)
        )
      })
    : []

  const handleSelectProduct = (handle) => {
    onClose()
    navigate(`/products/${handle}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#17245B]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#F5EEDD] border border-[#17245B]/20 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="relative p-5 sm:p-6 border-b border-[#17245B]/15 bg-white flex items-center gap-3">
              <span className="text-xl text-[#17245B]/60">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flavors, ingredients, boxes (e.g. Peri Peri, Cheese)..."
                className="w-full bg-transparent font-sans text-base sm:text-lg font-medium text-[#17245B] placeholder-[#17245B]/40 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="px-2 py-1 text-xs font-mono font-bold text-[#17245B]/50 hover:text-[#17245B]"
                >
                  CLEAR
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-full border border-[#17245B]/20 flex items-center justify-center text-xs font-mono font-bold text-[#17245B] hover:bg-[#E2AE35]"
              >
                ✕
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="px-6 py-3 bg-[#FAF6ED] border-b border-[#17245B]/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[10px] font-bold text-[#17245B]/60 uppercase shrink-0">
                QUICK TAGS:
              </span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 rounded-full bg-white border border-[#17245B]/15 font-mono text-[11px] font-bold text-[#17245B] hover:border-[#E2AE35] hover:text-[#E2AE35] transition-colors shrink-0"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {query.trim() === '' ? (
                <div className="text-center py-12 space-y-2">
                  <span className="text-3xl block">🍿</span>
                  <p className="font-display font-bold text-base text-[#17245B] uppercase">
                    Discover Your Favourite Chaska
                  </p>
                  <p className="font-mono text-xs text-[#17245B]/70 max-w-sm mx-auto">
                    Type a flavor, spice level, or pack type above to jump directly to any product.
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <span className="text-3xl block">🍃</span>
                  <p className="font-display font-bold text-base text-[#17245B] uppercase">
                    No matching snacks found for "{query}"
                  </p>
                  <p className="font-mono text-xs text-[#17245B]/70">
                    Try searching for "Masala", "Pudhina", "Cheese", or "Box".
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2 text-xs font-mono text-[#17245B]/70 font-bold uppercase">
                    <span>{filtered.length} {filtered.length === 1 ? 'PRODUCT' : 'PRODUCTS'} FOUND</span>
                    <span>PRESS ESC TO CLOSE</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {filtered.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectProduct(item.handle || item.id)}
                        className="group flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#17245B]/15 hover:border-[#E2AE35] hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="h-16 w-16 rounded-xl bg-[#FAF6ED] p-1.5 overflow-hidden border border-[#17245B]/10 shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <span className="h-full w-full flex items-center justify-center text-xl">🍿</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-mono text-[9px] font-bold text-[#A9223A] uppercase tracking-wider block truncate">
                            {item.badge || item.category}
                          </span>
                          <h4 className="font-display font-bold text-sm text-[#17245B] truncate group-hover:text-[#E2AE35] transition-colors">
                            {item.name}
                          </h4>
                          <span className="font-mono text-xs font-bold text-[#17245B]">
                            {item.displayPrice || `₹${item.price}`}
                          </span>
                        </div>
                        <span className="text-xs text-[#17245B]/40 group-hover:text-[#17245B] pr-2">➔</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
