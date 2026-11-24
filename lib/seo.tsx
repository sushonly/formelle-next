import type { Product } from './types'
import { isFullySoldOut } from './stock'

export const SITE_URL = 'https://www.formellewear.com'

// Single source of truth for FAQ copy: rendered on the page and in FAQPage schema.
export const FAQS = [
  { q: 'How do I place an order?', a: 'Add to bag, fill your delivery details, and confirm on WhatsApp. We respond with our UPI ID — pay via GPay, PhonePe, or Paytm. Zero extra charges.' },
  { q: 'What sizes does Formelle offer?', a: 'All sizes — XS through XXXL.' },
  { q: 'Does Formelle ship across India?', a: 'Yes — free shipping across India. Orders outside Hyderabad arrive in 5–7 days.' },
  { q: 'What is your returns and exchange policy?', a: 'Free returns within 3 days of delivery, and free exchanges within 7 days, for unworn pieces with tags on. We cover the shipping. Reach out on WhatsApp or at formellewear@outlook.com. Full details: formellewear.com/shipping-and-exchange.' },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Formelle',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  slogan: 'Dressed to lead.',
  description: 'Premium workwear for professional women in India.',
  email: 'formellewear@outlook.com',
  telephone: '+91-9989674894',
  founder: { '@type': 'Person', name: 'Sushma Pawar' },
  sameAs: ['https://www.instagram.com/formellewear'],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Formelle',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
}

const CATEGORY_LABEL: Record<string, string> = {
  top: 'Tops', tops: 'Tops',
  trouser: 'Trousers', trousers: 'Trousers', bottom: 'Trousers', bottoms: 'Trousers',
  dress: 'Dresses', dresses: 'Dresses',
  blazer: 'Blazers', blazers: 'Blazers',
  coord: 'Co-ord Sets', 'co-ord': 'Co-ord Sets', set: 'Co-ord Sets', sets: 'Co-ord Sets', other: 'Co-ord Sets',
}

export function categoryLabel(category: string | undefined) {
  return CATEGORY_LABEL[(category || '').toLowerCase()] || 'Workwear'
}

export function productSchema(product: Product) {
  const url = `${SITE_URL}/product/${product.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: `FORMELLE-${product.id}`,
    url,
    image: product.images,
    brand: { '@type': 'Brand', name: 'Formelle' },
    category: `Apparel & Accessories > Clothing > Women's ${categoryLabel(product.category)}`,
    ...(product.fabric ? { material: product.fabric } : {}),
    audience: { '@type': 'PeopleAudience', suggestedGender: 'female', suggestedMinAge: 18 },
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    offers: {
      '@type': 'Offer',
      url,
      price: product.price,
      priceCurrency: 'INR',
      itemCondition: 'https://schema.org/NewCondition',
      availability: isFullySoldOut(product) ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organization` },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'INR' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 7, unitCode: 'DAY' },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 3,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        refundType: 'https://schema.org/FullRefund',
        merchantReturnLink: `${SITE_URL}/shipping-and-exchange`,
      },
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

// Keeps meta descriptions in the 120–160 character range Google shows in full.
export function metaDescription(text: string, suffix: string) {
  const clean = (text || '').replace(/\s+/g, ' ').trim()
  const full = clean ? `${clean} ${suffix}` : suffix
  if (full.length <= 160) return full
  const cut = full.slice(0, 157)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
