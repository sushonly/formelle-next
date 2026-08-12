'use client'
import { useRef } from 'react'

interface Testimonial {
  id: number
  quote: string
  customer_name: string
  meta?: string
  img?: string
}

export default function TestimonialsRail({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  if (!testimonials.length) return null

  function scroll(dir: 'left' | 'right') {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.querySelector('.rail-card')?.clientWidth || 300
    track.scrollBy({ left: dir === 'left' ? -cardWidth * 1.2 : cardWidth * 1.2, behavior: 'smooth' })
  }

  return (
    <section className="rail-section" aria-label="Testimonials">
      <div className="rail-header">
        <div>
          <span className="section-eyebrow">In Her Words</span>
          <h2 className="rail-title">Messages that made our day</h2>
        </div>
        {testimonials.length > 3 && (
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

      <div className="rail-track testi-rail-track" ref={trackRef}>
        {testimonials.map(t => (
          <div key={t.id} className="rail-card testi-card">
            <div className="rail-image-wrap testi-card-image">
              {t.img ? (
                <img src={t.img} alt={t.customer_name} loading="lazy" />
              ) : (
                <div className="product-placeholder" aria-hidden="true">{t.customer_name.charAt(0)}</div>
              )}
            </div>
            <p className="testi-card-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testi-card-name">{t.customer_name}</div>
            {t.meta && <div className="testi-card-meta">{t.meta}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
