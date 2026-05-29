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
import { Plus, Trash2, Printer } from "lucide-react";
import { toast } from "sonner";
import type { Penjualan } from "@/lib/mock-data";
import { formatNumber, formatRupiah } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/penjualan")({ component: PenjualanPage });

const empty: Penjualan = { id: "", tanggal: new Date().toISOString().slice(0, 10), pelangganId: "", jenisTelur: "Normal", jumlahKg: 0, hargaSatuan: 28000, status: "Lunas" };

function PenjualanPage() {
  const { penjualan, setPenjualan, pelanggan, transaksi, setTransaksi } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Penjualan>(empty);

  const save = () => {
    if (!edit.pelangganId || edit.jumlahKg <= 0) return toast.error("Lengkapi data");
    const id = `s${Date.now()}`;
    setPenjualan([...penjualan, { ...edit, id }]);
    if (edit.status === "Lunas") {
      setTransaksi([...transaksi, {
        id: `t${Date.now()}`, tanggal: edit.tanggal, jenis: "Pemasukan",
        kategori: "Penjualan Telur", jumlah: edit.jumlahKg * edit.hargaSatuan,
        catatan: `Invoice ${id}`,
      }]);
    }
    toast.success("Transaksi tersimpan");
    setOpen(false); setEdit(empty);
  };

  const cetak = (s: Penjualan) => {
    const c = pelanggan.find(p => p.id === s.pelangganId);
    const total = s.jumlahKg * s.hargaSatuan;
    const w = window.open("", "_blank", "width=600,height=800");
    if (!w) return;
    w.document.write(`
      <html><head><title>Invoice ${s.id}</title>
      <style>body{font-family:system-ui;padding:32px;color:#333}h1{color:#a8550c}table{width:100%;border-collapse:collapse;margin-top:16px}td,th{padding:8px;border-bottom:1px solid #ddd;text-align:left}</style>
      </head><body>
      <h1>Telurku — Invoice</h1>
      <p><b>No:</b> ${s.id}<br><b>Tanggal:</b> ${s.tanggal}<br><b>Pelanggan:</b> ${c?.nama ?? "-"}<br><b>Alamat:</b> ${c?.alamat ?? "-"}</p>
      <table><tr><th>Item</th><th>Qty</th><th>Harga</th><th>Total</th></tr>
      <tr><td>Telur ${s.jenisTelur}</td><td>${s.jumlahKg} kg</td><td>${formatRupiah(s.hargaSatuan)}</td><td>${formatRupiah(total)}</td></tr>
      <tr><td colspan="3" style="text-align:right"><b>Total</b></td><td><b>${formatRupiah(total)}</b></td></tr>
      <tr><td colspan="3" style="text-align:right">Status</td><td>${s.status}</td></tr>
      </table>
      <p style="margin-top:32px;text-align:center;color:#888">Terima kasih atas kepercayaan Anda.</p>
      <script>window.print()</script>
      </body></html>`);
    w.document.close();
  };

  const total = edit.jumlahKg * edit.hargaSatuan;

  return (
    <>
      <PageHeader title="Penjualan" description="Transaksi penjualan telur dan cetak invoice."
        actions={
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEdit(empty); }}>
            <DialogTrigger asChild><Button><Plus className="mr-1 h-4 w-4" />Transaksi Baru</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Penjualan Baru</DialogTitle></DialogHeader>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2"><Label>Tanggal</Label><Input type="date" value={edit.tanggal} onChange={(e) => setEdit({ ...edit, tanggal: e.target.value })} /></div>
                  <div className="grid gap-2"><Label>Pelanggan</Label>
                    <Select value={edit.pelangganId} onValueChange={(v) => setEdit({ ...edit, pelangganId: v })}>
                      <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                      <SelectContent>{pelanggan.map(p => <SelectItem key={p.id} value={p.id}>{p.nama}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2"><Label>Jenis Telur</Label>
                    <Select value={edit.jenisTelur} onValueChange={(v) => setEdit({ ...edit, jenisTelur: v as Penjualan["jenisTelur"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem><SelectItem value="Jumbo">Jumbo</SelectItem>
                        <SelectItem value="Kecil">Kecil</SelectItem><SelectItem value="Retak">Retak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2"><Label>Jumlah (kg)</Label><Input type="number" value={edit.jumlahKg || ""} onChange={(e) => setEdit({ ...edit, jumlahKg: +e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2"><Label>Harga/kg</Label><Input type="number" value={edit.hargaSatuan || ""} onChange={(e) => setEdit({ ...edit, hargaSatuan: +e.target.value })} /></div>
                  <div className="grid gap-2"><Label>Status</Label>
                    <Select value={edit.status} onValueChange={(v) => setEdit({ ...edit, status: v as Penjualan["status"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="Lunas">Lunas</SelectItem><SelectItem value="Piutang">Piutang</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="rounded-md bg-muted px-3 py-2">Total: <span className="font-semibold">{formatRupiah(total)}</span></div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button onClick={save}>Simpan</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <Card><CardContent className="p-4 overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Tanggal</TableHead><TableHead>Pelanggan</TableHead><TableHead>Jenis</TableHead>
            <TableHead className="text-right">Jumlah (kg)</TableHead><TableHead className="text-right">Harga</TableHead>
            <TableHead className="text-right">Total</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Aksi</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {[...penjualan].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.tanggal}</TableCell>
                <TableCell>{pelanggan.find(p => p.id === s.pelangganId)?.nama ?? "—"}</TableCell>
                <TableCell>{s.jenisTelur}</TableCell>
                <TableCell className="text-right">{formatNumber(s.jumlahKg)}</TableCell>
                <TableCell className="text-right">{formatRupiah(s.hargaSatuan)}</TableCell>
                <TableCell className="text-right font-semibold">{formatRupiah(s.jumlahKg * s.hargaSatuan)}</TableCell>
                <TableCell><Badge variant={s.status === "Lunas" ? "default" : "outline"}>{s.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => cetak(s)}><Printer className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { setPenjualan(penjualan.filter(x => x.id !== s.id)); toast.success("Dihapus"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </>
  );
}
