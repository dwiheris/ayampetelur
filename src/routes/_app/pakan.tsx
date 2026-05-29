import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Pencil, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { Pakan, PemakaianPakan } from "@/lib/mock-data";
import { formatNumber, formatRupiah } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/pakan")({ component: PakanPage });

const emptyP: Pakan = { id: "", nama: "", jenis: "Layer", stok: 0, minStok: 0, harga: 0 };
const emptyU: PemakaianPakan = { id: "", tanggal: new Date().toISOString().slice(0, 10), kandangId: "", pakanId: "", jumlah: 0 };

function PakanPage() {
  const { pakan, setPakan, pemakaian, setPemakaian, kandang, batch } = useStore();
  const [openP, setOpenP] = useState(false); const [editP, setEditP] = useState<Pakan>(emptyP);
  const [openU, setOpenU] = useState(false); const [editU, setEditU] = useState<PemakaianPakan>(emptyU);

  const saveP = () => {
    if (!editP.nama) return toast.error("Isi nama");
    if (editP.id) setPakan(pakan.map((p) => p.id === editP.id ? editP : p));
    else setPakan([...pakan, { ...editP, id: `pk${Date.now()}` }]);
    toast.success("Pakan disimpan"); setOpenP(false); setEditP(emptyP);
  };
  const saveU = () => {
    if (!editU.kandangId || !editU.pakanId || editU.jumlah <= 0) return toast.error("Lengkapi data");
    const p = pakan.find(x => x.id === editU.pakanId);
    if (!p) return;
    if (p.stok < editU.jumlah) return toast.error("Stok pakan tidak cukup");
    setPemakaian([...pemakaian, { ...editU, id: `pp${Date.now()}` }]);
    setPakan(pakan.map(x => x.id === editU.pakanId ? { ...x, stok: x.stok - editU.jumlah } : x));
    toast.success("Pemakaian tercatat & stok dikurangi");
    setOpenU(false); setEditU(emptyU);
  };

  const gramPerEkor = (u: PemakaianPakan) => {
    const b = batch.find(bb => bb.kandangId === u.kandangId && bb.status === "Aktif");
    return b && b.jumlahAktif > 0 ? ((u.jumlah * 1000) / b.jumlahAktif).toFixed(1) + " g" : "—";
  };

  return (
    <>
      <PageHeader title="Manajemen Pakan" description="Master data pakan, stok, dan pemakaian harian." />

      <Tabs defaultValue="stok">
        <TabsList>
          <TabsTrigger value="stok">Master & Stok</TabsTrigger>
          <TabsTrigger value="pemakaian">Pemakaian Harian</TabsTrigger>
        </TabsList>

        <TabsContent value="stok" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={openP} onOpenChange={(v) => { setOpenP(v); if (!v) setEditP(emptyP); }}>
              <DialogTrigger asChild><Button><Plus className="mr-1 h-4 w-4" />Tambah Pakan</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>{editP.id ? "Edit" : "Tambah"} Pakan</DialogTitle></DialogHeader>
                <div className="grid gap-3">
                  <div className="grid gap-2"><Label>Nama</Label><Input value={editP.nama} onChange={(e) => setEditP({ ...editP, nama: e.target.value })} /></div>
                  <div className="grid gap-2"><Label>Jenis</Label><Input value={editP.jenis} onChange={(e) => setEditP({ ...editP, jenis: e.target.value })} /></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="grid gap-2"><Label>Stok (kg)</Label><Input type="number" value={editP.stok || ""} onChange={(e) => setEditP({ ...editP, stok: +e.target.value })} /></div>
                    <div className="grid gap-2"><Label>Min Stok</Label><Input type="number" value={editP.minStok || ""} onChange={(e) => setEditP({ ...editP, minStok: +e.target.value })} /></div>
                    <div className="grid gap-2"><Label>Harga/kg</Label><Input type="number" value={editP.harga || ""} onChange={(e) => setEditP({ ...editP, harga: +e.target.value })} /></div>
                  </div>
                </div>
                <DialogFooter><Button variant="outline" onClick={() => setOpenP(false)}>Batal</Button><Button onClick={saveP}>Simpan</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Card><CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Nama Pakan</TableHead><TableHead>Jenis</TableHead>
                <TableHead className="text-right">Stok (kg)</TableHead><TableHead className="text-right">Min Stok</TableHead>
                <TableHead className="text-right">Harga/kg</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Aksi</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {pakan.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.nama}</TableCell>
                    <TableCell>{p.jenis}</TableCell>
                    <TableCell className="text-right">{formatNumber(p.stok)}</TableCell>
                    <TableCell className="text-right">{formatNumber(p.minStok)}</TableCell>
                    <TableCell className="text-right">{formatRupiah(p.harga)}</TableCell>
                    <TableCell>{p.stok < p.minStok
                      ? <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Rendah</Badge>
                      : <Badge variant="secondary">Aman</Badge>}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEditP(p); setOpenP(true); }}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => { setPakan(pakan.filter(x => x.id !== p.id)); toast.success("Dihapus"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="pemakaian" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={openU} onOpenChange={(v) => { setOpenU(v); if (!v) setEditU(emptyU); }}>
              <DialogTrigger asChild><Button><Plus className="mr-1 h-4 w-4" />Input Pemakaian</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Input Pemakaian Pakan</DialogTitle></DialogHeader>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2"><Label>Tanggal</Label><Input type="date" value={editU.tanggal} onChange={(e) => setEditU({ ...editU, tanggal: e.target.value })} /></div>
                    <div className="grid gap-2"><Label>Jumlah (kg)</Label><Input type="number" value={editU.jumlah || ""} onChange={(e) => setEditU({ ...editU, jumlah: +e.target.value })} /></div>
                  </div>
                  <div className="grid gap-2"><Label>Kandang</Label>
                    <Select value={editU.kandangId} onValueChange={(v) => setEditU({ ...editU, kandangId: v })}>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>{kandang.map((k) => <SelectItem key={k.id} value={k.id}>{k.nama}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2"><Label>Pakan</Label>
                    <Select value={editU.pakanId} onValueChange={(v) => setEditU({ ...editU, pakanId: v })}>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>{pakan.map((p) => <SelectItem key={p.id} value={p.id}>{p.nama} (stok {formatNumber(p.stok)} kg)</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter><Button variant="outline" onClick={() => setOpenU(false)}>Batal</Button><Button onClick={saveU}>Simpan</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Card><CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Tanggal</TableHead><TableHead>Kandang</TableHead><TableHead>Pakan</TableHead>
                <TableHead className="text-right">Jumlah (kg)</TableHead><TableHead className="text-right">Per Ekor</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {[...pemakaian].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.tanggal}</TableCell>
                    <TableCell>{kandang.find(k => k.id === u.kandangId)?.nama ?? "—"}</TableCell>
                    <TableCell>{pakan.find(p => p.id === u.pakanId)?.nama ?? "—"}</TableCell>
                    <TableCell className="text-right">{formatNumber(u.jumlah)}</TableCell>
                    <TableCell className="text-right">{gramPerEkor(u)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
