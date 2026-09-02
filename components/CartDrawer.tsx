'use client'
import { useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { supabase } from '@/lib/supabase'

const WHATSAPP = '919989674894'
const INDIAN_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Other']

export default function CartDrawer() {
  const { items, subtotal, isOpen, removeItem, clearCart, closeCart } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [formError, setFormError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  function goToCheckout() {
    if (!items.length) return
    setFormError(false)
    setCheckoutOpen(true)
  }

  function backToCart() {
    setCheckoutOpen(false)
  }

  async function sendToWhatsApp() {
    if (!firstName || !phone || !address1 || !city || !pincode || !state) {
      setFormError(true)
      return
    }
    setSubmitting(true)

    const orderItems = items.map(i => ({ name: i.name, size: i.size, qty: i.qty, price: i.price }))

    try {
      await supabase.from('orders').insert([{
        customer_name: `${firstName} ${lastName}`.trim(),
        phone,
        email: email || null,
        address: `${address1}${address2 ? ', ' + address2 : ''}`,
        city, state, pincode,
        items: orderItems,
        subtotal,
        shipping: 0,
        total: subtotal,
        status: 'pending',
        notes: null,
      }])
    } catch {}

    const lines = items.map(i => `- ${i.name} (${i.size}) x${i.qty} = Rs.${(i.price * i.qty).toLocaleString('en-IN')}`).join('\n')
const msg = `Hi Formelle! I'd like to place an order:\n\n*ORDER DETAILS*\n${lines}\n\n*Total: Rs.${subtotal.toLocaleString('en-IN')}*\n\n*DELIVERY ADDRESS*\nName: ${firstName} ${lastName}\nPhone: ${phone}${email ? '\nEmail: ' + email : ''}\nAddress: ${address1}${address2 ? ', ' + address2 : ''}\n${city}, ${state} - ${pincode}\n\nPlease share your UPI ID to complete payment. Thank you!`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitting(false)
    clearCart()
    setCheckoutOpen(false)
    closeCart()
  }

  return (
    <>
      <div className="cart-overlay" onClick={closeCart}></div>
      <aside className="cart-sidebar">
        {!checkoutOpen ? (
          <>
            <div className="cart-header">
              <div className="cart-title">Your Bag</div>
              <button className="cart-close" onClick={closeCart} aria-label="Close">✕</button>
            </div>

            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">◇</div>
                  <p>Your bag is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.key} className="cart-item">
                    <div className="cart-item-img">
                      {item.img ? <img src={item.img} alt={item.name} /> : <div className="cart-item-img-placeholder">F</div>}
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-meta">Size {item.size} · Qty {item.qty}</div>
                      <div className="cart-item-bottom">
                        <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                        <button className="cart-item-remove" onClick={() => removeItem(item.key)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-amount">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="cart-note">Free shipping on all orders.</p>
                <button className="btn-checkout" onClick={goToCheckout}>Checkout &amp; Order</button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="cart-header">
              <button className="cart-back" onClick={backToCart} aria-label="Back to bag">← Back</button>
              <button className="cart-close" onClick={closeCart} aria-label="Close">✕</button>
            </div>
            <div className="cart-items">
              <p className="checkout-section-title">Delivery Details</p>
              <div className="form-row">
                <div className="form-group"><label>First Name *</label><input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                <div className="form-group"><label>Last Name</label><input type="text" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
              </div>
              <div className="form-group"><label>Phone *</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div className="form-group"><label>Address Line 1 *</label><input type="text" placeholder="Flat / Building / Street" value={address1} onChange={e => setAddress1(e.target.value)} /></div>
              <div className="form-group"><label>Address Line 2</label><input type="text" placeholder="Area / Landmark (optional)" value={address2} onChange={e => setAddress2(e.target.value)} /></div>
              <div className="form-row">
                <div className="form-group"><label>City *</label><input type="text" value={city} onChange={e => setCity(e.target.value)} /></div>
                <div className="form-group"><label>Pincode *</label><input type="text" inputMode="numeric" maxLength={6} value={pincode} onChange={e => setPincode(e.target.value)} /></div>
              </div>
              <div className="form-group">
                <label>State *</label>
                <select value={state} onChange={e => setState(e.target.value)}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {formError && <p className="size-error" style={{ marginBottom: '12px' }}>Please fill in all required fields</p>}
            </div>
            <div className="cart-footer">
              <div className="cart-total-row">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-amount">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="wa-info">
                <div className="wa-info-icon">💬</div>
                <div className="wa-info-text"><strong>How it works</strong>WhatsApp opens with your full order pre-filled. Send it and we reply with our UPI ID.</div>
              </div>
              <button className="btn-wa" onClick={sendToWhatsApp} disabled={submitting}>
                {submitting ? 'Saving…' : '✅  Confirm Order on WhatsApp'}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
