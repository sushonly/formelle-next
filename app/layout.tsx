import type { Metadata } from 'next'
import { CartProvider } from '@/lib/CartContext'
import CartDrawer from '@/components/CartDrawer'
import './globals.css'

export const metadata: Metadata = { 
  metadataBase: new URL('https://www.formellewear.com'),
  title: "Formelle — Women's Formal Wear India | Luxury Workwear | Dressed to Lead",
  description: 'Formal trousers, formalwear, and office wear for women in India. Premium, structured workwear built for the professional woman in charge.',
  keywords: 'formal trousers for women, premium workwear women, professional women clothing India, formal wear, office wear women, office wear dresses for women, professional clothing brands India, premium formal wear women, office wear for women india, party dresses, corporate office outfits',
  openGraph: {
    title: "Formelle — Women's Formal Wear India | Dressed to Lead",
    description: 'Formal trousers, formalwear, and office wear for women in India. Premium, structured workwear built for the professional woman in charge.',
    url: 'https://www.formellewear.com',
    siteName: 'Formelle',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
