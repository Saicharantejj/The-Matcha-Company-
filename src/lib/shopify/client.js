/**
 * Shopify Storefront API Client for CHASKA
 * Target Endpoint: https://fr10jp-rw.myshopify.com/api/2026-07/graphql.json
 */

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'fr10jp-rw.myshopify.com'
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-07'
const ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''

const GRAPHQL_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`

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

    if (!response.ok) {
      throw new Error(`Shopify Storefront API HTTP Error: ${response.status} ${response.statusText}`)
    }

    const json = await response.json()

    if (json.errors && json.errors.length > 0) {
      const errorMsg = json.errors.map((e) => e.message).join(' | ')
      throw new Error(`Shopify GraphQL Error: ${errorMsg}`)
    }

    return json.data
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[Shopify Storefront API Warning]', err.message || err)
    }
    throw err
  }
}
