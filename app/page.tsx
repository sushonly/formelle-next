import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import Nav from '@/components/Nav'
import ProductRail from '@/components/ProductRail'
import TestimonialsRail from '@/components/TestimonialsRail'
import FaqSection from '@/components/FaqSection'
import Link from 'next/link'

export const revalidate = 60

async function getProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  return data || []
}

async function getTestimonials() {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
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

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="hero" aria-label="Hero — Dressed to Lead">
        <div className="hero-text">
          <span className="hero-eyebrow">New Collection · 2026</span>
          <h1 className="hero-headline">
            Dress like<br />the leader<br />you <em>already</em><br />are.
          </h1>
          <p className="hero-sub">
            Formal wear designed for women who move through boardrooms and break through ceilings. Structured, elegant, and built for the woman in charge.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn-primary">Shop Now</Link>
            <Link href="/about" className="btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true">
          <img src="/images/hero.png" alt="Formelle luxury formal wear" className="hero-photo" />
          <div className="hero-image-bg"></div>
          <div className="hero-badge" aria-hidden="true">
            <span>Dressed</span><span>to</span><span>Lead</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST BAR
      ===================================================== */}
      <div style={{ background: 'var(--parchment)', borderTop: '0.5px solid rgba(17,17,17,0.08)', borderBottom: '0.5px solid rgba(17,17,17,0.08)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[
          ['Free Shipping', 'On all orders'],
          ['Made in India', 'For Indian women'],
          ['Easy Exchange', 'Within 7 days'],
          ['Concierge Order', 'Via WhatsApp'],
        ].map(([title, sub], i) => (
          <div key={title} style={{ padding: '20px 24px', textAlign: 'center', borderRight: i < 3 ? '0.5px solid rgba(17,17,17,0.08)' : 'none' }}>
            <div style={{ fontSize: '8.5px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, color: 'var(--noir)', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '10px', color: 'rgba(44,44,42,0.5)', fontWeight: 300 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* =====================================================
          BEST SELLERS + NEW ARRIVALS
      ===================================================== */}
      <ProductRail eyebrow="Best Sellers" title="The pieces women keep coming back for" products={bestsellers} />
      <ProductRail eyebrow="New Arrivals" title="Just landed" products={newArrivals} />

      <div style={{ textAlign: 'center', padding: '8px 24px 64px' }}>
        <Link href="/shop" className="btn-shop-collection">
          Shop the Full Collection
        </Link>
      </div>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}
      <TestimonialsRail testimonials={testimonials} />

      {/* =====================================================
          OUR STORY
      ===================================================== */}
      <section className="home-story" aria-label="Our Story">
        <div className="home-story-copy">
          <span className="home-story-eyebrow">Our Story</span>
          <h2 className="home-story-title">
            For the woman<br />who <em>leads,</em><br />not just works.
          </h2>

          <div className="story-points">
            <div className="story-point">
              <h3 className="story-point-title">Designed for Indian women</h3>
              <p className="story-point-body">Every silhouette is cut for the Indian body — proportions, drape, and fit that actually works.</p>
            </div>
            <div className="story-point">
              <h3 className="story-point-title">Structure without stiffness</h3>
              <p className="story-point-body">Pieces that hold their shape through long days. Formal enough for boardrooms, comfortable enough to forget you&apos;re wearing them.</p>
            </div>
            <div className="story-point">
              <h3 className="story-point-title">Made for the way you work</h3>
              <p className="story-point-body">A wardrobe designed to move between the office, the airport, the dinner, and everything in between.</p>
            </div>
          </div>

          <Link href="/about" className="home-story-link">
            Discover Our Story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-story-image">
          <img src="/images/about-image.png" alt="Formelle woman wearing tailored workwear" />
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}
      <FaqSection />

      {/* =====================================================
          FOOTER
      ===================================================== */}
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
              <li><Link href="/shop">Tops — Free Size</Link></li>
              <li><Link href="/shop">Trousers — XS to XL</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Help</div>
            <ul className="footer-links">
              <li><Link href="/#faq">FAQs</Link></li>
              <li><Link href="/#faq">Shipping Info</Link></li>
              <li><Link href="/#faq">Returns</Link></li>
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
