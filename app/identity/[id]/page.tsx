import { getIdentity, getIdentities, getLooksByIdentity } from '@/lib/looks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import IdentityEdit from '@/components/IdentityEdit'
 
export const revalidate = 60

// Pre-render all six identity pages at build time
export async function generateStaticParams() {
  const identities = await getIdentities()
  return identities.map(i => ({ id: i.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const identity = await getIdentity(id)
  if (!identity) return { title: 'Not Found — Formelle' }
  const cap = identity.name
  return {
    title: `${cap} Workwear for Women | Formelle`,
    description: `Explore Formelle's ${cap} Edit — identity-led workwear designed for women who want to show up with intention.`,
    openGraph: {
      title: `The ${cap} Edit — Formelle`,
      description: identity.description || `Looks that make ${cap.toLowerCase()} visible.`,
      url: `https://www.formellewear.com/identity/${identity.id}`,
    },
  }
}

export default async function IdentityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [identity, looks, allIdentities] = await Promise.all([
    getIdentity(id),
    getLooksByIdentity(id),
    getIdentities(),
  ])
  if (!identity) notFound()

  return (
    <>
      <Nav />
      <IdentityEdit identity={identity} looks={looks} allIdentities={allIdentities} />
    </>
  )
}
