'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export interface BriefLook {
  slug: string
  title: string
  image: string | null
}

const OCCASIONS = [
  { id: 'everyday-office',  phrase: 'the office',       label: 'Everyday Office',  short: 'the office' },
  { id: 'client-facing',    phrase: 'a client meeting', label: 'Client-Facing',    short: 'the client meeting' },
  { id: 'the-big-room',     phrase: 'the big room',     label: 'The Big Room',     short: 'the big room' },
  { id: 'business-travel',  phrase: 'a new city',       label: 'Business Travel',  short: 'the trip' },
]

const IDENTITIES = [
  { id: 'confident',     name: 'Confident',     line: 'I know what I’m doing.',         sub: 'Self-assured. Sure of her ground.' },
  { id: 'authoritative', name: 'Authoritative', line: 'Take me seriously.',             sub: 'Commanding. Nothing to prove, everything to hold.' },
  { id: 'composed',      name: 'Composed',      line: 'I’ve got this under control.',   sub: 'Calm and polished, whatever the agenda.' },
  { id: 'bold',          name: 'Bold',          line: 'I’m not afraid to be seen.',     sub: 'Assertive and expressive. Seen first.' },
  { id: 'magnetic',      name: 'Magnetic',      line: 'You remember me.',               sub: 'Charismatic. The one they mention later.' },
  { id: 'effortless',    name: 'Effortless',    line: 'I didn’t have to try too hard.', sub: 'Natural and understated. Ease, on purpose.' },
]

type Open = 'occasion' | 'identity' | null

export default function IdentityBrief({ looksByIdentity }: { looksByIdentity: Record<string, BriefLook[]> }) {
  const [occ, setOcc] = useState(2)       // the big room
  const [idn, setIdn] = useState(1)       // authoritative
  const [open, setOpen] = useState<Open>(null)
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(null) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  const o = OCCASIONS[occ]
  const i = IDENTITIES[idn]
  const looks = (looksByIdentity[i.id] || []).slice(0, 2)

  return (
    <section className="brief" ref={rootRef} aria-label="How do you want to show up?">
      <span className="brief-eyebrow">How do you want to show up?</span>

      <p className="brief-sentence">
        Tomorrow, I walk into{' '}
        <span className="brief-slot-wrap">
          <button type="button" className="brief-slot" aria-expanded={open === 'occasion'}
            onClick={() => setOpen(open === 'occasion' ? null : 'occasion')}>{o.phrase}</button>
          {open === 'occasion' && (
            <span className="brief-menu" role="listbox" aria-label="Where are you going?">
              <span className="brief-menu-title">Where are you going?</span>
              {OCCASIONS.map((x, n) => (
                <button key={x.id} type="button" role="option" aria-selected={n === occ}
                  className={`brief-opt${n === occ ? ' on' : ''}`}
                  onClick={() => { setOcc(n); setOpen(null) }}>{x.phrase}</button>
              ))}
            </span>
          )}
        </span>
        .<br />
        I want them to think,{' '}
        <span className="brief-slot-wrap">
          <button type="button" className={`brief-slot brief-reg-${i.id}`} aria-expanded={open === 'identity'}
            onClick={() => setOpen(open === 'identity' ? null : 'identity')}>&ldquo;{i.line}&rdquo;</button>
          {open === 'identity' && (
            <span className="brief-menu" role="listbox" aria-label="What should they think?">
              <span className="brief-menu-title">What should they think?</span>
              {IDENTITIES.map((x, n) => (
                <button key={x.id} type="button" role="option" aria-selected={n === idn}
                  className={`brief-opt${n === idn ? ' on' : ''}`}
                  onClick={() => { setIdn(n); setOpen(null) }}>&ldquo;{x.line}&rdquo;</button>
              ))}
            </span>
          )}
        </span>
      </p>

      {open && <div className="brief-backdrop" onClick={() => setOpen(null)} aria-hidden="true" />}

      <div className="brief-result">
        <div className="brief-looks">
          {looks.length > 0 ? looks.map(l => (
            <Link key={l.slug} href={`/wardrobe/looks/${l.slug}`} className="brief-look">
              {l.image
                ? <img src={l.image} alt={l.title} loading="lazy" />
                : <span className="brief-look-empty" />}
              <span className="brief-look-cta">Shop the look <span aria-hidden="true">→</span></span>
            </Link>
          )) : (
            <div className="brief-look brief-look-soon"><span>New looks for this edit are on their way.</span></div>
          )}
        </div>
        <div className="brief-copy">
          <span className="brief-tag">{i.name} · {o.label}</span>
          <h3 className="brief-title">Your look for {o.short}.</h3>
          <p className="brief-sub">{i.sub}</p>
          <Link href={`/wardrobe/${i.id}`} className="brief-cta">See the {i.name} edit <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  )
}
