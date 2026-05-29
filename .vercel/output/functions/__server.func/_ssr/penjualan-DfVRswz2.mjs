import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, a as formatRupiah, f as formatNumber } from "./router-BtGSnx8t.mjs";
import { P as PageHeader } from "./page-header-BU64Q1Cx.mjs";
import { C as Card, a as CardContent } from "./card-uop7ST8s.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-DhIrzwGX.mjs";
import { D as Dialog, e as DialogTrigger, a as DialogContent, c as DialogHeader, d as DialogTitle, S as Select, h as SelectTrigger, i as SelectValue, f as SelectContent, g as SelectItem, b as DialogFooter } from "./select-DhN13T2l.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as Plus, k as Printer, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const empty = {
  id: "",
  tanggal: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  pelangganId: "",
  jenisTelur: "Normal",
  jumlahKg: 0,
  hargaSatuan: 28e3,
  status: "Lunas"
};
function PenjualanPage() {
  const {
    penjualan,
    setPenjualan,
    pelanggan,
    transaksi,
    setTransaksi
  } = useStore();
  const [open, setOpen] = reactExports.useState(false);
  const [edit, setEdit] = reactExports.useState(empty);
  const save = () => {
    if (!edit.pelangganId || edit.jumlahKg <= 0) return toast.error("Lengkapi data");
    const id = `s${Date.now()}`;
    setPenjualan([...penjualan, {
      ...edit,
      id
    }]);
    if (edit.status === "Lunas") {
      setTransaksi([...transaksi, {
        id: `t${Date.now()}`,
        tanggal: edit.tanggal,
        jenis: "Pemasukan",
        kategori: "Penjualan Telur",
        jumlah: edit.jumlahKg * edit.hargaSatuan,
        catatan: `Invoice ${id}`
      }]);
    }
    toast.success("Transaksi tersimpan");
    setOpen(false);
    setEdit(empty);
  };
  const cetak = (s) => {
    const c = pelanggan.find((p) => p.id === s.pelangganId);
    const total2 = s.jumlahKg * s.hargaSatuan;
    const w = window.open("", "_blank", "width=600,height=800");
    if (!w) return;
    w.document.write(`
      <html><head><title>Invoice ${s.id}</title>
      <style>body{font-family:system-ui;padding:32px;color:#333}h1{color:#a8550c}table{width:100%;border-collapse:collapse;margin-top:16px}td,th{padding:8px;border-bottom:1px solid #ddd;text-align:left}</style>
      </head><body>
      <h1>Telurku — Invoice</h1>
      <p><b>No:</b> ${s.id}<br><b>Tanggal:</b> ${s.tanggal}<br><b>Pelanggan:</b> ${c?.nama ?? "-"}<br><b>Alamat:</b> ${c?.alamat ?? "-"}</p>
      <table><tr><th>Item</th><th>Qty</th><th>Harga</th><th>Total</th></tr>
      <tr><td>Telur ${s.jenisTelur}</td><td>${s.jumlahKg} kg</td><td>${formatRupiah(s.hargaSatuan)}</td><td>${formatRupiah(total2)}</td></tr>
      <tr><td colspan="3" style="text-align:right"><b>Total</b></td><td><b>${formatRupiah(total2)}</b></td></tr>
      <tr><td colspan="3" style="text-align:right">Status</td><td>${s.status}</td></tr>
      </table>
      <p style="margin-top:32px;text-align:center;color:#888">Terima kasih atas kepercayaan Anda.</p>
      <script>window.print()<\/script>
      </body></html>`);
    w.document.close();
  };
  const total = edit.jumlahKg * edit.hargaSatuan;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Penjualan", description: "Transaksi penjualan telur dan cetak invoice.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
      setOpen(v);
      if (!v) setEdit(empty);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        "Transaksi Baru"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Penjualan Baru" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tanggal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: edit.tanggal, onChange: (e) => setEdit({
                ...edit,
                tanggal: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pelanggan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.pelangganId, onValueChange: (v) => setEdit({
                ...edit,
                pelangganId: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: pelanggan.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.nama }, p.id)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jenis Telur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.jenisTelur, onValueChange: (v) => setEdit({
                ...edit,
                jenisTelur: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Normal", children: "Normal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Jumbo", children: "Jumbo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Kecil", children: "Kecil" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Retak", children: "Retak" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jumlah (kg)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: edit.jumlahKg || "", onChange: (e) => setEdit({
                ...edit,
                jumlahKg: +e.target.value
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Harga/kg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: edit.hargaSatuan || "", onChange: (e) => setEdit({
                ...edit,
                hargaSatuan: +e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.status, onValueChange: (v) => setEdit({
                ...edit,
                status: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Lunas", children: "Lunas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Piutang", children: "Piutang" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted px-3 py-2", children: [
            "Total: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatRupiah(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Batal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, children: "Simpan" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pelanggan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jenis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Jumlah (kg)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Harga" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-24", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: [...penjualan].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.tanggal }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: pelanggan.find((p) => p.id === s.pelangganId)?.nama ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.jenisTelur }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: formatNumber(s.jumlahKg) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: formatRupiah(s.hargaSatuan) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: formatRupiah(s.jumlahKg * s.hargaSatuan) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: s.status === "Lunas" ? "default" : "outline", children: s.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => cetak(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
            setPenjualan(penjualan.filter((x) => x.id !== s.id));
            toast.success("Dihapus");
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] }) })
      ] }, s.id)) })
    ] }) }) })
  ] });
}
export {
  PenjualanPage as component
};
