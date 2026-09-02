import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { supabase, supabaseConfigured } from '../lib/supabaseClient'

// Full pages added from Developer Mode → Halaman & Section → Tambah Halaman.
// Route is added dynamically in App.jsx as a catch-all after the fixed routes.
export default function DynamicPage({ site }) {
  const { slug } = useParams()
  const { content, customPages } = site
  const [page, setPage] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!supabaseConfigured) {
        setPage(null)
        return
      }
      const { data, error } = await supabase.from('custom_pages').select('*').eq('slug', slug).maybeSingle()
      if (!cancelled) setPage(error ? null : data ?? null)
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  if (page === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <p className="eyebrow uppercase text-mute">Memuat…</p>
      </div>
    )
  }

  if (page === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
        <p className="eyebrow uppercase">404</p>
        <h1 className="font-display text-3xl text-cream">Halaman tidak ditemukan</h1>
        <Link to="/" className="btn-ghost">Kembali ke Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Navbar customPages={customPages} drawerSide={content.theme?.drawerSide} />
      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            {page.subtitle && <p className="eyebrow uppercase">{page.subtitle}</p>}
            <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">{page.title}</h1>
          </Reveal>
          {page.image_url && (
            <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-2xl border hairline">
              <img src={page.image_url} alt={page.title} className="w-full object-cover" />
            </Reveal>
          )}
          {page.body && (
            <Reveal delay={0.16}>
              <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-mute">{page.body}</p>
            </Reveal>
          )}
        </div>
      </main>
      <Footer data={content.footer} />
    </div>
  )
}
