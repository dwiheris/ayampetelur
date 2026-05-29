import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const ROLE_LABELS = {
  master_admin: "Master Admin",
  owner: "Owner",
  admin_kandang: "Admin Kandang",
  petugas_gudang: "Petugas Gudang",
  keuangan: "Keuangan",
  viewer: "Viewer"
};
const initialUsers = [
  { id: "u1", name: "Master Admin", email: "admin@telurku.id", role: "master_admin", password: "admin123" },
  { id: "u2", name: "Pak Budi (Owner)", email: "owner@telurku.id", role: "owner", password: "owner123" },
  { id: "u3", name: "Sutrisno", email: "kandang@telurku.id", role: "admin_kandang", password: "kandang123" },
  { id: "u4", name: "Yanto", email: "gudang@telurku.id", role: "petugas_gudang", password: "gudang123" },
  { id: "u5", name: "Sari", email: "keuangan@telurku.id", role: "keuangan", password: "keuangan123" },
  { id: "u6", name: "Tamu", email: "viewer@telurku.id", role: "viewer", password: "viewer123" }
];
const initialKandang = [
  { id: "k1", nama: "Kandang A", kapasitas: 5e3, lokasi: "Blok Utara", jenis: "Battery", status: "Aktif", pj: "Sutrisno" },
  { id: "k2", nama: "Kandang B", kapasitas: 4e3, lokasi: "Blok Selatan", jenis: "Battery", status: "Aktif", pj: "Sutrisno" },
  { id: "k3", nama: "Kandang C", kapasitas: 3e3, lokasi: "Blok Timur", jenis: "Postal", status: "Aktif", pj: "Joko" },
  { id: "k4", nama: "Kandang D", kapasitas: 2e3, lokasi: "Blok Barat", jenis: "Battery", status: "Maintenance", pj: "Joko" }
];
const initialBatch = [
  { id: "b1", nama: "Batch 2024-A", strain: "ISA Brown", kandangId: "k1", tglMasuk: "2024-08-01", umurAwal: 17, jumlahAwal: 5e3, jumlahAktif: 4860, status: "Aktif" },
  { id: "b2", nama: "Batch 2024-B", strain: "Lohmann Brown", kandangId: "k2", tglMasuk: "2024-09-15", umurAwal: 16, jumlahAwal: 4e3, jumlahAktif: 3920, status: "Aktif" },
  { id: "b3", nama: "Batch 2025-A", strain: "Hy-Line Brown", kandangId: "k3", tglMasuk: "2025-02-10", umurAwal: 18, jumlahAwal: 3e3, jumlahAktif: 2975, status: "Aktif" }
];
const today = /* @__PURE__ */ new Date();
const dateStr = (offset) => {
  const d = new Date(today);
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
};
const initialProduksi = Array.from({ length: 14 }).flatMap((_, i) => [
  { id: `p-${i}-1`, tanggal: dateStr(i), kandangId: "k1", normal: 4200 + Math.floor(Math.random() * 200), retak: 40, kecil: 60, jumbo: 80, berat: 280 + Math.random() * 10 },
  { id: `p-${i}-2`, tanggal: dateStr(i), kandangId: "k2", normal: 3400 + Math.floor(Math.random() * 200), retak: 30, kecil: 50, jumbo: 60, berat: 230 + Math.random() * 10 },
  { id: `p-${i}-3`, tanggal: dateStr(i), kandangId: "k3", normal: 2500 + Math.floor(Math.random() * 150), retak: 20, kecil: 40, jumbo: 50, berat: 175 + Math.random() * 8 }
]);
const initialPakan = [
  { id: "pk1", nama: "Layer Premium 124", jenis: "Layer", stok: 2400, minStok: 1e3, harga: 8500 },
  { id: "pk2", nama: "Konsentrat KLK-36", jenis: "Konsentrat", stok: 800, minStok: 500, harga: 9200 },
  { id: "pk3", nama: "Jagung Giling", jenis: "Sumber Energi", stok: 1200, minStok: 800, harga: 6500 },
  { id: "pk4", nama: "Dedak Padi", jenis: "Serat", stok: 600, minStok: 400, harga: 4500 }
];
const initialPemakaian = Array.from({ length: 7 }).flatMap((_, i) => [
  { id: `pp-${i}-1`, tanggal: dateStr(i), kandangId: "k1", pakanId: "pk1", jumlah: 540 },
  { id: `pp-${i}-2`, tanggal: dateStr(i), kandangId: "k2", pakanId: "pk1", jumlah: 430 },
  { id: `pp-${i}-3`, tanggal: dateStr(i), kandangId: "k3", pakanId: "pk1", jumlah: 320 }
]);
const initialKesehatan = [
  { id: "h1", tanggal: dateStr(0), kandangId: "k1", jenis: "Mati", jumlah: 3, penyebab: "Stres panas", tindakan: "Tambah ventilasi" },
  { id: "h2", tanggal: dateStr(1), kandangId: "k2", jenis: "Sakit", jumlah: 12, penyebab: "Snot", tindakan: "Pemberian antibiotik" },
  { id: "h3", tanggal: dateStr(2), kandangId: "k1", jenis: "Mati", jumlah: 2, penyebab: "Tua", tindakan: "Catat afkir" }
];
const initialJadwal = [
  { id: "j1", tanggal: dateStr(-3), kandangId: "k1", vaksin: "ND Lasota", status: "Terjadwal" },
  { id: "j2", tanggal: dateStr(-7), kandangId: "k2", vaksin: "AI Inaktif", status: "Terjadwal" },
  { id: "j3", tanggal: dateStr(2), kandangId: "k3", vaksin: "IB H120", status: "Selesai" }
];
const initialStokTelur = { normal: 18500, kecil: 1200, jumbo: 800, retak: 450, reject: 120 };
const initialPelanggan = [
  { id: "c1", nama: "Toko Berkah Jaya", telp: "0812-3456-7890", alamat: "Pasar Kliwon, Solo", jenis: "Reseller" },
  { id: "c2", nama: "Warung Bu Tini", telp: "0813-1111-2222", alamat: "Jl. Mawar 12", jenis: "Retail" },
  { id: "c3", nama: "Pasar Legi", telp: "0856-9999-0000", alamat: "Pasar Legi", jenis: "Pasar" }
];
const initialPenjualan = [
  { id: "s1", tanggal: dateStr(0), pelangganId: "c1", jenisTelur: "Normal", jumlahKg: 250, hargaSatuan: 28e3, status: "Lunas" },
  { id: "s2", tanggal: dateStr(0), pelangganId: "c2", jenisTelur: "Normal", jumlahKg: 30, hargaSatuan: 29e3, status: "Lunas" },
  { id: "s3", tanggal: dateStr(1), pelangganId: "c3", jenisTelur: "Jumbo", jumlahKg: 80, hargaSatuan: 31e3, status: "Piutang" },
  { id: "s4", tanggal: dateStr(2), pelangganId: "c1", jenisTelur: "Normal", jumlahKg: 300, hargaSatuan: 28e3, status: "Lunas" }
];
const initialTransaksi = [
  { id: "t1", tanggal: dateStr(0), jenis: "Pengeluaran", kategori: "Pakan", jumlah: 45e5, catatan: "Beli pakan layer" },
  { id: "t2", tanggal: dateStr(0), jenis: "Pemasukan", kategori: "Penjualan Telur", jumlah: 78e5 },
  { id: "t3", tanggal: dateStr(1), jenis: "Pengeluaran", kategori: "Gaji Karyawan", jumlah: 3e6 },
  { id: "t4", tanggal: dateStr(2), jenis: "Pengeluaran", kategori: "Listrik", jumlah: 85e4 },
  { id: "t5", tanggal: dateStr(2), jenis: "Pemasukan", kategori: "Penjualan Telur", jumlah: 84e5 }
];
const initialGudang = [
  { id: "g1", nama: "Layer Premium 124", kategori: "Pakan", stok: 2400, satuan: "kg", minStok: 1e3 },
  { id: "g2", nama: "Antibiotik Doxy", kategori: "Obat", stok: 12, satuan: "botol", minStok: 5 },
  { id: "g3", nama: "Vita Stress", kategori: "Vitamin", stok: 8, satuan: "kg", minStok: 3 },
  { id: "g4", nama: "ND Lasota", kategori: "Vaksin", stok: 4, satuan: "dosis x1000", minStok: 2 },
  { id: "g5", nama: "Egg Tray 30 lubang", kategori: "Egg Tray", stok: 350, satuan: "pcs", minStok: 100 },
  { id: "g6", nama: "Tempat Pakan", kategori: "Peralatan", stok: 60, satuan: "pcs", minStok: 20 }
];
const formatRupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const formatNumber = (n) => new Intl.NumberFormat("id-ID").format(Math.round(n));
const StoreContext = reactExports.createContext(null);
function useLocal(key, initial) {
  const [val, setVal] = reactExports.useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch {
      }
    }
  }, [key, val]);
  return [val, setVal];
}
function StoreProvider({ children }) {
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
  const [currentUser, setCurrentUser] = useLocal("tk_user", null);
  const login = (email, password) => {
    const u = users.find((x) => x.email === email && x.password === password);
    if (u) {
      setCurrentUser(u);
      return u;
    }
    return null;
  };
  const logout = () => setCurrentUser(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StoreContext.Provider, { value: {
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
    login,
    logout
  }, children });
}
function useStore() {
  const ctx = reactExports.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
const appCss = "/assets/styles-BFIp_l7u.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Halaman tidak ditemukan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Kembali" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Terjadi kesalahan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Coba lagi"
      }
    ) })
  ] }) });
}
const Route$h = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Telurku Management System" },
      { name: "description", content: "Sistem manajemen kandang ayam petelur modern." },
      { property: "og:title", content: "Telurku Management System" },
      { name: "twitter:title", content: "Telurku Management System" },
      { property: "og:description", content: "Sistem manajemen kandang ayam petelur modern." },
      { name: "twitter:description", content: "Sistem manajemen kandang ayam petelur modern." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/J3bBehOiz9ZrV3qUcDbAQwHG7h02/social-images/social-1779981572291-sicial_imge.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/J3bBehOiz9ZrV3qUcDbAQwHG7h02/social-images/social-1779981572291-sicial_imge.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "id", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$h.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(StoreProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$g = () => import("./login-BM4dhO3J.mjs");
const Route$g = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("../_app-C40HOn8t.mjs");
const Route$f = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./index-Q1bJtV4B.mjs");
const Route$e = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./stok-telur-CWBfhOvl.mjs");
const Route$d = createFileRoute("/_app/stok-telur")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./produksi-BFQUZyYA.mjs");
const Route$c = createFileRoute("/_app/produksi")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./populasi-DM8cmg4b.mjs");
const Route$b = createFileRoute("/_app/populasi")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./penjualan-DfVRswz2.mjs");
const Route$a = createFileRoute("/_app/penjualan")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./pengaturan-Djyzj2qI.mjs");
const Route$9 = createFileRoute("/_app/pengaturan")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./pelanggan-C0aZlDHz.mjs");
const Route$8 = createFileRoute("/_app/pelanggan")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./pakan-3ObLW0K7.mjs");
const Route$7 = createFileRoute("/_app/pakan")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./laporan-CQdeY6Af.mjs");
const Route$6 = createFileRoute("/_app/laporan")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./keuangan-DrHaFliH.mjs");
const Route$5 = createFileRoute("/_app/keuangan")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./kesehatan-DqQHSCDD.mjs");
const Route$4 = createFileRoute("/_app/kesehatan")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./kandang-BP5yqyHG.mjs");
const Route$3 = createFileRoute("/_app/kandang")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./jadwal-Ca3zvzqz.mjs");
const Route$2 = createFileRoute("/_app/jadwal")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./gudang-DJAmFNbg.mjs");
const Route$1 = createFileRoute("/_app/gudang")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./dashboard-DuD1eDGI.mjs");
const Route = createFileRoute("/_app/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LoginRoute = Route$g.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$h
});
const AppRoute = Route$f.update({
  id: "/_app",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$e.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const AppStokTelurRoute = Route$d.update({
  id: "/stok-telur",
  path: "/stok-telur",
  getParentRoute: () => AppRoute
});
const AppProduksiRoute = Route$c.update({
  id: "/produksi",
  path: "/produksi",
  getParentRoute: () => AppRoute
});
const AppPopulasiRoute = Route$b.update({
  id: "/populasi",
  path: "/populasi",
  getParentRoute: () => AppRoute
});
const AppPenjualanRoute = Route$a.update({
  id: "/penjualan",
  path: "/penjualan",
  getParentRoute: () => AppRoute
});
const AppPengaturanRoute = Route$9.update({
  id: "/pengaturan",
  path: "/pengaturan",
  getParentRoute: () => AppRoute
});
const AppPelangganRoute = Route$8.update({
  id: "/pelanggan",
  path: "/pelanggan",
  getParentRoute: () => AppRoute
});
const AppPakanRoute = Route$7.update({
  id: "/pakan",
  path: "/pakan",
  getParentRoute: () => AppRoute
});
const AppLaporanRoute = Route$6.update({
  id: "/laporan",
  path: "/laporan",
  getParentRoute: () => AppRoute
});
const AppKeuanganRoute = Route$5.update({
  id: "/keuangan",
  path: "/keuangan",
  getParentRoute: () => AppRoute
});
const AppKesehatanRoute = Route$4.update({
  id: "/kesehatan",
  path: "/kesehatan",
  getParentRoute: () => AppRoute
});
const AppKandangRoute = Route$3.update({
  id: "/kandang",
  path: "/kandang",
  getParentRoute: () => AppRoute
});
const AppJadwalRoute = Route$2.update({
  id: "/jadwal",
  path: "/jadwal",
  getParentRoute: () => AppRoute
});
const AppGudangRoute = Route$1.update({
  id: "/gudang",
  path: "/gudang",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppDashboardRoute,
  AppGudangRoute,
  AppJadwalRoute,
  AppKandangRoute,
  AppKesehatanRoute,
  AppKeuanganRoute,
  AppLaporanRoute,
  AppPakanRoute,
  AppPelangganRoute,
  AppPengaturanRoute,
  AppPenjualanRoute,
  AppPopulasiRoute,
  AppProduksiRoute,
  AppStokTelurRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  LoginRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ROLE_LABELS as R,
  formatRupiah as a,
  formatNumber as f,
  initialUsers as i,
  router as r,
  useStore as u
};
