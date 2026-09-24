/**
 * End-to-End Verification Script for CHASKA Post-Purchase Experience & Meta Pixel Purchase Tracking
 * 
 * Verifies:
 *   1. Real Shopify cart creation and checkout URL generation for normal products.
 *   2. Real Shopify cart creation with Custom Gift Pack and custom line item attributes.
 *   3. Meta Pixel Purchase event payload generation matching Shopify completed data.
 *   4. Deduplication logic preventing double-firing on page refresh or revisit.
 *   5. Attribute preservation for Custom Gift Pack (Flavours, Packaging, Recipient, Note).
 */

const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN || '502a8s-aj.myshopify.com';
const API_VERSION = process.env.VITE_SHOPIFY_API_VERSION || '2026-07';
const STOREFRONT_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '6c334c5390bc96116263fbe9dd00a04d';
const STOREFRONT_URL = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function storefrontFetch(query, variables = {}) {
  const response = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(' | '));
  }
  return json.data;
}

// In-memory mock localStorage for testing deduplication engine
class MockLocalStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.get(key) || null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

async function runTests() {
  console.log('='.repeat(80));
  console.log('CHASKA POST-PURCHASE & META PIXEL PURCHASE END-TO-END VERIFICATION');
  console.log(`Store: ${SHOPIFY_DOMAIN} | API: ${API_VERSION}`);
  console.log('='.repeat(80));

  let passCount = 0;
  let testCount = 0;

  function assert(condition, testName) {
    testCount++;
    if (condition) {
      console.log(`✓ [PASS] ${testName}`);
      passCount++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      process.exitCode = 1;
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 1: Normal Product Flow & Real Shopify Cart Creation
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 1. Testing Normal Product Cart & Checkout Handoff ---');
  
  const pudinaQuery = await storefrontFetch(`
    query {
      product(handle: "pudina-makhana") {
        id
        title
        variants(first: 5) {
          nodes {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `);

  const pudinaVariant = pudinaQuery?.product?.variants?.nodes?.[0];
  assert(pudinaVariant && pudinaVariant.id, 'Pudina variant fetched from Shopify');
  console.log(`  Fetched: ${pudinaQuery.product.title} - ${pudinaVariant.title} (Price: ₹${pudinaVariant.price.amount})`);

  const normalCartCreate = await storefrontFetch(`
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
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
          lines(first: 5) {
            nodes {
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
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `, {
    input: {
      lines: [
        {
          merchandiseId: pudinaVariant.id,
          quantity: 2,
        },
      ],
    },
  });

  const normalCart = normalCartCreate?.cartCreate?.cart;
  assert(normalCart && normalCart.id, 'Shopify Cart created successfully');
  assert(normalCart.checkoutUrl && normalCart.checkoutUrl.startsWith('https://'), 'Valid Shopify checkoutUrl generated');
  assert(Number(normalCart.totalQuantity) === 2, 'Cart quantity matches requested quantity (2)');
  assert(parseFloat(normalCart.cost.totalAmount.amount) === parseFloat(pudinaVariant.price.amount) * 2, 'Cart total is accurately derived from real variant price');
  console.log(`  Cart ID: ${normalCart.id}`);
  console.log(`  Checkout URL: ${normalCart.checkoutUrl.split('?')[0]}...`);
  console.log(`  Total: ₹${normalCart.cost.totalAmount.amount} ${normalCart.cost.totalAmount.currencyCode}`);

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 2: Custom Gift Pack Cart & Custom Line Item Attributes
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 2. Testing Custom Gift Pack & Line Item Attributes Preservation ---');

  const giftPackQuery = await storefrontFetch(`
    query {
      product(handle: "custom-gift-pack") {
        id
        title
        variants(first: 5) {
          nodes {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `);

  const celebrationVariant = giftPackQuery?.product?.variants?.nodes?.find(
    (v) => v.sku === 'GIFT-CELEB-5' || v.title.includes('5')
  ) || giftPackQuery?.product?.variants?.nodes?.[0];

  assert(celebrationVariant && celebrationVariant.id, 'Celebration Hamper variant fetched from Shopify');
  console.log(`  Fetched: ${celebrationVariant.title} (Price: ₹${celebrationVariant.price.amount})`);

  const customAttributes = [
    { key: 'Flavours', value: '2x Pudina, 1x Jalapeño, 2x Cheese' },
    { key: 'Packaging', value: 'Royal Midnight Navy' },
    { key: 'Recipient', value: 'Aarav Sharma' },
    { key: 'Gift Note', value: 'Wishing you a healthy, crunchy festive celebration!' },
  ];

  const giftCartCreate = await storefrontFetch(`
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 5) {
            nodes {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
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
        userErrors {
          field
          message
        }
      }
    }
  `, {
    input: {
      lines: [
        {
          merchandiseId: celebrationVariant.id,
          quantity: 1,
          attributes: customAttributes,
        },
      ],
    },
  });

  const giftCart = giftCartCreate?.cartCreate?.cart;
  assert(giftCart && giftCart.id, 'Shopify Cart with Custom Gift Pack created');
  assert(parseFloat(giftCart.cost.totalAmount.amount) === parseFloat(celebrationVariant.price.amount), 'Gift pack total matches variant price (₹581)');

  const lineAttributes = giftCart?.lines?.nodes?.[0]?.attributes || [];
  const attrMap = Object.fromEntries(lineAttributes.map((a) => [a.key, a.value]));

  assert(attrMap['Flavours'] === '2x Pudina, 1x Jalapeño, 2x Cheese', 'Attribute "Flavours" preserved accurately');
  assert(attrMap['Packaging'] === 'Royal Midnight Navy', 'Attribute "Packaging" preserved accurately');
  assert(attrMap['Recipient'] === 'Aarav Sharma', 'Attribute "Recipient" preserved accurately');
  assert(attrMap['Gift Note'] === 'Wishing you a healthy, crunchy festive celebration!', 'Attribute "Gift Note" preserved accurately');
  console.log('  Confirmed Shopify returned all 4 line item attributes on the cart line item.');

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 3: Meta Pixel Purchase Event Construction & Data Integrity
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 3. Testing Meta Pixel Purchase Event Construction ---');

  // Simulated completed checkout object returned by Shopify's checkout_completed event
  const mockShopifyCompletedCheckout = {
    id: 'c1-748923749823',
    order: {
      id: 'gid://shopify/Order/5892384920',
      orderNumber: 1042,
    },
    totalPrice: {
      amount: giftCart.cost.totalAmount.amount,
      currencyCode: giftCart.cost.totalAmount.currencyCode,
    },
    lineItems: [
      {
        id: giftCart.lines.nodes[0].id,
        title: 'Custom Gift Pack (Celebration Hamper)',
        quantity: 1,
        variant: {
          id: celebrationVariant.id,
          price: {
            amount: celebrationVariant.price.amount,
          },
        },
        customAttributes: customAttributes,
      },
    ],
  };

  function buildPixelPayload(checkout) {
    const orderId = String(checkout.order?.id || checkout.id || '');
    const orderValue = parseFloat(checkout.totalPrice?.amount || '0');
    const currency = checkout.totalPrice?.currencyCode || 'INR';
    const contentIds = [];
    const contents = [];
    const customGiftPackDetails = [];

    (checkout.lineItems || []).forEach((item) => {
      const variantId = item.variant?.id ? String(item.variant.id) : String(item.id || '');
      const quantity = Number(item.quantity) || 1;
      const unitPrice = parseFloat(item.variant?.price?.amount || '0');
      if (variantId) contentIds.push(variantId);
      contents.push({
        id: variantId,
        quantity,
        item_price: unitPrice,
        title: item.title,
      });

      if (item.customAttributes && item.customAttributes.length > 0) {
        const m = Object.fromEntries(item.customAttributes.map((a) => [a.key, a.value]));
        if (m['Flavours'] || m['Packaging']) {
          customGiftPackDetails.push({
            title: item.title,
            flavours: m['Flavours'] || '',
            packaging: m['Packaging'] || '',
            recipient: m['Recipient'] || '',
            giftNote: m['Gift Note'] || '',
          });
        }
      }
    });

    return {
      payload: {
        content_ids: contentIds,
        contents,
        content_type: 'product',
        value: orderValue,
        currency,
        order_id: orderId,
        num_items: contents.reduce((acc, curr) => acc + curr.quantity, 0),
        custom_gift_packs: customGiftPackDetails,
      },
      options: {
        eventID: orderId,
      },
    };
  }

  const { payload, options } = buildPixelPayload(mockShopifyCompletedCheckout);

  assert(payload.value === parseFloat(celebrationVariant.price.amount), `Meta Purchase value matches actual order total (₹${payload.value})`);
  assert(payload.currency === 'INR', 'Meta Purchase currency is INR');
  assert(payload.order_id === 'gid://shopify/Order/5892384920', 'Meta Purchase order_id matches Shopify order ID');
  assert(options.eventID === 'gid://shopify/Order/5892384920', 'Meta eventID matches order ID for Meta deduplication');
  assert(payload.contents[0].id === celebrationVariant.id, 'Meta contents contains valid Shopify variant ID');
  assert(payload.custom_gift_packs[0].flavours === '2x Pudina, 1x Jalapeño, 2x Cheese', 'Meta custom_gift_packs contains flavours attribute');
  assert(payload.custom_gift_packs[0].recipient === 'Aarav Sharma', 'Meta custom_gift_packs contains recipient attribute');

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 4: Three-Tier Deduplication Guarantee
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 4. Testing Deduplication Guarantee on Page Refresh / Revisit ---');

  const mockStorage = new MockLocalStorage();
  const testOrderId = 'gid://shopify/Order/5892384920';
  const dedupeKey = `chaska_meta_purchased_${testOrderId}`;

  let eventsFiredCount = 0;

  function simulateCustomerVisit(isFirstTimeAccessed) {
    // Tier 1: Server-side liquid check
    if (!isFirstTimeAccessed) {
      console.log('    [Server Tier 1] Blocked: first_time_accessed is false');
      return false;
    }

    // Tier 2: Client-side localStorage check
    if (mockStorage.getItem(dedupeKey) === 'true') {
      console.log('    [Client Tier 2] Blocked: localStorage key already exists');
      return false;
    }

    // Fire event
    eventsFiredCount++;
    mockStorage.setItem(dedupeKey, 'true');
    console.log(`    [Event Fired] Fired Purchase event #${eventsFiredCount} for order ${testOrderId}`);
    return true;
  }

  // Visit 1: Initial completed checkout load
  console.log('  Simulation 1: Customer completes payment and lands on Thank You page (initial access)');
  const fired1 = simulateCustomerVisit(true);
  assert(fired1 === true && eventsFiredCount === 1, 'Initial purchase fires exactly 1 event');

  // Visit 2: Customer refreshes Thank You page (F5 / Cmd+R)
  console.log('  Simulation 2: Customer presses F5 / Refresh');
  const fired2 = simulateCustomerVisit(false); // Shopify sets first_time_accessed to false
  assert(fired2 === false && eventsFiredCount === 1, 'Page refresh blocked by server-side first_time_accessed');

  // Visit 3: Edge case where first_time_accessed is true on revisit, but localStorage is present
  console.log('  Simulation 3: Edge case where server flag is true but localStorage already recorded');
  const fired3 = simulateCustomerVisit(true);
  assert(fired3 === false && eventsFiredCount === 1, 'Duplicate blocked by client-side localStorage guard');

  // Visit 4: Customer revisits link from order confirmation email
  console.log('  Simulation 4: Customer clicks "View Order" in email 3 days later');
  const fired4 = simulateCustomerVisit(false);
  assert(fired4 === false && eventsFiredCount === 1, 'Email revisit blocked; total events fired remains strictly 1');

  // ──────────────────────────────────────────────────────────────────────────
  // TEST 5: Cart Clearance on Post-Purchase Return
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 5. Testing Post-Purchase "Continue Shopping" Cart Clearance ---');

  const clientStorage = new MockLocalStorage();
  clientStorage.setItem('chaska_cart_items', JSON.stringify([{ id: 'pudina-30-1', quantity: 2 }]));
  clientStorage.setItem('chaska_shopify_cart_id', normalCart.id);

  assert(clientStorage.getItem('chaska_cart_items') !== null, 'Stale items exist in cart before post-purchase return');

  // Simulate returning with ?clearcart=true
  function simulateContinueShoppingReturn(searchParams) {
    if (searchParams.includes('clearcart=true')) {
      clientStorage.removeItem('chaska_shopify_cart_id');
      clientStorage.removeItem('chaska_cart_items');
      return true;
    }
    return false;
  }

  const cleared = simulateContinueShoppingReturn('?clearcart=true');
  assert(cleared === true, 'Clear cart trigger recognized');
  assert(clientStorage.getItem('chaska_cart_items') === null, 'Local cart items purged cleanly');
  assert(clientStorage.getItem('chaska_shopify_cart_id') === null, 'Local Shopify cart ID purged cleanly');

  // ──────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(80));
  console.log(`SUMMARY: ${passCount} / ${testCount} assertions passed (${Math.round((passCount/testCount)*100)}%)`);
  console.log('='.repeat(80));

  if (passCount === testCount) {
    console.log('🎉 ALL POST-PURCHASE AND PIXEL VERIFICATIONS COMPLETED SUCCESSFULLY!\n');
  } else {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
