-- =====================================================================
-- Ankasa: Role Admin / Pelanggan + Akses E-book
-- Jalankan seluruh skrip ini di Supabase Dashboard -> SQL Editor
-- =====================================================================

-- 1) Tabel profil pengguna
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nama_lengkap text,
  email text,
  tipe_akun text not null default 'user',
  created_at timestamptz not null default now()
);

alter table public.users
  add column if not exists nama_lengkap text,
  add column if not exists email text,
  add column if not exists tipe_akun text not null default 'user',
  add column if not exists created_at timestamptz not null default now();

-- Catatan: nilai tipe_akun tidak dibatasi check constraint agar role lain
-- (mis. 'freemium') yang sudah ada tidak ikut rusak. Aplikasi hanya
-- menganggap 'admin' sebagai admin; nilai lain dianggap pelanggan.

-- 2) Function cek admin (security definer agar aman dipakai di RLS)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and tipe_akun = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- 3) Otomatis buat baris profil saat user baru mendaftar
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, nama_lengkap, email, tipe_akun)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'nama_lengkap',
      new.raw_user_meta_data->>'full_name'
    ),
    new.email,
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profil untuk akun yang sudah terlanjur mendaftar
insert into public.users (id, nama_lengkap, email, tipe_akun)
select
  id,
  coalesce(
    raw_user_meta_data->>'nama_lengkap',
    raw_user_meta_data->>'full_name'
  ),
  email,
  'user'
from auth.users
on conflict (id) do nothing;

-- 4) RLS tabel users
alter table public.users enable row level security;

drop policy if exists "users_select_self" on public.users;
create policy "users_select_self"
  on public.users for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "users_select_admin" on public.users;
create policy "users_select_admin"
  on public.users for select
  to authenticated
  using (public.is_admin());

drop policy if exists "users_insert_self" on public.users;
create policy "users_insert_self"
  on public.users for insert
  to authenticated
  with check (id = auth.uid() and tipe_akun = 'user');

-- 5) Bucket e-book: cover publik, file full privat
insert into storage.buckets (id, name, public)
values ('ebook-cover', 'ebook-cover', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('ebook-file', 'ebook-file', true)
on conflict (id) do nothing;

update storage.buckets set public = true where id = 'ebook-cover';
update storage.buckets set public = false where id = 'ebook-file';

-- 6) Storage policies untuk admin
drop policy if exists "ebook_cover_public_read" on storage.objects;
create policy "ebook_cover_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'ebook-cover');

drop policy if exists "ebook_admin_insert" on storage.objects;
create policy "ebook_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('ebook-cover', 'ebook-file')
    and public.is_admin()
  );

drop policy if exists "ebook_admin_update" on storage.objects;
create policy "ebook_admin_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id in ('ebook-cover', 'ebook-file')
    and public.is_admin()
  )
  with check (
    bucket_id in ('ebook-cover', 'ebook-file')
    and public.is_admin()
  );

drop policy if exists "ebook_admin_delete" on storage.objects;
create policy "ebook_admin_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id in ('ebook-cover', 'ebook-file')
    and public.is_admin()
  );

-- =====================================================================
-- 7) Cara menjadikan sebuah akun sebagai admin
--    Daftar akun dulu lewat halaman /register, lalu jalankan:
--
--    update public.users
--    set tipe_akun = 'admin'
--    where email = 'email-admin@contoh.com';
-- =====================================================================
