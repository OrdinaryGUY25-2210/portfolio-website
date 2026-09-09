import Reveal from '../components/Reveal'
import AbstractBackground from '../components/AbstractBackground'

// Sections added from Developer Mode → Halaman & Section → Tambah Section.
// Rendered after the built-in sections, in sort_order. Alternates text
// alignment left/right by index so a long page doesn't read as one
// unbroken column of centered blocks, and gets a faint abstract background
// since these tend to be short text-only blocks that can look bare.
export default function CustomSections({ items }) {
  if (!items?.length) return null
  return (
    <>
      {items.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <section key={s.id} className="relative border-b hairline px-6 py-20">
            <AbstractBackground variant={flip ? 'b' : 'a'} />
            <div className={`mx-auto max-w-6xl ${flip ? 'text-right' : ''}`}>
              <Reveal className={flip ? 'ml-auto max-w-xl' : 'max-w-xl'}>
                {s.subtitle && <p className="eyebrow uppercase">{s.subtitle}</p>}
                <h2 className="underline-accent mt-3 font-display text-3xl text-cream md:text-4xl">{s.title}</h2>
              </Reveal>
              {s.image_url && (
                <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-2xl border hairline text-left">
                  <img src={s.image_url} alt={s.title} className="w-full object-cover" />
                </Reveal>
              )}
              {s.body && (
                <Reveal delay={0.12} className={flip ? 'ml-auto max-w-prose text-left' : 'max-w-prose text-left'}>
                  <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-mute">{s.body}</p>
                </Reveal>
              )}
              {s.cta_label && s.cta_href && (
                <Reveal delay={0.16} className="mt-8">
                  <a href={s.cta_href} className="btn-ghost">{s.cta_label}</a>
                </Reveal>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}
