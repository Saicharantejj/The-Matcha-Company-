import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShoppingBag, AlertCircle } from 'lucide-react'

const ToastContext = createContext(null)

let nextId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (message, options = {}) => {
      const id = ++nextId
      const action = options?.action
      const onAction = options?.onAction
      const type = typeof options === 'string' ? options : (options?.type || 'success')

      setToasts((prev) => [...prev.slice(-2), { id, message, action, onAction, type }])
      window.setTimeout(() => dismiss(id), 3000)
    },
    [dismiss],
  )

  // Provide addToast as an alias for notify(message, type)
  const addToast = useCallback(
    (message, type = 'success') => {
      notify(message, { type })
    },
    [notify],
  )

  const value = useMemo(() => ({ notify, addToast }), [notify, addToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Bottom-left notification stage */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 left-5 z-[90] flex flex-col gap-2"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: -24, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="pointer-events-auto flex items-center gap-3 border border-black/10 bg-white px-4 py-3 rounded-2xl shadow-float"
            >
              <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                t.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#FF5400] text-white'
              }`}>
                {t.type === 'error' ? (
                  <AlertCircle size={13} strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  <Check size={13} strokeWidth={3} aria-hidden="true" />
                )}
              </span>
              <span className="font-sans text-xs font-semibold text-[#141414]">
                {t.message}
              </span>
              {t.action && (
                <button
                  type="button"
                  onClick={() => {
                    t.onAction?.()
                    dismiss(t.id)
                  }}
                  className="flex items-center gap-1 border-l border-black/10 pl-3 font-sans text-xs font-bold text-[#FF5400] hover:underline"
                >
                  <ShoppingBag size={12} strokeWidth={2.5} aria-hidden="true" />
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
  return ctx ?? { notify: () => {}, addToast: () => {} }
}
