import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Formelle — Women's Formal Wear India | Luxury Workwear | Dressed to Lead",
  description: "Formelle is India's premium formal wear brand for professional women. Shop structured blazer tops, trousers, and power dressing essentials. Free shipping. All sizes available.",
  keywords: 'women formal wear India, premium workwear women, professional women clothing India',
  openGraph: {
    title: 'Formelle — Dressed to Lead',
    description: 'Structured, elegant formal wear for the professional Indian woman.',
    url: 'https://www.formellewear.com',
    siteName: 'Formelle',
    locale: 'en_IN',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
