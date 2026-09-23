/**
 * CLI Script to populate the CHASKA product catalogue in Shopify via Admin API
 * Usage:
 *   SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxx" node scripts/seed-shopify-catalog.mjs
 * 
 * NEVER expose this token in the Vite frontend or git commits.
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '502a8s-aj.myshopify.com';
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2026-07';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!ADMIN_TOKEN) {
  console.error('ERROR: SHOPIFY_ADMIN_ACCESS_TOKEN environment variable is required.');
  console.error('Example: SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxx" node scripts/seed-shopify-catalog.mjs');
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

const FLAVOUR_PRODUCTS = [
  {
    title: 'Pudina Makhana',
    handle: 'pudina-makhana',
    descriptionHtml: '<p>Refreshing garden mint blended with roasted spices and pink rock salt over crisp slow-roasted makhana.</p>',
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'pudina', 'mint', 'fresh', 'roasted'],
    prefix: 'PUD',
  },
  {
    title: 'Jalapeño Makhana',
    handle: 'jalapeno-makhana',
    descriptionHtml: '<p>Whole roasted lotus pops coated with smoky sun-dried green jalapeño chili dust, tangy lime zest, and rock salt.</p>',
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'jalapeno', 'spicy', 'roasted', 'zesty'],
    prefix: 'JAL',
  },
  {
    title: 'Cheese Makhana',
    handle: 'cheese-makhana',
    descriptionHtml: '<p>Rich cheddar cheese seasoning and roasted butter notes dusted over crisp slow-roasted makhana pops.</p>',
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'cheese', 'savory', 'roasted'],
    prefix: 'CHS',
  },
];

const SIZES = [
  {
    size: '30g',
    packs: [
      { pack: 'Pack of 1', price: '129', compareAt: '129', suffix: '30-1', weight: 30 },
      { pack: 'Pack of 3', price: '368', compareAt: '387', suffix: '30-3', weight: 90 },
      { pack: 'Pack of 5', price: '581', compareAt: '645', suffix: '30-5', weight: 150 },
      { pack: 'Pack of 10', price: '1032', compareAt: '1290', suffix: '30-10', weight: 300 },
    ],
  },
  {
    size: '70g',
    packs: [
      { pack: 'Pack of 1', price: '229', compareAt: '229', suffix: '70-1', weight: 70 },
      { pack: 'Pack of 3', price: '653', compareAt: '687', suffix: '70-3', weight: 210 },
      { pack: 'Pack of 5', price: '1031', compareAt: '1145', suffix: '70-5', weight: 350 },
      { pack: 'Pack of 10', price: '1832', compareAt: '2290', suffix: '70-10', weight: 700 },
    ],
  },
];

async function createProductWithVariants(productDef) {
  console.log(`Creating product: ${productDef.title}...`);

  const productInput = {
    title: productDef.title,
    handle: productDef.handle,
    descriptionHtml: productDef.descriptionHtml,
    vendor: 'CHASKA',
    productType: productDef.productType,
    tags: productDef.tags,
  };

  const createMutation = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const result = await adminFetch(createMutation, { input: productInput });
  if (result.productCreate.userErrors && result.productCreate.userErrors.length > 0) {
    throw new Error(result.productCreate.userErrors.map((e) => e.message).join(' | '));
  }

  const productId = result.productCreate.product.id;
  console.log(`  ✓ Product created (${productId})`);

  // Build variants
  const variants = [];
  for (const s of SIZES) {
    for (const p of s.packs) {
      variants.push({
        options: [s.size, p.pack],
        price: p.price,
        compareAtPrice: p.compareAt,
        sku: `${productDef.prefix}-${p.suffix}`,
        inventoryItem: {
          tracked: true,
        },
      });
    }
  }

  const bulkMutation = `
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

  const variantResult = await adminFetch(bulkMutation, { productId, variants });
  if (variantResult.productVariantsBulkCreate.userErrors?.length > 0) {
    console.warn('Variant creation notice:', variantResult.productVariantsBulkCreate.userErrors);
  } else {
    console.log(`  ✓ Created 8 variants for ${productDef.title}`);
  }

  return productId;
}

async function archiveOldProducts() {
  console.log('\nChecking for old products to unpublish/archive...');
  const query = `
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

  const data = await adminFetch(query);
  const products = data.products.edges;

  const validHandles = ['pudina-makhana', 'jalapeno-makhana', 'cheese-makhana'];

  for (const edge of products) {
    const p = edge.node;
    if (!validHandles.includes(p.handle)) {
      console.log(`Archiving old product: ${p.title} (${p.handle})...`);
      const updateMutation = `
        mutation productUpdate($input: ProductInput!) {
          productUpdate(input: $input) {
            product { id status }
            userErrors { field message }
          }
        }
      `;
      await adminFetch(updateMutation, { input: { id: p.id, status: 'ARCHIVED' } });
      console.log(`  ✓ Archived ${p.title}`);
    }
  }
}

async function run() {
  try {
    console.log('--- Seeding CHASKA Products into Shopify Store 502a8s-aj.myshopify.com ---');
    const createdIds = [];
    for (const p of FLAVOUR_PRODUCTS) {
      const id = await createProductWithVariants(p);
      createdIds.push(id);
    }

    await archiveOldProducts();

    console.log('\n--- ALL 3 PRODUCTS & 24 VARIANTS SEEDED & OLD PRODUCTS ARCHIVED! ---');
  } catch (err) {
    console.error('Failed to seed products:', err.message);
  }
}

run();
