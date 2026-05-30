import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Feather } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
  type RegionOption,
} from "@/lib/indonesia-regions";
import { registerAccount } from "@/lib/register";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const [provinces, setProvinces] = useState<RegionOption[]>([]);
  const [regencies, setRegencies] = useState<RegionOption[]>([]);
  const [districts, setDistricts] = useState<RegionOption[]>([]);
  const [villages, setVillages] = useState<RegionOption[]>([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [regencyCode, setRegencyCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [villageCode, setVillageCode] = useState("");
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingRegencies, setIsLoadingRegencies] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingVillages, setIsLoadingVillages] = useState(false);
  const [detailAddress, setDetailAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProvinces() {
      try {
        const data = await getProvinces();
        if (active) setProvinces(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Data provinsi belum bisa dimuat.");
      } finally {
        if (active) setIsLoadingProvinces(false);
      }
    }

    loadProvinces();

    return () => {
      active = false;
    };
  }, []);

  const province = provinces.find((item) => item.code === provinceCode)?.name ?? "";
  const regency = regencies.find((item) => item.code === regencyCode)?.name ?? "";
  const district = districts.find((item) => item.code === districtCode)?.name ?? "";
  const village = villages.find((item) => item.code === villageCode)?.name ?? "";

  const handleProvinceChange = async (code: string) => {
    setProvinceCode(code);
    setRegencyCode("");
    setDistrictCode("");
    setVillageCode("");
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    setIsLoadingRegencies(true);

    try {
      setRegencies(await getRegencies(code));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Data kabupaten/kota belum bisa dimuat.",
      );
    } finally {
      setIsLoadingRegencies(false);
    }
  };

  const handleRegencyChange = async (code: string) => {
    setRegencyCode(code);
    setDistrictCode("");
    setVillageCode("");
    setDistricts([]);
    setVillages([]);
    setIsLoadingDistricts(true);

    try {
      setDistricts(await getDistricts(provinceCode, code));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Data kecamatan belum bisa dimuat.");
    } finally {
      setIsLoadingDistricts(false);
    }
  };

  const handleDistrictChange = async (code: string) => {
    setDistrictCode(code);
    setVillageCode("");
    setVillages([]);
    setIsLoadingVillages(true);

    try {
      setVillages(await getVillages(provinceCode, regencyCode, code));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Data desa/kelurahan belum bisa dimuat.",
      );
    } finally {
      setIsLoadingVillages(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password tidak sama.");
      return;
    }

    if (!province || !regency || !district || !village) {
      toast.error("Lengkapi alamat peternakan sampai desa/kelurahan.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerAccount({
        fullName,
        email,
        whatsappNumber,
        password,
        farmName,
        province,
        regency,
        district,
        village,
        detailAddress,
      });
      toast.success("Akun berhasil dibuat. Silakan masuk menggunakan email atau WA.");
      navigate({ to: "/login" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registrasi gagal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary via-background to-accent px-4 py-12">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
            Bangun kontrol peternakan yang rapi sejak awal, dari pencatatan kandang sampai keputusan
            penjualan harian.
          </p>
          <div className="mt-8 space-y-3 rounded-xl border bg-card/60 p-4 backdrop-blur">
            <p className="text-sm font-semibold">Keunggulan sistem</p>
            <p className="text-sm text-muted-foreground">
              Data operasional lebih mudah dipantau, ringkasan produksi lebih cepat dibaca, dan
              pemilik bisa melihat kondisi farm tanpa menunggu rekap manual.
            </p>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Daftar Akun</CardTitle>
            <CardDescription>Buat akun real untuk mulai mengelola farm Telurku.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama lengkap</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
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
              </div>
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmName">Nama peternakan/farm</Label>
                <Input
                  id="farmName"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi</Label>
                  <Select
                    value={provinceCode}
                    onValueChange={handleProvinceChange}
                    disabled={isLoadingProvinces}
                    required
                  >
                    <SelectTrigger id="province">
                      <SelectValue
                        placeholder={isLoadingProvinces ? "Memuat provinsi..." : "Pilih provinsi"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regency">Kabupaten/Kota</Label>
                  <Select
                    value={regencyCode}
                    onValueChange={handleRegencyChange}
                    disabled={!provinceCode || isLoadingRegencies}
                    required
                  >
                    <SelectTrigger id="regency">
                      <SelectValue
                        placeholder={
                          isLoadingRegencies ? "Memuat kabupaten/kota..." : "Pilih kabupaten/kota"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {regencies.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">Kecamatan</Label>
                  <Select
                    value={districtCode}
                    onValueChange={handleDistrictChange}
                    disabled={!regencyCode || isLoadingDistricts}
                    required
                  >
                    <SelectTrigger id="district">
                      <SelectValue
                        placeholder={isLoadingDistricts ? "Memuat kecamatan..." : "Pilih kecamatan"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Desa/Kelurahan</Label>
                  <Select
                    value={villageCode}
                    onValueChange={setVillageCode}
                    disabled={!districtCode || isLoadingVillages}
                    required
                  >
                    <SelectTrigger id="village">
                      <SelectValue
                        placeholder={
                          isLoadingVillages ? "Memuat desa/kelurahan..." : "Pilih desa/kelurahan"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {villages.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="detailAddress">Alamat detail</Label>
                <Input
                  id="detailAddress"
                  placeholder="Dusun, jalan, RT/RW, patokan"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Mendaftarkan..." : "Daftar"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Masuk sekarang
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
