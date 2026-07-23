import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Formelle — Dressed to Lead',
  description: 'Premium workwear for ambitious professional women in India. Structured, elegant, and built for the woman in charge.',
  keywords: 'women workwear India, formal wear women, premium trousers women, professional clothing India',
  openGraph: {
    title: 'Formelle — Dressed to Lead',
    description: 'Premium workwear for ambitious professional women in India.',
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
