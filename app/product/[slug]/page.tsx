import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ProductDetail from '@/components/ProductDetail'
import { JsonLd, productSchema, breadcrumbSchema, metaDescription, categoryLabel } from '@/lib/seo'

export const revalidate = 60

async function getProduct(slug: string): Promise<Product | null> {
  const { data } = await supabase.from('products').select('*').eq('slug', slug).eq('is_active', true).single()
  return data
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found — Formelle' }
  return {
    // seo_title already ends in "| Formelle"; absolute stops any layout template adding it twice
    title: product.seo_title ? { absolute: product.seo_title } : `${product.name} | Women's ${categoryLabel(product.category)} | Formelle`,
    description: product.seo_description || metaDescription(product.description, 'Premium workwear for women, XS to XXXL. Free shipping across India.'),
    alternates: { canonical: `/product/${product.slug}` },
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

  const { data: allProducts } = await supabase.from('products').select('*').eq('is_active', true).neq('id', product.id).limit(4)


  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop' }, { name: product.name, path: `/product/${product.slug}` }])} />
      <Nav />
      <ProductDetail product={product} relatedProducts={allProducts || []} />
    </>
  )
}
