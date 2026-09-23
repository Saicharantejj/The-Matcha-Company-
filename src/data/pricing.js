// Official Pricing & Variant Configurations for CHASKA
// Available sizes: 30g (₹129) and 70g (₹229)
// Packs available: Pack of 1 (0% OFF), Pack of 3 (5% OFF), Pack of 5 (10% OFF), Pack of 10 (20% OFF + BEST SELLER).
// All prices are rounded up whole integers without decimals as requested.

export const BASE_PRICES = {
  '30g': 129,
  '70g': 229,
}

export const OFFICIAL_WEIGHTS = [
  { id: '30g', label: '30g', title: '30g Pack', netGrams: 30, basePrice: 129, isDefault: true },
  { id: '70g', label: '70g', title: '70g Pack', netGrams: 70, basePrice: 229 },
]

export const PACK_OPTIONS = [
  {
    id: '1 Pack',
    count: 1,
    label: 'Single Pack',
    shortLabel: '1 Pack',
    subtitle: '1 Pouch',
    discountPercent: 0,
    discount: null,
  },
  {
    id: '3 Pack',
    count: 3,
    label: '3 Pack',
    shortLabel: '3 Pack',
    subtitle: '3 Pouches',
    discountPercent: 5,
    discount: '5% OFF',
    isDefault: true,
  },
  {
    id: '5 Pack',
    count: 5,
    label: '5 Pack',
    shortLabel: '5 Pack',
    subtitle: '5 Pouches',
    discountPercent: 10,
    discount: '10% OFF',
  },
  {
    id: '10 Pack',
    count: 10,
    label: '10 Pack',
    shortLabel: '10 Pack',
    subtitle: '10 Pouches',
    discountPercent: 20,
    discount: '20% OFF',
    isBestSeller: true,
    badge: 'BEST SELLER',
  },
]

/**
 * Calculates pack pricing dynamically from the individual pack price and the applicable discount.
 * Rounded up to whole integers (no decimals).
 */
export function calculatePackPrice(basePrice, count, discountPercent = 0) {
  const rawTotal = basePrice * count
  if (!discountPercent) return rawTotal
  const discounted = rawTotal * (1 - discountPercent / 100)
  return Math.ceil(discounted)
}

export const PRICING_MATRIX = {
  '30g': {
    '1 Pack': {
      packCount: 1,
      price: 129,
      mrp: 129,
      discount: null,
      savings: 0,
      perPack: 129,
      isBestSeller: false,
    },
    '3 Pack': {
      packCount: 3,
      price: 368, // 129 * 3 with 5% discount = 367.65 rounded up
      mrp: 387, // 129 * 3
      discount: '5% OFF',
      savings: 19,
      perPack: 123,
      isBestSeller: false,
    },
    '5 Pack': {
      packCount: 5,
      price: 581, // 129 * 5 with 10% discount = 580.50 rounded up
      mrp: 645, // 129 * 5
      discount: '10% OFF',
      savings: 64,
      perPack: 117,
      isBestSeller: false,
    },
    '10 Pack': {
      packCount: 10,
      price: 1032, // 129 * 10 with 20% discount = 1032
      mrp: 1290, // 129 * 10
      discount: '20% OFF',
      savings: 258,
      perPack: 104,
      isBestSeller: true,
      badge: 'BEST SELLER',
    },
  },
  '70g': {
    '1 Pack': {
      packCount: 1,
      price: 229,
      mrp: 229,
      discount: null,
      savings: 0,
      perPack: 229,
      isBestSeller: false,
    },
    '3 Pack': {
      packCount: 3,
      price: 653, // 229 * 3 with 5% discount = 652.65 rounded up
      mrp: 687, // 229 * 3
      discount: '5% OFF',
      savings: 34,
      perPack: 218,
      isBestSeller: false,
    },
    '5 Pack': {
      packCount: 5,
      price: 1031, // 229 * 5 with 10% discount = 1030.50 rounded up
      mrp: 1145, // 229 * 5
      discount: '10% OFF',
      savings: 114,
      perPack: 207,
      isBestSeller: false,
    },
    '10 Pack': {
      packCount: 10,
      price: 1832, // 229 * 10 with 20% discount = 1832
      mrp: 2290, // 229 * 10
      discount: '20% OFF',
      savings: 458,
      perPack: 184,
      isBestSeller: true,
      badge: 'BEST SELLER',
    },
  },
}

export function getPricing(weight = '30g', pack = '3 Pack') {
  const normWeight = String(weight).toLowerCase().includes('70') ? '70g' : '30g'
  const packNum = parseInt(String(pack).match(/\d+/)?.[0] || '3', 10)
  const matchPack = PACK_OPTIONS.find((p) => p.count === packNum)?.id || (
    PACK_OPTIONS.find((p) => p.id === pack)?.id || '3 Pack'
  )

  return PRICING_MATRIX[normWeight][matchPack] || PRICING_MATRIX['30g']['3 Pack']
}

export function getTotalWeightGrams(weight = '30g', pack = '3 Pack') {
  const normWeight = String(weight).toLowerCase().includes('70') ? 70 : 30
  const packNum = parseInt(String(pack).match(/\d+/)?.[0] || '3', 10)
  const matchCount = PACK_OPTIONS.find((p) => p.count === packNum)?.count || 3
  return normWeight * matchCount
}
