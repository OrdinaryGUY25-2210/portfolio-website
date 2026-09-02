import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't crash the whole app on missing env — surface a clear console warning
  // so the public site still renders while developer mode explains what's missing.
  console.warn(
    '[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diset. ' +
      'Tambahkan di Environment Variables Vercel, lihat README.md.'
  )
}

export const supabase = createClient(supabaseUrl ?? 'https://placeholder.supabase.co', supabaseAnonKey ?? 'placeholder')
export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
