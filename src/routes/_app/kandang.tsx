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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import type { Kandang } from "@/lib/mock-data";
import { formatNumber } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/kandang")({ component: KandangPage });

const empty: Kandang = { id: "", nama: "", kapasitas: 0, lokasi: "", jenis: "Battery", status: "Aktif", pj: "" };

function KandangPage() {
  const { kandang, setKandang } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Kandang>(empty);

  const filtered = kandang.filter((k) =>
    [k.nama, k.lokasi, k.pj, k.jenis].some((v) => v.toLowerCase().includes(q.toLowerCase()))
  );

  const save = () => {
    if (!edit.nama || edit.kapasitas <= 0) return toast.error("Lengkapi data");
    if (edit.id) {
      setKandang(kandang.map((k) => (k.id === edit.id ? edit : k)));
      toast.success("Kandang diperbarui");
    } else {
      setKandang([...kandang, { ...edit, id: `k${Date.now()}` }]);
      toast.success("Kandang ditambahkan");
    }
    setOpen(false); setEdit(empty);
  };

  const remove = (id: string) => {
    setKandang(kandang.filter((k) => k.id !== id));
    toast.success("Kandang dihapus");
  };

  return (
    <>
      <PageHeader
        title="Manajemen Kandang"
        description="Kelola data kandang ayam petelur."
        actions={
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEdit(empty); }}>
            <DialogTrigger asChild>
              <Button onClick={() => setEdit(empty)}><Plus className="mr-1 h-4 w-4" />Tambah Kandang</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{edit.id ? "Edit" : "Tambah"} Kandang</DialogTitle></DialogHeader>
              <div className="grid gap-3">
                <div className="grid gap-2"><Label>Nama</Label><Input value={edit.nama} onChange={(e) => setEdit({ ...edit, nama: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2"><Label>Kapasitas</Label><Input type="number" value={edit.kapasitas || ""} onChange={(e) => setEdit({ ...edit, kapasitas: +e.target.value })} /></div>
                  <div className="grid gap-2"><Label>Penanggung Jawab</Label><Input value={edit.pj} onChange={(e) => setEdit({ ...edit, pj: e.target.value })} /></div>
                </div>
                <div className="grid gap-2"><Label>Lokasi</Label><Input value={edit.lokasi} onChange={(e) => setEdit({ ...edit, lokasi: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2"><Label>Jenis</Label>
                    <Select value={edit.jenis} onValueChange={(v) => setEdit({ ...edit, jenis: v as Kandang["jenis"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Battery">Battery</SelectItem>
                        <SelectItem value="Postal">Postal</SelectItem>
                        <SelectItem value="Free Range">Free Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2"><Label>Status</Label>
                    <Select value={edit.status} onValueChange={(v) => setEdit({ ...edit, status: v as Kandang["status"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Kosong">Kosong</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                <Button onClick={save}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari kandang..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-8" />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead className="text-right">Kapasitas</TableHead>
                  <TableHead>PJ</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell className="font-medium">{k.nama}</TableCell>
                    <TableCell>{k.lokasi}</TableCell>
                    <TableCell>{k.jenis}</TableCell>
                    <TableCell className="text-right">{formatNumber(k.kapasitas)}</TableCell>
                    <TableCell>{k.pj}</TableCell>
                    <TableCell>
                      <Badge variant={k.status === "Aktif" ? "default" : k.status === "Maintenance" ? "destructive" : "secondary"}>{k.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEdit(k); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => remove(k.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Tidak ada data</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
