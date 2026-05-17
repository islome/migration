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
import { Loader2, CheckCircle, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  category: string;
  description: string;
  video_url: string;
};

const WORD_LIMIT = 250;
const MAX_SIZE_MB = 50;

export default function EditBlogClient({ blog }: { blog: Blog }) {
  const router = useRouter();
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [description, setDescription] = useState(blog.description);
  const [videoFile, setVideoFile] = useState<File | null>(null);
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
      let videoUrl = blog.video_url;

      if (videoFile) {
        const oldFileName = blog.video_url.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("videos").remove([oldFileName]);
        }

        const newFileName = `${Date.now()}-${videoFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("videos")
          .upload(newFileName, videoFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("videos")
          .getPublicUrl(newFileName);

        videoUrl = urlData.publicUrl;
      }

      const { error: dbError } = await supabase
        .from("blogs")
        .update({ title, category, description, video_url: videoUrl })
        .eq("id", blog.id);

      if (dbError) throw dbError;

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
              Video (ixtiyoriy — yangi yuklasangiz eskisi almashadi)
            </Label>
            <video
              src={`${blog.video_url}#t=0.1`}
              className="w-full rounded-xl bg-black h-40 object-contain"
              preload="metadata"
              muted
            />
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video-edit"
              />
              <label htmlFor="video-edit" className="cursor-pointer">
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
                    Yangi video yuklash uchun bosing
                  </p>
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
