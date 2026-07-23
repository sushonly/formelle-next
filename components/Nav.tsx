'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div style={{ background: 'var(--noir)', color: 'var(--ivory)', textAlign: 'center', padding: '10px 20px', fontSize: '11px', letterSpacing: '2px', fontWeight: 500, textTransform: 'uppercase' }}>
        Free shipping &nbsp;·&nbsp; Pan-India Delivery
      </div>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--ivory)', borderBottom: '1px solid rgba(17,17,17,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: '72px' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 400, letterSpacing: '4px', textTransform: 'uppercase' }}>
          Formelle
        </Link>

        <ul style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }} className="nav-links">
          <li><Link href="/#shop" style={{ fontSize: '10px', letterSpacing: '2.5px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--charcoal)' }}>Shop</Link></li>
          <li><Link href="/about" style={{ fontSize: '10px', letterSpacing: '2.5px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--charcoal)' }}>About</Link></li>
          <li><Link href="/#faq" style={{ fontSize: '10px', letterSpacing: '2.5px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--charcoal)' }}>FAQ</Link></li>
          <li><a href="https://instagram.com/formellewear" target="_blank" rel="noopener" style={{ fontSize: '10px', letterSpacing: '2.5px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--charcoal)' }}>Instagram</a></li>
          <li><a href="mailto:formellewear@outlook.com" style={{ fontSize: '10px', letterSpacing: '2.5px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--charcoal)' }}>Contact</a></li>
        </ul>
      </nav>
    </>
  )
}
