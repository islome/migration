// components/BlogDetailClient.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import Footer from "./footer";
import { renderBlogDescription } from "@/lib/blogText";

type Blog = {
  id: string;
  title: string;
  category: string;
  description: string;
  video_url: string | null;
  image_url: string | null;
  created_at: string;
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  new: { label: "Yangilik", color: "bg-blue-100 text-blue-700" },
  warning: { label: "Ogohlantirish", color: "bg-yellow-100 text-yellow-700" },
  successful_job: {
    label: "Muvaffaqiyat",
    color: "bg-green-100 text-green-700",
  },
};

export default function BlogDetailClient({ blog }: { blog: Blog }) {
  const cat = categoryConfig[blog.category];
  const hasMedia = Boolean(blog.video_url || blog.image_url);

  const date = new Date(blog.created_at).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Orqaga */}
        <Link
          href="/about/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Barcha bloglar
        </Link>

        {/* Sarlavha bloki */}
        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold ${cat?.color || "bg-gray-100 text-gray-700"}`}
            >
              {cat?.label || "Blog"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-gray-900">
            {blog.title}
          </h1>
        </header>

        {/* Kontent: mobilda media -> matn; desktopda matn (3/5) + sticky media (2/5) */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {hasMedia && (
            <figure className="lg:col-span-2 lg:order-2 lg:sticky lg:top-14">
              <div className="overflow-hidden rounded-2xl bg-gray-950 shadow-2xl ring-1 ring-gray-900/10">
                {blog.video_url ? (
                  <video
                    src={blog.video_url}
                    className="w-full max-h-[75vh] object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={blog.image_url ?? undefined}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blog.image_url!}
                    alt={blog.title}
                    className="w-full h-auto max-h-[75vh] object-contain"
                  />
                )}
              </div>
            </figure>
          )}

          <div className={hasMedia ? "lg:col-span-3 lg:order-1" : "lg:col-span-5"}>
            <div className="text-lg leading-8 text-gray-700 whitespace-pre-wrap">
              {renderBlogDescription(blog.description)}
            </div>
          </div>
        </div>

        {/* Pastki navigatsiya */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            href="/about/blog"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            Boshqa bloglarni ko&apos;rish
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
      <Footer />
    </div>
  );
}
