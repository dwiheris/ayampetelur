-- Telurku Owner Control Center
-- Jalankan file ini di Supabase SQL Editor setelah docs/supabase-schema.sql.

create extension if not exists "pgcrypto";

alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists status text not null default 'active';
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists last_login_at timestamptz;

update public.profiles
set phone = coalesce(phone, whatsapp_number)
where phone is null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, whatsapp_number, phone, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'User Telurku'),
    new.email,
    new.raw_user_meta_data->>'whatsapp_number',
    coalesce(new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'whatsapp_number'),
    'owner',
    'active'
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    whatsapp_number = excluded.whatsapp_number,
    phone = excluded.phone,
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

revoke update on table public.profiles from authenticated;
grant update (full_name, email, phone, whatsapp_number, last_login_at, updated_at)
  on public.profiles to authenticated;

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  module text not null,
  action text not null,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists activity_logs_user_id_idx on public.activity_logs(user_id);
create index if not exists activity_logs_created_at_idx on public.activity_logs(created_at desc);
create index if not exists profiles_role_idx on public.profiles(role);

create or replace function public.set_activity_log_user_id()
returns trigger
language plpgsql
as $$
begin
  if new.user_id is null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists set_activity_log_user_id on public.activity_logs;
create trigger set_activity_log_user_id
  before insert on public.activity_logs
  for each row execute function public.set_activity_log_user_id();

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'super_admin'
      and coalesce(status, 'active') = 'active'
  );
$$;

alter table public.activity_logs enable row level security;

drop policy if exists "activity logs own insert" on public.activity_logs;
drop policy if exists "activity logs own select" on public.activity_logs;
drop policy if exists "activity logs super admin select" on public.activity_logs;
drop policy if exists "profiles super admin select" on public.profiles;
drop policy if exists "farms super admin select" on public.farms;
drop policy if exists "kandang super admin select" on public.kandang;
drop policy if exists "populasi super admin select" on public.populasi;
drop policy if exists "produksi_telur super admin select" on public.produksi_telur;
drop policy if exists "pakan super admin select" on public.pakan;
drop policy if exists "kesehatan super admin select" on public.kesehatan;
drop policy if exists "stok_telur super admin select" on public.stok_telur;
drop policy if exists "penjualan super admin select" on public.penjualan;
drop policy if exists "keuangan super admin select" on public.keuangan;

create policy "activity logs own insert" on public.activity_logs
  for insert with check (user_id = auth.uid());

create policy "activity logs own select" on public.activity_logs
  for select using (user_id = auth.uid());

create policy "activity logs super admin select" on public.activity_logs
  for select using (public.is_super_admin());

create policy "profiles super admin select" on public.profiles
  for select using (public.is_super_admin());

create policy "farms super admin select" on public.farms
  for select using (public.is_super_admin());

create policy "kandang super admin select" on public.kandang
  for select using (public.is_super_admin());

create policy "populasi super admin select" on public.populasi
  for select using (public.is_super_admin());

create policy "produksi_telur super admin select" on public.produksi_telur
  for select using (public.is_super_admin());

create policy "pakan super admin select" on public.pakan
  for select using (public.is_super_admin());

create policy "kesehatan super admin select" on public.kesehatan
  for select using (public.is_super_admin());

create policy "stok_telur super admin select" on public.stok_telur
  for select using (public.is_super_admin());

create policy "penjualan super admin select" on public.penjualan
  for select using (public.is_super_admin());

create policy "keuangan super admin select" on public.keuangan
  for select using (public.is_super_admin());

create or replace function public.get_master_control_overview(
  p_from date default null,
  p_to date default null,
  p_user_id uuid default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  if not public.is_super_admin() then
    raise exception 'Akun ini tidak memiliki akses Owner Control.';
  end if;

  select jsonb_build_object(
    'metrics',
    jsonb_build_object(
      'total_users',
        (select count(*) from public.profiles p where p_user_id is null or p.id = p_user_id),
      'active_users',
        (select count(*) from public.profiles p
         where coalesce(p.status, 'active') = 'active'
           and (p_user_id is null or p.id = p_user_id)),
      'total_farms',
        (select count(*) from public.farms f
         where (p_user_id is null or f.owner_id = p_user_id)
           and (p_from is null or f.created_at::date >= p_from)
           and (p_to is null or f.created_at::date <= p_to)),
      'total_kandang',
        (select count(*) from public.kandang k
         where (p_user_id is null or k.owner_id = p_user_id)
           and (p_from is null or k.created_at::date >= p_from)
           and (p_to is null or k.created_at::date <= p_to)),
      'total_populasi_aktif',
        coalesce((select sum(pp.jumlah_aktif) from public.populasi pp
         where pp.status = 'Aktif'
           and (p_user_id is null or pp.owner_id = p_user_id)
           and (p_from is null or pp.tgl_masuk >= p_from)
           and (p_to is null or pp.tgl_masuk <= p_to)), 0),
      'total_telur_hari_ini',
        coalesce((select sum(pt.normal + pt.retak + pt.kecil + pt.jumbo) from public.produksi_telur pt
         where pt.tanggal = current_date
           and (p_user_id is null or pt.owner_id = p_user_id)), 0),
      'total_stok_telur',
        coalesce((select sum(st.normal + st.kecil + st.jumbo + st.retak + st.reject_qty)
         from public.stok_telur st
         where (p_user_id is null or st.owner_id = p_user_id)
           and (p_from is null or st.tanggal >= p_from)
           and (p_to is null or st.tanggal <= p_to)), 0),
      'total_penjualan',
        coalesce((select sum(pj.jumlah_kg * pj.harga_satuan) from public.penjualan pj
         where (p_user_id is null or pj.owner_id = p_user_id)
           and (p_from is null or pj.tanggal >= p_from)
           and (p_to is null or pj.tanggal <= p_to)), 0),
      'total_pemasukan',
        coalesce((select sum(k.jumlah) from public.keuangan k
         where k.jenis = 'Pemasukan'
           and (p_user_id is null or k.owner_id = p_user_id)
           and (p_from is null or k.tanggal >= p_from)
           and (p_to is null or k.tanggal <= p_to)), 0),
      'total_pengeluaran',
        coalesce((select sum(k.jumlah) from public.keuangan k
         where k.jenis = 'Pengeluaran'
           and (p_user_id is null or k.owner_id = p_user_id)
           and (p_from is null or k.tanggal >= p_from)
           and (p_to is null or k.tanggal <= p_to)), 0),
      'laba_bersih',
        coalesce((select sum(case when k.jenis = 'Pemasukan' then k.jumlah else -k.jumlah end)
         from public.keuangan k
         where (p_user_id is null or k.owner_id = p_user_id)
           and (p_from is null or k.tanggal >= p_from)
           and (p_to is null or k.tanggal <= p_to)), 0)
    ),
    'users',
      coalesce((
        select jsonb_agg(
          jsonb_build_object(
            'id', u.id,
            'full_name', u.full_name,
            'email', u.email,
            'phone', u.phone,
            'role', u.role,
            'status', u.status,
            'created_at', u.created_at,
            'last_login_at', u.last_login_at
          )
          order by u.created_at desc
        )
        from public.profiles u
        where p_user_id is null or u.id = p_user_id
      ), '[]'::jsonb),
    'activities',
      coalesce((
        select jsonb_agg(
          jsonb_build_object(
            'id', a.id,
            'user_id', a.user_id,
            'user_name', p.full_name,
            'user_email', p.email,
            'module', a.module,
            'action', a.action,
            'description', a.description,
            'metadata', a.metadata,
            'created_at', a.created_at
          )
          order by a.created_at desc
        )
        from (
          select *
          from public.activity_logs al
          where (p_user_id is null or al.user_id = p_user_id)
            and (p_from is null or al.created_at::date >= p_from)
            and (p_to is null or al.created_at::date <= p_to)
          order by al.created_at desc
          limit 100
        ) a
        left join public.profiles p on p.id = a.user_id
      ), '[]'::jsonb)
  )
  into result;

  return result;
end;
$$;

grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.get_master_control_overview(date, date, uuid) to authenticated;

-- Jadikan akun pemilik aplikasi sebagai owner control dengan mengganti email berikut.
-- update public.profiles set role = 'super_admin', status = 'active' where email = 'email-anda@example.com';
