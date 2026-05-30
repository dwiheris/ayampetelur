import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { ROLE_LABELS, type Role, type User } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/pengaturan")({ component: Pengaturan });

// TODO(supabase): Migrasikan pengaturan user/profil ke profiles dan farm settings.
const empty: User = { id: "", name: "", email: "", role: "viewer", password: "" };
const roles: Role[] = [
  "master_admin",
  "owner",
  "admin_kandang",
  "petugas_gudang",
  "keuangan",
  "viewer",
];

function Pengaturan() {
  const { users, setUsers, currentUser } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<User>(empty);
  const [profil, setProfil] = useState({
    nama: "Peternakan Telurku",
    alamat: "Boyolali, Jawa Tengah",
    telp: "0271-000-000",
  });

  const save = () => {
    if (!edit.name || !edit.email) return toast.error("Lengkapi data");
    if (edit.id) setUsers(users.map((u) => (u.id === edit.id ? edit : u)));
    else setUsers([...users, { ...edit, id: `u${Date.now()}` }]);
    toast.success("User disimpan");
    setOpen(false);
    setEdit(empty);
  };

  const backup = () => {
    const data: Record<string, string> = {};
    Object.keys(localStorage)
      .filter((k) => k.startsWith("tk_"))
      .forEach((k) => {
        data[k] = localStorage.getItem(k) ?? "";
      });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `telurku-backup-${Date.now()}.json`;
    a.click();
    toast.success("Backup diunduh");
  };

  const restore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(String(r.result)) as Record<string, string>;
        Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
        toast.success("Restore berhasil — memuat ulang...");
        setTimeout(() => window.location.reload(), 800);
      } catch {
        toast.error("File tidak valid");
      }
    };
    r.readAsText(file);
  };

  return (
    <>
      <PageHeader
        title="Pengaturan"
        description="Manajemen user, role, profil peternakan, dan backup."
      />

      <Card>
        <CardHeader>
          <CardTitle>Profil Peternakan</CardTitle>
          <CardDescription>Identitas usaha Anda.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Nama</Label>
            <Input
              value={profil.nama}
              onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Alamat</Label>
            <Input
              value={profil.alamat}
              onChange={(e) => setProfil({ ...profil, alamat: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Telp</Label>
            <Input
              value={profil.telp}
              onChange={(e) => setProfil({ ...profil, telp: e.target.value })}
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <Button onClick={() => toast.success("Profil tersimpan")}>Simpan Profil</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manajemen User & Role</CardTitle>
            <CardDescription>Kelola akun dan hak akses.</CardDescription>
          </div>
          {currentUser?.role === "master_admin" && (
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
                  Tambah User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{edit.id ? "Edit" : "Tambah"} User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label>Nama</Label>
                    <Input
                      value={edit.name}
                      onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={edit.email}
                      onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      value={edit.password}
                      onChange={(e) => setEdit({ ...edit, password: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <Select
                      value={edit.role}
                      onValueChange={(v) => setEdit({ ...edit, role: v as Role })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r} value={r}>
                            {ROLE_LABELS[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          )}
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ROLE_LABELS[u.role]}</Badge>
                  </TableCell>
                  <TableCell>
                    {currentUser?.role === "master_admin" && u.id !== currentUser.id && (
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEdit(u);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setUsers(users.filter((x) => x.id !== u.id));
                            toast.success("Dihapus");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backup & Restore</CardTitle>
          <CardDescription>Cadangkan semua data lokal aplikasi.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={backup}>
            <Download className="mr-1 h-4 w-4" />
            Backup Data
          </Button>
          <Label className="cursor-pointer">
            <span className="inline-flex items-center gap-1 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent">
              <Upload className="h-4 w-4" />
              Restore Data
            </span>
            <input type="file" accept=".json" className="hidden" onChange={restore} />
          </Label>
          <Button
            variant="destructive"
            onClick={() => {
              if (!confirm("Hapus semua data lokal & kembali ke data dummy?")) return;
              Object.keys(localStorage)
                .filter((k) => k.startsWith("tk_"))
                .forEach((k) => localStorage.removeItem(k));
              toast.success("Direset — memuat ulang...");
              setTimeout(() => window.location.reload(), 600);
            }}
          >
            Reset ke Data Dummy
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
