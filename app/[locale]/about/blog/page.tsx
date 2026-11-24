import { supabase } from "@/lib/supabase";
import Header from "@/components/ui/header";
import BlogListClient from "@/components/ui/blogListClient";
import type { Blog } from "@/lib/blogs";
import { setRequestLocale } from "next-intl/server";

// ISR: sahifa 60s cache'lanadi (tez yuklanadi, DB kam so'raladi).
// Blog qo'shil/tahrirlanganda revalidateBlogs() darhol yangilaydi.
export const revalidate = 60;

async function getBlogs(): Promise<Blog[]> {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blogs = await getBlogs();

  return (
    <>
      <Header />
      <BlogListClient blogs={blogs} />
    </>
  );
}
