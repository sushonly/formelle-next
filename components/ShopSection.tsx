'use client'
import { useState } from 'react'
import type { Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard'
import { isFullySoldOut } from '@/lib/stock'

export default function ShopSection({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('all')

  const counts = {
    all: products.length,
    top: products.filter(p => p.category === 'top').length,
    trouser: products.filter(p => p.category === 'trouser').length,
    dress: products.filter(p => p.category === 'dress').length,
  }

  // In-stock pieces first; pieces sold out in every size move to the end (order otherwise kept)
  const filtered = (filter === 'all' ? products : products.filter(p => p.category === filter))
    .map((p, i) => ({ p, i, out: isFullySoldOut(p) ? 1 : 0 }))
    .sort((a, b) => a.out - b.out || a.i - b.i)
    .map(x => x.p)

  return (
    <section id="shop" aria-label="Shop — Women's Formal Wear Collection">
      <div className="section-header">
        <h2 className="section-title">Our Collection</h2>
      </div>
      <div className="filter-tabs" role="tablist" aria-label="Filter products">
        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All ({counts.all})
        </button>
        <button className={`filter-tab ${filter === 'top' ? 'active' : ''}`} onClick={() => setFilter('top')}>
          Tops ({counts.top})
        </button>
        <button className={`filter-tab ${filter === 'trouser' ? 'active' : ''}`} onClick={() => setFilter('trouser')}>
          Trousers ({counts.trouser})
        </button>
        <button className={`filter-tab ${filter === 'dress' ? 'active' : ''}`} onClick={() => setFilter('dress')}>
          Dresses ({counts.dress})
        </button>
      </div>
      <div className="product-grid" aria-live="polite">
        {filtered.map(p => (
  <ProductCard
    key={p.id}
    product={p}
    showPrice
  />
))} 
        
      </div>
    </section>
  )
}
