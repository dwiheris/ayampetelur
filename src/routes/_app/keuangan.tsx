import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Transaksi } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/keuangan")({ component: KeuanganPage });

// TODO(supabase): Migrasikan modul ini ke tabel keuangan dengan owner_id auth.uid().
const empty: Transaksi = {
  id: "",
  tanggal: new Date().toISOString().slice(0, 10),
  jenis: "Pengeluaran",
  kategori: "Pakan",
  jumlah: 0,
  catatan: "",
};
const kategoriOut = [
  "Pakan",
  "Obat & Vitamin",
  "Gaji Karyawan",
  "Listrik",
  "Air",
  "Transport",
  "Perawatan Kandang",
  "Lainnya",
];
const kategoriIn = ["Penjualan Telur", "Penjualan Ayam Afkir", "Lainnya"];

function KeuanganPage() {
  const { transaksi, setTransaksi } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Transaksi>(empty);

  const save = () => {
    if (edit.jumlah <= 0) return toast.error("Jumlah harus > 0");
    setTransaksi([...transaksi, { ...edit, id: `t${Date.now()}` }]);
    toast.success("Tersimpan");
    setOpen(false);
    setEdit(empty);
  };

  const { pemasukan, pengeluaran, laba } = useMemo(() => {
    const p = transaksi.filter((t) => t.jenis === "Pemasukan").reduce((s, t) => s + t.jumlah, 0);
    const q = transaksi.filter((t) => t.jenis === "Pengeluaran").reduce((s, t) => s + t.jumlah, 0);
    return { pemasukan: p, pengeluaran: q, laba: p - q };
  }, [transaksi]);

  return (
    <>
      <PageHeader
        title="Keuangan"
        description="Pemasukan, pengeluaran, dan laba rugi."
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
                Tambah Transaksi
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transaksi Baru</DialogTitle>
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
                    <Label>Jenis</Label>
                    <Select
                      value={edit.jenis}
                      onValueChange={(v) =>
                        setEdit({
                          ...edit,
                          jenis: v as Transaksi["jenis"],
                          kategori: v === "Pemasukan" ? "Penjualan Telur" : "Pakan",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pemasukan">Pemasukan</SelectItem>
                        <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Kategori</Label>
                    <Select
                      value={edit.kategori}
                      onValueChange={(v) => setEdit({ ...edit, kategori: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(edit.jenis === "Pemasukan" ? kategoriIn : kategoriOut).map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Jumlah</Label>
                    <Input
                      type="number"
                      value={edit.jumlah || ""}
                      onChange={(e) => setEdit({ ...edit, jumlah: +e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Catatan</Label>
                  <Input
                    value={edit.catatan ?? ""}
                    onChange={(e) => setEdit({ ...edit, catatan: e.target.value })}
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Total Pemasukan</p>
            <p className="mt-2 text-2xl font-bold text-success">{formatRupiah(pemasukan)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Total Pengeluaran</p>
            <p className="mt-2 text-2xl font-bold text-destructive">{formatRupiah(pengeluaran)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Laba Bersih</p>
            <p
              className={`mt-2 text-2xl font-bold ${laba >= 0 ? "text-success" : "text-destructive"}`}
            >
              {formatRupiah(laba)}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="w-16">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaksi.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Belum ada data transaksi
                  </TableCell>
                </TableRow>
              )}
              {[...transaksi]
                .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
                .map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.tanggal}</TableCell>
                    <TableCell>
                      <Badge variant={t.jenis === "Pemasukan" ? "default" : "destructive"}>
                        {t.jenis}
                      </Badge>
                    </TableCell>
                    <TableCell>{t.kategori}</TableCell>
                    <TableCell>{t.catatan}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${t.jenis === "Pemasukan" ? "text-success" : "text-destructive"}`}
                    >
                      {t.jenis === "Pemasukan" ? "+" : "−"}
                      {formatRupiah(t.jumlah)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setTransaksi(transaksi.filter((x) => x.id !== t.id));
                          toast.success("Dihapus");
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
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
