import { isSupabaseConfigured, supabase } from "./supabase";

export interface Farm {
  id: number;
  created_at: string;
  name: string | null;
  location: string | null;
  owner_name: string | null;
}

export type FarmInput = Pick<Farm, "name" | "location" | "owner_name">;

export function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
}

export async function getFarms() {
  const client = requireSupabase();
  const { data, error } = await client.from("farms").select("*").order("created_at", {
    ascending: false,
  });

  if (error) throw error;
  return data ?? [];
}

export async function addFarm(farm: FarmInput) {
  const client = requireSupabase();
  const { data, error } = await client.from("farms").insert(farm).select().single();

  if (error) throw error;
  return data;
}

export async function updateFarm(id: number, farm: Partial<FarmInput>) {
  const client = requireSupabase();
  const { data, error } = await client.from("farms").update(farm).eq("id", id).select().single();

  if (error) throw error;
  return data;
}

export async function deleteFarm(id: number) {
  const client = requireSupabase();
  const { error } = await client.from("farms").delete().eq("id", id);

  if (error) throw error;
}
