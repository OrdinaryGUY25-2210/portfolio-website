# Studio D13 — Website (React + Supabase)

Website portfolio Studio D13, hasil convert dari HTML/Framer ke React, dengan:
- Efek reveal saat scroll di setiap section
- Menu navigasi slide-in dari kanan (bisa diubah ke kiri, lihat catatan di bawah)
- Halaman login terpisah di `/developer` untuk masuk ke **Developer Mode**
- Di Developer Mode: tambah/edit/hapus **portfolio item**, **testimoni**, dan edit isi **semua section** (hero, layanan, harga, proses, about, kontak, FAQ, footer)
- Data disimpan di **Supabase** (database + auth), bukan disimpan di kode — jadi bisa diedit tanpa deploy ulang
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

## 4. Pakai Developer Mode

1. Buka `https://domain-anda.com/developer`.
2. Login dengan email + password yang dibuat di langkah 1.4 (Supabase Authentication).
3. Di dashboard ada 3 tab:
   - **Portfolio** — tambah/edit/hapus karya (judul, kategori, deskripsi, URL gambar, link project).
   - **Testimoni** — tambah/edit/hapus testimoni klien.
   - **Konten Website** — pilih section (hero, layanan, harga, proses, about, kontak, faq, footer) dan edit isinya sebagai JSON, lalu simpan. Struktur JSON mengikuti bentuk data yang tampil di halaman utama, jadi tinggal ubah teks di dalam tanda kutip.
4. Perubahan langsung tampil di website publik setelah disimpan (tidak perlu deploy ulang).

Untuk gambar (foto project, avatar testimoni), upload dulu ke layanan hosting gambar mana pun (Supabase Storage, Imgur, dll), lalu tempel URL-nya ke field "URL Gambar".

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
