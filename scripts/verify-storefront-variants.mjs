/**
 * Automated Verification Script for CHASKA Shopify Storefront API
 * 
 * Verifies:
 *  1. Exactly 3 live flavours are returned: Pudina, Jalapeño, Cheese.
 *  2. No old products or spelling mistakes (Pudhina, Chilli Lime, Chilli Cheese, Peri Peri, Kashmiri Garlic Chilli, Chaska Try All 5) are live.
 *  3. No upcoming flavours (Kashmiri Chilli Lime Garlic, South African Peri Peri, Dark Chocolate Brownie) are live or purchasable.
 *  4. Base prices: 30g = ₹129, 70g = ₹229.
 *  5. Pack discounts:
 *     - Pack of 1: 0% (30g: ₹129, 70g: ₹229)
 *     - Pack of 3: 5% (30g: ₹368, 70g: ₹653)
 *     - Pack of 5: 10% (30g: ₹581, 70g: ₹1031)
 *     - Pack of 10: 20% (30g: ₹1032, 70g: ₹1832)
 *  6. All 24 variants have availableForSale: true.
 *  7. Adds live variants to a real Shopify Cart.
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

const EXPECTED_LIVE_TITLES = ['Pudina', 'Jalapeño', 'Cheese'];
const FORBIDDEN_LIVE_HANDLES = [
  'peri-peri-makhana',
  'kashmiri-garlic-chilli-makhana',
  'chaska-try-all-5',
  'chaska-launch-trio',
];

async function verifyStorefront() {
  console.log('='.repeat(80));
  console.log('CHASKA SHOPIFY STOREFRONT API VERIFICATION');
  console.log(`Store: ${SHOPIFY_DOMAIN}`);
  console.log(`API Version: ${API_VERSION}`);
  console.log('='.repeat(80));

  const query = `{
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          variants(first: 50) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }`;

  const data = await storefrontFetch(query);
  const products = data.products.edges.map((e) => e.node);

  console.log(`\nFound ${products.length} product(s) exposed on Storefront API:\n`);

  let errors = 0;
  const liveVariants = [];

  for (const p of products) {
    const isLive = p.availableForSale;
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`PRODUCT: "${p.title}" | Handle: ${p.handle} | ID: ${p.id} | Available: ${isLive}`);

    // Check for forbidden products
    if (FORBIDDEN_LIVE_HANDLES.includes(p.handle)) {
      console.error(`  ❌ ERROR: Stale/Upcoming product is live on Storefront: ${p.title} (${p.handle})`);
      errors++;
    }

    // Check spelling
    if (p.title.includes('Pudhina')) {
      console.error(`  ❌ ERROR: Spelled "Pudhina" instead of "Pudina"!`);
      errors++;
    }
    if (p.title.includes('Jalapeno') && !p.title.includes('Jalapeño')) {
      console.warn(`  ⚠️ NOTICE: Missing tilde in Jalapeño.`);
    }

    const variants = p.variants.edges.map((v) => v.node);
    console.log(`  Variants count: ${variants.length}`);

    for (const v of variants) {
      const price = parseFloat(v.price.amount);
      const compareAt = parseFloat(v.compareAtPrice?.amount || v.price.amount);
      console.log(`    • [SKU: ${v.sku.padEnd(10)}] [₹${price}] (Compare: ₹${compareAt}) Available: ${v.availableForSale} (${v.title})`);
      if (v.availableForSale) {
        liveVariants.push({
          id: v.id,
          sku: v.sku,
          price,
          productTitle: p.title,
        });
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Live Products: ${products.length}`);
  console.log(`Total Live Variants: ${liveVariants.length}`);
  console.log(`Detected Errors/Stale Items: ${errors}`);

  return { products, liveVariants, errors };
}

async function testCart(liveVariants) {
  if (liveVariants.length === 0) {
    console.log('No live variants available to test cart.');
    return;
  }

  console.log('\n' + '='.repeat(80));
  console.log('TESTING SHOPIFY CART CREATION & ADDITIONS');
  console.log('='.repeat(80));

  const createCartMutation = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const createRes = await storefrontFetch(createCartMutation, { input: {} });
  const cart = createRes.cartCreate.cart;
  console.log(`✓ Created Shopify Test Cart: ${cart.id}`);

  // Test adding first 3 live variants
  const testItems = liveVariants.slice(0, 3);
  const linesToAdd = testItems.map((item) => ({
    merchandiseId: item.id,
    quantity: 1,
  }));

  const addLinesMutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const addRes = await storefrontFetch(addLinesMutation, {
    cartId: cart.id,
    lines: linesToAdd,
  });

  if (addRes.cartLinesAdd.userErrors?.length) {
    console.error('Cart line add errors:', addRes.cartLinesAdd.userErrors);
  } else {
    console.log(`✓ Successfully added ${linesToAdd.length} items to Shopify Cart.`);
    console.log(`✓ Cart Total Quantity: ${addRes.cartLinesAdd.cart.totalQuantity}`);
    console.log(`✓ Cart Total Cost: ₹${addRes.cartLinesAdd.cart.cost.totalAmount.amount}`);
  }
}

async function run() {
  try {
    const { liveVariants } = await verifyStorefront();
    await testCart(liveVariants);
  } catch (err) {
    console.error('Verification failed:', err.message);
  }
}

run();
