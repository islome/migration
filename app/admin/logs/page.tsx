"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Shield,
  Clock,
  Trash2,
  ArrowLeftRight,
  Users,
  BarChart2,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Hash,
  Logs,
  PencilIcon,
  FileQuestion,
} from "lucide-react";

type Log = {
  id: string;
  action: "delete" | "status_change";
  user_id: string;
  user_name: string;
  details: string;
  performed_by: string;
  created_at: string;
};

const PAGE_SIZE = 15;

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchLogs = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const { data, error } = await supabase
      .from("activity_log")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setLogs(data);
    if (isRefresh) setRefreshing(false);
    else setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const totalPages = Math.max(1, Math.ceil(logs.length / PAGE_SIZE));
  const paginated = logs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearAllLogs = async () => {
    if (!confirm("Barcha loglar o'chib ketadi. Davom etasizmi?")) return;

    const { error } = await supabase
      .from("activity_log")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (!error) {
      setLogs([]);
      setPage(1);
    }
  };
  return (
    <div className="min-h-screen bg-[#f0f5f9]">
      {/* Header */}
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
              className="flex items-center gap-2 text-sm text-[#4a7a9b] bg-[#89aac3]/15 px-3 py-1.5 rounded-lg border border-[#89aac3]/30 transition"
            >
              <Logs className="w-3.5 h-3.5" />
              Logs
            </Link>
             <Link
              href="/admin/faq"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <FileQuestion className="w-3.5 h-3.5" />
              FAQs
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <PencilIcon className="w-3.5 h-3.5" />
              Blogs
            </Link>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearAllLogs}
              className="flex items-center gap-2 bg-white border border-red-200 hover:border-red-400 text-red-400 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4" />
              Loglarni tozalash
            </button>
            <button
              onClick={() => fetchLogs(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#89aac3] text-gray-500 hover:text-[#4a7a9b] px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm disabled:opacity-60"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Yangilash
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-[#4a7a9b]" />
            <h1 className="text-xl font-bold text-gray-800">Activity Log</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Barcha o'chirish va status o'zgarishlari tarixi
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              icon: Clock,
              label: "Jami amallar",
              value: logs.length,
              color: "blue",
            },
            {
              icon: Trash2,
              label: "O'chirishlar",
              value: logs.filter((l) => l.action === "delete").length,
              color: "red",
            },
            {
              icon: ArrowLeftRight,
              label: "Status o'zgarishlar",
              value: logs.filter((l) => l.action === "status_change").length,
              color: "green",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {label}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${color === "blue" ? "bg-[#89aac3]/15" : color === "red" ? "bg-red-50" : "bg-green-50"}`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${color === "blue" ? "text-[#4a7a9b]" : color === "red" ? "text-red-500" : "text-green-500"}`}
                  />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#89aac3]" />
            <p className="text-gray-400 text-sm">Yuklanmoqda...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-10">
                    <Hash className="w-3.5 h-3.5" />
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Amal
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Foydalanuvchi
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Tafsilot
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Vaqt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-gray-400 text-sm"
                    >
                      Hozircha log yo'q
                    </td>
                  </tr>
                ) : (
                  paginated.map((log, index) => (
                    <tr
                      key={log.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4 text-gray-400 text-xs font-mono">
                        {(page - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-5 py-4">
                        {log.action === "delete" ? (
                          <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs px-2.5 py-1 rounded-full">
                            <Trash2 className="w-3 h-3" />
                            O'chirildi
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-600 text-xs px-2.5 py-1 rounded-full">
                            <ArrowLeftRight className="w-3 h-3" />
                            Status o'zgardi
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#89aac3]/20 flex items-center justify-center text-xs font-semibold text-[#4a7a9b] shrink-0">
                            {log.user_name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <span className="text-gray-700 font-medium">
                            {log.user_name || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {log.details || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-mono">
                          {log.performed_by || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs font-mono">
                        {new Date(log.created_at).toLocaleString("uz-UZ", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {logs.length > PAGE_SIZE && (
              <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/40">
                <p className="text-xs text-gray-400">
                  {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, logs.length)} / {logs.length} ta
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-[#4a7a9b] hover:border-[#89aac3] disabled:opacity-30 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition ${page === p ? "bg-[#89aac3] text-white border border-[#89aac3]" : "border border-gray-200 text-gray-500 hover:text-[#4a7a9b] hover:border-[#89aac3]"}`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-[#4a7a9b] hover:border-[#89aac3] disabled:opacity-30 transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
