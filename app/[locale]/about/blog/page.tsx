// app/blogs/page.tsx
import { supabase } from "@/lib/supabase";
import VideoCard from "@/components/ui/videoCard";
import Header from "@/components/ui/header";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { stripBlogLinks, truncateWords } from "@/lib/blogText";
import { getTranslations, setRequestLocale } from "next-intl/server";

// ISR: sahifa 60s cache'lanadi (tez yuklanadi, DB kam so'raladi).
// Blog qo'shil/tahrirlanganda revalidateBlogs() darhol yangilaydi.
export const revalidate = 60;

const categoryKeys: Record<string, "catNew" | "catWarning" | "catSuccess"> = {
  new: "catNew",
  warning: "catWarning",
  successful_job: "catSuccess",
};

const categoryColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  successful_job: "bg-green-100 text-green-700",
};

const dateLocales: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

async function getBlogs() {
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

  const t = await getTranslations("blogList");
  const blogs = await getBlogs();

  return (
    <>
      <Header />
      <section className="container mx-auto px-4 py-20 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600">{t("subtitle")}</p>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const catKey = categoryKeys[blog.category];
              return (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 animate-div"
                >
                  <VideoCard
                    videoUrl={blog.video_url}
                    imageUrl={blog.image_url}
                    title={blog.title}
                  />

                  <div className="p-6">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[blog.category] || "bg-gray-100 text-gray-700"}`}
                    >
                      {catKey ? t(catKey) : blog.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {truncateWords(stripBlogLinks(blog.description), 25)}{" "}
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                      {new Date(blog.created_at).toLocaleDateString(
                        dateLocales[locale] || "uz-UZ",
                      )}
                    </p>
                    <Link
                      href={`/about/blog/${blog.id}`}
                      className="mt-4 flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                    >
                      {t("readMore")}
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
