import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { photos } from '../data/photos'

const CartContext = createContext(null)

const LOCAL_CART_KEY = 'tmc.cart_items.v1'

function getPhotoForId(id) {
  const photoKey = id === 'makhana-chilly-cheese' ? 'chillyCheesePack'
    : id === 'makhana-pudhina' ? 'pudhinaPack'
    : id === 'makhana-barbeque' ? 'barbequePack'
    : id === 'makhana-peri-peri' ? 'periPeriPack'
    : id === 'makhana-black-pepper' ? 'blackPepperPack'
    : id === 'makhana-variety-box' ? 'stashBox'
    : 'yellowBasket'
  return photos[photoKey]?.src || photos.brandPoster?.src || null
}

function sanitizeCartItem(item) {
  if (!item || typeof item !== 'object') return null
  const id = String(item.id || item.productId || 'makhana-pack')
  
  // Extract clean price
  const priceNum = typeof item.price === 'number' && !isNaN(item.price)
    ? item.price
    : parseFloat(item.price)
  const price = !isNaN(priceNum) && priceNum >= 0 ? priceNum : 199

  // Extract clean quantity (numeric ONLY)
  let numQty = 1
  if (typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0) {
    numQty = Math.floor(item.quantity)
  } else if (typeof item.qty === 'number' && !isNaN(item.qty) && item.qty > 0) {
    numQty = Math.floor(item.qty)
  } else if (typeof item.quantity === 'string' || typeof item.qty === 'string') {
    const parsed = parseInt(item.quantity || item.qty, 10)
    if (!isNaN(parsed) && parsed > 0) numQty = parsed
  }

  const name = String(item.name || item.flavor || 'Makhana Pack')
  const packSize = String(item.packSize || item.size || '70g Pack')
  const image = item.image || getPhotoForId(id)

  return {
    id,
    productId: id,
    name,
    flavor: item.flavor || name,
    slug: String(item.slug || item.handle || id),
    price,
    packSize,
    size: packSize,
    image,
    quantity: numQty,
    qty: numQty,
  }
}

function getStoredCart() {
  try {
    const raw = window.localStorage.getItem(LOCAL_CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(sanitizeCartItem).filter(Boolean)
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

  // Save sanitized items to localStorage
  useEffect(() => {
    setStoredCart(items)
  }, [items])

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => {
      const q = Number(i.quantity || i.qty)
      return sum + (isNaN(q) || q <= 0 ? 1 : q)
    }, 0)

    const subtotal = items.reduce((sum, i) => {
      const p = Number(i.price) || 0
      const q = Number(i.quantity || i.qty) || 1
      return sum + (isNaN(p) || isNaN(q) ? 0 : p * q)
    }, 0)

    const addItem = (product, quantity = 1) => {
      if (!product || (!product.id && !product.name)) return

      // Enforce numeric quantity ONLY
      let addQty = 1
      if (typeof quantity === 'number' && !isNaN(quantity) && quantity > 0) {
        addQty = Math.floor(quantity)
      }

      const cleanItem = sanitizeCartItem({
        ...product,
        quantity: addQty,
        qty: addQty,
      })

      if (!cleanItem) return

      setItems((prev) => {
        const existingIdx = prev.findIndex((i) => i.id === cleanItem.id)
        if (existingIdx >= 0) {
          const next = [...prev]
          const curQty = Number(next[existingIdx].quantity || next[existingIdx].qty) || 1
          const newQty = curQty + addQty
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: newQty,
            qty: newQty,
          }
          return next
        } else {
          return [...prev, cleanItem]
        }
      })

      setLastAddedId(cleanItem.id)
      window.setTimeout(() => setLastAddedId(null), 1500)
    }

    const setQty = (id, quantity) => {
      const targetId = String(id)
      const numQty = typeof quantity === 'number' && !isNaN(quantity) ? Math.floor(quantity) : parseInt(quantity, 10)
      
      setItems((prev) => {
        if (isNaN(numQty) || numQty <= 0) {
          return prev.filter((i) => i.id !== targetId)
        }
        return prev.map((i) => (i.id === targetId ? { ...i, quantity: numQty, qty: numQty } : i))
      })
    }

    const increment = (id) => {
      const targetId = String(id)
      setItems((prev) =>
        prev.map((i) => {
          if (i.id === targetId) {
            const cur = Number(i.quantity || i.qty) || 1
            return { ...i, quantity: cur + 1, qty: cur + 1 }
          }
          return i
        })
      )
    }

    const decrement = (id) => {
      const targetId = String(id)
      setItems((prev) =>
        prev
          .map((i) => {
            if (i.id === targetId) {
              const cur = Number(i.quantity || i.qty) || 1
              const next = cur - 1
              return { ...i, quantity: next, qty: next }
            }
            return i
          })
          .filter((i) => (Number(i.quantity || i.qty) || 0) > 0)
      )
    }

    const removeItem = (id) => {
      const targetId = String(id)
      setItems((prev) => prev.filter((i) => i.id !== targetId))
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
