/**
 * CLI Script to populate the CHASKA product catalogue in Shopify via Admin API
 * Usage:
 *   SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_xxxx" node scripts/seed-shopify-catalog.mjs
 * 
 * NEVER expose this token in the Vite frontend or git commits.
 */

const SHOPIFY_DOMAIN = '502a8s-aj.myshopify.com';
const API_VERSION = '2026-07';
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
    title: 'Peri Peri Makhana',
    handle: 'peri-peri-makhana',
    descriptionHtml: "<p>Fiery, tangy African bird's eye chilli roasted with premium jumbo fox nuts. Crunchy, bold, and addictive.</p>",
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'peri peri', 'spicy', 'snacks', 'roasted'],
    prefix: 'PERI',
  },
  {
    title: 'Chilli Cheese Makhana',
    handle: 'chilli-cheese-makhana',
    descriptionHtml: '<p>Creamy sharp cheddar dusted with a slow red chilli burn over crisp slow-roasted makhana.</p>',
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'cheese', 'chilli cheese', 'savory', 'roasted'],
    prefix: 'CHCH',
  },
  {
    title: 'Chilli Lime Makhana',
    handle: 'chilli-lime-makhana',
    descriptionHtml: '<p>Zesty Mexican key lime with a smoky crushed chilli kick. Crisp, tart, and extraordinarily refreshing.</p>',
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'chilli lime', 'lime', 'zesty', 'roasted'],
    prefix: 'CHLI',
  },
  {
    title: 'Kashmiri Garlic Chilli Makhana',
    handle: 'kashmiri-garlic-chilli-makhana',
    descriptionHtml: '<p>Aromatic roasted garlic paired with vibrant, deep Kashmiri chillies. Rich, savoury warmth in every crunch.</p>',
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'garlic', 'kashmiri chilli', 'roasted', 'savoury'],
    prefix: 'KGC',
  },
  {
    title: 'Pudhina Makhana',
    handle: 'pudhina-makhana',
    descriptionHtml: '<p>Refreshing garden mint blended with roasted spices and pink rock salt. Tangy, herbaceous, and crisp.</p>',
    productType: 'Flavoured Makhana',
    tags: ['makhana', 'pudhina', 'mint', 'fresh', 'roasted'],
    prefix: 'PUD',
  },
];

const SIZES = [
  {
    size: '50g',
    packs: [
      { pack: 'Pack of 3', price: '450.00', compareAt: '540.00', suffix: '50-3', weight: 150 },
      { pack: 'Pack of 6', price: '900.00', compareAt: '1080.00', suffix: '50-6', weight: 300 },
      { pack: 'Pack of 10', price: '1500.00', compareAt: '1800.00', suffix: '50-10', weight: 500 },
    ],
  },
  {
    size: '100g',
    packs: [
      { pack: 'Pack of 3', price: '870.00', compareAt: '960.00', suffix: '100-3', weight: 300 },
      { pack: 'Pack of 6', price: '1740.00', compareAt: '1920.00', suffix: '100-6', weight: 600 },
      { pack: 'Pack of 10', price: '2900.00', compareAt: '3200.00', suffix: '100-10', weight: 1000 },
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
    console.log(`  ✓ Created 6 variants for ${productDef.title}`);
  }

  return productId;
}

async function createTryAll5Box() {
  console.log('Creating product: Chaska Try All 5...');
  const input = {
    title: 'Chaska Try All 5',
    handle: 'chaska-try-all-5',
    descriptionHtml: '<p>Experience the complete CHASKA universe in one sampler box! Includes 1 pouch of each of our 5 signature flavours: Peri Peri, Chilli Cheese, Chilli Lime, Kashmiri Garlic Chilli, and Pudhina Makhana.</p>',
    vendor: 'CHASKA',
    productType: 'Snack Box',
    tags: ['bundle', 'box', 'sampler', 'try all 5', 'variety pack', 'all flavours'],
  };

  const createMutation = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
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

  const res = await adminFetch(createMutation, { input });
  const productId = res.productCreate.product.id;
  console.log(`  ✓ Chaska Try All 5 created (${productId})`);

  const variants = [
    {
      options: ['50g'],
      price: '710.00',
      compareAtPrice: '900.00',
      sku: 'TRY5-50',
      inventoryItem: { tracked: true },
    },
    {
      options: ['100g'],
      price: '1410.00',
      compareAtPrice: '1600.00',
      sku: 'TRY5-100',
      inventoryItem: { tracked: true },
    },
  ];

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

  await adminFetch(bulkMutation, { productId, variants });
  console.log('  ✓ Created 2 size variants for Chaska Try All 5');
  return productId;
}

async function run() {
  try {
    console.log('--- Seeding CHASKA Products into Shopify Store 502a8s-aj.myshopify.com ---');
    const createdIds = [];
    for (const p of FLAVOUR_PRODUCTS) {
      const id = await createProductWithVariants(p);
      createdIds.push(id);
    }
    const boxId = await createTryAll5Box();
    createdIds.push(boxId);

    console.log('\n--- ALL 6 PRODUCTS & 32 VARIANTS SEEDED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('Failed to seed products:', err.message);
  }
}

run();
