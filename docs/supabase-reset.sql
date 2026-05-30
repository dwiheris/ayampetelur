-- Telurku Supabase reset untuk database baru / schema lama yang ingin diulang.
-- Jalankan sebelum docs/supabase-schema.sql jika tabel Telurku pernah dibuat.
-- Tidak menghapus schema public dan tidak menghapus auth.users.

drop table if exists public.activity_logs;
drop table if exists public.jadwal;
drop table if exists public.gudang;
drop table if exists public.keuangan;
drop table if exists public.penjualan;
drop table if exists public.pelanggan;
drop table if exists public.stok_telur;
drop table if exists public.kesehatan;
drop table if exists public.pakan;
drop table if exists public.produksi_telur;
drop table if exists public.populasi;
drop table if exists public.kandang;
drop table if exists public.farms;
drop table if exists public.profiles;
