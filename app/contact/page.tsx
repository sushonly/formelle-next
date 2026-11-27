import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { JsonLd, breadcrumbSchema } from '@/lib/seo'
import { EMAIL, WHATSAPP, WHATSAPP_LINK } from '@/components/PolicyPage'

export const metadata: Metadata = {
  title: 'Contact Us | Formelle',
  description: 'Talk to a person, not a ticket. Reach Formelle on WhatsApp, email or Instagram for sizing, orders, exchanges and styling help.',
  alternates: { canonical: '/contact' },
}

const wa = (text: string) => `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`

// One tap opens WhatsApp with her message already written
const STARTERS = [
  ['Help me find my size', 'Hi Formelle, could you help me find my size for '],
  ['About my order', 'Hi Formelle, I have a question about my order FM-'],
  ['Exchange or return', 'Hi Formelle, I would like to exchange or return my order FM-'],
  ['Help me put a look together', 'Hi Formelle, could you help me put a look together for '],
]

const label: React.CSSProperties = { fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, margin: 0 }
const cardTitle: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, lineHeight: 1.15, margin: '10px 0 6px' }
const cardText: React.CSSProperties = { fontSize: '13px', lineHeight: 1.7, fontWeight: 300, margin: 0 }
const cardLink: React.CSSProperties = { display: 'inline-block', marginTop: '18px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '3px', borderBottom: '0.5px solid currentColor' }
const wrap: React.CSSProperties = { maxWidth: '960px', margin: '0 auto' }

const POLICIES = [
  ['/shipping-and-exchange', 'Shipping and Exchange'],
  ['/privacy-policy', 'Privacy Policy'],
  ['/terms', 'Terms and Conditions'],
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <Nav />
      <div className="breadcrumb" role="navigation" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span>/</span>
        <span>Contact</span>
      </div>

      <main>
        {/* Hero */}
        <section style={{ background: 'var(--noir)', color: 'var(--ivory)', padding: 'clamp(48px,8vw,88px) 24px', marginTop: '12px' }}>
          <div style={wrap}>
            <p style={{ ...label, color: '#C4A882' }}>Contact</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,64px)', fontWeight: 300, lineHeight: 1.05, margin: '14px 0 18px' }}>
              Talk to a person,<br /><em style={{ fontStyle: 'italic', color: '#C4A882' }}>not a ticket.</em>
            </h1>
            <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 300, color: 'rgba(240,236,227,0.72)', maxWidth: '480px', margin: 0 }}>
              Sizing, an order, an exchange, or what to wear to Monday&rsquo;s board meeting. Write to us. A person answers, usually within a few hours.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--ivory)', padding: '48px 24px 96px' }}>
          <div style={wrap}>
            {/* Starters */}
            <p style={{ ...label, color: 'var(--accent)', marginBottom: '16px' }}>What do you need?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '10px' }}>
              {STARTERS.map(([title, text]) => (
                <a key={title} href={wa(text)} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '16px 18px', background: '#fff', border: '0.5px solid rgba(17,17,17,0.22)', fontSize: '14px', color: 'var(--noir)' }}>
                  <span>{title}</span><span aria-hidden="true" style={{ color: 'var(--accent)' }}>→</span>
                </a>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(44,44,42,0.6)', margin: '12px 0 0' }}>Each opens WhatsApp with your message ready to send.</p>

            {/* Channels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '12px', marginTop: '48px' }}>
              <div style={{ background: 'var(--noir)', color: 'var(--ivory)', padding: '26px 24px' }}>
                <p style={{ ...label, color: '#C4A882' }}>Fastest</p>
                <h2 style={cardTitle}>WhatsApp</h2>
                <p style={{ ...cardText, color: 'rgba(240,236,227,0.72)' }}>{WHATSAPP}<br />Replies within a few hours</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ ...cardLink, color: 'var(--ivory)' }}>Message us</a>
              </div>
              <div style={{ background: 'var(--ivory)', border: '0.5px solid rgba(17,17,17,0.2)', padding: '26px 24px' }}>
                <p style={{ ...label, color: 'var(--accent)' }}>Email</p>
                <h2 style={cardTitle}>Write to us</h2>
                <p style={{ ...cardText, color: 'rgba(44,44,42,0.85)', wordBreak: 'break-word' }}>{EMAIL}<br />Replies within a day</p>
                <a href={`mailto:${EMAIL}`} style={{ ...cardLink, color: 'var(--noir)' }}>Send email</a>
              </div>
              <div style={{ background: 'var(--ivory)', border: '0.5px solid rgba(17,17,17,0.2)', padding: '26px 24px' }}>
                <p style={{ ...label, color: 'var(--accent)' }}>Instagram</p>
                <h2 style={cardTitle}>@formellewear</h2>
                <p style={{ ...cardText, color: 'rgba(44,44,42,0.85)' }}>New drops, and how women wear them</p>
                <a href="https://instagram.com/formellewear" target="_blank" rel="noopener noreferrer" style={{ ...cardLink, color: 'var(--noir)' }}>Follow</a>
              </div>
            </div>

            {/* Details */}
            <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '0.5px solid rgba(17,17,17,0.18)', fontSize: '13px', lineHeight: 1.9, fontWeight: 300, color: 'rgba(44,44,42,0.85)' }}>
              <p style={{ margin: 0 }}><strong style={{ fontWeight: 500 }}>Hours</strong> · Monday to Saturday, 10 am to 7 pm IST</p>
              <p style={{ margin: 0 }}><strong style={{ fontWeight: 500 }}>Based in</strong> · Hyderabad, India</p>
              <p style={{ margin: '14px 0 0', color: 'rgba(44,44,42,0.65)' }}>About an order? Include your order number. It starts with FM- and is in your order emails.</p>
              <p style={{ margin: '4px 0 0', color: 'rgba(44,44,42,0.65)' }}>Something gone wrong? Email <a href={`mailto:${EMAIL}?subject=Grievance`} style={{ color: 'var(--accent)' }}>{EMAIL}</a>{' '}with the subject &ldquo;Grievance&rdquo;. We acknowledge within 48 hours and resolve within 7 working days.</p>
            </div>

            <div role="navigation" aria-label="Policies" style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
              {POLICIES.map(([href, text]) => (
                <Link key={href} href={href} style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--noir)' }}>{text}</Link>
              ))}
            </div>
          </div>
        </section>
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
