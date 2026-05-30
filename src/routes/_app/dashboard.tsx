import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bird,
  Egg,
  Package,
  Skull,
  TrendingDown,
  TrendingUp,
  Wallet,
  Warehouse,
  Wheat,
} from "lucide-react";
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
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { formatNumber, formatRupiah } from "@/lib/format";
import { getFarms, type Farm } from "@/lib/farms";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

type DashboardHref =
  | "/populasi"
  | "/kandang"
  | "/produksi"
  | "/pakan"
  | "/kesehatan"
  | "/stok-telur"
  | "/penjualan"
  | "/keuangan"
  | "/jadwal";

function Stat({
  icon: Icon,
  label,
  value,
  hint,
  tone = "primary",
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "success" | "warning" | "destructive";
  href: DashboardHref;
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
  }[tone];

  return (
    <Link to={href} aria-label={`Buka halaman ${label}`} className="group block h-full">
      <Card className="h-full transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
        <CardContent className="flex items-center justify-between gap-4 p-5">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          <div className="flex items-center gap-3">
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClass}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function NotificationLink({
  to,
  children,
  className,
}: {
  to: DashboardHref;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Link
      to={to}
      className={`group flex items-start gap-2 rounded-lg border p-3 transition hover:-translate-y-0.5 hover:shadow-sm ${className}`}
    >
      {children}
      <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" />
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-dashed bg-muted/20 p-6 text-center text-sm text-muted-foreground">
      Data belum tersedia, silakan tambah data terlebih dahulu.
    </div>
  );
}

function Dashboard() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoadingFarms, setIsLoadingFarms] = useState(true);
  const [farmError, setFarmError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadFarms() {
      setIsLoadingFarms(true);
      setFarmError(null);

      try {
        const data = await getFarms();
        if (active) setFarms(data);
      } catch (error) {
        if (active) {
          setFarms([]);
          setFarmError(error instanceof Error ? error.message : "Gagal memuat data farm.");
        }
      } finally {
        if (active) setIsLoadingFarms(false);
      }
    }

    loadFarms();

    return () => {
      active = false;
    };
  }, []);

  const chartData = useMemo<Array<{ tanggal: string; total: number }>>(() => [], []);
  const penjualanChart = useMemo<Array<{ tanggal: string; total: number }>>(() => [], []);
  const totalAlert = farmError ? 1 : 0;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Ringkasan operasional peternakan - ${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          href="/populasi"
          icon={Bird}
          label="Farm Terdaftar"
          value={isLoadingFarms ? "..." : formatNumber(farms.length)}
          hint="data aktual dari Supabase"
        />
        <Stat
          href="/kandang"
          icon={Warehouse}
          label="Kandang Aktif"
          value="0"
          hint="Data belum tersedia"
        />
        <Stat
          href="/produksi"
          icon={Egg}
          label="Produksi Telur Hari Ini"
          value={formatNumber(0)}
          hint="Data belum tersedia"
          tone="success"
        />
        <Stat
          href="/produksi"
          icon={TrendingUp}
          label="HDP Rata-rata"
          value="0.0%"
          hint="Data belum tersedia"
          tone="success"
        />
        <Stat
          href="/pakan"
          icon={Wheat}
          label="Konsumsi Pakan"
          value={`${formatNumber(0)} kg`}
          hint="Data belum tersedia"
        />
        <Stat
          href="/kesehatan"
          icon={Skull}
          label="Ayam Mati Hari Ini"
          value={formatNumber(0)}
          hint="Data belum tersedia"
          tone="destructive"
        />
        <Stat
          href="/stok-telur"
          icon={Package}
          label="Stok Telur Siap Jual"
          value={formatNumber(0)}
          hint="Data belum tersedia"
        />
        <Stat
          href="/pakan"
          icon={Wheat}
          label="Stok Pakan Total"
          value={`${formatNumber(0)} kg`}
          hint="Data belum tersedia"
          tone="warning"
        />
        <Stat
          href="/penjualan"
          icon={Wallet}
          label="Penjualan Hari Ini"
          value={formatRupiah(0)}
          hint="Data belum tersedia"
          tone="success"
        />
        <Stat
          href="/keuangan"
          icon={TrendingDown}
          label="Pengeluaran Hari Ini"
          value={formatRupiah(0)}
          hint="Data belum tersedia"
          tone="destructive"
        />
        <Stat
          href="/keuangan"
          icon={TrendingUp}
          label="Estimasi Laba"
          value={formatRupiah(0)}
          hint="Data belum tersedia"
          tone="success"
        />
        <Stat
          href="/jadwal"
          icon={AlertTriangle}
          label="Total Alert"
          value={String(totalAlert)}
          hint={farmError ? "Cek konfigurasi Supabase" : "Data belum tersedia"}
          tone="warning"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farm dari Supabase</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingFarms ? (
            <p className="text-sm text-muted-foreground">Memuat data farm...</p>
          ) : farmError ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {farmError}
            </div>
          ) : farms.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {farms.map((farm) => (
                <div key={farm.id} className="rounded-lg border bg-card p-4">
                  <p className="font-semibold">{farm.name || "Farm tanpa nama"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {farm.location || "Lokasi belum diisi"}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Owner: {farm.owner_name || "Belum diisi"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produksi Telur 14 Hari Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <EmptyState />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="tanggal" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
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
                    dot={{ fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!farmError && <p className="text-sm text-muted-foreground">Tidak ada alert.</p>}
            {farmError && (
              <NotificationLink to="/jadwal" className="border-warning/30 bg-warning/10">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-warning-foreground" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium">Supabase belum siap</p>
                  <p className="text-xs text-muted-foreground">{farmError}</p>
                </div>
              </NotificationLink>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Penjualan 7 Hari (ribuan Rp)</CardTitle>
        </CardHeader>
        <CardContent>
          {penjualanChart.length === 0 ? (
            <EmptyState />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={penjualanChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="tanggal" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="total" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
}
