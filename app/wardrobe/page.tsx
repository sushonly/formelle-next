import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'The Wardrobe — How do you want to show up? | Formelle',
  description: 'Identity-led workwear. Choose the energy — Confident, Authoritative, Composed, Bold, Magnetic, Effortless — and Formelle curates the looks.',
}

const IDENTITIES = [
  { id: 'confident',     n: '01', name: 'Confident',     line: 'Self-assured' },
  { id: 'authoritative', n: '02', name: 'Authoritative', line: 'Commanding' },
  { id: 'composed',      n: '03', name: 'Composed',      line: 'Calm + polished' },
  { id: 'bold',          n: '04', name: 'Bold',          line: 'Assertive + expressive' },
  { id: 'magnetic',      n: '05', name: 'Magnetic',      line: 'Charismatic + memorable' },
  { id: 'effortless',    n: '06', name: 'Effortless',    line: 'Natural + understated' },
]

export default function WardrobePage() {
  return (
    <>
      <Nav />

      <section className="wardrobe-hero" aria-label="The Wardrobe">
        <span className="wardrobe-eyebrow">The Wardrobe</span>
        <h1 className="wardrobe-title">
          How do you want<br />to <em>show up?</em>
        </h1>
        <p className="wardrobe-intro">
          The same woman. Different days. Different presence.<br />
          Choose the energy — we&rsquo;ll show you the wardrobe.
        </p>
      </section>

      <section className="identity-grid" aria-label="Choose an identity">
        {IDENTITIES.map(i => (
          <Link key={i.id} href={`/identity/${i.id}`} className="identity-card">
            <span className="identity-number">{i.n}</span>
            <div className="identity-card-content">
              <h3>{i.name}</h3>
              <p>{i.line}</p>
            </div>
            <span className="identity-arrow">↗</span>
          </Link>
        ))}
      </section>

      <div style={{ textAlign: 'center', padding: '32px 24px 80px' }}>
        <Link href="/shop" className="btn-shop-collection">Shop the Full Collection</Link>
      </div>
    </>
  )
}
