// Compresses/resizes an image file entirely in the browser (Canvas API) and
// re-encodes it as WebP before it ever leaves the device — keeps uploads
// small and avoids needing a server-side image pipeline.
export async function compressToWebp(file, { maxWidth = 1600, quality = 0.82 } = {}) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxWidth / bitmap.width)
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close?.()

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
  if (!blob) {
    throw new Error('Browser ini tidak mendukung konversi ke WebP — coba browser lain (Chrome/Edge/Firefox terbaru).')
  }
  return blob
}
