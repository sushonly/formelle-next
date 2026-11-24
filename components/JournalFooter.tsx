import Link from 'next/link'

export default function JournalFooter() {
  return (
    <footer className="jr-footer">
      <span className="jr-footer-mark">FORMELLE</span>
      <Link href="/shipping-and-exchange" className="jr-footer-link">SHIPPING AND EXCHANGE</Link>
      <Link href="/" className="jr-footer-link">FORMELLEWEAR.COM</Link>
    </footer>
  )
}
