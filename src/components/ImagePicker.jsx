import { useRef, useState } from 'react'
import { compressToWebp } from '../lib/imageCompress'
import { getAccessToken, uploadImageToDrive } from '../lib/googleDrive'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function ImagePicker({ value, onChange, example }) {
  const inputRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | compressing | uploading
  const [error, setError] = useState('')

  const pick = () => inputRef.current?.click()

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow picking the same file again later
    if (!file) return

    if (!CLIENT_ID) {
      setError('Upload ke Drive belum aktif — VITE_GOOGLE_CLIENT_ID belum diset di Environment Variables. Tempel URL gambar manual, atau lihat README bagian Google Drive.')
      return
    }

    setError('')
    try {
      setStatus('compressing')
      const webp = await compressToWebp(file)

      setStatus('uploading')
      const accessToken = await getAccessToken(CLIENT_ID)
      const filename = `${file.name.replace(/\.[^./]+$/, '') || 'gambar'}.webp`
      const url = await uploadImageToDrive({ accessToken, blob: webp, filename })

      onChange(url)
    } catch (err) {
      setError(err.message || 'Upload gagal, coba lagi.')
    } finally {
      setStatus('idle')
    }
  }

  const busy = status !== 'idle'

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tempel URL gambar…"
          className="w-full rounded-lg border hairline bg-panel2 p-3 text-sm text-cream outline-none focus:border-gold-light"
        />
        <button
          type="button"
          onClick={pick}
          disabled={busy}
          className="btn-ghost shrink-0 whitespace-nowrap !py-2 !px-4 text-xs disabled:opacity-60"
        >
          {status === 'compressing' ? 'Mengompres…' : status === 'uploading' ? 'Mengunggah…' : 'Pilih Gambar'}
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
      </div>

      <div className="mt-2 flex items-center gap-3">
        {value && (
          <img src={value} alt="" className="h-16 w-16 shrink-0 rounded-lg border hairline object-cover" />
        )}
        <div className="min-w-0">
          {error && <p className="text-xs text-gold-light">{error}</p>}
          {!error && example && <p className="text-xs text-mute">Contoh: {example}</p>}
          <p className="mt-0.5 text-xs text-mute">
            "Pilih Gambar" membuka galeri/penyimpanan perangkat, otomatis dikompres ke WebP lalu diunggah ke Google Drive kamu.
          </p>
        </div>
      </div>
    </div>
  )
}
