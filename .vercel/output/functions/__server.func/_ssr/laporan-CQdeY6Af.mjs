import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, f as formatNumber, a as formatRupiah } from "./router-BtGSnx8t.mjs";
import { P as PageHeader } from "./page-header-BU64Q1Cx.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./card-uop7ST8s.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from "./tabs-CNkHBpn6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as FileText, D as Download } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, c as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Line, a as BarChart, L as Legend, B as Bar } from "../_libs/recharts.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
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
function toCSV(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [headers.join(","), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
}
function download(name, content, type = "text/csv") {
  const blob = new Blob([content], {
    type
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
function LaporanPage() {
  const {
    produksi,
    penjualan,
    transaksi,
    kesehatan,
    pakan,
    kandang
  } = useStore();
  const produksiChart = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    produksi.forEach((p) => map.set(p.tanggal, (map.get(p.tanggal) ?? 0) + p.normal + p.retak + p.kecil + p.jumbo));
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)).slice(-14).map(([tanggal, total]) => ({
      tanggal: tanggal.slice(5),
      total
    }));
  }, [produksi]);
  const labaRugi = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    transaksi.forEach((t) => {
      const e = map.get(t.tanggal) ?? {
        in: 0,
        out: 0
      };
      if (t.jenis === "Pemasukan") e.in += t.jumlah;
      else e.out += t.jumlah;
      map.set(t.tanggal, e);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([tanggal, v]) => ({
      tanggal: tanggal.slice(5),
      Pemasukan: v.in,
      Pengeluaran: v.out,
      Laba: v.in - v.out
    }));
  }, [transaksi]);
  const exportProduksi = () => {
    download("laporan-produksi.csv", toCSV(produksi.map((p) => ({
      ...p,
      total: p.normal + p.retak + p.kecil + p.jumbo,
      kandang: kandang.find((k) => k.id === p.kandangId)?.nama ?? ""
    }))));
    toast.success("CSV diunduh");
  };
  const exportPenjualan = () => {
    download("laporan-penjualan.csv", toCSV(penjualan.map((s) => ({
      ...s,
      total: s.jumlahKg * s.hargaSatuan
    }))));
    toast.success("CSV diunduh");
  };
  const exportKeuangan = () => {
    download("laporan-keuangan.csv", toCSV(transaksi.map((t) => ({
      ...t
    }))));
    toast.success("CSV diunduh");
  };
  const cetakPDF = () => {
    window.print();
    toast.success("Buka dialog cetak — pilih Save as PDF");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Laporan", description: "Ringkasan, grafik, dan ekspor laporan.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: cetakPDF, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-1 h-4 w-4" }),
      "Cetak PDF"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "produksi", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "produksi", children: "Produksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "penjualan", children: "Penjualan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "keuangan", children: "Laba Rugi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "mortalitas", children: "Mortalitas & Stok" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "produksi", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportProduksi, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1 h-4 w-4" }),
          "Export Excel/CSV"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Grafik Produksi 14 Hari" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: produksiChart, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "tanggal", fontSize: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { fontSize: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 8
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "total", stroke: "var(--color-primary)", strokeWidth: 2.5 })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Total produksi tercatat: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
            formatNumber(produksi.reduce((s, p) => s + p.normal + p.retak + p.kecil + p.jumbo, 0)),
            " butir"
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "penjualan", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportPenjualan, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1 h-4 w-4" }),
          "Export Excel/CSV"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Total penjualan: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: formatRupiah(penjualan.reduce((s, p) => s + p.jumlahKg * p.hargaSatuan, 0)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "keuangan", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportKeuangan, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1 h-4 w-4" }),
          "Export Excel/CSV"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Pemasukan vs Pengeluaran" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: labaRugi, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "tanggal", fontSize: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { fontSize: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 8
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Pemasukan", fill: "var(--color-success)", radius: [4, 4, 0, 0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Pengeluaran", fill: "var(--color-destructive)", radius: [4, 4, 0, 0] })
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "mortalitas", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Total mortalitas: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
            kesehatan.filter((k) => k.jenis === "Mati").reduce((s, k) => s + k.jumlah, 0),
            " ekor"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Total stok pakan: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
            formatNumber(pakan.reduce((s, p) => s + p.stok, 0)),
            " kg"
          ] })
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  LaporanPage as component
};
