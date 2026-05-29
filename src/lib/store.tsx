import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  initialBatch, initialGudang, initialJadwal, initialKandang, initialKesehatan,
  initialPakan, initialPelanggan, initialPemakaian, initialPenjualan, initialProduksi,
  initialStokTelur, initialTransaksi, initialUsers,
  type Batch, type BarangGudang, type JadwalVaksin, type Kandang, type Kesehatan,
  type Pakan, type Pelanggan, type PemakaianPakan, type Penjualan, type Produksi,
  type StokTelur, type Transaksi, type User,
} from "./mock-data";

interface State {
  users: User[]; setUsers: (v: User[]) => void;
  kandang: Kandang[]; setKandang: (v: Kandang[]) => void;
  batch: Batch[]; setBatch: (v: Batch[]) => void;
  produksi: Produksi[]; setProduksi: (v: Produksi[]) => void;
  pakan: Pakan[]; setPakan: (v: Pakan[]) => void;
  pemakaian: PemakaianPakan[]; setPemakaian: (v: PemakaianPakan[]) => void;
  kesehatan: Kesehatan[]; setKesehatan: (v: Kesehatan[]) => void;
  jadwal: JadwalVaksin[]; setJadwal: (v: JadwalVaksin[]) => void;
  stokTelur: StokTelur; setStokTelur: (v: StokTelur) => void;
  pelanggan: Pelanggan[]; setPelanggan: (v: Pelanggan[]) => void;
  penjualan: Penjualan[]; setPenjualan: (v: Penjualan[]) => void;
  transaksi: Transaksi[]; setTransaksi: (v: Transaksi[]) => void;
  gudang: BarangGudang[]; setGudang: (v: BarangGudang[]) => void;
  currentUser: User | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const StoreContext = createContext<State | null>(null);

function useLocal<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
    }
  }, [key, val]);
  return [val, setVal] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocal("tk_users", initialUsers);
  const [kandang, setKandang] = useLocal("tk_kandang", initialKandang);
  const [batch, setBatch] = useLocal("tk_batch", initialBatch);
  const [produksi, setProduksi] = useLocal("tk_produksi", initialProduksi);
  const [pakan, setPakan] = useLocal("tk_pakan", initialPakan);
  const [pemakaian, setPemakaian] = useLocal("tk_pemakaian", initialPemakaian);
  const [kesehatan, setKesehatan] = useLocal("tk_kesehatan", initialKesehatan);
  const [jadwal, setJadwal] = useLocal("tk_jadwal", initialJadwal);
  const [stokTelur, setStokTelur] = useLocal("tk_stok", initialStokTelur);
  const [pelanggan, setPelanggan] = useLocal("tk_pelanggan", initialPelanggan);
  const [penjualan, setPenjualan] = useLocal("tk_penjualan", initialPenjualan);
  const [transaksi, setTransaksi] = useLocal("tk_transaksi", initialTransaksi);
  const [gudang, setGudang] = useLocal("tk_gudang", initialGudang);
  const [currentUser, setCurrentUser] = useLocal<User | null>("tk_user", null);

  const login = (email: string, password: string) => {
    const u = users.find((x) => x.email === email && x.password === password);
    if (u) { setCurrentUser(u); return u; }
    return null;
  };
  const logout = () => setCurrentUser(null);

  return (
    <StoreContext.Provider value={{
      users, setUsers, kandang, setKandang, batch, setBatch, produksi, setProduksi,
      pakan, setPakan, pemakaian, setPemakaian, kesehatan, setKesehatan, jadwal, setJadwal,
      stokTelur, setStokTelur, pelanggan, setPelanggan, penjualan, setPenjualan,
      transaksi, setTransaksi, gudang, setGudang, currentUser, login, logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
