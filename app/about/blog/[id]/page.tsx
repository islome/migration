// app/faq/blogs/[id]/page.tsx
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BlogDetailClient from "@/components/ui/blogDetailClient";
import { notFound } from "next/navigation";
import Header from "@/components/ui/header";
import { stripBlogLinks } from "@/lib/blogText";

// ISR: detail sahifa 60s cache'lanadi; tahrir/o'chirishда revalidate qilinadi.
export const revalidate = 60;

async function getBlog(id: string) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

// Telegram/ijtimoiy tarmoqlarda ulashganda sarlavha + rasm preview chiqishi uchun
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return { title: "Blog topilmadi" };

  const description = stripBlogLinks(blog.description).slice(0, 160);
  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      ...(blog.image_url ? { images: [blog.image_url] } : {}),
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = await params; 

  const blog = await getBlog(id);
  if (!blog) return notFound();

  return (
    <div>
      <div className="px-8 pt-8 mb-8">
        <Header />
      </div>
      <BlogDetailClient blog={blog} />
    </div>
  );
}
