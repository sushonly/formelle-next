import Nav from '@/components/Nav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Formelle | The Founder Story',
  description: 'Why Formelle exists. The story behind the brand, the founder, and the philosophy that drives every piece.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--noir)', color: 'var(--ivory)', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, WebkitFontSmoothing: 'antialiased' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '96px 48px' }}>

          <section style={{ marginBottom: '80px' }}>
            <p style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(240,236,227,0.3)', marginBottom: '48px' }}>ABOUT THE FOUNDER</p>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '20px', fontWeight: 400, lineHeight: 1.85, color: 'var(--ivory)' }}>
              <p style={{ marginBottom: '1.4em' }}>There wasn&apos;t a single moment when Formelle was born.</p>
              <p style={{ marginBottom: '1.4em' }}>It started with a question.</p>
              <p style={{ marginBottom: '1.4em' }}>For years, I watched women around me — friends, colleagues, managers, founders — walk into rooms carrying real responsibility. Yet when it came to getting dressed for work, the choices often felt limited. Polished but uncomfortable. Professional but rigid. Trend-driven when what she really needed was timeless.</p>
              <p style={{ marginBottom: '1.4em' }}>The seed for Formelle came from an unexpected place.</p>
              <p style={{ marginBottom: '1.4em' }}>Watching <em>Suits</em>, I admired more than the tailoring. Harvey&apos;s quiet confidence. Jessica&apos;s commanding presence. Donna&apos;s effortless self-assurance. They reminded me that what we wear doesn&apos;t define us — but it can influence how we show up.</p>
              <p style={{ marginBottom: '1.4em' }}>I kept thinking: why shouldn&apos;t every woman feel that way when she walks into work?</p>
              <p style={{ marginBottom: '1.4em' }}>That question stayed with me.</p>
              <p style={{ marginBottom: '1.4em' }}>So I started designing.</p>
              <p style={{ marginBottom: '1.4em' }}>
                <span style={{ display: 'block', marginBottom: '0.5em' }}>Not for runways.</span>
                <span style={{ display: 'block' }}>Not for seasons.</span>
              </p>
              <p style={{ marginBottom: '1.4em' }}>For the woman walking into a 9 a.m. meeting and a 6 p.m. client call. For the founder. The manager. The entrepreneur. The woman who already knows what she&apos;s doing — and wants to dress like it.</p>
              <p style={{ marginBottom: '1.4em' }}>Because the right outfit isn&apos;t about dressing up.</p>
              <p>It&apos;s about walking into the room knowing you belong there.</p>
            </div>
            <div style={{ marginTop: '56px', paddingTop: '32px', borderTop: '0.5px solid rgba(240,236,227,0.15)' }}>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '16px', fontWeight: 500, letterSpacing: '0.04em', marginBottom: '6px' }}>Sushma Pawar</p>
              <p style={{ fontSize: '9px', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(240,236,227,0.35)' }}>FOUNDER, FORMELLE</p>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '0.5px solid rgba(240,236,227,0.15)', margin: 0 }} />

          <section style={{ padding: '80px 0 96px' }}>
            <p style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(240,236,227,0.3)', marginBottom: '48px' }}>OUR DESIGN PHILOSOPHY</p>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '20px', fontWeight: 400, lineHeight: 1.85, color: 'var(--ivory)' }}>
              <p style={{ marginBottom: '1.2em' }}>We don&apos;t chase trends.</p>
              <p>We build pieces that are still the right choice three years from now. Clean silhouettes. Considered details. Nothing that needs justifying.</p>
            </div>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 500, fontStyle: 'italic', marginTop: '40px', paddingTop: '32px', borderTop: '0.5px solid rgba(240,236,227,0.15)' }}>
              Timeless isn&apos;t an aesthetic. It&apos;s a decision.
            </p>
          </section>

        </div>
      </main>
      <footer style={{ borderTop: '0.5px solid rgba(240,236,227,0.15)', padding: '32px 48px', background: 'var(--noir)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.22em', color: 'rgba(240,236,227,0.4)' }}>FORMELLE</span>
        <a href="https://formellewear.com" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(240,236,227,0.25)' }}>FORMELLEWEAR.COM</a>
      </footer>
    </>
  )
}
