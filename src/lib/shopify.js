const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN

async function shopifyFetch(query, variables = {}) {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2026-04/graphql.json`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Shopify API HTTP error: ${res.status}`)
  }

  const json = await res.json()
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors.map((e) => e.message).join(', '))
  }

  return json.data
}

export async function fetchShopifyProducts() {
  const query = `
    query getProducts {
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query)
  const edges = data?.products?.edges || []
  return edges.map((edge) => mapShopifyProduct(edge.node))
}

export function mapShopifyProduct(node) {
  const imageNode = node.images?.edges?.[0]?.node
  const variantNode = node.variants?.edges?.[0]?.node
  return {
    id: node.id,
    shopifyId: node.id,
    name: node.title,
    flavor: node.title,
    handle: node.handle,
    size: variantNode?.title && variantNode.title !== 'Default Title' ? variantNode.title : '10G SACHET',
    tags: node.tags || [],
    badge: node.tags?.includes('BESTSELLER') ? 'BESTSELLER' : node.tags?.includes('NEW') ? 'NEW' : null,
    swatch: 'matcha',
    photo: null,
    imageUrl: imageNode?.url || null,
    imageAlt: imageNode?.altText || node.title,
    blurb: node.description || 'Stone-ground matcha sachet directly from our Uji tea gardens.',
    price: variantNode?.price?.amount || null,
    currency: variantNode?.price?.currencyCode || null,
    variantId: variantNode?.id || null,
  }
}

// ── SHOPIFY CART API ──────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                id
                title
                handle
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export function mapShopifyCart(cart) {
  if (!cart) return null
  const lines = (cart.lines?.edges || []).map((edge) => {
    const node = edge.node
    const merchandise = node.merchandise || {}
    const product = merchandise.product || {}
    return {
      lineId: node.id,
      id: node.id,
      variantId: merchandise.id,
      name: product.title || merchandise.title || 'Matcha Product',
      flavor: product.title || merchandise.title || 'Matcha Product',
      kind: 'sachet',
      size: merchandise.title && merchandise.title !== 'Default Title' ? merchandise.title : '10G SACHET',
      swatch: 'matcha',
      qty: typeof node.quantity === 'number' && node.quantity > 0 ? node.quantity : 1,
      price: merchandise.price?.amount || '0',
      currency: merchandise.price?.currencyCode || 'INR',
      lineTotal: node.cost?.totalAmount?.amount || '0',
      imageUrl: merchandise.image?.url || null,
    }
  })

  const calculatedTotalQuantity = lines.reduce((sum, line) => sum + line.qty, 0)

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity > 0 ? cart.totalQuantity : calculatedTotalQuantity,
    cost: {
      subtotalAmount: cart.cost?.subtotalAmount?.amount || '0',
      totalAmount: cart.cost?.totalAmount?.amount || '0',
      currencyCode: cart.cost?.totalAmount?.currencyCode || 'INR',
    },
    lines,
  }
}

export async function createShopifyCart(variantId, quantity = 1) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `
  const data = await shopifyFetch(query, {
    input: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
  })

  const userErrors = data?.cartCreate?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(', '))
  }

  return mapShopifyCart(data.cartCreate.cart)
}

export async function getShopifyCart(cartId) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${CART_FRAGMENT}
  `
  const data = await shopifyFetch(query, { cartId })
  return mapShopifyCart(data?.cart)
}

export async function addShopifyCartLines(cartId, variantId, quantity = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `
  const data = await shopifyFetch(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })

  const userErrors = data?.cartLinesAdd?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(', '))
  }

  return mapShopifyCart(data.cartLinesAdd.cart)
}

export async function updateShopifyCartLines(cartId, lineId, quantity) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `
  const data = await shopifyFetch(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })

  const userErrors = data?.cartLinesUpdate?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(', '))
  }

  return mapShopifyCart(data.cartLinesUpdate.cart)
}

export async function removeShopifyCartLines(cartId, lineId) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `
  const data = await shopifyFetch(query, {
    cartId,
    lineIds: [lineId],
  })

  const userErrors = data?.cartLinesRemove?.userErrors || []
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(', '))
  }

  return mapShopifyCart(data.cartLinesRemove.cart)
}
