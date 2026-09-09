'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import type { Look } from '@/lib/looks'
import type { Product } from '@/lib/types'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function LookDetail({ look }: { look: Look }) {
  const { addItem, openCart } = useCart()

  // All pieces start selected — she came for the whole outfit
  const [keep, setKeep] = useState<Record<number, boolean>>(
    () => Object.fromEntries(look.products.map(p => [p.id, true]))
  )
  const [sizes, setSizes] = useState<Record<number, string>>({})
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  const chosen = look.products.filter(p => keep[p.id])
  const total = chosen.reduce((s, p) => s + p.price, 0)
  const fullTotal = look.products.reduce((s, p) => s + p.price, 0)
  const dropped = look.products.length - chosen.length

  function toggle(id: number) {
    setKeep(k => ({ ...k, [id]: !k[id] }))
    setSizes(s => { const n = { ...s }; delete n[id]; return n })
    setError(''); setAdded(false)
  }

  function isSizedGarment(p: Product) {
    // Everything except accessories needs a size; all current categories are garments
    return true
  }

  function addToBag() {
    if (!chosen.length) { setError('Keep at least one piece to continue.'); return }
    const needSize = chosen.filter(p => isSizedGarment(p) && !sizes[p.id])
    if (needSize.length) { setError('Choose a size for every piece you are taking.'); return }
    setError('')

    chosen.forEach(p => {
      addItem({
        id: p.id,
        name: p.name,
        slug: p.slug,
        size: sizes[p.id] || 'One Size',
        price: p.price,
        img: p.images?.[0] || '',
      })
    })
    setAdded(true)
    openCart()
  }

  const hero = look.hero_image

  return (
    <div className="look-detail">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span>/</span>
        <Link href="/shop">Shop</Link> <span>/</span>
        <span>{look.name}</span>
      </nav>

      <div className="look-detail-grid">
        {/* ── LEFT: the look ── */}
        <div className="look-detail-visual">
          <div className="look-detail-img">
            {hero ? (
              <img src={hero} alt={look.name} />
            ) : (
              <div className="look-detail-stack">
                {look.products.map(p => (
                  <div
                    key={p.id}
                    className="look-detail-stack-cell"
                    style={{ opacity: keep[p.id] ? 1 : 0.2 }}
                  >
                    {p.images?.[0] ? <img src={p.images[0]} alt={p.name} /> : <span>{p.name}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="look-detail-tags">
            {look.identities.map(id => (
              <Link key={id} href={`/identity/${id}`} className="look-detail-tag">{id}</Link>
            ))}
          </div>
          <h1 className="look-detail-name">{look.name}</h1>
          {look.description && <p className="look-detail-desc">{look.description}</p>}
          {look.why_it_works && (
            <div className="look-detail-why">
              <div className="look-detail-why-label">Why this look works</div>
              <p>{look.why_it_works}</p>
            </div>
          )}
        </div>

        {/* ── RIGHT: the pieces ── */}
        <div className="look-detail-pieces">
          <div className="look-detail-pieces-head">
            <div className="look-detail-pieces-title">The pieces</div>
            <div className="look-detail-pieces-sub">Already own one? Untick it and take the rest.</div>
          </div>

          <div className="look-piece-list">
            {look.products.map(p => {
              const on = keep[p.id]
              return (
                <div key={p.id} className={`look-piece${on ? '' : ' off'}`}>
                  <div className="look-piece-row" onClick={() => toggle(p.id)}>
                    <span className={`look-piece-check${on ? ' on' : ''}`}>{on ? '✓' : ''}</span>
                    <div className="look-piece-thumb">
                      {p.images?.[0] ? <img src={p.images[0]} alt={p.name} /> : <span>F</span>}
                    </div>
                    <div className="look-piece-info">
                      <div className="look-piece-name">{p.name}</div>
                      <div className="look-piece-cat">{p.category}</div>
                    </div>
                    <div className={`look-piece-price${on ? '' : ' struck'}`}>₹{p.price.toLocaleString('en-IN')}</div>
                  </div>

                  {on && (
                    <div className="look-piece-sizes">
                      {SIZES.filter(s => !p.sold_out_sizes?.includes(s)).map(s => (
                        <button
                          key={s}
                          className={`look-piece-size${sizes[p.id] === s ? ' active' : ''}`}
                          onClick={() => { setSizes(v => ({ ...v, [p.id]: s })); setError('') }}
                        >{s}</button>
                      ))}
                      <Link href={`/product/${p.slug}`} className="look-piece-view">View product →</Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {error && <p className="look-detail-error">{error}</p>}

          <div className="look-detail-summary">
            <div className="look-detail-summary-row">
              <span>{chosen.length} of {look.products.length} pieces</span>
              <div className="look-detail-summary-price">
                {dropped > 0 && <span className="look-detail-was">₹{fullTotal.toLocaleString('en-IN')}</span>}
                <span className="look-detail-now">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="look-detail-summary-note">
              {dropped === 0 ? 'The complete look.' : `Taking ${chosen.length}. You already have the rest.`}
            </div>
            <button className="look-detail-add" onClick={addToBag}>
              {added ? '✓  Added to bag' : 'Add selected to bag'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
