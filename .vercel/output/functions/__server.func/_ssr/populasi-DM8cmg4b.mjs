import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore, f as formatNumber } from "./router-BtGSnx8t.mjs";
import { P as PageHeader } from "./page-header-BU64Q1Cx.mjs";
import { C as Card, a as CardContent } from "./card-uop7ST8s.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-DhIrzwGX.mjs";
import { D as Dialog, e as DialogTrigger, a as DialogContent, c as DialogHeader, d as DialogTitle, S as Select, h as SelectTrigger, i as SelectValue, f as SelectContent, g as SelectItem, b as DialogFooter } from "./select-DhN13T2l.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as Plus, i as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
  nama: "",
  strain: "ISA Brown",
  kandangId: "",
  tglMasuk: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  umurAwal: 16,
  jumlahAwal: 0,
  jumlahAktif: 0,
  status: "Aktif"
};
function Populasi() {
  const {
    batch,
    setBatch,
    kandang
  } = useStore();
  const [open, setOpen] = reactExports.useState(false);
  const [edit, setEdit] = reactExports.useState(empty);
  const save = () => {
    if (!edit.nama || !edit.kandangId) return toast.error("Lengkapi data");
    if (edit.id) {
      setBatch(batch.map((b) => b.id === edit.id ? edit : b));
      toast.success("Batch diperbarui");
    } else {
      setBatch([...batch, {
        ...edit,
        id: `b${Date.now()}`,
        jumlahAktif: edit.jumlahAktif || edit.jumlahAwal
      }]);
      toast.success("Batch ditambahkan");
    }
    setOpen(false);
    setEdit(empty);
  };
  const remove = (id) => {
    setBatch(batch.filter((b) => b.id !== id));
    toast.success("Dihapus");
  };
  const umur = (tglMasuk, umurAwal) => {
    const days = Math.floor((Date.now() - new Date(tglMasuk).getTime()) / 864e5);
    return Math.floor(days / 7) + umurAwal;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Populasi Ayam (Batch)", description: "Manajemen batch ayam petelur per kandang.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
      setOpen(v);
      if (!v) setEdit(empty);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setEdit(empty), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        "Tambah Batch"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
          edit.id ? "Edit" : "Tambah",
          " Batch"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nama Batch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: edit.nama, onChange: (e) => setEdit({
              ...edit,
              nama: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Strain" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: edit.strain, onChange: (e) => setEdit({
                ...edit,
                strain: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kandang" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.kandangId, onValueChange: (v) => setEdit({
                ...edit,
                kandangId: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih kandang" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: kandang.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k.id, children: k.nama }, k.id)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tgl Masuk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: edit.tglMasuk, onChange: (e) => setEdit({
                ...edit,
                tglMasuk: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Umur Awal (mgg)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: edit.umurAwal || "", onChange: (e) => setEdit({
                ...edit,
                umurAwal: +e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jumlah Awal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: edit.jumlahAwal || "", onChange: (e) => setEdit({
                ...edit,
                jumlahAwal: +e.target.value
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jumlah Aktif" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: edit.jumlahAktif || "", onChange: (e) => setEdit({
                ...edit,
                jumlahAktif: +e.target.value
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Aktif", children: "Aktif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Afkir", children: "Afkir" })
                ] })
              ] })
            ] })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama Batch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Strain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kandang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tgl Masuk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Umur (mgg)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Awal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aktif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-24", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: batch.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: b.nama }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: b.strain }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: kandang.find((k) => k.id === b.kandangId)?.nama ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: b.tglMasuk }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: umur(b.tglMasuk, b.umurAwal) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: formatNumber(b.jumlahAwal) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-medium", children: formatNumber(b.jumlahAktif) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: b.status === "Aktif" ? "default" : "secondary", children: b.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
            setEdit(b);
            setOpen(true);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(b.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] }) })
      ] }, b.id)) })
    ] }) }) })
  ] });
}
export {
  Populasi as component
};
