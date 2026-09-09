import Reveal from '../components/Reveal'

// This is the "proof" section of a portfolio — what's been accomplished,
// not what's being sold. Sits right after Hero, before anything else.
export default function Achievements({ items }) {
  if (!items.length) return null
  return (
    <section id="achievements" className="border-b hairline px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow uppercase">Pencapaian</p>
          <h2 className="underline-accent mt-3 font-display text-3xl text-cream md:text-4xl">Yang Sudah Dibangun</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.06}
              className="relative overflow-hidden border-l-2 border-gold-light/40 pl-5 pr-2 pt-1"
            >
              <span className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-6xl italic text-cream/[0.05]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.year && <p className="eyebrow uppercase">{item.year}</p>}
              <h3 className="mt-2 font-display text-xl text-cream">{item.title}</h3>
              {item.issuer && <p className="mt-1 text-xs text-mute">{item.issuer}</p>}
              {item.description && <p className="mt-3 text-sm leading-relaxed text-mute">{item.description}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
