'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const WHATSAPP = '919989674894'
const SG_DATA: Record<string, { headers: string[]; rows: string[][] }> = {
  tops: {
    headers: ['Size', 'Chest (in)', 'Shoulder (in)', 'Length (in)'],
    rows: [['XS','32-33','13.5','24'],['S','34-35','14','24.5'],['M','36-37','14.5','25'],['L','38-40','15','25.5'],['XL','41-43','15.5','26'],['XXL','44-46','16','26.5'],['XXXL','47-49','16.5','27']],
  },
  trousers: {
    headers: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)'],
    rows: [['XS','24-25','33-34','28'],['S','26-27','35-36','28.5'],['M','28-29','37-38','29'],['L','30-32','39-41','29.5'],['XL','33-35','42-44','30'],['XXL','36-38','45-47','30'],['XXXL','39-41','48-50','30.5']],
  },
  dresses: {
    headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)'],
    rows: [['XS','32-33','24-25','33-34'],['S','34-35','26-27','35-36'],['M','36-37','28-29','37-38'],['L','38-40','30-32','39-41'],['XL','41-43','33-35','42-44'],['XXL','44-46','36-38','45-47'],['XXXL','47-49','39-41','48-50']],
  },
}
const CAT_LABELS: Record<string, string> = { top: 'Top', trouser: 'Trouser', dress: 'Dress', blazer: 'Blazer' }
const SG_CAT_MAP: Record<string, string> = { trouser: 'trousers', dress: 'dresses' }

export default function ProductDetail({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)
  const [openAcc, setOpenAcc] = useState<number | null>(null)
  const [sgOpen, setSgOpen] = useState(false)
  const [sgTab, setSgTab] = useState('tops')
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [notifySize, setNotifySize] = useState('')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyPhone, setNotifyPhone] = useState('')
  const [notifyError, setNotifyError] = useState(false)
  const [notifySubmitting, setNotifySubmitting] = useState(false)
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [toast, setToast] = useState('')

  const images = product.images?.filter(Boolean) || []
  const catLabel = CAT_LABELS[product.category] || product.category
  const sgCat = SG_CAT_MAP[product.category] || 'tops'
  const price = product.price.toLocaleString('en-IN')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function openNotify(size: string) {
    setNotifySize(size)
    setNotifyEmail('')
    setNotifyPhone('')
    setNotifyError(false)
    setNotifySuccess(false)
    setNotifyOpen(true)
  }

  async function submitNotify() {
    if (!notifyEmail && !notifyPhone) {
      setNotifyError(true)
      setTimeout(() => setNotifyError(false), 1500)
      return
    }
    setNotifySubmitting(true)
    try {
      await supabase.from('restock_requests').insert([{
        product_id: product.id,
        product_name: product.name,
        size: notifySize,
        email: notifyEmail || null,
        phone: notifyPhone || null,
      }])
    } catch {}
    setNotifySubmitting(false)
    setNotifySuccess(true)
    setTimeout(() => setNotifyOpen(false), 2500)
  }

  function addToBag() {
    if (!selectedSize) { setSizeError(true); return }
    showToast(`Added — ${product.name} / ${selectedSize}`)
  }

  function orderOnWhatsApp() {
    if (!selectedSize) { setSizeError(true); return }
    const msg = `Hi Formelle! I'd like to order:\n\n*${product.name}*\nSize: ${selectedSize}\nPrice: ₹${price}\n\nPlease share your UPI ID to complete payment. Thank you!`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const accordions = [
    product.fabric ? { title: 'Fabric & Material', content: product.fabric, tags: product.fabric_tags } : null,
    product.fit_notes ? { title: 'Fit & Sizing', content: product.fit_notes } : null,
    product.details?.length ? { title: 'Product Details', list: product.details } : null,
    product.care?.length ? { title: 'Care Instructions', list: product.care } : null,
    { title: 'Shipping & Returns', jsx: (
      <>
        <strong>Shipping:</strong> Pan-India delivery. 4-7 business days. Free shipping.<br /><br />
        <strong>Returns:</strong> Exchange within 7 days for sizing issues. Contact formellewear@outlook.com or WhatsApp.
      </>
    ) },
  ].filter(Boolean) as { title: string; content?: string; list?: string[]; tags?: string[]; jsx?: React.ReactNode }[]

  return (
    <main>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span>/</span>
        <Link href="/#shop">Shop</Link> <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-page">
        <div className="product-gallery">
          <div className="thumb-strip">
            {images.map((img, i) => (
              <div key={i} className={`thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                <img src={img} alt={product.name} />
              </div>
            ))}
          </div>
          <div className="main-img-area">
            {images.map((img, i) => (
              <div key={i} className={`main-img-slide ${i === activeImg ? 'active' : ''}`}>
                <img src={img} alt={product.name} />
              </div>
            ))}
            {images.length > 1 && <div className="img-counter">{activeImg + 1} / {images.length}</div>}
          </div>
          <div className="mobile-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${activeImg * 100}%)` }}>
              {images.map((img, i) => (
                <div key={i} className="carousel-slide"><img src={img} alt={product.name} /></div>
              ))}
            </div>
            {images.length > 1 && <>
              <button className="carousel-arrow prev" onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}>‹</button>
              <button className="carousel-arrow next" onClick={() => setActiveImg((activeImg + 1) % images.length)}>›</button>
              <div className="carousel-dots">
                {images.map((_, i) => <div key={i} className={`carousel-dot ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)} />)}
              </div>
            </>}
          </div>
        </div>

        <div className="product-info">
          <div className="product-tag-row">
            {product.tag && <span className="ptag">{product.tag}</span>}
            <span className="pcategory">{catLabel}</span>
          </div>
          <h1 className="product-name-h1">{product.name}</h1>
          <div className="product-price-large">₹{price}</div>
          <p className="product-short-desc">{product.description}</p>

          <div className="size-section">
            <div className="size-row-head">
              <span className="size-heading">Select Size</span>
              <button className="size-guide-btn" onClick={() => { setSgTab(sgCat); setSgOpen(true) }}>Size Guide</button>
            </div>
            <div className="size-chips">
              {ALL_SIZES.map(sz => {
                const soldOut = (product.sold_out_sizes || []).includes(sz)
                return soldOut ? (
                  <div key={sz} className="size-chip sold-out" onClick={() => openNotify(sz)}>
                    {sz}
                    <span className="notify-badge">Notify me</span>
                  </div>
                ) : (
                  <button key={sz} className={`size-chip ${selectedSize === sz ? 'active' : ''}`} onClick={() => { setSelectedSize(sz); setSizeError(false) }}>
                    {sz}
                  </button>
                )
              })}
            </div>
            {sizeError && <p className="size-error">Please select a size to continue</p>}
            {selectedSize && <p className="selected-size-display">Selected: {selectedSize}</p>}
          </div>

          <div className="cta-row">
            <button className="btn-add-bag" onClick={addToBag}>Add to Bag</button>
            <button className="btn-whatsapp-order" onClick={orderOnWhatsApp}>💬 &nbsp; Order on WhatsApp</button>
          </div>

          <div className="accordion">
            {accordions.map((acc, i) => (
              <div key={i} className="acc-item">
                <div className="acc-trigger" onClick={() => setOpenAcc(openAcc === i ? null : i)}>
                  <span>{acc.title}</span>
                  <span className="acc-icon" style={{ transform: openAcc === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </div>
                <div style={{ maxHeight: openAcc === i ? '400px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <div className="acc-content">
                    {acc.content}
                    {acc.jsx}
                    {acc.tags && acc.tags.length > 0 && (
                      <div className="fabric-tags">{acc.tags.map((t, ti) => <span key={ti} className="fabric-tag">{t}</span>)}</div>
                    )}
                    {acc.list && <ul>{acc.list.map((li, li_i) => <li key={li_i}>{li}</li>)}</ul>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="also-like">
          <div className="also-header">
            <h2 className="also-title">You may <em>also like</em></h2>
            <Link href="/#shop" style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--charcoal)', fontWeight: 500, textDecoration: 'underline' }}>View all</Link>
          </div>
          <div className="also-grid">
            {relatedProducts.slice(0, 4).map(p => (
              <Link key={p.id} href={`/product/${p.slug}`} className="also-card">
                <div className="also-img">
                  {p.images?.[0] && <img src={p.images[0]} alt={p.name} />}
                </div>
                <div className="also-info">
                  <div className="also-cat">{CAT_LABELS[p.category] || p.category}</div>
                  <div className="also-name">{p.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {sgOpen && (
        <div className="sg-overlay" onClick={(e) => e.target === e.currentTarget && setSgOpen(false)}>
          <div className="sg-modal">
            <div className="sg-head">
              <div className="sg-head-title">Size Guide</div>
              <button className="sg-close" onClick={() => setSgOpen(false)}>✕</button>
            </div>
            <div className="sg-body">
              <div className="sg-tabs">
                {['tops', 'trousers', 'dresses'].map(t => (
                  <button key={t} className={`sg-tab ${sgTab === t ? 'active' : ''}`} onClick={() => setSgTab(t)}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <table className="sg-table">
                <thead><tr>{SG_DATA[sgTab].headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {SG_DATA[sgTab].rows.map((row, ri) => (
                    <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
              <p className="sg-note">If between sizes, size up for a relaxed fit.</p>
            </div>
          </div>
        </div>
      )}

      {notifyOpen && (
        <div className="notify-overlay" onClick={(e) => e.target === e.currentTarget && setNotifyOpen(false)}>
          <div className="notify-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300 }}>Notify Me</h3>
              <button onClick={() => setNotifyOpen(false)} style={{ fontSize: '20px', color: 'rgba(44,44,42,0.5)' }}>✕</button>
            </div>
            <p style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', margin: '18px 0 6px' }}>{product.name} — Size {notifySize}</p>
            <p style={{ fontSize: '12px', color: 'rgba(44,44,42,0.6)', lineHeight: 1.7, marginBottom: '24px' }}>We&apos;ll reach out the moment this is back in stock.</p>
            {!notifySuccess ? (
              <>
                <label className="notify-label">Email</label>
                <input type="email" className={`notify-input ${notifyError ? 'error' : ''}`} placeholder="your@email.com" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} />
                <label className="notify-label">Phone <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                <input type="tel" className="notify-input" placeholder="+91 98765 43210" value={notifyPhone} onChange={e => setNotifyPhone(e.target.value)} />
                <button className="notify-btn" onClick={submitNotify} disabled={notifySubmitting}>
                  {notifySubmitting ? 'Saving…' : 'Notify Me'}
                </button>
                <p style={{ fontSize: '10px', color: 'rgba(44,44,42,0.4)', textAlign: 'center', marginTop: '10px' }}>No spam. One message when it&apos;s ready.</p>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic', color: 'var(--accent)', marginBottom: '8px' }}>You&apos;re on the list.</p>
                <p style={{ fontSize: '12px', color: 'rgba(44,44,42,0.6)' }}>We&apos;ll reach out as soon as it&apos;s back in stock.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </main>
  )
}
