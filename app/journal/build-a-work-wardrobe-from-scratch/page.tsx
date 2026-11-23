import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import JournalFooter from '@/components/JournalFooter'
import { supabase } from '@/lib/supabase'
import { getPost, formatPostDate } from '@/lib/journal'

const SLUG = 'build-a-work-wardrobe-from-scratch'
const post = getPost(SLUG)!

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'How to Build a Work Wardrobe From Scratch | FORMELLE',
  description: 'Build a work wardrobe slowly, in the right order. Eight pieces, everything works with everything, and a morning that takes two minutes.',
  alternates: { canonical: `/journal/${SLUG}` },
  openGraph: {
    title: 'How to build a work wardrobe from scratch, without buying everything at once',
    description: 'Eight pieces, six months, and a morning that takes two minutes.',
    url: `https://www.formellewear.com/journal/${SLUG}`,
    type: 'article',
  },
}

// The three pieces to start with, in buying order.
const FIRST_PIECES = [
  { slug: 'the-precision-trousers-black', label: '01 · The anchor', name: 'The Precision Trouser in Black', tone: '#111111' },
  { slug: 'the-presence-trouser-brown', label: '02 · The second mood', name: 'The Presence Trouser in Chocolate Brown', tone: '#4a3324' },
  { slug: 'the-noir-essential-black', label: '03 · The first top', name: 'The Noir Essential', tone: '#2c2c2a' },
]

const PALETTE = [
  { name: 'Noir', hex: '#111111' },
  { name: 'Chocolate', hex: '#3b2a20' },
  { name: 'Mocha', hex: '#5c4030' },
  { name: 'Cocoa', hex: '#7a5a42' },
  { name: 'Ivory', hex: '#f0ece3' },
  { name: 'Accent', hex: '#a3262f', narrow: true },
]

const ORDER = [
  ['Month 1', 'Black trouser, warm neutral trouser, one neutral top'],
  ['Month 2', 'A second neutral top'],
  ['Month 3', 'A third top, in your accent colour'],
  ['Month 4', 'A shirt'],
  ['Month 5', 'A blazer'],
  ['Month 6', 'One dress'],
]

const NOT_YET = [
  ['Trend pieces', 'If it will look dated by next year, it does not belong in a wardrobe you are building to last.'],
  ['A second black trouser', 'Duplicates feel safe and add nothing. Buy a new colour or a new shape instead.'],
  ['Anything outside your palette', 'One orphan piece means a whole outfit built around it, or an item that never leaves the hanger.'],
  ['Anything bought on sale alone', 'A low price is not a reason. If it fails the first question, it costs more than it saves.'],
  ['Pieces that need fixing', 'If the fit is almost right, it will stay almost right. Choose made-to-measure over making do.'],
]

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to build a work wardrobe from scratch, without buying everything at once',
  description: post.dek,
  datePublished: post.date,
  author: { '@type': 'Person', name: 'Sushma Pawar' },
  publisher: { '@type': 'Organization', name: 'Formelle', url: 'https://www.formellewear.com' },
  mainEntityOfPage: `https://www.formellewear.com/journal/${SLUG}`,
}

export default async function BuildAWorkWardrobe() {
  const { data } = await supabase
    .from('products')
    .select('slug, images')
    .in('slug', FIRST_PIECES.map((p) => p.slug))
  const imageFor = (slug: string) =>
    (data || []).find((p) => p.slug === slug)?.images?.[0] as string | undefined

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <main className="jr">
        <header className="jr-hero">
          <p className="jr-label jr-label--light">
            <Link href="/journal">The Journal</Link> &nbsp;·&nbsp; {post.category}
          </p>
          <h1 className="jr-title">
            {post.title} <em>{post.titleEmphasis}</em>
          </h1>
          <p className="jr-dek">{post.dek}</p>
          <p className="jr-meta jr-meta--light">
            By Sushma Pawar &nbsp;·&nbsp; {formatPostDate(post.date)} &nbsp;·&nbsp; {post.readMinutes} min read
          </p>
        </header>

        <article>
          <div className="jr-body">
            <p className="jr-lede">Most women don&apos;t have a wardrobe problem. They have a decision problem.</p>
            <p>The closet is full, and yet every morning starts the same way. Ten minutes in front of it. Three changes. Leaving in something that is fine, but not quite right for the day ahead.</p>
            <p>The answer is not more clothes. It is fewer pieces, chosen in the right order, so each new one works with everything you already own. Built this way, a work wardrobe takes months, not one weekend of spending. And every purchase along the way earns its place.</p>
            <p>Here is how to build one from scratch.</p>

            <hr className="jr-rule" />

            <p className="jr-label">Step 01</p>
            <h2>Decide how you want to show up</h2>
            <p>Before you buy a single piece, answer one question. When you walk into a room at work, what do you want people to understand about you?</p>

            <div className="jr-registers">
              <div>
                <h3>Authority</h3>
                <p className="jr-quote">&ldquo;Take me seriously.&rdquo;</p>
                <p className="jr-small">Structure, sharp trousers, darker tones.</p>
              </div>
              <div>
                <h3>Composure</h3>
                <p className="jr-quote">&ldquo;I have this under control.&rdquo;</p>
                <p className="jr-small">Clean lines, quiet neutrals.</p>
              </div>
              <div>
                <h3>Ease</h3>
                <p className="jr-quote">&ldquo;I didn&apos;t have to try too hard.&rdquo;</p>
                <p className="jr-small">Soft fabrics that still hold their shape.</p>
              </div>
            </div>

            <p>Write your answer down. Every purchase from here gets measured against it. If a piece doesn&apos;t say what you want it to say, it doesn&apos;t come home, however good the price.</p>

            <hr className="jr-rule" />

            <p className="jr-label">Step 02</p>
            <h2>Start with three pieces, trousers first</h2>
            <p>Your first purchase is two trousers and one top. Not a dress, not a statement blazer. Trousers carry more of your working week than any other piece, so they earn the first spend.</p>

            <div className="jr-pieces">
              {FIRST_PIECES.map((p) => {
                const img = imageFor(p.slug)
                return (
                  <Link key={p.slug} href={`/product/${p.slug}`} className="jr-piece">
                    <div className="jr-piece-photo" style={{ background: p.tone }}>
                      {img && <img src={img} alt={p.name} loading="lazy" />}
                    </div>
                    <span className="jr-label">{p.label}</span>
                    <span className="jr-piece-name">{p.name}</span>
                  </Link>
                )
              })}
            </div>

            <p>Three pieces, two outfits, worn on rotation. It sounds sparse. It is also more than most women get from a full closet of things that don&apos;t go together.</p>
            <p>Wear these for two weeks before buying anything else. You will learn what your days actually ask of your clothes.</p>

            <hr className="jr-rule" />

            <p className="jr-label">Step 03</p>
            <h2>Add tops in one palette</h2>
            <p>Tops are where the wardrobe multiplies. Each new top that works with both trousers adds two outfits, not one.</p>
            <p>The rule: stay inside one tonal family. Add a single accent, red or pink, once the neutrals are in place. A palette this tight means you never stand in front of the mirror wondering what goes with what. Everything does.</p>

            <div className="jr-palette" aria-label="A tonal palette: noir, chocolate, mocha, cocoa, ivory, and one accent">
              {PALETTE.map((c) => (
                <div key={c.name} className={c.narrow ? 'jr-swatch jr-swatch--narrow' : 'jr-swatch'}>
                  <div className="jr-swatch-chip" style={{ background: c.hex }} />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>

            <div className="jr-math">
              <div><strong>2</strong><span>outfits from 1 top</span></div>
              <div><strong>6</strong><span>outfits from 3 tops</span></div>
              <div><strong>10</strong><span>outfits from 5 tops</span></div>
            </div>

            <p>Buy one top a month. By month three, you have six combinations and no repeats anyone would notice.</p>
          </div>

          <aside className="jr-pull">
            <p>The blazer comes fourth. By then, you are buying it to finish outfits you already own.</p>
          </aside>

          <div className="jr-body">
            <p className="jr-label">Step 04</p>
            <h2>Add the third layer</h2>
            <p>With trousers and tops sorted, add the pieces that change the register of an outfit.</p>
            <p><strong>A shirt.</strong> A crisp stripe like <Link href="/product/the-white-stripe-shirt">The Executive Stripe Shirt</Link>, or soft satin. It takes the same trouser from everyday office to client-facing in one change.</p>
            <p><strong>A blazer.</strong> One, in a neutral that sits inside your palette. <Link href="/product/the-mocha-blazer">The Mocha Blazer</Link> works over black and over brown. Over a fitted top, it turns a regular Tuesday into the big room.</p>
            <p>The blazer is the most expensive piece so far, which is exactly why it comes fourth. By now you know your palette and your fit.</p>

            <hr className="jr-rule" />

            <p className="jr-label">Step 05</p>
            <h2>One statement piece, last</h2>
            <p>Only now does the dress come in. A single piece that is a complete outfit on its own, for the days you want to be remembered. <Link href="/product/the-cocoa-brown-dress-sleeves">The Cocoa Brown Dress</Link>, or <Link href="/product/the-noir-pearl">The Noir Pearl</Link>. One is enough.</p>

            <div className="jr-order">
              <p className="jr-label">The order</p>
              <h3>Six months. Eight pieces.</h3>
              <ol>
                {ORDER.map(([month, what]) => (
                  <li key={month}><span className="jr-label">{month}</span><span>{what}</span></li>
                ))}
              </ol>
              <p className="jr-order-close">Eight pieces. Everything works with everything. Close to twenty outfits, and a morning that takes two minutes.</p>
            </div>

            <hr className="jr-rule" />

            <h2>What not to buy yet</h2>
            <dl className="jr-notyet">
              {NOT_YET.map(([what, why]) => (
                <div key={what}><dt>{what}</dt><dd>{why}</dd></div>
              ))}
            </dl>

            <hr className="jr-rule" />

            <h2>The wardrobe you stop thinking about</h2>
            <p>A good work wardrobe is not measured by how much is in it. It is measured by how little you have to think about it.</p>
            <p>Build it slowly. Buy in order. Let every piece answer the same question: how do you want to show up?</p>
          </div>
        </article>

        <section className="jr-cta">
          <div className="jr-cta-inner">
            <p className="jr-label jr-label--light">The Wardrobe</p>
            <h2>Start with the decision <em>already made.</em></h2>
            <p>Complete looks, chosen by how you want to show up. Deselect what you already own and take only what you need.</p>
            <div className="jr-cta-actions">
              <Link href="/wardrobe" className="btn-primary">See the wardrobe</Link>
              <Link href="/shop" className="btn-outline">Shop all pieces</Link>
            </div>
          </div>
        </section>
      </main>
      <JournalFooter />
    </>
  )
}
