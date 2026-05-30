import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { formatNumber, formatRupiah } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/laporan")({ component: LaporanPage });

// TODO(supabase): Laporan masih membaca store lokal sampai produksi, penjualan, dan keuangan dimigrasikan.
function toCSV(rows: Array<Record<string, unknown>>) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")),
  ].join("\n");
}

function download(name: string, content: string, type = "text/csv") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function LaporanPage() {
  const { produksi, penjualan, transaksi, kesehatan, pakan, kandang } = useStore();
  const hasReportData =
    produksi.length > 0 ||
    penjualan.length > 0 ||
    transaksi.length > 0 ||
    kesehatan.length > 0 ||
    pakan.length > 0;

  const produksiChart = useMemo(() => {
    const map = new Map<string, number>();
    produksi.forEach((p) =>
      map.set(p.tanggal, (map.get(p.tanggal) ?? 0) + p.normal + p.retak + p.kecil + p.jumbo),
    );
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([tanggal, total]) => ({ tanggal: tanggal.slice(5), total }));
  }, [produksi]);

  const labaRugi = useMemo(() => {
    const map = new Map<string, { in: number; out: number }>();
    transaksi.forEach((t) => {
      const e = map.get(t.tanggal) ?? { in: 0, out: 0 };
      if (t.jenis === "Pemasukan") e.in += t.jumlah;
      else e.out += t.jumlah;
      map.set(t.tanggal, e);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([tanggal, v]) => ({
        tanggal: tanggal.slice(5),
        Pemasukan: v.in,
        Pengeluaran: v.out,
        Laba: v.in - v.out,
      }));
  }, [transaksi]);

  const exportProduksi = () => {
    download(
      "laporan-produksi.csv",
      toCSV(
        produksi.map((p) => ({
          ...p,
          total: p.normal + p.retak + p.kecil + p.jumbo,
          kandang: kandang.find((k) => k.id === p.kandangId)?.nama ?? "",
        })),
      ),
    );
    toast.success("CSV diunduh");
  };
  const exportPenjualan = () => {
    download(
      "laporan-penjualan.csv",
      toCSV(penjualan.map((s) => ({ ...s, total: s.jumlahKg * s.hargaSatuan }))),
    );
    toast.success("CSV diunduh");
  };
  const exportKeuangan = () => {
    download("laporan-keuangan.csv", toCSV(transaksi.map((t) => ({ ...t }))));
    toast.success("CSV diunduh");
  };

  const cetakPDF = () => {
    window.print();
    toast.success("Buka dialog cetak — pilih Save as PDF");
  };

  return (
    <>
      <PageHeader
        title="Laporan"
        description="Ringkasan, grafik, dan ekspor laporan."
        actions={
          <>
            <Button variant="outline" onClick={cetakPDF}>
              <FileText className="mr-1 h-4 w-4" />
              Cetak PDF
            </Button>
          </>
        }
      />
      {!hasReportData && (
        <Card>
          <CardContent className="p-5 text-center text-sm text-muted-foreground">
            Belum ada data laporan
          </CardContent>
        </Card>
      )}
      <Tabs defaultValue="produksi">
        <TabsList>
          <TabsTrigger value="produksi">Produksi</TabsTrigger>
          <TabsTrigger value="penjualan">Penjualan</TabsTrigger>
          <TabsTrigger value="keuangan">Laba Rugi</TabsTrigger>
          <TabsTrigger value="mortalitas">Mortalitas & Stok</TabsTrigger>
        </TabsList>

        <TabsContent value="produksi" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" onClick={exportProduksi}>
              <Download className="mr-1 h-4 w-4" />
              Export Excel/CSV
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Grafik Produksi 14 Hari</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={produksiChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="tanggal" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">
                Total produksi tercatat:{" "}
                <span className="font-bold text-foreground">
                  {formatNumber(
                    produksi.reduce((s, p) => s + p.normal + p.retak + p.kecil + p.jumbo, 0),
                  )}{" "}
                  butir
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="penjualan" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" onClick={exportPenjualan}>
              <Download className="mr-1 h-4 w-4" />
              Export Excel/CSV
            </Button>
          </div>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">
                Total penjualan:{" "}
                <span className="font-bold text-foreground">
                  {formatRupiah(penjualan.reduce((s, p) => s + p.jumlahKg * p.hargaSatuan, 0))}
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keuangan" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" onClick={exportKeuangan}>
              <Download className="mr-1 h-4 w-4" />
              Export Excel/CSV
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Pemasukan vs Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={labaRugi}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="tanggal" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Pemasukan" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="Pengeluaran"
                    fill="var(--color-destructive)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mortalitas" className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-2 text-sm">
              <p>
                Total mortalitas:{" "}
                <span className="font-bold">
                  {kesehatan.filter((k) => k.jenis === "Mati").reduce((s, k) => s + k.jumlah, 0)}{" "}
                  ekor
                </span>
              </p>
              <p>
                Total stok pakan:{" "}
                <span className="font-bold">
                  {formatNumber(pakan.reduce((s, p) => s + p.stok, 0))} kg
                </span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
