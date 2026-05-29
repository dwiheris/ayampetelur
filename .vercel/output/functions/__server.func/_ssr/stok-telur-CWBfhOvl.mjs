import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, f as formatNumber } from "./router-BtGSnx8t.mjs";
import { P as PageHeader } from "./page-header-BU64Q1Cx.mjs";
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from "./card-uop7ST8s.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-DhIrzwGX.mjs";
import "../_libs/sonner.mjs";
import { E as Egg } from "../_libs/lucide-react.mjs";
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
function StokTelurPage() {
  const {
    stokTelur,
    produksi,
    penjualan,
    kandang
  } = useStore();
  const items = [{
    label: "Normal",
    value: stokTelur.normal,
    tone: "bg-primary/10 text-primary"
  }, {
    label: "Jumbo",
    value: stokTelur.jumbo,
    tone: "bg-success/10 text-success"
  }, {
    label: "Kecil",
    value: stokTelur.kecil,
    tone: "bg-warning/15 text-warning-foreground"
  }, {
    label: "Retak",
    value: stokTelur.retak,
    tone: "bg-destructive/10 text-destructive"
  }, {
    label: "Reject",
    value: stokTelur.reject,
    tone: "bg-muted text-muted-foreground"
  }];
  const riwayat = [...produksi.map((p) => ({
    tanggal: p.tanggal,
    jenis: "Masuk",
    keterangan: `Produksi ${kandang.find((k) => k.id === p.kandangId)?.nama ?? ""}`,
    jumlah: p.normal + p.retak + p.kecil + p.jumbo
  })), ...penjualan.map((s) => ({
    tanggal: s.tanggal,
    jenis: "Keluar",
    keterangan: `Penjualan ${s.jenisTelur}`,
    jumlah: Math.round(s.jumlahKg * 16)
  }))].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 30);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Stok Telur", description: "Pantauan stok telur per kategori." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-5", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: i.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-bold", children: formatNumber(i.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "butir" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-11 w-11 items-center justify-center rounded-xl ${i.tone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Egg, { className: "h-5 w-5" }) })
    ] }) }, i.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Riwayat Stok" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tanggal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jenis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Keterangan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Jumlah" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: riwayat.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.tanggal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: r.jenis === "Masuk" ? "text-success font-medium" : "text-destructive font-medium", children: r.jenis }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.keterangan }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
            r.jenis === "Masuk" ? "+" : "−",
            formatNumber(r.jumlah)
          ] })
        ] }, i)) })
      ] }) })
    ] })
  ] });
}
export {
  StokTelurPage as component
};
