# CHASKA Shopify Post-Purchase & Meta Pixel Purchase Implementation

This document details the complete production implementation for CHASKA's post-purchase Thank You experience, Meta Pixel Purchase tracking, deduplication, and Custom Gift Pack preservation.

---

## 1. Architecture Overview

```
Customer checks out on https://www.snackchaska.shop
       │
       ▼
Redirected to native Shopify Checkout (502a8s-aj.myshopify.com)
       │
       ▼
Customer completes Payment (UPI, Cards, NetBanking)
       │
       ▼
Shopify displays Native Thank You / Order Status Page
       │
       ├─► 1. Polished CHASKA Order Confirmation Card (via Shopify.Checkout.OrderStatus.addContentBox)
       │      - "ORDER CONFIRMED" & "Thank you for choosing CHASKA!"
       │      - Displays Order # and summary of purchased items
       │      - Preserves Custom Gift Pack attributes: Flavours, Packaging, Recipient, Gift Note
       │      - CTAs: "Continue Shopping" (returns to site & resets cart) and "Track Order"
       │
       ├─► 2. Meta Pixel Purchase Event (Pixel ID: 1045964184868120)
       │      - Subscribes strictly to completed checkouts (checkout_completed)
       │      - Real order value & currency (INR)
       │      - Content IDs & purchased products
       │      - eventID: {{ order_id }} (Meta automated deduplication key)
       │
       └─► 3. Three-Tier Deduplication Defense
              - Tier 1: {% if first_time_accessed %} (Server-side; false on page refresh)
              - Tier 2: localStorage['chaska_meta_purchased_{order_id}'] (Client-side)
              - Tier 3: Meta eventID matching order ID (Meta CAPI/browser deduplication)
```

---

## 2. Installation Instructions in Shopify Admin

### Method A: Shopify Customer Events (Web Pixel) — Recommended Modern Standard
1. In **Shopify Admin**, navigate to: **Settings** > **Customer events**.
2. Click **Add custom pixel**.
3. Name the pixel: `CHASKA Meta Pixel - Completed Checkout`.
4. Copy the entire contents of [`shopify/customer-event-web-pixel.js`](./customer-event-web-pixel.js).
5. Paste it into the Code box.
6. Under **Customer privacy**, select:
   - **Permission**: `Marketing` and `Analytics`.
   - **Data sale**: `Data collected does not qualify as data sale`.
7. Click **Save** and then click **Connect**.

### Method B: Order Status Page Additional Scripts (Branded Card & Fallback Tracking)
1. In **Shopify Admin**, navigate to: **Settings** > **Checkout**.
2. Scroll down to the **Order status page** section.
3. Under **Additional scripts**, paste the contents of [`shopify/thank-you-order-status.liquid`](./thank-you-order-status.liquid).
4. Click **Save**.

*Note: If both Method A and Method B are active, Meta's `eventID: orderId` guarantee ensures Meta deduplicates the event as a single unique purchase.*

---

## 3. Custom Gift Pack Attribute Preservation

When a customer orders a Custom Gift Pack:
1. `BuildYourBox.jsx` passes line item attributes to the Shopify Cart:
   - `Flavours: 2x Pudina, 1x Jalapeño, 2x Cheese`
   - `Packaging: Royal Midnight Navy`
   - `Recipient: Sneha`
   - `Gift Note: Happy snacking!`
2. On checkout completion, Shopify binds these attributes to the order's `line_item.properties`.
3. In [`shopify/thank-you-order-status.liquid`](./thank-you-order-status.liquid), the properties loop displays each attribute directly under the Custom Gift Pack item.
4. In [`shopify/customer-event-web-pixel.js`](./customer-event-web-pixel.js), `customAttributes` are captured in the event payload.

---

## 4. Deduplication Verification

| Scenario | Behavior |
| :--- | :--- |
| **Initial Purchase Completion** | `first_time_accessed` is `true`. Event fires with `eventID: order_id`. Key `chaska_meta_purchased_{orderId}` is stored in `localStorage`. |
| **Page Refresh (F5 / Cmd+R)** | `first_time_accessed` is `false`. Server-side execution blocked. Client checks `localStorage` and skips. Event does NOT fire. |
| **Revisit via Order Email** | `first_time_accessed` is `false`. Event does NOT fire. |
| **Simultaneous Web Pixel & Script** | Both send matching `eventID: order_id`. Meta's engine deduplicates into 1 transaction. |

---

## 5. Returning to Storefront ("Continue Shopping")

When the customer clicks **Continue Shopping**:
1. Links to `https://www.snackchaska.shop/shop?clearcart=true`.
2. [`CartContext.jsx`](../src/context/CartContext.jsx) detects `clearcart=true`, purges `LOCAL_CART_ITEMS_KEY` and `SHOPIFY_CART_ID_KEY`, resets local state, and scrubs the URL param via `history.replaceState`.
3. The customer's cart starts fresh with 0 items.
