import { createContext, useContext, useEffect, useState } from 'react'
import { products as initialProducts } from '../data/products'
import { fetchShopifyProducts } from '../lib/shopify'

const ShopifyContext = createContext({
  products: initialProducts.map((p) => ({ ...p, variantId: p.variantId || null })),
  loading: true,
  error: null,
})

export function ShopifyProvider({ children }) {
  const [products, setProducts] = useState(
    initialProducts.map((p) => ({ ...p, variantId: p.variantId || null }))
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    fetchShopifyProducts()
      .then((shopifyItems) => {
        if (!isMounted) return

        // 1. Map existing local sachets to live Shopify variant IDs if an exact match exists
        const updatedLocalProducts = initialProducts.map((localProduct) => {
          const matchedShopify = shopifyItems.find(
            (sp) =>
              sp.flavor?.toLowerCase() === localProduct.flavor?.toLowerCase() ||
              sp.name?.toLowerCase() === localProduct.name?.toLowerCase() ||
              sp.handle?.toLowerCase() === localProduct.id?.toLowerCase()
          )

          if (matchedShopify) {
            return {
              ...localProduct,
              variantId: matchedShopify.variantId,
              shopifyId: matchedShopify.shopifyId,
              price: matchedShopify.price,
              currency: matchedShopify.currency,
              imageUrl: matchedShopify.imageUrl || localProduct.imageUrl,
            }
          }

          return {
            ...localProduct,
            variantId: null,
          }
        })

        // 2. Append any Shopify products not already matching local products (e.g. Matcha Test Product)
        const unmergedShopifyProducts = shopifyItems.filter(
          (sp) =>
            !initialProducts.some(
              (lp) =>
                lp.flavor?.toLowerCase() === sp.flavor?.toLowerCase() ||
                lp.name?.toLowerCase() === sp.name?.toLowerCase() ||
                lp.id?.toLowerCase() === sp.handle?.toLowerCase()
            )
        )

        setProducts([...updatedLocalProducts, ...unmergedShopifyProducts])
        setLoading(false)
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
