'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const WHATSAPP = '919989674894'

export default function ProductDetail({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)

  const images = product.images?.filter(Boolean) || []
  const price = product.price.toLocaleString('en-IN')

  function orderOnWhatsApp() {
    if (!selectedSize) { setSizeError(true); return }
    const msg = `Hi Formelle! I'd like to order:\n\n*${product.name}*\nSize: ${selectedSize}\nPrice: ₹${price}\n\nPlease share your UPI ID to complete payment. Thank you!`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <main>
      {/* Breadcrumb */}
      <nav style={{ padding: '20px 48px', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(44,44,42,0.5)', display: 'flex', gap: '8px' }}>
        <Link href="/">Home</Link><span>/</span>
        <Link href="/#shop">Shop</Link><span>/</span>
        <span style={{ color: 'var(--noir)' }}>{product.name}</span>
      </nav>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, maxWidth: '1400px', margin: '0 auto', padding: '0 48px 80px' }}>

        {/* Gallery */}
        <div style={{ display: 'flex', gap: '10px', position: 'sticky', top: '88px', alignSelf: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                style={{ width: '68px', height: '84px', overflow: 'hidden', border: `1.5px solid ${i === activeImg ? 'var(--noir)' : 'transparent'}`, background: 'linear-gradient(160deg,#ede8df,#dfd9cc)', position: 'relative' }}>
                <Image src={img} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="68px" />
              </button>
            ))}
          </div>
          <div style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden', background: 'linear-gradient(160deg,#ede8df,#dfd9cc)', position: 'relative' }}>
            {images[activeImg] ? (
              <Image src={images[activeImg]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="50vw" priority />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-cormorant)', fontSize: '120px', color: 'rgba(17,17,17,0.07)', fontStyle: 'italic' }}>
                {product.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '0 0 0 64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            {product.tag && <span style={{ fontSize: '8px', letterSpacing: '2.5px', textTransform: 'uppercase', background: 'var(--noir)', color: 'var(--ivory)', padding: '4px 10px', fontWeight: 500 }}>{product.tag}</span>}
            <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>{product.category}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.5px', marginBottom: '8px' }}>{product.name}</h1>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '32px', fontWeight: 400, marginBottom: '24px' }}>₹{price}</p>
          <p style={{ fontSize: '13px', lineHeight: 1.9, color: 'rgba(44,44,42,0.7)', marginBottom: '28px', maxWidth: '420px' }}>{product.description}</p>

          {/* Sizes */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600 }}>Select Size</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {ALL_SIZES.map(sz => {
                const soldOut = (product.sold_out_sizes || []).includes(sz)
                return soldOut ? (
                  <div key={sz} title="Sold out" style={{ padding: '8px 14px', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', border: '1px solid rgba(17,17,17,0.12)', color: 'var(--charcoal)', opacity: 0.4, cursor: 'not-allowed', textDecoration: 'line-through', minWidth: '52px', textAlign: 'center' }}>{sz}</div>
                ) : (
                  <button key={sz} onClick={() => { setSelectedSize(sz); setSizeError(false) }}
                    style={{ padding: '8px 14px', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', border: `1px solid ${selectedSize === sz ? 'var(--noir)' : 'rgba(17,17,17,0.2)'}`, background: selectedSize === sz ? 'var(--noir)' : 'transparent', color: selectedSize === sz ? 'var(--ivory)' : 'var(--charcoal)', cursor: 'pointer', minWidth: '52px', textAlign: 'center' }}>
                    {sz}
                  </button>
                )
              })}
            </div>
            {sizeError && <p style={{ fontSize: '10px', color: '#c0392b', letterSpacing: '1px', marginTop: '6px' }}>Please select a size to continue</p>}
            {selectedSize && <p style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginTop: '8px' }}>Selected: {selectedSize}</p>}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            <button onClick={orderOnWhatsApp} style={{ background: '#25D366', color: '#fff', padding: '17px', fontSize: '10px', letterSpacing: '2.5px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
              💬 &nbsp; Order on WhatsApp
            </button>
          </div>

          {/* Accordion details */}
          <div style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}>
            {[
              { title: 'Fabric & Material', content: product.fabric },
              { title: 'Fit & Sizing', content: product.fit_notes },
              { title: 'Care Instructions', list: product.care },
              { title: 'Product Details', list: product.details },
            ].filter(a => a.content || a.list?.length).map(acc => (
              <details key={acc.title} style={{ borderBottom: '1px solid rgba(17,17,17,0.1)' }}>
                <summary style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', listStyle: 'none' }}>
                  {acc.title}<span>+</span>
                </summary>
                <div style={{ padding: '4px 0 20px', fontSize: '12px', lineHeight: 1.9, color: 'rgba(44,44,42,0.75)' }}>
                  {acc.content && <p>{acc.content}</p>}
                  {acc.list && <ul style={{ paddingLeft: '16px' }}>{acc.list.map((i, idx) => <li key={idx}>{i}</li>)}</ul>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '60px 48px 80px', background: 'var(--parchment)' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300, marginBottom: '32px' }}>You may <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>also like</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px' }}>
            {relatedProducts.slice(0, 4).map(p => (
              <Link key={p.id} href={`/product/${p.slug}`} style={{ display: 'block' }}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'linear-gradient(160deg,#ede8df,#dfd9cc)', position: 'relative' }}>
                  {p.images?.[0] && <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="25vw" />}
                </div>
                <div style={{ padding: '12px 4px 16px' }}>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '17px' }}>{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
