import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Banknote,
  Bird,
  Egg,
  RefreshCw,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMasterControlOverview, type MasterControlOverview } from "@/lib/admin";
import { formatNumber, formatRupiah, ROLE_LABELS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/master-control")({ component: MasterControl });

const emptyOverview: MasterControlOverview = {
  metrics: {
    total_users: 0,
    total_farms: 0,
    total_kandang: 0,
    total_populasi_aktif: 0,
    total_telur_hari_ini: 0,
    total_stok_telur: 0,
    total_penjualan: 0,
    total_pemasukan: 0,
    total_pengeluaran: 0,
    laba_bersih: 0,
  },
  users: [],
  activities: [],
};

function formatDateTime(value: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function MasterControl() {
  const { currentUser } = useStore();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [userId, setUserId] = useState("all");
  const [overview, setOverview] = useState<MasterControlOverview>(emptyOverview);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canAccess = currentUser?.role === "super_admin";

  const load = async () => {
    if (!canAccess) return;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await getMasterControlOverview({
        from,
        to,
        userId: userId === "all" ? undefined : userId,
      });
      setOverview(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal memuat data Master Control.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAccess]);

  const metrics = overview.metrics;
  const cards = useMemo(
    () => [
      {
        label: "Pengguna",
        value: formatNumber(metrics.total_users),
        icon: Users,
      },
      {
        label: "Farm",
        value: formatNumber(metrics.total_farms),
        icon: Warehouse,
      },
      {
        label: "Kandang",
        value: formatNumber(metrics.total_kandang),
        icon: Warehouse,
      },
      {
        label: "Populasi Aktif",
        value: formatNumber(metrics.total_populasi_aktif),
        icon: Bird,
      },
      {
        label: "Telur Hari Ini",
        value: formatNumber(metrics.total_telur_hari_ini),
        icon: Egg,
      },
      {
        label: "Stok Telur",
        value: formatNumber(metrics.total_stok_telur),
        icon: Egg,
      },
      {
        label: "Penjualan",
        value: formatRupiah(metrics.total_penjualan),
        icon: ShoppingCart,
      },
      {
        label: "Laba Bersih",
        value: formatRupiah(metrics.laba_bersih),
        icon: Banknote,
      },
    ],
    [metrics],
  );

  if (!canAccess) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          Anda tidak memiliki akses ke halaman ini.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <PageHeader
        title="Master Control"
        description="Pantau pengguna, aktivitas, dan ringkasan operasional lintas akun."
        actions={
          <Button variant="outline" onClick={load} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {isLoading ? "Memuat..." : "Muat Ulang"}
          </Button>
        }
      />

      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_1fr_1.4fr_auto]">
          <div className="grid gap-2">
            <Label>Dari tanggal</Label>
            <Input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Sampai tanggal</Label>
            <Input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Owner/User</Label>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua pengguna</SelectItem>
                {overview.users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.full_name || user.email || user.phone || user.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={load} disabled={isLoading}>
              Terapkan
            </Button>
          </div>
        </CardContent>
      </Card>

      {errorMessage && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs uppercase text-muted-foreground">{card.label}</p>
                <p className="mt-2 text-2xl font-bold">{card.value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <card.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Produksi, Populasi, Stok</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Populasi aktif</span>
              <span className="font-semibold">
                {formatNumber(metrics.total_populasi_aktif)} ekor
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Produksi hari ini</span>
              <span className="font-semibold">
                {formatNumber(metrics.total_telur_hari_ini)} butir
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stok telur</span>
              <span className="font-semibold">{formatNumber(metrics.total_stok_telur)} butir</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penjualan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total penjualan</span>
              <span className="font-semibold">{formatRupiah(metrics.total_penjualan)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total kandang</span>
              <span className="font-semibold">{formatNumber(metrics.total_kandang)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keuangan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pemasukan</span>
              <span className="font-semibold text-success">
                {formatRupiah(metrics.total_pemasukan)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pengeluaran</span>
              <span className="font-semibold text-destructive">
                {formatRupiah(metrics.total_pengeluaran)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Laba bersih</span>
              <span className="font-semibold">{formatRupiah(metrics.laba_bersih)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email/Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead>Login Terakhir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overview.users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Belum ada data pengguna
                  </TableCell>
                </TableRow>
              )}
              {overview.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name || "-"}</TableCell>
                  <TableCell>{user.email || user.phone || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "super_admin" ? "default" : "secondary"}>
                      {user.role ? ROLE_LABELS[user.role] : "-"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.status || "active"}</TableCell>
                  <TableCell>{formatDateTime(user.created_at)}</TableCell>
                  <TableCell>{formatDateTime(user.last_login_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Deskripsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overview.activities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Belum ada aktivitas pengguna
                  </TableCell>
                </TableRow>
              )}
              {overview.activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{formatDateTime(activity.created_at)}</TableCell>
                  <TableCell>{activity.user_name || activity.user_email || "-"}</TableCell>
                  <TableCell>{activity.module || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{activity.action || "-"}</Badge>
                  </TableCell>
                  <TableCell>{activity.description || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
