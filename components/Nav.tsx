'use client'
import Link from 'next/link'

export default function Nav() {
  return (
    <>
      <div className="announcement">Free shipping &nbsp;·&nbsp; Pan-India Delivery</div>
      <nav>
        <Link href="/" className="nav-logo" aria-label="Formelle — Home">
          FORMELLE
          <span style={{ display: 'block', width: '100%', height: '0.5px', background: 'rgba(17,17,17,0.3)', margin: '3px 0 2px' }}></span>
          <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '9.5px', letterSpacing: '0.08em', textTransform: 'none', fontWeight: 400, opacity: 0.6, textAlign: 'center' }}>
            Dressed to lead.
          </span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/#shop">Shop</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/#faq">FAQ</Link></li>
          <li><a href="https://instagram.com/formellewear" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="mailto:formellewear@outlook.com">Contact</a></li>
        </ul>
        <button className="cart-btn" aria-label="Shopping bag">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span className="cart-count" aria-live="polite">0</span>
        </button>
      </nav>
    </>
  )
}
