import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { JOURNAL_POSTS } from '@/lib/journal'
import { getIdentities, getAllLooks } from '@/lib/looks'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await supabase
    .from('products')
    .select('slug, sort_order')
    .eq('is_active', true)

  const productEntries: MetadataRoute.Sitemap = (products || []).map((p) => ({
    url: `https://www.formellewear.com/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const [identities, looks] = await Promise.all([
    getIdentities().catch(() => []),
    getAllLooks().catch(() => []),
  ])

  const wardrobeEntries: MetadataRoute.Sitemap = [
    { url: 'https://www.formellewear.com/wardrobe', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...identities.map((i) => ({
      url: `https://www.formellewear.com/wardrobe/${i.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...looks.map((l) => ({
      url: `https://www.formellewear.com/wardrobe/looks/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]

  return [
    {
      url: 'https://www.formellewear.com/shop',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.formellewear.com/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://www.formellewear.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.formellewear.com/journal',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...JOURNAL_POSTS.map((p) => ({
      url: `https://www.formellewear.com/journal/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...productEntries,
    ...wardrobeEntries,
  ]
}
