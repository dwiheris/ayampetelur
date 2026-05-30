import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { BarangGudang } from "@/lib/mock-data";
import { formatNumber } from "@/lib/mock-data";
import { logActivitySoon } from "@/lib/activity-logs";

export const Route = createFileRoute("/_app/gudang")({ component: GudangPage });

// TODO(supabase): Gudang belum masuk schema awal; migrasikan setelah modul pakan/stok stabil.
const empty: BarangGudang = {
  id: "",
  nama: "",
  kategori: "Pakan",
  stok: 0,
  satuan: "kg",
  minStok: 0,
};
const kategori: BarangGudang["kategori"][] = [
  "Pakan",
  "Obat",
  "Vitamin",
  "Vaksin",
  "Egg Tray",
  "Peralatan",
];

function GudangPage() {
  const { gudang, setGudang } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<BarangGudang>(empty);
  const [filter, setFilter] = useState("all");

  const filtered = gudang.filter((g) => filter === "all" || g.kategori === filter);

  const save = () => {
    if (!edit.nama) return toast.error("Isi nama");
    if (edit.id) {
      setGudang(gudang.map((x) => (x.id === edit.id ? edit : x)));
      logActivitySoon({
        module: "gudang",
        action: "edit data",
        description: `Edit barang gudang ${edit.nama}`,
        metadata: { id: edit.id },
      });
    } else {
      const id = `g${Date.now()}`;
      setGudang([...gudang, { ...edit, id }]);
      logActivitySoon({
        module: "gudang",
        action: "tambah data",
        description: `Tambah barang gudang ${edit.nama}`,
        metadata: { id },
      });
    }
    toast.success("Disimpan");
    setOpen(false);
    setEdit(empty);
  };

  return (
    <>
      <PageHeader
        title="Gudang"
        description="Manajemen barang gudang & stok minimum."
        actions={
          <Dialog
            open={open}
            onOpenChange={(v) => {
              setOpen(v);
              if (!v) setEdit(empty);
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1 h-4 w-4" />
                Tambah Barang
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{edit.id ? "Edit" : "Tambah"} Barang</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label>Nama Barang</Label>
                  <Input
                    value={edit.nama}
                    onChange={(e) => setEdit({ ...edit, nama: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Kategori</Label>
                    <Select
                      value={edit.kategori}
                      onValueChange={(v) =>
                        setEdit({ ...edit, kategori: v as BarangGudang["kategori"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {kategori.map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Satuan</Label>
                    <Input
                      value={edit.satuan}
                      onChange={(e) => setEdit({ ...edit, satuan: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Stok</Label>
                    <Input
                      type="number"
                      value={edit.stok || ""}
                      onChange={(e) => setEdit({ ...edit, stok: +e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Min Stok</Label>
                    <Input
                      type="number"
                      value={edit.minStok || ""}
                      onChange={(e) => setEdit({ ...edit, minStok: +e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Batal
                </Button>
                <Button onClick={save}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <Card>
        <CardContent className="p-4 space-y-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {kategori.map((k) => (
                <SelectItem key={k} value={k}>
                  {k}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Stok</TableHead>
                  <TableHead>Satuan</TableHead>
                  <TableHead className="text-right">Min Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Belum ada data gudang
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell className="font-medium">{g.nama}</TableCell>
                    <TableCell>{g.kategori}</TableCell>
                    <TableCell className="text-right">{formatNumber(g.stok)}</TableCell>
                    <TableCell>{g.satuan}</TableCell>
                    <TableCell className="text-right">{formatNumber(g.minStok)}</TableCell>
                    <TableCell>
                      {g.stok < g.minStok ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Rendah
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Aman</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEdit(g);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setGudang(gudang.filter((x) => x.id !== g.id));
                            logActivitySoon({
                              module: "gudang",
                              action: "hapus data",
                              description: `Hapus barang gudang ${g.nama}`,
                              metadata: { id: g.id },
                            });
                            toast.success("Dihapus");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
