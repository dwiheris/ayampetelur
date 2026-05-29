import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { initialUsers, ROLE_LABELS } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState("admin@telurku.id");
  const [password, setPassword] = useState("admin123");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = login(email, password);
    if (u) {
      toast.success(`Selamat datang, ${u.name}`);
      navigate({ to: "/dashboard" });
    } else {
      toast.error("Email atau password salah");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary via-background to-accent px-4 py-12">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
        <div className="hidden flex-col justify-center lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Feather className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Telurku</h1>
              <p className="text-sm text-muted-foreground">Management System</p>
            </div>
          </div>
          <p className="mt-6 text-lg text-foreground/80">
            Kelola kandang ayam petelur, produksi, stok, penjualan, dan keuangan dalam satu aplikasi modern.
          </p>
          <div className="mt-8 rounded-xl border bg-card/60 p-4 backdrop-blur">
            <p className="mb-2 text-sm font-semibold">Akun Demo</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              {initialUsers.map((u) => (
                <div key={u.id} className="flex justify-between gap-3">
                  <span>{ROLE_LABELS[u.role]}</span>
                  <span className="font-mono">{u.email} / {u.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Masuk Akun</CardTitle>
            <CardDescription>Gunakan akun demo untuk mencoba sistem.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" size="lg">Masuk</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
