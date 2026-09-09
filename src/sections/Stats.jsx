import Reveal from '../components/Reveal'
import AbstractBackground from '../components/AbstractBackground'

export default function Stats({ data }) {
  return (
    <section className="relative border-b hairline px-6 py-20">
      <AbstractBackground variant="a" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow uppercase">Sekilas Angka</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {data.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className={i % 2 === 1 ? 'md:mt-10' : ''}
            >
              <p className="underline-accent font-display text-4xl text-cream md:text-5xl">{stat.value}</p>
              <p className="eyebrow mt-3 uppercase">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
