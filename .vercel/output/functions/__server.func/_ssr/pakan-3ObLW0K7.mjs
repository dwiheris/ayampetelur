import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, f as formatNumber, a as formatRupiah } from "./router-BtGSnx8t.mjs";
import { P as PageHeader } from "./page-header-BU64Q1Cx.mjs";
import { C as Card, a as CardContent } from "./card-uop7ST8s.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-DhIrzwGX.mjs";
import { D as Dialog, e as DialogTrigger, a as DialogContent, c as DialogHeader, d as DialogTitle, b as DialogFooter, S as Select, h as SelectTrigger, i as SelectValue, f as SelectContent, g as SelectItem } from "./select-DhN13T2l.mjs";
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from "./tabs-CNkHBpn6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as Plus, r as TriangleAlert, i as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
const emptyP = {
  id: "",
  nama: "",
  jenis: "Layer",
  stok: 0,
  minStok: 0,
  harga: 0
};
const emptyU = {
  id: "",
  tanggal: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  kandangId: "",
  pakanId: "",
  jumlah: 0
};
function PakanPage() {
  const {
    pakan,
    setPakan,
    pemakaian,
    setPemakaian,
    kandang,
    batch
  } = useStore();
  const [openP, setOpenP] = reactExports.useState(false);
  const [editP, setEditP] = reactExports.useState(emptyP);
  const [openU, setOpenU] = reactExports.useState(false);
  const [editU, setEditU] = reactExports.useState(emptyU);
  const saveP = () => {
    if (!editP.nama) return toast.error("Isi nama");
    if (editP.id) setPakan(pakan.map((p) => p.id === editP.id ? editP : p));
    else setPakan([...pakan, {
      ...editP,
      id: `pk${Date.now()}`
    }]);
    toast.success("Pakan disimpan");
    setOpenP(false);
    setEditP(emptyP);
  };
  const saveU = () => {
    if (!editU.kandangId || !editU.pakanId || editU.jumlah <= 0) return toast.error("Lengkapi data");
    const p = pakan.find((x) => x.id === editU.pakanId);
    if (!p) return;
    if (p.stok < editU.jumlah) return toast.error("Stok pakan tidak cukup");
    setPemakaian([...pemakaian, {
      ...editU,
      id: `pp${Date.now()}`
    }]);
    setPakan(pakan.map((x) => x.id === editU.pakanId ? {
      ...x,
      stok: x.stok - editU.jumlah
    } : x));
    toast.success("Pemakaian tercatat & stok dikurangi");
    setOpenU(false);
    setEditU(emptyU);
  };
  const gramPerEkor = (u) => {
    const b = batch.find((bb) => bb.kandangId === u.kandangId && bb.status === "Aktif");
    return b && b.jumlahAktif > 0 ? (u.jumlah * 1e3 / b.jumlahAktif).toFixed(1) + " g" : "—";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Manajemen Pakan", description: "Master data pakan, stok, dan pemakaian harian." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "stok", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "stok", children: "Master & Stok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pemakaian", children: "Pemakaian Harian" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "stok", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: openP, onOpenChange: (v) => {
          setOpenP(v);
          if (!v) setEditP(emptyP);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
            "Tambah Pakan"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
              editP.id ? "Edit" : "Tambah",
              " Pakan"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nama" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editP.nama, onChange: (e) => setEditP({
                  ...editP,
                  nama: e.target.value
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jenis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editP.jenis, onChange: (e) => setEditP({
                  ...editP,
                  jenis: e.target.value
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Stok (kg)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editP.stok || "", onChange: (e) => setEditP({
                    ...editP,
                    stok: +e.target.value
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Min Stok" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editP.minStok || "", onChange: (e) => setEditP({
                    ...editP,
                    minStok: +e.target.value
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Harga/kg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editP.harga || "", onChange: (e) => setEditP({
                    ...editP,
                    harga: +e.target.value
                  }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpenP(false), children: "Batal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveP, children: "Simpan" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama Pakan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jenis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Stok (kg)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Min Stok" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Harga/kg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-24", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: pakan.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: p.nama }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.jenis }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: formatNumber(p.stok) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: formatNumber(p.minStok) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: formatRupiah(p.harga) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.stok < p.minStok ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
              "Rendah"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Aman" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
                setEditP(p);
                setOpenP(true);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
                setPakan(pakan.filter((x) => x.id !== p.id));
                toast.success("Dihapus");
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] }) })
          ] }, p.id)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "pemakaian", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: openU, onOpenChange: (v) => {
          setOpenU(v);
          if (!v) setEditU(emptyU);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
            "Input Pemakaian"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Input Pemakaian Pakan" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tanggal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: editU.tanggal, onChange: (e) => setEditU({
                    ...editU,
                    tanggal: e.target.value
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jumlah (kg)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editU.jumlah || "", onChange: (e) => setEditU({
                    ...editU,
                    jumlah: +e.target.value
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kandang" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editU.kandangId, onValueChange: (v) => setEditU({
                  ...editU,
                  kandangId: v
                }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: kandang.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k.id, children: k.nama }, k.id)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pakan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editU.pakanId, onValueChange: (v) => setEditU({
                  ...editU,
                  pakanId: v
                }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: pakan.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
                    p.nama,
                    " (stok ",
                    formatNumber(p.stok),
                    " kg)"
                  ] }, p.id)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpenU(false), children: "Batal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveU, children: "Simpan" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tanggal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kandang" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pakan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Jumlah (kg)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Per Ekor" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: [...pemakaian].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.tanggal }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: kandang.find((k) => k.id === u.kandangId)?.nama ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: pakan.find((p) => p.id === u.pakanId)?.nama ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: formatNumber(u.jumlah) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: gramPerEkor(u) })
          ] }, u.id)) })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  PakanPage as component
};
