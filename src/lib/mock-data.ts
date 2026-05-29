// Centralized mock data for Telurku Management System
export type Role = "master_admin" | "owner" | "admin_kandang" | "petugas_gudang" | "keuangan" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
}

export const ROLE_LABELS: Record<Role, string> = {
  master_admin: "Master Admin",
  owner: "Owner",
  admin_kandang: "Admin Kandang",
  petugas_gudang: "Petugas Gudang",
  keuangan: "Keuangan",
  viewer: "Viewer",
};

export const initialUsers: User[] = [
  { id: "u1", name: "Master Admin", email: "admin@telurku.id", role: "master_admin", password: "admin123" },
  { id: "u2", name: "Pak Budi (Owner)", email: "owner@telurku.id", role: "owner", password: "owner123" },
  { id: "u3", name: "Sutrisno", email: "kandang@telurku.id", role: "admin_kandang", password: "kandang123" },
  { id: "u4", name: "Yanto", email: "gudang@telurku.id", role: "petugas_gudang", password: "gudang123" },
  { id: "u5", name: "Sari", email: "keuangan@telurku.id", role: "keuangan", password: "keuangan123" },
  { id: "u6", name: "Tamu", email: "viewer@telurku.id", role: "viewer", password: "viewer123" },
];

export interface Kandang {
  id: string;
  nama: string;
  kapasitas: number;
  lokasi: string;
  jenis: "Battery" | "Postal" | "Free Range";
  status: "Aktif" | "Kosong" | "Maintenance";
  pj: string;
}

export const initialKandang: Kandang[] = [
  { id: "k1", nama: "Kandang A", kapasitas: 5000, lokasi: "Blok Utara", jenis: "Battery", status: "Aktif", pj: "Sutrisno" },
  { id: "k2", nama: "Kandang B", kapasitas: 4000, lokasi: "Blok Selatan", jenis: "Battery", status: "Aktif", pj: "Sutrisno" },
  { id: "k3", nama: "Kandang C", kapasitas: 3000, lokasi: "Blok Timur", jenis: "Postal", status: "Aktif", pj: "Joko" },
  { id: "k4", nama: "Kandang D", kapasitas: 2000, lokasi: "Blok Barat", jenis: "Battery", status: "Maintenance", pj: "Joko" },
];

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

export const initialBatch: Batch[] = [
  { id: "b1", nama: "Batch 2024-A", strain: "ISA Brown", kandangId: "k1", tglMasuk: "2024-08-01", umurAwal: 17, jumlahAwal: 5000, jumlahAktif: 4860, status: "Aktif" },
  { id: "b2", nama: "Batch 2024-B", strain: "Lohmann Brown", kandangId: "k2", tglMasuk: "2024-09-15", umurAwal: 16, jumlahAwal: 4000, jumlahAktif: 3920, status: "Aktif" },
  { id: "b3", nama: "Batch 2025-A", strain: "Hy-Line Brown", kandangId: "k3", tglMasuk: "2025-02-10", umurAwal: 18, jumlahAwal: 3000, jumlahAktif: 2975, status: "Aktif" },
];

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

const today = new Date();
const dateStr = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
};

export const initialProduksi: Produksi[] = Array.from({ length: 14 }).flatMap((_, i) => [
  { id: `p-${i}-1`, tanggal: dateStr(i), kandangId: "k1", normal: 4200 + Math.floor(Math.random() * 200), retak: 40, kecil: 60, jumbo: 80, berat: 280 + Math.random() * 10 },
  { id: `p-${i}-2`, tanggal: dateStr(i), kandangId: "k2", normal: 3400 + Math.floor(Math.random() * 200), retak: 30, kecil: 50, jumbo: 60, berat: 230 + Math.random() * 10 },
  { id: `p-${i}-3`, tanggal: dateStr(i), kandangId: "k3", normal: 2500 + Math.floor(Math.random() * 150), retak: 20, kecil: 40, jumbo: 50, berat: 175 + Math.random() * 8 },
]);

export interface Pakan {
  id: string;
  nama: string;
  jenis: string;
  stok: number; // kg
  minStok: number;
  harga: number; // per kg
}

export const initialPakan: Pakan[] = [
  { id: "pk1", nama: "Layer Premium 124", jenis: "Layer", stok: 2400, minStok: 1000, harga: 8500 },
  { id: "pk2", nama: "Konsentrat KLK-36", jenis: "Konsentrat", stok: 800, minStok: 500, harga: 9200 },
  { id: "pk3", nama: "Jagung Giling", jenis: "Sumber Energi", stok: 1200, minStok: 800, harga: 6500 },
  { id: "pk4", nama: "Dedak Padi", jenis: "Serat", stok: 600, minStok: 400, harga: 4500 },
];

export interface PemakaianPakan {
  id: string;
  tanggal: string;
  kandangId: string;
  pakanId: string;
  jumlah: number; // kg
}

export const initialPemakaian: PemakaianPakan[] = Array.from({ length: 7 }).flatMap((_, i) => [
  { id: `pp-${i}-1`, tanggal: dateStr(i), kandangId: "k1", pakanId: "pk1", jumlah: 540 },
  { id: `pp-${i}-2`, tanggal: dateStr(i), kandangId: "k2", pakanId: "pk1", jumlah: 430 },
  { id: `pp-${i}-3`, tanggal: dateStr(i), kandangId: "k3", pakanId: "pk1", jumlah: 320 },
]);

export interface Kesehatan {
  id: string;
  tanggal: string;
  kandangId: string;
  jenis: "Mati" | "Sakit" | "Afkir";
  jumlah: number;
  penyebab: string;
  tindakan: string;
}

export const initialKesehatan: Kesehatan[] = [
  { id: "h1", tanggal: dateStr(0), kandangId: "k1", jenis: "Mati", jumlah: 3, penyebab: "Stres panas", tindakan: "Tambah ventilasi" },
  { id: "h2", tanggal: dateStr(1), kandangId: "k2", jenis: "Sakit", jumlah: 12, penyebab: "Snot", tindakan: "Pemberian antibiotik" },
  { id: "h3", tanggal: dateStr(2), kandangId: "k1", jenis: "Mati", jumlah: 2, penyebab: "Tua", tindakan: "Catat afkir" },
];

export interface JadwalVaksin {
  id: string;
  tanggal: string;
  kandangId: string;
  vaksin: string;
  status: "Terjadwal" | "Selesai" | "Lewat";
}
export const initialJadwal: JadwalVaksin[] = [
  { id: "j1", tanggal: dateStr(-3), kandangId: "k1", vaksin: "ND Lasota", status: "Terjadwal" },
  { id: "j2", tanggal: dateStr(-7), kandangId: "k2", vaksin: "AI Inaktif", status: "Terjadwal" },
  { id: "j3", tanggal: dateStr(2), kandangId: "k3", vaksin: "IB H120", status: "Selesai" },
];

export interface StokTelur {
  normal: number;
  kecil: number;
  jumbo: number;
  retak: number;
  reject: number;
}
export const initialStokTelur: StokTelur = { normal: 18500, kecil: 1200, jumbo: 800, retak: 450, reject: 120 };

export interface Pelanggan {
  id: string;
  nama: string;
  telp: string;
  alamat: string;
  jenis: "Reseller" | "Pasar" | "Retail";
}
export const initialPelanggan: Pelanggan[] = [
  { id: "c1", nama: "Toko Berkah Jaya", telp: "0812-3456-7890", alamat: "Pasar Kliwon, Solo", jenis: "Reseller" },
  { id: "c2", nama: "Warung Bu Tini", telp: "0813-1111-2222", alamat: "Jl. Mawar 12", jenis: "Retail" },
  { id: "c3", nama: "Pasar Legi", telp: "0856-9999-0000", alamat: "Pasar Legi", jenis: "Pasar" },
];

export interface Penjualan {
  id: string;
  tanggal: string;
  pelangganId: string;
  jenisTelur: "Normal" | "Kecil" | "Jumbo" | "Retak";
  jumlahKg: number;
  hargaSatuan: number;
  status: "Lunas" | "Piutang";
}
export const initialPenjualan: Penjualan[] = [
  { id: "s1", tanggal: dateStr(0), pelangganId: "c1", jenisTelur: "Normal", jumlahKg: 250, hargaSatuan: 28000, status: "Lunas" },
  { id: "s2", tanggal: dateStr(0), pelangganId: "c2", jenisTelur: "Normal", jumlahKg: 30, hargaSatuan: 29000, status: "Lunas" },
  { id: "s3", tanggal: dateStr(1), pelangganId: "c3", jenisTelur: "Jumbo", jumlahKg: 80, hargaSatuan: 31000, status: "Piutang" },
  { id: "s4", tanggal: dateStr(2), pelangganId: "c1", jenisTelur: "Normal", jumlahKg: 300, hargaSatuan: 28000, status: "Lunas" },
];

export interface Transaksi {
  id: string;
  tanggal: string;
  jenis: "Pemasukan" | "Pengeluaran";
  kategori: string;
  jumlah: number;
  catatan?: string;
}
export const initialTransaksi: Transaksi[] = [
  { id: "t1", tanggal: dateStr(0), jenis: "Pengeluaran", kategori: "Pakan", jumlah: 4500000, catatan: "Beli pakan layer" },
  { id: "t2", tanggal: dateStr(0), jenis: "Pemasukan", kategori: "Penjualan Telur", jumlah: 7800000 },
  { id: "t3", tanggal: dateStr(1), jenis: "Pengeluaran", kategori: "Gaji Karyawan", jumlah: 3000000 },
  { id: "t4", tanggal: dateStr(2), jenis: "Pengeluaran", kategori: "Listrik", jumlah: 850000 },
  { id: "t5", tanggal: dateStr(2), jenis: "Pemasukan", kategori: "Penjualan Telur", jumlah: 8400000 },
];

export interface BarangGudang {
  id: string;
  nama: string;
  kategori: "Pakan" | "Obat" | "Vitamin" | "Vaksin" | "Egg Tray" | "Peralatan";
  stok: number;
  satuan: string;
  minStok: number;
}
export const initialGudang: BarangGudang[] = [
  { id: "g1", nama: "Layer Premium 124", kategori: "Pakan", stok: 2400, satuan: "kg", minStok: 1000 },
  { id: "g2", nama: "Antibiotik Doxy", kategori: "Obat", stok: 12, satuan: "botol", minStok: 5 },
  { id: "g3", nama: "Vita Stress", kategori: "Vitamin", stok: 8, satuan: "kg", minStok: 3 },
  { id: "g4", nama: "ND Lasota", kategori: "Vaksin", stok: 4, satuan: "dosis x1000", minStok: 2 },
  { id: "g5", nama: "Egg Tray 30 lubang", kategori: "Egg Tray", stok: 350, satuan: "pcs", minStok: 100 },
  { id: "g6", nama: "Tempat Pakan", kategori: "Peralatan", stok: 60, satuan: "pcs", minStok: 20 },
];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const formatNumber = (n: number) => new Intl.NumberFormat("id-ID").format(Math.round(n));
