import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import type { Blog } from "@/lib/blogs";
import { stripBlogLinks, truncateWords } from "@/lib/blogText";

// Kategoriyaga mos badge (rang + ikonka)
const categoryConfig: Record<
  string,
  { label: string; gradient: string; Icon: typeof Sparkles }
> = {
  new: {
    label: "Yangilik",
    gradient: "from-blue-600 to-indigo-600",
    Icon: Sparkles,
  },
  warning: {
    label: "Muhim ogohlantirish",
    gradient: "from-red-600 to-orange-600",
    Icon: AlertTriangle,
  },
  successful_job: {
    label: "Muvaffaqiyatli ish",
    gradient: "from-green-600 to-emerald-600",
    Icon: CheckCircle2,
  },
};

// Bosh sahifadagi "eng oxirgi blog" bo'limi.
// Presentational: blog server tomonda fetch qilinib prop orqali keladi —
// yangi blog qo'shilganda (revalidate orqali) o'z-o'zidan yangilanadi.
export default function SpecialBlogSection({ blog }: { blog: Blog | null }) {
  if (!blog) return null;

  const cat = categoryConfig[blog.category] || {
    label: "Blog",
    gradient: "from-gray-700 to-gray-900",
    Icon: Sparkles,
  };
  const CatIcon = cat.Icon;

  const detailHref = `/about/blog/${blog.id}`;
  const teaser = truncateWords(stripBlogLinks(blog.description), 45);
  const date = new Date(blog.created_at).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Bizning Bloglar
        </h2>
        <p className="text-xl text-gray-600">
          Eng so&apos;nggi yangilik va e&apos;lonlarimiz bilan tanishing
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Matn qismi */}
            <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className={`bg-linear-to-r ${cat.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 w-fit`}
                >
                  <CatIcon className="w-4 h-4" />
                  {cat.label}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {date}
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h2>

              <p className="text-gray-700 leading-relaxed text-sm lg:text-base whitespace-pre-wrap line-clamp-6">
                {teaser}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6 lg:mt-8">
                <Link
                  href={detailHref}
                  className="group inline-flex items-center gap-3 bg-linear-to-r from-[#14202e] to-[#2d4356] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold w-fit text-sm lg:text-base"
                >
                  Batafsil ma&apos;lumot
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="/about/blog"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm lg:text-base"
                >
                  Barcha bloglar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Media qismi — butun panel detail sahifaga olib boradi */}
            <Link
              href={detailHref}
              className="relative bg-gray-950 order-1 lg:order-2 flex items-center justify-center overflow-hidden group aspect-video lg:aspect-auto lg:min-h-[420px]"
            >
              {blog.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : blog.video_url ? (
                <video
                  src={`${blog.video_url}#t=0.1`}
                  className="absolute inset-0 w-full h-full object-cover"
                  preload="metadata"
                  muted
                  playsInline
                />
              ) : null}

              {blog.video_url ? (
                <>
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all" />
                  <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-full p-8 group-hover:bg-white/30 transition-all group-hover:scale-110">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
