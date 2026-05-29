import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Kesehatan } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/kesehatan")({ component: KesehatanPage });

const empty: Kesehatan = { id: "", tanggal: new Date().toISOString().slice(0, 10), kandangId: "", jenis: "Mati", jumlah: 1, penyebab: "", tindakan: "" };

function KesehatanPage() {
  const { kesehatan, setKesehatan, kandang, batch, setBatch } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Kesehatan>(empty);

  const save = () => {
    if (!edit.kandangId || !edit.jumlah) return toast.error("Lengkapi data");
    setKesehatan([...kesehatan, { ...edit, id: `h${Date.now()}` }]);
    if (edit.jenis === "Mati" || edit.jenis === "Afkir") {
      setBatch(batch.map(b => b.kandangId === edit.kandangId && b.status === "Aktif"
        ? { ...b, jumlahAktif: Math.max(0, b.jumlahAktif - edit.jumlah) } : b));
    }
    toast.success("Data kesehatan tercatat");
    setOpen(false); setEdit(empty);
  };

  return (
    <>
      <PageHeader title="Kesehatan Ayam" description="Catat ayam mati, sakit, afkir, dan tindakan."
        actions={
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEdit(empty); }}>
            <DialogTrigger asChild><Button><Plus className="mr-1 h-4 w-4" />Input Kejadian</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Input Kejadian Kesehatan</DialogTitle></DialogHeader>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2"><Label>Tanggal</Label><Input type="date" value={edit.tanggal} onChange={(e) => setEdit({ ...edit, tanggal: e.target.value })} /></div>
                  <div className="grid gap-2"><Label>Jenis</Label>
                    <Select value={edit.jenis} onValueChange={(v) => setEdit({ ...edit, jenis: v as Kesehatan["jenis"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="Mati">Mati</SelectItem><SelectItem value="Sakit">Sakit</SelectItem><SelectItem value="Afkir">Afkir</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2"><Label>Kandang</Label>
                    <Select value={edit.kandangId} onValueChange={(v) => setEdit({ ...edit, kandangId: v })}>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>{kandang.map((k) => <SelectItem key={k.id} value={k.id}>{k.nama}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2"><Label>Jumlah (ekor)</Label><Input type="number" value={edit.jumlah || ""} onChange={(e) => setEdit({ ...edit, jumlah: +e.target.value })} /></div>
                </div>
                <div className="grid gap-2"><Label>Penyebab</Label><Input value={edit.penyebab} onChange={(e) => setEdit({ ...edit, penyebab: e.target.value })} /></div>
                <div className="grid gap-2"><Label>Tindakan</Label><Input value={edit.tindakan} onChange={(e) => setEdit({ ...edit, tindakan: e.target.value })} /></div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button onClick={save}>Simpan</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <Card><CardContent className="p-4 overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Tanggal</TableHead><TableHead>Kandang</TableHead><TableHead>Jenis</TableHead>
            <TableHead className="text-right">Jumlah</TableHead><TableHead>Penyebab</TableHead><TableHead>Tindakan</TableHead><TableHead className="w-16">Aksi</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {[...kesehatan].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).map((h) => (
              <TableRow key={h.id}>
                <TableCell>{h.tanggal}</TableCell>
                <TableCell>{kandang.find(k => k.id === h.kandangId)?.nama ?? "—"}</TableCell>
                <TableCell><Badge variant={h.jenis === "Mati" ? "destructive" : h.jenis === "Sakit" ? "outline" : "secondary"}>{h.jenis}</Badge></TableCell>
                <TableCell className="text-right">{h.jumlah}</TableCell>
                <TableCell>{h.penyebab}</TableCell>
                <TableCell>{h.tindakan}</TableCell>
                <TableCell><Button size="icon" variant="ghost" onClick={() => { setKesehatan(kesehatan.filter(x => x.id !== h.id)); toast.success("Dihapus"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </>
  );
}
