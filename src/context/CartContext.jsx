import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const LOCAL_CART_KEY = 'tmc.cart_items.v1'

function getStoredCart() {
  try {
    const raw = window.localStorage.getItem(LOCAL_CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function setStoredCart(items) {
  try {
    window.localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items))
  } catch {
    /* storage unavailable */
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => getStoredCart())
  const [isOpen, setIsOpen] = useState(false)
  const [lastAddedId, setLastAddedId] = useState(null)

  // Save to localStorage whenever items change
  useEffect(() => {
    setStoredCart(items)
  }, [items])

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + (i.qty || 1), 0)
    const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.price) || 0) * (i.qty || 1), 0)

    const addItem = (product, quantity = 1) => {
      if (!product || !product.id) return
      setItems((prev) => {
        const existingIdx = prev.findIndex((i) => i.id === product.id)
        if (existingIdx >= 0) {
          const next = [...prev]
          next[existingIdx] = {
            ...next[existingIdx],
            qty: next[existingIdx].qty + quantity,
          }
          return next
        } else {
          return [
            ...prev,
            {
              id: product.id,
              name: product.name || product.flavor,
              flavor: product.flavor || product.name,
              size: product.size || '70g Pack',
              price: product.price || 199,
              currency: 'INR',
              swatch: product.swatch || 'chili',
              handle: product.handle || product.id,
              qty: quantity,
            },
          ]
        }
      })
      setLastAddedId(product.id)
      window.setTimeout(() => setLastAddedId(null), 1500)
    }

    const setQty = (id, quantity) => {
      setItems((prev) => {
        if (quantity <= 0) {
          return prev.filter((i) => i.id !== id)
        }
        return prev.map((i) => (i.id === id ? { ...i, qty: quantity } : i))
      })
    }

    const increment = (id) => {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))
    }

    const decrement = (id) => {
      setItems((prev) =>
        prev
          .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0)
      )
    }

    const removeItem = (id) => {
      setItems((prev) => prev.filter((i) => i.id !== id))
    }

    const clearCart = () => {
      setItems([])
    }

    return {
      lines: items,
      count,
      subtotal,
      isOpen,
      lastAddedId,
      addItem,
      setQty,
      increment,
      decrement,
      removeItem,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [items, isOpen, lastAddedId])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}
