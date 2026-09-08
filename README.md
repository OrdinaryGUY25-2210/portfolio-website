# Studio D13 — Website (React + Supabase)

Website portfolio Studio D13 — dibangun agar bekerja **sebagai portfolio**: memimpin dengan Pencapaian (bukti) dan Portfolio (karya), baru layanan/harga di bawahnya. Fitur:
- Efek reveal saat scroll di setiap section
- Menu navigasi slide-in (posisi kanan/kiri diatur dari Developer Mode)
- Halaman login terpisah di `/developer` untuk masuk ke **Developer Mode**
- Di Developer Mode: sidebar dengan 6 kontrol — **Portfolio**, **Pencapaian**, **Testimoni**, **Konten Website**, **Tampilan** (warna & font, tanpa deploy ulang), dan **Halaman & Section** (tambah section baru di homepage, atau tambah halaman baru dengan URL sendiri)
- Setiap kolom form di Developer Mode punya contoh pengisian di bawahnya, dan panel Live Preview yang update seketika saat diketik
- Field gambar bisa diisi lewat URL manual, **atau** klik "Pilih Gambar" untuk upload dari galeri/penyimpanan perangkat — otomatis dikompres ke WebP dan disimpan di Supabase Storage
- Data disimpan di **Supabase** (database + auth) — bisa diedit tanpa deploy ulang
- Responsif dan accessible di semua device (mobile, tablet, desktop) — kontras warna, fokus keyboard terlihat, dan menghormati pengaturan "reduced motion" di perangkat

Semua langkah di bawah ini dilakukan lewat **browser** — tidak perlu install Node.js, git, atau apapun di komputer Anda.

---

## 1. Setup Supabase (5–10 menit)

1. Buka [supabase.com](https://supabase.com) → masuk ke project Supabase yang sudah Anda punya.
2. Di sidebar kiri, buka **SQL Editor** → **New query**.
3. Buka file `supabase/schema.sql` di project ini, salin semua isinya, tempel ke SQL Editor, lalu klik **Run**.
   Ini akan membuat semua tabel konten (`site_content`, `portfolio_items`, `testimonials`, `achievements`, `custom_sections`, `custom_pages`, `contact_submissions`) beserta aturan keamanan (Row Level Security): siapa saja bisa **membaca** konten, tapi hanya Anda yang **login** yang bisa menambah/edit/hapus.
   Perintah ini juga otomatis membuat **bucket Storage bernama `images`** (public) tempat semua gambar yang diupload lewat tombol "Pilih Gambar" di Developer Mode disimpan — tidak ada langkah tambahan yang perlu dilakukan manual di menu Storage.
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
   - **Portfolio** — tambah/edit/hapus karya. Setiap kolom (judul, kategori, peran, tahun, deskripsi, URL gambar, link project, urutan) punya contoh pengisian di bawahnya, dan panel **Live Preview** di sebelah form yang update seketika saat kamu mengetik.
   - **Pencapaian** — bagian "bukti" portfolio: milestone, sertifikasi, penghargaan. Tampil tepat setelah Hero. Live preview juga aktif di sini.
   - **Testimoni** — tambah/edit/hapus testimoni klien, dengan live preview.
   - **Konten Website** — pilih section (hero, layanan, harga, proses, about, kontak, faq, footer), edit sebagai JSON, dan lihat **Live Preview** di panel sebelah kanan yang otomatis update tiap kali JSON diketik ulang (kalau JSON belum valid, preview menunggu sampai formatnya benar). Khusus section **hero** ada kolom cepat "Gambar Background Hero" — isi URL gambar untuk kasih kedalaman di section hero yang tadinya polos, atau kosongkan untuk kembali flat.
   - **Tampilan** — ubah warna background/aksen (color picker), pilih pasangan font dari 3 opsi, dan ubah posisi menu (kanan/kiri). Perubahan **langsung terlihat live** di halaman dashboard itu sendiri (tombol, teks, dsb ikut berubah warna seketika) karena pakai variabel CSS yang sama dengan website publik — klik Simpan untuk membuat perubahan permanen, atau pindah tab tanpa Simpan untuk otomatis kembali ke versi tersimpan.
   - **Halaman & Section** — dua kontrol, keduanya dengan live preview:
     - *Tambah Section*: menambah blok konten baru di homepage (judul, isi, gambar, tombol opsional), muncul setelah FAQ.
     - *Tambah Halaman*: membuat halaman baru dengan URL sendiri (`domain-anda.com/slug-anda`), bisa dimunculkan di menu navigasi.
4. Perubahan langsung tampil di website publik setelah disimpan (tidak perlu deploy ulang).

Untuk gambar (foto project, avatar testimoni, gambar section), klik **"Pilih Gambar"** di field terkait untuk upload langsung dari galeri/penyimpanan perangkat (otomatis dikompres ke WebP dan disimpan di Supabase Storage — lihat Langkah 5), atau tempel URL gambar dari mana pun secara manual.

---

## 5. Setup Supabase Storage untuk Upload Gambar

**Tidak ada setup manual tambahan** — bucket Storage bernama `images` sudah otomatis dibuat saat Anda menjalankan `supabase/schema.sql` di Langkah 1.3, lengkap dengan aturan aksesnya:
- Siapa saja boleh **melihat** gambar (supaya tampil di website publik).
- Hanya Anda yang **login** di Developer Mode yang boleh **upload/hapus** gambar.

Cara pakainya di Developer Mode:
1. Klik **"Pilih Gambar"** di field gambar mana pun (Portfolio, Testimoni, Pencapaian, Section, Halaman, atau Hero Background).
2. Pilih file dari galeri/penyimpanan perangkat.
3. Otomatis diproses lewat 2 tahap:
   - **Kompres ke WebP** — dilakukan di browser Anda sendiri (Canvas API), gambar diperkecil maksimal lebar 1600px dan dikonversi ke format WebP (ukuran file jauh lebih kecil, kualitas tetap bagus). Tidak butuh server tambahan.
   - **Upload ke Supabase Storage** — file `.webp` hasil kompres diupload ke bucket `images`, lalu URL publiknya otomatis ditempel ke field gambar.
4. Field gambar tetap bisa diisi manual (tempel URL dari mana saja) kalau tidak mau upload lewat tombol ini.

**Kalau muncul error "Bucket images belum dibuat"**: berarti Langkah 1.3 belum dijalankan atau gagal — buka Supabase Dashboard → **SQL Editor**, jalankan ulang isi `supabase/schema.sql`, lalu coba upload lagi. Anda juga bisa cek manual di menu **Storage** di Supabase Dashboard — harus ada bucket bernama `images` dengan status **Public**.

---

## Struktur project

```
src/
  sections/        → satu file per section (Hero, Services, Pricing, dst)
  pages/            → Home.jsx, DeveloperLogin.jsx, DeveloperDashboard.jsx
  components/       → Navbar (drawer menu), Footer, Reveal (efek scroll), ProtectedRoute
  context/          → AuthContext (session Supabase)
  lib/              → supabaseClient, supabaseStorage (upload gambar), imageCompress (kompres ke WebP), defaultContent (fallback), useSiteContent (fetch hook)
supabase/schema.sql → jalankan sekali di Supabase SQL Editor
```

## Catatan teknis

- **Posisi menu**: drawer menu default slide dari **kanan**, sekarang diatur dari Developer Mode → Tampilan (bukan hardcode di kode lagi).
- **Live preview**: bekerja dengan merender ulang komponen ringkas di dalam dashboard begitu draft berubah — bukan mengintip browser publik. Untuk Tampilan (warna/font), yang dipakai adalah CSS variable yang sama dengan website publik, jadi begitu disimpan, hasilnya identik di halaman utama.
- **Ruang kosong / whitespace**: ada penanda kecil "STUDIO D13" di pojok kiri bawah tiap halaman (`CornerMark`) yang memanfaatkan sudut layar yang biasanya kosong, dan badge tahun pengalaman di Hero dipindah ke pojok kanan bawah section (di layar medium ke atas) alih-alih mengambang di tengah. Di layar kecil, elemen-elemen ini otomatis kembali ke alur normal.
- **Fallback tanpa Supabase**: kalau env variable belum diisi, website tetap tampil normal pakai konten default di `src/lib/defaultContent.js` — hanya form kontak dan Developer Mode yang butuh Supabase aktif.
- **Font**: 3 pasangan tersedia — Fraunces + DM Sans (default), Playfair Display + Inter, Cormorant Garamond + Work Sans — semuanya sudah dimuat di `index.html` supaya ganti pasangan langsung terasa tanpa loading tambahan.
- **Update fitur berikutnya**: struktur ini sengaja dibuat modular (satu file per section, satu hook untuk data) supaya gampang ditambah fitur baru nanti — tinggal bilang fitur apa yang mau ditambahkan.
