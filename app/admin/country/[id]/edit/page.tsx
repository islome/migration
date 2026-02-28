"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload, ArrowLeft } from "lucide-react";


interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface FormData {
  id: string;
  name: string;
  nameEn: string;
  flag: string;
  shortDescription: string;
  fullDescription: string;
  salary: string;
  visaDuration: string;
  visaSuccess: string;
  language: string;
  currency: string;
  backgroundImage: string;
  reqAge: string;
  reqEducation: string;
  reqLanguage: string;
  reqExperience: string;
  salaryMin: string;
  salaryMax: string;
  salaryAverage: string;
  taxRate: string;
  lifeHousing: string;
  lifeTransport: string;
  lifeFood: string;
  lifeHealthcare: string;
  popularJobs: string[];
  benefits: string[];
  documents: string[];
  process: ProcessStep[];
}

const emptyForm: FormData = {
  id: "",
  name: "",
  nameEn: "",
  flag: "",
  shortDescription: "",
  fullDescription: "",
  salary: "",
  visaDuration: "",
  visaSuccess: "",
  language: "",
  currency: "",
  backgroundImage: "",
  reqAge: "",
  reqEducation: "",
  reqLanguage: "",
  reqExperience: "",
  salaryMin: "",
  salaryMax: "",
  salaryAverage: "",
  taxRate: "",
  lifeHousing: "",
  lifeTransport: "",
  lifeFood: "",
  lifeHealthcare: "",
  popularJobs: [""],
  benefits: [""],
  documents: [""],
  process: [{ step: 1, title: "", description: "", duration: "" }],
};

function DynamicList({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const update = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`${placeholder} ${i + 1}`}
          />
          {items.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="shrink-0 text-red-500 hover:text-red-600 hover:border-red-300"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, ""])}
        className="gap-1.5"
      >
        <Plus size={14} /> Qo'shish
      </Button>
    </div>
  );
}

export default function EditCountryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<FormData>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Fetch existing data ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Ma'lumot topilmadi");
        setFetching(false);
        return;
      }

      setForm({
        id: data.id ?? "",
        name: data.name ?? "",
        nameEn: data.name_en ?? "",
        flag: data.flag ?? "",
        shortDescription: data.short_description ?? "",
        fullDescription: data.full_description ?? "",
        salary: data.salary ?? "",
        visaDuration: data.visa_duration ?? "",
        visaSuccess: data.visa_success ?? "",
        language: data.language ?? "",
        currency: data.currency ?? "",
        backgroundImage: data.background_image ?? "",
        reqAge: data.req_age ?? "",
        reqEducation: data.req_education ?? "",
        reqLanguage: data.req_language ?? "",
        reqExperience: data.req_experience ?? "",
        salaryMin: data.salary_min?.toString() ?? "",
        salaryMax: data.salary_max?.toString() ?? "",
        salaryAverage: data.salary_average?.toString() ?? "",
        taxRate: data.tax_rate ?? "",
        lifeHousing: data.life_housing ?? "",
        lifeTransport: data.life_transport ?? "",
        lifeFood: data.life_food ?? "",
        lifeHealthcare: data.life_healthcare ?? "",
        popularJobs: data.popular_jobs?.length ? data.popular_jobs : [""],
        benefits: data.benefits?.length ? data.benefits : [""],
        documents: data.documents?.length ? data.documents : [""],
        process: data.process?.length
          ? data.process
          : [{ step: 1, title: "", description: "", duration: "" }],
      });

      if (data.background_image) setImagePreview(data.background_image);
      setFetching(false);
    };
    fetch();
  }, [id]);

  const f =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      let backgroundImage = form.backgroundImage;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `countries/${form.id}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("country-images")
          .upload(path, imageFile, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage
          .from("country-images")
          .getPublicUrl(path);
        backgroundImage = data.publicUrl;
      }

      const { error: dbErr } = await supabase
        .from("countries")
        .update({
          name: form.name,
          name_en: form.nameEn,
          flag: form.flag,
          short_description: form.shortDescription,
          full_description: form.fullDescription,
          salary: form.salary,
          visa_duration: form.visaDuration,
          visa_success: form.visaSuccess,
          language: form.language,
          currency: form.currency,
          background_image: backgroundImage,
          req_age: form.reqAge,
          req_education: form.reqEducation,
          req_language: form.reqLanguage,
          req_experience: form.reqExperience,
          salary_min: Number(form.salaryMin) || null,
          salary_max: Number(form.salaryMax) || null,
          salary_average: Number(form.salaryAverage) || null,
          tax_rate: form.taxRate,
          life_housing: form.lifeHousing,
          life_transport: form.lifeTransport,
          life_food: form.lifeFood,
          life_healthcare: form.lifeHealthcare,
          popular_jobs: form.popularJobs.filter(Boolean),
          benefits: form.benefits.filter(Boolean),
          documents: form.documents.filter(Boolean),
          process: form.process.map((s, i) => ({ ...s, step: i + 1 })),
        })
        .eq("id", id);

      if (dbErr) throw dbErr;

      setSuccess(true);
      setTimeout(() => router.push("/admin/country"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 mb-2 -ml-2 text-muted-foreground"
            onClick={() => router.push("/admin/countries")}
          >
            <ArrowLeft size={16} /> Orqaga
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {form.flag} {form.name} — Tahrirlash
          </h1>
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600 font-medium">
          ✓ Muvaffaqiyatli saqlandi! Yo'naltirilmoqda...
        </div>
      )}

      {/* ── 1. Asosiy ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Asosiy ma'lumotlar</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>ID</Label>
            <Input
              value={form.id}
              disabled
              className="bg-muted text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">ID o'zgartirilmaydi</p>
          </div>
          <div className="space-y-1.5">
            <Label>Flag emoji</Label>
            <Input value={form.flag} onChange={f("flag")} placeholder="🇩🇪" />
          </div>
          <div className="space-y-1.5">
            <Label>Nomi (O'zbek)</Label>
            <Input
              value={form.name}
              onChange={f("name")}
              placeholder="Germaniya"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Nomi (Ingliz)</Label>
            <Input
              value={form.nameEn}
              onChange={f("nameEn")}
              placeholder="Germany"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tili</Label>
            <Input
              value={form.language}
              onChange={f("language")}
              placeholder="Nemis tili (B1-B2)"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Valyuta</Label>
            <Input
              value={form.currency}
              onChange={f("currency")}
              placeholder="Euro (EUR)"
            />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Qisqa tavsif</Label>
            <Textarea
              value={form.shortDescription}
              onChange={f("shortDescription")}
              rows={2}
            />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>To'liq tavsif</Label>
            <Textarea
              value={form.fullDescription}
              onChange={f("fullDescription")}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── 2. Maosh & Viza ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Maosh & Viza</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Maosh (ko'rsatish uchun)</Label>
            <Input
              value={form.salary}
              onChange={f("salary")}
              placeholder="$3,500 - $6,000"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Soliq darajasi</Label>
            <Input
              value={form.taxRate}
              onChange={f("taxRate")}
              placeholder="14-45%"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Minimum ($)</Label>
            <Input
              type="number"
              value={form.salaryMin}
              onChange={f("salaryMin")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Maximum ($)</Label>
            <Input
              type="number"
              value={form.salaryMax}
              onChange={f("salaryMax")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>O'rtacha ($)</Label>
            <Input
              type="number"
              value={form.salaryAverage}
              onChange={f("salaryAverage")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Viza muddati</Label>
            <Input
              value={form.visaDuration}
              onChange={f("visaDuration")}
              placeholder="3-6 oy"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Viza muvaffaqiyati</Label>
            <Input
              value={form.visaSuccess}
              onChange={f("visaSuccess")}
              placeholder="95%"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Talablar ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Talablar</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Yosh chegarasi</Label>
            <Input
              value={form.reqAge}
              onChange={f("reqAge")}
              placeholder="18-50 yosh"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Ta'lim darajasi</Label>
            <Input value={form.reqEducation} onChange={f("reqEducation")} />
          </div>
          <div className="space-y-1.5">
            <Label>Til talabi</Label>
            <Input value={form.reqLanguage} onChange={f("reqLanguage")} />
          </div>
          <div className="space-y-1.5">
            <Label>Tajriba</Label>
            <Input value={form.reqExperience} onChange={f("reqExperience")} />
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Hayot ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hayot haqida</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Uy-joy</Label>
            <Textarea
              value={form.lifeHousing}
              onChange={f("lifeHousing")}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Transport</Label>
            <Textarea
              value={form.lifeTransport}
              onChange={f("lifeTransport")}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Ovqatlanish</Label>
            <Textarea value={form.lifeFood} onChange={f("lifeFood")} rows={2} />
          </div>
          <div className="space-y-1.5">
            <Label>Sog'liqni saqlash</Label>
            <Textarea
              value={form.lifeHealthcare}
              onChange={f("lifeHealthcare")}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Listlar ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mashhur kasblar</CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicList
            items={form.popularJobs}
            onChange={(v) => setForm((p) => ({ ...p, popularJobs: v }))}
            placeholder="Kasb"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Imtiyozlar</CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicList
            items={form.benefits}
            onChange={(v) => setForm((p) => ({ ...p, benefits: v }))}
            placeholder="Imtiyoz"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kerakli hujjatlar</CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicList
            items={form.documents}
            onChange={(v) => setForm((p) => ({ ...p, documents: v }))}
            placeholder="Hujjat"
          />
        </CardContent>
      </Card>

      {/* ── 6. Jarayon ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Jarayon bosqichlari</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.process.map((step, i) => (
            <div
              key={i}
              className="space-y-3 p-4 rounded-lg border bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <Badge variant="outline">Bosqich {i + 1}</Badge>
                {form.process.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 h-7 px-2"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        process: p.process.filter((_, idx) => idx !== i),
                      }))
                    }
                  >
                    <X size={14} /> O'chirish
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Nomi</Label>
                  <Input
                    value={step.title}
                    onChange={(e) =>
                      setForm((p) => {
                        const next = [...p.process];
                        next[i] = { ...next[i], title: e.target.value };
                        return { ...p, process: next };
                      })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Davomiyligi</Label>
                  <Input
                    value={step.duration}
                    onChange={(e) =>
                      setForm((p) => {
                        const next = [...p.process];
                        next[i] = { ...next[i], duration: e.target.value };
                        return { ...p, process: next };
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Tavsif</Label>
                <Textarea
                  value={step.description}
                  rows={2}
                  onChange={(e) =>
                    setForm((p) => {
                      const next = [...p.process];
                      next[i] = { ...next[i], description: e.target.value };
                      return { ...p, process: next };
                    })
                  }
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              setForm((p) => ({
                ...p,
                process: [
                  ...p.process,
                  {
                    step: p.process.length + 1,
                    title: "",
                    description: "",
                    duration: "",
                  },
                ],
              }))
            }
          >
            <Plus size={14} /> Bosqich qo'shish
          </Button>
        </CardContent>
      </Card>

      {/* ── 7. Rasm ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fon rasmi (ixtiyoriy)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Rasm URL</Label>
            <Input
              value={form.backgroundImage}
              onChange={f("backgroundImage")}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              yoki fayl yuklang
            </span>
            <Separator className="flex-1" />
          </div>
          {imagePreview ? (
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-48 object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  setForm((p) => ({ ...p, backgroundImage: "" }));
                }}
              >
                <X size={14} /> O'chirish
              </Button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:border-primary hover:bg-muted/30 transition-colors"
            >
              <Upload
                size={24}
                className="mx-auto mb-2 text-muted-foreground"
              />
              <p className="text-sm font-medium">Rasm yuklash uchun bosing</p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, WebP
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </CardContent>
      </Card>

      {/* Bottom */}
      <div className="flex justify-end gap-3 pb-10">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/countries")}
        >
          Bekor qilish
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
        </Button>
      </div>
    </div>
  );
}
