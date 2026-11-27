// Shared layout for the policy pages: privacy, terms and contact.
import Link from 'next/link'
import Nav from '@/components/Nav'
import { JsonLd, breadcrumbSchema } from '@/lib/seo'

export const WHATSAPP = '+91 99896 74894'
export const WHATSAPP_LINK = 'https://wa.me/919989674894'
export const EMAIL = 'formellewear@outlook.com'
export const LAST_UPDATED = '27 November 2026'

export const sectionTitle: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,30px)', fontWeight: 400, lineHeight: 1.2, margin: '44px 0 14px', color: 'var(--noir)' }
export const para: React.CSSProperties = { fontSize: '15px', lineHeight: 1.8, color: 'rgba(44,44,42,0.85)', margin: '0 0 14px' }
export const list: React.CSSProperties = { ...para, paddingLeft: '20px' }
export const link: React.CSSProperties = { color: 'var(--accent)' }

const POLICIES = [
  { href: '/shipping-and-exchange', label: 'Shipping and Exchange' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms and Conditions' },
  { href: '/contact', label: 'Contact' },
]

export default function PolicyPage({ path, crumb, title, accent, intro, children }: {
  path: string; crumb: string; title: string; accent: string; intro: string; children: React.ReactNode
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: crumb, path }])} />
      <Nav />
      <div className="breadcrumb" role="navigation" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span>/</span>
        <span>{crumb}</span>
      </div>
      <main style={{ background: 'var(--ivory)', padding: '48px 24px 96px' }}>
        <article style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,56px)', fontWeight: 300, lineHeight: 1.05, margin: '0 0 16px', color: 'var(--noir)' }}>
            {title} <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{accent}</em>
          </h1>
          <p style={para}>{intro}</p>
          <p style={{ ...para, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(44,44,42,0.55)' }}>Last updated {LAST_UPDATED}</p>
          {children}
          <div role="navigation" aria-label="Policies" style={{ marginTop: '64px', paddingTop: '20px', borderTop: '0.5px solid rgba(17,17,17,0.15)', display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
            {POLICIES.filter(p => p.href !== path).map(p => (
              <Link key={p.href} href={p.href} style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--noir)' }}>{p.label}</Link>
            ))}
          </div>
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
