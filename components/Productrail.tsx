'use client'
import { useRef } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const CAT_LABELS: Record<string, string> = { top: 'Top', trouser: 'Trouser', dress: 'Dress', blazer: 'Blazer' }

export default function ProductRail({ eyebrow, title, products }: { eyebrow: string; title: string; products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  if (!products.length) return null

  function scroll(dir: 'left' | 'right') {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.querySelector('.rail-card')?.clientWidth || 300
    track.scrollBy({ left: dir === 'left' ? -cardWidth * 1.2 : cardWidth * 1.2, behavior: 'smooth' })
  }

  return (
    <section className="rail-section" aria-label={title}>
      <div className="rail-header">
        <div>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="rail-title">{title}</h2>
        </div>
        {products.length > 2 && (
          <div className="rail-arrows">
            <button className="rail-arrow" onClick={() => scroll('left')} aria-label="Scroll left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="rail-arrow" onClick={() => scroll('right')} aria-label="Scroll right">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        )}
      </div>

      <div className="rail-track" ref={trackRef}>
        {products.map(p => {
          const heroImg = p.images?.[0] || ''
          const catLabel = CAT_LABELS[p.category] || p.category
          return (
            <Link key={p.id} href={`/product/${p.slug}`} className="rail-card">
              <div className="rail-image-wrap">
                {heroImg ? (
                  <img src={heroImg} alt={p.name} loading="lazy" />
                ) : (
                  <div className="product-placeholder" aria-hidden="true">{catLabel.charAt(0)}</div>
                )}
              </div>
              <div className="product-category">{catLabel}</div>
              <h3 className="rail-name">{p.name}</h3>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
