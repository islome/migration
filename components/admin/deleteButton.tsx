"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trash2, Loader2 } from "lucide-react";

type Props = {
  id: string;
  videoUrl: string;
};

export default function DeleteButton({ id, videoUrl }: Props) {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Storage dan videoni o'chirish
      const fileName = videoUrl.split("/").pop();
      if (fileName) {
        await supabase.storage.from("videos").remove([fileName]);
      }

      // DB dan o'chirish
      await supabase.from("blogs").delete().eq("id", id);

      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Ishonchingiz komilmi?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-500 px-3 py-2 rounded-xl text-sm font-medium hover:bg-red-700 transition flex items-center gap-1"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Ha, o'chir"
          )}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
        >
          Yo'q
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium transition text-sm"
    >
      <Trash2 className="w-4 h-4" />
      O'chir
    </button>
  );
}
