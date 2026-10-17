-- =====================================================================
-- Ankasa Study: Etalase Buku + Jasa Buku Custom
-- Jalankan seluruh skrip ini di Supabase Dashboard -> SQL Editor
-- =====================================================================

-- 1) Perluas tabel "ebook" yang sudah ada (tidak menghapus data lama)
alter table public.ebook
  add column if not exists jenis text,
  add column if not exists jenjang text,
  add column if not exists penulis text,
  add column if not exists badge_warna text,
  add column if not exists cover_path text,
  add column if not exists file_path text,
  add column if not exists urutan int default 0,
  add column if not exists is_contoh boolean default true,
  add column if not exists updated_at timestamptz default now();

-- 2) Tabel permintaan buku custom
create table if not exists public.book_requests (
  id bigint generated always as identity primary key,
  kode_order text unique not null,
  nama_pemesan text not null,
  kontak_wa text not null,
  email text,
  jenis_buku text not null,
  jenjang text,
  judul_diinginkan text,
  deskripsi_kebutuhan text not null,
  jumlah_halaman int,
  butuh_ilustrasi boolean default false,
  estimasi_harga numeric,
  status text not null default 'menunggu_bayar',
  catatan_admin text,
  created_at timestamptz default now()
);

create index if not exists book_requests_kode_order_idx
  on public.book_requests (kode_order);

-- 3) Aktifkan Row Level Security
alter table public.ebook enable row level security;
alter table public.book_requests enable row level security;

-- 4) Policy tabel ebook: semua orang boleh membaca (etalase publik)
drop policy if exists "ebook_select_public" on public.ebook;
create policy "ebook_select_public"
  on public.ebook for select
  using (true);

-- 5) Policy tabel book_requests
--    anon hanya boleh INSERT (submit form). SELECT dibatasi:
--    pembaca umum TIDAK boleh select-all, akses lacak lewat server (service role).
drop policy if exists "book_requests_insert_anon" on public.book_requests;
create policy "book_requests_insert_anon"
  on public.book_requests for insert
  with check (true);

-- 6) Storage buckets
--    ebook-cover : publik (cover contoh)
--    ebook-file  : publik (isi PDF untuk viewer/unduh di etalase)
insert into storage.buckets (id, name, public)
values ('ebook-cover', 'ebook-cover', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('ebook-file', 'ebook-file', true)
on conflict (id) do nothing;
