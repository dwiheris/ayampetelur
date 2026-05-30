import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/mock-data";
import { Egg } from "lucide-react";

export const Route = createFileRoute("/_app/stok-telur")({ component: StokTelurPage });

function StokTelurPage() {
  // TODO(supabase): Migrasikan ringkasan stok ke tabel stok_telur setelah produksi/penjualan real.
  const { stokTelur, produksi, penjualan, kandang } = useStore();
  const items = [
    { label: "Normal", value: stokTelur.normal, tone: "bg-primary/10 text-primary" },
    { label: "Jumbo", value: stokTelur.jumbo, tone: "bg-success/10 text-success" },
    { label: "Kecil", value: stokTelur.kecil, tone: "bg-warning/15 text-warning-foreground" },
    { label: "Retak", value: stokTelur.retak, tone: "bg-destructive/10 text-destructive" },
    { label: "Reject", value: stokTelur.reject, tone: "bg-muted text-muted-foreground" },
  ];

  // build riwayat: produksi (masuk) + penjualan (keluar)
  const riwayat = [
    ...produksi.map((p) => ({
      tanggal: p.tanggal,
      jenis: "Masuk" as const,
      keterangan: `Produksi ${kandang.find((k) => k.id === p.kandangId)?.nama ?? ""}`,
      jumlah: p.normal + p.retak + p.kecil + p.jumbo,
    })),
    ...penjualan.map((s) => ({
      tanggal: s.tanggal,
      jenis: "Keluar" as const,
      keterangan: `Penjualan ${s.jenisTelur}`,
      jumlah: Math.round(s.jumlahKg * 16),
    })),
  ]
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
    .slice(0, 30);

  return (
    <>
      <PageHeader title="Stok Telur" description="Pantauan stok telur per kategori." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {items.map((i) => (
          <Card key={i.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{i.label}</p>
                <p className="mt-1 text-2xl font-bold">{formatNumber(i.value)}</p>
                <p className="text-xs text-muted-foreground">butir</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${i.tone}`}>
                <Egg className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Stok</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riwayat.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.tanggal}</TableCell>
                  <TableCell
                    className={
                      r.jenis === "Masuk"
                        ? "text-success font-medium"
                        : "text-destructive font-medium"
                    }
                  >
                    {r.jenis}
                  </TableCell>
                  <TableCell>{r.keterangan}</TableCell>
                  <TableCell className="text-right">
                    {r.jenis === "Masuk" ? "+" : "−"}
                    {formatNumber(r.jumlah)}
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
