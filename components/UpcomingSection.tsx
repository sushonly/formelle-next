'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function UpcomingSection() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

  async function joinWaitlist() {
    if (!email || !email.includes('@')) { setError(true); setTimeout(() => setError(false), 1500); return }
    try { await supabase.from('waitlist').insert([{ email }]) } catch {}
    setDone(true)
  }

  return (
    <section className="upcoming-section">
      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '8.5px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent-light)', fontWeight: 500, display: 'block', marginBottom: '20px' }}>Coming Soon</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,64px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ivory)', marginBottom: '20px' }}>
          New colours.<br />
          <em style={{ color: 'var(--accent-light)' }}>Reserve yours before<br />anyone else.</em>
        </h2>
        <p style={{ fontSize: '13px', lineHeight: 1.85, color: 'rgba(240,236,227,0.55)', maxWidth: '520px', marginBottom: '40px' }}>
          The pieces you know, in colours we&apos;ve been working on. First access goes to the waitlist — before we open to anyone else.
        </p>

        <div className="upcoming-swatches">
          {[['#2C2C2A','Noir'],['#6B4C3B','Cocoa'],['#C8B89A','Stone']].map(([bg, label]) => (
            <div key={label} title={label} style={{ width: '26px', height: '26px', borderRadius: '50%', background: bg, border: '1px solid rgba(240,236,227,0.15)', flexShrink: 0 }} />
          ))}
          {[0,1].map(i => (
            <div key={i} style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(240,236,227,0.06)', border: '1px solid rgba(240,236,227,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '13px', color: 'rgba(240,236,227,0.25)', fontStyle: 'italic', flexShrink: 0 }}>?</div>
          ))}
          <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(240,236,227,0.3)' }}>+ 2 new colours</span>
        </div>

        {!done ? (
          <>
            <div className="upcoming-form">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && joinWaitlist()}
                placeholder="your@email.com"
                className="upcoming-input"
                style={{ borderColor: error ? 'rgba(192,57,43,0.7)' : undefined }}
              />
              <button onClick={joinWaitlist} className="upcoming-btn">
                Reserve My Spot
              </button>
            </div>
            <p style={{ fontSize: '10px', color: 'rgba(240,236,227,0.25)', marginTop: '12px', letterSpacing: '0.5px' }}>No spam. One email when it&apos;s ready.</p>
          </>
        ) : (
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '18px', color: 'var(--accent-light)', lineHeight: 1.6 }}>
            You&apos;re on the list. We&apos;ll reach out before anyone else knows.
          </p>
        )}
      </div>
    </section>
  )
}
