import { createContext, useContext, useEffect, useState } from 'react'
import { fetchShopifyProducts } from '../lib/shopify'

const ShopifyContext = createContext({ products: [], loading: true, error: null })

export function ShopifyProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    fetchShopifyProducts()
      .then((items) => {
        if (isMounted) {
          setProducts(items)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err)
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <ShopifyContext.Provider value={{ products, loading, error }}>
      {children}
    </ShopifyContext.Provider>
  )
}

export function useShopifyProducts() {
  return useContext(ShopifyContext)
}
