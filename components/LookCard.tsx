'use client'
import Link from 'next/link'
import type { Look } from '@/lib/looks'

// Deterministic price of a look = sum of its products
function lookPrice(look: Look): number {
  return look.products.reduce((s, p) => s + p.price, 0)
}

export default function LookCard({
  look,
  contextIdentity,
}: {
  look: Look
  contextIdentity?: string
}) {
  const price = lookPrice(look)
  const hero = look.hero_image || look.products[0]?.images?.[0]

  return (
    <Link href={`/looks/${look.slug}`} className="look-card">
      <div className="look-card-img">
        {hero ? (
          // Single hero image if present, else a stacked composition of product images
          look.hero_image ? (
            <img src={hero} alt={look.name} />
          ) : (
            <div className="look-card-stack">
              {look.products.slice(0, 3).map(p => (
                <div key={p.id} className="look-card-stack-cell">
                  {p.images?.[0] ? <img src={p.images[0]} alt={p.name} /> : <span>{p.name}</span>}
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="look-card-placeholder">F</div>
        )}
      </div>

      <div className="look-card-info">
        <div className="look-card-tags">
          {look.identities.map(id => (
            <span key={id} className={`look-card-tag${id === contextIdentity ? ' current' : ''}`}>
              {id}
            </span>
          ))}
        </div>
        <div className="look-card-name">{look.name}</div>
        {look.description && <div className="look-card-desc">{look.description}</div>}
        <div className="look-card-meta">
          <span className="look-card-price">₹{price.toLocaleString('en-IN')}</span>
          <span className="look-card-count">{look.products.length} {look.products.length === 1 ? 'piece' : 'pieces'}</span>
        </div>
        <span className="look-card-shop">Shop the look →</span>
      </div>
    </Link>
  )
}
