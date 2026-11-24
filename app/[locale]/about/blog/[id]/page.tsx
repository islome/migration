import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import BlogDetailClient from "@/components/ui/blogDetailClient";
import { notFound } from "next/navigation";
import Header from "@/components/ui/header";
import { stripBlogLinks } from "@/lib/blogText";
import type { Blog } from "@/lib/blogs";
import { setRequestLocale } from "next-intl/server";

// ISR: detail sahifa 60s cache'lanadi; tahrir/o'chirishда revalidate qilinadi.
export const revalidate = 60;

async function getBlog(id: string): Promise<Blog | null> {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

// "Boshqa bloglar" bo'limi uchun joriy blogdan tashqari eng so'nggi 3 ta
async function getRelatedBlogs(id: string): Promise<Blog[]> {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(3);
  return data || [];
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
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const [blog, related] = await Promise.all([getBlog(id), getRelatedBlogs(id)]);
  if (!blog) return notFound();

  return (
    <>
      <Header />
      <BlogDetailClient blog={blog} related={related} />
    </>
  );
}
