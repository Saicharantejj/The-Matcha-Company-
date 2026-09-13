/**
 * Secure Admin API script to configure inventory & continueSelling on all 32 Chaska variants.
 * 
 * Run locally with:
 *   SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxx" node scripts/update-inventory.mjs
 * 
 * NEVER paste your Admin token in chat, git commits, or frontend client code.
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '502a8s-aj.myshopify.com';
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2026-07';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!ADMIN_TOKEN) {
  console.error('\n❌ ERROR: SHOPIFY_ADMIN_ACCESS_TOKEN is required.');
  console.error('Run command:');
  console.error('  SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxx" node scripts/update-inventory.mjs\n');
  process.exit(1);
}

const GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

async function adminFetch(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(' | '));
  }
  return json.data;
}

async function main() {
  console.log(`\nConnecting to Shopify Admin: ${SHOPIFY_DOMAIN}...`);

  // 1. Get primary inventory location
  const locQuery = `{
    locations(first: 5) {
      edges {
        node {
          id
          name
          isActive
        }
      }
    }
  }`;
  const locData = await adminFetch(locQuery);
  const location = locData.locations.edges.find((e) => e.node.isActive)?.node || locData.locations.edges[0]?.node;
  if (!location) {
    throw new Error('No active inventory location found.');
  }
  console.log(`Active Location: ${location.name} (${location.id})`);

  // 2. Fetch all products and variants
  const prodQuery = `{
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          variants(first: 50) {
            edges {
              node {
                id
                title
                sku
                inventoryPolicy
                inventoryItem {
                  id
                }
              }
            }
          }
        }
      }
    }
  }`;
  const prodData = await adminFetch(prodQuery);
  const products = prodData.products.edges;

  console.log(`Found ${products.length} products.`);

  const inventorySetQuantitiesInputs = [];

  for (const pEdge of products) {
    const prod = pEdge.node;
    console.log(`\nUpdating ${prod.title} (${prod.variants.edges.length} variants)...`);

    // Update variants to inventoryPolicy: CONTINUE
    const variantBulkInputs = prod.variants.edges.map((vEdge) => ({
      id: vEdge.node.id,
      inventoryPolicy: 'CONTINUE',
    }));

    const updateVariantsMutation = `
      mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          productVariants {
            id
            inventoryPolicy
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const updateRes = await adminFetch(updateVariantsMutation, {
      productId: prod.id,
      variants: variantBulkInputs,
    });

    if (updateRes.productVariantsBulkUpdate.userErrors?.length) {
      console.warn('User errors:', updateRes.productVariantsBulkUpdate.userErrors);
    } else {
      console.log(`  ✓ Policy set to CONTINUE for ${prod.variants.edges.length} variants`);
    }

    // Collect inventory items to set quantity to 10,000
    for (const vEdge of prod.variants.edges) {
      if (vEdge.node.inventoryItem?.id) {
        inventorySetQuantitiesInputs.push({
          inventoryItemId: vEdge.node.inventoryItem.id,
          locationId: location.id,
          quantity: 10000,
        });
      }
    }
  }

  // 3. Set inventory quantities in batches
  if (inventorySetQuantitiesInputs.length > 0) {
    console.log(`\nSetting inventory quantities to 10,000 for ${inventorySetQuantitiesInputs.length} inventory items...`);
    const setQtyMutation = `
      mutation inventorySetQuantities($input: InventorySetQuantitiesInput!) {
        inventorySetQuantities(input: $input) {
          inventoryAdjustmentGroup {
            createdAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Process in batches of 25
    for (let i = 0; i < inventorySetQuantitiesInputs.length; i += 25) {
      const batch = inventorySetQuantitiesInputs.slice(i, i + 25);
      const res = await adminFetch(setQtyMutation, {
        input: {
          name: 'available',
          reason: 'correction',
          ignoreCompareQuantity: true,
          quantities: batch,
        },
      });

      if (res.inventorySetQuantities?.userErrors?.length) {
        console.warn('Inventory set user errors:', res.inventorySetQuantities.userErrors);
      } else {
        console.log(`  ✓ Set quantities for batch ${i / 25 + 1}`);
      }
    }
  }

  console.log('\n✅ All variants successfully configured with inventory 10,000 and Continue Selling enabled!');
}

main().catch((err) => {
  console.error('\n❌ Execution failed:', err);
  process.exit(1);
});
