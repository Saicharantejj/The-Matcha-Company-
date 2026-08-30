/**
 * Thin client for the site's own API.
 *
 * Every call resolves to { ok, data } or { ok: false, error, fields } — it
 * never throws — so callers can render a message instead of wrapping each
 * request in try/catch. A network failure and a 500 are reported the same way
 * because there is nothing useful the visitor can do differently about either.
 */
async function post(path, body) {
  let res
  try {
    res = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return { ok: false, error: 'network' }
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    /* an empty or non-JSON body is handled by the status check below */
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: data?.error || `http_${res.status}`,
      fields: data?.fields || [],
    }
  }
  return { ok: true, data }
}

export const placeOrder = (payload) => post('/api/orders', payload)
export const subscribe = (email, company = '') => post('/api/subscribe', { email, company })

/** Turns an API error code into something worth showing a person. */
export function messageFor(result) {
  if (!result || result.ok) return null
  switch (result.error) {
    case 'network':
      return "We couldn't reach the server. Check your connection and try again."
    case 'too_many_requests':
      return "That's a few too many attempts. Give it a few minutes and try again."
    case 'orders_unavailable':
    case 'subscribe_unavailable':
      return "Ordering is temporarily unavailable. Please try again shortly."
    case 'validation_failed':
      return fieldMessage(result.fields) || 'Please check the details above.'
    case 'email_invalid':
      return 'That email address does not look right.'
    case 'email_required':
      return 'An email address is required.'
    default:
      return 'Something went wrong on our end. Please try again.'
  }
}

const FIELD_MESSAGES = {
  name_required: 'Your name is required.',
  name_too_short: 'Please enter your full name.',
  email_required: 'An email address is required.',
  email_invalid: 'That email address does not look right.',
  address_required: 'A delivery address is required.',
  address_too_short: 'That address looks too short.',
  city_required: 'A city is required.',
  postcode_required: 'A postcode is required.',
  items_required: 'Your cart is empty.',
  item_unknown: 'One of those products is no longer available.',
  item_qty_invalid: 'One of those quantities is not valid.',
}

function fieldMessage(fields) {
  for (const f of fields) if (FIELD_MESSAGES[f]) return FIELD_MESSAGES[f]
  return null
}
