import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabaseConfigured } from '../lib/supabaseClient'

export default function DeveloperLogin() {
  const { session, checking, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!checking && session) return <Navigate to="/developer/dashboard" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: signInError } = await signIn(email, password)
    setLoading(false)
    if (signInError) {
      setError('Email atau password salah.')
    } else {
      navigate('/developer/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-cream">
      <div className="w-full max-w-sm">
        <p className="eyebrow uppercase">Studio D13</p>
        <h1 className="mt-2 font-display text-3xl italic text-cream">Developer Mode</h1>
        <p className="mt-3 text-sm text-mute">Masuk untuk mengedit konten, portfolio, dan pengaturan website.</p>

        {!supabaseConfigured && (
          <p className="mt-6 rounded-xl border border-gold-light/40 bg-panel p-4 text-xs text-mute">
            Supabase belum dikonfigurasi. Tambahkan <code>VITE_SUPABASE_URL</code> dan{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> di Environment Variables Vercel, lalu redeploy. Lihat README.md.
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="eyebrow uppercase">Email</label>
            <input
              id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              disabled={!supabaseConfigured}
              className="mt-2 w-full border-b hairline bg-transparent py-3 text-cream outline-none focus:border-gold-light disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="eyebrow uppercase">Password</label>
            <input
              id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              disabled={!supabaseConfigured}
              className="mt-2 w-full border-b hairline bg-transparent py-3 text-cream outline-none focus:border-gold-light disabled:opacity-50"
            />
          </div>
          {error && <p className="text-sm text-gold-light">{error}</p>}
          <button type="submit" disabled={loading || !supabaseConfigured} className="btn-gold w-full justify-center disabled:opacity-60">
            {loading ? 'Memeriksa…' : 'Masuk'}
          </button>
        </form>

        <a href="/" className="mt-8 block text-center text-xs text-mute hover:text-cream">← Kembali ke website</a>
      </div>
    </div>
  )
}
