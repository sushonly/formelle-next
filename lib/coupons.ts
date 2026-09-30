// lib/coupons.ts — discount codes accepted at checkout.
// To add a code, add a line. To end one, delete it or set an `expires` date (YYYY-MM-DD, last valid day).

interface Coupon {
  percent: number 
  expires?: string
}

const COUPONS: Record<string, Coupon> = {
  FORMELLE10: { percent: 10, expires: '2026-11-31' },
}

export interface AppliedCoupon {
  code: string
  percent: number
  discount: number
}

export function checkCoupon(input: string, subtotal: number): { coupon?: AppliedCoupon; error?: string } {
  const code = input.trim().toUpperCase()
  if (!code) return { error: 'Enter a code.' }
  const c = COUPONS[code]
  if (!c) return { error: 'That code isn’t valid.' }
  if (c.expires && new Date() > new Date(`${c.expires}T23:59:59+05:30`)) {
    return { error: 'That code has expired.' }
  }
  return { coupon: { code, percent: c.percent, discount: Math.round((subtotal * c.percent) / 100) } }
}
