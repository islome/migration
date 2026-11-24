"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Newspaper,
  Play,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Blog } from "@/lib/blogs";
import {
  formatBlogDate,
  getBlogCategory,
  readingMinutes,
} from "@/lib/blogCategory";
import { stripBlogLinks, truncateWords } from "@/lib/blogText";
import BlogCard from "./blogCard";
import Footer from "./footer";
import { Reveal } from "./reveal";
import { Wave } from "./wave";

const FILTERS = ["all", "new", "warning", "successful_job"] as const;
type Filter = (typeof FILTERS)[number];

// Eng so'nggi post — katta gorizontal karta (bosh sahifadagi blog bo'limi uslubida)
function FeaturedCard({ blog }: { blog: Blog }) {
  const t = useTranslations("blogList");
  const tSection = useTranslations("blogSection");
  const tDetail = useTranslations("blogDetail");
  const locale = useLocale();
  const cat = getBlogCategory(blog.category);
  const CatIcon = cat.Icon;

  return (
    <Link
      href={`/about/blog/${blog.id}`}
      className="group grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-shadow duration-300 hover:shadow-[0_30px_60px_-15px_rgba(20,32,46,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 md:grid-cols-2"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-950 md:aspect-auto md:min-h-[380px] lg:min-h-[440px]">
        {blog.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.image_url}
            alt={blog.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : blog.video_url ? (
          <video
            src={`${blog.video_url}#t=0.1`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            preload="metadata"
            muted
            playsInline
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#89aac3] to-[#6f93b0]" />
        )}
        {blog.video_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-transform group-hover:scale-110">
              <Play className="ml-1 h-9 w-9 text-white" fill="currentColor" />
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
        <span
          className={`inline-flex items-center gap-2 self-start rounded-full bg-linear-to-r ${cat.gradient} px-4 py-2 text-sm font-semibold text-white`}
        >
          <CatIcon className="h-4 w-4" />
          {tSection(cat.labelKey)}
        </span>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatBlogDate(blog.created_at, locale)}
          </span>
          <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {tDetail("minRead", { count: readingMinutes(blog.description) })}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-blue-700 lg:text-3xl xl:text-4xl">
          {blog.title}
        </h2>
        <p className="mt-4 line-clamp-4 leading-relaxed text-gray-600">
          {truncateWords(stripBlogLinks(blog.description), 40)}
        </p>

        <span className="mt-8 inline-flex items-center gap-3 self-start rounded-xl bg-linear-to-r from-[#14202e] to-[#2d4356] px-8 py-4 font-semibold text-white transition-shadow group-hover:shadow-xl">
          {t("readMore")}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogListClient({ blogs }: { blogs: Blog[] }) {
  const t = useTranslations("blogList");
  const tSection = useTranslations("blogSection");
  const tDetail = useTranslations("blogDetail");
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: blogs.length };
    for (const b of blogs) c[b.category] = (c[b.category] ?? 0) + 1;
    return c;
  }, [blogs]);

  const visible =
    filter === "all" ? blogs : blogs.filter((b) => b.category === filter);
  const [featured, ...rest] = visible;

  // Bo'sh toifalarni ko'rsatmaymiz ("Barchasi" doim bor)
  const filters = FILTERS.filter((f) => f === "all" || counts[f]);

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative bg-linear-to-br from-[#14202e] to-[#2d4356] pb-32 pt-32 text-white lg:pb-40 lg:pt-40">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#89aac3]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#6f93b0]/20 blur-3xl" />

        <div className="relative container mx-auto max-w-6xl px-4 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1.5 text-sm text-blue-100/80"
            style={{ animation: "blogFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <Link href="/" className="transition hover:text-white">
              {tDetail("home")}
            </Link>
            <ChevronRight className="h-4 w-4 opacity-60" />
            <span className="text-white/90">{tDetail("blog")}</span>
          </nav>

          <h1
            className="mt-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            style={{ animation: "blogFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            {t("title")}
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-lg text-blue-100/90 md:text-xl"
            style={{ animation: "blogFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}
          >
            {tSection("subtitle")}
          </p>
        </div>

        <Wave />
      </section>

      <section className="relative z-10 container mx-auto -mt-12 max-w-6xl px-4 pb-20 lg:pb-28">
        {/* FILTRLAR */}
        {blogs.length > 0 && (
          <div
            role="group"
            aria-label={t("filterLabel")}
            className="mx-auto mb-12 flex w-fit max-w-full gap-2 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl [scrollbar-width:none]"
            style={{ animation: "blogFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
          >
            {filters.map((f) => {
              const active = filter === f;
              const label =
                f === "all" ? t("all") : tSection(getBlogCategory(f).labelKey);
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {counts[f] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {!featured ? (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-dashed border-gray-200 bg-white px-8 py-16 text-center">
            <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Newspaper className="h-8 w-8" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{t("empty")}</p>
          </div>
        ) : (
          <>
            <Reveal key={`featured-${filter}`}>
              <FeaturedCard blog={featured} />
            </Reveal>

            {rest.length > 0 && (
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((blog, i) => (
                  <Reveal
                    key={`${filter}-${blog.id}`}
                    delay={(i % 3) * 0.1}
                    className="h-full"
                  >
                    <BlogCard blog={blog} />
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <Footer />

      <style>{`
        @keyframes blogFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="blogFadeUp"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
