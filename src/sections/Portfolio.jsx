import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'

export default function Portfolio({ items }) {
  const [active, setActive] = useState(null)
  const [category, setCategory] = useState('Semua')

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean))
    return ['Semua', ...Array.from(set)]
  }, [items])

  const filtered = category === 'Semua' ? items : items.filter((i) => i.category === category)

  return (
    <section id="portfolio" className="border-b hairline px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow uppercase">Pilihan</p>
            <h2 className="underline-accent mt-3 font-display text-4xl text-cream md:text-5xl">Karya Terbaik</h2>
          </Reveal>

          {categories.length > 2 && (
            <Reveal delay={0.08} className="flex flex-wrap gap-2 md:justify-end">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
                    category === c
                      ? 'border-gold-light bg-gold-light/10 text-gold-light'
                      : 'hairline text-mute hover:border-gold-light hover:text-cream'
                  }`}
                >
                  {c}
                </button>
              ))}
            </Reveal>
          )}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-sm text-mute">Belum ada karya ditambahkan. Masuk ke Developer Mode untuk menambahkan project pertama.</p>
        ) : filtered.length === 0 ? (
          <p className="mt-10 text-sm text-mute">Belum ada karya di kategori ini.</p>
        ) : (
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
                  className="mb-6 break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="group block w-full overflow-hidden rounded-2xl border hairline bg-panel text-left"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-panel2">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-display text-lg italic text-mute">
                          {item.title}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="eyebrow uppercase">{item.category}</p>
                      <h3 className="mt-1 font-display text-lg text-cream">{item.title}</h3>
                      {item.goal && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mute">{item.goal}</p>}
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl border hairline bg-panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {active.image_url && (
                <img src={active.image_url} alt={active.title} className="w-full object-cover" />
              )}
              <div className="p-8">
                <p className="eyebrow uppercase">{active.category}</p>
                <h3 className="mt-2 font-display text-2xl text-cream">{active.title}</h3>
                {(active.role || active.year) && (
                  <p className="mt-1 text-xs text-mute">
                    {[active.role, active.year].filter(Boolean).join(' · ')}
                  </p>
                )}
                {active.goal && (
                  <div className="mt-5 border-l-2 border-gold-light/40 pl-4">
                    <p className="eyebrow uppercase">Tujuan</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream">{active.goal}</p>
                  </div>
                )}
                {active.description && <p className="mt-3 text-sm leading-relaxed text-mute">{active.description}</p>}
                <div className="mt-6 flex gap-4">
                  {active.link_url && (
                    <a href={active.link_url} target="_blank" rel="noreferrer" className="btn-ghost !py-2 !px-5 text-xs">
                      Lihat Project
                    </a>
                  )}
                  <button type="button" onClick={() => setActive(null)} className="btn-ghost !py-2 !px-5 text-xs">
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
