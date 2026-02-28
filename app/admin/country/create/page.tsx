"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload } from "lucide-react";

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
  const add = () => onChange([...items, ""]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

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
              onClick={() => remove(i)}
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
        onClick={add}
        className="gap-1.5"
      >
        <Plus size={14} /> Qo'shish
      </Button>
    </div>
  );
}

export default function CreateCountryPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async () => {
    setError("");
    if (!form.id || !form.name || !form.nameEn || !form.flag) {
      setError("ID, Nomi (UZ), Nomi (EN) va Flag majburiy!");
      return;
    }

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

      const { error: dbErr } = await supabase.from("countries").insert({
        id: form.id,
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
      });

      if (dbErr) throw dbErr;

      setSuccess(true);
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
          <h1 className="text-2xl font-bold tracking-tight">
            Yangi davlat qo'shish
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
          ✓ Davlat muvaffaqiyatli saqlandi!
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Asosiy ma'lumotlar</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>
              ID <span className="text-red-500">*</span>
            </Label>
            <Input value={form.id} onChange={f("id")} placeholder="germany" />
            <p className="text-xs text-muted-foreground">
              Kichik harf, tire bilan (masalan: saudi-arabia)
            </p>
          </div>
          <div className="space-y-1.5">
            <Label>
              Flag emoji <span className="text-red-500">*</span>
            </Label>
            <Input value={form.flag} onChange={f("flag")} placeholder="🇩🇪" />
          </div>
          <div className="space-y-1.5">
            <Label>
              Nomi (O'zbek) <span className="text-red-500">*</span>
            </Label>
            <Input
              value={form.name}
              onChange={f("name")}
              placeholder="Germaniya"
            />
          </div>
          <div className="space-y-1.5">
            <Label>
              Nomi (Ingliz) <span className="text-red-500">*</span>
            </Label>
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
              placeholder="Yuqori texnologiya va sifatli ta'lim tizimiga ega..."
              rows={2}
            />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>To'liq tavsif</Label>
            <Textarea
              value={form.fullDescription}
              onChange={f("fullDescription")}
              placeholder="Germaniya - Yevropa Ittifoqining eng kuchli iqtisodiyotiga ega davlat..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

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
            <Label>Minimum maosh ($)</Label>
            <Input
              type="number"
              value={form.salaryMin}
              onChange={f("salaryMin")}
              placeholder="3000"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Maximum maosh ($)</Label>
            <Input
              type="number"
              value={form.salaryMax}
              onChange={f("salaryMax")}
              placeholder="6000"
            />
          </div>
          <div className="space-y-1.5">
            <Label>O'rtacha maosh ($)</Label>
            <Input
              type="number"
              value={form.salaryAverage}
              onChange={f("salaryAverage")}
              placeholder="4200"
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
            <Input
              value={form.reqEducation}
              onChange={f("reqEducation")}
              placeholder="Oliy ma'lumot"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Til talabi</Label>
            <Input
              value={form.reqLanguage}
              onChange={f("reqLanguage")}
              placeholder="Nemis tili B1"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tajriba</Label>
            <Input
              value={form.reqExperience}
              onChange={f("reqExperience")}
              placeholder="Kamida 2 yil"
            />
          </div>
        </CardContent>
      </Card>

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
              placeholder="Oyiga €400-1,200..."
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Transport</Label>
            <Textarea
              value={form.lifeTransport}
              onChange={f("lifeTransport")}
              placeholder="Oylik abonement €60-100..."
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Ovqatlanish</Label>
            <Textarea
              value={form.lifeFood}
              onChange={f("lifeFood")}
              placeholder="Oyiga €200-400..."
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Sog'liqni saqlash</Label>
            <Textarea
              value={form.lifeHealthcare}
              onChange={f("lifeHealthcare")}
              placeholder="Tibbiy sug'urta €100-200..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

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
                    placeholder="Tayyorgarlik"
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
                    placeholder="3-6 oy"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Tavsif</Label>
                <Textarea
                  value={step.description}
                  onChange={(e) =>
                    setForm((p) => {
                      const next = [...p.process];
                      next[i] = { ...next[i], description: e.target.value };
                      return { ...p, process: next };
                    })
                  }
                  placeholder="Til o'rganish, hujjatlarni tayyorlash..."
                  rows={2}
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
      {success && (
        <div className=" text-sm text-green-600 font-medium">
          ✓ Davlat muvaffaqiyatli saqlandi!
        </div>
      )}
      <div className="flex justify-end gap-3 pb-10">
        <Button variant="outline" onClick={() => setForm(emptyForm)}>
          Tozalash
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saqlanmoqda..." : "Davlatni saqlash"}
        </Button>
      </div>
    </div>
  );
}
