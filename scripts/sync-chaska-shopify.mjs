/**
 * Complete Catalogue Synchronization Script for CHASKA Shopify Store
 * 
 * Synchronizes the 3 live flavours (Pudina, Jalapeño, Cheese) with 30g (₹129) and 70g (₹229)
 * and all 4 pack sizes (1, 3, 5, 10) with exact pack discounts:
 *   - Pack of 1: 0% OFF
 *   - Pack of 3: 5% OFF
 *   - Pack of 5: 10% OFF
 *   - Pack of 10: 20% OFF (BEST SELLER)
 * 
 * Sets upcoming flavours (Kashmiri Garlic Chilli, Peri Peri) to DRAFT (hidden/unpurchasable).
 * Archives obsolete products (Chaska Try All 5).
 * 
 * Usage:
 *   SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxx" node scripts/sync-chaska-shopify.mjs
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '502a8s-aj.myshopify.com';
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2026-07';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!ADMIN_TOKEN) {
  console.error('\n❌ ERROR: SHOPIFY_ADMIN_ACCESS_TOKEN environment variable is required.');
  console.error('Run:');
  console.error('  SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxx" node scripts/sync-chaska-shopify.mjs\n');
  process.exit(1);
}

const ADMIN_URL = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;
const STOREFRONT_TOKEN = '6c334c5390bc96116263fbe9dd00a04d';
const STOREFRONT_URL = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function adminFetch(query, variables = {}) {
  const response = await fetch(ADMIN_URL, {
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

const LIVE_TARGETS = [
  {
    targetId: 'gid://shopify/Product/8725847900321', // Pudhina Makhana
    title: 'Pudina',
    handle: 'pudina',
    aliasHandle: 'pudina-makhana',
    descriptionHtml: '<p>Refreshing garden mint blended with roasted spices and pink rock salt over crisp slow-roasted makhana.</p>',
    tags: ['makhana', 'pudina', 'mint', 'fresh', 'roasted'],
    prefix: 'PUD',
  },
  {
    targetId: 'gid://shopify/Product/8725847834785', // Chilli Lime Makhana
    title: 'Jalapeño',
    handle: 'jalapeno',
    aliasHandle: 'jalapeno-makhana',
    descriptionHtml: '<p>Whole roasted lotus pops coated with smoky sun-dried green jalapeño chili dust, tangy lime zest, and rock salt.</p>',
    tags: ['makhana', 'jalapeno', 'spicy', 'roasted', 'zesty'],
    prefix: 'JAL',
  },
  {
    targetId: 'gid://shopify/Product/8725847802017', // Chilli Cheese Makhana
    title: 'Cheese',
    handle: 'cheese',
    aliasHandle: 'cheese-makhana',
    descriptionHtml: '<p>Rich cheddar cheese seasoning and roasted butter notes dusted over crisp slow-roasted makhana pops.</p>',
    tags: ['makhana', 'cheese', 'savory', 'roasted'],
    prefix: 'CHS',
  },
];

const SIZES = [
  {
    size: '30g',
    packs: [
      { pack: 'Pack of 1', price: '129.00', compareAt: '129.00', suffix: '30-1', weight: 30 },
      { pack: 'Pack of 3', price: '368.00', compareAt: '387.00', suffix: '30-3', weight: 90 },
      { pack: 'Pack of 5', price: '581.00', compareAt: '645.00', suffix: '30-5', weight: 150 },
      { pack: 'Pack of 10', price: '1032.00', compareAt: '1290.00', suffix: '30-10', weight: 300 },
    ],
  },
  {
    size: '70g',
    packs: [
      { pack: 'Pack of 1', price: '229.00', compareAt: '229.00', suffix: '70-1', weight: 70 },
      { pack: 'Pack of 3', price: '653.00', compareAt: '687.00', suffix: '70-3', weight: 210 },
      { pack: 'Pack of 5', price: '1031.00', compareAt: '1145.00', suffix: '70-5', weight: 350 },
      { pack: 'Pack of 10', price: '1832.00', compareAt: '2290.00', suffix: '70-10', weight: 700 },
    ],
  },
];

async function syncProduct(target) {
  console.log(`\n======================================================`);
  console.log(`Synchronizing Live Product: ${target.title} (${target.targetId})`);
  console.log(`======================================================`);

  // 1. Fetch current product state and variant IDs
  const getProductQuery = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        status
        variants(first: 50) {
          edges {
            node {
              id
              title
              sku
            }
          }
        }
      }
    }
  `;

  const prodData = await adminFetch(getProductQuery, { id: target.targetId });
  const existingProduct = prodData.product;
  if (!existingProduct) {
    throw new Error(`Product ${target.targetId} not found in Shopify!`);
  }

  console.log(`Current Title: "${existingProduct.title}", Handle: "${existingProduct.handle}", Status: ${existingProduct.status}`);
  console.log(`Existing Variants: ${existingProduct.variants.edges.length}`);

  // 2. Update Product Title, Description, Tags, Status to ACTIVE
  const updateProductMutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          title
          handle
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const updateRes = await adminFetch(updateProductMutation, {
    input: {
      id: target.targetId,
      title: target.title,
      descriptionHtml: target.descriptionHtml,
      tags: target.tags,
      status: 'ACTIVE',
    },
  });

  if (updateRes.productUpdate.userErrors?.length) {
    console.warn('Update product warnings:', updateRes.productUpdate.userErrors);
  } else {
    console.log(`✓ Product title updated to "${target.title}" and status set to ACTIVE.`);
  }

  // 3. Prepare new 8 variants
  const newVariants = [];
  for (const s of SIZES) {
    for (const p of s.packs) {
      newVariants.push({
        options: [s.size, p.pack],
        price: p.price,
        compareAtPrice: p.compareAt,
        sku: `${target.prefix}-${p.suffix}`,
        inventoryPolicy: 'CONTINUE',
        inventoryItem: {
          tracked: true,
        },
      });
    }
  }

  // 4. Create new variants
  console.log(`Creating 8 official variants (30g & 70g) for ${target.title}...`);
  const bulkCreateMutation = `
    mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkCreate(productId: $productId, variants: $variants) {
        productVariants {
          id
          title
          sku
          price
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const bulkRes = await adminFetch(bulkCreateMutation, {
    productId: target.targetId,
    variants: newVariants,
  });

  if (bulkRes.productVariantsBulkCreate.userErrors?.length) {
    console.warn('Bulk variant creation warnings:', bulkRes.productVariantsBulkCreate.userErrors);
  } else {
    console.log(`✓ Successfully created 8 new variants.`);
  }

  // 5. Delete obsolete old variants
  const oldVariantIds = existingProduct.variants.edges.map((e) => e.node.id);
  if (oldVariantIds.length > 0) {
    console.log(`Removing ${oldVariantIds.length} obsolete variants from ${target.title}...`);
    const bulkDeleteMutation = `
      mutation productVariantsBulkDelete($productId: ID!, $variantsIds: [ID!]!) {
        productVariantsBulkDelete(productId: $productId, variantsIds: $variantsIds) {
          product {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const delRes = await adminFetch(bulkDeleteMutation, {
        productId: target.targetId,
        variantsIds: oldVariantIds,
      });
      if (delRes.productVariantsBulkDelete.userErrors?.length) {
        console.warn('Delete warnings:', delRes.productVariantsBulkDelete.userErrors);
      } else {
        console.log(`✓ Obsolete variants removed.`);
      }
    } catch (err) {
      console.warn(`Could not bulk delete old variants directly (${err.message}). Proceeding.`);
    }
  }
}

async function hideUpcomingAndArchiveObsolete() {
  console.log(`\n======================================================`);
  console.log(`Managing Non-Live & Obsolete Products in Shopify`);
  console.log(`======================================================`);

  const listQuery = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            status
          }
        }
      }
    }
  `;

  const data = await adminFetch(listQuery);
  const products = data.products.edges.map((e) => e.node);

  const liveIds = LIVE_TARGETS.map((t) => t.targetId);

  for (const p of products) {
    if (liveIds.includes(p.id)) continue;

    const isUpcoming =
      p.handle.includes('peri-peri') ||
      p.handle.includes('garlic') ||
      p.handle.includes('kashmiri') ||
      p.handle.includes('chocolate');

    if (isUpcoming) {
      console.log(`Setting Upcoming Flavour to DRAFT (unpurchasable): ${p.title} (${p.id})...`);
      const draftMutation = `
        mutation productUpdate($input: ProductInput!) {
          productUpdate(input: $input) {
            product { id status }
            userErrors { field message }
          }
        }
      `;
      await adminFetch(draftMutation, {
        input: { id: p.id, status: 'DRAFT' },
      });
      console.log(`✓ Set to DRAFT: ${p.title}`);
    } else {
      console.log(`Archiving Obsolete Product: ${p.title} (${p.id})...`);
      const archiveMutation = `
        mutation productUpdate($input: ProductInput!) {
          productUpdate(input: $input) {
            product { id status }
            userErrors { field message }
          }
        }
      `;
      await adminFetch(archiveMutation, {
        input: { id: p.id, status: 'ARCHIVED' },
      });
      console.log(`✓ Archived: ${p.title}`);
    }
  }
}

async function verifyStorefront() {
  console.log(`\n======================================================`);
  console.log(`VERIFYING SHOPIFY STOREFRONT API AS SINGLE SOURCE OF TRUTH`);
  console.log(`======================================================`);

  const verifyQuery = `{
    products(first: 20) {
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
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }`;

  const res = await storefrontFetch(verifyQuery);
  const prods = res.products.edges.map((e) => e.node);

  console.log(`Total Live Products returned by Storefront API: ${prods.length}\n`);

  for (const p of prods) {
    console.log(`PRODUCT: ${p.title} (${p.handle}) - Live & Available: ${p.availableForSale}`);
    console.log(`Variants count: ${p.variants.edges.length}`);
    for (const vEdge of p.variants.edges) {
      const v = vEdge.node;
      console.log(`  • ${v.title.padEnd(20)} | SKU: ${v.sku.padEnd(12)} | Price: ₹${v.price.amount} | Available: ${v.availableForSale}`);
    }
    console.log('');
  }
}

async function run() {
  try {
    console.log(`--- Starting CHASKA Shopify Catalogue Synchronization ---`);
    console.log(`Store: ${SHOPIFY_DOMAIN}`);
    console.log(`Admin API Version: ${API_VERSION}`);

    for (const target of LIVE_TARGETS) {
      await syncProduct(target);
    }

    await hideUpcomingAndArchiveObsolete();

    await verifyStorefront();

    console.log('\n🎉 Shopify catalogue is now synchronized with the current CHASKA website.');
  } catch (err) {
    console.error('\n❌ Synchronization error:', err);
    process.exit(1);
  }
}

run();
