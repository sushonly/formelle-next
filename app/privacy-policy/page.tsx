import type { Metadata } from 'next'
import PolicyPage, { sectionTitle, para, list, link, EMAIL, WHATSAPP, WHATSAPP_LINK } from '@/components/PolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | Formelle',
  description: 'What personal details Formelle collects, why, who we share them with, and how to see, correct or delete them.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage path="/privacy-policy" crumb="Privacy Policy" title="Privacy" accent="policy"
      intro="This page explains what personal details Formelle collects when you visit formellewear.com or order from us, why we collect them, and the choices you have.">

      <h2 style={sectionTitle}>What we collect</h2>
      <ul style={list}>
        <li><strong>Order details:</strong> your name, phone number, email address, delivery address, the pieces and sizes you order, and how you paid.</li>
        <li><strong>Checkout details:</strong> what you type into the checkout form is saved as you go, so we can help if an order does not come through.</li>
        <li><strong>Requests you send us:</strong> restock requests (Notify me), waitlist sign-ups, and answers to our short survey, with the email or phone number you give.</li>
        <li><strong>Shopping activity:</strong> pieces you view and add to your bag, linked to an anonymous ID stored on your device, not to your name.</li>
        <li><strong>Messages:</strong> what you send us on WhatsApp, Instagram or email.</li>
      </ul>
      <p style={para}>We do not collect or store your card or bank details. Payments are handled by UPI apps or our payment partner, under their own security standards.</p>

      <h2 style={sectionTitle}>Why we use it</h2>
      <ul style={list}>
        <li>To process, deliver and support your order, including exchanges and returns.</li>
        <li>To send emails about your order: confirmation, receipt, shipping and delivery.</li>
        <li>To tell you when a piece you asked about is back in stock.</li>
        <li>To understand which pieces and sizes people want, and improve the site.</li>
        <li>To send new-drop updates, only if you ask for them. You can stop them at any time.</li>
      </ul>

      <h2 style={sectionTitle}>Who we share it with</h2>
      <p style={para}>We never sell your details. We share only what each partner needs to do its job:</p>
      <ul style={list}>
        <li><strong>Courier partners</strong>, to deliver your order: your name, phone number and address.</li>
        <li><strong>Payment partners</strong>, to process your payment.</li>
        <li><strong>Service providers</strong> that run our website, database and order emails, under contract to protect your data.</li>
        <li><strong>Analytics and advertising:</strong> Google Analytics and the Meta pixel record how the site is used. They see browsing activity, not your name or address.</li>
      </ul>
      <p style={para}>We may also share details where the law requires it.</p>

      <h2 style={sectionTitle}>Cookies</h2>
      <p style={para}>We use cookies and similar storage to keep your bag between visits, remember choices on the site, and measure traffic through Google Analytics and the Meta pixel. You can clear or block cookies in your browser settings. Your bag may not be saved if you do.</p>

      <h2 style={sectionTitle}>How long we keep it</h2>
      <p style={para}>We keep order records for as long as tax and accounting rules require. Other details, such as restock requests and survey answers, are kept only as long as they are useful, and deleted on request.</p>

      <h2 style={sectionTitle}>Your choices</h2>
      <p style={para}>You can ask us to show you the details we hold about you, correct them, or delete them, and you can withdraw consent for updates at any time. Write to <a href={`mailto:${EMAIL}`} style={link}>{EMAIL}</a> or WhatsApp <a href={WHATSAPP_LINK} style={link}>{WHATSAPP}</a>. We reply within 7 working days. We handle your data in line with India&rsquo;s Digital Personal Data Protection Act, 2023.</p>

      <h2 style={sectionTitle}>Security</h2>
      <p style={para}>Your details are stored with access limited to Formelle. No method of storage or transfer is completely secure, but we take reasonable steps to protect what you share with us.</p>

      <h2 style={sectionTitle}>Changes to this policy</h2>
      <p style={para}>If we change this policy, we will update this page and the date above.</p>

      <h2 style={sectionTitle}>Questions or complaints</h2>
      <p style={para}>Contact us at <a href={`mailto:${EMAIL}`} style={link}>{EMAIL}</a>. We acknowledge every privacy concern within 48 hours.</p>
    </PolicyPage>
  )
}
