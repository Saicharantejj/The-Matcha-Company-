/**
 * CHASKA Shopify Customer Event (Web Pixel)
 * Target: Meta Pixel ID 1045964184868120
 * 
 * Location in Shopify Admin:
 *   Settings > Customer events > Add custom pixel
 *   Name: "CHASKA Meta Pixel - Completed Checkout"
 *   Permission: Marketing & Analytics
 * 
 * Guarantees:
 *   1. Fires strictly on "checkout_completed" (real, paid, completed checkouts).
 *   2. Never fires on checkout load, cart load, button click, or unpaid steps.
 *   3. Strict deduplication: uses orderId + browser.localStorage + Meta eventID.
 *   4. Preserves Custom Gift Pack attributes (Flavours, Packaging, Recipient, Gift Note).
 *   5. Real order financial values (no hardcoded totals).
 */

// 1. Initialize Meta Pixel inside Shopify Web Pixel sandbox
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

const META_PIXEL_ID = '1045964184868120';
fbq('init', META_PIXEL_ID);

// 2. Subscribe exclusively to completed checkout events
analytics.subscribe("checkout_completed", async (event) => {
  const checkout = event.data?.checkout;
  if (!checkout) return;

  // Extract order identifier (Shopify order ID or checkout ID)
  const orderId = String(checkout.order?.id || checkout.id || '');
  if (!orderId) return;

  // 3. Deduplication Check via Web Pixel browser storage
  const dedupeStorageKey = `chaska_meta_purchased_${orderId}`;
  try {
    const alreadyTracked = await browser.localStorage.getItem(dedupeStorageKey);
    if (alreadyTracked === 'true') {
      console.log(`[CHASKA Pixel] Order ${orderId} already tracked. Skipping duplicate.`);
      return;
    }
  } catch (err) {
    // If browser.localStorage is restricted by browser privacy, continue gracefully
  }

  // 4. Extract Real Completed Order Value & Currency
  const orderValue = parseFloat(checkout.totalPrice?.amount || '0');
  const currency = checkout.totalPrice?.currencyCode || 'INR';

  // 5. Extract Line Items & Custom Gift Pack Attributes
  const lineItems = checkout.lineItems || [];
  const contentIds = [];
  const contents = [];
  const customGiftPackDetails = [];

  lineItems.forEach((item) => {
    const variantId = item.variant?.id ? String(item.variant.id) : String(item.id || '');
    const quantity = Number(item.quantity) || 1;
    const unitPrice = parseFloat(item.variant?.price?.amount || '0');

    if (variantId) {
      contentIds.push(variantId);
    }

    contents.push({
      id: variantId,
      quantity: quantity,
      item_price: unitPrice,
      title: item.title,
    });

    // Check for Custom Gift Pack line item attributes
    if (item.customAttributes && item.customAttributes.length > 0) {
      const attrMap = {};
      item.customAttributes.forEach((attr) => {
        if (attr.key && attr.value) {
          attrMap[attr.key] = attr.value;
        }
      });
      if (attrMap['Flavours'] || attrMap['Packaging']) {
        customGiftPackDetails.push({
          title: item.title,
          flavours: attrMap['Flavours'] || '',
          packaging: attrMap['Packaging'] || '',
          recipient: attrMap['Recipient'] || '',
          giftNote: attrMap['Gift Note'] || '',
        });
      }
    }
  });

  // 6. Build Standard Meta Pixel Purchase Payload
  const purchasePayload = {
    content_ids: contentIds,
    contents: contents,
    content_type: 'product',
    value: orderValue,
    currency: currency,
    order_id: orderId,
    num_items: contents.reduce((acc, curr) => acc + curr.quantity, 0),
  };

  // Add custom gift pack metadata if present
  if (customGiftPackDetails.length > 0) {
    purchasePayload.custom_gift_packs = customGiftPackDetails;
  }

  // 7. Fire Meta Pixel Purchase Event
  // Meta uses eventID (3rd argument) to deduplicate browser and server (CAPI) events
  fbq('track', 'Purchase', purchasePayload, { eventID: orderId });

  // 8. Record Deduplication Key
  try {
    await browser.localStorage.setItem(dedupeStorageKey, 'true');
  } catch (err) {
    // Non-blocking
  }
});
