/**
 * Shopify Storefront API Client for CHASKA
 * Target Endpoint: https://fr10jp-rw.myshopify.com/api/2026-07/graphql.json
 */

// Target domain is strictly fr10jp-rw.myshopify.com
const envDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const SHOPIFY_DOMAIN = (envDomain && !envDomain.includes('xtx1fi')) ? envDomain : 'fr10jp-rw.myshopify.com'
const API_VERSION = '2026-07'

// Only use Storefront Access Token if valid and not the legacy Matcha store token
const rawToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''
const ACCESS_TOKEN = rawToken === 'f229736886731719c57822e05e180c22' ? '' : rawToken

export const GRAPHQL_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`
export { SHOPIFY_DOMAIN, API_VERSION }

/**
 * Low-level GraphQL fetcher for Shopify Storefront API
 * Uses POST requests with Content-Type: application/json
 */
export async function shopifyFetch({ query, variables = {} }) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (ACCESS_TOKEN) {
    headers['X-Shopify-Storefront-Access-Token'] = ACCESS_TOKEN
  }

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    })

    let json
    try {
      json = await response.json()
    } catch {
      json = null
    }

    if (json?.errors && json.errors.length > 0) {
      const errorMsg = json.errors.map((e) => e.message).join(' | ')
      throw new Error(errorMsg)
    }

    if (!response.ok) {
      throw new Error(`Shopify Storefront API Error: ${response.status} ${response.statusText}`)
    }

    return json?.data
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[Shopify Storefront API Error]', err.message || err)
    }
    throw err
  }
}
