'use client'
import { useState } from 'react'
import { checkCoupon, type AppliedCoupon } from '@/lib/coupons'

export default function CouponInput({
  subtotal,
  applied,
  onApply,
  onRemove,
}: {
  subtotal: number
  applied: AppliedCoupon | null
  onApply: (code: string) => void
  onRemove: () => void
}) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function apply() {
    const { coupon, error } = checkCoupon(code, subtotal)
    if (!coupon) { setError(error || ''); return }
    setError('')
    onApply(coupon.code)
  }

  if (applied) {
    return (
      <div className="coupon-applied">
        <span><strong>{applied.code}</strong> applied · {applied.percent}% off</span>
        <button type="button" className="coupon-remove" onClick={() => { setCode(''); onRemove() }}>Remove</button>
      </div>
    )
  }

  return (
    <div className="coupon">
      <label className="coupon-label" htmlFor="coupon-code">Discount code</label>
      <div className="coupon-row">
        <input
          id="coupon-code"
          className="coupon-input"
          type="text"
          autoCapitalize="characters"
          placeholder="Enter Coupon Code"
          value={code}
          onChange={e => { setCode(e.target.value); setError('') }}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); apply() } }}
        />
        <button type="button" className="coupon-apply" onClick={apply}>Apply</button>
      </div>
      {error && <p className="coupon-error">{error}</p>}
    </div>
  )
}
