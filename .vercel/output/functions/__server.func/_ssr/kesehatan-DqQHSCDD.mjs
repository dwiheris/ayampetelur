import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useStore } from "./router-BtGSnx8t.mjs";
import { P as PageHeader } from "./page-header-BU64Q1Cx.mjs";
import { C as Card, a as CardContent } from "./card-uop7ST8s.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-DhIrzwGX.mjs";
import { D as Dialog, e as DialogTrigger, a as DialogContent, c as DialogHeader, d as DialogTitle, S as Select, h as SelectTrigger, i as SelectValue, f as SelectContent, g as SelectItem, b as DialogFooter } from "./select-DhN13T2l.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
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
  kandangId: "",
  jenis: "Mati",
  jumlah: 1,
  penyebab: "",
  tindakan: ""
};
function KesehatanPage() {
  const {
    kesehatan,
    setKesehatan,
    kandang,
    batch,
    setBatch
  } = useStore();
  const [open, setOpen] = reactExports.useState(false);
  const [edit, setEdit] = reactExports.useState(empty);
  const save = () => {
    if (!edit.kandangId || !edit.jumlah) return toast.error("Lengkapi data");
    setKesehatan([...kesehatan, {
      ...edit,
      id: `h${Date.now()}`
    }]);
    if (edit.jenis === "Mati" || edit.jenis === "Afkir") {
      setBatch(batch.map((b) => b.kandangId === edit.kandangId && b.status === "Aktif" ? {
        ...b,
        jumlahAktif: Math.max(0, b.jumlahAktif - edit.jumlah)
      } : b));
    }
    toast.success("Data kesehatan tercatat");
    setOpen(false);
    setEdit(empty);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Kesehatan Ayam", description: "Catat ayam mati, sakit, afkir, dan tindakan.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
      setOpen(v);
      if (!v) setEdit(empty);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        "Input Kejadian"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Input Kejadian Kesehatan" }) }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jenis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.jenis, onValueChange: (v) => setEdit({
                ...edit,
                jenis: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Mati", children: "Mati" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Sakit", children: "Sakit" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Afkir", children: "Afkir" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kandang" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.kandangId, onValueChange: (v) => setEdit({
                ...edit,
                kandangId: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: kandang.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k.id, children: k.nama }, k.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jumlah (ekor)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: edit.jumlah || "", onChange: (e) => setEdit({
                ...edit,
                jumlah: +e.target.value
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Penyebab" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: edit.penyebab, onChange: (e) => setEdit({
              ...edit,
              penyebab: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tindakan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: edit.tindakan, onChange: (e) => setEdit({
              ...edit,
              tindakan: e.target.value
            }) })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kandang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jenis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Jumlah" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Penyebab" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tindakan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: [...kesehatan].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: h.tanggal }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: kandang.find((k) => k.id === h.kandangId)?.nama ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: h.jenis === "Mati" ? "destructive" : h.jenis === "Sakit" ? "outline" : "secondary", children: h.jenis }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: h.jumlah }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: h.penyebab }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: h.tindakan }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
          setKesehatan(kesehatan.filter((x) => x.id !== h.id));
          toast.success("Dihapus");
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
      ] }, h.id)) })
    ] }) }) })
  ] });
}
export {
  KesehatanPage as component
};
