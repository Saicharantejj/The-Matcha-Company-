import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { photos } from '../data/photos'
import { trackAddToCart } from '../lib/metaPixel'
import {
  createShopifyCart,
  getShopifyCart,
  addShopifyCartLines,
  updateShopifyCartLines,
  removeShopifyCartLines,
} from '../lib/shopify/api'

const CartContext = createContext(null)

const SHOPIFY_CART_ID_KEY = 'chaska.shopify_cart_id'
const LOCAL_CART_ITEMS_KEY = 'chaska.cart_items.v2'

function getPhotoForId(id) {
  const photoKey = id?.includes('cheese') ? 'cheeseAndHerbsMakhanaPack'
    : id?.includes('jalapeno') ? 'jalapenoMakhanaPack'
    : 'meshBagIngredients'
  return photos[photoKey]?.src || photos.meshBagIngredients?.src || null
}

function sanitizeCartItem(item) {
  if (!item || typeof item !== 'object') return null
  const id = String(item.id || item.productId || 'makhana-pack')
  
  const priceNum = typeof item.price === 'number' && !isNaN(item.price)
    ? item.price
    : parseFloat(item.price)
  const price = !isNaN(priceNum) && priceNum >= 0 ? Math.ceil(priceNum) : 129

  let numQty = 1
  if (typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0) {
    numQty = Math.floor(item.quantity)
  } else if (typeof item.qty === 'number' && !isNaN(item.qty) && item.qty > 0) {
    numQty = Math.floor(item.qty)
  }

  const name = String(item.name || item.flavor || 'CHASKA Makhana Pack')
  const packSize = String(item.packSize || item.size || '30g Pack')
  const image = item.image || getPhotoForId(id)

  return {
    id,
    lineId: item.lineId || id,
    variantId: item.variantId || id,
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
    attributes: item.attributes || [],
    recipient: item.recipient || undefined,
    giftNote: item.giftNote || undefined,
    boxTheme: item.boxTheme || undefined,
    breakdown: item.breakdown || undefined,
  }
}

function isMatchaItem(item) {
  if (!item) return false
  const str = `${item.id || ''} ${item.name || ''} ${item.flavor || ''} ${item.slug || ''} ${item.handle || ''}`.toLowerCase()
  return str.includes('matcha')
}

function getStoredLocalCart() {
  try {
    const raw = window.localStorage.getItem(LOCAL_CART_ITEMS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(sanitizeCartItem).filter(item => item && !isMatchaItem(item))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [shopifyCartId, setShopifyCartId] = useState(() => {
    try {
      return window.localStorage.getItem(SHOPIFY_CART_ID_KEY) || null
    } catch {
      return null
    }
  })

  const [items, setItems] = useState(() => getStoredLocalCart())
  const [subtotalState, setSubtotalState] = useState(0)
  const [countState, setCountState] = useState(0)
  const [checkoutUrl, setCheckoutUrl] = useState(null)

  const [isOpen, setIsOpen] = useState(false)
  const [lastAddedId, setLastAddedId] = useState(null)
  const [isSyncing, setIsSyncing] = useState(false)

  // Sync state to local storage backup
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_CART_ITEMS_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  // Initialize Shopify Cart from stored ID on app startup & handle post-purchase clearcart return
  useEffect(() => {
    // Check if returning from completed checkout with clearcart signal
    if (typeof window !== 'undefined' && window.location.search.includes('clearcart=true')) {
      try {
        window.localStorage.removeItem(SHOPIFY_CART_ID_KEY)
        window.localStorage.removeItem(LOCAL_CART_ITEMS_KEY)
      } catch {}
      setShopifyCartId(null)
      setCheckoutUrl(null)
      setItems([])
      setSubtotalState(0)
      setCountState(0)
      try {
        const url = new URL(window.location.href)
        url.searchParams.delete('clearcart')
        window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''))
      } catch {}
      return
    }

    async function syncShopifyCart() {
      const storedId = window.localStorage.getItem(SHOPIFY_CART_ID_KEY)
      if (!storedId) return

      setIsSyncing(true)
      try {
        const shopifyCart = await getShopifyCart(storedId)
        if (shopifyCart && shopifyCart.id) {
          const hasMatcha = (shopifyCart.lines || []).some(isMatchaItem)
          if (hasMatcha) {
            window.localStorage.removeItem(SHOPIFY_CART_ID_KEY)
            window.localStorage.removeItem(LOCAL_CART_ITEMS_KEY)
            setShopifyCartId(null)
            setCheckoutUrl(null)
            setItems([])
            setSubtotalState(0)
            setCountState(0)
          } else {
            setShopifyCartId(shopifyCart.id)
            setCheckoutUrl(shopifyCart.checkoutUrl)
            setItems(shopifyCart.lines.map(sanitizeCartItem).filter(item => item && !isMatchaItem(item)))
            setSubtotalState(shopifyCart.subtotal)
            setCountState(shopifyCart.totalQuantity)
          }
        } else {
          // Cart completed or expired in Shopify; clean up stale local storage
          window.localStorage.removeItem(SHOPIFY_CART_ID_KEY)
          window.localStorage.removeItem(LOCAL_CART_ITEMS_KEY)
          setShopifyCartId(null)
          setCheckoutUrl(null)
          setItems([])
          setSubtotalState(0)
          setCountState(0)
        }
      } catch (err) {
        // Fallback to local state if offline or tokenless query restricted
      } finally {
        setIsSyncing(false)
      }
    }

    syncShopifyCart()
  }, [])

  const value = useMemo(() => {
    const calculatedCount = items.reduce((sum, i) => {
      const q = Number(i.quantity || i.qty) || 1
      return sum + q
    }, 0)

    const calculatedSubtotal = Math.ceil(items.reduce((sum, i) => {
      const p = Math.ceil(Number(i.price) || 0)
      const q = Number(i.quantity || i.qty) || 1
      return sum + p * q
    }, 0))

    const count = countState > 0 ? countState : calculatedCount
    const subtotal = Math.ceil(subtotalState > 0 ? subtotalState : calculatedSubtotal)

    // ── ADD ITEM ─────────────────────────────────────────────────────────────
    const addItem = async (product, quantity = 1) => {
      if (!product || (!product.id && !product.name)) return
      if (product.availableForSale === false) return

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

      // Optimistic local update
      setItems((prev) => {
        const existingIdx = prev.findIndex((i) => i.id === cleanItem.id || i.variantId === cleanItem.variantId)
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

      // Remote Shopify Storefront Cart Sync
      try {
        let updatedCart = null
        const targetVariantId = product.variantId || product.shopifyId || product.id

        const linePayload = {
          variantId: targetVariantId,
          quantity: addQty,
          ...(cleanItem.attributes && cleanItem.attributes.length > 0 ? { attributes: cleanItem.attributes } : {}),
        }

        if (shopifyCartId) {
          updatedCart = await addShopifyCartLines(shopifyCartId, [linePayload])
        } else {
          updatedCart = await createShopifyCart([linePayload])
        }

        if (updatedCart && updatedCart.id) {
          setShopifyCartId(updatedCart.id)
          try {
            window.localStorage.setItem(SHOPIFY_CART_ID_KEY, updatedCart.id)
          } catch {}
          setCheckoutUrl(updatedCart.checkoutUrl)
          if (updatedCart.lines.length > 0) {
            setItems(updatedCart.lines.map(sanitizeCartItem).filter(Boolean))
          }
          setSubtotalState(updatedCart.subtotal)
          setCountState(updatedCart.totalQuantity)

          // AddToCart fires ONLY after a successful Shopify cart mutation
          trackAddToCart(cleanItem, addQty)
        }
      } catch (err) {
        console.warn('[Shopify Cart Add Error]', err.message || err)
      }
    }

    // ── SET QUANTITY ─────────────────────────────────────────────────────────
    const setQty = async (id, quantity) => {
      const targetId = String(id)
      const numQty = typeof quantity === 'number' && !isNaN(quantity) ? Math.floor(quantity) : parseInt(quantity, 10)

      if (isNaN(numQty) || numQty <= 0) {
        return removeItem(targetId)
      }

      setItems((prev) => prev.map((i) => (i.id === targetId || i.lineId === targetId ? { ...i, quantity: numQty, qty: numQty } : i)))

      const targetItem = items.find((i) => i.id === targetId || i.lineId === targetId)
      if (shopifyCartId && targetItem?.lineId) {
        try {
          const updatedCart = await updateShopifyCartLines(shopifyCartId, [{ lineId: targetItem.lineId, quantity: numQty }])
          if (updatedCart) {
            setItems(updatedCart.lines.map(sanitizeCartItem).filter(Boolean))
            setSubtotalState(updatedCart.subtotal)
            setCountState(updatedCart.totalQuantity)
          }
        } catch {}
      }
    }

    // ── INCREMENT ────────────────────────────────────────────────────────────
    const increment = (id) => {
      const targetItem = items.find((i) => i.id === String(id) || i.lineId === String(id))
      const curQty = Number(targetItem?.quantity || targetItem?.qty) || 1
      setQty(id, curQty + 1)
    }

    // ── DECREMENT ────────────────────────────────────────────────────────────
    const decrement = (id) => {
      const targetItem = items.find((i) => i.id === String(id) || i.lineId === String(id))
      const curQty = Number(targetItem?.quantity || targetItem?.qty) || 1
      setQty(id, curQty - 1)
    }

    // ── REMOVE ITEM ──────────────────────────────────────────────────────────
    const removeItem = async (id) => {
      const targetId = String(id)
      const targetItem = items.find((i) => i.id === targetId || i.lineId === targetId)

      setItems((prev) => prev.filter((i) => i.id !== targetId && i.lineId !== targetId))

      if (shopifyCartId && targetItem?.lineId) {
        try {
          const updatedCart = await removeShopifyCartLines(shopifyCartId, [targetItem.lineId])
          if (updatedCart) {
            setItems(updatedCart.lines.map(sanitizeCartItem).filter(Boolean))
            setSubtotalState(updatedCart.subtotal)
            setCountState(updatedCart.totalQuantity)
          }
        } catch {}
      }
    }

    // ── CLEAR CART ───────────────────────────────────────────────────────────
    const clearCart = () => {
      setItems([])
      setSubtotalState(0)
      setCountState(0)
      setShopifyCartId(null)
      try {
        window.localStorage.removeItem(SHOPIFY_CART_ID_KEY)
        window.localStorage.removeItem(LOCAL_CART_ITEMS_KEY)
      } catch {}
    }

    return {
      lines: items,
      count,
      subtotal,
      checkoutUrl,
      shopifyCartId,
      isOpen,
      lastAddedId,
      isSyncing,
      addItem,
      setQty,
      increment,
      decrement,
      removeItem,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [items, countState, subtotalState, checkoutUrl, shopifyCartId, isOpen, lastAddedId, isSyncing])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}
