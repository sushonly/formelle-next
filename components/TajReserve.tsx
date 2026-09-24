'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const WHATSAPP = '919989674894'
const EVENT = 'taj-sept-2026'
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const WA_TEXT = encodeURIComponent('Hi Formelle, I saw you at the Taj.')

export default function TajReserve({ pieces }: { pieces: string[] }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [piece, setPiece] = useState('')
  const [size, setSize] = useState('')
  const [errors, setErrors] = useState<{ contact?: boolean; piece?: boolean; size?: boolean }>({})
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)

  async function reserve() {
    const digits = phone.replace(/\D/g, '').slice(-10)
    const next = {
      contact: !name.trim() || digits.length !== 10,
      piece: !piece,
      size: !size,
    }
    setErrors(next)
    if (next.contact || next.piece || next.size) return

    setSaving(true)
    setSaveFailed(false)
    const { error } = await supabase.from('event_leads').insert([{
      event: EVENT,
      name: name.trim(),
      phone: digits,
      piece,
      size,
    }])
    setSaving(false)
    if (error) { setSaveFailed(true); return }
    setDone(true)
  }

  function reserveAnother() {
    setPiece('')
    setSize('')
    setErrors({})
    setDone(false)
  }

  return (
    <div className="taj">
      <header className="taj-head">
        <Link href="/" className="taj-wordmark">FORMELLE</Link>
        <span className="taj-rule" />
        <span className="taj-tagline">Dressed to lead.</span>
      </header>

      <section className="taj-hero">
        <div className="taj-eyebrow">Stall 50 · Taj Krishna · 26–28 Sept</div>
        <h1 className="taj-title">Good to<br /><em>meet you.</em></h1>
        <p className="taj-sub">Everything on the rail today, and the pieces that didn&rsquo;t fit on it.</p>
      </section>

      <section className="taj-actions">
        <Link href="/shop" className="taj-btn taj-btn-solid">Shop the collection</Link>
        <a href="https://instagram.com/formellewear" target="_blank" rel="noopener noreferrer" className="taj-btn">Follow @formellewear</a>
        <a href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`} target="_blank" rel="noopener noreferrer" className="taj-btn">Message us on WhatsApp</a>
      </section>

      <section className="taj-reserve">
        {!done ? (
          <>
            <div className="taj-eyebrow taj-eyebrow-dark">Reserve</div>
            <h2 className="taj-reserve-title">Not your size today?<br /><em>Reserve it.</em></h2>
            <p className="taj-reserve-sub">Tell us the piece and your size. We&rsquo;ll message you on WhatsApp when it&rsquo;s ready.</p>

            <label className="taj-label" htmlFor="taj-name">Name</label>
            <input id="taj-name" className="taj-input" type="text" autoComplete="name" placeholder="Ananya Rao"
              value={name} onChange={e => { setName(e.target.value); setErrors(s => ({ ...s, contact: false })) }} />

            <label className="taj-label" htmlFor="taj-phone">WhatsApp number</label>
            <input id="taj-phone" className="taj-input" type="tel" inputMode="numeric" autoComplete="tel" placeholder="98765 43210"
              value={phone} onChange={e => { setPhone(e.target.value); setErrors(s => ({ ...s, contact: false })) }} />
            {errors.contact && <p className="taj-error">Add your name and a 10-digit number.</p>}

            <label className="taj-label" htmlFor="taj-piece">Piece</label>
            <select id="taj-piece" className="taj-input" value={piece}
              onChange={e => { setPiece(e.target.value); setErrors(s => ({ ...s, piece: false })) }}>
              <option value="">Choose a piece</option>
              {pieces.map(p => <option key={p} value={p}>{p}</option>)}
              <option value="Something else">Something else</option>
            </select>
            {errors.piece && <p className="taj-error">Choose a piece.</p>}

            <span className="taj-label">Size</span>
            <div className="taj-sizes">
              {SIZES.map(s => (
                <button key={s} type="button" className={`taj-size${size === s ? ' on' : ''}`}
                  onClick={() => { setSize(s); setErrors(e => ({ ...e, size: false })) }}>{s}</button>
              ))}
            </div>
            <button type="button" className={`taj-size taj-size-wide${size === 'Made to measure' ? ' on' : ''}`}
              onClick={() => { setSize('Made to measure'); setErrors(e => ({ ...e, size: false })) }}>Made to measure</button>
            {errors.size && <p className="taj-error">Choose a size.</p>}

            <button type="button" className="taj-btn taj-btn-solid taj-submit" onClick={reserve} disabled={saving}>
              {saving ? 'Saving…' : 'Reserve'}
            </button>
            {saveFailed && (
              <p className="taj-error">
                That didn&rsquo;t go through.{' '}
                <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi Formelle, I'd like to reserve ${piece} in ${size}.`)}`}
                  target="_blank" rel="noopener noreferrer">Send it on WhatsApp instead</a>.
              </p>
            )}
            <p className="taj-fine">One message when it&rsquo;s ready. Nothing else.</p>
          </>
        ) : (
          <div className="taj-done">
            <h2 className="taj-done-title">You&rsquo;re on the list.</h2>
            <p className="taj-reserve-sub">{piece}, {size}. We&rsquo;ll message you on WhatsApp when it&rsquo;s ready.</p>
            <button type="button" className="taj-btn" onClick={reserveAnother}>Reserve another piece</button>
          </div>
        )}
      </section>

      <footer className="taj-foot">formellewear.com</footer>
    </div>
  )
}
