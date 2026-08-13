export interface Product {
  id: number
  name: string
  slug: string
  category: string
  price: number
  original_price?: number
  description: string
  tag?: string
  images: string[]
  fabric?: string
  fabric_tags?: string[]
  fit_notes?: string
  care?: string[]
  details?: string[]
  sold_out_sizes?: string[]
  is_active: boolean
  is_bestseller?: boolean
  sort_order?: number
}
