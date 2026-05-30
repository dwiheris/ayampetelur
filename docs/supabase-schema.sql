-- Telurku Supabase schema awal
-- Jalankan file ini di Supabase SQL Editor.

create extension if not exists "pgcrypto";

create or replace function public.set_current_owner_id()
returns trigger
language plpgsql
as $$
begin
  if new.owner_id is null then
    new.owner_id := auth.uid();
  end if;
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  whatsapp_number text,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.farms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null,
  location text,
  owner_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kandang (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  nama text not null,
  kapasitas integer not null default 0 check (kapasitas >= 0),
  lokasi text,
  jenis text not null default 'Battery' check (jenis in ('Battery', 'Postal', 'Free Range')),
  status text not null default 'Aktif' check (status in ('Aktif', 'Kosong', 'Maintenance')),
  pj text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.populasi (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  kandang_id uuid references public.kandang(id) on delete set null,
  nama text not null,
  strain text,
  tgl_masuk date,
  umur_awal integer default 0,
  jumlah_awal integer not null default 0,
  jumlah_aktif integer not null default 0,
  status text not null default 'Aktif' check (status in ('Aktif', 'Afkir')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.produksi_telur (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  kandang_id uuid references public.kandang(id) on delete set null,
  tanggal date not null default current_date,
  normal integer not null default 0,
  retak integer not null default 0,
  kecil integer not null default 0,
  jumbo integer not null default 0,
  berat numeric(12,2) not null default 0,
  catatan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pakan (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  kandang_id uuid references public.kandang(id) on delete set null,
  tanggal date,
  nama text not null,
  jenis text,
  stok numeric(12,2) not null default 0,
  min_stok numeric(12,2) not null default 0,
  harga numeric(14,2) not null default 0,
  jumlah_pemakaian numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kesehatan (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  kandang_id uuid references public.kandang(id) on delete set null,
  tanggal date not null default current_date,
  jenis text not null check (jenis in ('Mati', 'Sakit', 'Afkir')),
  jumlah integer not null default 0,
  penyebab text,
  tindakan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stok_telur (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  tanggal date not null default current_date,
  normal numeric(12,2) not null default 0,
  kecil numeric(12,2) not null default 0,
  jumbo numeric(12,2) not null default 0,
  retak numeric(12,2) not null default 0,
  reject_qty numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.penjualan (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  tanggal date not null default current_date,
  pelanggan_nama text,
  jenis_telur text not null check (jenis_telur in ('Normal', 'Kecil', 'Jumbo', 'Retak')),
  jumlah_kg numeric(12,2) not null default 0,
  harga_satuan numeric(14,2) not null default 0,
  status text not null default 'Lunas' check (status in ('Lunas', 'Piutang')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.keuangan (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  farm_id uuid references public.farms(id) on delete cascade,
  tanggal date not null default current_date,
  jenis text not null check (jenis in ('Pemasukan', 'Pengeluaran')),
  kategori text not null,
  jumlah numeric(14,2) not null default 0,
  catatan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists farms_owner_id_idx on public.farms(owner_id);
create index if not exists kandang_owner_id_idx on public.kandang(owner_id);
create index if not exists kandang_farm_id_idx on public.kandang(farm_id);
create index if not exists populasi_owner_id_idx on public.populasi(owner_id);
create index if not exists produksi_telur_owner_id_idx on public.produksi_telur(owner_id);
create index if not exists pakan_owner_id_idx on public.pakan(owner_id);
create index if not exists kesehatan_owner_id_idx on public.kesehatan(owner_id);
create index if not exists stok_telur_owner_id_idx on public.stok_telur(owner_id);
create index if not exists penjualan_owner_id_idx on public.penjualan(owner_id);
create index if not exists keuangan_owner_id_idx on public.keuangan(owner_id);

drop trigger if exists set_farms_owner_id on public.farms;
create trigger set_farms_owner_id before insert on public.farms
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_kandang_owner_id on public.kandang;
create trigger set_kandang_owner_id before insert on public.kandang
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_populasi_owner_id on public.populasi;
create trigger set_populasi_owner_id before insert on public.populasi
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_produksi_telur_owner_id on public.produksi_telur;
create trigger set_produksi_telur_owner_id before insert on public.produksi_telur
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_pakan_owner_id on public.pakan;
create trigger set_pakan_owner_id before insert on public.pakan
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_kesehatan_owner_id on public.kesehatan;
create trigger set_kesehatan_owner_id before insert on public.kesehatan
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_stok_telur_owner_id on public.stok_telur;
create trigger set_stok_telur_owner_id before insert on public.stok_telur
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_penjualan_owner_id on public.penjualan;
create trigger set_penjualan_owner_id before insert on public.penjualan
  for each row execute function public.set_current_owner_id();
drop trigger if exists set_keuangan_owner_id on public.keuangan;
create trigger set_keuangan_owner_id before insert on public.keuangan
  for each row execute function public.set_current_owner_id();

alter table public.profiles enable row level security;
alter table public.farms enable row level security;
alter table public.kandang enable row level security;
alter table public.populasi enable row level security;
alter table public.produksi_telur enable row level security;
alter table public.pakan enable row level security;
alter table public.kesehatan enable row level security;
alter table public.stok_telur enable row level security;
alter table public.penjualan enable row level security;
alter table public.keuangan enable row level security;

drop policy if exists "profiles own rows select" on public.profiles;
drop policy if exists "profiles own rows insert" on public.profiles;
drop policy if exists "profiles own rows update" on public.profiles;
drop policy if exists "farms own rows all" on public.farms;
drop policy if exists "kandang own rows all" on public.kandang;
drop policy if exists "populasi own rows all" on public.populasi;
drop policy if exists "produksi_telur own rows all" on public.produksi_telur;
drop policy if exists "pakan own rows all" on public.pakan;
drop policy if exists "kesehatan own rows all" on public.kesehatan;
drop policy if exists "stok_telur own rows all" on public.stok_telur;
drop policy if exists "penjualan own rows all" on public.penjualan;
drop policy if exists "keuangan own rows all" on public.keuangan;

create policy "profiles own rows select" on public.profiles for select using (id = auth.uid());
create policy "profiles own rows insert" on public.profiles for insert with check (id = auth.uid());
create policy "profiles own rows update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "farms own rows all" on public.farms
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "kandang own rows all" on public.kandang
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid() and exists (
    select 1 from public.farms f where f.id = kandang.farm_id and f.owner_id = auth.uid()
  ));

create policy "populasi own rows all" on public.populasi
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "produksi_telur own rows all" on public.produksi_telur
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "pakan own rows all" on public.pakan
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "kesehatan own rows all" on public.kesehatan
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "stok_telur own rows all" on public.stok_telur
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "penjualan own rows all" on public.penjualan
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "keuangan own rows all" on public.keuangan
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, whatsapp_number, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'User Telurku'),
    new.email,
    new.raw_user_meta_data->>'whatsapp_number',
    coalesce(new.raw_user_meta_data->>'role', 'owner')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    whatsapp_number = excluded.whatsapp_number,
    role = excluded.role,
    updated_at = now();

  if nullif(new.raw_user_meta_data->>'farm_name', '') is not null then
    insert into public.farms (owner_id, name, location, owner_name)
    values (
      new.id,
      new.raw_user_meta_data->>'farm_name',
      new.raw_user_meta_data->>'farm_location',
      coalesce(new.raw_user_meta_data->>'full_name', new.email)
    );
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
