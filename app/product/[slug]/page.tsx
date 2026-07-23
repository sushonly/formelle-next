import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ProductDetail from '@/components/ProductDetail'

async function getProduct(slug: string): Promise<Product | null> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found — Formelle' }

  return {
    title: `Formelle — ${product.name} | Women's Formal Wear India`,
    description: `${product.description} Premium workwear for professional women. Free shipping across India.`,
    openGraph: {
      title: `Formelle — ${product.name}`,
      description: product.description,
      url: `https://www.formellewear.com/product/${product.slug}`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .neq('id', product.id)
    .limit(4)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Formelle' },
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://www.formellewear.com/product/${product.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Nav />
      <ProductDetail product={product} relatedProducts={allProducts || []} />
    </>
  )
}
