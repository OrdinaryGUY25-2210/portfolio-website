// Compact mock-ups used only inside Developer Mode's live preview panel.
// Deliberately NOT the real page sections — those use viewport units and
// fixed positioning that only make sense at full browser width. These use
// fixed rem sizing so they render correctly inside a narrow dashboard panel,
// while still picking up the live --color-* / --font-* variables, so a
// Tampilan change previews here too.
export default function MiniPreview({ section, data }) {
  if (!data) return null
  const Mini = MINI_MAP[section]
  if (!Mini) return <p className="text-xs text-mute">Preview belum tersedia untuk section ini.</p>
  return (
    <div className="rounded-xl border hairline bg-ink p-6">
      <Mini data={data} />
    </div>
  )
}

function HeroMini({ data }) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      {data.backgroundImage && (
        <>
          <img
            src={data.backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: `center ${data.backgroundPosition ?? 35}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        </>
      )}
      <div className="relative p-6">
        <p className="eyebrow uppercase">{data.eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-cream">
          {data.nameLine1} <span className="italic text-gold-light">{data.nameLine2}</span>
        </h1>
        <span className="btn-gold mt-4 inline-flex !py-2 !px-4 text-xs">{data.ctaLabel}</span>
      </div>
    </div>
  )
}

function StatsMini({ data }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {data.map((s) => (
        <div key={s.label}>
          <p className="font-display text-2xl text-cream">{s.value}</p>
          <p className="eyebrow mt-1 uppercase">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

function ServicesMini({ data }) {
  return (
    <div>
      <p className="eyebrow uppercase">{data.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl text-cream">{data.title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {data.items?.map((item) => (
          <div key={item.title} className="rounded-lg border hairline p-3">
            <p className="font-display text-sm text-cream">{item.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-mute">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PricingMini({ data }) {
  return (
    <div>
      <p className="eyebrow uppercase">{data.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl text-cream">{data.title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {data.tiers?.map((t) => (
          <div key={t.name} className={`rounded-lg border p-3 ${t.highlighted ? 'border-gold-light' : 'hairline'}`}>
            <p className="eyebrow uppercase">{t.tag}</p>
            <p className="font-display text-sm text-cream">{t.name}</p>
            {t.price && <p className="mt-1 text-xs text-gold-light">Rp {t.price}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessMini({ data }) {
  return (
    <div>
      <p className="eyebrow uppercase">{data.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl text-cream">{data.title}</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-4">
        {data.steps?.map((s, i) => (
          <li key={s.title}>
            <p className="font-display text-gold-light">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-1 text-xs text-cream">{s.title}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function AboutMini({ data }) {
  return (
    <div>
      <p className="eyebrow uppercase">{data.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl text-cream">{data.title}</h2>
      <p className="mt-2 font-display italic text-gold-light">&ldquo;{data.quote}&rdquo;</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {data.skills?.map((s) => (
          <span key={s} className="rounded-full border hairline px-2 py-0.5 text-xs text-mute">{s}</span>
        ))}
      </div>
    </div>
  )
}

function FaqMini({ data }) {
  return (
    <div>
      <p className="eyebrow uppercase">{data.eyebrow}</p>
      <div className="mt-3 space-y-2">
        {data.items?.map((f) => (
          <div key={f.q} className="border-b hairline pb-2">
            <p className="text-sm text-cream">{f.q}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FooterMini({ data }) {
  return (
    <div>
      <p className="font-display text-sm tracking-widest text-cream">{data.brand?.toUpperCase()}</p>
      <p className="mt-2 text-xs text-mute">{data.tagline}</p>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-mute">
        {data.social?.map((s) => <span key={s.label}>{s.label}</span>)}
      </div>
    </div>
  )
}

function ContactMini({ data }) {
  return (
    <div>
      <p className="eyebrow uppercase">{data.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl text-cream">{data.title}</h2>
      <div className="mt-3 space-y-1 text-xs text-mute">
        <p>WhatsApp: <span className="text-cream">{data.whatsapp}</span></p>
        <p>Email: <span className="text-cream">{data.email}</span></p>
        <p>Lokasi: <span className="text-cream">{data.location}</span></p>
      </div>
      <p className="mt-2 text-xs text-mute">(Form kontak aktif tidak ditampilkan di preview.)</p>
    </div>
  )
}

const MINI_MAP = {
  hero: HeroMini,
  stats: StatsMini,
  services: ServicesMini,
  pricing: PricingMini,
  process: ProcessMini,
  about: AboutMini,
  faq: FaqMini,
  footer: FooterMini,
  contact: ContactMini,
}

// Generic single-item preview used by CollectionEditor (Portfolio,
// Pencapaian, Testimoni, custom sections/pages) — works off whichever
// fields the item actually has, so one component covers every table.
export function ItemMiniCard({ item }) {
  const title = item.title || item.name || 'Judul belum diisi'
  const subtitle = item.category || item.role || item.issuer || item.slug
  const body = item.description || item.quote || item.body
  const image = item.image_url || item.avatar_url
  return (
    <div className="overflow-hidden rounded-xl border hairline bg-ink">
      {image && <img src={image} alt="" className="h-32 w-full object-cover" />}
      <div className="p-4">
        {item.year && <p className="eyebrow uppercase">{item.year}</p>}
        <p className="mt-1 font-display text-lg text-cream">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-mute">{subtitle}</p>}
        {body && <p className="mt-2 line-clamp-3 text-sm text-mute">{body}</p>}
      </div>
    </div>
  )
}
