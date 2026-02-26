import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import EditBlogClient from "@/components/admin/editBlogClient";

async function getBlog(id: string) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return notFound();

  return <EditBlogClient blog={blog} />;
}
