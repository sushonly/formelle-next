import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import TajReserve from '@/components/TajReserve'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Formelle at the Taj — Stall 50 | Formelle',
  description: 'Formelle at Sutra Exhibitions, Taj Krishna, Hyderabad. 26–28 September. Reserve your size.',
  robots: { index: false, follow: false },
}

export default async function TajPage() {
  const { data } = await supabase
    .from('products')
    .select('name')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const pieces = Array.from(new Set((data || []).map(p => p.name as string)))

  return <TajReserve pieces={pieces} />
}
