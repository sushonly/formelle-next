'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

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
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <Link href="/#shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <a href="https://instagram.com/formellewear" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Instagram</a>
          <a href="mailto:formellewear@outlook.com" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </>
  )
}
