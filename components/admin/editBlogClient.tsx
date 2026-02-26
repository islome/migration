"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, CheckCircle, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

type Blog = {
  id: string
  title: string
  category: string
  description: string
  video_url: string
}

const WORD_LIMIT = 250
const MAX_SIZE_MB = 50

export default function EditBlogClient({ blog }: { blog: Blog }) {
  const router = useRouter()
  const [title, setTitle] = useState(blog.title)
  const [category, setCategory] = useState(blog.category)
  const [description, setDescription] = useState(blog.description)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const wordCount = description.trim()
    ? description.trim().split(/\s+/).length
    : 0

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > MAX_SIZE_MB) {
      setError(`Video hajmi ${MAX_SIZE_MB}MB dan oshmasligi kerak!`)
      return
    }
    setError("")
    setVideoFile(file)
  }

  const handleSave = async () => {
    if (!title || !category || !description) {
      setError("Barcha maydonlarni to'ldiring!")
      return
    }
    if (wordCount > WORD_LIMIT) {
      setError(`Description ${WORD_LIMIT} so'zdan oshmasligi kerak!`)
      return
    }

    setLoading(true)
    setError("")

    try {
      let videoUrl = blog.video_url

      // Yangi video yuklangan bo'lsa
      if (videoFile) {
        // Eskisini o'chir
        const oldFileName = blog.video_url.split("/").pop()
        if (oldFileName) {
          await supabase.storage.from("videos").remove([oldFileName])
        }

        // Yangisini yuklash
        const newFileName = `${Date.now()}-${videoFile.name}`
        const { error: uploadError } = await supabase.storage
          .from("videos")
          .upload(newFileName, videoFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from("videos")
          .getPublicUrl(newFileName)

        videoUrl = urlData.publicUrl
      }

      // DB update
      const { error: dbError } = await supabase
        .from("blogs")
        .update({ title, category, description, video_url: videoUrl })
        .eq("id", blog.id)

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => router.push("/admin/blogs"), 1500)
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi!")
    } finally {
      setLoading(false)
    }
  }

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
          <CardTitle className="text-2xl font-bold">Blogni tahrirlash</CardTitle>
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
                <SelectItem value="successful_job">✅ Muvaffaqiyatli ish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>
              Tavsif
              <span className={`ml-2 text-sm ${wordCount > WORD_LIMIT ? "text-red-500" : "text-gray-400"}`}>
                {wordCount}/{WORD_LIMIT} so'z
              </span>
            </Label>
            <Textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={wordCount > WORD_LIMIT ? "border-red-500" : ""}
            />
          </div>

          {/* Video */}
          <div className="space-y-2">
            <Label>Video (ixtiyoriy — yangi yuklasangiz eskisi almashadi)</Label>

            {/* Joriy video preview */}
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
                    <p className="font-medium text-green-600">{videoFile.name}</p>
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
  )
}
