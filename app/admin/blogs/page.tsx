import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  BarChart2,
  Clock,
  Construction,
  PaperclipIcon,
  Pencil,
  Plus,
  Shield,
  Users,
  VoicemailIcon,
} from "lucide-react";
import DeleteButton from "@/components/admin/deleteButton";

async function getBlogs() {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  new: { label: "Yangilik", color: "bg-blue-100 text-blue-700" },
  warning: { label: "Ogohlantirish", color: "bg-yellow-100 text-yellow-700" },
  successful_job: {
    label: "Muvaffaqiyat",
    color: "bg-green-100 text-green-700",
  },
};

export default async function AdminBlogs() {
  const blogs = await getBlogs();

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#89aac3]/15 border border-[#89aac3]/30 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#4a7a9b]" />
            </div>
            <div>
              <span className="font-semibold text-gray-800 text-sm">
                Admin Panel
              </span>
              <p className="text-gray-400 text-xs">Best Globalize</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Users className="w-3.5 h-3.5" />
              Foydalanuvchilar
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Statistika
            </Link>
            <Link
              href="/admin/logs"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Clock className="w-3.5 h-3.5" />
              Logs
            </Link>
            <Link
              href="/admin/country"
              className="flex items-center gap-2 text-sm text-[#4a7a9b] bg-[#89aac3]/15 px-3 py-1.5 rounded-lg border border-[#89aac3]/30 transition"
            >
              <Construction className="w-3.5 h-3.5" />
              Davlat
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center gap-2 text-sm text-[#4a7a9b] bg-[#89aac3]/15 px-3 py-1.5 rounded-lg border border-[#89aac3]/30 transition"
            >
              <PaperclipIcon className="w-3.5 h-3.5" />
              Blogs
            </Link>
            <Link
              href="/admin/faq"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <VoicemailIcon className="w-3.5 h-3.5" />
              FAQs
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">bestie</span>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900">Bloglar</h1>
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Yangi blog
          </Link>
        </div>

        {/* List */}
        {blogs.length === 0 ? (
          <p className="text-gray-400 text-center py-20">Hozircha blog yo'q</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => {
              const cat = categoryConfig[blog.category];
              return (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5"
                >
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${cat?.color}`}
                    >
                      {cat?.label}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(blog.created_at).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition text-sm"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Link>
                    <DeleteButton id={blog.id} videoUrl={blog.video_url} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
