// Uploads images to the "images" bucket in Supabase Storage and returns a
// public URL — used as the storage backend for every "URL Gambar" field,
// as an alternative to pasting an existing URL.
//
// Requires a public bucket named "images" (created once, see
// supabase/schema.sql or README.md bagian "Setup Supabase Storage").

import { supabase, supabaseConfigured } from './supabaseClient'

const BUCKET = 'images'

function randomId() {
  return Math.random().toString(36).slice(2, 10)
}

export async function uploadImageToStorage({ blob, filename }) {
  if (!supabaseConfigured) {
    throw new Error('Supabase belum diset — VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi di Environment Variables.')
  }

  const safeName = (filename.replace(/\.[^./]+$/, '') || 'gambar')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'gambar'
  const path = `${safeName}-${Date.now()}-${randomId()}.webp`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: 'image/webp', cacheControl: '31536000', upsert: false })

  if (uploadError) {
    if (uploadError.message?.toLowerCase().includes('bucket not found')) {
      throw new Error('Bucket "images" belum dibuat di Supabase Storage — lihat README bagian "Setup Supabase Storage".')
    }
    throw new Error(`Upload ke Supabase Storage gagal: ${uploadError.message}`)
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  if (!data?.publicUrl) {
    throw new Error('Upload berhasil tapi gagal mengambil URL publik — coba lagi.')
  }
  return data.publicUrl
}
