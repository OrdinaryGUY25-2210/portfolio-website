import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { useSiteContent } from '../lib/useSiteContent'
import { defaultContent } from '../lib/defaultContent'

const TABS = ['Portfolio', 'Testimoni', 'Konten Website']
const CONTENT_SECTIONS = Object.keys(defaultContent)

const emptyPortfolioItem = { title: '', category: '', description: '', image_url: '', link_url: '', sort_order: 0 }
const emptyTestimonial = { name: '', role: '', quote: '', avatar_url: '', sort_order: 0 }

export default function DeveloperDashboard() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { content, portfolio, testimonials, loading, reload } = useSiteContent()
  const [tab, setTab] = useState('Portfolio')

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

      <div className="border-b hairline px-6">
        <nav className="mx-auto flex max-w-6xl gap-6">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border-b-2 py-4 text-sm ${tab === t ? 'border-gold-light text-cream' : 'border-transparent text-mute'}`}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {loading ? (
          <p className="text-sm text-mute">Memuat data…</p>
        ) : (
          <>
            {tab === 'Portfolio' && <CollectionEditor table="portfolio_items" items={portfolio} emptyItem={emptyPortfolioItem} onSaved={reload}
              fields={[
                { name: 'title', label: 'Judul' },
                { name: 'category', label: 'Kategori' },
                { name: 'description', label: 'Deskripsi', textarea: true },
                { name: 'image_url', label: 'URL Gambar' },
                { name: 'link_url', label: 'URL Project (opsional)' },
                { name: 'sort_order', label: 'Urutan', number: true },
              ]}
            />}
            {tab === 'Testimoni' && <CollectionEditor table="testimonials" items={testimonials} emptyItem={emptyTestimonial} onSaved={reload}
              fields={[
                { name: 'name', label: 'Nama' },
                { name: 'role', label: 'Role / Jabatan' },
                { name: 'quote', label: 'Testimoni', textarea: true },
                { name: 'avatar_url', label: 'URL Foto (opsional)' },
                { name: 'sort_order', label: 'Urutan', number: true },
              ]}
            />}
            {tab === 'Konten Website' && <ContentEditor content={content} onSaved={reload} />}
          </>
        )}
      </main>
    </div>
  )
}

function CollectionEditor({ table, items, emptyItem, fields, onSaved }) {
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
        <div className="mt-6 rounded-2xl border hairline bg-panel p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.textarea ? 'sm:col-span-2' : ''}>
                <label className="eyebrow uppercase">{f.label}</label>
                {f.textarea ? (
                  <textarea
                    rows={3}
                    value={draft[f.name] ?? ''}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                    className="mt-2 w-full rounded-lg border hairline bg-panel2 p-3 text-sm text-cream outline-none focus:border-gold-light"
                  />
                ) : (
                  <input
                    type={f.number ? 'number' : 'text'}
                    value={draft[f.name] ?? ''}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.name]: f.number ? Number(e.target.value) : e.target.value }))}
                    className="mt-2 w-full rounded-lg border hairline bg-panel2 p-3 text-sm text-cream outline-none focus:border-gold-light"
                  />
                )}
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
      )}

      <ul className="mt-6 divide-y divide-hair border-t hairline">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="truncate text-sm text-cream">{item.title ?? item.name}</p>
              <p className="truncate text-xs text-mute">{item.category ?? item.role}</p>
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
    <div className="grid gap-8 md:grid-cols-[200px_1fr]">
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
      <div>
        <p className="text-sm text-mute">
          Edit bagian <span className="text-cream">{section}</span> sebagai JSON, lalu simpan. Struktur mengikuti bentuk data section ini di halaman utama.
        </p>
        <textarea
          rows={20}
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
    </div>
  )
}
