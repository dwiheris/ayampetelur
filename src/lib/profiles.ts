import { requireSupabase } from "./farms";
import type { Role, User } from "./mock-data";

export interface ProfileRow {
  id: string;
  full_name: string | null;
  email: string | null;
  whatsapp_number: string | null;
  role: Role | null;
}

export function mapProfileRow(row: ProfileRow): User {
  const email = row.email ?? row.whatsapp_number ?? "";

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
