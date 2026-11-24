import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import JournalFooter from '@/components/JournalFooter'
import { JOURNAL_POSTS, formatPostDate } from '@/lib/journal'
import Img from '@/components/Img'

export const metadata: Metadata = {
  title: 'The Journal — Formelle | Building a Work Wardrobe',
  description: 'Notes on building a work wardrobe that works: what to buy first, how to dress for the room, and how to stop deciding every morning.',
  alternates: { canonical: '/journal' },
}

export default function JournalIndex() {
  return (
    <>
      <Nav />
      <main className="jr">
        <section className="jr-hero jr-hero--index">
          <p className="jr-label jr-label--light">The Journal</p>
          <h1 className="jr-title">Notes on <em>dressing to lead.</em></h1>
          <p className="jr-dek">What to buy first, how to dress for the room, and how to stop deciding every morning.</p>
        </section>

        <section className="jr-index">
          {JOURNAL_POSTS.map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="jr-card">
              <div className="jr-card-photo">
                <Img src={post.cover} alt={post.coverAlt} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="jr-card-body">
                <p className="jr-label">{post.category}</p>
                <h2 className="jr-card-title">
                  {post.title} {post.titleEmphasis && <em>{post.titleEmphasis}</em>}
                </h2>
                <p className="jr-card-dek">{post.dek}</p>
                <p className="jr-meta">
                  {formatPostDate(post.date)} &nbsp;·&nbsp; {post.readMinutes} min read
                </p>
                <span className="jr-card-cta">Read the piece</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <JournalFooter />
    </>
  )
}
