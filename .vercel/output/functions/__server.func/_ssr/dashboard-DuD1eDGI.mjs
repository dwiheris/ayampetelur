import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useStore, f as formatNumber, a as formatRupiah } from "./router-BtGSnx8t.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./card-uop7ST8s.mjs";
import { P as PageHeader } from "./page-header-BU64Q1Cx.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import "../_libs/sonner.mjs";
import { B as Bird, t as Warehouse, E as Egg, q as TrendingUp, u as Wheat, n as Skull, P as Package, W as Wallet, p as TrendingDown, r as TriangleAlert, o as Syringe, A as ArrowRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, c as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Line, a as BarChart, B as Bar } from "../_libs/recharts.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function Stat({
  icon: Icon,
  label,
  value,
  hint,
  tone = "primary",
  href
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, "aria-label": `Buka halaman ${label}`, className: "group block h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between gap-4 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold tracking-tight", children: value }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-12 w-12 items-center justify-center rounded-xl ${toneClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) })
    ] })
  ] }) }) });
}
function NotificationLink({
  to,
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: `group flex items-start gap-2 rounded-lg border p-3 transition hover:-translate-y-0.5 hover:shadow-sm ${className}`, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "mt-0.5 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" })
  ] });
}
function Dashboard() {
  const {
    batch,
    kandang,
    produksi,
    pakan,
    kesehatan,
    stokTelur,
    penjualan,
    transaksi,
    jadwal
  } = useStore();
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const totalAyam = batch.filter((b) => b.status === "Aktif").reduce((s, b) => s + b.jumlahAktif, 0);
  const kandangAktif = kandang.filter((k) => k.status === "Aktif").length;
  const prodHariIni = produksi.filter((p) => p.tanggal === today);
  const totalTelurHariIni = prodHariIni.reduce((s, p) => s + p.normal + p.retak + p.kecil + p.jumbo, 0);
  const hdp = totalAyam > 0 ? totalTelurHariIni / totalAyam * 100 : 0;
  const matiHariIni = kesehatan.filter((k) => k.tanggal === today && k.jenis === "Mati").reduce((s, k) => s + k.jumlah, 0);
  const stokTelurReady = stokTelur.normal + stokTelur.jumbo + stokTelur.kecil;
  const stokPakanTotal = pakan.reduce((s, p) => s + p.stok, 0);
  const penjualanHariIni = penjualan.filter((s) => s.tanggal === today).reduce((s, p) => s + p.jumlahKg * p.hargaSatuan, 0);
  const pengeluaranHariIni = transaksi.filter((t) => t.tanggal === today && t.jenis === "Pengeluaran").reduce((s, t) => s + t.jumlah, 0);
  const pemasukanHariIni = transaksi.filter((t) => t.tanggal === today && t.jenis === "Pemasukan").reduce((s, t) => s + t.jumlah, 0);
  const laba = pemasukanHariIni - pengeluaranHariIni;
  const chartData = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    produksi.forEach((p) => {
      const t = p.normal + p.retak + p.kecil + p.jumbo;
      map.set(p.tanggal, (map.get(p.tanggal) ?? 0) + t);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)).slice(-14).map(([tanggal, total]) => ({
      tanggal: tanggal.slice(5),
      total
    }));
  }, [produksi]);
  const penjualanChart = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    penjualan.forEach((p) => {
      map.set(p.tanggal, (map.get(p.tanggal) ?? 0) + p.jumlahKg * p.hargaSatuan);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)).slice(-7).map(([tanggal, total]) => ({
      tanggal: tanggal.slice(5),
      total: total / 1e3
    }));
  }, [penjualan]);
  const alertPakan = pakan.filter((p) => p.stok < p.minStok);
  const alertVaksin = jadwal.filter((j) => j.status === "Terjadwal" && new Date(j.tanggal) >= new Date(today));
  const avgRecent = chartData.slice(-7).reduce((s, d) => s + d.total, 0) / 7;
  const prevAvg = chartData.slice(-14, -7).reduce((s, d) => s + d.total, 0) / 7;
  const produksiTurun = prevAvg > 0 && avgRecent < prevAvg * 0.9;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Dashboard", description: `Ringkasan operasional peternakan — ${(/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/populasi", icon: Bird, label: "Populasi Ayam Aktif", value: formatNumber(totalAyam), hint: `${batch.filter((b) => b.status === "Aktif").length} batch aktif` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/kandang", icon: Warehouse, label: "Kandang Aktif", value: String(kandangAktif), hint: `dari ${kandang.length} total kandang` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/produksi", icon: Egg, label: "Produksi Telur Hari Ini", value: formatNumber(totalTelurHariIni), hint: "butir", tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/produksi", icon: TrendingUp, label: "HDP Rata-rata", value: `${hdp.toFixed(1)}%`, hint: "Hen Day Production", tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/pakan", icon: Wheat, label: "Konsumsi Pakan", value: `${formatNumber(1290)} kg`, hint: "hari ini" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/kesehatan", icon: Skull, label: "Ayam Mati Hari Ini", value: formatNumber(matiHariIni), hint: "ekor", tone: "destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/stok-telur", icon: Package, label: "Stok Telur Siap Jual", value: formatNumber(stokTelurReady), hint: "butir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/pakan", icon: Wheat, label: "Stok Pakan Total", value: `${formatNumber(stokPakanTotal)} kg`, tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/penjualan", icon: Wallet, label: "Penjualan Hari Ini", value: formatRupiah(penjualanHariIni), tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/keuangan", icon: TrendingDown, label: "Pengeluaran Hari Ini", value: formatRupiah(pengeluaranHariIni), tone: "destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/keuangan", icon: TrendingUp, label: "Estimasi Laba", value: formatRupiah(laba), tone: laba >= 0 ? "success" : "destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { href: "/jadwal", icon: TriangleAlert, label: "Total Alert", value: String(alertPakan.length + alertVaksin.length + (produksiTurun ? 1 : 0)), tone: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Produksi Telur 14 Hari Terakhir" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "tanggal", stroke: "var(--color-muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "total", stroke: "var(--color-primary)", strokeWidth: 2.5, dot: {
            fill: "var(--color-primary)"
          } })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Notifikasi" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          alertPakan.length === 0 && alertVaksin.length === 0 && !produksiTurun && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tidak ada alert." }),
          alertPakan.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(NotificationLink, { to: "/pakan", className: "border-warning/30 bg-warning/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 mt-0.5 text-warning-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Stok pakan rendah" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                p.nama,
                " — tersisa ",
                formatNumber(p.stok),
                " kg"
              ] })
            ] })
          ] }, p.id)),
          produksiTurun && /* @__PURE__ */ jsxRuntimeExports.jsxs(NotificationLink, { to: "/produksi", className: "border-destructive/30 bg-destructive/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 mt-0.5 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Produksi menurun" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "7 hari terakhir turun dibanding minggu sebelumnya" })
            ] })
          ] }),
          alertVaksin.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(NotificationLink, { to: "/jadwal", className: "border-primary/30 bg-primary/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Syringe, { className: "h-4 w-4 mt-0.5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                "Jadwal vaksin ",
                j.vaksin
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: j.tanggal })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: j.status })
          ] }, j.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Penjualan 7 Hari (ribuan Rp)" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: penjualanChart, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "tanggal", stroke: "var(--color-muted-foreground)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--color-popover)",
          border: "1px solid var(--color-border)",
          borderRadius: 8
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "total", fill: "var(--color-primary)", radius: [6, 6, 0, 0] })
      ] }) }) })
    ] })
  ] });
}
export {
  Dashboard as component
};
