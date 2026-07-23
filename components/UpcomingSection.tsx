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
    <section style={{ background: 'var(--noir)', padding: '96px 56px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '8.5px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent-light)', fontWeight: 500, display: 'block', marginBottom: '20px' }}>Coming Soon</span>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ivory)', marginBottom: '20px' }}>
          New colours.<br />
          <em style={{ color: 'var(--accent-light)' }}>Reserve yours before<br />anyone else.</em>
        </h2>
        <p style={{ fontSize: '13px', lineHeight: 1.85, color: 'rgba(240,236,227,0.55)', maxWidth: '520px', marginBottom: '48px' }}>
          The pieces you know, in colours we&apos;ve been working on. First access goes to the waitlist — before we open to anyone else.
        </p>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '48px' }}>
          {[['#2C2C2A','Noir'],['#6B4C3B','Cocoa'],['#C8B89A','Stone']].map(([bg, label]) => (
            <div key={label} title={label} style={{ width: '28px', height: '28px', borderRadius: '50%', background: bg, border: '1px solid rgba(240,236,227,0.15)' }} />
          ))}
          {[0,1].map(i => (
            <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(240,236,227,0.06)', border: '1px solid rgba(240,236,227,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-cormorant)', fontSize: '14px', color: 'rgba(240,236,227,0.25)', fontStyle: 'italic' }}>?</div>
          ))}
          <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(240,236,227,0.3)', marginLeft: '4px' }}>+ 2 new colours</span>
        </div>

        {!done ? (
          <>
            <div style={{ display: 'flex', maxWidth: '480px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && joinWaitlist()}
                placeholder="your@email.com"
                style={{ flex: 1, background: 'rgba(240,236,227,0.06)', border: `0.5px solid ${error ? 'rgba(192,57,43,0.7)' : 'rgba(240,236,227,0.2)'}`, borderRight: 'none', color: 'var(--ivory)', fontFamily: 'inherit', fontSize: '12px', padding: '14px 20px', outline: 'none' }}
              />
              <button onClick={joinWaitlist}
                style={{ background: 'var(--ivory)', color: 'var(--noir)', border: 'none', padding: '14px 28px', fontSize: '9px', letterSpacing: '2.5px', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Reserve My Spot
              </button>
            </div>
            <p style={{ fontSize: '10px', color: 'rgba(240,236,227,0.25)', marginTop: '12px', letterSpacing: '0.5px' }}>No spam. One email when it&apos;s ready.</p>
          </>
        ) : (
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '18px', color: 'var(--accent-light)', lineHeight: 1.6 }}>
            You&apos;re on the list. We&apos;ll reach out before anyone else knows.
          </p>
        )}
      </div>
    </section>
  )
}
