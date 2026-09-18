import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchShopifyProducts } from '../lib/shopify/api'

const QUICK_TAGS = [
  'Peri Peri',
  'Chilli Cheese',
  'Chilli Lime',
  'Kashmiri Garlic',
  'Pudhina',
  'Try All 5',
]

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const live = await fetchShopifyProducts(25)
        if (live && Array.isArray(live)) {
          setProducts(live)
        } else {
          setProducts([])
        }
      } catch {
        setProducts([])
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
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F5] border border-black/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="relative p-4 sm:p-5 border-b border-black/5 bg-white flex items-center gap-3">
              <span className="text-base text-[#141414]/40">🔍</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search flavours, packs, or starter boxes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-sans text-sm sm:text-base text-[#141414] placeholder-[#141414]/40 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="font-mono text-xs text-[#141414]/50 hover:text-[#141414] p-1"
                >
                  ✕
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#FAF8F5] text-[10px] font-mono text-[#141414]/60 border border-black/10">
                ESC
              </kbd>
            </div>

            {/* Quick Filter Tags */}
            {!query.trim() && (
              <div className="p-5 sm:p-6 space-y-3">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#141414]/50">
                  POPULAR SEARCHES
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 font-sans text-xs font-semibold text-[#141414] hover:border-[#FF5400] hover:text-[#FF5400] transition-all shadow-2xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Results */}
            {query.trim() && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-2">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <span className="text-3xl block">🍿</span>
                    <p className="font-display text-base font-bold text-[#141414] uppercase">
                      No matching snacks found
                    </p>
                    <p className="font-sans text-xs text-[#141414]/60">
                      Try searching for "Peri Peri", "Chilli Cheese", or "Try All 5".
                    </p>
                  </div>
                ) : (
                  filtered.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectProduct(item.handle)}
                      className="w-full p-3 rounded-2xl bg-white border border-black/5 hover:border-[#FF5400]/40 hover:shadow-2xs transition-all flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-12 rounded-xl bg-[#FAF8F5] border border-black/5 p-1 flex items-center justify-center shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-lg" />
                          ) : (
                            <span className="text-lg">🍿</span>
                          )}
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold text-[#141414] group-hover:text-[#FF5400] transition-colors">
                            {item.name}
                          </p>
                          <p className="font-sans text-[11px] text-[#141414]/50 font-medium">
                            {item.size || '50g & 100g Packs'} • ₹{Math.round(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="font-sans text-xs text-[#141414]/40 group-hover:text-[#FF5400] group-hover:translate-x-1 transition-all">
                        ➔
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
