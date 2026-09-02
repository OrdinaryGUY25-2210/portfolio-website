import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'

export default function Portfolio({ items }) {
  const [active, setActive] = useState(null)

  return (
    <section id="portfolio" className="border-b hairline px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow uppercase">Pilihan</p>
          <h2 className="mt-3 font-display text-4xl text-cream md:text-5xl">Karya Terbaik</h2>
        </Reveal>

        {items.length === 0 ? (
          <p className="mt-10 text-sm text-mute">Belum ada karya ditambahkan. Masuk ke Developer Mode untuk menambahkan project pertama.</p>
        ) : (
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.06} className="mb-6 break-inside-avoid">
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
                  </div>
                </button>
              </Reveal>
            ))}
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
                <p className="mt-3 text-sm leading-relaxed text-mute">{active.description}</p>
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
