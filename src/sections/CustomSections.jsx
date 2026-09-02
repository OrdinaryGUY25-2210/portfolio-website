import Reveal from '../components/Reveal'

// Sections added from Developer Mode → Halaman & Section → Tambah Section.
// Rendered after the built-in sections, in sort_order.
export default function CustomSections({ items }) {
  if (!items?.length) return null
  return (
    <>
      {items.map((s) => (
        <section key={s.id} className="border-b hairline px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              {s.subtitle && <p className="eyebrow uppercase">{s.subtitle}</p>}
              <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">{s.title}</h2>
            </Reveal>
            {s.image_url && (
              <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-2xl border hairline">
                <img src={s.image_url} alt={s.title} className="w-full object-cover" />
              </Reveal>
            )}
            {s.body && (
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-prose whitespace-pre-line text-sm leading-relaxed text-mute">{s.body}</p>
              </Reveal>
            )}
            {s.cta_label && s.cta_href && (
              <Reveal delay={0.16} className="mt-8">
                <a href={s.cta_href} className="btn-ghost">{s.cta_label}</a>
              </Reveal>
            )}
          </div>
        </section>
      ))}
    </>
  )
}
