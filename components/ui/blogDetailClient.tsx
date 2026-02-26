// components/BlogDetailClient.tsx
"use client";

import Footer from "./footer";

type Blog = {
  id: string;
  title: string;
  category: string;
  description: string;
  video_url: string;
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          <div className="space-y-10 lg:sticky lg:top-12 lg:pr-8 xl:pr-12 pl-4 lg:pl-0 p-4">
            <span
              className={`inline-block px-5 py-2.5 rounded-full text-base font-semibold shadow-sm ${cat?.color || "bg-blue-100 text-blue-800"}`}
            >
              {cat?.label || "Kategoriya"}
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-600 font-medium">
              {new Date(blog.created_at).toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              yilda elon qilgan
            </p>

            <p className="text-2xl leading-relaxed text-gray-700">
              {blog.description}
            </p>
          </div>

          <div className="w-auto order-2 lg:order-0 overflow-hidden lg:self-start">
            <video
              src={blog.video_url}
              style={{ height: "740px", width: "auto" }}
              className="object-cover rounded-2xl mx-auto block"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
