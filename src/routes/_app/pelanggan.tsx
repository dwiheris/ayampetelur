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
import type { Pelanggan } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/pelanggan")({ component: PelangganPage });

// TODO(supabase): Pelanggan belum masuk schema awal; migrasikan sebelum penjualan real dipakai luas.
const empty: Pelanggan = { id: "", nama: "", telp: "", alamat: "", jenis: "Reseller" };

function PelangganPage() {
  const { pelanggan, setPelanggan } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Pelanggan>(empty);

  const save = () => {
    if (!edit.nama) return toast.error("Isi nama");
    if (edit.id) setPelanggan(pelanggan.map((p) => (p.id === edit.id ? edit : p)));
    else setPelanggan([...pelanggan, { ...edit, id: `c${Date.now()}` }]);
    toast.success("Disimpan");
    setOpen(false);
    setEdit(empty);
  };

  return (
    <>
      <PageHeader
        title="Pelanggan"
        description="Master data pelanggan."
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
                Tambah Pelanggan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{edit.id ? "Edit" : "Tambah"} Pelanggan</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label>Nama</Label>
                  <Input
                    value={edit.nama}
                    onChange={(e) => setEdit({ ...edit, nama: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Telp</Label>
                    <Input
                      value={edit.telp}
                      onChange={(e) => setEdit({ ...edit, telp: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Jenis</Label>
                    <Select
                      value={edit.jenis}
                      onValueChange={(v) => setEdit({ ...edit, jenis: v as Pelanggan["jenis"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reseller">Reseller</SelectItem>
                        <SelectItem value="Pasar">Pasar</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Alamat</Label>
                  <Input
                    value={edit.alamat}
                    onChange={(e) => setEdit({ ...edit, alamat: e.target.value })}
                  />
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
                <TableHead>Nama</TableHead>
                <TableHead>Telp</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pelanggan.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nama}</TableCell>
                  <TableCell>{p.telp}</TableCell>
                  <TableCell>{p.alamat}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{p.jenis}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEdit(p);
                          setOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setPelanggan(pelanggan.filter((x) => x.id !== p.id));
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
        </CardContent>
      </Card>
    </>
  );
}
