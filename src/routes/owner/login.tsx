import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart3, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mapSupabaseUserToAppUser, signInWithIdentifier, signOut } from "@/lib/auth";
import { logActivity, markLastLogin } from "@/lib/activity-logs";
import { getOwnProfileUser } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/owner/login")({ component: OwnerLogin });

type LoginMode = "email" | "whatsapp";

function OwnerLogin() {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore();
  const [mode, setMode] = useState<LoginMode>("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function redirectActiveOwner() {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;
      if (!active || !sessionUser) return;
      const profileUser = await getOwnProfileUser(sessionUser.id).catch(() => null);
      if (active && profileUser?.role === "super_admin") {
        setCurrentUser(profileUser);
        navigate({ to: "/owner/master-control", replace: true });
      }
    }

    void redirectActiveOwner();
    return () => {
      active = false;
    };
  }, [navigate, setCurrentUser]);

  const submitOwnerLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await signInWithIdentifier(mode, identifier, password);
      const authUser = data.user;
      if (!authUser) throw new Error("Gagal membaca sesi login.");

      const profileUser = await getOwnProfileUser(authUser.id);
      if (profileUser?.role !== "super_admin") {
        await signOut().catch(() => {
          /* session cleanup best effort */
        });
        setCurrentUser(null);
        throw new Error("Akun ini tidak memiliki akses Owner Control.");
      }

      setCurrentUser(profileUser ?? mapSupabaseUserToAppUser(authUser));
      await markLastLogin().catch(() => {
        /* optional audit field */
      });
      await logActivity({
        module: "owner_control",
        action: "login",
        description: "Masuk ke Owner Control Center",
        metadata: { mode },
      }).catch(() => {
        /* login should not fail because audit logging failed */
      });
      toast.success("Selamat datang di Owner Control Center.");
      navigate({ to: "/owner/master-control" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal masuk. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f4]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#13231d] text-white lg:flex">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(86,175,53,0.24),transparent_42%),linear-gradient(45deg,rgba(245,164,0,0.16),transparent_48%)]" />
          <div className="relative flex w-full flex-col justify-between px-14 py-12 xl:px-20">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5a400] text-[#13231d]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-normal text-white/70">
                    Telurku
                  </p>
                  <p className="text-xl font-bold">Owner Control Center</p>
                </div>
              </div>
              <h1 className="mt-20 max-w-3xl text-5xl font-black leading-tight tracking-normal xl:text-6xl">
                Telurku Owner Control Center
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Monitor pengguna, aktivitas, dan performa kandang dari satu halaman.
              </p>
            </div>

            <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-white/15 bg-white/8 p-4">
                <BarChart3 className="mb-4 h-5 w-5 text-[#f5a400]" />
                <p className="text-sm font-semibold">Performa</p>
                <p className="mt-2 text-xs leading-5 text-white/65">
                  Pantau metrik lintas kandang.
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/8 p-4">
                <LockKeyhole className="mb-4 h-5 w-5 text-[#55af35]" />
                <p className="text-sm font-semibold">Akses Owner</p>
                <p className="mt-2 text-xs leading-5 text-white/65">
                  Khusus pemilik yang terotorisasi.
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/8 p-4">
                <ShieldCheck className="mb-4 h-5 w-5 text-[#f5a400]" />
                <p className="text-sm font-semibold">Audit</p>
                <p className="mt-2 text-xs leading-5 text-white/65">
                  Lihat aktivitas pengguna terbaru.
                </p>
              </div>
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-7 text-center lg:hidden">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#13231d] text-white">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-normal text-[#14263c]">
                Telurku Owner Control Center
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Monitor pengguna, aktivitas, dan performa kandang dari satu halaman.
              </p>
            </div>

            <Card className="rounded-lg border-[#d9e1d4] bg-white shadow-xl shadow-[#13231d]/10">
              <CardHeader>
                <CardTitle className="text-2xl text-[#14263c]">Masuk Owner</CardTitle>
                <CardDescription>Akses khusus Pemilik Kandang.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 rounded-lg border bg-muted/30 p-1">
                  <Button
                    type="button"
                    variant={mode === "email" ? "default" : "ghost"}
                    onClick={() => setMode("email")}
                  >
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={mode === "whatsapp" ? "default" : "ghost"}
                    onClick={() => setMode("whatsapp")}
                  >
                    WA
                  </Button>
                </div>

                <form onSubmit={submitOwnerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-identifier">
                      {mode === "email" ? "Email" : "Nomor WA"}
                    </Label>
                    <Input
                      id="owner-identifier"
                      type={mode === "email" ? "email" : "tel"}
                      inputMode={mode === "email" ? "email" : "tel"}
                      placeholder={mode === "email" ? "owner@email.com" : "08xxxxxxxxxx"}
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="owner-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                        onClick={() => setShowPassword((value) => !value)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Memproses..." : "Masuk Owner Control"}
                  </Button>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Masuk sebagai pengguna kandang?{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Buka login aplikasi
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
