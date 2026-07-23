'use client'
import { useState } from 'react'

const FAQS = [
  { q: 'What sizes does Formelle offer?', a: 'All sizes — XS through XXXL.' },
  { q: 'How do I place an order?', a: 'Add to bag, fill your delivery details, and confirm on WhatsApp. We respond with our UPI ID — pay via GPay, PhonePe, or Paytm. Zero extra charges.' },
  { q: 'Does Formelle ship across India?', a: 'Yes — pan-India delivery on all orders, free shipping. Delivery takes 4–7 business days.' },
  { q: 'What is your exchange policy?', a: 'Exchanges within 7 days of delivery for sizing issues. Reach out on WhatsApp or at formellewear@outlook.com.' },
  { q: 'Who is Formelle designed for?', a: 'Professional women in India — consultants, managers, founders, executives who want to dress with intention.' },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" style={{ background: 'var(--parchment)', padding: '72px 56px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <span style={{ fontSize: '8.5px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, display: 'block', marginBottom: '12px' }}>Questions</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Good to <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>know</em>
        </h2>
        <div>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: '0.5px solid rgba(17,17,17,0.1)' }}>
              <div onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: "'Cormorant Garamond', serif", fontSize: '19px', color: 'var(--noir)' }}>
                {f.q}
                <span style={{ fontSize: '20px', color: 'var(--accent)', transition: 'transform 0.3s ease', flexShrink: 0, marginLeft: '24px', transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </div>
              <div style={{ maxHeight: openIdx === i ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <div style={{ padding: '0 0 22px', fontSize: '12px', lineHeight: 1.9, color: 'rgba(44,44,42,0.65)', fontWeight: 300 }}>{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
