import Reveal from '../components/Reveal'

export default function Testimonials({ items }) {
  if (!items.length) return null
  return (
    <section className="border-b hairline px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow uppercase">Testimoni</p>
          <h2 className="mt-3 font-display text-4xl text-cream md:text-5xl">Apa Kata Klien</h2>
          <p className="mt-4 max-w-prose text-sm text-mute">
            Cerita langsung dari brand dan bisnis yang sudah berkolaborasi dengan Studio D13.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06} className="rounded-2xl border hairline bg-panel p-8">
              <p className="font-display text-lg italic leading-relaxed text-cream">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-panel2 font-display text-sm text-gold-light">
                    {t.name?.[0] ?? '?'}
                  </div>
                )}
                <div>
                  <p className="text-sm text-cream">{t.name}</p>
                  <p className="text-xs text-mute">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
