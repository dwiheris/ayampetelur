import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Produksi } from "@/lib/mock-data";
import { formatNumber } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/produksi")({ component: ProduksiPage });

// TODO(supabase): Migrasikan modul ini ke tabel produksi_telur dan stok_telur.
const empty: Produksi = {
  id: "",
  tanggal: new Date().toISOString().slice(0, 10),
  kandangId: "",
  normal: 0,
  retak: 0,
  kecil: 0,
  jumbo: 0,
  berat: 0,
  catatan: "",
};

function ProduksiPage() {
  const { produksi, setProduksi, kandang, batch, stokTelur, setStokTelur } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Produksi>(empty);
  const [filterKandang, setFilterKandang] = useState("all");

  const filtered = useMemo(
    () =>
      [...produksi]
        .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
        .filter((p) => filterKandang === "all" || p.kandangId === filterKandang),
    [produksi, filterKandang],
  );

  const save = () => {
    if (!edit.kandangId) return toast.error("Pilih kandang");
    const total = edit.normal + edit.retak + edit.kecil + edit.jumbo;
    if (total <= 0) return toast.error("Total telur harus > 0");
    setProduksi([...produksi, { ...edit, id: `p${Date.now()}` }]);
    setStokTelur({
      ...stokTelur,
      normal: stokTelur.normal + edit.normal,
      retak: stokTelur.retak + edit.retak,
      kecil: stokTelur.kecil + edit.kecil,
      jumbo: stokTelur.jumbo + edit.jumbo,
    });
    toast.success("Produksi tercatat & stok telur diperbarui");
    setOpen(false);
    setEdit(empty);
  };

  const remove = (id: string) => {
    setProduksi(produksi.filter((p) => p.id !== id));
    toast.success("Dihapus");
  };

  const hdp = (p: Produksi) => {
    const b = batch.find((bb) => bb.kandangId === p.kandangId && bb.status === "Aktif");
    const total = p.normal + p.retak + p.kecil + p.jumbo;
    return b && b.jumlahAktif > 0 ? ((total / b.jumlahAktif) * 100).toFixed(1) + "%" : "—";
  };
  const total = edit.normal + edit.retak + edit.kecil + edit.jumbo;

  return (
    <>
      <PageHeader
        title="Produksi Telur Harian"
        description="Catat produksi telur per kandang; stok telur dan HDP terhitung otomatis."
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
                Input Produksi
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Input Produksi Telur</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Tanggal</Label>
                    <Input
                      type="date"
                      value={edit.tanggal}
                      onChange={(e) => setEdit({ ...edit, tanggal: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Kandang</Label>
                    <Select
                      value={edit.kandangId}
                      onValueChange={(v) => setEdit({ ...edit, kandangId: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Telur Normal</Label>
                    <Input
                      type="number"
                      value={edit.normal || ""}
                      onChange={(e) => setEdit({ ...edit, normal: +e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Telur Retak</Label>
                    <Input
                      type="number"
                      value={edit.retak || ""}
                      onChange={(e) => setEdit({ ...edit, retak: +e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Telur Kecil</Label>
                    <Input
                      type="number"
                      value={edit.kecil || ""}
                      onChange={(e) => setEdit({ ...edit, kecil: +e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Telur Jumbo</Label>
                    <Input
                      type="number"
                      value={edit.jumbo || ""}
                      onChange={(e) => setEdit({ ...edit, jumbo: +e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Berat Total (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={edit.berat || ""}
                    onChange={(e) => setEdit({ ...edit, berat: +e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Catatan</Label>
                  <Input
                    value={edit.catatan ?? ""}
                    onChange={(e) => setEdit({ ...edit, catatan: e.target.value })}
                  />
                </div>
                <div className="rounded-md bg-muted px-3 py-2 text-sm">
                  Total telur: <span className="font-semibold">{formatNumber(total)} butir</span>
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
          <div className="flex flex-wrap gap-2">
            <Select value={filterKandang} onValueChange={setFilterKandang}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kandang</SelectItem>
                {kandang.map((k) => (
                  <SelectItem key={k.id} value={k.id}>
                    {k.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Kandang</TableHead>
                  <TableHead className="text-right">Normal</TableHead>
                  <TableHead className="text-right">Retak</TableHead>
                  <TableHead className="text-right">Kecil</TableHead>
                  <TableHead className="text-right">Jumbo</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Berat (kg)</TableHead>
                  <TableHead className="text-right">HDP</TableHead>
                  <TableHead className="w-16">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.slice(0, 100).map((p) => {
                  const t = p.normal + p.retak + p.kecil + p.jumbo;
                  return (
                    <TableRow key={p.id}>
                      <TableCell>{p.tanggal}</TableCell>
                      <TableCell>
                        {kandang.find((k) => k.id === p.kandangId)?.nama ?? "—"}
                      </TableCell>
                      <TableCell className="text-right">{formatNumber(p.normal)}</TableCell>
                      <TableCell className="text-right">{formatNumber(p.retak)}</TableCell>
                      <TableCell className="text-right">{formatNumber(p.kecil)}</TableCell>
                      <TableCell className="text-right">{formatNumber(p.jumbo)}</TableCell>
                      <TableCell className="text-right font-semibold">{formatNumber(t)}</TableCell>
                      <TableCell className="text-right">{p.berat.toFixed(1)}</TableCell>
                      <TableCell className="text-right">{hdp(p)}</TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost" onClick={() => remove(p.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
