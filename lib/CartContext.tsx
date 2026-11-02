'use client'
import { track, gaItem } from '@/lib/analytics'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { sessionId } from '@/lib/funnel'

export interface CartItem {
  key: string
  id: number
  name: string
  slug: string
  size: string
  price: number
  img: string
  qty: number
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'key' | 'qty'>) => void
  removeItem: (key: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = 'formelle_cart'
const CART_DAYS = 20 // a saved bag is kept for 20 days

// Saves an add-to-bag to Supabase for product and size demand. Never blocks the cart.
function logCartEvent(item: { id: number; name: string; size: string; price: number }) {
  supabase.from('cart_events').insert([{
    session_id: sessionId(),
    product_id: item.id,
    product_name: item.name,
    size: item.size,
    price: item.price,
    source_page: typeof window !== 'undefined' ? window.location.pathname : null,
  }]).then(() => {}, () => {})
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      // Kept on the device (not just this tab), so the bag survives closing Instagram or the browser
      const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const list = Array.isArray(parsed) ? parsed : parsed.items
        const savedAt = Array.isArray(parsed) ? Date.now() : parsed.savedAt
        if (Array.isArray(list) && Date.now() - savedAt < CART_DAYS * 86400000) setItems(list)
      }
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, savedAt: Date.now() }))
    } catch {}
  }, [items, loaded])

  function addItem(item: Omit<CartItem, 'key' | 'qty'>) {
    const key = `${item.id}-${item.size}`
    track('add_to_cart', { currency: 'INR', value: item.price, items: [gaItem(item)] })
       logCartEvent(item)
    setItems(prev => {
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, key, qty: 1 }]
    })
        setIsOpen(true) // open the bag so the next step (Checkout) is in front of her
  }

  function removeItem(key: string) {
    setItems(prev => prev.filter(i => i.key !== key))
  }

  function clearCart() {
    setItems([])
  }

  function openCart() { setIsOpen(true) }
  function closeCart() { setIsOpen(false) }

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, isOpen, addItem, removeItem, clearCart, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
