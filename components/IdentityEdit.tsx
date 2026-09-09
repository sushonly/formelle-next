'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Identity, Look } from '@/lib/looks'
import LookCard from './LookCard'

export default function IdentityEdit({
  identity,
  looks,
  allIdentities,
}: {
  identity: Identity
  looks: Look[]
  allIdentities: Identity[]
}) {
  const router = useRouter()

  return (
    <div className="identity-edit">
      {/* Identity switcher — no quiz, one tap re-routes */}
      <div className="identity-switcher">
        <div className="identity-switcher-label">How do you want to show up?</div>
        <div className="identity-switcher-row">
          {allIdentities.map(i => (
            <button
              key={i.id}
              onClick={() => i.id !== identity.id && router.push(`/identity/${i.id}`)}
              className={`identity-chip${i.id === identity.id ? ' active' : ''}`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>

      {/* Edit header */}
      <div className="identity-edit-head">
        <div>
          <div className="identity-edit-eyebrow">Your edit</div>
          <h1 className="identity-edit-title">The {identity.name} Edit</h1>
        </div>
        {identity.description && (
          <div className="identity-edit-context">{identity.description}</div>
        )}
      </div>

      {/* Looks */}
      {looks.length === 0 ? (
        <div className="identity-edit-empty">
          <p>This edit is coming soon.</p>
          <Link href="/shop" className="identity-edit-shoplink">Shop all products →</Link>
        </div>
      ) : (
        <div className="look-grid">
          {looks.map(look => (
            <LookCard key={look.id} look={look} contextIdentity={identity.id} />
          ))}
        </div>
      )}
    </div>
  )
}
