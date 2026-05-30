import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Banknote,
  Bird,
  CalendarDays,
  Egg,
  Filter,
  LockKeyhole,
  LogOut,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";
import { toast } from "sonner";
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
import { logActivity } from "@/lib/activity-logs";
import { signOut } from "@/lib/auth";
import { formatNumber, formatRupiah, ROLE_LABELS } from "@/lib/mock-data";
import { getOwnProfileUser } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/owner/master-control")({ component: OwnerControlCenter });

const emptyOverview: MasterControlOverview = {
  metrics: {
    total_users: 0,
    active_users: 0,
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

function OwnerControlCenter() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useStore();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [userId, setUserId] = useState("all");
  const [overview, setOverview] = useState<MasterControlOverview>(emptyOverview);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canAccess = currentUser?.role === "super_admin" && !accessDenied;

  const load = async () => {
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
      const message = error instanceof Error ? error.message : "Gagal memuat data Owner Control.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    async function verifyAccess() {
      setIsCheckingAccess(true);
      if (!supabase) {
        navigate({ to: "/owner/login", replace: true });
        return;
      }

      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;
      if (!active) return;
      if (!sessionUser) {
        navigate({ to: "/owner/login", replace: true });
        return;
      }

      const profileUser = await getOwnProfileUser(sessionUser.id).catch(() => null);
      if (!active) return;
      if (profileUser?.role !== "super_admin") {
        setCurrentUser(profileUser);
        setAccessDenied(true);
        setIsCheckingAccess(false);
        return;
      }

      setCurrentUser(profileUser);
      setAccessDenied(false);
      setIsCheckingAccess(false);
      void load();
    }

    void verifyAccess();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, setCurrentUser]);

  const metrics = overview.metrics;
  const metricCards = useMemo(
    () => [
      { label: "Total pengguna", value: formatNumber(metrics.total_users), icon: Users },
      { label: "User aktif", value: formatNumber(metrics.active_users), icon: ShieldCheck },
      { label: "Total farm", value: formatNumber(metrics.total_farms), icon: Warehouse },
      { label: "Total kandang", value: formatNumber(metrics.total_kandang), icon: Warehouse },
      {
        label: "Total populasi ayam",
        value: `${formatNumber(metrics.total_populasi_aktif)} ekor`,
        icon: Bird,
      },
      {
        label: "Total telur hari ini",
        value: `${formatNumber(metrics.total_telur_hari_ini)} butir`,
        icon: Egg,
      },
      {
        label: "Total stok telur",
        value: `${formatNumber(metrics.total_stok_telur)} butir`,
        icon: Egg,
      },
      {
        label: "Total penjualan",
        value: formatRupiah(metrics.total_penjualan),
        icon: ShoppingCart,
      },
      {
        label: "Total pemasukan",
        value: formatRupiah(metrics.total_pemasukan),
        icon: TrendingUp,
      },
      {
        label: "Total pengeluaran",
        value: formatRupiah(metrics.total_pengeluaran),
        icon: Banknote,
      },
      { label: "Laba bersih", value: formatRupiah(metrics.laba_bersih), icon: Banknote },
    ],
    [metrics],
  );

  const handleLogout = async () => {
    await logActivity({
      module: "owner_control",
      action: "logout",
      description: "Keluar dari Owner Control Center",
    }).catch(() => {
      /* do not block logout */
    });
    await signOut().catch((error) => {
      toast.error(error instanceof Error ? error.message : "Gagal keluar.");
    });
    setCurrentUser(null);
    navigate({ to: "/owner/login", replace: true });
  };

  if (isCheckingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f2]">
        <div className="flex items-center gap-3 rounded-lg border bg-white px-5 py-4 text-sm text-muted-foreground shadow-sm">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Memeriksa akses Owner Control...
        </div>
      </div>
    );
  }

  if (accessDenied || !canAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f2] px-4">
        <Card className="w-full max-w-md rounded-lg">
          <CardContent className="p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h1 className="mt-4 text-xl font-bold">Akses Ditolak</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Akun ini tidak memiliki akses Owner Control.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })}>
                Ke aplikasi
              </Button>
              <Button onClick={handleLogout}>Keluar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f2] text-[#18231c]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[#d8e1d2] bg-[#13231d] text-white lg:flex lg:flex-col">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5a400] text-[#13231d]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/70">Telurku</p>
              <p className="text-lg font-bold">Owner Control</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <div className="rounded-lg bg-white/10 px-3 py-3">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Activity className="h-4 w-4 text-[#f5a400]" />
              Monitoring
            </div>
          </div>
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="text-sm font-semibold">{currentUser?.name}</p>
          <p className="text-xs text-white/60">
            {currentUser ? ROLE_LABELS[currentUser.role] : ""}
          </p>
          <Button
            variant="ghost"
            className="mt-4 w-full justify-start gap-2 text-white hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[#d8e1d2] bg-white/90 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-[#54705d]">
                <ShieldCheck className="h-4 w-4" />
                Owner Control Center
              </div>
              <h1 className="mt-1 text-2xl font-black tracking-normal text-[#13231d]">
                Monitoring Kandang
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Monitor pengguna, aktivitas, dan performa kandang dari satu halaman.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={load} disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Memuat..." : "Muat ulang"}
              </Button>
              <Button variant="outline" className="lg:hidden" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
              </Button>
            </div>
          </div>
        </header>

        <main className="space-y-5 p-4 sm:p-6">
          <section className="rounded-lg border border-[#d8e1d2] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#13231d]">
              <Filter className="h-4 w-4 text-[#55af35]" />
              Filter monitoring
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.4fr_auto]">
              <div className="grid gap-2">
                <Label htmlFor="from">Dari tanggal</Label>
                <Input
                  id="from"
                  type="date"
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="to">Sampai tanggal</Label>
                <Input
                  id="to"
                  type="date"
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                />
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
            </div>
          </section>

          {errorMessage && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((card) => (
              <Card key={card.label} className="rounded-lg border-[#d8e1d2] shadow-sm">
                <CardContent className="flex min-h-32 items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="mt-3 text-2xl font-black tracking-normal text-[#13231d]">
                      {card.value}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e9f4e4] text-[#2e7d32]">
                    <card.icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-lg border-[#d8e1d2] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-[#55af35]" />
                  Daftar Pengguna
                </CardTitle>
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

            <Card className="rounded-lg border-[#d8e1d2] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4 text-[#55af35]" />
                  Aktivitas User Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {overview.activities.length === 0 && (
                  <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    Belum ada aktivitas pengguna
                  </div>
                )}
                {overview.activities.slice(0, 8).map((activity) => (
                  <div key={activity.id} className="rounded-lg border border-[#e2e8dd] p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">
                          {activity.user_name || activity.user_email || "-"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {activity.description || activity.action || "-"}
                        </p>
                      </div>
                      <Badge variant="outline">{activity.module || "-"}</Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDateTime(activity.created_at)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
