import { requireSupabase } from "./farms";
import type { Role, User } from "./mock-data";

function getReadableAuthError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials")) {
    return "Email atau password salah.";
  }

  if (lower.includes("email not confirmed")) {
    return "Email belum dikonfirmasi. Silakan cek inbox email Anda.";
  }

  if (lower.includes("phone")) {
    return "Nomor WA belum valid atau login WA belum aktif di Supabase.";
  }

  return message || "Gagal masuk. Silakan coba lagi.";
}

export function normalizeWhatsappNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("62")) return `+${digits}`;
  if (digits.startsWith("0")) return `+62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `+62${digits}`;

  return value.startsWith("+") ? value : `+${digits}`;
}

export async function signInWithEmail(email: string, password: string) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) throw new Error(getReadableAuthError(error.message));
  return data;
}

export async function signOut() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();

  if (error) throw new Error(getReadableAuthError(error.message));
}

export function mapSupabaseUserToAppUser(user: {
  id: string;
  email?: string | null;
  phone?: string | null;
  user_metadata?: Record<string, unknown>;
}): User {
  const role = String(user.user_metadata?.role ?? "owner") as Role;
  const email = user.email ?? user.phone ?? "";

  return {
    id: user.id,
    name: String(user.user_metadata?.full_name ?? email),
    email,
    role,
    password: "",
  };
}

export async function requestWhatsappOtp(whatsappNumber: string) {
  const client = requireSupabase();
  const phone = normalizeWhatsappNumber(whatsappNumber);
  const { error } = await client.auth.signInWithOtp({ phone });

  if (error) throw new Error(getReadableAuthError(error.message));
  return phone;
}

export async function verifyWhatsappOtp(whatsappNumber: string, token: string) {
  const client = requireSupabase();
  const phone = normalizeWhatsappNumber(whatsappNumber);
  const { data, error } = await client.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) throw new Error(getReadableAuthError(error.message));
  return data;
}
