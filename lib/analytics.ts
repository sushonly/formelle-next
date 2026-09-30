// lib/analytics.ts — sends events to Google Analytics 4 (G-KZZHYERXN7).
// Safe to call anywhere: does nothing if GA hasn't loaded (e.g. an ad blocker).

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export function gaItem(p: { id: number | string; name: string; price: number; size?: string | null; qty?: number; category?: string }) {
  return {
    item_id: String(p.id),
    item_name: p.name,
    price: p.price,
    quantity: p.qty ?? 1,
    ...(p.size ? { item_variant: p.size } : {}),
    ...(p.category ? { item_category: p.category } : {}),
  }
}

export function newOrderRef() {
  return `FM-${Date.now().toString(36).toUpperCase()}`
}
