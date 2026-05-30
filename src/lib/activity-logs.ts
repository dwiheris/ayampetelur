import { requireSupabase } from "./farms";

export interface ActivityLogInput {
  module: string;
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export async function logActivity({
  module,
  action,
  description,
  metadata = {},
}: ActivityLogInput) {
  const client = requireSupabase();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) return;

  const { error } = await client.from("activity_logs").insert({
    user_id: user.id,
    module,
    action,
    description,
    metadata,
  });

  if (error) throw error;
}

export function logActivitySoon(input: ActivityLogInput) {
  void logActivity(input).catch((error) => {
    console.warn("Gagal mencatat aktivitas", error);
  });
}

export async function markLastLogin() {
  const client = requireSupabase();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) return;

  const { error } = await client
    .from("profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) throw error;
}
