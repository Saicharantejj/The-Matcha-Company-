/**
 * Central Meta Pixel Utility for CHASKA (React/Vite SPA)
 * META PIXEL ID: 1045964184868120
 */

export const META_PIXEL_ID = '1045964184868120'

let isInitialized = false

/**
 * Safely calls window.fbq if available
 */
export function fbqCall(...args) {
  if (typeof window === 'undefined') return
  if (typeof window.fbq === 'function') {
    try {
      window.fbq(...args)
      if (import.meta.env?.DEV) {
        console.log('[Meta Pixel]', ...args)
      }
    } catch (err) {
      if (import.meta.env?.DEV) {
        console.warn('[Meta Pixel Error]', err)
      }
    }
  }
}

/**
 * Initializes Meta Pixel once globally
 */
export function initMetaPixel() {
  if (typeof window === 'undefined') return
  if (isInitialized || window.__META_PIXEL_INITIALIZED__) return

  // Strict global initialization guard
  window.__META_PIXEL_INITIALIZED__ = true
  isInitialized = true

  // Define window.fbq stub according to Meta Pixel standard
  if (!window.fbq) {
    const n = function () {
      if (n.callMethod) {
        n.callMethod.apply(n, arguments)
      } else {
        n.queue.push(arguments)
      }
    }
    window.fbq = n
    if (!window._fbq) window._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
  }

  // Inject Meta script asynchronously if not already present
  if (!document.getElementById('meta-pixel-script') && !document.querySelector('script[src*="fbevents.js"]')) {
    const script = document.createElement('script')
    script.id = 'meta-pixel-script'
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.head.appendChild(script)
    }
  }

  // Initialize Pixel ID 1045964184868120 EXACTLY ONCE
  fbqCall('init', META_PIXEL_ID)
}

/**
 * Tracks PageView on route changes
 */
export function trackPageView(path) {
  fbqCall('track', 'PageView')
}

/**
 * Tracks ViewContent when viewing a product detail page
 */
export function trackViewContent(product) {
  if (!product) return
  const priceNum = typeof product.price === 'number' && !isNaN(product.price)
    ? product.price
    : parseFloat(product.price) || 0

  fbqCall('track', 'ViewContent', {
    content_name: product.name || product.flavor || 'CHASKA Makhana Pack',
    content_ids: [String(product.id || product.handle || 'chaska-product')],
    content_type: 'product',
    value: priceNum,
    currency: 'INR',
  })
}

/**
 * Tracks AddToCart when a product is added to cart
 */
export function trackAddToCart(product, quantity = 1) {
  if (!product) return
  const qty = Number(quantity) || 1
  const unitPrice = typeof product.price === 'number' && !isNaN(product.price)
    ? product.price
    : parseFloat(product.price) || 0
  const totalPrice = unitPrice * qty

  fbqCall('track', 'AddToCart', {
    content_name: product.name || product.flavor || 'CHASKA Makhana Pack',
    content_ids: [String(product.id || product.handle || 'chaska-product')],
    content_type: 'product',
    value: totalPrice,
    currency: 'INR',
  })
}

/**
 * Tracks InitiateCheckout when user clicks checkout CTA in cart drawer
 */
export function trackInitiateCheckout(items = [], subtotal = 0) {
  const contentIds = items.map((item) => String(item.id || item.productId || 'chaska-product'))
  const totalQty = items.reduce((acc, item) => acc + (Number(item.quantity || item.qty) || 1), 0)
  const subtotalVal = typeof subtotal === 'number' && !isNaN(subtotal)
    ? subtotal
    : parseFloat(subtotal) || 0

  fbqCall('track', 'InitiateCheckout', {
    content_ids: contentIds,
    content_type: 'product',
    value: subtotalVal,
    currency: 'INR',
    num_items: totalQty,
  })
}

/**
 * Central Purchase tracking utility with strict order deduplication and eventID
 * Note: Real checkout purchases fire from the completed Shopify Thank You experience.
 */
export function trackPurchase(orderData = {}) {
  const {
    content_ids = [],
    contents = [],
    value = 0,
    currency = 'INR',
    order_id = '',
    num_items,
  } = orderData

  if (!order_id) return

  // Deduplication guard: Never fire twice for the same order in the browser
  const dedupeKey = `chaska_meta_purchased_${order_id}`
  try {
    if (typeof window !== 'undefined' && window.localStorage.getItem(dedupeKey) === 'true') {
      if (import.meta.env?.DEV) {
        console.log(`[Meta Pixel] Purchase event for order ${order_id} already recorded. Skipping duplicate.`)
      }
      return
    }
  } catch {}

  const payload = {
    content_ids,
    contents,
    content_type: 'product',
    value: Number(value) || 0,
    currency: currency || 'INR',
    order_id: String(order_id),
  }
  if (num_items !== undefined) {
    payload.num_items = num_items
  }

  // Pass eventID as 3rd parameter for Meta browser & Conversions API deduplication
  fbqCall('track', 'Purchase', payload, { eventID: String(order_id) })

  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(dedupeKey, 'true')
    }
  } catch {}
}

/**
 * Tracks search action
 */
export function trackSearch(searchString) {
  if (!searchString || typeof searchString !== 'string') return
  fbqCall('track', 'Search', {
    search_string: searchString.trim(),
  })
}

/**
 * Tracks successful contact form submission
 */
export function trackContact() {
  fbqCall('track', 'Contact')
}

/**
 * Generic custom event launcher for future extensions
 */
export function trackEvent(eventName, data = {}) {
  if (!eventName) return
  fbqCall('track', eventName, data)
}
