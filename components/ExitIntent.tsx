'use client'
// Exit survey: asks why she's leaving, and offers new-drop alerts on WhatsApp.
// Shows once per visitor, only after she has added to bag or viewed a product,
// and never while the bag, a checkout form, or any other popup is open.
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import { supabase } from '@/lib/supabase'
import { sessionId } from '@/lib/funnel'

const SEEN_KEY = 'formelle_exit_seen'
const VIEWED_KEY = 'formelle_viewed_product'
const MIN_TIME_MS = 20000 // she must have been on the site this long
const REASONS = ['Still deciding', "Didn't find my size", 'Unsure about the fit', 'Price', 'Just browsing', 'Something else']
// Anything open that she might be in the middle of
const BUSY = '.cart-overlay, .checkout-overlay, .checkout-modal, .notify-overlay, .sg-overlay'

const read = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const write = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* private mode */ } }

export default function ExitIntent() {
  const pathname = usePathname()
  const { items, subtotal } = useCart()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const startRef = useRef(0)
  const stateRef = useRef({ items: 0, value: 0, path: '' })

  // Keep the latest bag and page for the listeners below
  useEffect(() => {
    stateRef.current = { items: items.reduce((s, i) => s + i.qty, 0), value: subtotal, path: pathname || '' }
  }, [items, subtotal, pathname])

  // Remember that she looked at a product
  useEffect(() => {
    if (pathname?.startsWith('/product/')) write(VIEWED_KEY, '1')
  }, [pathname])

  useEffect(() => {
    startRef.current = Date.now()
    if (read(SEEN_KEY)) return

    const eligible = () => {
      if (read(SEEN_KEY)) return false
      if (Date.now() - startRef.current < MIN_TIME_MS) return false
      if (stateRef.current.path.startsWith('/reserve')) return false
      if (!(stateRef.current.items > 0 || read(VIEWED_KEY))) return false
      if (document.querySelector(BUSY)) return false
      const a = document.activeElement
      if (a && ['INPUT', 'TEXTAREA', 'SELECT'].includes(a.tagName)) return false
      return true
    }
    const show = () => { if (!eligible()) return; write(SEEN_KEY, '1'); setOpen(true) }

    // Desktop: the pointer leaves through the top of the window
    const onMouseOut = (e: MouseEvent) => { if (!e.relatedTarget && e.clientY <= 0) show() }

    // Phone: a quick scroll back up towards the top, the usual move before leaving
       document.addEventListener('mouseout', onMouseOut)
    return () => document.removeEventListener('mouseout', onMouseOut)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const submit = () => {
    const digits = phone.replace(/\D/g, '').slice(-10)
    if (!reason && !digits) { setError('Pick a reason, or leave your number.'); return }
    if (phone && digits.length !== 10) { setError('Enter a 10-digit mobile number.'); return }
    supabase.from('exit_feedback').insert([{
      session_id: sessionId(),
      reason: reason || null,
      phone: digits || null,
      page: stateRef.current.path,
      bag_items: stateRef.current.items,
      bag_value: stateRef.current.value,
    }]).then(() => {}, () => {})
    setSent(true)
    setTimeout(() => setOpen(false), 2200)
  }

  return (
    <div className="exit-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="exit-modal" role="dialog" aria-modal="true" aria-labelledby="exit-title">
        <button className="exit-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        {sent ? (
          <div className="exit-done">
            <p className="exit-eyebrow">Thank you</p>
            <h2 id="exit-title" className="exit-title">Noted. <em>See you soon.</em></h2>
          </div>
        ) : (
          <>
            <p className="exit-eyebrow">Before you go</p>
            <h2 id="exit-title" className="exit-title">We hate to see<br /><em>you go.</em></h2>
            <p className="exit-text">What stopped you today? One tap helps us make Formelle better for you.</p>
            <div className="exit-chips">
              {REASONS.map(r => (
                <button key={r} type="button" className={`exit-chip${reason === r ? ' on' : ''}`}
                  aria-pressed={reason === r} onClick={() => { setReason(r); setError('') }}>{r}</button>
              ))}
            </div>
            <div className="exit-rule" />
            <label className="exit-text" htmlFor="exit-phone">See new drops first, on WhatsApp.</label>
            <div className="exit-phone">
              <span>+91</span>
              <input id="exit-phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Your WhatsApp number"
                value={phone} onChange={(e) => { setPhone(e.target.value); setError('') }} />
            </div>
            {error && <p className="exit-error">{error}</p>}
            <button type="button" className="exit-send" onClick={submit}>Send</button>
            <button type="button" className="exit-skip" onClick={() => setOpen(false)}>No thanks</button>
          </>
        )}
      </div>
    </div>
  )
}
