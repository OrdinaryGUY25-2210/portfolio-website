import Reveal from '../components/Reveal'

export default function Services({ data }) {
  return (
    <section id="services" className="border-b hairline px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow uppercase">{data.eyebrow}</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl text-cream md:text-5xl">{data.title}</h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border hairline bg-hair md:grid-cols-2">
          {data.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="bg-ink p-8 md:p-10">
              <p className="eyebrow">0{i + 1}</p>
              <h3 className="mt-4 font-display text-2xl text-cream">{item.title}</h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-mute">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
