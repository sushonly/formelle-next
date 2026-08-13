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
              marginBottom: '34px',
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

          <div className="hero-image-bg" />

          <div className="hero-badge">
            <span>Dressed</span>
            <span>to</span>
            <span>Lead</span>
          </div>

        </div>
      </section>


      {/* =====================================================
          TRUST / SERVICE STRIP
      ===================================================== */}

      <section
        className="home-trust-strip"
        aria-label="Formelle benefits"
      >
        {[
          ['Free Shipping', 'On all orders'],
          ['Made in India', 'For Indian women'],
          ['Easy Exchange', 'Within 7 days'],
          ['Concierge Order', 'Via WhatsApp'],
        ].map(([title, sub], i) => (
          <div
            key={title}
            className="home-trust-item"
          >
            <div className="home-trust-title">
              {title}
            </div>

            <div className="home-trust-sub">
              {sub}
            </div>
          </div>
        ))}
      </section>


      {/* =====================================================
          BEST SELLERS
      ===================================================== */}

      <ProductRail
        eyebrow="Best Sellers"
        title="The pieces women keep coming back for"
        products={bestsellers}
      />


      {/* =====================================================
          BRAND STORY
      ===================================================== */}

      <section
        className="home-story"
        aria-label="Our Story"
      >

        <div className="home-story-content">

          <span className="section-eyebrow">
            Our Story
          </span>

          <h2>
            For the woman
            <br />
            who <em>leads,</em>
            <br />
            not just works.
          </h2>

          <p>
            Formelle was born from a simple frustration —
            why is it so hard to find formal wear that feels
            as powerful as you do?
          </p>

          <p>
            Clothes that fit well, move with you, and say
            &quot;I&apos;m in charge&quot; the moment you walk in.
          </p>

          <p>
            We design for the consulting principal with
            back-to-back meetings. The founder who just
            closed a round. The manager who&apos;s the youngest
            in the room, and owns it.
          </p>

          <Link
            href="/about"
            className="home-story-link"
          >
            Discover our story
            <span>→</span>
          </Link>

        </div>

        <div className="home-story-image">

          {/*
            IMPORTANT:
            Change this filename if your Story image has
            a different filename in /public/images/
          */}
          <img
            src="/images/story.png"
            alt="Formelle woman in tailored formal wear"
            loading="lazy"
          />

        </div>

      </section>


      {/* =====================================================
          NEW ARRIVALS
      ===================================================== */}

      <ProductRail
        eyebrow="New Arrivals"
        title="Just landed"
        products={newArrivals}
      />


      {/* =====================================================
          FULL COLLECTION CTA
      ===================================================== */}

      <div className="home-collection-cta">
        <Link
          href="/shop"
          className="btn-shop-collection"
        >
          Shop the Full Collection
        </Link>
      </div>


      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section
        className="philosophy-section"
        aria-label="Our Philosophy"
      >

        {/* Philosophy introduction */}

        <div className="philosophy-intro">

          <span className="philosophy-eyebrow">
            Our Philosophy
          </span>

          <h2>
            Not a uniform.
            <br />
            Not a trend.
          </h2>

          <p>
            We don&apos;t design for seasons. We design for the
            consultant with back-to-back meetings. The founder
            who just closed a round. The manager who&apos;s the
            youngest in the room and owns it.
          </p>

          <p>
            Every piece is made to be worn for years,
            not liked for a week.
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
              className="philosophy-card"
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

      {testimonials.length > 0 && (
        <TestimonialsRail
          testimonials={testimonials}
        />
      )}


      {/* =====================================================
          FINAL SHOP CTA
      ===================================================== */}

      <section className="home-final-cta">

        <span className="section-eyebrow">
          The Formelle Wardrobe
        </span>

        <h2>
          Dress for where
          <br />
          you&apos;re going.
        </h2>

        <p>
          Timeless tailoring. Modern silhouettes.
          Clothes built for the way you work.
        </p>

        <Link
          href="/shop"
          className="btn-primary"
        >
          Explore the Collection
        </Link>

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
                <Link href="#faq">
                  FAQs
                </Link>
              </li>

              <li>
                <Link href="#faq">
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link href="#faq">
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
          Keeping these in page.tsx as requested
      ===================================================== */}

      <style>{`

        /* ===================================================
           TRUST STRIP
        =================================================== */

        .home-trust-strip {
          background: var(--parchment);
          border-top: 0.5px solid rgba(17,17,17,0.08);
          border-bottom: 0.5px solid rgba(17,17,17,0.08);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .home-trust-item {
          padding: 18px 20px;
          text-align: center;
          border-right: 0.5px solid rgba(17,17,17,0.08);
        }

        .home-trust-item:last-child {
          border-right: none;
        }

        .home-trust-title {
          font-size: 8.5px;
          letter-spacing: 2.3px;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--noir);
          margin-bottom: 4px;
        }

        .home-trust-sub {
          font-size: 10px;
          color: rgba(44,44,42,0.5);
          font-weight: 300;
        }


        /* ===================================================
           STORY SECTION
        =================================================== */

        .home-story {
          background: var(--noir);
          color: var(--ivory);
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          min-height: 620px;
          width: 100%;
          overflow: hidden;
        }

        .home-story-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px 7vw;
          box-sizing: border-box;
        }

        .home-story-content .section-eyebrow {
          color: var(--accent-light);
          margin-bottom: 22px;
        }

        .home-story-content h2 {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(44px, 5vw, 68px);
          font-weight: 300;
          line-height: 0.98;
          letter-spacing: -0.025em;
          margin: 0 0 32px;
          color: var(--ivory);
        }

        .home-story-content h2 em {
          color: var(--accent-light);
          font-weight: 300;
        }

        .home-story-content p {
          max-width: 500px;
          font-size: 13px;
          line-height: 1.8;
          color: rgba(240,236,227,0.63);
          font-weight: 300;
          margin: 0 0 16px;
        }

        .home-story-link {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          width: fit-content;
          margin-top: 20px;
          color: var(--ivory);
          text-decoration: none;
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(240,236,227,0.4);
          padding-bottom: 8px;
        }

        .home-story-link span {
          font-size: 15px;
          line-height: 1;
        }

        .home-story-image {
          min-height: 620px;
          overflow: hidden;
        }

        .home-story-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }


        /* ===================================================
           COLLECTION CTA
        =================================================== */

        .home-collection-cta {
          text-align: center;
          padding: 36px 24px 54px;
          background: var(--parchment);
        }


        /* ===================================================
           PHILOSOPHY
        =================================================== */

        .philosophy-section {
          background: var(--noir);
          color: var(--ivory);
          padding: 82px 56px 88px;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .philosophy-intro {
          text-align: center;
          max-width: 660px;
          margin: 0 auto 52px;
        }

        .philosophy-eyebrow {
          display: block;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent-light);
          font-weight: 500;
          margin-bottom: 18px;
        }

        .philosophy-intro h2 {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--ivory);
          margin: 0 0 24px;
        }

        .philosophy-intro p {
          max-width: 600px;
          margin: 0 auto 8px;
          font-size: 13px;
          line-height: 1.8;
          color: rgba(240,236,227,0.65);
          font-weight: 300;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          border: 0.5px solid rgba(240,236,227,0.12);
          box-sizing: border-box;
        }

        .philosophy-card {
          min-width: 0;
          padding: 38px 34px;
          box-sizing: border-box;
          border-right: 0.5px solid rgba(240,236,227,0.12);
        }

        .philosophy-card:last-child {
          border-right: none;
        }

        .philosophy-number {
          font-family: "Cormorant Garamond", serif;
          font-size: 36px;
          font-weight: 300;
          font-style: italic;
          line-height: 1;
          color: rgba(240,236,227,0.22);
          margin-bottom: 38px;
        }

        .philosophy-card-title {
          font-family: "Cormorant Garamond", serif;
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


        /* ===================================================
           FINAL CTA
        =================================================== */

        .home-final-cta {
          text-align: center;
          padding: 76px 24px 80px;
          background: var(--parchment);
        }

        .home-final-cta .section-eyebrow {
          display: block;
          margin-bottom: 18px;
        }

        .home-final-cta h2 {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(44px, 5vw, 64px);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.025em;
          color: var(--noir);
          margin: 0 0 18px;
        }

        .home-final-cta p {
          max-width: 480px;
          margin: 0 auto 30px;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(44,44,42,0.58);
          font-weight: 300;
        }


        /* ===================================================
           TABLET
        =================================================== */

        @media (max-width: 900px) {

          .home-story {
            grid-template-columns: 1fr;
          }

          .home-story-content {
            padding: 64px 40px 54px;
            order: 1;
          }

          .home-story-image {
            min-height: 520px;
            order: 2;
          }

          .philosophy-section {
            padding-left: 32px;
            padding-right: 32px;
          }

        }


        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 768px) {

          .home-trust-strip {
            grid-template-columns: repeat(2, 1fr);
          }

          .home-trust-item {
            padding: 15px 10px;
          }

          .home-trust-item:nth-child(2) {
            border-right: none;
          }

          .home-trust-item:nth-child(1),
          .home-trust-item:nth-child(2) {
            border-bottom: 0.5px solid rgba(17,17,17,0.08);
          }

          .home-trust-title {
            font-size: 7.5px;
            letter-spacing: 1.8px;
          }

          .home-trust-sub {
            font-size: 9px;
          }


          .home-story {
            min-height: 0;
          }

          .home-story-content {
            padding: 58px 24px 48px;
          }

          .home-story-content h2 {
            font-size: clamp(42px, 12vw, 58px);
            margin-bottom: 24px;
          }

          .home-story-content p {
            font-size: 12px;
            line-height: 1.75;
          }

          .home-story-image {
            min-height: 440px;
            height: 440px;
          }


          .home-collection-cta {
            padding: 30px 20px 42px;
          }


          .philosophy-section {
            padding: 58px 16px 64px;
          }

          .philosophy-intro {
            margin-bottom: 40px;
          }

          .philosophy-intro h2 {
            font-size: 46px;
            margin-bottom: 20px;
          }

          .philosophy-intro p {
            font-size: 12px;
            line-height: 1.75;
          }

          .philosophy-grid {
            grid-template-columns: 1fr;
            width: 100%;
          }

          .philosophy-card {
            padding: 32px 22px 36px;
            border-right: none;
            border-bottom: 0.5px solid rgba(240,236,227,0.12);
          }

          .philosophy-card:last-child {
            border-bottom: none;
          }

          .philosophy-number {
            margin-bottom: 30px;
          }


          .home-final-cta {
            padding: 60px 20px 64px;
          }

          .home-final-cta h2 {
            font-size: 48px;
          }

        }


        /* ===================================================
           SMALL MOBILE
        =================================================== */

        @media (max-width: 480px) {

          .home-story-content {
            padding: 52px 20px 44px;
          }

          .home-story-image {
            height: 390px;
            min-height: 390px;
          }

          .philosophy-card-title {
            font-size: 22px;
          }

          .philosophy-card-body {
            font-size: 11.5px;
          }

        }

      `}</style>
    </>
  )
}
