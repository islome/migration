"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  CheckCircle,
  Upload,
  ArrowLeft,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { revalidateBlogs } from "@/app/admin/blogs/actions";

type Blog = {
  id: string;
  title: string;
  category: string;
  description: string;
  video_url: string | null;
  image_url: string | null;
};

const WORD_LIMIT = 250;
const MAX_SIZE_MB = 50; // video
const MAX_IMAGE_SIZE_MB = 10; // rasm

export default function EditBlogClient({ blog }: { blog: Blog }) {
  const router = useRouter();
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [description, setDescription] = useState(blog.description);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Link modal
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [savedSelection, setSavedSelection] = useState({ start: 0, end: 0 });

  const wordCount = description.trim()
    ? description.trim().split(/\s+/).length
    : 0;

  function openLinkModal() {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    setSavedSelection({ start, end });
    setLinkText(description.substring(start, end) || "");
    setLinkUrl("");
    setShowLinkModal(true);
  }

  function insertLink() {
    const markdown = `[${linkText || "link"}](${linkUrl || "#"})`;
    const { start, end } = savedSelection;
    setDescription(
      description.substring(0, start) + markdown + description.substring(end),
    );
    setShowLinkModal(false);
  }

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_IMAGE_SIZE_MB) {
      setError(`Rasm hajmi ${MAX_IMAGE_SIZE_MB}MB dan oshmasligi kerak!`);
      return;
    }
    setError("");
    setImageFile(file);
  };

  const handleSave = async () => {
    if (!title || !category || !description) {
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
      let videoUrl: string | null = blog.video_url;
      let imageUrl: string | null = blog.image_url;

      // Yangi video yuklansa — eskisini o'chirib, yangisini qo'yamiz
      if (videoFile) {
        if (blog.video_url) {
          const oldFileName = blog.video_url.split("/").pop();
          if (oldFileName) {
            await supabase.storage.from("videos").remove([oldFileName]);
          }
        }

        const newFileName = `${Date.now()}-${videoFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("videos")
          .upload(newFileName, videoFile, { cacheControl: "31536000" });
        if (uploadError) throw uploadError;

        videoUrl = supabase.storage.from("videos").getPublicUrl(newFileName)
          .data.publicUrl;
      }

      // Yangi rasm yuklansa — eskisini o'chirib, yangisini qo'yamiz
      if (imageFile) {
        if (blog.image_url) {
          const oldFileName = blog.image_url.split("/").pop();
          if (oldFileName) {
            await supabase.storage.from("blog-images").remove([oldFileName]);
          }
        }

        const newFileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(newFileName, imageFile, { cacheControl: "31536000" });
        if (uploadError) throw uploadError;

        imageUrl = supabase.storage.from("blog-images").getPublicUrl(newFileName)
          .data.publicUrl;
      }

      // Kamida bittasi (video yoki rasm) bo'lishi shart
      if (!videoUrl && !imageUrl) {
        setError("Kamida video yoki rasm bo'lishi kerak!");
        setLoading(false);
        return;
      }

      const { error: dbError } = await supabase
        .from("blogs")
        .update({
          title,
          category,
          description,
          video_url: videoUrl,
          image_url: imageUrl,
        })
        .eq("id", blog.id);

      if (dbError) throw dbError;

      // Public/admin ro'yxatlarni darhol yangilash (best-effort)
      try {
        await revalidateBlogs();
      } catch {
        /* revalidatsiya xatosi asosiy oqimni buzmasin */
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/blogs"), 1500);
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <Link
        href="/admin/blogs"
        className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition text-sm w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Orqaga
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Blogni tahrirlash
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label>Sarlavha</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog sarlavhasi"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Kategoriya</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger>
                <SelectValue />
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
            <Label>
              Tavsif
              <span
                className={`ml-2 text-sm ${wordCount > WORD_LIMIT ? "text-red-500" : "text-gray-400"}`}
              >
                {wordCount}/{WORD_LIMIT} so'z
              </span>
            </Label>

            {/* Toolbar */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={openLinkModal}
                className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-200 rounded-md bg-gray-50 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                🔗 Link qo'shish
              </button>
            </div>

            <Textarea
              ref={textareaRef}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={wordCount > WORD_LIMIT ? "border-red-500" : ""}
            />
            <p className="text-xs text-gray-400">
              💡 Link formati: [matn](https://url.com)
            </p>
          </div>

          {/* Link Modal */}
          {showLinkModal && (
            <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 w-80 shadow-xl space-y-4">
                <h3 className="font-semibold text-lg">🔗 Link qo'shish</h3>
                <div className="space-y-1">
                  <Label>Link matni</Label>
                  <Input
                    placeholder="Bu yerga bosing"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>URL</Label>
                  <Input
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && insertLink()}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowLinkModal(false)}
                  >
                    Bekor
                  </Button>
                  <Button onClick={insertLink}>Qo'shish</Button>
                </div>
              </div>
            </div>
          )}

          {/* Video */}
          <div className="space-y-2">
            <Label>
              Video{" "}
              <span className="text-sm text-gray-400 font-normal">
                (ixtiyoriy — yangi yuklasangiz eskisi almashadi)
              </span>
            </Label>
            {blog.video_url && (
              <video
                src={`${blog.video_url}#t=0.1`}
                className="w-full rounded-xl bg-black h-40 object-contain"
                preload="metadata"
                muted
              />
            )}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video-edit"
              />
              <label htmlFor="video-edit" className="cursor-pointer block">
                <Upload className="w-7 h-7 text-gray-400 mx-auto mb-2" />
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
                  <p className="text-gray-500 text-sm">
                    {blog.video_url
                      ? "Yangi video yuklash uchun bosing"
                      : "Video yuklash uchun bosing"}
                  </p>
                )}
              </label>
            </div>
          </div>

          {/* Rasm */}
          <div className="space-y-2">
            <Label>
              Rasm{" "}
              <span className="text-sm text-gray-400 font-normal">
                (ixtiyoriy — video bo'lmasa shu ko'rsatiladi)
              </span>
            </Label>
            {blog.image_url && !imageFile && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full rounded-xl bg-black h-40 object-contain"
              />
            )}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-edit"
              />
              <label htmlFor="image-edit" className="cursor-pointer block">
                {imageFile ? (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="preview"
                      className="mx-auto max-h-40 rounded-lg mb-2 object-contain"
                    />
                    <p className="font-medium text-green-600">
                      {imageFile.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {(imageFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-7 h-7 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      {blog.image_url
                        ? "Yangi rasm yuklash uchun bosing"
                        : "Rasm yuklash uchun bosing"}
                    </p>
                  </>
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
              Muvaffaqiyatli saqlandi! Yo'naltirilmoqda...
            </div>
          )}

          {/* Save */}
          <Button
            onClick={handleSave}
            disabled={loading || wordCount > WORD_LIMIT}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saqlanmoqda...
              </>
            ) : (
              "Saqlash"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
