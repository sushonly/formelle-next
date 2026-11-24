import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { JsonLd, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Shipping, Returns and Exchange Policy | Formelle',
  description: 'Free shipping across India. Dispatch in 1 to 2 working days. Free returns within 3 days and free exchanges within 7 days of delivery.',
  alternates: { canonical: '/shipping-and-exchange' },
}

const WHATSAPP = '+91 99896 74894'
const WHATSAPP_LINK = 'https://wa.me/919989674894'
const EMAIL = 'formellewear@outlook.com'

const sectionTitle: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,34px)', fontWeight: 400, lineHeight: 1.15, margin: '48px 0 16px', color: 'var(--noir)' }
const para: React.CSSProperties = { fontSize: '15px', lineHeight: 1.8, color: 'rgba(44,44,42,0.85)', margin: '0 0 14px' }
const list: React.CSSProperties = { ...para, paddingLeft: '20px' }
const keyRow: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: '16px', padding: '14px 0', borderBottom: '0.5px solid rgba(17,17,17,0.12)', fontSize: '15px' }

const SUMMARY = [
  ['Shipping', 'Free across India'],
  ['Dispatch', 'Within 1 to 2 working days'],
  ['Delivery', 'Hyderabad 1 to 3 days. Rest of India 5 to 7 days'],
  ['Returns', 'Free, within 3 days of delivery'],
  ['Exchanges', 'Free, within 7 days of delivery'],
]

export default function ShippingAndExchangePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Shipping and Exchange', path: '/shipping-and-exchange' }])} />
      <Nav />
      <div className="breadcrumb" role="navigation" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span>/</span>
        <span>Shipping and Exchange</span>
      </div>
      <main style={{ background: 'var(--ivory)', padding: '48px 24px 96px' }}>
        <article style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,56px)', fontWeight: 300, lineHeight: 1.05, margin: '0 0 16px', color: 'var(--noir)' }}>
            Shipping, returns <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>and exchange</em>
          </h1>
          <p style={para}>Everything you need to know before and after your Formelle order arrives.</p>

          <div style={{ marginTop: '32px', borderTop: '1px solid var(--noir)' }}>
            {SUMMARY.map(([k, v]) => (
              <div key={k} style={keyRow}>
                <span style={{ fontWeight: 500, color: 'var(--noir)' }}>{k}</span>
                <span style={{ color: 'rgba(44,44,42,0.85)' }}>{v}</span>
              </div>
            ))}
          </div>

          <h2 style={sectionTitle}>Shipping</h2>
          <ul style={list}>
            <li>Shipping is free on every order, anywhere in India.</li>
            <li>We dispatch your order within 1 to 2 working days of payment.</li>
            <li>Orders within Hyderabad arrive in 1 to 3 days. Orders to the rest of India arrive in 5 to 7 days.</li>
          </ul>

          <h2 style={sectionTitle}>Returns</h2>
          <p style={para}>Try it on at home. If it is not right for you, send it back.</p>
          <ul style={list}>
            <li>Request a return within 3 days of delivery.</li>
            <li>The piece must be unworn and unwashed, with all original tags attached.</li>
            <li>Returns are free. We cover the shipping.</li>
            <li>Once we receive and check the piece, we refund the full amount to the account you paid from.</li>
          </ul>

          <h2 style={sectionTitle}>Exchanges</h2>
          <p style={para}>If the size or fit is not right, you can exchange your piece for a different size.</p>
          <ul style={list}>
            <li>Request an exchange within 7 days of delivery.</li>
            <li>The piece must be unworn and unwashed, with all original tags attached.</li>
            <li>Exchanges are free. We cover shipping both ways: your piece coming back to us, and delivery of the new one.</li>
            <li>Exchanges depend on availability of the size you choose. If it is not available, you can return the piece instead.</li>
          </ul>

          <h2 style={sectionTitle}>Damaged, defective or wrong items</h2>
          <p style={para}>If your piece arrives damaged, defective or different from what you ordered, tell us within 7 days of delivery with your order number and a photo.</p>
          <ul style={list}>
            <li>We replace it free of charge, including all shipping.</li>
            <li>If a replacement is not available, we give you a full refund to the account you paid from.</li>
          </ul>

          <h2 style={sectionTitle}>How to request a return or exchange</h2>
          <ol style={list}>
            <li>Message us on WhatsApp at <a href={WHATSAPP_LINK} style={{ color: 'var(--accent)' }}>{WHATSAPP}</a> or email <a href={`mailto:${EMAIL}`} style={{ color: 'var(--accent)' }}>{EMAIL}</a>: within 3 days of delivery for a return, or 7 days for an exchange.</li>
            <li>Share your order number, the piece, and whether you would like a refund or a different size.</li>
            <li>We arrange how your piece comes back to us, at no cost to you.</li>
            <li>Once we receive and check the piece, we send your refund or dispatch your exchange.</li>
          </ol>

          <h2 style={sectionTitle}>Questions</h2>
          <p style={para}>WhatsApp {WHATSAPP} or email {EMAIL}.</p>
        </article>
      </main>
      <footer>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Formelle. All rights reserved.</div>
          <div className="footer-copy"><Link href="/" style={{ color: 'inherit' }}>formellewear.com</Link></div>
        </div>
      </footer>
    </>
  )
}
