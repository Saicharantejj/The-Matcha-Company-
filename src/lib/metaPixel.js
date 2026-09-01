import { useEffect, useRef } from 'react'

// The Pixel itself is initialized once in index.html. This module only sends
// standard events after the matching application action has happened.
const sentEvents = new Set()

function pixelIsAvailable() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

export function trackMetaEvent(eventName, parameters) {
  if (!pixelIsAvailable()) return false
  if (parameters) window.fbq('track', eventName, parameters)
  else window.fbq('track', eventName)
  return true
}

function trackOnce(key, eventName, parameters) {
  if (sentEvents.has(key)) return false
  const tracked = trackMetaEvent(eventName, parameters)
  if (tracked) sentEvents.add(key)
  return tracked
}

function priceParameters(price, currency, quantity = 1) {
  // Products currently have no published price or currency. Do not invent a
  // value: Meta receives these fields automatically when pricing is added.
  if (!Number.isFinite(price) || typeof currency !== 'string') return {}
  return { value: price * quantity, currency }
}

export function productEventParameters(product, quantity = 1) {
  return {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    num_items: quantity,
    ...priceParameters(product.price, product.currency, quantity),
  }
}

export function cartEventParameters(lines) {
  const numItems = lines.reduce((total, line) => total + line.qty, 0)
  const total = lines.reduce((sum, line) => {
    return Number.isFinite(line.price) ? sum + line.price * line.qty : sum
  }, 0)
  const currency = lines[0]?.currency
  const hasCompletePricing =
    lines.length > 0 &&
    typeof currency === 'string' &&
    lines.every((line) => Number.isFinite(line.price) && line.currency === currency)

  return {
    content_ids: lines.map((line) => line.id),
    content_type: 'product',
    num_items: numItems,
    ...(hasCompletePricing ? { value: total, currency } : {}),
  }
}

export function trackAddToCart(product) {
  return trackMetaEvent('AddToCart', productEventParameters(product))
}

export function trackInitiateCheckout(lines) {
  return trackOnce(
    `InitiateCheckout:${lines.map((line) => `${line.id}:${line.qty}`).join('|')}`,
    'InitiateCheckout',
    cartEventParameters(lines),
  )
}

export function trackOrderLead(lines, reference) {
  return trackOnce(`Lead:${reference}`, 'Lead', cartEventParameters(lines))
}

export function useMetaPixelCategoryView(categoryName, items) {
  const itemKey = items.map((item) => item.id).join('|')

  useEffect(() => {
    const itemIds = itemKey ? itemKey.split('|') : []
    trackOnce(`ViewCategory:${categoryName}:${itemKey}`, 'ViewCategory', {
      content_ids: itemIds,
      content_name: categoryName,
      content_type: 'product',
      num_items: itemIds.length,
    })
  }, [categoryName, itemKey])
}

export function useMetaPixelProductView(product) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!product?.id) return undefined
    const element = elementRef.current
    if (!element) return undefined

    const recordView = () => {
      trackOnce(`ViewContent:${product.id}`, 'ViewContent', productEventParameters(product))
    }

    if (typeof IntersectionObserver === 'undefined') {
      recordView()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        recordView()
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [product])

  return elementRef
}
