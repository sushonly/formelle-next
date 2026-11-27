import type { Metadata } from 'next'
import Link from 'next/link'
import PolicyPage, { sectionTitle, para, list, link, EMAIL } from '@/components/PolicyPage'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Formelle',
  description: 'The terms for using formellewear.com and ordering from Formelle: orders, pricing, payment, discount codes, shipping, returns and exchanges.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <PolicyPage path="/terms" crumb="Terms and Conditions" title="Terms and" accent="conditions"
      intro="These terms apply when you use formellewear.com or order from Formelle, whether on the website, on WhatsApp or on Instagram. By placing an order, you agree to them.">

      <h2 style={sectionTitle}>About us</h2>
      <p style={para}>Formelle is a women&rsquo;s workwear brand based in Hyderabad, India. In these terms, &ldquo;we&rdquo; and &ldquo;us&rdquo; mean Formelle, and &ldquo;you&rdquo; means the person using the site or placing an order.</p>

      <h2 style={sectionTitle}>Orders</h2>
      <ul style={list}>
        <li>An order is confirmed once we have received payment, or, for cash on delivery, once we have confirmed it with you on WhatsApp. We email you at each step.</li>
        <li>We may decline or cancel an order if a piece is unavailable, a price is listed in error, or details cannot be verified. If you have already paid, we refund you in full.</li>
        <li>Our pieces are made in small batches, so sizes can sell out. Stock is reserved only once your order is confirmed.</li>
      </ul>

      <h2 style={sectionTitle}>Pricing and payment</h2>
      <ul style={list}>
        <li>All prices are in Indian rupees. Shipping within India is free.</li>
        <li>You can pay by UPI, through our payment partner where offered, or by cash on delivery where offered.</li>
        <li>If a price changes after you order, you pay the price shown when you placed your order.</li>
      </ul>

      <h2 style={sectionTitle}>Discount codes</h2>
      <ul style={list}>
        <li>One code per order. Codes cannot be combined, exchanged for cash, or applied to past orders.</li>
        <li>Each code is valid until the date given with it, and may be withdrawn earlier.</li>
        <li>If you return a discounted piece, we refund the amount you actually paid.</li>
      </ul>

      <h2 style={sectionTitle}>Shipping, returns and exchanges</h2>
      <p style={para}>Delivery times, returns, exchanges and damaged items are covered in our <Link href="/shipping-and-exchange" style={link}>Shipping and Exchange policy</Link>, which forms part of these terms.</p>

      <h2 style={sectionTitle}>Product details</h2>
      <ul style={list}>
        <li>We photograph our pieces as accurately as we can. Colours may look slightly different on your screen.</li>
        <li>Measurements in our size guides are approximate, within about 1 to 2 cm.</li>
        <li>Follow the care instructions on each piece. Damage from incorrect care is not covered.</li>
      </ul>

      <h2 style={sectionTitle}>Use of the website</h2>
      <p style={para}>The photographs, text, designs and the Formelle name on this site belong to Formelle. You may not copy or reuse them for commercial purposes without our written permission. Please do not misuse the site, for example by placing false orders.</p>

      <h2 style={sectionTitle}>Liability</h2>
      <p style={para}>We are responsible for the pieces we sell, as set out in these terms and our Shipping and Exchange policy. Our total liability for any order is limited to the amount you paid for it. Nothing in these terms limits your rights under Indian consumer law.</p>

      <h2 style={sectionTitle}>Privacy</h2>
      <p style={para}>How we handle your details is explained in our <Link href="/privacy-policy" style={link}>Privacy Policy</Link>.</p>

      <h2 style={sectionTitle}>Governing law</h2>
      <p style={para}>These terms are governed by the laws of India. Any dispute is subject to the courts of Hyderabad, Telangana.</p>

      <h2 style={sectionTitle}>Changes</h2>
      <p style={para}>We may update these terms from time to time. The version on this page when you place an order applies to that order.</p>

      <h2 style={sectionTitle}>Contact</h2>
      <p style={para}>Questions about these terms: <a href={`mailto:${EMAIL}`} style={link}>{EMAIL}</a>, or see our <Link href="/contact" style={link}>Contact page</Link>.</p>
    </PolicyPage>
  )
}
