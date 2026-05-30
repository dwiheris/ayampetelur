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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Batch } from "@/lib/mock-data";
import { formatNumber } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/populasi")({ component: Populasi });

// TODO(supabase): Migrasikan modul ini ke tabel populasi setelah relasi kandang stabil.
const empty: Batch = {
  id: "",
  nama: "",
  strain: "ISA Brown",
  kandangId: "",
  tglMasuk: new Date().toISOString().slice(0, 10),
  umurAwal: 16,
  jumlahAwal: 0,
  jumlahAktif: 0,
  status: "Aktif",
};

function Populasi() {
  const { batch, setBatch, kandang } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Batch>(empty);

  const save = () => {
    if (!edit.nama || !edit.kandangId) return toast.error("Lengkapi data");
    if (edit.id) {
      setBatch(batch.map((b) => (b.id === edit.id ? edit : b)));
      toast.success("Batch diperbarui");
    } else {
      setBatch([
        ...batch,
        { ...edit, id: `b${Date.now()}`, jumlahAktif: edit.jumlahAktif || edit.jumlahAwal },
      ]);
      toast.success("Batch ditambahkan");
    }
    setOpen(false);
    setEdit(empty);
  };
  const remove = (id: string) => {
    setBatch(batch.filter((b) => b.id !== id));
    toast.success("Dihapus");
  };

  const umur = (tglMasuk: string, umurAwal: number) => {
    const days = Math.floor((Date.now() - new Date(tglMasuk).getTime()) / 86400000);
    return Math.floor(days / 7) + umurAwal;
  };

  return (
    <>
      <PageHeader
        title="Populasi Ayam (Batch)"
        description="Manajemen batch ayam petelur per kandang."
        actions={
          <Dialog
            open={open}
            onOpenChange={(v) => {
              setOpen(v);
              if (!v) setEdit(empty);
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setEdit(empty)}>
                <Plus className="mr-1 h-4 w-4" />
                Tambah Batch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{edit.id ? "Edit" : "Tambah"} Batch</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label>Nama Batch</Label>
                  <Input
                    value={edit.nama}
                    onChange={(e) => setEdit({ ...edit, nama: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Strain</Label>
                    <Input
                      value={edit.strain}
                      onChange={(e) => setEdit({ ...edit, strain: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Kandang</Label>
                    <Select
                      value={edit.kandangId}
                      onValueChange={(v) => setEdit({ ...edit, kandangId: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kandang" />
                      </SelectTrigger>
                      <SelectContent>
                        {kandang.map((k) => (
                          <SelectItem key={k.id} value={k.id}>
                            {k.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="grid gap-2">
                    <Label>Tgl Masuk</Label>
                    <Input
                      type="date"
                      value={edit.tglMasuk}
                      onChange={(e) => setEdit({ ...edit, tglMasuk: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Umur Awal (mgg)</Label>
                    <Input
                      type="number"
                      value={edit.umurAwal || ""}
                      onChange={(e) => setEdit({ ...edit, umurAwal: +e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Jumlah Awal</Label>
                    <Input
                      type="number"
                      value={edit.jumlahAwal || ""}
                      onChange={(e) => setEdit({ ...edit, jumlahAwal: +e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Jumlah Aktif</Label>
                    <Input
                      type="number"
                      value={edit.jumlahAktif || ""}
                      onChange={(e) => setEdit({ ...edit, jumlahAktif: +e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select
                      value={edit.status}
                      onValueChange={(v) => setEdit({ ...edit, status: v as Batch["status"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Afkir">Afkir</SelectItem>
                      </SelectContent>
                    </Select>
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
        <CardContent className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Batch</TableHead>
                <TableHead>Strain</TableHead>
                <TableHead>Kandang</TableHead>
                <TableHead>Tgl Masuk</TableHead>
                <TableHead className="text-right">Umur (mgg)</TableHead>
                <TableHead className="text-right">Awal</TableHead>
                <TableHead className="text-right">Aktif</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batch.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    Belum ada data populasi ayam
                  </TableCell>
                </TableRow>
              )}
              {batch.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.nama}</TableCell>
                  <TableCell>{b.strain}</TableCell>
                  <TableCell>{kandang.find((k) => k.id === b.kandangId)?.nama ?? "—"}</TableCell>
                  <TableCell>{b.tglMasuk}</TableCell>
                  <TableCell className="text-right">{umur(b.tglMasuk, b.umurAwal)}</TableCell>
                  <TableCell className="text-right">{formatNumber(b.jumlahAwal)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(b.jumlahAktif)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={b.status === "Aktif" ? "default" : "secondary"}>
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEdit(b);
                          setOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(b.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
