import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import Nav from '@/components/Nav'
import ProductCard from '@/components/ProductCard'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import UpcomingSection from '@/components/UpcomingSection'
import FaqSection from '@/components/FaqSection'
import Link from 'next/link'

async function getProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  return data || []
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero" aria-label="Hero — Dressed to Lead">
        <div className="hero-text">
          <span className="hero-eyebrow">New Collection · 2026</span>
          <h1 className="hero-headline">
            Dress like<br />the leader<br />you <em>already</em><br />are.
          </h1>
          <p className="hero-sub">Formal wear designed for women who move through boardrooms and break through ceilings. Structured, elegant, and built for the woman in charge.</p>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(240,236,227,0.5)', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginTop: '-28px', marginBottom: '48px' }}>
            Worn by women leading rooms across India.
          </p>
          <div className="hero-actions">
            <Link href="#shop" className="btn-primary">Shop Now</Link>
            <Link href="/about" className="btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true">
          <img src="/images/hero.png" alt="Formelle luxury formal wear" className="hero-photo" />
          <div className="hero-image-bg"></div>
          <div className="hero-badge" aria-hidden="true"><span>Dressed</span><span>to</span><span>Lead</span></div>
        </div>
      </section>

      {/* TRUST BAR */}
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

      {/* MARQUEE */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).flatMap((_, rep) =>
            ['Power Dressing', 'For Every Size', 'Executive Fashion', 'Luxury Workwear', 'Dressed to Lead'].map((item, i) => (
              <div key={`${rep}-${i}`} className="marquee-item">{item}</div>
            ))
          )}
        </div>
      </div>

      {/* SHOP */}
      <section id="shop" aria-label="Shop — Women's Formal Wear Collection">
        <div className="section-header">
          <h2 className="section-title">Our Collection</h2>
        </div>
        <div className="product-grid" aria-live="polite">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* UPCOMING */}
      <UpcomingSection />

      {/* ABOUT */}
      <section id="about" aria-label="About Formelle">
        <div>
          <span className="section-eyebrow" style={{ color: 'var(--accent-light)', marginBottom: '16px', display: 'block' }}>Our Story</span>
          <h2 className="about-headline">For the woman<br />who <em>leads</em>,<br />not just works.</h2>
          <p className="about-body">
            Formelle was born from a simple frustration — why is it so hard to find formal wear that feels as powerful as you do? Clothes that fit well, move with you, and say &quot;I&apos;m in charge&quot; the moment you walk in.
            <br /><br />
            We design for the consulting principal who has back-to-back meetings. The founder who just closed a round. The manager who&apos;s the youngest in the room, and owns it. Every piece is structured where it counts and thoughtful in the details. Designed for the women leading India.
          </p>
          <div className="about-stats">
            <div><div className="about-stat-num">India</div><div className="about-stat-label">Delivered Nationwide</div></div>
            <div><div className="about-stat-num">All</div><div className="about-stat-label">Sizes Available</div></div>
          </div>
        </div>
        <div className="about-visual" aria-hidden="true">
          <img src="/images/about-image.png" alt="Professional woman wearing Formelle formalwear" className="about-photo" />
          <div className="about-overlay"></div>
          <div className="about-tagline">&quot;Dressed to lead.&quot;</div>
        </div>
      </section>

      {/* WHY FORMELLE */}
      <section style={{ background: 'var(--parchment)', padding: '72px 56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '8.5px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, display: 'block', marginBottom: '12px' }}>Why Formelle</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            What sets us <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>apart</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, border: '0.5px solid rgba(17,17,17,0.1)' }}>
          {[
            ['01', 'Designed for Indian women', 'Every silhouette is cut for the Indian body — proportions, drape, and fit that actually works. Not imported templates, not afterthoughts.'],
            ['02', 'Structure without stiffness', "Pieces that hold their shape through 10-hour days. Formal enough for boardrooms. Comfortable enough to forget you're wearing them."],
            ['03', 'Concierge by WhatsApp', 'Order via WhatsApp, pay via UPI. A real person confirms every order. No bots — just direct, personal service.'],
          ].map(([num, title, body], i) => (
            <div key={num} style={{ padding: '40px 36px', borderRight: i < 2 ? '0.5px solid rgba(17,17,17,0.1)' : 'none' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'rgba(17,17,17,0.1)', marginBottom: '20px', fontStyle: 'italic' }}>{num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'var(--noir)', marginBottom: '12px' }}>{title}</div>
              <div style={{ fontSize: '12px', lineHeight: 1.8, color: 'rgba(44,44,42,0.6)', fontWeight: 300 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* FOOTER */}
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
              <li><Link href="#shop">All Products</Link></li>
              <li><Link href="#shop">Tops — Free Size</Link></li>
              <li><Link href="#shop">Trousers — XS to XL</Link></li>
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
