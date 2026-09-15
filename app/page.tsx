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
           Wear who<br />you’re<br /><em>becoming.</em>
          </h1>
          <p className="hero-sub">
           Identity-led workwear for the modern professional woman.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn-primary">Shop the Collection</Link>
            <Link href="/about" className="btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true">
          <img src="/images/hero.png" alt="Formelle luxury formal wear" className="hero-photo" />
          <div className="hero-image-bg"></div>
      
        </div>
      </section>

      {/* =====================================================
          TRUST BAR
      ===================================================== */}
      <div style={{ background: 'var(--parchment)', borderTop: '0.5px solid rgba(17,17,17,0.08)', borderBottom: '0.5px solid rgba(17,17,17,0.08)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
    {[
  ['Designed for Indian Women', 'Proportions that work with you'],
  ['Inclusive Sizing', 'XS–XXL'],
  ['Concierge Order', 'Order via WhatsApp'],
  ['Easy Exchange', 'Within 7 days'],
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
      <ProductRail eyebrow="New at Formelle" title="The latest pieces" products={newArrivals} />
      <ProductRail eyebrow="Best Sellers" title="The pieces women keep coming back for" products={bestsellers} />

      {/* =====================================================
    IDENTITY — HOW DO YOU WANT TO SHOW UP?
===================================================== */}
<section className="identity-section" aria-label="Explore Formelle identities">
  <div className="identity-header">

    <h2 className="identity-title">
      How do you want<br />
      to <em>show up?</em>
    </h2>

    <p className="identity-intro">
      The same woman. Different days. Different presence.
    </p>
  </div>

  <div className="identity-grid">

    <Link href="/identity/confident" className="identity-card">
      <span className="identity-number">01</span>
      <div className="identity-card-content">
        <h3>Confident</h3>
        <p>Self-assured</p>
      </div>
      <span className="identity-arrow">↗</span>
    </Link>

    <Link href="/identity/authoritative" className="identity-card">
      <span className="identity-number">02</span>
      <div className="identity-card-content">
        <h3>Authoritative</h3>
        <p>Commanding</p>
      </div>
      <span className="identity-arrow">↗</span>
    </Link>

    <Link href="/identity/composed" className="identity-card">
      <span className="identity-number">03</span>
      <div className="identity-card-content">
        <h3>Composed</h3>
        <p>Calm + polished</p>
      </div>
      <span className="identity-arrow">↗</span>
    </Link>

    <Link href="/identity/bold" className="identity-card">
      <span className="identity-number">04</span>
      <div className="identity-card-content">
        <h3>Bold</h3>
        <p>Assertive + expressive</p>
      </div>
      <span className="identity-arrow">↗</span>
    </Link>

    <Link href="/identity/magnetic" className="identity-card">
      <span className="identity-number">05</span>
      <div className="identity-card-content">
        <h3>Magnetic</h3>
        <p>Charismatic + memorable</p>
      </div>
      <span className="identity-arrow">↗</span>
    </Link>

    <Link href="/identity/effortless" className="identity-card">
      <span className="identity-number">06</span>
      <div className="identity-card-content">
        <h3>Effortless</h3>
        <p>Natural + understated</p>
      </div>
      <span className="identity-arrow">↗</span>
    </Link>

  </div>
</section>

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
  {/* =====================================================
    OUR PHILOSOPHY
===================================================== */}
<section className="home-story" aria-label="Our Philosophy">
  <div className="home-story-copy">

    <span className="home-story-eyebrow">Our Philosophy</span>

    <h2 className="home-story-title">
      Your clothes<br />
      speak <em>before</em><br />
      you do.
    </h2>

    <p className="home-story-text">
      Before you say a word, what you wear is already part of the
      conversation. It shapes the signals you send — how you show up,
      how you feel, and how you are perceived.
    </p>

    <div className="story-points">

      <div className="story-point">
        <h3 className="story-point-title">
          Designed for Indian women
        </h3>
        <p className="story-point-body">
          Every silhouette is considered for the Indian body —
          proportions, drape and fit that work with you.
        </p>
      </div>

      <div className="story-point">
        <h3 className="story-point-title">
          Structure without stiffness
        </h3>
        <p className="story-point-body">
          Tailoring that holds its shape through long days,
          without asking you to sacrifice comfort.
        </p>
      </div>

      <div className="story-point">
        <h3 className="story-point-title">
          Made for how you work
        </h3>
        <p className="story-point-body">
          Pieces designed to move with you — from the office
          to the airport, dinner and everything in between.
        </p>
      </div>

    </div>

    <Link href="/about" className="home-story-link">
      Discover Our Story
      <span aria-hidden="true">→</span>
    </Link>

  </div>

  <div className="home-story-image">
    <img
      src="/images/about-image.png"
      alt="Formelle woman wearing tailored workwear"
    />
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
