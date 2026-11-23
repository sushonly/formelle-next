export type JournalPost = {
  slug: string
  title: string
  titleEmphasis?: string
  dek: string
  category: string
  date: string // ISO, publish date
  readMinutes: number
}

// Newest first. Add a post here and create app/journal/<slug>/page.tsx.
export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: 'build-a-work-wardrobe-from-scratch',
    title: 'How to build a work wardrobe from scratch,',
    titleEmphasis: 'without buying everything at once.',
    dek: 'Fewer pieces, chosen in the right order. Eight of them, six months, and a morning that takes two minutes.',
    category: 'Building a wardrobe',
    date: '2026-11-23',
    readMinutes: 6,
  },
]

export function getPost(slug: string) {
  return JOURNAL_POSTS.find((p) => p.slug === slug)
}

export function formatPostDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
