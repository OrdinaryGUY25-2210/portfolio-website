import { useState } from 'react'
import Reveal from '../components/Reveal'
import AbstractBackground from '../components/AbstractBackground'
import { supabase, supabaseConfigured } from '../lib/supabaseClient'

const initialForm = { name: '', email: '', phone: '', description: '' }

export default function Contact({ data }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!supabaseConfigured) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const { error } = await supabase.from('contact_submissions').insert([form])
    if (error) {
      setStatus('error')
    } else {
      setStatus('sent')
      setForm(initialForm)
    }
  }

  return (
    <section id="contact" className="relative border-b hairline px-6 py-24">
      <AbstractBackground variant="a" />
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow uppercase">{data.eyebrow}</p>
            <h2 className="underline-accent mt-3 font-display text-4xl text-cream md:text-5xl">{data.title}</h2>
            {data.subtitle && <p className="mt-4 max-w-prose text-sm text-mute">{data.subtitle}</p>}
          </Reveal>
          <Reveal delay={0.1} className="mt-10 space-y-6 text-sm">
            <div>
              <p className="eyebrow uppercase">WhatsApp</p>
              <p className="mt-1 text-cream">{data.whatsapp}</p>
            </div>
            <div>
              <p className="eyebrow uppercase">Email</p>
              <p className="mt-1 text-cream">{data.email}</p>
            </div>
            <div>
              <p className="eyebrow uppercase">Lokasi</p>
              <p className="mt-1 text-cream">{data.location}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="eyebrow uppercase">Nama</label>
              <input id="name" name="name" required value={form.name} onChange={onChange}
                className="mt-2 w-full border-b hairline bg-transparent py-3 text-cream outline-none focus:border-gold-light" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="eyebrow uppercase">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={onChange}
                  className="mt-2 w-full border-b hairline bg-transparent py-3 text-cream outline-none focus:border-gold-light" />
              </div>
              <div>
                <label htmlFor="phone" className="eyebrow uppercase">Nomor HP (opsional)</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange}
                  className="mt-2 w-full border-b hairline bg-transparent py-3 text-cream outline-none focus:border-gold-light" />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="eyebrow uppercase">Pesan</label>
              <textarea id="description" name="description" rows={4} value={form.description} onChange={onChange}
                className="mt-2 w-full border-b hairline bg-transparent py-3 text-cream outline-none focus:border-gold-light" />
            </div>
            <button type="submit" disabled={status === 'sending'} className="btn-gold w-full justify-center disabled:opacity-60">
              {status === 'sending' ? 'Mengirim…' : 'Kirim Pesan'}
            </button>
            {status === 'sent' && <p className="text-sm text-gold-light">Terkirim — saya akan segera menghubungi Anda.</p>}
            {status === 'error' && (
              <p className="text-sm text-mute">
                Gagal mengirim. Hubungi langsung lewat WhatsApp {data.whatsapp} atau pastikan Supabase sudah dikonfigurasi.
              </p>
            )}
          </form>
          <p className="pointer-events-none absolute -bottom-10 right-0 hidden font-display text-xs italic tracking-wide text-mute/60 md:block">
            {data.location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
