import { requireSupabase } from "./farms";
import type { Role, User } from "./mock-data";

export interface ProfileRow {
  id: string;
  full_name: string | null;
  email: string | null;
  phone?: string | null;
  whatsapp_number: string | null;
  role: Role | null;
}

export function mapProfileRow(row: ProfileRow): User {
  const email = row.email ?? row.phone ?? row.whatsapp_number ?? "";

  return {
    id: row.id,
    name: row.full_name ?? email,
    email,
    role: row.role ?? "owner",
    password: "",
  };
}

export async function getProfiles() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("profiles")
    .select("id, full_name, email, whatsapp_number, role")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapProfileRow(row as ProfileRow));
}

export async function getOwnProfileUser(id: string) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("profiles")
    .select("id, full_name, email, phone, whatsapp_number, role")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProfileRow(data as ProfileRow) : null;
}
