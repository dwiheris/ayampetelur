import { requireSupabase } from "./farms";
import { normalizeWhatsappNumber } from "./auth";

export interface RegisterAccountInput {
  fullName: string;
  email: string;
  whatsappNumber: string;
  password: string;
  farmName: string;
  province: string;
  regency: string;
  district: string;
  village: string;
  detailAddress: string;
}

function getReadableAuthError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("already registered") || lower.includes("already been registered")) {
    return "Email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.";
  }

  if (lower.includes("password")) {
    return "Password belum memenuhi syarat. Gunakan minimal 6 karakter.";
  }

  if (lower.includes("invalid email")) {
    return "Format email tidak valid.";
  }

  return message || "Registrasi gagal. Silakan coba lagi.";
}

export async function registerAccount({
  fullName,
  email,
  whatsappNumber,
  password,
  farmName,
  province,
  regency,
  district,
  village,
  detailAddress,
}: RegisterAccountInput) {
  const client = requireSupabase();
  const farmLocation = [
    detailAddress,
    village && `Desa/Kelurahan ${village}`,
    district && `Kecamatan ${district}`,
    regency,
    province,
  ]
    .filter(Boolean)
    .join(", ");

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        farm_name: farmName,
        whatsapp_number: normalizeWhatsappNumber(whatsappNumber),
        farm_location: farmLocation,
        role: "owner",
      },
    },
  });

  if (error) {
    throw new Error(getReadableAuthError(error.message));
  }

  if (data.session?.user) {
    const userId = data.session.user.id;

    const { error: profileError } = await client.from("profiles").upsert({
      id: userId,
      full_name: fullName,
      email,
      whatsapp_number: normalizeWhatsappNumber(whatsappNumber),
      role: "owner",
    });

    if (profileError) throw profileError;
  }

  return data;
}
