import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/types'

const CAT_LABELS: Record<string, string> = {
  top: 'Top', trouser: 'Trouser', dress: 'Dress', blazer: 'Blazer'
}

export default function ProductCard({ product }: { product: Product }) {
  const heroImg = product.images?.[0] || ''
  const catLabel = CAT_LABELS[product.category] || product.category
  const href = `/product/${product.slug}`

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#ede8df,#dfd9cc)', aspectRatio: '3/4' }}>
        {heroImg ? (
          <Image
            src={heroImg}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-cormorant)', fontSize: '64px', color: 'rgba(17,17,17,0.08)', fontStyle: 'italic' }}>
            {product.name.charAt(0)}
          </div>
        )}
        {product.tag && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--noir)', color: 'var(--ivory)', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 8px', fontWeight: 500 }}>
            {product.tag}
          </div>
        )}
      </div>
      <div style={{ padding: '14px 4px 20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>{catLabel}</div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '19px', fontWeight: 400, color: 'var(--noir)' }}>{product.name}</div>
      </div>
    </Link>
  )
}
