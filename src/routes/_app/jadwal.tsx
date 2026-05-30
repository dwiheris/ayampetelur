import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import type { JadwalVaksin } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/jadwal")({ component: JadwalPage });

// TODO(supabase): Migrasikan jadwal vaksin ke Supabase setelah tabel kesehatan dipakai.
const empty: JadwalVaksin = {
  id: "",
  tanggal: new Date().toISOString().slice(0, 10),
  kandangId: "",
  vaksin: "",
  status: "Terjadwal",
};

function JadwalPage() {
  const { jadwal, setJadwal, kandang } = useStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<JadwalVaksin>(empty);

  const save = () => {
    if (!edit.kandangId || !edit.vaksin) return toast.error("Lengkapi data");
    setJadwal([...jadwal, { ...edit, id: `j${Date.now()}` }]);
    toast.success("Jadwal ditambahkan");
    setOpen(false);
    setEdit(empty);
  };

  const tandai = (id: string) => {
    setJadwal(jadwal.map((j) => (j.id === id ? { ...j, status: "Selesai" } : j)));
    toast.success("Ditandai selesai");
  };

  return (
    <>
      <PageHeader
        title="Jadwal Vaksin"
        description="Kelola jadwal & reminder vaksinasi."
        actions={
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
                Tambah Jadwal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Jadwal Vaksin</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Tanggal</Label>
                    <Input
                      type="date"
                      value={edit.tanggal}
                      onChange={(e) => setEdit({ ...edit, tanggal: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Kandang</Label>
                    <Select
                      value={edit.kandangId}
                      onValueChange={(v) => setEdit({ ...edit, kandangId: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        {kandang.map((k) => (
                          <SelectItem key={k.id} value={k.id}>
                            {k.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Vaksin</Label>
                  <Input
                    value={edit.vaksin}
                    onChange={(e) => setEdit({ ...edit, vaksin: e.target.value })}
                    placeholder="ND Lasota, AI, IB..."
                  />
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
        }
      />
      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Kandang</TableHead>
                <TableHead>Vaksin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-32">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jadwal.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    Belum ada data jadwal vaksin
                  </TableCell>
                </TableRow>
              )}
              {[...jadwal]
                .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
                .map((j) => (
                  <TableRow key={j.id}>
                    <TableCell>{j.tanggal}</TableCell>
                    <TableCell>{kandang.find((k) => k.id === j.kandangId)?.nama ?? "—"}</TableCell>
                    <TableCell className="font-medium">{j.vaksin}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          j.status === "Selesai"
                            ? "secondary"
                            : j.status === "Lewat"
                              ? "destructive"
                              : "default"
                        }
                      >
                        {j.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {j.status !== "Selesai" && (
                          <Button size="sm" variant="outline" onClick={() => tandai(j.id)}>
                            <Check className="h-4 w-4 mr-1" />
                            Selesai
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setJadwal(jadwal.filter((x) => x.id !== j.id));
                            toast.success("Dihapus");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
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
