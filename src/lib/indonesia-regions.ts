export interface RegionOption {
  code: string;
  name: string;
}

const REGION_API_BASE_URL = "https://api.datawilayah.com/api";

function formatRegionName(name: string) {
  return name
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bDki\b/g, "DKI")
    .replace(/\bDi\b/g, "DI")
    .replace(/\bKab\./g, "Kab.")
    .replace(/\bKep\./g, "Kep.");
}

async function fetchRegionOptions(path: string) {
  const response = await fetch(`${REGION_API_BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error("Data wilayah belum bisa dimuat. Silakan coba lagi.");
  }

  const payload = (await response.json()) as
    | Array<{ kode_wilayah?: string; nama_wilayah?: string }>
    | {
        data?: Array<{ kode_wilayah?: string; nama_wilayah?: string }>;
      };
  const data = Array.isArray(payload) ? payload : (payload.data ?? []);

  return data
    .filter((item): item is { kode_wilayah: string; nama_wilayah: string } =>
      Boolean(item.kode_wilayah && item.nama_wilayah),
    )
    .map((item) => ({
      code: item.kode_wilayah,
      name: formatRegionName(item.nama_wilayah),
    }));
}

export const getProvinces = () => fetchRegionOptions("provinsi.json");

export const getRegencies = (provinceCode: string) =>
  fetchRegionOptions(`kabupaten_kota/${provinceCode}.json`);

export const getDistricts = (_provinceCode: string, regencyCode: string) =>
  fetchRegionOptions(`kecamatan/${regencyCode}.json`);

export const getVillages = (_provinceCode: string, _regencyCode: string, districtCode: string) =>
  fetchRegionOptions(`desa_kelurahan/${districtCode}.json`);
