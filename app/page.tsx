import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import Nav from '@/components/Nav'
import ProductRail from '@/components/ProductRail'
import TestimonialsRail from '@/components/TestimonialsRail'
import FaqSection from '@/components/FaqSection'
import Link from 'next/link'

export const revalidate = 60

async function getProducts(): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').eq('is_active', true).order('sort_order', { ascending: true })
  return data || []
}

async function getTestimonials() {
  const { data } = await supabase.from('testimonials').select('*').eq('is_active', true).order('created_at', { ascending: false })
  return data || []
}

export default async function HomePage() {
  const products = await getProducts()
  const testimonials = await getTestimonials()
  const bestsellers = products.filter(p => p.is_bestseller)
  const newArrivals = products.filter(p => (p.tag || '').toLowerCase() === 'new')
  return (
    <>
      <Nav />
      <section className="hero" aria-label="Hero — Dressed to Lead">
        <div className="hero-text">
          <span className="hero-eyebrow">New Collection · 2026</span>
          <h1 className="hero-headline">Dress like<br />the leader<br />you <em>already</em><br />are.</h1>
          <p className="hero-sub">Formal wear designed for women who move through boardrooms and break through ceilings. Structured, elegant, and built for the woman in charge.</p>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(240,236,227,0.5)', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginTop: '-28px', marginBottom: '48px' }}>Worn by women leading rooms across India.</p>
          <div className="hero-actions">
            <Link href="/shop" className="btn-primary">Shop Now</Link>
            <Link href="/about" className="btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true">
          <img src="/images/hero.png" alt="Formelle luxury formal wear" className="hero-photo" />
          <div className="hero-image-bg"></div>
          <div className="hero-badge" aria-hidden="true"><span>Dressed</span><span>to</span><span>Lead</span></div>
        </div>
      </section>
      <div style={{ background: 'var(--parchment)', borderTop: '0.5px solid rgba(17,17,17,0.08)', borderBottom: '0.5px solid rgba(17,17,17,0.08)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[['Free Shipping', 'On all orders'],['Made in India', 'For Indian women'],['Easy Exchange', 'Within 7 days'],['Concierge Order', 'Via WhatsApp']].map(([title, sub], i) => (
          <div key={title} style={{ padding: '20px 24px', textAlign: 'center', borderRight: i < 3 ? '0.5px solid rgba(17,17,17,0.08)' : 'none' }}>
            <div style={{ fontSize: '8.5px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, color: 'var(--noir)', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '10px', color: 'rgba(44,44,42,0.5)', fontWeight: 300 }}>{sub}</div>
          </div>
        ))}
      </div>
      <ProductRail eyebrow="Best Sellers" title="The pieces women keep coming back for" products={bestsellers} />
      <ProductRail eyebrow="New Arrivals" title="Just landed" products={newArrivals} />
      <div style={{ textAlign: 'center', padding: '8px 24px 64px' }}>
        <Link href="/shop" className="btn-shop-collection">
          Shop the Full Collection
        </Link>
      </div>
      <TestimonialsRail testimonials={testimonials} />
     <section
  style={{
    background: 'var(--noir)',
    padding: '96px 56px 104px',
    color: 'var(--ivory)',
  }}
>
  {/* Philosophy introduction */}
  <div
    style={{
      textAlign: 'center',
      maxWidth: '680px',
      margin: '0 auto 64px',
    }}
  >
    <span
      style={{
        display: 'block',
        fontSize: '9px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: 'var(--accent-light)',
        fontWeight: 500,
        marginBottom: '20px',
      }}
    >
      Our Philosophy
    </span>

    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(42px, 5vw, 64px)',
        fontWeight: 300,
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        color: 'var(--ivory)',
        margin: '0 0 28px',
      }}
    >
      Not a uniform.
      <br />
      Not a trend.
    </h2>

    <p
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        fontSize: '13px',
        lineHeight: 1.9,
        color: 'rgba(240,236,227,0.68)',
        fontWeight: 300,
      }}
    >
      We don&apos;t design for seasons. We design for the consultant
      with back-to-back meetings. The founder who just closed a round.
      The manager who&apos;s the youngest in the room and owns it.
      Every piece is made to be worn for years, not liked for a week.
    </p>
  </div>

  {/* Philosophy pillars */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      maxWidth: '1100px',
      margin: '0 auto',
      border: '0.5px solid rgba(240,236,227,0.14)',
    }}
  >
    {[
      [
        '01',
        'Designed for Indian women',
        'Every silhouette is cut for the Indian body — proportions, drape, and fit that actually works.',
      ],
      [
        '02',
        'Structure without stiffness',
        'Pieces that hold their shape through 10-hour days. Formal enough for boardrooms. Comfortable enough to forget you’re wearing them.',
      ],
      [
        '03',
        'Made for the way you work',
        'A wardrobe designed to move between the office, the airport, the dinner, and everything in between.',
      ],
    ].map(([num, title, body], i) => (
      <div
        key={num}
        style={{
          minHeight: '310px',
          padding: '48px 42px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          borderRight:
            i < 2
              ? '0.5px solid rgba(240,236,227,0.14)'
              : 'none',
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '38px',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1,
            color: 'rgba(240,236,227,0.22)',
            marginBottom: '42px',
          }}
        >
          {num}
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '23px',
            fontWeight: 400,
            lineHeight: 1.15,
            color: 'var(--ivory)',
            marginBottom: '18px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: '12px',
            lineHeight: 1.85,
            color: 'rgba(240,236,227,0.58)',
            fontWeight: 300,
            maxWidth: '280px',
          }}
        >
          {body}
        </div>
      </div>
    ))}
  </div>
</section>
      <FaqSection />
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Formelle</div>
            <div className="footer-brand-tagline">&quot;Dressed to lead.&quot;</div>
            <p className="footer-brand-text">Luxury formal wear for the professional woman. Pan-India delivery.</p>
          </div>
          <div>
            <div className="footer-col-title">Shop</div>
            <ul className="footer-links">
              <li><Link href="/shop">All Products</Link></li>
              <li><Link href="/shop">Tops</Link></li>
              <li><Link href="/shop">Trousers</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Help</div>
            <ul className="footer-links">
              <li><Link href="#faq">FAQs</Link></li>
              <li><Link href="#faq">Shipping Info</Link></li>
              <li><Link href="#faq">Returns</Link></li>
              <li><a href="mailto:formellewear@outlook.com">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links">
              <li><a href="https://instagram.com/formellewear" target="_blank" rel="noopener noreferrer">@formellewear</a></li>
              <li><a href="mailto:formellewear@outlook.com">formellewear@outlook.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Formelle. All rights reserved.</div>
          <div className="footer-copy">Delivering across India · <a href="https://www.formellewear.com" style={{ color: 'inherit' }}>formellewear.com</a></div>
        </div>
      </footer>
    </>
  )
}
