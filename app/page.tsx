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
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 108px)' }}>
        <div style={{ background: 'var(--noir)', color: 'var(--ivory)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', position: 'relative', overflow: 'hidden' }}>
          <span style={{ fontSize: '10px', letterSpacing: '4px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: '28px' }}>New Collection · 2026</span>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(52px,6vw,88px)', fontWeight: 300, lineHeight: 1.0, color: 'var(--ivory)', marginBottom: '32px', letterSpacing: '-1px' }}>
            Dress like<br />the leader<br />you <em style={{ fontStyle: 'italic', color: 'var(--accent-light)' }}>already</em><br />are.
          </h1>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(240,236,227,0.65)', maxWidth: '380px', marginBottom: '12px' }}>
            Formal wear designed for women who move through boardrooms and break through ceilings. Structured, elegant, and built for the woman in charge.
          </p>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(240,236,227,0.5)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant)', marginBottom: '48px' }}>
            Worn by women leading rooms across India.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="#shop" style={{ background: 'var(--ivory)', color: 'var(--noir)', padding: '16px 40px', fontSize: '10px', letterSpacing: '3px', fontWeight: 600, textTransform: 'uppercase', border: '1px solid var(--ivory)' }}>
              Shop Now
            </Link>
            <Link href="/about" style={{ background: 'transparent', color: 'var(--ivory)', padding: '16px 40px', fontSize: '10px', letterSpacing: '3px', fontWeight: 500, textTransform: 'uppercase', border: '1px solid rgba(240,236,227,0.4)' }}>
              Our Story
            </Link>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', minHeight: '500px' }}>
          <img src="public/images/hero.png" alt="Formelle luxury formal wear" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
          <div style={{ position: 'absolute', top: '40px', right: '40px', background: 'var(--noir)', color: 'var(--ivory)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: 1.8, fontWeight: 500 }}>
            <span>Dressed</span><span>to</span><span>Lead</span>
          </div>
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
