import { supabase } from "@/lib/supabase";

export type Blog = {
  id: string;
  title: string;
  category: string;
  description: string;
  video_url: string | null;
  image_url: string | null;
  created_at: string;
};

// Bosh sahifa / warning sahifasi uchun eng oxirgi blog.
// Server komponentlarda chaqiriladi (ISR bilan cache'lanadi).
export async function getLatestBlog(): Promise<Blog | null> {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}
