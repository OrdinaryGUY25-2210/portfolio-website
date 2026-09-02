import Reveal from '../components/Reveal'

export default function Process({ data }) {
  return (
    <section className="border-b hairline px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow uppercase">{data.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl text-cream md:text-5xl">{data.title}</h2>
          <p className="mt-4 max-w-prose text-sm text-mute">{data.subtitle}</p>
        </Reveal>
        <ol className="mt-14 grid gap-8 md:grid-cols-4">
          {data.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07} as="li">
              <p className="font-display text-3xl text-gold-light">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-xl text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{step.description}</p>
              <p className="eyebrow mt-4 uppercase">{step.day}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-prose text-sm text-mute">{data.footnote}</p>
        </Reveal>
      </div>
    </section>
  )
}
