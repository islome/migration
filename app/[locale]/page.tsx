import HomeClient from "@/components/homeClient";
import { getLatestBlog } from "@/lib/blogs";

// ISR: bosh sahifa 60s cache'lanadi; blog qo'shil/tahrirlanganda
// revalidateBlogs() ("/" yo'lini ham) darhol yangilaydi.
export const revalidate = 60;

export default async function Home() {
  const latestBlog = await getLatestBlog();
  return <HomeClient latestBlog={latestBlog} />;
}
