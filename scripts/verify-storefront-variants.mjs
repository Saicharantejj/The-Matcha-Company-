/**
 * Automated Verification Script for Shopify Catalogue & Cart
 * Checks:
 *  1. All 32 variants via Storefront API (SKU, price, availableForSale)
 *  2. Adds the 4 requested variants to a real Shopify Cart:
 *     - Peri Peri 50g Pack of 3
 *     - Peri Peri 100g Pack of 10
 *     - Chaska Try All 5 50g
 *     - Chaska Try All 5 100g
 */

const SHOPIFY_DOMAIN = '502a8s-aj.myshopify.com';
const API_VERSION = '2026-07';
const STOREFRONT_TOKEN = '6c334c5390bc96116263fbe9dd00a04d';

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

async function verifyAllVariants() {
  console.log('='.repeat(80));
  console.log('VERIFYING ALL 32 VARIANTS VIA STOREFRONT API');
  console.log('Store:', SHOPIFY_DOMAIN);
  console.log('API Version:', API_VERSION);
  console.log('='.repeat(80));

  const query = `{
    products(first: 20) {
      edges {
        node {
          title
          handle
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
              }
            }
          }
        }
      }
    }
  }`;

  const data = await storefrontFetch(query);
  const products = data.products.edges;

  let totalVariants = 0;
  let totalAvailable = 0;
  const variantMap = new Map();

  console.log(`\nFound ${products.length} products in Shopify:\n`);

  for (const p of products) {
    console.log(`Product: ${p.node.title} (${p.node.handle})`);
    for (const v of p.node.variants.edges) {
      const { id, title, sku, availableForSale, price } = v.node;
      totalVariants++;
      if (availableForSale) totalAvailable++;
      variantMap.set(sku, { id, title, productTitle: p.node.title, availableForSale, price });

      const status = availableForSale ? '✅ availableForSale: true' : '❌ availableForSale: false';
      console.log(`   • [SKU: ${sku.padEnd(12)}] [₹${parseFloat(price.amount).toString().padEnd(6)}] [${status}] (${title})`);
    }
    console.log('');
  }

  console.log('='.repeat(80));
  console.log(`Total Variants: ${totalVariants}`);
  console.log(`Available Variants: ${totalAvailable} / ${totalVariants}`);
  console.log('='.repeat(80));

  return { totalVariants, totalAvailable, variantMap };
}

async function testCartAdditions(variantMap) {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING SHOPIFY CART CREATION & ADDITIONS');
  console.log('='.repeat(80));

  const testSkus = [
    { sku: 'PERI-50-3', label: '1. Peri Peri 50g Pack of 3' },
    { sku: 'PERI-100-10', label: '2. Peri Peri 100g Pack of 10' },
    { sku: 'TRY5-50', label: '3. Chaska Try All 5 50g' },
    { sku: 'TRY5-100', label: '4. Chaska Try All 5 100g' },
  ];

  // 1. Create a cart
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
  console.log(`Created Shopify Test Cart: ${cart.id}\n`);

  const linesToAdd = [];

  for (const item of testSkus) {
    const variant = variantMap.get(item.sku);
    if (!variant) {
      console.error(`❌ SKU ${item.sku} not found in Shopify catalogue!`);
      continue;
    }
    console.log(`Testing: ${item.label}`);
    console.log(`  - Variant ID: ${variant.id}`);
    console.log(`  - SKU: ${item.sku}`);
    console.log(`  - Price: ₹${variant.price.amount}`);
    console.log(`  - AvailableForSale: ${variant.availableForSale}`);

    linesToAdd.push({
      merchandiseId: variant.id,
      quantity: 1,
    });
  }

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
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    sku
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  console.log('\nSending cartLinesAdd mutation to Shopify Storefront API...');
  const addRes = await storefrontFetch(addLinesMutation, {
    cartId: cart.id,
    lines: linesToAdd,
  });

  const cartLinesAdd = addRes.cartLinesAdd;
  if (cartLinesAdd.userErrors && cartLinesAdd.userErrors.length > 0) {
    console.error('\n❌ Cart User Errors:');
    for (const err of cartLinesAdd.userErrors) {
      console.error(`  - [${err.code || 'ERROR'}] ${err.field}: ${err.message}`);
    }
    return false;
  }

  const updatedCart = cartLinesAdd.cart;
  const expectedQty = linesToAdd.reduce((sum, l) => sum + l.quantity, 0);
  const actualQty = updatedCart.totalQuantity;

  console.log('\nCart Response Summary:');
  console.log(`  - Total Items in Cart: ${actualQty} (Expected: ${expectedQty})`);
  console.log(`  - Total Cart Amount: ₹${updatedCart.cost.totalAmount.amount} ${updatedCart.cost.totalAmount.currencyCode}`);
  console.log('\nCart Items:');
  for (const line of updatedCart.lines.edges) {
    const m = line.node.merchandise;
    console.log(`  • ${m.product.title} (${m.title}) | SKU: ${m.sku} | Qty: ${line.node.quantity}`);
  }

  if (actualQty !== expectedQty) {
    console.error(`\n❌ Cart addition rejected by Shopify: expected ${expectedQty} items, got ${actualQty}.`);
    return false;
  }

  console.log('\n✅ All requested items were successfully added to the Shopify Cart!');
  return true;
}

async function run() {
  const { totalVariants, totalAvailable, variantMap } = await verifyAllVariants();
  const cartSuccess = await testCartAdditions(variantMap);

  console.log('\n' + '='.repeat(80));
  if (totalAvailable === 32 && cartSuccess) {
    console.log('🎉 AUDIT COMPLETE: ALL 32 VARIANTS AVAILABLE & CART TEST PASSED!');
  } else {
    console.log(`⚠️ AUDIT RESULT: ${totalAvailable} / ${totalVariants} variants available.`);
    console.log(`Cart test status: ${cartSuccess ? 'SUCCESS' : 'FAILED (items unavailable)'}`);
  }
  console.log('='.repeat(80) + '\n');
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
