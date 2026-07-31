import HomeClient from "@/components/homeClient";
import { getLatestBlog } from "@/lib/blogs";
import { setRequestLocale } from "next-intl/server";

// ISR: bosh sahifa 60s cache'lanadi; blog qo'shil/tahrirlanganda
// revalidateBlogs() darhol yangilaydi.
export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const latestBlog = await getLatestBlog();
  return <HomeClient latestBlog={latestBlog} />;
}
