import { Link } from 'react-router-dom'

export default function Footer({ data }) {
  return (
    <footer className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg tracking-[0.1em] text-cream">{data.brand.toUpperCase()}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">{data.tagline}</p>
          </div>
          <div>
            <p className="eyebrow uppercase">Halaman</p>
            <ul className="mt-4 space-y-2 text-sm text-mute">
              <li><a href="#about" className="hover:text-cream">Studio D13</a></li>
              <li><a href="#services" className="hover:text-cream">Keahlian</a></li>
              <li><a href="#contact" className="hover:text-cream">Kontak</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow uppercase">Sosial Media</p>
            <ul className="mt-4 space-y-2 text-sm text-mute">
              {data.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-cream">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t hairline pt-8 text-xs text-mute md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} — Muh Aldi Triantama. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>{data.location}</span>
            <Link to="/developer" className="hover:text-gold-light">Developer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
