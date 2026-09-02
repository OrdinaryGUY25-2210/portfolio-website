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
  description text,
  image_url text,
  link_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

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
alter table contact_submissions enable row level security;

-- Semua orang boleh membaca konten publik (website utama)
create policy "public can read site_content" on site_content for select using (true);
create policy "public can read portfolio_items" on portfolio_items for select using (true);
create policy "public can read testimonials" on testimonials for select using (true);

-- Hanya user yang login (Developer Mode) yang boleh menambah / edit / hapus
create policy "authenticated can write site_content" on site_content
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can write portfolio_items" on portfolio_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated can write testimonials" on testimonials
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Siapa saja boleh mengirim form kontak, tapi hanya developer yang login boleh membacanya
create policy "public can submit contact form" on contact_submissions for insert with check (true);
create policy "authenticated can read contact_submissions" on contact_submissions
  for select using (auth.role() = 'authenticated');
create policy "authenticated can delete contact_submissions" on contact_submissions
  for delete using (auth.role() = 'authenticated');
