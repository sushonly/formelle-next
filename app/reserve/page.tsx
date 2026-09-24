import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import ReserveForm from '@/components/ReserveForm' 

export const metadata: Metadata = {
  title: 'Reserve your size | Formelle',
  description: 'Tell us the piece and your size. We will message you on WhatsApp when it is ready.',
  robots: { index: false, follow: false },
}

export default async function ReservePage({ searchParams }: { searchParams: Promise<{ src?: string }> }) {
  const { src } = await searchParams
  const source = (src || 'website').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40) || 'website'

  const { data } = await supabase
    .from('products')
    .select('name')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const pieces = Array.from(new Set((data || []).map(p => p.name as string)))

  return <ReserveForm pieces={pieces} source={source} />
}
