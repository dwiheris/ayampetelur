import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { mapSupabaseUserToAppUser, signOut } from "./auth";
import {
  type Batch,
  type BarangGudang,
  type JadwalVaksin,
  type Kandang,
  type Kesehatan,
  type Pakan,
  type Pelanggan,
  type PemakaianPakan,
  type Penjualan,
  type Produksi,
  type StokTelur,
  type Transaksi,
  type User,
} from "./mock-data";
import { supabase } from "./supabase";

interface State {
  users: User[];
  setUsers: (v: User[]) => void;
  kandang: Kandang[];
  setKandang: (v: Kandang[]) => void;
  batch: Batch[];
  setBatch: (v: Batch[]) => void;
  produksi: Produksi[];
  setProduksi: (v: Produksi[]) => void;
  pakan: Pakan[];
  setPakan: (v: Pakan[]) => void;
  pemakaian: PemakaianPakan[];
  setPemakaian: (v: PemakaianPakan[]) => void;
  kesehatan: Kesehatan[];
  setKesehatan: (v: Kesehatan[]) => void;
  jadwal: JadwalVaksin[];
  setJadwal: (v: JadwalVaksin[]) => void;
  stokTelur: StokTelur;
  setStokTelur: (v: StokTelur) => void;
  pelanggan: Pelanggan[];
  setPelanggan: (v: Pelanggan[]) => void;
  penjualan: Penjualan[];
  setPenjualan: (v: Penjualan[]) => void;
  transaksi: Transaksi[];
  setTransaksi: (v: Transaksi[]) => void;
  gudang: BarangGudang[];
  setGudang: (v: BarangGudang[]) => void;
  currentUser: User | null;
  loginReal: (name: string, email: string) => User;
  setCurrentUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const StoreContext = createContext<State | null>(null);
const emptyStokTelur: StokTelur = { normal: 0, kecil: 0, jumbo: 0, retak: 0, reject: 0 };

function useCurrentUserLocal(key: string) {
  const [val, setVal] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (val) localStorage.setItem(key, JSON.stringify(val));
        else localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    }
  }, [key, val]);
  return [val, setVal] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [kandang, setKandang] = useState<Kandang[]>([]);
  const [batch, setBatch] = useState<Batch[]>([]);
  const [produksi, setProduksi] = useState<Produksi[]>([]);
  const [pakan, setPakan] = useState<Pakan[]>([]);
  const [pemakaian, setPemakaian] = useState<PemakaianPakan[]>([]);
  const [kesehatan, setKesehatan] = useState<Kesehatan[]>([]);
  const [jadwal, setJadwal] = useState<JadwalVaksin[]>([]);
  const [stokTelur, setStokTelur] = useState<StokTelur>(emptyStokTelur);
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [gudang, setGudang] = useState<BarangGudang[]>([]);
  const [currentUser, setCurrentUser] = useCurrentUserLocal("tk_user");

  useEffect(() => {
    let active = true;

    async function syncSession() {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (active)
        setCurrentUser(data.session?.user ? mapSupabaseUserToAppUser(data.session.user) : null);
    }

    void syncSession();

    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ? mapSupabaseUserToAppUser(session.user) : null);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [setCurrentUser]);

  const loginReal = (name: string, email: string) => {
    const u: User = {
      id: `real-${email}`,
      name,
      email,
      role: "owner",
      password: "",
    };
    setCurrentUser(u);
    return u;
  };
  const logout = async () => {
    if (supabase) await signOut();
    setCurrentUser(null);
  };

  return (
    <StoreContext.Provider
      value={{
        users,
        setUsers,
        kandang,
        setKandang,
        batch,
        setBatch,
        produksi,
        setProduksi,
        pakan,
        setPakan,
        pemakaian,
        setPemakaian,
        kesehatan,
        setKesehatan,
        jadwal,
        setJadwal,
        stokTelur,
        setStokTelur,
        pelanggan,
        setPelanggan,
        penjualan,
        setPenjualan,
        transaksi,
        setTransaksi,
        gudang,
        setGudang,
        currentUser,
        loginReal,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
