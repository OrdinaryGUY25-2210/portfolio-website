import Reveal from '../components/Reveal'

export default function About({ data }) {
  return (
    <section id="about" className="border-b hairline px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="eyebrow uppercase">{data.eyebrow}</p>
          <h2 className="underline-accent mt-3 font-display text-4xl text-cream md:text-5xl">{data.title}</h2>
          <p className="mt-8 max-w-prose font-display text-2xl italic leading-snug text-gold-light">
            “{data.quote}”
          </p>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-mute">{data.body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow uppercase">Keahlian</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-3 text-sm text-cream">
            {data.skills.map((skill) => (
              <li key={skill} className="border-b hairline pb-3">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
