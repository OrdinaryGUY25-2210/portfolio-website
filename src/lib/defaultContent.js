// Fallback content — used the moment the site loads and whenever a row is
// missing from Supabase `site_content`. Edit these directly for a quick
// content change without touching the database, or use Developer Mode.
export const defaultContent = {
  hero: {
    eyebrow: 'Graphic Designer · UI/UX · Digital Studio',
    nameLine1: 'Muh Aldi',
    nameLine2: 'Triantama',
    ctaLabel: 'Lihat Portfolio',
    ctaHref: '#portfolio',
    yearsLabel: 'Years EXP',
    years: '8+',
  },
  stats: [
    { label: 'Tahun Pengalaman', value: '8+' },
    { label: 'Project Selesai', value: '120+' },
    { label: 'Produk Digital', value: '25+' },
    { label: 'Client Puas', value: '90+' },
  ],
  services: {
    eyebrow: 'LAYANAN',
    title: 'Apa Yang Saya Tawarkan',
    items: [
      {
        title: 'Graphic Design',
        description:
          'Branding, logo, packaging, poster, dan social media kit yang membangun identitas visual bisnis Anda dari nol.',
      },
      {
        title: 'UI/UX & Web',
        description:
          'Wireframe, prototype interaktif, desain antarmuka aplikasi dan website siap publish via Framer atau Next.js.',
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
  pricing: {
    eyebrow: 'HARGA',
    title: 'Paket Harga',
    subtitle:
      'Transparan dari awal — pilih paket yang paling pas, atau diskusikan kebutuhan custom.',
    tiers: [
      {
        name: 'Landing Page',
        tag: 'Starter',
        duration: '3–5 hari kerja',
        price: '',
        highlighted: false,
        features: [
          'Landing page modern & fast loading',
          'Optimalisasi mobile & desktop view',
          'Interactive floating chatbot pada website',
          'Free garansi teknis 14 hari setelah publish',
        ],
      },
      {
        name: 'Company Profile',
        tag: 'Business',
        duration: '7–10 hari kerja',
        price: '',
        highlighted: true,
        features: [
          'Multi-page website',
          'Smart chatbot dengan integrasi WhatsApp',
          'Fitur UI/UX tingkat lanjut',
          'Integration setup',
          'Garansi bug & pemeliharaan teknis 30 hari',
        ],
      },
      {
        name: 'Custom CMS',
        tag: 'Premium',
        duration: '14–21 hari kerja',
        price: '8.500.000+',
        highlighted: false,
        features: [
          'Custom high-performance website',
          'Advanced chatbot system dengan penyimpanan data (database / CRM / sheets)',
          'Fitur enterprise & CMS kompleks',
          'Premium SEO setup + performance & security optimization',
          'Prioritas dukungan teknis & garansi maintenance hingga 3 bulan',
          'Dokumentasi lengkap alur kerja sistem / database',
        ],
      },
    ],
    footnote:
      'Butuh kombinasi di luar paket ini? Diskusikan kebutuhan Anda — harga & scope custom menyesuaikan.',
  },
  process: {
    eyebrow: 'PROSES',
    title: 'Cara Kerja',
    subtitle: 'Empat tahap sederhana dari brief pertama sampai file di tangan Anda.',
    steps: [
      { day: 'Hari ke-1', title: 'Brief & DP', description: 'Diskusi kebutuhan, referensi, dan budget lewat WA/form. Mulai pengerjaan setelah DP 50%.' },
      { day: 'Menyesuaikan scope', title: 'Draft & Konsep', description: 'Draft/moodboard awal dikirim untuk direview — di sinilah arah desain dikunci bareng-bareng.' },
      { day: 'Sesuai paket', title: 'Revisi', description: 'Penyesuaian berdasarkan feedback sampai hasil disetujui bersama.' },
      { day: '1×24 jam', title: 'Pelunasan & Handoff', description: 'Pelunasan 50% terakhir, lalu file final & akses dikirim — siap pakai atau publish.' },
    ],
    footnote: 'Estimasi waktu menyesuaikan scope & paket — detail durasi per paket ada di bagian Harga.',
  },
  about: {
    eyebrow: 'STUDIO',
    title: 'Tentang Studio D13',
    quote: 'Desain yang baik bukan hanya indah — ia memecahkan masalah dan membangun kepercayaan.',
    body: 'Bagi saya, desain bukan sekadar mempercantik tampilan — tapi alat bisnis yang bekerja untuk brand Anda.',
    skills: ['Framer', 'Figma', 'Adobe Suite', 'UI/UX Design', 'Brand Identity', 'Photography', 'Videography'],
  },
  contact: {
    eyebrow: 'KONTAK',
    title: 'Mari Berkolaborasi Bersama',
    whatsapp: '+62 821-9489-9129',
    email: 'alditriantama56@gmail.com',
    location: 'Indonesia, Sulawesi Tengah, Palu',
    availability: 'Tersedia untuk Proyek Baru',
    services: ['No-Code Web Development', 'Branding', 'Lainnya'],
  },
  faq: {
    eyebrow: 'FAQ',
    items: [
      { q: 'Berapa lama pengerjaan proyek?', a: 'Tergantung paket dan kompleksitas — mulai 3 hari untuk landing page hingga 21 hari untuk custom CMS. Detail per paket ada di bagian Harga.' },
      { q: 'Menerima klien dari luar Palu?', a: 'Ya! Saya terbuka untuk klien dari seluruh Indonesia dan internasional. Semua komunikasi dan pengiriman file via online.' },
      { q: 'Sistem pembayaran bagaimana?', a: 'DP 50% di awal untuk mulai pengerjaan, pelunasan 50% setelah revisi final disetujui dan sebelum file dikirim.' },
    ],
  },
  footer: {
    brand: 'Studio D13',
    tagline: 'Studio desain kreatif berbasis di Palu, Sulawesi Tengah. Graphic design, UI/UX, Framer templates & digital products.',
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

export const defaultPortfolioItems = [
  { id: 'seed-1', title: 'Company Profile — Kopi Nusantara', category: 'UI/UX Design', description: 'Website company profile untuk brand kopi lokal.', image_url: '', link_url: '', sort_order: 1 },
  { id: 'seed-2', title: 'Brand Identity — Playbox Palu', category: 'Brand Identity', description: 'Logo dan identitas visual untuk bisnis rental PlayStation.', image_url: '', link_url: '', sort_order: 2 },
  { id: 'seed-3', title: 'Landing Page — Studio D13', category: 'Framer Template', description: 'Landing page portfolio dengan efek reveal dan grid masonry.', image_url: '', link_url: '', sort_order: 3 },
]

export const defaultTestimonials = [
  { id: 'seed-1', name: 'Klien Studio D13', role: 'Pemilik Bisnis', quote: 'Prosesnya jelas dari awal sampai akhir, hasilnya sesuai brief.', avatar_url: '', sort_order: 1 },
]
