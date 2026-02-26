// app/blogs/page.tsx
import { supabase } from "@/lib/supabase";
import VideoCard from "@/components/ui/videoCard"; // ← import qo'sh
import Header from "@/components/ui/header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categoryConfig = {
  new: { label: "Yangilik", color: "bg-blue-100 text-blue-700" },
  warning: { label: "Ogohlantirish", color: "bg-yellow-100 text-yellow-700" },
  successful_job: {
    label: "Muvaffaqiyat",
    color: "bg-green-100 text-green-700",
  },
};
function truncateWords(text: string, wordLimit: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}
async function getBlogs() {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <Header />
      <section className="container mx-auto px-4 py-20 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bloglar</h2>
          <p className="text-xl text-gray-600">Eng so'nggi yangiliklar</p>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">Hozircha blog yo'q</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const cat =
                categoryConfig[blog.category as keyof typeof categoryConfig];
              return (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 animate-div"
                >
                  <VideoCard src={blog.video_url} title={blog.title} />

                  <div className="p-6">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${cat.color}`}
                    >
                      {cat.label}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 whitespace-pre-wrap">
                      {truncateWords(blog.description, 25)}{" "}
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                      {new Date(blog.created_at).toLocaleDateString("uz-UZ")}
                    </p>
                    <Link
                      href={`/about/blog/${blog.id}`}
                      className="mt-4 flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                    >
                      Batafsil ko'rish
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
