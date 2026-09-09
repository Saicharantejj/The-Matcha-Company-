/**
 * High-level Shopify Storefront API Service & Data Mappers for CHASKA
 */

import { shopifyFetch } from './client'
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_CART_QUERY,
} from './queries'
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from './mutations'

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
      availableForSale: v.availableForSale,
      price: parseFloat(v.price?.amount || '0'),
      mrp: parseFloat(v.compareAtPrice?.amount || v.price?.amount || '0'),
      currency: v.price?.currencyCode || 'INR',
      selectedOptions: v.selectedOptions || [],
    }
  })

  const primaryVariant = variants[0] || {
    id: node.id,
    price: parseFloat(node.priceRange?.minVariantPrice?.amount || '199'),
    mrp: parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '219'),
    currency: node.priceRange?.minVariantPrice?.currencyCode || 'INR',
    availableForSale: node.availableForSale ?? true,
  }

  const price = primaryVariant.price || 199
  const mrp = primaryVariant.mrp && primaryVariant.mrp > price ? primaryVariant.mrp : price
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
  const discount = discountPercent > 0 ? `${discountPercent}% OFF` : null

  return {
    id: node.id,
    shopifyId: node.id,
    handle: node.handle,
    name: node.title,
    flavor: node.title,
    category: 'Flavoured Makhana',
    size: primaryVariant.title && primaryVariant.title !== 'Default Title' ? primaryVariant.title : '70g Pack',
    count: 1,
    mrp,
    price,
    displayPrice: `₹${Math.round(price)}`,
    displayMrp: `₹${Math.round(mrp)}`,
    discount,
    badge: node.availableForSale === false ? 'SOLD OUT' : (discount || 'SIGNATURE CRUNCH 🍿'),
    swatch: node.handle?.includes('cheese') ? 'cheddar' : node.handle?.includes('pudhina') ? 'pudina' : 'chili',
    accentColor: '#D23D2D',
    bgColor: '#FFFBEB',
    crunchRating: '5/5',
    spiceLevel: 'Medium 🌶️',
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
    availableForSale: node.availableForSale ?? true,
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
 * Fetches all products from Shopify Storefront API
 */
export async function fetchShopifyProducts(first = 20) {
  const data = await shopifyFetch({
    query: GET_PRODUCTS_QUERY,
    variables: { first },
  })
  const edges = data?.products?.edges || []
  return edges.map((edge) => mapShopifyProduct(edge.node)).filter(Boolean)
}

/**
 * Fetches a single product by handle from Shopify Storefront API
 */
export async function fetchShopifyProductByHandle(handle) {
  if (!handle) return null
  const data = await shopifyFetch({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  })
  return mapShopifyProduct(data?.product)
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
