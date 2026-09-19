/**
 * High-level Shopify Storefront API Service & Data Mappers for CHASKA
 */

import { shopifyFetch } from './client'
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_CART_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_HANDLE_QUERY,
} from './queries'
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from './mutations'
import { PRODUCTS_CATALOGUE } from '../../data/products'

/**
 * Maps a raw Shopify GraphQL Product Node into the CHASKA product model
 */
export function mapShopifyProduct(node) {
  if (!node) return null

  const imageEdges = node.images?.edges || []
  const images = imageEdges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText || node.title,
  }))

  const variantEdges = node.variants?.edges || []
  const variants = variantEdges.map((e) => {
    const v = e.node
    return {
      id: v.id,
      title: v.title,
      sku: v.sku || '',
      availableForSale: Boolean(v.availableForSale),
      price: parseFloat(v.price?.amount || '0'),
      mrp: parseFloat(v.compareAtPrice?.amount || v.price?.amount || '0'),
      currency: v.price?.currencyCode || 'INR',
      selectedOptions: v.selectedOptions || [],
    }
  })

  const primaryVariant = variants[0] || {
    id: node.id,
    sku: '',
    price: parseFloat(node.priceRange?.minVariantPrice?.amount || '199'),
    mrp: parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '219'),
    currency: node.priceRange?.minVariantPrice?.currencyCode || 'INR',
    availableForSale: Boolean(node.availableForSale),
  }

  const price = primaryVariant.price || 199
  const mrp = primaryVariant.mrp && primaryVariant.mrp > price ? primaryVariant.mrp : price
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
  const discount = discountPercent > 0 ? `${discountPercent}% OFF` : null
  const isAvailable = Boolean(node.availableForSale)

  return {
    id: node.id,
    shopifyId: node.id,
    handle: node.handle,
    name: node.title,
    flavor: node.title,
    category: node.handle?.includes('try-all-5') || node.handle?.includes('box') ? 'Snack Bundles' : 'Flavoured Makhana',
    size: primaryVariant.title && primaryVariant.title !== 'Default Title' ? primaryVariant.title : '50g Pack',
    count: 1,
    mrp,
    price,
    displayPrice: `₹${Math.round(price)}`,
    displayMrp: `₹${Math.round(mrp)}`,
    discount,
    badge: !isAvailable ? 'SOLD OUT' : (discount || 'SIGNATURE CRUNCH 🍿'),
    swatch: node.handle?.includes('cheese') ? 'cheddar' : node.handle?.includes('pudhina') ? 'pudina' : 'chili',
    accentColor: '#E2AE35',
    bgColor: '#F5EEDD',
    crunchRating: '5/5',
    spiceLevel: node.handle?.includes('garlic') ? 'Extra Hot 🌶️🌶️' : node.handle?.includes('peri-peri') ? 'Fiery 🌶️' : 'Medium 🌶️',
    blurb: node.description ? (node.description.length > 120 ? `${node.description.slice(0, 117)}...` : node.description) : 'Handpicked jumbo lotus seeds roasted with authentic spices.',
    description: node.description || 'Our signature roasted makhana crunch, crafted in small batches with real spices.',
    ingredients: 'Jumbo Foxnuts (Makhana), Olive Oil, Natural Spices, Sea Salt.',
    nutrition: {
      calories: '132 kcal',
      protein: '4.2g',
      carbs: '21g',
      fat: '3.5g',
      fiber: '3.6g',
    },
    availableForSale: isAvailable,
    options: node.options || [],
    variantId: primaryVariant.id,
    variants,
    images,
    image: images[0]?.url || null,
  }
}

/**
 * Maps a raw Shopify GraphQL Cart Node into the CHASKA cart model
 */
export function mapShopifyCart(cart) {
  if (!cart) return null

  const lineEdges = cart.lines?.edges || []
  const lines = lineEdges.map((edge) => {
    const node = edge.node
    const merchandise = node.merchandise || {}
    const product = merchandise.product || {}
    const priceAmount = parseFloat(merchandise.price?.amount || '0')
    const totalAmount = parseFloat(node.cost?.totalAmount?.amount || '0')
    const qty = typeof node.quantity === 'number' && node.quantity > 0 ? node.quantity : 1

    return {
      lineId: node.id,
      id: node.id,
      variantId: merchandise.id,
      productId: product.id || merchandise.id,
      name: product.title || merchandise.title || 'CHASKA Makhana Pack',
      flavor: product.title || merchandise.title || 'CHASKA Makhana Pack',
      handle: product.handle || '',
      size: merchandise.title && merchandise.title !== 'Default Title' ? merchandise.title : '70g Pack',
      quantity: qty,
      qty,
      price: priceAmount,
      currency: merchandise.price?.currencyCode || 'INR',
      lineTotal: totalAmount,
      image: merchandise.image?.url || null,
    }
  })

  const subtotal = parseFloat(cart.cost?.subtotalAmount?.amount || '0')
  const calculatedQty = lines.reduce((sum, item) => sum + item.quantity, 0)

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity > 0 ? cart.totalQuantity : calculatedQty,
    subtotal,
    cost: {
      subtotalAmount: subtotal,
      totalAmount: parseFloat(cart.cost?.totalAmount?.amount || '0'),
      currencyCode: cart.cost?.totalAmount?.currencyCode || 'INR',
    },
    lines,
  }
}

// ── SHOPIFY API SERVICE METHODS ──────────────────────────────────────────────

/**
 * Fetches products from Shopify Storefront API merged with the official Drop 01 Launch Lineup
 * Drop 01: Chocolate Makhana, Cheese and Herbs Makhana, Jalapeno Makhana, and The Launch Trio Box (all for sale)
 * Drop 02: Peri Peri, Kashmiri Garlic Chilli, Pudhina (Coming Soon / locked)
 */
export async function fetchShopifyProducts(first = 20) {
  try {
    const data = await shopifyFetch({
      query: GET_PRODUCTS_QUERY,
      variables: { first },
    })
    const edges = data?.products?.edges || []
    const shopifyMap = new Map()
    edges.forEach((edge) => {
      if (edge.node?.handle) {
        shopifyMap.set(edge.node.handle, mapShopifyProduct(edge.node))
      }
    })

    return PRODUCTS_CATALOGUE.map((catalogItem) => {
      let live = null
      if (catalogItem.handle === 'chocolate-makhana') {
        live = shopifyMap.get('peri-peri-makhana') || shopifyMap.get('chocolate-makhana')
      } else if (catalogItem.handle === 'cheese-and-herbs-makhana') {
        live = shopifyMap.get('chilli-cheese-makhana') || shopifyMap.get('cheese-and-herbs-makhana')
      } else if (catalogItem.handle === 'jalapeno-makhana') {
        live = shopifyMap.get('chilli-lime-makhana') || shopifyMap.get('jalapeno-makhana')
      } else if (catalogItem.handle === 'chaska-try-all-5' || catalogItem.handle === 'chaska-launch-trio') {
        live = shopifyMap.get('chaska-try-all-5') || shopifyMap.get('chaska-launch-trio')
      } else {
        live = shopifyMap.get(catalogItem.handle)
      }

      if (catalogItem.isComingSoon) {
        return {
          ...catalogItem,
          availableForSale: false,
          badge: '🔒 DROP 02 • COMING SOON',
          variantId: null,
          variants: [],
        }
      }

      const variants = live?.variants && live.variants.length > 0 ? live.variants : [
        {
          id: live?.variantId || 'variant-drop01',
          title: '50g Pack',
          price: catalogItem.price,
          mrp: catalogItem.mrp,
          availableForSale: true,
        },
      ]

      return {
        ...catalogItem,
        shopifyId: live?.shopifyId || catalogItem.shopifyId,
        variantId: variants[0]?.id || live?.variantId || catalogItem.variantId,
        variants,
        availableForSale: true,
      }
    })
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[Shopify Products Fetch Fallback]', err)
    }
    return PRODUCTS_CATALOGUE
  }
}

/**
 * Fetches a single product by handle, resolving launch flavours to active Shopify inventory
 */
export async function fetchShopifyProductByHandle(handle) {
  if (!handle) return null
  const handleLower = handle.toLowerCase()

  const catalogItem = PRODUCTS_CATALOGUE.find(
    (p) =>
      p.handle === handleLower ||
      p.aliasHandle === handleLower ||
      (handleLower === 'chilli-cheese-makhana' && p.handle === 'cheese-and-herbs-makhana') ||
      (handleLower === 'chilli-lime-makhana' && p.handle === 'jalapeno-makhana') ||
      (handleLower === 'peri-peri-makhana' && p.isComingSoon && p.handle === 'peri-peri-makhana')
  )

  let shopifyHandleToFetch = handleLower
  if (handleLower === 'chocolate-makhana') shopifyHandleToFetch = 'peri-peri-makhana'
  else if (handleLower === 'cheese-and-herbs-makhana') shopifyHandleToFetch = 'chilli-cheese-makhana'
  else if (handleLower === 'jalapeno-makhana') shopifyHandleToFetch = 'chilli-lime-makhana'
  else if (handleLower === 'chaska-launch-trio') shopifyHandleToFetch = 'chaska-try-all-5'

  let liveProduct = null
  try {
    const data = await shopifyFetch({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: shopifyHandleToFetch },
    })
    liveProduct = mapShopifyProduct(data?.product)
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[Shopify Product Handle Fetch Error]', err)
    }
  }

  if (catalogItem) {
    if (catalogItem.isComingSoon) {
      return {
        ...catalogItem,
        availableForSale: false,
        badge: '🔒 DROP 02 • COMING SOON',
        variants: [],
      }
    }

    const variants = liveProduct?.variants && liveProduct.variants.length > 0 ? liveProduct.variants : [
      {
        id: liveProduct?.variantId || 'variant-drop01',
        title: '50g Pack',
        price: catalogItem.price,
        mrp: catalogItem.mrp,
        availableForSale: true,
      },
    ]

    return {
      ...catalogItem,
      shopifyId: liveProduct?.shopifyId || catalogItem.shopifyId,
      variantId: variants[0]?.id || liveProduct?.variantId || catalogItem.variantId,
      variants,
      availableForSale: true,
    }
  }

  return liveProduct
}

/**
 * Fetches collections from Shopify Storefront API
 */
export async function fetchShopifyCollections(first = 10) {
  try {
    const data = await shopifyFetch({
      query: GET_COLLECTIONS_QUERY,
      variables: { first },
    })
    const edges = data?.collections?.edges || []
    return edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      image: edge.node.image?.url || null,
    }))
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[Shopify Collections API Unavailable]', err.message || err)
    }
    return []
  }
}

/**
 * Fetches a single collection with its products by handle from Shopify Storefront API
 */
export async function fetchShopifyCollectionByHandle(handle, first = 20) {
  if (!handle) return null
  try {
    const data = await shopifyFetch({
      query: GET_COLLECTION_BY_HANDLE_QUERY,
      variables: { handle, first },
    })
    const col = data?.collection
    if (!col) return null
    const productEdges = col.products?.edges || []
    return {
      id: col.id,
      title: col.title,
      handle: col.handle,
      description: col.description,
      image: col.image?.url || null,
      products: productEdges.map((e) => mapShopifyProduct(e.node)).filter(Boolean),
    }
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[Shopify Collection Handle API Unavailable]', err.message || err)
    }
    return null
  }
}

/**
 * Fetches an existing cart by cartId from Shopify Storefront API
 */
export async function getShopifyCart(cartId) {
  if (!cartId) return null
  const data = await shopifyFetch({
    query: GET_CART_QUERY,
    variables: { cartId },
  })
  return mapShopifyCart(data?.cart)
}

/**
 * Creates a new cart in Shopify with optional initial lines
 */
export async function createShopifyCart(lines = []) {
  const formattedLines = lines.map((item) => ({
    merchandiseId: item.variantId || item.id,
    quantity: Number(item.quantity || item.qty) || 1,
  }))

  const data = await shopifyFetch({
    query: CART_CREATE_MUTATION,
    variables: {
      input: { lines: formattedLines },
    },
  })

  const userErrors = data?.cartCreate?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(' | '))
  }

  return mapShopifyCart(data.cartCreate.cart)
}

/**
 * Adds variant lines to an existing Shopify cart
 */
export async function addShopifyCartLines(cartId, lines = []) {
  if (!cartId) return createShopifyCart(lines)

  const formattedLines = lines.map((item) => ({
    merchandiseId: item.variantId || item.id,
    quantity: Number(item.quantity || item.qty) || 1,
  }))

  const data = await shopifyFetch({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      lines: formattedLines,
    },
  })

  const userErrors = data?.cartLinesAdd?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(' | '))
  }

  return mapShopifyCart(data.cartLinesAdd.cart)
}

/**
 * Updates quantities of line items in an existing Shopify cart
 */
export async function updateShopifyCartLines(cartId, lines = []) {
  if (!cartId) return null

  const formattedLines = lines.map((item) => ({
    id: item.lineId || item.id,
    quantity: Number(item.quantity || item.qty) || 0,
  }))

  const data = await shopifyFetch({
    query: CART_LINES_UPDATE_MUTATION,
    variables: {
      cartId,
      lines: formattedLines,
    },
  })

  const userErrors = data?.cartLinesUpdate?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(' | '))
  }

  return mapShopifyCart(data.cartLinesUpdate.cart)
}

/**
 * Removes line items from an existing Shopify cart
 */
export async function removeShopifyCartLines(cartId, lineIds = []) {
  if (!cartId) return null

  const data = await shopifyFetch({
    query: CART_LINES_REMOVE_MUTATION,
    variables: {
      cartId,
      lineIds,
    },
  })

  const userErrors = data?.cartLinesRemove?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(' | '))
  }

  return mapShopifyCart(data.cartLinesRemove.cart)
}
