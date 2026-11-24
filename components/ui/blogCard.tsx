import { ArrowRight, Calendar, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Blog } from "@/lib/blogs";
import { formatBlogDate, getBlogCategory } from "@/lib/blogCategory";
import { stripBlogLinks, truncateWords } from "@/lib/blogText";

// Blog kartochkasi — butun karta detail sahifaga olib boradi
// (media'ni alohida tab'da ochmaydi).
export default function BlogCard({ blog }: { blog: Blog }) {
  const t = useTranslations("blogSection");
  const tList = useTranslations("blogList");
  const locale = useLocale();
  const cat = getBlogCategory(blog.category);
  const CatIcon = cat.Icon;

  return (
    <Link
      href={`/about/blog/${blog.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-950">
        {blog.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.image_url}
            alt={blog.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : blog.video_url ? (
          <video
            src={`${blog.video_url}#t=0.1`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            preload="metadata"
            muted
            playsInline
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-sm text-white/80">
            {tList("noMedia")}
          </div>
        )}

        {blog.video_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 text-gray-800" fill="currentColor" />
            </span>
          </div>
        )}

        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r ${cat.gradient} px-3 py-1.5 text-xs font-semibold text-white shadow-md`}
        >
          <CatIcon className="h-3.5 w-3.5" />
          {t(cat.labelKey)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          {formatBlogDate(blog.created_at, locale)}
        </span>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-700">
          {blog.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {truncateWords(stripBlogLinks(blog.description), 25)}
        </p>
        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3">
          {tList("readMore")}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
