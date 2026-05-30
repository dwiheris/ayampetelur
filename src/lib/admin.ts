import { requireSupabase } from "./farms";
import type { Role } from "./mock-data";

export interface MasterControlMetrics {
  total_users: number;
  active_users: number;
  total_farms: number;
  total_kandang: number;
  total_populasi_aktif: number;
  total_telur_hari_ini: number;
  total_stok_telur: number;
  total_penjualan: number;
  total_pemasukan: number;
  total_pengeluaran: number;
  laba_bersih: number;
}

export interface MasterControlUser {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: Role | null;
  status: string | null;
  created_at: string | null;
  last_login_at: string | null;
}

export interface MasterControlActivity {
  id: string;
  user_id: string | null;
  user_name: string | null;
  user_email: string | null;
  module: string | null;
  action: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface MasterControlOverview {
  metrics: MasterControlMetrics;
  users: MasterControlUser[];
  activities: MasterControlActivity[];
}

export interface MasterControlFilters {
  from?: string;
  to?: string;
  userId?: string;
}

const emptyMetrics: MasterControlMetrics = {
  total_users: 0,
  active_users: 0,
  total_farms: 0,
  total_kandang: 0,
  total_populasi_aktif: 0,
  total_telur_hari_ini: 0,
  total_stok_telur: 0,
  total_penjualan: 0,
  total_pemasukan: 0,
  total_pengeluaran: 0,
  laba_bersih: 0,
};

export async function getMasterControlOverview(filters: MasterControlFilters = {}) {
  const client = requireSupabase();
  const { data, error } = await client.rpc("get_master_control_overview", {
    p_from: filters.from || null,
    p_to: filters.to || null,
    p_user_id: filters.userId || null,
  });

  if (error) throw error;

  const value = data as Partial<MasterControlOverview> | null;
  return {
    metrics: { ...emptyMetrics, ...(value?.metrics ?? {}) },
    users: value?.users ?? [],
    activities: value?.activities ?? [],
  };
}
