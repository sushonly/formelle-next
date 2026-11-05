'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ALL_SIZES } from '@/lib/stock'
import type { Product } from '@/lib/types'

// Waitlist for a product that is sold out in every size.
// Saves to restock_requests, the same table the Notify Me modal uses,
// with size "Any" when the customer doesn't pick one.
export default function WaitlistModal({
  product,
  onClose,
}: {
  product: Pick<Product, 'id' | 'name'>
  onClose: () => void
}) {
  const [size, setSize] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function submit() {
    if (!email && !phone) {
      setError(true)
      setTimeout(() => setError(false), 1500)
      return
    }
    setSubmitting(true)
    try {
      await supabase.from('restock_requests').insert([{
        product_id: product.id,
        product_name: product.name,
        size: size || 'Any',
        email: email || null,
        phone: phone || null,
      }])
    } catch {}
    setSubmitting(false)
    setSuccess(true)
    setTimeout(onClose, 2500)
  }

  return (
    <div
      className="notify-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Join the waitlist for ${product.name}`}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="notify-modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300 }}>Join the Waitlist</h3>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: '20px', color: 'rgba(44,44,42,0.5)' }}>✕</button>
        </div>
        <p style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', margin: '18px 0 6px' }}>{product.name}</p>

        {!success ? (
          <>
            <p style={{ fontSize: '12px', color: 'rgba(44,44,42,0.6)', lineHeight: 1.7, marginBottom: '20px' }}>
              Every size is currently sold out. Leave your details and you&apos;ll be the first to know when it returns.
            </p>

            <label className="notify-label">Your size <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <div className="waitlist-sizes">
              {ALL_SIZES.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`waitlist-size ${size === s ? 'active' : ''}`}
                  onClick={() => setSize(size === s ? '' : s)}
                  aria-pressed={size === s}
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="notify-label">Email</label>
            <input type="email" className={`notify-input ${error ? 'error' : ''}`} placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            <label className="notify-label">Phone <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <input type="tel" className="notify-input" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
            <button className="notify-btn" onClick={submit} disabled={submitting}>
              {submitting ? 'Saving…' : 'Join the Waitlist'}
            </button>
            <p style={{ fontSize: '10px', color: 'rgba(44,44,42,0.4)', textAlign: 'center', marginTop: '10px' }}>No spam. One message when it&apos;s back.</p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic', color: 'var(--accent)', marginBottom: '8px' }}>You&apos;re on the list.</p>
            <p style={{ fontSize: '12px', color: 'rgba(44,44,42,0.6)' }}>We&apos;ll reach out as soon as it returns.</p>
          </div>
        )}
      </div>
    </div>
  )
}
