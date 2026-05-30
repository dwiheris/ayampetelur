import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ROLE_LABELS, type User } from "@/lib/mock-data";
import { getProfiles } from "@/lib/profiles";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/pengaturan")({ component: Pengaturan });

function Pengaturan() {
  const { currentUser } = useStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [profil, setProfil] = useState({
    nama: "",
    alamat: "",
    telp: "",
  });

  useEffect(() => {
    let active = true;

    async function loadProfiles() {
      setIsLoadingUsers(true);
      setUserError(null);

      try {
        const rows = await getProfiles();
        if (active) setUsers(rows);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Data user belum bisa dimuat.";
        if (active) setUserError(message);
        toast.error(message);
      } finally {
        if (active) setIsLoadingUsers(false);
      }
    }

    void loadProfiles();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHeader
        title="Pengaturan"
        description="Manajemen profil peternakan dan data user real."
      />

      <Card>
        <CardHeader>
          <CardTitle>Profil Peternakan</CardTitle>
          <CardDescription>Isi identitas usaha Anda.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Nama</Label>
            <Input
              value={profil.nama}
              placeholder="Nama peternakan"
              onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Alamat</Label>
            <Input
              value={profil.alamat}
              placeholder="Alamat peternakan"
              onChange={(e) => setProfil({ ...profil, alamat: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Telp</Label>
            <Input
              value={profil.telp}
              placeholder="Nomor telepon"
              onChange={(e) => setProfil({ ...profil, telp: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manajemen User & Role</CardTitle>
          <CardDescription>
            Data user diambil dari Supabase profiles sesuai akses akun Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {userError && (
            <div className="mb-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {userError}
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email / WA</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingUsers ? (
                <TableRow>
                  <TableCell colSpan={3} className="py-8 text-center text-muted-foreground">
                    Memuat data user...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="py-8 text-center text-muted-foreground">
                    Belum ada data user management
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.email || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{ROLE_LABELS[u.role]}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {currentUser && users.length === 0 && !isLoadingUsers && !userError && (
            <p className="mt-3 text-sm text-muted-foreground">
              Akun aktif: {currentUser.name || currentUser.email}
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
