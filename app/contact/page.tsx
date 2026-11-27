import type { Metadata } from 'next'
import PolicyPage, { sectionTitle, para, link, EMAIL, WHATSAPP, WHATSAPP_LINK } from '@/components/PolicyPage'

export const metadata: Metadata = {
  title: 'Contact Us | Formelle',
  description: 'Reach Formelle on WhatsApp, email or Instagram for orders, sizing, exchanges and returns. A person answers, usually within a few hours.',
  alternates: { canonical: '/contact' },
}

const ADDRESS = ['Formelle', 'Hyderabad, Telangana', 'India']

const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: '16px', padding: '16px 0', borderBottom: '0.5px solid rgba(17,17,17,0.12)', fontSize: '15px' }

export default function ContactPage() {
  return (
    <PolicyPage path="/contact" crumb="Contact" title="Contact" accent="us"
      intro="A question about sizing, an order, or an exchange? Write to us. A person answers, usually within a few hours.">

      <div style={{ marginTop: '24px', borderTop: '1px solid var(--noir)' }}>
        <div style={row}><span style={{ fontWeight: 500 }}>WhatsApp</span><a href={WHATSAPP_LINK} style={link}>{WHATSAPP}</a></div>
        <div style={row}><span style={{ fontWeight: 500 }}>Email</span><a href={`mailto:${EMAIL}`} style={link}>{EMAIL}</a></div>
        <div style={row}><span style={{ fontWeight: 500 }}>Instagram</span><a href="https://instagram.com/formellewear" target="_blank" rel="noopener noreferrer" style={link}>@formellewear</a></div>
        <div style={row}><span style={{ fontWeight: 500 }}>Hours</span><span>Monday to Saturday, 10 am to 7 pm IST</span></div>
        <div style={row}><span style={{ fontWeight: 500 }}>Address</span><span>{ADDRESS.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}</span></div>
      </div>

      <h2 style={sectionTitle}>About an order</h2>
      <p style={para}>Include your order number (it starts with FM-, and is in your order emails) so we can help straight away.</p>

      <h2 style={sectionTitle}>Grievances</h2>
      <p style={para}>If something has gone wrong, email <a href={`mailto:${EMAIL}`} style={link}>{EMAIL}</a> with the subject &ldquo;Grievance&rdquo;. We acknowledge every complaint within 48 hours and aim to resolve it within 7 working days.</p>
    </PolicyPage>
  )
}
