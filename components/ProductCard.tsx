'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { isFullySoldOut } from '@/lib/stock'
import WaitlistModal from '@/components/WaitlistModal'

const CAT_LABELS: Record<string, string> = {
  top: 'Top',
  trouser: 'Trouser',
  dress: 'Dress',
  blazer: 'Blazer',
}

export default function ProductCard({
  product,
  showPrice = false,
}: {
  product: Product
  showPrice?: boolean
}) {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const heroImg = product.images?.[0] || ''
  const catLabel = CAT_LABELS[product.category] || product.category
  const soldOut = isFullySoldOut(product)

  const image = heroImg ? (
    <img
      src={heroImg}
      alt={product.name}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : (
    <div className="product-placeholder" aria-hidden="true">
      {catLabel.charAt(0)}
    </div>
  )

  const price = showPrice && (
    <div className="product-price">
      {product.original_price && product.original_price > product.price ? (
        <>
          <span className="product-price-original">
            ₹{product.original_price.toLocaleString('en-IN')}
          </span>
          <span className="product-price-current">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </>
      ) : (
        <span className="product-price-current">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
      )}
    </div>
  )

  // SOLD OUT IN EVERY SIZE — blurred image, waitlist button instead of Shop Now
  if (soldOut) {
    return (
      <article className="product-card is-sold-out" data-product-id={product.id}>
        <div className="product-image-wrap">
          {image}
          <div className="sold-out-veil">
            <span className="sold-out-eyebrow">Sold Out</span>
            <span className="sold-out-line">Returning soon</span>
            <button
              type="button"
              className="sold-out-btn"
              onClick={() => setWaitlistOpen(true)}
            >
              Join the Waitlist
            </button>
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="product-info" style={{ display: 'block' }}>
          <div className="product-category">{catLabel}</div>
          <h3 className="product-name">{product.name}</h3>
          {price}
        </Link>

        {waitlistOpen && (
          <WaitlistModal product={product} onClose={() => setWaitlistOpen(false)} />
        )}
      </article>
    )
  }

  return (
    <article className="product-card" data-product-id={product.id}>
      <Link href={`/product/${product.slug}`} style={{ display: 'block' }}>
        <div className="product-image-wrap">
          {image}

          <div className="product-overlay">
            <span className="product-quick-add">Shop Now</span>
          </div>

          {product.tag && <div className="product-tag">{product.tag}</div>}
        </div>

        <div className="product-info">
          <div className="product-category">{catLabel}</div>
          <h3 className="product-name">{product.name}</h3>
          {/* PRICE — ONLY SHOWN WHEN showPrice IS TRUE */}
          {price}
        </div>
      </Link>
    </article>
  )
}
