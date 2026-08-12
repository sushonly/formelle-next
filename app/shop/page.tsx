import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import ShopSection from '@/components/ShopSection'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Shop — Formelle | Women's Formal Wear India",
  description: 'Browse the full Formelle collection — formal trousers, tops, dresses, and blazers for women in India. Free shipping, all sizes available.',
}

async function getProducts(): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').eq('is_active', true).order('sort_order', { ascending: true })
  return data || []
}

export default async function ShopPage() {
  const products = await getProducts()
  return (
    <>
      <Nav />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span>/</span>
        <span>Shop</span>
      </nav>
      <ShopSection products={products} />
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
              <li><Link href="/shop">Tops</Link></li>
              <li><Link href="/shop">Trousers</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Help</div>
            <ul className="footer-links">
              <li><Link href="/#faq">FAQs</Link></li>
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
