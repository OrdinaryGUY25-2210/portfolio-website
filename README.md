# Studio D13 — Website (React + Supabase)

Website portfolio Studio D13 — dibangun agar bekerja **sebagai portfolio**: memimpin dengan Pencapaian (bukti) dan Portfolio (karya), baru layanan/harga di bawahnya. Fitur:
- Efek reveal saat scroll di setiap section
- Menu navigasi slide-in (posisi kanan/kiri diatur dari Developer Mode)
- Halaman login terpisah di `/developer` untuk masuk ke **Developer Mode**
- Di Developer Mode: sidebar dengan 6 kontrol — **Portfolio**, **Pencapaian**, **Testimoni**, **Konten Website**, **Tampilan** (warna & font, tanpa deploy ulang), dan **Halaman & Section** (tambah section baru di homepage, atau tambah halaman baru dengan URL sendiri)
- Setiap kolom form di Developer Mode punya contoh pengisian di bawahnya
- Data disimpan di **Supabase** (database + auth) — bisa diedit tanpa deploy ulang
- Responsif dan accessible di semua device (mobile, tablet, desktop) — kontras warna, fokus keyboard terlihat, dan menghormati pengaturan "reduced motion" di perangkat

Semua langkah di bawah ini dilakukan lewat **browser** — tidak perlu install Node.js, git, atau apapun di komputer Anda.

---

## 1. Setup Supabase (5–10 menit)

1. Buka [supabase.com](https://supabase.com) → masuk ke project Supabase yang sudah Anda punya.
2. Di sidebar kiri, buka **SQL Editor** → **New query**.
3. Buka file `supabase/schema.sql` di project ini, salin semua isinya, tempel ke SQL Editor, lalu klik **Run**.
   Ini akan membuat 4 tabel (`site_content`, `portfolio_items`, `testimonials`, `contact_submissions`) beserta aturan keamanan (Row Level Security): siapa saja bisa **membaca** konten, tapi hanya Anda yang **login** yang bisa menambah/edit/hapus.
4. Buka menu **Authentication → Users** → **Add user** → buat 1 akun (email + password) untuk Anda sendiri. Ini akun yang dipakai login di `/developer`.
5. Buka menu **Project Settings → API**. Catat dua nilai ini:
   - **Project URL** → contoh `https://xxxxx.supabase.co`
   - **anon public key** → key panjang di bagian "Project API keys"

Simpan dua nilai ini, dipakai di langkah 3 (Vercel).

> Opsional: isi beberapa baris awal di `portfolio_items` dan `testimonials` langsung lewat **Table Editor** di Supabase kalau mau, atau tambahkan nanti lewat Developer Mode di website.

---

## 2. Upload project ke GitHub (lewat browser, tanpa git)

1. Buka [github.com/new](https://github.com/new) → buat repository baru (misalnya `studio-d13-website`), biarkan kosong (jangan centang "Add README").
2. Di halaman repository kosong tadi, klik link **"uploading an existing file"**.
3. Drag & drop seluruh isi folder project ini (semua file dan folder: `src/`, `public/`, `supabase/`, `index.html`, `package.json`, dst) ke halaman upload tersebut.
   - Folder `node_modules` dan `dist` **tidak perlu** diupload (biasanya sudah tidak ada / sudah diabaikan lewat `.gitignore`).
4. Klik **Commit changes**.

---

## 3. Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → login (bisa pakai akun GitHub).
2. Klik **Add New → Project** → pilih repository `studio-d13-website` yang baru diupload.
3. Vercel otomatis mendeteksi ini project **Vite** — biarkan default build settings.
4. Sebelum klik Deploy, buka bagian **Environment Variables**, tambahkan dua baris:
   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | Project URL dari langkah 1 |
   | `VITE_SUPABASE_ANON_KEY` | anon public key dari langkah 1 |
5. Klik **Deploy**. Setelah selesai, Anda dapat URL live seperti `studio-d13-website.vercel.app`.
6. (Opsional) Hubungkan domain sendiri lewat **Project → Settings → Domains**.

Setiap kali Anda mengubah file di GitHub (lewat browser, edit langsung di github.com), Vercel otomatis deploy ulang.

---

## 3b. Alternatif lain selain Vercel

Vercel sebenarnya mendukung banyak project terpisah dalam satu akun — project ini tidak akan bentrok dengan webapp personal Anda yang sudah ada di sana. Tapi kalau tetap mau pisah platform, ini pilihannya (semua gratis, semua lewat browser):

- **Netlify** — lihat langkah di bawah.
- **Cloudflare Pages** ([pages.cloudflare.com](https://pages.cloudflare.com)) — alur mirip Vercel: hubungkan repo GitHub, set build command `npm run build`, publish directory `dist`, tambahkan env variables di **Settings → Environment variables**.
- **Firebase Hosting** — perlu Firebase CLI, jadi kurang cocok kalau mau tanpa install lokal.
- **Render (Static Site)** ([render.com](https://render.com)) — hubungkan repo GitHub, build command `npm run build`, publish directory `dist`.

### Deploy ke Netlify — Cara 1: lewat GitHub (disarankan, auto-update)

1. Upload project ini ke repository GitHub baru (ikuti Langkah 2 di atas — repo ini independen, tidak menyentuh project Vercel Anda yang lain).
2. Buka [app.netlify.com](https://app.netlify.com) → login → **Add new site → Import an existing project**.
3. Pilih GitHub → pilih repository `studio-d13-website`.
4. Build settings biasanya otomatis terdeteksi dari `netlify.toml` di project ini:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Sebelum deploy, buka **Site configuration → Environment variables**, tambahkan:
   | Key | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | Project URL dari Supabase |
   | `VITE_SUPABASE_ANON_KEY` | anon public key dari Supabase |
6. Klik **Deploy site**. Setiap kali file di GitHub diubah, Netlify auto build ulang — sama seperti Vercel.

### Deploy ke Netlify — Cara 2: Drag & Drop (tanpa GitHub sama sekali)

Cara ini paling cepat kalau tidak mau pakai GitHub, tapi env variable Supabase harus sudah "dibakar" ke dalam file build terlebih dahulu (karena tidak ada proses build di sisi Netlify untuk metode ini).

1. Beri tahu saya `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` project Supabase Anda — saya build folder `dist` yang sudah jadi dan siap pakai.
2. Buka [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag & drop folder `dist` tersebut ke halaman itu.
4. Netlify langsung memberi URL live dalam beberapa detik.
5. Catatan: kalau nanti ganti Supabase project (URL/key berubah), folder `dist` perlu di-build ulang dan di-drop ulang — beda dengan Cara 1 yang otomatis.

---

## 4. Pakai Developer Mode

1. Buka `https://domain-anda.com/developer`.
2. Login dengan email + password yang dibuat di langkah 1.4 (Supabase Authentication).
3. Di sidebar dashboard ada 6 kontrol:
   - **Portfolio** — tambah/edit/hapus karya. Setiap kolom (judul, kategori, peran, tahun, deskripsi, URL gambar, link project, urutan) punya contoh pengisian di bawahnya.
   - **Pencapaian** — bagian "bukti" portfolio: milestone, sertifikasi, penghargaan. Tampil tepat setelah Hero.
   - **Testimoni** — tambah/edit/hapus testimoni klien.
   - **Konten Website** — pilih section (hero, layanan, harga, proses, about, kontak, faq, footer) dan edit isinya sebagai JSON, lalu simpan.
   - **Tampilan** — ubah warna background/aksen (color picker), pilih pasangan font dari 3 opsi, dan ubah posisi menu (kanan/kiri) — berlaku langsung tanpa deploy ulang.
   - **Halaman & Section** — dua kontrol:
     - *Tambah Section*: menambah blok konten baru di homepage (judul, isi, gambar, tombol opsional), muncul setelah FAQ.
     - *Tambah Halaman*: membuat halaman baru dengan URL sendiri (`domain-anda.com/slug-anda`), bisa dimunculkan di menu navigasi.
4. Perubahan langsung tampil di website publik setelah disimpan (tidak perlu deploy ulang).

Untuk gambar (foto project, avatar testimoni, gambar section), upload dulu ke layanan hosting gambar mana pun (Supabase Storage, Imgur, dll), lalu tempel URL-nya ke field "URL Gambar".

---

## Struktur project

```
src/
  sections/        → satu file per section (Hero, Services, Pricing, dst)
  pages/            → Home.jsx, DeveloperLogin.jsx, DeveloperDashboard.jsx
  components/       → Navbar (drawer menu), Footer, Reveal (efek scroll), ProtectedRoute
  context/          → AuthContext (session Supabase)
  lib/              → supabaseClient, defaultContent (fallback), useSiteContent (fetch hook)
supabase/schema.sql → jalankan sekali di Supabase SQL Editor
```

## Catatan teknis

- **Posisi menu**: drawer menu default slide dari **kanan**. Untuk ganti ke kiri, buka `src/components/Navbar.jsx`, ubah baris `const DRAWER_SIDE = 'right'` menjadi `'left'`.
- **Fallback tanpa Supabase**: kalau env variable belum diisi, website tetap tampil normal pakai konten default di `src/lib/defaultContent.js` — hanya form kontak dan Developer Mode yang butuh Supabase aktif.
- **Font**: Fraunces (display/heading) + DM Sans (body), dimuat dari Google Fonts di `index.html`.
- **Update fitur berikutnya**: struktur ini sengaja dibuat modular (satu file per section, satu hook untuk data) supaya gampang ditambah fitur baru nanti — tinggal bilang fitur apa yang mau ditambahkan.
