import type { Product } from '@/lib/types'

export const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// A product is fully sold out when every size is listed in sold_out_sizes.
// Case-insensitive, because older rows were entered as "Xs" or "XXXl".
export function isFullySoldOut(product: Pick<Product, 'sold_out_sizes'>): boolean {
  const soldOut = new Set((product.sold_out_sizes || []).map(s => s.trim().toUpperCase()))
  return ALL_SIZES.every(s => soldOut.has(s))
}
