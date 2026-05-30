import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Home, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  mapSupabaseUserToAppUser,
  requestWhatsappOtp,
  signInWithEmail,
  verifyWhatsappOtp,
} from "@/lib/auth";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({ component: Login });

type LoginMode = "email" | "whatsapp";

function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore();
  const [mode, setMode] = useState<LoginMode>("email");
  const [email, setEmail] = useState("");
  const [realPassword, setRealPassword] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRealLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "email") {
        const data = await signInWithEmail(email, realPassword);
        if (data.user) setCurrentUser(mapSupabaseUserToAppUser(data.user));
        const name = String(data.user?.user_metadata?.full_name ?? data.user?.email ?? email);
        toast.success(`Selamat datang, ${name}`);
        navigate({ to: "/dashboard" });
        return;
      }

      if (!otpCode) {
        const normalizedPhone = await requestWhatsappOtp(whatsappNumber);
        toast.success(`Kode masuk dikirim ke ${normalizedPhone}. Masukkan kode untuk melanjutkan.`);
        return;
      }

      const data = await verifyWhatsappOtp(whatsappNumber, otpCode);
      if (data.user) setCurrentUser(mapSupabaseUserToAppUser(data.user));
      const name = String(
        data.user?.user_metadata?.full_name ?? data.user?.phone ?? whatsappNumber,
      );
      toast.success(`Selamat datang, ${name}`);
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal masuk. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3e9]">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden overflow-hidden bg-white lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,176,0,0.12),transparent_28%),radial-gradient(circle_at_78%_88%,rgba(84,175,53,0.14),transparent_32%)]" />
          <div className="relative flex w-full flex-col justify-between px-14 py-12 xl:px-20">
            <div className="w-full max-w-3xl">
              <div className="flex items-center gap-6">
                <img
                  src="/telurku-mark.svg"
                  alt="Telurku"
                  className="h-36 w-36 shrink-0 object-contain xl:h-40 xl:w-40"
                />
                <div>
                  <h1 className="text-7xl font-black tracking-normal text-[#14263c] xl:text-8xl">
                    Telur<span className="text-[#f5a400]">ku</span>
                  </h1>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-normal text-[#25364a]">
                    <span>Kelola Farm</span>
                    <span className="h-4 w-px bg-[#aeb8c2]" />
                    <span>Tingkatkan Produktivitas</span>
                    <span className="h-4 w-px bg-[#aeb8c2]" />
                    <span>Panen Kepercayaan</span>
                  </div>
                </div>
              </div>

              <p className="mt-10 max-w-2xl text-xl leading-8 text-[#25364a]">
                Platform operasional farm untuk membaca produksi, stok, penjualan, dan kondisi
                kandang dalam satu ruang kerja yang rapi.
              </p>
            </div>

            <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#dfe5dc] bg-white/80 p-4 shadow-sm">
                <Home className="mb-3 h-5 w-5 text-[#55af35]" />
                <p className="text-sm font-semibold text-[#14263c]">Kelola Farm</p>
                <p className="mt-1 text-xs leading-5 text-[#617083]">Pantau data kandang harian.</p>
              </div>
              <div className="rounded-xl border border-[#dfe5dc] bg-white/80 p-4 shadow-sm">
                <BarChart3 className="mb-3 h-5 w-5 text-[#f59e0b]" />
                <p className="text-sm font-semibold text-[#14263c]">Produktif</p>
                <p className="mt-1 text-xs leading-5 text-[#617083]">
                  Baca tren tanpa rekap manual.
                </p>
              </div>
              <div className="rounded-xl border border-[#dfe5dc] bg-white/80 p-4 shadow-sm">
                <ShieldCheck className="mb-3 h-5 w-5 text-[#55af35]" />
                <p className="text-sm font-semibold text-[#14263c]">Terpercaya</p>
                <p className="mt-1 text-xs leading-5 text-[#617083]">
                  Data real untuk keputusan cepat.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-7 flex flex-col items-center text-center lg:hidden">
              <img src="/telurku-mark.svg" alt="Telurku" className="h-24 w-24" />
              <h1 className="mt-3 text-4xl font-black tracking-normal text-[#14263c]">
                Telur<span className="text-[#f5a400]">ku</span>
              </h1>
            </div>

            <Card className="border-[#e2d7c4] bg-white/95 shadow-2xl shadow-[#c9892a]/10">
              <CardHeader>
                <CardTitle className="text-2xl text-[#14263c]">Masuk Akun Real</CardTitle>
                <CardDescription>Pilih masuk memakai email atau nomor WA.</CardDescription>
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

                <form onSubmit={submitRealLogin} className="space-y-4">
                  {mode === "email" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="realPassword">Password</Label>
                        <Input
                          id="realPassword"
                          type="password"
                          value={realPassword}
                          onChange={(e) => setRealPassword(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="whatsappNumber">Nomor WA</Label>
                        <Input
                          id="whatsappNumber"
                          inputMode="tel"
                          placeholder="08xxxxxxxxxx"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="otpCode">Kode OTP</Label>
                        <Input
                          id="otpCode"
                          inputMode="numeric"
                          placeholder="Kosongkan dulu untuk kirim kode"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Memproses..."
                      : mode === "whatsapp" && !otpCode
                        ? "Kirim kode WA"
                        : "Masuk"}
                  </Button>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Belum punya akun?{" "}
                  <Link to="/register" className="font-medium text-primary hover:underline">
                    Daftar sekarang
                  </Link>
                </p>

                <div className="mt-5 rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
                  Akun demo statis sudah dinonaktifkan. Login sekarang memakai Supabase Auth.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
