import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { defaultContent } from '../lib/defaultContent'
import { FONT_PAIRS, applyThemeVars } from '../components/ThemeProvider'
import MiniPreview, { ItemMiniCard } from '../components/MiniPreview'
import ImagePicker from '../components/ImagePicker'

const NAV = [
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'achievements', label: 'Pencapaian' },
  { key: 'testimonials', label: 'Testimoni' },
  { key: 'content', label: 'Konten Website' },
  { key: 'appearance', label: 'Tampilan' },
  { key: 'pages', label: 'Halaman & Section' },
]

const CONTENT_SECTIONS = Object.keys(defaultContent).filter((s) => s !== 'theme')

const emptyPortfolioItem = { title: '', category: '', role: '', year: '', description: '', image_url: '', link_url: '', sort_order: 0 }
const emptyAchievement = { title: '', issuer: '', year: '', description: '', sort_order: 0 }
const emptyTestimonial = { name: '', role: '', quote: '', avatar_url: '', sort_order: 0 }
const emptySection = { title: '', subtitle: '', body: '', image_url: '', cta_label: '', cta_href: '', sort_order: 0 }
const emptyPage = { slug: '', title: '', subtitle: '', body: '', image_url: '', nav_label: '', show_in_nav: true, sort_order: 0 }

export default function DeveloperDashboard({ site }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { content, portfolio, testimonials, achievements, customSections, customPages, loading, reload } = site
  const [tab, setTab] = useState('portfolio')

  const onSignOut = async () => {
    await signOut()
    navigate('/developer')
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <header className="flex items-center justify-between border-b hairline px-6 py-5">
        <div>
          <p className="eyebrow uppercase">Studio D13</p>
          <h1 className="font-display text-xl italic text-cream">Developer Mode</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer" className="btn-ghost !py-2 !px-4 text-xs">Lihat Website</a>
          <button type="button" onClick={onSignOut} className="btn-gold !py-2 !px-4 text-xs">Keluar</button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row">
        <aside className="shrink-0 md:w-48">
          <nav className="flex flex-row flex-wrap gap-2 md:flex-col">
            {NAV.map((n) => (
              <button
                key={n.key}
                type="button"
                onClick={() => setTab(n.key)}
                className={`rounded-lg px-3 py-2 text-left text-sm ${
                  tab === n.key ? 'bg-panel text-gold-light' : 'text-mute hover:text-cream'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {loading ? (
            <p className="text-sm text-mute">Memuat data…</p>
          ) : (
            <>
              {tab === 'portfolio' && (
                <CollectionEditor table="portfolio_items" items={portfolio} emptyItem={emptyPortfolioItem} onSaved={reload}
                  titleKey="title"
                  fields={[
                    { name: 'title', label: 'Judul', example: 'Company Profile — Kopi Nusantara' },
                    { name: 'category', label: 'Kategori', example: 'UI/UX Design' },
                    { name: 'role', label: 'Peran / Yang Dikerjakan', example: 'Design & Development' },
                    { name: 'year', label: 'Tahun', example: '2026' },
                    { name: 'description', label: 'Deskripsi', textarea: true, example: 'Website company profile untuk brand kopi lokal, fokus pada storytelling produk.' },
                    { name: 'image_url', label: 'Gambar', image: true, example: 'https://drive.google.com/uc?export=view&id=... (atau klik Pilih Gambar)' },
                    { name: 'link_url', label: 'URL Project (opsional)', example: 'https://kopinusantara.com' },
                    { name: 'sort_order', label: 'Urutan', number: true, example: '1 (angka lebih kecil tampil lebih dulu)' },
                  ]}
                />
              )}
              {tab === 'achievements' && (
                <CollectionEditor table="achievements" items={achievements} emptyItem={emptyAchievement} onSaved={reload}
                  titleKey="title"
                  fields={[
                    { name: 'title', label: 'Judul Pencapaian', example: '8+ Tahun Freelance' },
                    { name: 'issuer', label: 'Konteks / Pemberi (opsional)', example: 'Studio D13' },
                    { name: 'year', label: 'Tahun (opsional)', example: '2018 — sekarang' },
                    { name: 'description', label: 'Deskripsi', textarea: true, example: 'Konsisten menangani project desain & web dari klien lokal hingga internasional.' },
                    { name: 'sort_order', label: 'Urutan', number: true, example: '1' },
                  ]}
                />
              )}
              {tab === 'testimonials' && (
                <CollectionEditor table="testimonials" items={testimonials} emptyItem={emptyTestimonial} onSaved={reload}
                  titleKey="name"
                  fields={[
                    { name: 'name', label: 'Nama', example: 'Budi Santoso' },
                    { name: 'role', label: 'Role / Jabatan', example: 'Pemilik Kopi Nusantara' },
                    { name: 'quote', label: 'Testimoni', textarea: true, example: 'Prosesnya jelas dari awal sampai akhir, hasilnya sesuai brief.' },
                    { name: 'avatar_url', label: 'Foto (opsional)', image: true, example: 'https://drive.google.com/uc?export=view&id=... (atau klik Pilih Gambar)' },
                    { name: 'sort_order', label: 'Urutan', number: true, example: '1' },
                  ]}
                />
              )}
              {tab === 'content' && <ContentEditor content={content} onSaved={reload} />}
              {tab === 'appearance' && <AppearanceEditor theme={content.theme} onSaved={reload} />}
              {tab === 'pages' && <PagesEditor customSections={customSections} customPages={customPages} onSaved={reload} />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function CollectionEditor({ table, items, emptyItem, fields, onSaved, titleKey = 'title' }) {
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState(emptyItem)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const startNew = () => { setEditingId('new'); setDraft(emptyItem); setError('') }
  const startEdit = (item) => { setEditingId(item.id); setDraft(item); setError('') }
  const cancel = () => { setEditingId(null); setError('') }

  const save = async () => {
    setSaving(true)
    setError('')
    const payload = { ...draft }
    delete payload.id
    delete payload.created_at
    const query = editingId === 'new'
      ? supabase.from(table).insert([payload])
      : supabase.from(table).update(payload).eq('id', editingId)
    const { error: saveError } = await query
    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    setEditingId(null)
    onSaved()
  }

  const remove = async (id) => {
    if (!window.confirm('Hapus item ini?')) return
    const { error: deleteError } = await supabase.from(table).delete().eq('id', id)
    if (deleteError) setError(deleteError.message)
    else onSaved()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mute">{items.length} item</p>
        <button type="button" onClick={startNew} className="btn-gold !py-2 !px-4 text-xs">+ Tambah Item</button>
      </div>

      {editingId && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border hairline bg-panel p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.textarea || f.image ? 'sm:col-span-2' : ''}>
                  <label className="eyebrow uppercase">{f.label}</label>
                  {f.image ? (
                    <div className="mt-2">
                      <ImagePicker
                        value={draft[f.name]}
                        onChange={(url) => setDraft((d) => ({ ...d, [f.name]: url }))}
                        example={f.example}
                      />
                    </div>
                  ) : f.textarea ? (
                    <textarea
                      rows={3}
                      value={draft[f.name] ?? ''}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                      className="mt-2 w-full rounded-lg border hairline bg-panel2 p-3 text-sm text-cream outline-none focus:border-gold-light"
                    />
                  ) : f.checkbox ? (
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        checked={Boolean(draft[f.name])}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.checked }))}
                        className="h-4 w-4"
                      />
                    </div>
                  ) : (
                    <input
                      type={f.number ? 'number' : 'text'}
                      value={draft[f.name] ?? ''}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.name]: f.number ? Number(e.target.value) : e.target.value }))}
                      className="mt-2 w-full rounded-lg border hairline bg-panel2 p-3 text-sm text-cream outline-none focus:border-gold-light"
                    />
                  )}
                  {f.example && !f.image && <p className="mt-1.5 text-xs text-mute">Contoh: {f.example}</p>}
                </div>
              ))}
            </div>
            {error && <p className="mt-4 text-sm text-gold-light">{error}</p>}
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={save} disabled={saving} className="btn-gold !py-2 !px-5 text-xs disabled:opacity-60">
                {saving ? 'Menyimpan…' : 'Simpan'}
              </button>
              <button type="button" onClick={cancel} className="btn-ghost !py-2 !px-5 text-xs">Batal</button>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-2 uppercase">Live Preview</p>
            <ItemMiniCard item={draft} />
          </div>
        </div>
      )}

      <ul className="mt-6 divide-y divide-hair border-t hairline">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="truncate text-sm text-cream">{item[titleKey] || item.title || item.name}</p>
              <p className="truncate text-xs text-mute">{item.category ?? item.role ?? item.issuer ?? item.slug}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-xs">
              <button type="button" onClick={() => startEdit(item)} className="text-mute hover:text-gold-light">Edit</button>
              <button type="button" onClick={() => remove(item.id)} className="text-mute hover:text-gold-light">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContentEditor({ content, onSaved }) {
  const [section, setSection] = useState(CONTENT_SECTIONS[0])
  const [draft, setDraft] = useState(JSON.stringify(content[section], null, 2))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const selectSection = (s) => {
    setSection(s)
    setDraft(JSON.stringify(content[s], null, 2))
    setError('')
  }

  let previewData = null
  try {
    previewData = JSON.parse(draft)
  } catch {
    previewData = null
  }

  // Quick field for hero.backgroundImage — the one field worth a dedicated
  // control instead of hunting for it inside the JSON.
  const setHeroField = (key, value) => {
    if (!previewData) return
    const updated = { ...previewData, [key]: value }
    setDraft(JSON.stringify(updated, null, 2))
  }

  const save = async () => {
    setError('')
    let parsed
    try {
      parsed = JSON.parse(draft)
    } catch {
      setError('Format JSON tidak valid — periksa tanda kurung dan koma.')
      return
    }
    setSaving(true)
    const { error: saveError } = await supabase
      .from('site_content')
      .upsert({ section, data: parsed }, { onConflict: 'section' })
    setSaving(false)
    if (saveError) setError(saveError.message)
    else onSaved()
  }

  return (
    <div className="grid gap-8 md:grid-cols-[160px_1fr]">
      <nav className="flex flex-row flex-wrap gap-2 md:flex-col">
        {CONTENT_SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => selectSection(s)}
            className={`rounded-lg px-3 py-2 text-left text-sm capitalize ${
              section === s ? 'bg-panel text-gold-light' : 'text-mute hover:text-cream'
            }`}
          >
            {s}
          </button>
        ))}
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm text-mute">
            Edit bagian <span className="text-cream">{section}</span> sebagai JSON, lalu simpan. Contoh: ganti teks di antara tanda kutip <code>"..."</code>, jangan hapus tanda kurung <code>{'{ }'}</code> atau <code>[ ]</code>.
          </p>

          {section === 'hero' && previewData && (
            <div className="mt-4 rounded-xl border hairline bg-panel p-4">
              <label className="eyebrow uppercase">Gambar Background Hero</label>
              <div className="mt-2">
                <ImagePicker
                  value={previewData.backgroundImage}
                  onChange={(url) => setHeroField('backgroundImage', url)}
                  example="https://drive.google.com/uc?export=view&id=... — kosongkan untuk kembali polos tanpa gambar"
                />
              </div>
            </div>
          )}

          <textarea
            rows={18}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            className="mt-4 w-full rounded-xl border hairline bg-panel p-4 font-mono text-xs text-cream outline-none focus:border-gold-light"
          />
          {error && <p className="mt-3 text-sm text-gold-light">{error}</p>}
          <button type="button" onClick={save} disabled={saving} className="btn-gold mt-4 !py-2 !px-5 text-xs disabled:opacity-60">
            {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
          </button>
        </div>

        <div>
          <p className="eyebrow mb-2 uppercase">Live Preview</p>
          {previewData ? (
            <MiniPreview section={section} data={previewData} />
          ) : (
            <p className="rounded-xl border hairline p-4 text-xs text-mute">
              JSON belum valid — preview muncul lagi setelah diperbaiki.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function AppearanceEditor({ theme, onSaved }) {
  const [draft, setDraft] = useState(theme)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Live preview: every change is applied to the whole site immediately
  // (same CSS variables the real pages read from) — no save needed to see it.
  useEffect(() => {
    applyThemeVars(draft)
  }, [draft])

  // If they leave this tab without saving, put the last *saved* theme back
  // so the live preview doesn't linger as if it were persisted.
  useEffect(() => {
    return () => applyThemeVars(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }))

  const save = async () => {
    setSaving(true)
    setError('')
    const { error: saveError } = await supabase
      .from('site_content')
      .upsert({ section: 'theme', data: draft }, { onConflict: 'section' })
    setSaving(false)
    if (saveError) setError(saveError.message)
    else onSaved()
  }

  const colorFields = [
    { key: 'bg', label: 'Warna Background', example: '#0A0908' },
    { key: 'panel', label: 'Warna Panel / Kartu', example: '#131110' },
    { key: 'cream', label: 'Warna Teks Utama', example: '#F2EDE4' },
    { key: 'mute', label: 'Warna Teks Sekunder', example: '#9C9488' },
    { key: 'gold', label: 'Warna Aksen', example: '#AB892C' },
    { key: 'goldLight', label: 'Warna Aksen (Hover/Highlight)', example: '#C9A96A' },
  ]

  return (
    <div className="max-w-xl">
      <p className="text-sm text-mute">
        Ubah warna, tipografi, dan posisi menu — perubahan langsung terlihat di halaman ini juga (termasuk warna tombol di bawah), karena pakai variabel yang sama dengan website publik. Klik Simpan untuk membuat perubahan permanen di website; kalau pindah tab tanpa Simpan, tampilan otomatis kembali ke versi tersimpan.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {colorFields.map((f) => (
          <div key={f.key}>
            <label className="eyebrow uppercase">{f.label}</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={draft[f.key] ?? f.example}
                onChange={(e) => set(f.key, e.target.value)}
                className="h-10 w-10 shrink-0 cursor-pointer rounded border hairline bg-transparent"
              />
              <input
                type="text"
                value={draft[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                className="w-full rounded-lg border hairline bg-panel2 p-3 text-sm text-cream outline-none focus:border-gold-light"
              />
            </div>
            <p className="mt-1.5 text-xs text-mute">Contoh: {f.example}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <label className="eyebrow uppercase">Pasangan Font</label>
        <select
          value={draft.fontPair}
          onChange={(e) => set('fontPair', e.target.value)}
          className="mt-2 w-full rounded-lg border hairline bg-panel2 p-3 text-sm text-cream outline-none focus:border-gold-light"
        >
          {Object.entries(FONT_PAIRS).map(([key, pair]) => (
            <option key={key} value={key} className="bg-panel">{pair.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        <label className="eyebrow uppercase">Posisi Menu (Drawer)</label>
        <div className="mt-2 flex gap-3">
          {['right', 'left'].map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => set('drawerSide', side)}
              className={`rounded-full border px-4 py-2 text-xs capitalize ${
                draft.drawerSide === side ? 'border-gold-light text-gold-light' : 'hairline text-mute'
              }`}
            >
              {side === 'right' ? 'Kanan' : 'Kiri'}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-gold-light">{error}</p>}
      <button type="button" onClick={save} disabled={saving} className="btn-gold mt-8 !py-2 !px-5 text-xs disabled:opacity-60">
        {saving ? 'Menyimpan…' : 'Simpan Tampilan'}
      </button>
    </div>
  )
}

function PagesEditor({ customSections, customPages, onSaved }) {
  const [subTab, setSubTab] = useState('sections')

  return (
    <div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setSubTab('sections')}
          className={`rounded-full border px-4 py-2 text-xs ${subTab === 'sections' ? 'border-gold-light text-gold-light' : 'hairline text-mute'}`}>
          Tambah Section
        </button>
        <button type="button" onClick={() => setSubTab('pages')}
          className={`rounded-full border px-4 py-2 text-xs ${subTab === 'pages' ? 'border-gold-light text-gold-light' : 'hairline text-mute'}`}>
          Tambah Halaman
        </button>
      </div>

      <div className="mt-6">
        {subTab === 'sections' ? (
          <>
            <p className="text-sm text-mute">
              Section baru tampil di halaman utama, setelah FAQ dan sebelum footer, urut sesuai kolom Urutan.
            </p>
            <div className="mt-6">
              <CollectionEditor table="custom_sections" items={customSections} emptyItem={emptySection} onSaved={onSaved}
                titleKey="title"
                fields={[
                  { name: 'title', label: 'Judul Section', example: 'Proses Kolaborasi' },
                  { name: 'subtitle', label: 'Eyebrow / Label Kecil (opsional)', example: 'TAMBAHAN' },
                  { name: 'body', label: 'Isi / Paragraf', textarea: true, example: 'Jelaskan section ini dalam beberapa kalimat. Baris baru akan tetap terlihat di halaman.' },
                  { name: 'image_url', label: 'Gambar (opsional)', image: true, example: 'https://drive.google.com/uc?export=view&id=... (atau klik Pilih Gambar)' },
                  { name: 'cta_label', label: 'Teks Tombol (opsional)', example: 'Pelajari Lebih Lanjut' },
                  { name: 'cta_href', label: 'Link Tombol (opsional)', example: '#contact atau https://...' },
                  { name: 'sort_order', label: 'Urutan', number: true, example: '1' },
                ]}
              />
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-mute">
              Halaman baru bisa diakses di <code>domain-anda.com/slug</code>. Centang "Tampilkan di Menu" supaya muncul di navigasi.
            </p>
            <div className="mt-6">
              <CollectionEditor table="custom_pages" items={customPages} emptyItem={emptyPage} onSaved={onSaved}
                titleKey="title"
                fields={[
                  { name: 'slug', label: 'Slug URL (huruf kecil, tanpa spasi)', example: 'sertifikat' },
                  { name: 'title', label: 'Judul Halaman', example: 'Sertifikat & Pelatihan' },
                  { name: 'nav_label', label: 'Label di Menu (opsional)', example: 'Sertifikat' },
                  { name: 'subtitle', label: 'Eyebrow / Label Kecil (opsional)', example: 'DOKUMENTASI' },
                  { name: 'body', label: 'Isi Halaman', textarea: true, example: 'Tulis isi lengkap halaman ini. Baris baru akan tetap terlihat.' },
                  { name: 'image_url', label: 'Gambar (opsional)', image: true, example: 'https://drive.google.com/uc?export=view&id=... (atau klik Pilih Gambar)' },
                  { name: 'show_in_nav', label: 'Tampilkan di Menu', checkbox: true },
                  { name: 'sort_order', label: 'Urutan', number: true, example: '1' },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
