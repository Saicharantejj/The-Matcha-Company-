import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'tmc.cart.v1'

// localStorage can be absent, blocked, or throw outright (private windows,
// embedded previews, browsers set to block site data). Every read and write is
// guarded so the cart silently falls back to in-memory state instead of
// breaking the page.
function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((line) => line && line.id && typeof line.qty === 'number')
  } catch {
    return []
  }
}

function writeStoredCart(lines) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    /* storage unavailable — cart still works for this session */
  }
}

export function CartProvider({ children }) {
  // Lines are { id, name, kind, flavor, size, swatch, qty }
  const [lines, setLines] = useState(readStoredCart)
  const [isOpen, setIsOpen] = useState(false)
  // Bumps every time something is added, so the header badge can react.
  const [lastAddedId, setLastAddedId] = useState(null)

  useEffect(() => {
    writeStoredCart(lines)
  }, [lines])

  const value = useMemo(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0)

    const addItem = (item, kind = 'sachet') => {
      if (!item?.id) return
      setLines((prev) => {
        const existing = prev.find((line) => line.id === item.id)
        if (existing) {
          return prev.map((line) =>
            line.id === item.id ? { ...line, qty: line.qty + 1 } : line,
          )
        }
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            kind,
            flavor: item.flavor ?? null,
            size: item.size ?? null,
            swatch: item.swatch ?? 'matcha',
            qty: 1,
          },
        ]
      })
      setLastAddedId(item.id)
      window.setTimeout(() => setLastAddedId(null), 1500)
    }

    const setQty = (id, qty) => {
      setLines((prev) =>
        qty <= 0
          ? prev.filter((line) => line.id !== id)
          : prev.map((line) => (line.id === id ? { ...line, qty } : line)),
      )
    }

    return {
      lines,
      count,
      isOpen,
      lastAddedId,
      addItem,
      setQty,
      increment: (id) => setQty(id, (lines.find((l) => l.id === id)?.qty ?? 0) + 1),
      decrement: (id) => setQty(id, (lines.find((l) => l.id === id)?.qty ?? 0) - 1),
      removeItem: (id) => setLines((prev) => prev.filter((line) => line.id !== id)),
      clearCart: () => setLines([]),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [lines, isOpen, lastAddedId])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}
