import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import Nav from '@/components/Nav'
import ProductCard from '@/components/ProductCard'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import UpcomingSection from '@/components/UpcomingSection'
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
      <section style={{ background: 'var(--noir)', color: 'var(--ivory)', minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
        <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: '24px', fontWeight: 500 }}>New Collection</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(48px,8vw,96px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '28px', maxWidth: '900px' }}>
          Dressed<br /><em style={{ fontStyle: 'italic' }}>to Lead.</em>
        </h1>
        <p style={{ fontSize: '13px', lineHeight: 1.9, color: 'rgba(240,236,227,0.65)', maxWidth: '480px', marginBottom: '8px' }}>
          Formal wear designed for women who move through boardrooms and break through ceilings.
        </p>
        <p style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(240,236,227,0.4)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant)', marginBottom: '48px' }}>
          Worn by women leading rooms across India.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="#shop" style={{ background: 'var(--ivory)', color: 'var(--noir)', padding: '16px 36px', fontSize: '10px', letterSpacing: '3px', fontWeight: 600, textTransform: 'uppercase' }}>
            Shop the Edit
          </Link>
          <Link href="/about" style={{ background: 'transparent', color: 'var(--ivory)', padding: '16px 36px', fontSize: '10px', letterSpacing: '3px', fontWeight: 500, textTransform: 'uppercase', border: '1px solid rgba(240,236,227,0.3)' }}>
            Our Story
          </Link>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" style={{ padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, display: 'block', marginBottom: '12px' }}>The Edit</span>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300, letterSpacing: '-0.02em' }}>Shop the Collection</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px', maxWidth: '1400px', margin: '0 auto' }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* UPCOMING */}
      <UpcomingSection />

      {/* ABOUT TEASER */}
      <section style={{ background: 'var(--parchment)', padding: '80px 48px', textAlign: 'center' }}>
        <span style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, display: 'block', marginBottom: '20px' }}>The Story</span>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, lineHeight: 1.2, maxWidth: '640px', margin: '0 auto 24px' }}>
          Built for the woman who already knows what she&apos;s doing.
        </h2>
        <Link href="/about" style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 500, color: 'var(--charcoal)', textDecoration: 'underline' }}>
          Read the founder story
        </Link>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 48px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 300, marginBottom: '40px', textAlign: 'center' }}>Questions</h2>
        {[
          ['How do I order?', 'DM us on Instagram @formellewear with the trigger word for the product you want, or click "Order on WhatsApp" on any product page. We confirm within minutes.'],
          ['What sizes do you carry?', 'XS through XXXL across all products. Each product page has a size guide with exact measurements.'],
          ['Do you ship pan-India?', 'Yes — free shipping on all orders. Delivered in 4–7 business days.'],
          ['What is your return policy?', 'Exchange within 7 days for sizing issues. Email formellewear@outlook.com or WhatsApp us.'],
        ].map(([q, a]) => (
          <details key={q as string} style={{ borderBottom: '1px solid rgba(17,17,17,0.1)', padding: '20px 0' }}>
            <summary style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.5px', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
              {q}<span>+</span>
            </summary>
            <p style={{ fontSize: '12px', lineHeight: 1.8, color: 'rgba(44,44,42,0.7)', marginTop: '12px' }}>{a}</p>
          </details>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--noir)', color: 'var(--ivory)', padding: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '24px', letterSpacing: '4px', textTransform: 'uppercase' }}>Formelle</div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(240,236,227,0.5)' }}>
          <Link href="/about">About</Link>
          <a href="https://instagram.com/formellewear" target="_blank" rel="noopener">Instagram</a>
          <a href="mailto:formellewear@outlook.com">Contact</a>
        </div>
        <p style={{ fontSize: '10px', color: 'rgba(240,236,227,0.3)', letterSpacing: '1px' }}>© 2026 Formelle. All rights reserved.</p>
      </footer>
    </>
  )
}
