import SpecialBlogSection from "@/components/ui/blog";
import { getLatestBlog } from "@/lib/blogs";
import { setRequestLocale } from "next-intl/server";

// ISR: 60s cache; blog o'zgarganda revalidateBlogs() yangilaydi.
export const revalidate = 60;

export default async function WarningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blog = await getLatestBlog();
  return (
    <div>
      <SpecialBlogSection blog={blog} />
    </div>
  );
}
