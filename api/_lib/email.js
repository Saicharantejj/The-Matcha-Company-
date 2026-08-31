/**
 * Transactional email via Resend's REST API.
 *
 * Called with plain fetch rather than their SDK to keep the dependency list at
 * one (pg). Every function here resolves to a {ok, skipped?, error?} result and
 * never throws: an order that is safely in the database must not be reported as
 * failed just because the mail provider had a bad minute. The caller logs the
 * failure and still returns success to the customer.
 */
const ENDPOINT = 'https://api.resend.com/emails'

function escapeHtml(value) {
  return String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )
}

async function send({ to, subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.ORDER_FROM_EMAIL
  if (!key || !from) {
    return { ok: false, skipped: true, error: 'email_not_configured' }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      return { ok: false, error: `resend_${res.status}`, detail: detail.slice(0, 300) }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

function itemRows(items) {
  return items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px 12px 6px 0;border-bottom:1px solid #C4D2B8;">${escapeHtml(i.name)}</td>
          <td style="padding:6px 0;border-bottom:1px solid #C4D2B8;text-align:right;">&times;${i.qty}</td>
        </tr>`,
    )
    .join('')
}

const SHELL = (inner) =>
  `<div style="font-family:Helvetica,Arial,sans-serif;color:#232E1E;background:#E9E7D0;padding:32px;">
     <div style="max-width:520px;margin:0 auto;background:#F8F5EB;padding:32px;">
       ${inner}
       <p style="margin-top:32px;font-size:12px;color:#4E6B3E;">Drink Yojo &middot; Matcha, minus the ceremony</p>
     </div>
   </div>`

/** Confirmation to the person who ordered. */
export function sendCustomerConfirmation(order) {
  return send({
    to: order.email,
    replyTo: process.env.ORDER_NOTIFY_EMAIL || undefined,
    subject: `We've got your order — ${order.reference}`,
    html: SHELL(`
      <h1 style="font-size:20px;margin:0 0 16px;">Order received</h1>
      <p style="margin:0 0 16px;line-height:1.6;">
        Thanks ${escapeHtml(order.customerName)} — we've logged your order as
        <strong>${escapeHtml(order.reference)}</strong>.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${itemRows(order.items)}</table>
      <p style="margin:20px 0 0;line-height:1.6;">
        We confirm pricing and delivery by email before anything ships, so nothing has been charged.
        We'll be in touch shortly.
      </p>
    `),
  })
}

/** Notification to whoever runs the shop. */
export function sendOwnerNotification(order) {
  const to = process.env.ORDER_NOTIFY_EMAIL
  if (!to) return Promise.resolve({ ok: false, skipped: true, error: 'notify_email_not_set' })
  return send({
    to,
    replyTo: order.email,
    subject: `New order ${order.reference} — ${order.itemCount} item${order.itemCount === 1 ? '' : 's'}`,
    html: SHELL(`
      <h1 style="font-size:20px;margin:0 0 16px;">New order ${escapeHtml(order.reference)}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${itemRows(order.items)}</table>
      <h2 style="font-size:15px;margin:24px 0 8px;">Ship to</h2>
      <p style="margin:0;line-height:1.6;font-size:14px;">
        ${escapeHtml(order.customerName)}<br>
        ${escapeHtml(order.address)}<br>
        ${escapeHtml(order.city)} ${escapeHtml(order.postcode)}<br>
        ${escapeHtml(order.email)}${order.phone ? `<br>${escapeHtml(order.phone)}` : ''}
      </p>
      ${order.notes ? `<h2 style="font-size:15px;margin:24px 0 8px;">Notes</h2><p style="margin:0;font-size:14px;line-height:1.6;">${escapeHtml(order.notes)}</p>` : ''}
    `),
  })
}

export function sendSubscribeNotification(email) {
  const to = process.env.ORDER_NOTIFY_EMAIL
  if (!to) return Promise.resolve({ ok: false, skipped: true })
  return send({
    to,
    subject: 'New newsletter signup',
    html: SHELL(`<p style="margin:0;">${escapeHtml(email)} joined the list.</p>`),
  })
}
