'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, loaded])

  function addItem(item: Omit<CartItem, 'key' | 'qty'>) {
    const key = `${item.id}-${item.size}`
    setItems(prev => {
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, key, qty: 1 }]
    })
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
