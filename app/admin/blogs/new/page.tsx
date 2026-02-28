"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Upload,
  CheckCircle,
  Shield,
  Users,
  BarChart2,
  Clock,
  FileQuestion,
  PencilIcon,
  Construction,
} from "lucide-react";

const WORD_LIMIT = 250;
const MAX_SIZE_MB = 50;

export default function AdminBlogsPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [adminUsername, setAdminUsername] = useState("");

  const wordCount = description.trim()
    ? description.trim().split(/\s+/).length
    : 0;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      setError(`Video hajmi ${MAX_SIZE_MB}MB dan oshmasligi kerak!`);
      return;
    }
    setError("");
    setVideoFile(file);
  };

  const handleSubmit = async () => {
    // Validation
    if (!title || !category || !description || !videoFile) {
      setError("Barcha maydonlarni to'ldiring!");
      return;
    }
    if (wordCount > WORD_LIMIT) {
      setError(`Description ${WORD_LIMIT} so'zdan oshmasligi kerak!`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Videoni Storage ga yuklash
      const fileName = `${Date.now()}-${videoFile.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("videos")
        .upload(fileName, videoFile);

      if (storageError) throw storageError;

      // 2. Public URL olish
      const { data: urlData } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      const videoUrl = urlData.publicUrl;

      // 3. DB ga saqlash
      const { error: dbError } = await supabase.from("blogs").insert({
        title,
        category,
        description,
        video_url: videoUrl,
      });

      if (dbError) throw dbError;

      // Reset
      setTitle("");
      setCategory("");
      setDescription("");
      setVideoFile(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#89aac3]/15 border border-[#89aac3]/30 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#4a7a9b]" />
            </div>
            <div>
              <span className="font-semibold text-gray-800 text-sm">
                Admin Panel
              </span>
              <p className="text-gray-400 text-xs">Best Globalize</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Users className="w-3.5 h-3.5" />
              Foydalanuvchilar
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Statistika
            </Link>
            <Link
              href="/admin/logs"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Clock className="w-3.5 h-3.5" />
              Logs
            </Link>
            <Link
              href="/admin/country"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Construction className="w-3.5 h-3.5" />
              Davlat
            </Link>
            <Link
              href="/admin/faq"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <FileQuestion className="w-3.5 h-3.5" />
              FAQs
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center gap-2 text-sm text-[#4a7a9b] bg-[#89aac3]/15 px-3 py-1.5 rounded-lg border border-[#89aac3]/30 transition"
            >
              <PencilIcon className="w-3.5 h-3.5" />
              Blogs
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">bestie</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-8 mt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Yangi Blog Qo'shish
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Sarlavha</Label>
              <Input
                id="title"
                placeholder="Blog sarlavhasini kiriting"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Kategoriya</Label>
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategoriya tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">🆕 Yangilik</SelectItem>
                  <SelectItem value="warning">⚠️ Ogohlantirish</SelectItem>
                  <SelectItem value="successful_job">
                    ✅ Muvaffaqiyatli ish
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Tavsif
                <span
                  className={`ml-2 text-sm ${wordCount > WORD_LIMIT ? "text-red-500" : "text-gray-400"}`}
                >
                  {wordCount}/{WORD_LIMIT} so'z
                </span>
              </Label>
              <Textarea
                id="description"
                placeholder="Blog tavsifini kiriting (max 250 so'z)"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={wordCount > WORD_LIMIT ? "border-red-500" : ""}
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <Label>Video (max 50MB)</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  {videoFile ? (
                    <div>
                      <p className="font-medium text-green-600">
                        {videoFile.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600">
                        Video yuklash uchun bosing
                      </p>
                      <p className="text-sm text-gray-400">
                        MP4, MOV, AVI (max 50MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Blog muvaffaqiyatli qo'shildi!
              </div>
            )}

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={loading || wordCount > WORD_LIMIT}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Yuklanmoqda...
                </>
              ) : (
                "Blog Qo'shish"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
