// lib/funnel.ts — anonymous shopper id + checkout step logging to Supabase.
// Never blocks the shopper: every save is fire-and-forget.
import { supabase } from './supabase'

const SESSION_KEY = 'formelle_sid'

// Anonymous id kept on the device, so one shopper's add, checkout and order link up even across days
export function sessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY)
    if (!id) { id = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(SESSION_KEY, id) }
    return id
  } catch { return 'unknown' }
}

// Records that the checkout form was opened, from the bag or from a product page
export function logCheckoutOpen(source: 'bag' | 'product', items: { name: string; price: number; qty?: number }[]) {
  supabase.from('checkout_events').insert([{
    session_id: sessionId(),
    source,
    item_count: items.reduce((s, i) => s + (i.qty ?? 1), 0),
    value: items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0),
    product_names: items.map(i => i.name).join(', '),
    source_page: typeof window !== 'undefined' ? window.location.pathname : null,
  }]).then(() => {}, () => {})
}

// Opens WhatsApp straight from the tap, so iPhone Safari and Instagram's browser don't block it
export function openWhatsApp(url: string) {
  const win = window.open(url, '_blank')
  if (!win) window.location.href = url
}
