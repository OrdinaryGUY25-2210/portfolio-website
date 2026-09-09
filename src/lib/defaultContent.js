// Fallback content — used the moment the site loads and whenever a row is
// missing from Supabase `site_content`. Edit these directly for a quick
// content change without touching the database, or use Developer Mode.
//
// This site is a PURE PORTFOLIO: what Aldi has built, what he's capable of,
// and the purpose behind each piece — no pricing, no "how we work" payment
// steps, no hire-me sales pitch. Achievements and Portfolio carry the weight.
export const defaultContent = {
  theme: {
    fontPair: 'fraunces-dmsans', // 'fraunces-dmsans' | 'playfair-inter' | 'cormorant-worksans'
    gold: '#AB892C',
    goldLight: '#C9A96A',
    bg: '#0A0908',
    panel: '#131110',
    cream: '#F2EDE4',
    mute: '#9C9488',
    drawerSide: 'right', // 'right' | 'left'
  },
  hero: {
    eyebrow: 'Portfolio · Graphic Design · UI/UX · No-Code Dev',
    nameLine1: 'Muh Aldi',
    nameLine2: 'Triantama',
    ctaLabel: 'Lihat Karya',
    ctaHref: '#portfolio',
    yearsLabel: 'Years EXP',
    years: '8+',
    backgroundImage: '',
    backgroundPosition: 35, // vertical focal point of backgroundImage, 0 (atas) – 100 (bawah)
  },
  stats: [
    { label: 'Tahun Pengalaman', value: '8+' },
    { label: 'Project Selesai', value: '120+' },
    { label: 'Produk Digital', value: '25+' },
    { label: 'Client Puas', value: '90+' },
  ],
  services: {
    eyebrow: 'KEAHLIAN',
    title: 'Apa Yang Saya Kerjakan',
    items: [
      {
        title: 'Graphic Design',
        description:
          'Branding, logo, packaging, poster, dan social media kit — dibangun dari riset identitas visual, bukan sekadar template.',
      },
      {
        title: 'UI/UX & Web',
        description:
          'Wireframe, prototype interaktif, desain antarmuka aplikasi, dan website siap publish via Framer atau React.',
      },
      {
        title: 'Foto & Video',
        description:
          'Foto produk, dokumentasi event, video company profile, dan konten kreatif untuk kebutuhan digital maupun cetak.',
      },
      {
        title: 'IT Support',
        description:
          'Dukungan teknis perangkat keras, jaringan, dan infrastruktur IT untuk bisnis skala kecil dan menengah.',
      },
    ],
  },
  about: {
    eyebrow: 'STUDIO',
    title: 'Tentang Studio D13',
    quote: 'Desain yang baik bukan hanya indah — ia memecahkan masalah dan membangun kepercayaan.',
    body: 'Bagi saya, desain bukan sekadar mempercantik tampilan — tapi cara berpikir yang bekerja untuk setiap masalah yang dihadapi. Portfolio ini sendiri adalah contohnya: dibangun, bukan cuma dipajang.',
    skills: ['Framer', 'Figma', 'Adobe Suite', 'UI/UX Design', 'Brand Identity', 'Photography', 'Videography'],
  },
  contact: {
    eyebrow: 'KONTAK',
    title: 'Terhubung',
    subtitle: 'Ada pertanyaan tentang salah satu karya, atau sekadar mau menyapa? Kirim pesan lewat form ini.',
    whatsapp: '+62 821-9489-9129',
    email: 'alditriantama56@gmail.com',
    location: 'Indonesia, Sulawesi Tengah, Palu',
  },
  footer: {
    brand: 'Studio D13',
    tagline: 'Portfolio karya kreatif berbasis di Palu, Sulawesi Tengah. Graphic design, UI/UX, dan produk digital.',
    location: 'Palu, Sulawesi Tengah 🇮🇩',
    social: [
      { label: 'Instagram', href: '#' },
      { label: 'TikTok', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Behance', href: '#' },
      { label: 'Upwork', href: '#' },
    ],
  },
}

// Achievements — the "proof" section of a portfolio: awards, milestones,
// certifications, notable placements. Shown right after Hero.
export const defaultAchievements = [
  { id: 'seed-1', title: '8+ Tahun Freelance', issuer: 'Studio D13', year: '2018 — sekarang', description: 'Konsisten menangani project desain & web dari klien lokal hingga internasional.', sort_order: 1 },
  { id: 'seed-2', title: '120+ Project Selesai', issuer: 'Berbagai klien', year: '', description: 'Mulai dari branding UMKM, landing page, hingga sistem web custom.', sort_order: 2 },
  { id: 'seed-3', title: 'Ebook Series — UI/UX & Visual Creator Master Guide', issuer: 'Studio D13', year: '2026', description: 'Menulis dan mendesain dua ebook panduan dengan sistem desain Fraunces/DM Sans.', sort_order: 3 },
]

// Setiap karya punya "tujuan" (goal) — masalah apa yang coba dipecahkan,
// bukan cuma sekadar dipajang. Ditampilkan di kartu & detail karya.
export const defaultPortfolioItems = [
  { id: 'seed-1', title: 'Company Profile — Kopi Nusantara', category: 'UI/UX Design', role: 'Design & Development', year: '2026', goal: 'Membantu brand kopi lokal punya kehadiran online yang mencerminkan kualitas produknya, bukan sekadar company profile generik.', description: 'Website company profile untuk brand kopi lokal.', image_url: '', link_url: '', sort_order: 1 },
  { id: 'seed-2', title: 'Brand Identity — Playbox Palu', category: 'Brand Identity', role: 'Branding', year: '2026', goal: 'Memberi identitas visual yang mudah dikenali di tengah ramainya bisnis rental game sejenis di kota yang sama.', description: 'Logo dan identitas visual untuk bisnis rental PlayStation.', image_url: '', link_url: '', sort_order: 2 },
  { id: 'seed-3', title: 'Landing Page — Studio D13', category: 'Framer Template', role: 'Design & Development', year: '2026', goal: 'Membuktikan lewat portfolio ini sendiri bahwa desain yang baik juga harus dibangun dengan baik, bukan cuma didesain.', description: 'Landing page portfolio dengan efek reveal dan grid masonry.', image_url: '', link_url: '', sort_order: 3 },
]

export const defaultTestimonials = [
  { id: 'seed-1', name: 'Klien Studio D13', role: 'Pemilik Bisnis', quote: 'Prosesnya jelas dari awal sampai akhir, hasilnya sesuai brief.', avatar_url: '', sort_order: 1 },
]

export const defaultCustomSections = []
export const defaultCustomPages = []
