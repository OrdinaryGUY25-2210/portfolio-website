-- Studio D13 website — Supabase schema
-- Jalankan seluruh file ini di Supabase Dashboard → SQL Editor → New query → Run

-- 1) Konten yang bisa diedit per section (hero, about, pricing, dst)
create table if not exists site_content (
  section text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Karya / project portfolio
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  role text,
  year text,
  goal text, -- tujuan/masalah yang coba dipecahkan lewat karya ini
  description text,
  image_url text,
  link_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Kalau tabel ini sudah pernah dibuat sebelumnya (versi lama tanpa role/year/goal),
-- baris ini menambahkan kolom yang belum ada tanpa menghapus data yang sudah ada.
alter table portfolio_items add column if not exists role text;
alter table portfolio_items add column if not exists year text;
alter table portfolio_items add column if not exists goal text;

-- 3) Testimoni klien
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  avatar_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3b) Pencapaian — bagian "bukti" dari portfolio (award, milestone, sertifikasi)
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  year text,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3c) Section tambahan di halaman utama, dibuat dari Developer Mode
create table if not exists custom_sections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  body text,
  image_url text,
  cta_label text,
  cta_href text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3d) Halaman tambahan (route baru), dibuat dari Developer Mode
create table if not exists custom_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  nav_label text,
  subtitle text,
  body text,
  image_url text,
  show_in_nav boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 4) Pesan dari form kontak
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  description text,
  created_at timestamptz not null default now()
);

-- Aktifkan Row Level Security di semua tabel
alter table site_content enable row level security;
alter table portfolio_items enable row level security;
alter table testimonials enable row level security;
alter table achievements enable row level security;
alter table custom_sections enable row level security;
alter table custom_pages enable row level security;
alter table contact_submissions enable row level security;

-- Semua orang boleh membaca konten publik (website utama)
create policy "public can read site_content" on site_content for select using (true);
create policy "public can read portfolio_items" on portfolio_items for select using (true);
create policy "public can read testimonials" on testimonials for select using (true);
create policy "public can read achievements" on achievements for select using (true);
create policy "public can read custom_sections" on custom_sections for select using (true);
create policy "public can read custom_pages" on custom_pages for select using (true);

-- Hanya user yang login (Developer Mode) yang boleh menambah / edit / hapus
create policy "authenticated can write site_content" on site_content
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can write portfolio_items" on portfolio_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can write testimonials" on testimonials
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can write achievements" on achievements
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can write custom_sections" on custom_sections
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can write custom_pages" on custom_pages
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Siapa saja boleh mengirim form kontak, tapi hanya developer yang login boleh membacanya
create policy "public can submit contact form" on contact_submissions for insert with check (true);
create policy "authenticated can read contact_submissions" on contact_submissions
  for select using (auth.role() = 'authenticated');
create policy "authenticated can delete contact_submissions" on contact_submissions
  for delete using (auth.role() = 'authenticated');

-- 5) Storage bucket untuk gambar yang diupload lewat tombol "Pilih Gambar"
-- di Developer Mode (otomatis dikompres ke WebP oleh browser sebelum diupload).
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Siapa saja boleh melihat/mengunduh gambar (supaya tampil di website publik)
create policy "public can read images" on storage.objects
  for select using (bucket_id = 'images');

-- Hanya user yang login (Developer Mode) yang boleh upload / timpa / hapus gambar
create policy "authenticated can upload images" on storage.objects
  for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "authenticated can update images" on storage.objects
  for update using (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "authenticated can delete images" on storage.objects
  for delete using (bucket_id = 'images' and auth.role() = 'authenticated');
