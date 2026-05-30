import { addFarm } from "./farms";
import { requireSupabase } from "./farms";

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
        whatsapp_number: whatsappNumber,
        farm_location: farmLocation,
      },
    },
  });

  if (error) {
    throw new Error(getReadableAuthError(error.message));
  }

  await addFarm({
    name: farmName,
    location: farmLocation,
    owner_name: fullName,
  });

  return data;
}
