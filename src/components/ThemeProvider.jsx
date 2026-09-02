import { useEffect } from 'react'

// Curated pairs only — free-typing a font name tends to break the layout,
// so Developer Mode picks from this list instead of typing raw font names.
export const FONT_PAIRS = {
  'fraunces-dmsans': { label: 'Fraunces + DM Sans (default)', display: "'Fraunces', serif", body: "'DM Sans', sans-serif" },
  'playfair-inter': { label: 'Playfair Display + Inter', display: "'Playfair Display', serif", body: "'Inter', sans-serif" },
  'cormorant-worksans': { label: 'Cormorant Garamond + Work Sans', display: "'Cormorant Garamond', serif", body: "'Work Sans', sans-serif" },
}

// Applies `theme` content (colors + font pair) from Supabase as CSS custom
// properties on <html>, so the whole site re-themes instantly without a
// rebuild. Falls back silently to the defaults already set in index.css.
export default function ThemeProvider({ theme, children }) {
  useEffect(() => {
    if (!theme) return
    const root = document.documentElement.style
    if (theme.bg) root.setProperty('--color-bg', theme.bg)
    if (theme.panel) root.setProperty('--color-panel', theme.panel)
    if (theme.cream) root.setProperty('--color-cream', theme.cream)
    if (theme.mute) root.setProperty('--color-mute', theme.mute)
    if (theme.gold) root.setProperty('--color-gold', theme.gold)
    if (theme.goldLight) root.setProperty('--color-gold-light', theme.goldLight)
    const pair = FONT_PAIRS[theme.fontPair] ?? FONT_PAIRS['fraunces-dmsans']
    root.setProperty('--font-display', pair.display)
    root.setProperty('--font-body', pair.body)
  }, [theme])

  return children
}
