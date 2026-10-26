// lib/analytics.ts — sends each event to Google Analytics 4 (G-KZZHYERXN7)
// and the matching standard event to the Meta pixel.
// Safe to call anywhere: does nothing if a tracker hasn't loaded (e.g. an ad blocker).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

const META_EVENTS: Record<string, string> = {
  view_item: 'ViewContent',
  add_to_cart: 'AddToCart',
  begin_checkout: 'InitiateCheckout',
  purchase: 'Purchase',
  generate_lead: 'Lead',
}

type GaItem = { item_id: string; item_name: string; price: number; quantity: number; item_variant?: string }

function metaParams(params: Record<string, unknown>) {
  const items = (params.items as GaItem[] | undefined) || []
  const out: Record<string, unknown> = { currency: params.currency || 'INR' }
  if (typeof params.value === 'number') out.value = params.value
  if (items.length) {
    out.content_type = 'product'
    out.content_ids = items.map(i => i.item_id)
    out.contents = items.map(i => ({ id: i.item_id, quantity: i.quantity, item_price: i.price }))
    out.content_name = items.map(i => i.item_name).join(', ')
    out.num_items = items.reduce((s, i) => s + (i.quantity || 1), 0)
  } else if (params.item_name) {
    out.content_name = params.item_name
  }
  return out
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') window.gtag('event', event, params)
  const metaEvent = META_EVENTS[event]
  if (metaEvent && typeof window.fbq === 'function') {
    const eventID = typeof params.transaction_id === 'string' ? params.transaction_id : undefined
    window.fbq('track', metaEvent, metaParams(params), eventID ? { eventID } : undefined)
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
