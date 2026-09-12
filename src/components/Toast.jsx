import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'

const ToastContext = createContext(null)

let nextId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (message, { action, onAction } = {}) => {
      const id = ++nextId
      setToasts((prev) => [...prev.slice(-2), { id, message, action, onAction }])
      window.setTimeout(() => dismiss(id), 3200)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Bottom-left so it never collides with the cart drawer on the right. */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 left-5 z-[90] flex flex-col gap-2"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: -28, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="pointer-events-auto flex items-center gap-3 border-2 border-[#17245B] bg-[#F5EEDD] px-4 py-3 rounded-2xl shadow-lg"
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E2AE35] text-[#17245B]">
                <Check size={12} strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#17245B] font-bold">
                {t.message}
              </span>
              {t.action && (
                <button
                  type="button"
                  onClick={() => {
                    t.onAction?.()
                    dismiss(t.id)
                  }}
                  className="flex items-center gap-1 border-l-2 border-[#17245B]/20 pl-3 font-mono text-[10px] uppercase tracking-widest text-[#17245B] underline underline-offset-4 hover:text-[#E2AE35]"
                >
                  <ShoppingBag size={11} strokeWidth={2.5} aria-hidden="true" />
                  {t.action}
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  // Falling back to a no-op keeps a component usable outside the provider
  // (e.g. in isolation) instead of throwing.
  return ctx ?? { notify: () => {} }
}
