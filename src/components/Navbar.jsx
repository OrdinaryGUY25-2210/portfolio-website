import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Pencapaian', href: '#achievements' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Keahlian', href: '#services' },
  { label: 'Tentang', href: '#about' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar({ drawerSide = 'right', customPages = [] }) {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) closeBtnRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const drawerX = drawerSide === 'right' ? { hidden: '100%', shown: 0 } : { hidden: '-100%', shown: 0 }

  const navPages = useMemo(
    () => (customPages ?? []).filter((p) => p.show_in_nav).map((p) => ({ label: p.nav_label || p.title, href: `/${p.slug}` })),
    [customPages]
  )
  const allLinks = [...LINKS, ...navPages]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b hairline bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-sm tracking-[0.15em] text-cream">
            STUDIO&nbsp;D13
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.slice(0, 5).map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-mute transition-colors hover:text-cream">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-gold !py-2 !px-5 text-xs">Hubungi Saya</a>
          </nav>
          <button
            type="button"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-6 bg-cream" />
            <span className="h-px w-6 bg-cream" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi"
              className={`fixed inset-y-0 z-50 flex w-full max-w-sm flex-col justify-between border-hair bg-panel px-8 py-8 ${
                drawerSide === 'right' ? 'right-0 border-l' : 'left-0 border-r'
              }`}
              initial={{ x: drawerX.hidden }}
              animate={{ x: drawerX.shown }}
              exit={{ x: drawerX.hidden }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm tracking-[0.15em] text-cream">STUDIO&nbsp;D13</span>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    aria-label="Tutup menu"
                    onClick={() => setOpen(false)}
                    className="flex h-10 w-10 items-center justify-center text-2xl text-cream"
                  >
                    ×
                  </button>
                </div>
                <nav className="mt-12 flex flex-col gap-1">
                  {allLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="border-b hairline py-4 font-display text-2xl italic text-cream transition-colors hover:text-gold-light"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex items-center justify-between text-xs text-mute">
                <span>Palu, Sulawesi Tengah</span>
                <Link to="/developer" onClick={() => setOpen(false)} className="hover:text-gold-light">
                  Developer Mode
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
