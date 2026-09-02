import Reveal from '../components/Reveal'

export default function Stats({ data }) {
  return (
    <section className="border-b hairline px-6 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {data.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <p className="font-display text-4xl text-cream md:text-5xl">{stat.value}</p>
            <p className="eyebrow mt-2 uppercase">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
