import { useState } from 'react'
import Reveal from '../components/Reveal'

export default function FAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="border-b hairline px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow uppercase">{data.eyebrow}</p>
        </Reveal>
        <div className="mt-8 divide-y divide-hair border-t hairline">
          {data.items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="font-display text-lg text-cream">{item.q}</span>
                  <span className="text-xl text-gold-light">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="max-w-prose pb-6 text-sm leading-relaxed text-mute">{item.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
