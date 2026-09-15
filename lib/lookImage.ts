// lib/lookImage.ts
import type { Product } from './types'

export function lookImageFor(p: Product): string | undefined {
  return (p as any).flat_image || p.images?.[0]
}
