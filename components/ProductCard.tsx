import Link from 'next/link'
import type { Product } from '@/lib/types'

const CAT_LABELS: Record<string, string> = { top: 'Top', trouser: 'Trouser', dress: 'Dress', blazer: 'Blazer' }

export default function ProductCard({ product }: { product: Product }) {
  const heroImg = product.images?.[0] || ''
  const catLabel = CAT_LABELS[product.category] || product.category

  return (
    <article className="product-card" data-product-id={product.id}>
      <Link href={`/product/${product.slug}`} style={{ display: 'block' }}>
        <div className="product-image-wrap">
          {heroImg ? (
            <img src={heroImg} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div className="product-placeholder" aria-hidden="true">{catLabel.charAt(0)}</div>
          )}
          <div className="product-overlay">
            <span className="product-quick-add">Shop Now</span>
          </div>
          {product.tag && <div className="product-tag">{product.tag}</div>}
        </div>
        <div className="product-info">
          <div className="product-category">{catLabel}</div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-footer"></div>
        </div>
      </Link>
    </article>
  )
}
