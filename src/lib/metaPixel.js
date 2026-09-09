/**
 * Central Meta Pixel Utility for CHASKA (React/Vite SPA)
 * Meta Pixel ID: 1045964184868120
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
  if (isInitialized) return

  // Check if fbq script is already injected & initialized
  if (window.fbq && window.fbq.loaded) {
    isInitialized = true
    return
  }

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

  // Inject Meta script asynchronously
  if (!document.getElementById('meta-pixel-script')) {
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

  // Initialize Pixel ID
  fbqCall('init', META_PIXEL_ID)
  isInitialized = true
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
 * Prepared Purchase function for future payment backend integration (DO NOT CALL currently)
 */
export function trackPurchase(orderData = {}) {
  const { content_ids = [], value = 0, order_id = '' } = orderData
  fbqCall('track', 'Purchase', {
    content_ids,
    content_type: 'product',
    value,
    currency: 'INR',
    order_id,
  })
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
