import { getLook, getAllLooks } from '@/lib/looks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import LookDetail from '@/components/LookDetail'

export const revalidate = 60 

export async function generateStaticParams() {
  const looks = await getAllLooks()
  return looks.map(l => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const look = await getLook(slug)
  if (!look) return { title: 'Look Not Found — Formelle' }
  return {
    title: `${look.name} — Formelle`,
    description: look.description || `Shop ${look.name}, a complete Formelle look. Take the whole outfit or only the pieces you need.`,
    openGraph: {
      title: `${look.name} — Formelle`,
      description: look.description || '',
      url: `https://www.formellewear.com/looks/${look.slug}`,
      images: look.hero_image ? [{ url: look.hero_image }] : (look.products[0]?.images?.[0] ? [{ url: look.products[0].images[0] }] : []),
    },
  }
}

export default async function LookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const look = await getLook(slug)
  if (!look) notFound()

  return (
    <>
      <Nav />
      <LookDetail look={look} />
    </>
  )
}
