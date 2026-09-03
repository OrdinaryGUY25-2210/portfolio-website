// Uploads images to the developer's own Google Drive and returns a public
// direct-view URL — used as the storage backend for every "URL Gambar"
// field, as an alternative to pasting an existing URL.
//
// Scope is drive.file only: this app can create/manage files it uploads,
// but cannot browse or read the rest of the Drive. A popup asks the
// developer to approve access once per session.

const SCOPE = 'https://www.googleapis.com/auth/drive.file'

let cachedToken = null
let cachedClient = null

function waitForGis(timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve()
      return
    }
    const start = Date.now()
    const interval = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        clearInterval(interval)
        resolve()
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(interval)
        reject(new Error('Google Identity Services gagal dimuat — periksa koneksi internet lalu coba lagi.'))
      }
    }, 150)
  })
}

export async function getAccessToken(clientId) {
  if (!clientId) throw new Error('VITE_GOOGLE_CLIENT_ID belum diset — lihat README untuk cara membuatnya.')
  if (cachedToken) return cachedToken

  await waitForGis()

  return new Promise((resolve, reject) => {
    if (!cachedClient) {
      cachedClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPE,
        callback: () => {}, // replaced per-request below
      })
    }
    cachedClient.callback = (response) => {
      if (response.error) {
        reject(new Error('Izin akses Google Drive ditolak atau dibatalkan.'))
        return
      }
      cachedToken = response.access_token
      // Access tokens last ~1 hour; drop the cache a little early so the
      // next upload just re-prompts instead of failing on an expired token.
      setTimeout(() => { cachedToken = null }, 50 * 60 * 1000)
      resolve(cachedToken)
    }
    cachedClient.requestAccessToken({ prompt: cachedToken ? '' : 'consent' })
  })
}

export async function uploadImageToDrive({ accessToken, blob, filename }) {
  const metadata = { name: filename, mimeType: blob.type }
  const form = new FormData()
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
  form.append('file', blob)

  const uploadRes = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    { method: 'POST', headers: { Authorization: `Bearer ${accessToken}` }, body: form }
  )
  if (!uploadRes.ok) throw new Error('Upload ke Google Drive gagal. Coba lagi.')
  const { id } = await uploadRes.json()

  const permRes = await fetch(`https://www.googleapis.com/drive/v3/files/${id}/permissions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'reader', type: 'anyone' }),
  })
  if (!permRes.ok) throw new Error('File terupload tapi gagal dibuat publik — buka Drive dan ubah akses filenya manual.')

  return `https://drive.google.com/uc?export=view&id=${id}`
}
