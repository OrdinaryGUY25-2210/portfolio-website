import Reveal from '../components/Reveal'

export default function Pricing({ data }) {
  return (
    <section id="pricing" className="border-b hairline px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow uppercase">{data.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl text-cream md:text-5xl">{data.title}</h2>
          <p className="mt-4 max-w-prose text-sm text-mute">{data.subtitle}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {data.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.06}
              className={`flex flex-col rounded-2xl border p-8 ${
                tier.highlighted ? 'border-gold-light bg-panel' : 'hairline bg-panel/40'
              }`}
            >
              {tier.highlighted && (
                <span className="eyebrow mb-4 w-fit rounded-full border border-gold-light px-3 py-1 uppercase text-gold-light">
                  Paling Dipilih
                </span>
              )}
              <p className="eyebrow uppercase">{tier.tag}</p>
              <h3 className="mt-2 font-display text-2xl text-cream">{tier.name}</h3>
              <p className="mt-1 text-xs text-mute">{tier.duration}</p>
              {tier.price && <p className="mt-4 font-display text-3xl text-gold-light">Rp {tier.price}</p>}
              <ul className="mt-6 flex-1 space-y-3 text-sm text-mute">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-1 text-gold-light">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 text-center ${tier.highlighted ? 'btn-gold' : 'btn-ghost'}`}
              >
                Diskusi Paket Ini
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-prose text-sm text-mute">{data.footnote}</p>
        </Reveal>
      </div>
    </section>
  )
}
