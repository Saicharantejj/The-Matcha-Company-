import { createContext, useContext, useEffect, useState } from 'react'
import { products as initialProducts } from '../data/products'
import { fetchShopifyProducts } from '../lib/shopify'

const ShopifyContext = createContext({
  products: initialProducts.map((p) => ({ ...p, variantId: p.variantId || null })),
  testProduct: null,
  loading: true,
  error: null,
})

function normalizeStr(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

function isMatch(localProduct, sp) {
  const spNorm = normalizeStr(sp.name || sp.title)
  const spHandleNorm = normalizeStr(sp.handle)
  const localNorm = normalizeStr(localProduct.name)
  const localHandleNorm = normalizeStr(localProduct.handle)
  const localIdNorm = normalizeStr(localProduct.id)

  if (spHandleNorm && (spHandleNorm === localHandleNorm || spHandleNorm === localIdNorm)) {
    return true
  }
  if (spNorm === localNorm) {
    return true
  }
  if (localNorm.includes('gift') && spNorm.includes('gift')) {
    if (
      (localNorm.includes('basic') || localNorm.includes('essential')) &&
      (spNorm.includes('basic') || spNorm.includes('essential'))
    ) {
      return true
    }
    if (localNorm.includes('premium') && spNorm.includes('premium')) {
      return true
    }
  }
  if (localNorm.includes('kit') && spNorm.includes('kit')) {
    if (localNorm.includes('basic') && spNorm.includes('basic')) return true
    if (localNorm.includes('premium') && spNorm.includes('premium')) return true
  }
  if (localNorm.includes('pack') && spNorm.includes('pack')) {
    if (localNorm.includes('5') && spNorm.includes('5')) return true
    if (localNorm.includes('10') && spNorm.includes('10')) return true
    if (localNorm.includes('20') && spNorm.includes('20')) return true
  }
  return false
}

export function ShopifyProvider({ children }) {
  const [products, setProducts] = useState(
    initialProducts.map((p) => ({ ...p, variantId: p.variantId || null }))
  )
  const [testProduct, setTestProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    fetchShopifyProducts()
      .then((shopifyItems) => {
        if (!isMounted) return

        // 1. Identify Matcha Test Product for dev/testing
        const testProd = shopifyItems.find(
          (sp) =>
            sp.handle === 'matcha-test-product' ||
            sp.name?.toLowerCase().includes('matcha test product') ||
            sp.name?.toLowerCase().includes('test product')
        )
        if (testProd) {
          setTestProduct(testProd)
        }

        // 2. Map local products to live Shopify products dynamically
        const updatedLocalProducts = initialProducts.map((localProduct) => {
          const matchedShopify = shopifyItems.find((sp) => isMatch(localProduct, sp))

          if (matchedShopify) {
            const parsedPrice = matchedShopify.price ? parseFloat(matchedShopify.price) : NaN
            return {
              ...localProduct,
              variantId: matchedShopify.variantId || localProduct.variantId,
              shopifyId: matchedShopify.shopifyId,
              price: Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : localProduct.price,
              currency: matchedShopify.currency || 'INR',
              imageUrl: matchedShopify.imageUrl || localProduct.imageUrl,
            }
          }

          return {
            ...localProduct,
            variantId: localProduct.variantId || null,
          }
        })

        // Ensure ONLY customer facing products are in the products catalogue state (hide test product)
        setProducts(updatedLocalProducts)
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
    <ShopifyContext.Provider value={{ products, testProduct, loading, error }}>
      {children}
    </ShopifyContext.Provider>
  )
}

export function useShopifyProducts() {
  return useContext(ShopifyContext)
}
