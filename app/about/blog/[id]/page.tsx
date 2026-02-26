// app/faq/blogs/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import BlogDetailClient from "@/components/ui/blogDetailClient";
import { notFound } from "next/navigation";
import Header from "@/components/ui/header";

async function getBlog(id: string) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  return data;
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
