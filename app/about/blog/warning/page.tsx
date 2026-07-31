import SpecialBlogSection from "@/components/ui/blog";
import { getLatestBlog } from "@/lib/blogs";

// ISR: 60s cache; blog o'zgarganda revalidateBlogs() yangilaydi.
export const revalidate = 60;

export default async function WarningPage() {
  const blog = await getLatestBlog();
  return (
    <div>
      <SpecialBlogSection blog={blog} />
    </div>
  );
}
