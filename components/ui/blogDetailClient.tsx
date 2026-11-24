"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Link2,
  MessageCircle,
  Send,
} from "lucide-react";
import Footer from "./footer";
import BlogCard from "./blogCard";
import { Reveal } from "./reveal";
import { Wave } from "./wave";
import type { Blog } from "@/lib/blogs";
import { renderBlogDescription } from "@/lib/blogText";
import {
  formatBlogDate,
  getBlogCategory,
  readingMinutes,
} from "@/lib/blogCategory";

const CONSULT_LINK = "https://t.me/ishbor12345";

// Ulashiladigan havola doim asosiy domenga yo'naltiriladi
// (localhost/preview manzili emas). Kerak bo'lsa env orqali almashtiriladi.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://namglobalhr.uz"
).replace(/\/$/, "");

function ConsultCard({ className = "" }: { className?: string }) {
  const t = useTranslations("blogDetail");
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-linear-to-br from-[#14202e] to-[#2d4356] p-7 text-white shadow-xl ${className}`}
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#89aac3]/25 blur-2xl" />
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
          <MessageCircle className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold leading-snug">{t("ctaTitle")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-blue-100/90">
          {t("ctaText")}
        </p>
        <a
          href={CONSULT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 px-6 py-3.5 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          <Send className="h-4 w-4" />
          {t("ctaButton")}
        </a>
      </div>
    </div>
  );
}

function ShareRow({ title }: { title: string }) {
  const t = useTranslations("blogDetail");
  const [copied, setCopied] = useState(false);
  // next/navigation pathname locale prefiksini (/ru, /en) saqlaydi
  const pathname = usePathname();
  const pageUrl = `${SITE_URL}${pathname}`;

  const shareTelegram = () => {
    const url = encodeURIComponent(pageUrl);
    const text = encodeURIComponent(title);
    window.open(
      `https://t.me/share/url?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard ruxsati yo'q (masalan, http) — jim o'tkazamiz
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-1 text-sm font-semibold text-gray-900">
        {t("share")}
      </span>
      <button
        type="button"
        onClick={shareTelegram}
        className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
      >
        <Send className="h-4 w-4" />
        Telegram
      </button>
      <button
        type="button"
        onClick={copyLink}
        aria-live="polite"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
          copied
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700"
        }`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? t("copied") : t("copyLink")}
      </button>
    </div>
  );
}

export default function BlogDetailClient({
  blog,
  related,
}: {
  blog: Blog;
  related: Blog[];
}) {
  const t = useTranslations("blogDetail");
  const tSection = useTranslations("blogSection");
  const locale = useLocale();

  const cat = getBlogCategory(blog.category);
  const CatIcon = cat.Icon;
  const hasMedia = Boolean(blog.video_url || blog.image_url);
  const date = formatBlogDate(blog.created_at, locale);
  const minutes = readingMinutes(blog.description);

  // Bo'sh qator bilan ajratilgan qismlar — alohida paragraf;
  // birinchisi "lead" sifatida kattaroq ko'rsatiladi.
  const paragraphs = blog.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative bg-linear-to-br from-[#14202e] to-[#2d4356] pb-32 pt-32 text-white lg:pb-44 lg:pt-40">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#89aac3]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#6f93b0]/20 blur-3xl" />

        <div className="relative container mx-auto max-w-6xl px-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-blue-100/80"
            style={{ animation: "blogFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <Link href="/" className="transition hover:text-white">
              {t("home")}
            </Link>
            <ChevronRight className="h-4 w-4 opacity-60" />
            <Link href="/about/blog" className="transition hover:text-white">
              {t("blog")}
            </Link>
            <ChevronRight className="h-4 w-4 opacity-60" />
            <span className="max-w-[40vw] truncate text-white/90 sm:max-w-xs">
              {blog.title}
            </span>
          </nav>

          <div
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
            style={{ animation: "blogFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            <span
              className={`inline-flex items-center gap-2 rounded-full bg-linear-to-r ${cat.gradient} px-4 py-2 text-sm font-semibold shadow-lg`}
            >
              <CatIcon className="h-4 w-4" />
              {tSection(cat.labelKey)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-blue-100/90">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-blue-100/90">
              <Clock className="h-4 w-4" />
              {t("minRead", { count: minutes })}
            </span>
          </div>

          <h1
            className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ animation: "blogFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}
          >
            {blog.title}
          </h1>
        </div>

        <Wave />
      </section>

      {/* KONTENT: mobil — media → matn → CTA; desktop — matn (7) + sticky media/CTA (5) */}
      <section className="relative z-10 container mx-auto -mt-20 max-w-6xl px-4 lg:-mt-28">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <aside
            className={`lg:sticky lg:top-28 lg:order-2 lg:col-span-5 space-y-6 ${hasMedia ? "" : "hidden lg:block"}`}
            style={{ animation: "blogFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
          >
            {hasMedia && (
              <figure className="overflow-hidden rounded-3xl bg-gray-950 shadow-2xl ring-1 ring-black/5">
                {blog.video_url ? (
                  <video
                    src={blog.video_url}
                    className="max-h-[70vh] w-full object-contain lg:max-h-[60vh]"
                    controls
                    playsInline
                    preload="metadata"
                    poster={blog.image_url ?? undefined}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blog.image_url!}
                    alt={blog.title}
                    className="max-h-[70vh] w-full object-contain"
                  />
                )}
              </figure>
            )}
            <ConsultCard className="hidden lg:block" />
          </aside>

          <article
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10 lg:order-1 lg:col-span-7"
            style={{ animation: "blogFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both" }}
          >
            <div className="space-y-6 text-[17px] leading-8 text-gray-700 sm:text-lg">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`whitespace-pre-line ${i === 0 ? "text-xl font-medium leading-9 text-gray-900" : ""}`}
                >
                  {renderBlogDescription(p)}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-6 border-t border-gray-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <ShareRow title={blog.title} />
              <Link
                href="/about/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("back")}
              </Link>
            </div>
          </article>

          <ConsultCard className="lg:hidden" />
        </div>
      </section>

      {/* BOSHQA BLOGLAR */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 py-20 lg:py-28">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                {t("moreTitle")}
              </h2>
              <p className="text-xl text-gray-600">{tSection("subtitle")}</p>
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1} className="h-full">
                <BlogCard blog={item} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <Link
              href="/about/blog"
              className="group inline-flex items-center gap-3 rounded-xl bg-linear-to-r from-[#14202e] to-[#2d4356] px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-2xl"
            >
              {t("more")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </Reveal>
        </section>
      )}

      {related.length === 0 && <div className="h-20" />}

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
