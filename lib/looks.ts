// lib/looks.ts — query helpers for the Identity → Look → Wardrobe layer.
// Read-only. Reuses the existing supabase client and Product type.

import { supabase } from './supabase'
import type { Product } from './types'

export interface Identity {
  id: string
  name: string
  short_line?: string
  description?: string
  editorial_image?: string
  display_order?: number
  is_active?: boolean
}

export interface Look {
  id: number
  name: string
  slug: string
  description?: string
  why_it_works?: string
  hero_image?: string
  occasions?: string[]
  is_active?: boolean
  sort_order?: number
  products: Product[]      // hydrated, in sort_order
  identities: string[]     // identity ids, e.g. ['confident','authoritative']
}

// ── Identities ────────────────────────────────────────────────────────────
export async function getIdentities(): Promise<Identity[]> {
  const { data } = await supabase
    .from('identities')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  return data || []
}

export async function getIdentity(id: string): Promise<Identity | null> {
  const { data } = await supabase.from('identities').select('*').eq('id', id).single()
  return data
}

// ── Internal: hydrate a set of look rows with products + identity ids ──────
async function hydrateLooks(lookRows: any[]): Promise<Look[]> {
  if (!lookRows.length) return []
  const lookIds = lookRows.map(l => l.id)

  const [{ data: lp }, { data: li }] = await Promise.all([
    supabase.from('look_products').select('look_id, product_id, sort_order').in('look_id', lookIds),
    supabase.from('look_identities').select('look_id, identity_id').in('look_id', lookIds),
  ])

  const productIds = Array.from(new Set((lp || []).map(r => r.product_id)))
  const { data: products } = await supabase
    .from('products').select('*').in('id', productIds).eq('is_active', true)
  const productById = new Map((products || []).map(p => [p.id, p as Product]))

  return lookRows.map(look => {
    const pieceRows = (lp || [])
      .filter(r => r.look_id === look.id)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    const products = pieceRows
      .map(r => productById.get(r.product_id))
      .filter((p): p is Product => Boolean(p))   // drop inactive/missing pieces safely
    const identities = (li || [])
      .filter(r => r.look_id === look.id)
      .map(r => r.identity_id)
    return { ...look, products, identities }
  })
}

// ── Looks for one identity (the Identity Edit page) ────────────────────────
export async function getLooksByIdentity(identityId: string): Promise<Look[]> {
  const { data: rows } = await supabase
    .from('look_identities')
    .select('look_id')
    .eq('identity_id', identityId)
  const ids = (rows || []).map(r => r.look_id)
  if (!ids.length) return []

  const { data: lookRows } = await supabase
    .from('looks').select('*').in('id', ids).eq('is_active', true)
    .order('sort_order', { ascending: true })
  return hydrateLooks(lookRows || [])
}

// ── One look by slug (the Look Detail page) ────────────────────────────────
export async function getLook(slug: string): Promise<Look | null> {
  const { data: lookRow } = await supabase
    .from('looks').select('*').eq('slug', slug).eq('is_active', true).single()
  if (!lookRow) return null
  const [look] = await hydrateLooks([lookRow])
  return look || null
}

// ── All looks containing a given product ("Ways to show up" on PDP) ─────────
export async function getLooksForProduct(productId: number): Promise<Look[]> {
  const { data: rows } = await supabase
    .from('look_products').select('look_id').eq('product_id', productId)
  const ids = (rows || []).map(r => r.look_id)
  if (!ids.length) return []

  const { data: lookRows } = await supabase
    .from('looks').select('*').in('id', ids).eq('is_active', true)
    .order('sort_order', { ascending: true })
  return hydrateLooks(lookRows || [])
}

// ── All looks (Shop the Wardrobe) ──────────────────────────────────────────
export async function getAllLooks(): Promise<Look[]> {
  const { data: lookRows } = await supabase
    .from('looks').select('*').eq('is_active', true)
    .order('sort_order', { ascending: true })
  return hydrateLooks(lookRows || [])
}
