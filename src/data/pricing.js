// Official Pricing & Variant Configurations for CHASKA
// Official Weights: 70g (standard jumbo pouch) & 30g (snack pouch). (No 50g).
// Packs available: 1 Pack, 3 Pack (default), 5 Pack, 10 Pack.

export const OFFICIAL_WEIGHTS = [
  { id: '70g', label: '70g', title: '70g Jumbo Pouch', badge: 'STANDARD', netGrams: 70 },
  { id: '30g', label: '30g', title: '30g Snack Pouch', badge: 'TRIAL SIZE', netGrams: 30 },
]

export const PACK_OPTIONS = [
  { id: '1 Pack', count: 1, label: '1 Pack', subtitle: 'Single Pouch' },
  { id: '3 Pack', count: 3, label: '3 Pack', subtitle: 'Most Popular', badge: 'POPULAR', isDefault: true },
  { id: '5 Pack', count: 5, label: '5 Pack', subtitle: 'Stash Saver', badge: 'SAVE BIG' },
  { id: '10 Pack', count: 10, label: '10 Pack', subtitle: 'Family Value', badge: 'BEST VALUE' },
]

export const PRICING_MATRIX = {
  '70g': {
    '1 Pack': {
      packCount: 1,
      price: 199,
      mrp: 219,
      discount: '9% OFF',
      savings: 20,
      perPack: 199,
      tag: 'Single Pouch',
    },
    '3 Pack': {
      packCount: 3,
      price: 569,
      mrp: 657, // 3 * 219
      baseline: 597, // 3 * 199
      discount: 'SAVE ₹28 (13% OFF)',
      savings: 88,
      perPack: 190,
      badge: 'MOST POPULAR',
      tag: 'Save ₹28 vs Single',
    },
    '5 Pack': {
      packCount: 5,
      price: 899,
      mrp: 1095, // 5 * 219
      baseline: 995, // 5 * 199
      discount: 'SAVE ₹96 (18% OFF)',
      savings: 196,
      perPack: 180,
      badge: 'SAVE ₹96',
      tag: 'Save ₹96 vs Single',
    },
    '10 Pack': {
      packCount: 10,
      price: 1799,
      mrp: 2190, // 10 * 219
      baseline: 1990, // 10 * 199
      discount: 'SAVE ₹191 (18% OFF)',
      savings: 391,
      perPack: 180,
      badge: 'BEST VALUE',
      tag: 'Save ₹191 vs Single',
    },
  },
  '30g': {
    '1 Pack': {
      packCount: 1,
      price: 99,
      mrp: 119,
      discount: '17% OFF',
      savings: 20,
      perPack: 99,
      tag: 'Trial Pouch',
    },
    '3 Pack': {
      packCount: 3,
      price: 285,
      mrp: 357, // 3 * 119
      baseline: 297, // 3 * 99
      discount: 'SAVE ₹12 (20% OFF)',
      savings: 72,
      perPack: 95,
      badge: 'MOST POPULAR',
      tag: 'Save ₹12 vs Single',
    },
    '5 Pack': {
      packCount: 5,
      price: 449,
      mrp: 595, // 5 * 119
      baseline: 495, // 5 * 99
      discount: 'SAVE ₹46 (25% OFF)',
      savings: 146,
      perPack: 90,
      badge: 'SAVE ₹46',
      tag: 'Save ₹46 vs Single',
    },
    '10 Pack': {
      packCount: 10,
      price: 849,
      mrp: 1190, // 10 * 119
      baseline: 990, // 10 * 99
      discount: 'SAVE ₹141 (29% OFF)',
      savings: 341,
      perPack: 85,
      badge: 'BEST VALUE',
      tag: 'Save ₹141 vs Single',
    },
  },
}

export function getPricing(weight = '70g', pack = '3 Pack') {
  const normWeight = String(weight).toLowerCase().includes('30') ? '30g' : '70g'
  const matchPack = PACK_OPTIONS.find(
    (p) => p.id === pack || String(pack).includes(String(p.count))
  )?.id || '3 Pack'

  return PRICING_MATRIX[normWeight][matchPack] || PRICING_MATRIX['70g']['3 Pack']
}

export function getTotalWeightGrams(weight = '70g', pack = '3 Pack') {
  const normWeight = String(weight).toLowerCase().includes('30') ? 30 : 70
  const matchPack = PACK_OPTIONS.find(
    (p) => p.id === pack || String(pack).includes(String(p.count))
  )?.count || 3
  return normWeight * matchPack
}

