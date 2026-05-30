import { requireSupabase } from "./farms";
import type { Kandang } from "./mock-data";

export interface KandangRow {
  id: string;
  created_at: string;
  owner_id: string;
  farm_id: string;
  nama: string;
  kapasitas: number;
  lokasi: string | null;
  jenis: Kandang["jenis"];
  status: Kandang["status"];
  pj: string | null;
}

export type KandangInput = Omit<KandangRow, "id" | "created_at" | "owner_id">;

export function mapKandangRow(row: KandangRow): Kandang {
  return {
    id: row.id,
    nama: row.nama,
    kapasitas: row.kapasitas,
    lokasi: row.lokasi ?? "",
    jenis: row.jenis,
    status: row.status,
    pj: row.pj ?? "",
  };
}

export async function getKandang() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("kandang")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapKandangRow(row as KandangRow));
}

export async function addKandang(kandang: KandangInput) {
  const client = requireSupabase();
  const { data, error } = await client.from("kandang").insert(kandang).select().single();

  if (error) throw error;
  return mapKandangRow(data as KandangRow);
}

export async function updateKandang(id: string, kandang: Partial<KandangInput>) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("kandang")
    .update(kandang)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapKandangRow(data as KandangRow);
}

export async function deleteKandang(id: string) {
  const client = requireSupabase();
  const { error } = await client.from("kandang").delete().eq("id", id);

  if (error) throw error;
}
