import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { trackAddToCart } from '../lib/metaPixel'
import {
  createShopifyCart,
  getShopifyCart,
  addShopifyCartLines,
  updateShopifyCartLines,
  removeShopifyCartLines,
} from '../lib/shopify'

const CartContext = createContext(null)

const CART_ID_KEY = 'tmc.shopify_cart_id.v1'

function getStoredCartId() {
  try {
    return window.localStorage.getItem(CART_ID_KEY) || null
  } catch {
    return null
  }
}

function setStoredCartId(cartId) {
  try {
    if (cartId) {
      window.localStorage.setItem(CART_ID_KEY, cartId)
    } else {
      window.localStorage.removeItem(CART_ID_KEY)
    }
  } catch {
    /* storage unavailable */
  }
}

export function CartProvider({ children }) {
  const [cartState, setCartState] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [lastAddedId, setLastAddedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // On mount, restore existing cart from Shopify if cart ID exists in localStorage
  useEffect(() => {
    let isMounted = true
    const storedId = getStoredCartId()
    if (!storedId) {
      setLoading(false)
      return
    }

    getShopifyCart(storedId)
      .then((cart) => {
        if (!isMounted) return
        if (cart) {
          setCartState(cart)
        } else {
          setStoredCartId(null)
        }
        setLoading(false)
      })
      .catch(() => {
        if (!isMounted) return
        setStoredCartId(null)
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(() => {
    const lines = cartState?.lines || []
    const count = cartState?.totalQuantity || 0
    const cartCost = cartState?.cost || null

    const handleCartUpdate = (newCart) => {
      if (newCart) {
        setCartState(newCart)
        setStoredCartId(newCart.id)
        setError(null)
      }
    }

    const addItem = async (item, kind = 'sachet') => {
      const variantId =
        item?.variantId ||
        (typeof item?.id === 'string' && item.id.startsWith('gid://shopify/ProductVariant/')
          ? item.id
          : null)

      if (!variantId) {
        const itemName = item?.name || item?.flavor || 'This item'
        console.warn(`Cannot add "${itemName}" to Shopify cart: no Shopify variant ID mapped.`)
        setError(`"${itemName}" does not have a Shopify variant assigned yet.`)
        return
      }

      setLoading(true)
      setError(null)

      try {
        let updatedCart = null
        const currentCartId = cartState?.id || getStoredCartId()

        if (!currentCartId) {
          updatedCart = await createShopifyCart(variantId, 1)
        } else {
          try {
            updatedCart = await addShopifyCartLines(currentCartId, variantId, 1)
          } catch (err) {
            // If existing cart ID expired or invalid, fall back to creating new cart
            updatedCart = await createShopifyCart(variantId, 1)
          }
        }

        handleCartUpdate(updatedCart)
        trackAddToCart(item)

        const addedLine = updatedCart.lines.find((l) => l.variantId === variantId)
        if (addedLine) {
          setLastAddedId(addedLine.id)
          window.setTimeout(() => setLastAddedId(null), 1500)
        }
      } catch (err) {
        console.error('Shopify Cart addItem error:', err)
        setError(err.message || 'Could not add product to cart.')
      } finally {
        setLoading(false)
      }
    }

    const setQty = async (lineId, qty) => {
      if (!cartState?.id || !lineId) return
      setLoading(true)
      setError(null)
      try {
        let updatedCart
        if (qty <= 0) {
          updatedCart = await removeShopifyCartLines(cartState.id, lineId)
        } else {
          updatedCart = await updateShopifyCartLines(cartState.id, lineId, qty)
        }
        handleCartUpdate(updatedCart)
      } catch (err) {
        console.error('Shopify Cart update error:', err)
        setError(err.message || 'Could not update quantity.')
      } finally {
        setLoading(false)
      }
    }

    const increment = (lineId) => {
      const line = lines.find((l) => l.id === lineId)
      if (line) {
        setQty(lineId, line.qty + 1)
      }
    }

    const decrement = (lineId) => {
      const line = lines.find((l) => l.id === lineId)
      if (line) {
        setQty(lineId, line.qty - 1)
      }
    }

    const removeItem = (lineId) => {
      setQty(lineId, 0)
    }

    const clearCart = async () => {
      setCartState(null)
      setStoredCartId(null)
      setError(null)
    }

    return {
      lines,
      count,
      cartCost,
      checkoutUrl: cartState?.checkoutUrl || null,
      isOpen,
      lastAddedId,
      loading,
      error,
      addItem,
      setQty,
      increment,
      decrement,
      removeItem,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [cartState, isOpen, lastAddedId, loading, error])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}
