// Shared domain types, empty initial state, and formatting helpers for Telurku.
export type Role =
  | "master_admin"
  | "owner"
  | "admin_kandang"
  | "petugas_gudang"
  | "keuangan"
  | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
}

export const ROLE_LABELS: Record<Role, string> = {
  master_admin: "Admin Utama",
  owner: "Owner",
  admin_kandang: "Admin Kandang",
  petugas_gudang: "Petugas Gudang",
  keuangan: "Keuangan",
  viewer: "Viewer",
};

export const initialUsers: User[] = [];

export interface Kandang {
  id: string;
  nama: string;
  kapasitas: number;
  lokasi: string;
  jenis: "Battery" | "Postal" | "Free Range";
  status: "Aktif" | "Kosong" | "Maintenance";
  pj: string;
}

export const initialKandang: Kandang[] = [];

export interface Batch {
  id: string;
  nama: string;
  strain: string;
  kandangId: string;
  tglMasuk: string;
  umurAwal: number;
  jumlahAwal: number;
  jumlahAktif: number;
  status: "Aktif" | "Afkir";
}

export const initialBatch: Batch[] = [];

export interface Produksi {
  id: string;
  tanggal: string;
  kandangId: string;
  normal: number;
  retak: number;
  kecil: number;
  jumbo: number;
  berat: number; // kg
  catatan?: string;
}

export const initialProduksi: Produksi[] = [];

export interface Pakan {
  id: string;
  nama: string;
  jenis: string;
  stok: number; // kg
  minStok: number;
  harga: number; // per kg
}

export const initialPakan: Pakan[] = [];

export interface PemakaianPakan {
  id: string;
  tanggal: string;
  kandangId: string;
  pakanId: string;
  jumlah: number; // kg
}

export const initialPemakaian: PemakaianPakan[] = [];

export interface Kesehatan {
  id: string;
  tanggal: string;
  kandangId: string;
  jenis: "Mati" | "Sakit" | "Afkir";
  jumlah: number;
  penyebab: string;
  tindakan: string;
}

export const initialKesehatan: Kesehatan[] = [];

export interface JadwalVaksin {
  id: string;
  tanggal: string;
  kandangId: string;
  vaksin: string;
  status: "Terjadwal" | "Selesai" | "Lewat";
}
export const initialJadwal: JadwalVaksin[] = [];

export interface StokTelur {
  normal: number;
  kecil: number;
  jumbo: number;
  retak: number;
  reject: number;
}
export const initialStokTelur: StokTelur = { normal: 0, kecil: 0, jumbo: 0, retak: 0, reject: 0 };

export interface Pelanggan {
  id: string;
  nama: string;
  telp: string;
  alamat: string;
  jenis: "Reseller" | "Pasar" | "Retail";
}
export const initialPelanggan: Pelanggan[] = [];

export interface Penjualan {
  id: string;
  tanggal: string;
  pelangganId: string;
  jenisTelur: "Normal" | "Kecil" | "Jumbo" | "Retak";
  jumlahKg: number;
  hargaSatuan: number;
  status: "Lunas" | "Piutang";
}
export const initialPenjualan: Penjualan[] = [];

export interface Transaksi {
  id: string;
  tanggal: string;
  jenis: "Pemasukan" | "Pengeluaran";
  kategori: string;
  jumlah: number;
  catatan?: string;
}
export const initialTransaksi: Transaksi[] = [];

export interface BarangGudang {
  id: string;
  nama: string;
  kategori: "Pakan" | "Obat" | "Vitamin" | "Vaksin" | "Egg Tray" | "Peralatan";
  stok: number;
  satuan: string;
  minStok: number;
}
export const initialGudang: BarangGudang[] = [];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export const formatNumber = (n: number) => new Intl.NumberFormat("id-ID").format(Math.round(n));
