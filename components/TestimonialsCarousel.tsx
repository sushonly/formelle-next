'use client'
import { useState } from 'react'

const TESTIMONIALS = [
  {
    quote: "It's comfy. These days I love wide-leg trousers, and this one is the one.",
    name: 'Garima V.',
    meta: 'Precision Trouser, Cocoa Brown',
    img: 'https://psdaycsuawyoqtppbgec.supabase.co/storage/v1/object/public/product-images/uploads/garima.jpeg',
  },
  {
    quote: "Wore this to a client meeting in Morocco. It just felt right.",
    name: 'Amee Shah',
    meta: 'The Formelle Muse',
     img: "https://psdaycsuawyoqtppbgec.supabase.co/storage/v1/object/public/product-images/uploads/amee.jpeg",
  },
]

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0)
  const t = TESTIMONIALS[idx]

  return (
    <section style={{ background: 'var(--parchment)', padding: '88px 56px', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{ fontSize: '8.5px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, display: 'block', marginBottom: '14px' }}>In Her Words</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--noir)' }}>
          Messages that made <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>our day</em>
        </h2>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', borderTop: '0.5px solid rgba(17,17,17,0.1)', borderBottom: '0.5px solid rgba(17,17,17,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '440px' }}>
          <div style={{ height: '100%', overflow: 'hidden', background: 'var(--noir)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {t.img && (
              <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 64px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '64px', fontStyle: 'italic', color: 'var(--accent)', lineHeight: 1, marginBottom: '8px', opacity: 0.5 }}>&ldquo;</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.4vw,30px)', fontStyle: 'italic', lineHeight: 1.4, color: 'var(--noir)', marginBottom: '28px' }}>{t.quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, color: 'var(--noir)' }}>{t.name}</span>
              {t.meta && <>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(44,44,42,0.3)', display: 'inline-block' }}></span>
                <span style={{ fontSize: '11px', color: 'rgba(44,44,42,0.5)' }}>{t.meta}</span>
              </>}
            </div>
          </div>
        </div>

        {TESTIMONIALS.length > 1 && <>
          <button onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ivory)', border: '0.5px solid rgba(17,17,17,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
            style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ivory)', border: '0.5px solid rgba(17,17,17,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{ width: i === idx ? '18px' : '6px', height: '6px', borderRadius: i === idx ? '3px' : '50%', background: i === idx ? 'var(--accent)' : 'rgba(17,17,17,0.18)', transition: 'all 0.25s ease', border: 'none', padding: 0 }}
            aria-label={`Go to testimonial ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
