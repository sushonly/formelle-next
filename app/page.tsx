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
  const newArrivals = products.filter(
    p => (p.tag || '').toLowerCase() === 'new'
  )

  return (
    <>
      <Nav />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="hero"
        aria-label="Hero — Dressed to Lead"
      >
        <div className="hero-text">
          <span className="hero-eyebrow">
            New Collection · 2026
          </span>

          <h1 className="hero-headline">
            Dress like
            <br />
            the leader
            <br />
            you <em>already</em>
            <br />
            are.
          </h1>

          <p className="hero-sub">
            Formal wear designed for women who move through
            boardrooms and break through ceilings. Structured,
            elegant, and built for the woman in charge.
          </p>

          <p
            style={{
              fontSize: '11px',
              letterSpacing: '1.5px',
              color: 'rgba(240,236,227,0.5)',
              fontStyle: 'italic',
              fontFamily: "'Cormorant Garamond', serif",
              marginTop: '-20px',
              marginBottom: '38px',
            }}
          >
            Worn by women leading rooms across India.
          </p>

          <div className="hero-actions">
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>

            <Link href="/about" className="btn-outline">
              Our Story
            </Link>
          </div>
        </div>

        <div className="hero-image" aria-hidden="true">
          <img
            src="/images/hero.png"
            alt="Formelle luxury formal wear"
            className="hero-photo"
          />

          <div className="hero-image-bg"></div>

          <div className="hero-badge" aria-hidden="true">
            <span>Dressed</span>
            <span>to</span>
            <span>Lead</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST STRIP
      ===================================================== */}
      <div
        style={{
          background: 'var(--parchment)',
          borderTop: '0.5px solid rgba(17,17,17,0.08)',
          borderBottom: '0.5px solid rgba(17,17,17,0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
        className="trust-strip"
      >
        {[
          ['Free Shipping', 'On all orders'],
          ['Made in India', 'For Indian women'],
          ['Easy Exchange', 'Within 7 days'],
          ['Concierge Order', 'Via WhatsApp'],
        ].map(([title, sub], i) => (
          <div
            key={title}
            style={{
              padding: '18px 24px',
              textAlign: 'center',
              borderRight:
                i < 3
                  ? '0.5px solid rgba(17,17,17,0.08)'
                  : 'none',
            }}
          >
            <div
              style={{
                fontSize: '8.5px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--noir)',
                marginBottom: '4px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '10px',
                color: 'rgba(44,44,42,0.5)',
                fontWeight: 300,
              }}
            >
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          BEST SELLERS
          NOTE: ProductRail intentionally has NO prices.
      ===================================================== */}
      <ProductRail
        eyebrow="Best Sellers"
        title="The pieces women keep coming back for"
        products={bestsellers}
      />

      {/* =====================================================
          NEW ARRIVALS
          NOTE: ProductRail intentionally has NO prices.
      ===================================================== */}
      <ProductRail
        eyebrow="New Arrivals"
        title="Just landed"
        products={newArrivals}
      />

      {/* =====================================================
          FULL COLLECTION CTA
      ===================================================== */}
      <div
        style={{
          textAlign: 'center',
          padding: '4px 24px 48px',
        }}
      >
        <Link
          href="/shop"
          className="btn-shop-collection"
        >
          Shop the Full Collection
        </Link>
      </div>

      {/* =====================================================
          OUR STORY
          Compact editorial section.
      ===================================================== */}
     <section className="story-section">
  <div className="story-content">
    <span className="story-eyebrow">OUR STORY</span>

    <h2 className="story-title">
      For the woman
      <br />
      who <em>leads,</em>
      <br />
      not just works.
    </h2>

    <div className="story-copy">
      <p>
        Formelle was born from a simple frustration — finding formal wear
        that feels as powerful as the woman wearing it.
      </p>

      <p>
        So we create pieces with considered structure, thoughtful fit, and
        the ease to move through your entire day.
      </p>
    </div>

    <Link href="/about" className="story-link">
      DISCOVER OUR STORY
      <span>→</span>
    </Link>
  </div>

  <div className="story-image-wrap">
    <img
      src="/images/about-image.png"
      alt="Formelle woman wearing tailored workwear"
      className="story-image"
    />
  </div>
</section>

      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}
      <section
        className="home-philosophy"
        aria-label="Formelle Philosophy"
      >
        {/* Introduction */}
        <div className="home-philosophy-intro">
          <span className="home-philosophy-eyebrow">
            Our Philosophy
          </span>

          <h2 className="home-philosophy-title">
            Not a uniform.
            <br />
            Not a trend.
          </h2>

          <p>
            We don&apos;t design for seasons. We design pieces
            that earn their place in your wardrobe — made to
            be worn for years, not liked for a week.
          </p>
        </div>

        {/* Philosophy pillars */}
        <div className="philosophy-grid">
          {[
            [
              '01',
              'Designed for Indian women',
              'Every silhouette is cut for the Indian body — proportions, drape, and fit that actually works.',
            ],
            [
              '02',
              'Structure without stiffness',
              'Pieces that hold their shape through long days. Formal enough for boardrooms. Comfortable enough to forget you’re wearing them.',
            ],
            [
              '03',
              'Made for the way you work',
              'A wardrobe designed to move between the office, the airport, the dinner, and everything in between.',
            ],
          ].map(([num, title, body], i) => (
            <div
              key={num}
              className="philosophy-card"
              style={{
                borderRight:
                  i < 2
                    ? '0.5px solid rgba(240,236,227,0.12)'
                    : 'none',
              }}
            >
              <div className="philosophy-number">
                {num}
              </div>

              <div className="philosophy-card-title">
                {title}
              </div>

              <div className="philosophy-card-body">
                {body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}
      <TestimonialsRail testimonials={testimonials} />

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
            <div className="footer-brand-name">
              Formelle
            </div>

            <div className="footer-brand-tagline">
              &quot;Dressed to lead.&quot;
            </div>

            <p className="footer-brand-text">
              Luxury formal wear for the professional woman.
              Pan-India delivery.
            </p>
          </div>

          <div>
            <div className="footer-col-title">
              Shop
            </div>

            <ul className="footer-links">
              <li>
                <Link href="/shop">
                  All Products
                </Link>
              </li>

              <li>
                <Link href="/shop">
                  Tops
                </Link>
              </li>

              <li>
                <Link href="/shop">
                  Trousers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">
              Help
            </div>

            <ul className="footer-links">
              <li>
                <Link href="/#faq">
                  FAQs
                </Link>
              </li>

              <li>
                <Link href="/#faq">
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link href="/#faq">
                  Returns
                </Link>
              </li>

              <li>
                <a href="mailto:formellewear@outlook.com">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">
              Connect
            </div>

            <ul className="footer-links">
              <li>
                <a
                  href="https://instagram.com/formellewear"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @formellewear
                </a>
              </li>

              <li>
                <a href="mailto:formellewear@outlook.com">
                  formellewear@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 Formelle. All rights reserved.
          </div>

          <div className="footer-copy">
            Delivering across India ·{' '}
            <a
              href="https://www.formellewear.com"
              style={{ color: 'inherit' }}
            >
              formellewear.com
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================
          PAGE-SPECIFIC STYLES
          No changes to global.css required for these sections.
      ===================================================== */}
      <style>{`
        /* -----------------------------------------------
           STORY
        ------------------------------------------------ */

        .home-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 500px;
          max-height: 540px;
          background: var(--noir);
          color: var(--ivory);
          overflow: hidden;
        }

        .home-story-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 58px 7vw;
          box-sizing: border-box;
        }

        .home-story-eyebrow {
          display: block;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent-light);
          font-weight: 500;
          margin-bottom: 20px;
        }

        .home-story-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 4.2vw, 62px);
          font-weight: 300;
          line-height: 0.98;
          letter-spacing: -0.025em;
          margin: 0 0 28px;
          color: var(--ivory);
        }

        .home-story-title em {
          color: var(--accent-light);
          font-style: italic;
        }

        .home-story-text {
          max-width: 510px;
        }

        .home-story-text p {
          font-size: 12.5px;
          line-height: 1.75;
          font-weight: 300;
          color: rgba(240,236,227,0.64);
          margin: 0 0 12px;
        }

        .home-story-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          width: fit-content;
          margin-top: 12px;
          padding-bottom: 7px;
          border-bottom: 0.5px solid rgba(240,236,227,0.45);
          color: var(--ivory);
          text-decoration: none;
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 3px;
          transition: opacity 0.2s ease;
        }

        .home-story-link:hover {
          opacity: 0.65;
        }

        .home-story-link span {
          font-size: 15px;
          line-height: 1;
          letter-spacing: 0;
        }

        .home-story-image {
          min-height: 500px;
          max-height: 540px;
          overflow: hidden;
        }

        .home-story-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 42%;
        }


        /* -----------------------------------------------
           PHILOSOPHY
        ------------------------------------------------ */

        .home-philosophy {
          background: var(--noir);
          color: var(--ivory);
          padding: 72px 56px 76px;
        }

        .home-philosophy-intro {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 46px;
        }

        .home-philosophy-eyebrow {
          display: block;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent-light);
          font-weight: 500;
          margin-bottom: 16px;
        }

        .home-philosophy-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 4.5vw, 60px);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--ivory);
          margin: 0 0 22px;
        }

        .home-philosophy-intro p {
          max-width: 570px;
          margin: 0 auto;
          font-size: 12.5px;
          line-height: 1.8;
          color: rgba(240,236,227,0.62);
          font-weight: 300;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          border: 0.5px solid rgba(240,236,227,0.12);
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .philosophy-card {
          padding: 34px 36px 38px;
          min-width: 0;
          box-sizing: border-box;
        }

        .philosophy-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          font-style: italic;
          line-height: 1;
          color: rgba(240,236,227,0.22);
          margin-bottom: 38px;
        }

        .philosophy-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 23px;
          font-weight: 400;
          line-height: 1.12;
          color: var(--ivory);
          margin-bottom: 16px;
        }

        .philosophy-card-body {
          font-size: 12px;
          line-height: 1.8;
          color: rgba(240,236,227,0.56);
          font-weight: 300;
          max-width: 280px;
        }


        /* -----------------------------------------------
           MOBILE
        ------------------------------------------------ */

        @media (max-width: 768px) {

          /* Trust strip */
          .trust-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .trust-strip > div {
            padding: 14px 10px !important;
          }

          .trust-strip > div:nth-child(2) {
            border-right: none !important;
          }

          .trust-strip > div:nth-child(1),
          .trust-strip > div:nth-child(2) {
            border-bottom: 0.5px solid rgba(17,17,17,0.08);
          }


          /* Story */
          .home-story {
            grid-template-columns: 1fr;
            min-height: 0;
            max-height: none;
          }

          .home-story-copy {
            padding: 52px 24px 46px;
          }

          .home-story-eyebrow {
            margin-bottom: 16px;
          }

          .home-story-title {
            font-size: clamp(42px, 12vw, 56px);
            line-height: 0.98;
            margin-bottom: 24px;
          }

          .home-story-text p {
            font-size: 12px;
            line-height: 1.75;
          }

          .home-story-image {
            height: 390px;
            min-height: 390px;
            max-height: 390px;
          }

          .home-story-image img {
            object-position: center 38%;
          }


          /* Philosophy */
          .home-philosophy {
            padding: 58px 20px 62px;
          }

          .home-philosophy-intro {
            margin-bottom: 38px;
          }

          .home-philosophy-title {
            font-size: 44px;
          }

          .home-philosophy-intro p {
            font-size: 12px;
            line-height: 1.75;
          }

          .philosophy-grid {
            grid-template-columns: 1fr;
          }

          .philosophy-card {
            padding: 32px 24px 34px;
            border-right: none !important;
            border-bottom: 0.5px solid rgba(240,236,227,0.12);
          }

          .philosophy-card:last-child {
            border-bottom: none;
          }

          .philosophy-number {
            margin-bottom: 28px;
          }

          .philosophy-card-title {
            font-size: 25px;
            max-width: 300px;
          }

          .philosophy-card-body {
            max-width: 100%;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  )
}
