import Reveal from '../components/Reveal'

export default function Hero({ data }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center border-b hairline px-6 pt-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Reveal>
            <p className="eyebrow uppercase">{data.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[13vw] leading-[0.95] text-cream md:text-[6.5rem]">
              {data.nameLine1}
              <br />
              <span className="italic text-gold-light">{data.nameLine2}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18} className="mt-10">
            <a href={data.ctaHref} className="btn-gold">
              {data.ctaLabel}
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.24} className="flex items-baseline gap-3 md:flex-col md:items-end">
          <span className="font-display text-6xl text-gold-light">{data.years}</span>
          <span className="eyebrow uppercase">{data.yearsLabel}</span>
        </Reveal>
      </div>
    </section>
  )
}
