"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Shield,
  LogOut,
  Loader2,
  Eye,
  EyeOff,
  Search,
  ArrowUp,
  ArrowDown,
  Users,
  Phone,
  Calendar,
  Target,
  Hash,
  X,
  Trash2,
  AlertTriangle,
  ArrowUpDown,
  Clock,
  CheckCircle2,
  RefreshCw,
  Download,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Minus,
  Logs,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
type User = {
  id: string;
  full_name: string;
  number: string;
  created_at: string;
  intention: string;
  status: "kutmoqda" | "yakunlangan";
};

type Toast = {
  id: number;
  type: "success" | "error" | "info";
  message: string;
};

type SortOrder = "newest" | "oldest";
type StatusFilter = "all" | "kutmoqda" | "yakunlangan";

const PAGE_SIZE = 10;

function ToastContainer({
  toasts,
  remove,
}: {
  toasts: Toast[];
  remove: (id: number) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 animate-in slide-in-from-bottom-2 ${
            t.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : t.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-[#89aac3]/10 border-[#89aac3]/30 text-[#4a7a9b]"
          }`}
        >
          {t.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : t.type === "error" ? (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          ) : (
            <Clock className="w-4 h-4 shrink-0" />
          )}
          {t.message}
          <button
            onClick={() => remove(t.id)}
            className="ml-1 opacity-50 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Pagination
  const [page, setPage] = useState(1);

  // Selection (bulk)
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Modals
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [bulkStatusLoading, setBulkStatusLoading] = useState(false);

  // Toast
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Toast helpers ────────────────────────────────────────
  const addToast = useCallback((type: Toast["type"], message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500,
    );
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Log activity ─────────────────────────────────────────
  const logActivity = async (
    action: string,
    userId: string,
    userName: string,
    details: string,
  ) => {
    await supabase.from("activity_log").insert({
      action,
      user_id: userId,
      user_name: userName,
      details,
      performed_by: adminUsername,
    });
  };

  // ── Login ────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const { data, error } = await supabase
      .from("admin")
      .select("id")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      setLoginError("Username yoki parol noto'g'ri");
      setLoginLoading(false);
      return;
    }

    setAdminUsername(username);
    setIsLoggedIn(true);
    setLoginLoading(false);
  };

  // ── Fetch users ──────────────────────────────────────────
  const fetchUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setUsersLoading(true);

    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, number, created_at, intention, status")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data);
      setSelected(new Set());
    }
    if (isRefresh) {
      setRefreshing(false);
      addToast("info", "Yangilandi");
    } else setUsersLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchUsers();
  }, [isLoggedIn]);

  // ── Filter + sort ────────────────────────────────────────
  useEffect(() => {
    let result = [...users];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(q) ||
          u.number?.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((u) => u.status === statusFilter);
    }

    result.sort((a, b) => {
      const diff =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });

    setFiltered(result);
    setPage(1);
    setSelected(new Set());
  }, [search, sortOrder, statusFilter, users]);

  // ── Pagination ───────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Selection helpers ────────────────────────────────────
  const isAllPageSelected =
    paginated.length > 0 && paginated.every((u) => selected.has(u.id));
  const isSomeSelected = selected.size > 0;

  const toggleSelectAll = () => {
    if (isAllPageSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        paginated.forEach((u) => next.delete(u.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        paginated.forEach((u) => next.add(u.id));
        return next;
      });
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Single delete ─────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", deleteTarget.id);

    if (!error) {
      await logActivity(
        "delete",
        deleteTarget.id,
        deleteTarget.full_name,
        "Foydalanuvchi o'chirildi",
      );
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      addToast("success", `${deleteTarget.full_name} o'chirildi`);
    } else {
      addToast("error", "O'chirishda xatolik yuz berdi");
    }

    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  // ── Bulk delete ───────────────────────────────────────────
  const handleBulkDelete = async () => {
    setDeleteLoading(true);
    const ids = Array.from(selected);
    const names = users
      .filter((u) => ids.includes(u.id))
      .map((u) => u.full_name);

    const { error } = await supabase.from("users").delete().in("id", ids);

    if (!error) {
      for (let i = 0; i < ids.length; i++) {
        await logActivity("delete", ids[i], names[i] ?? "—", "Bulk delete");
      }
      setUsers((prev) => prev.filter((u) => !ids.includes(u.id)));
      setSelected(new Set());
      addToast("success", `${ids.length} ta foydalanuvchi o'chirildi`);
    } else {
      addToast("error", "Xatolik yuz berdi");
    }

    setDeleteLoading(false);
    setBulkDeleteOpen(false);
  };

  // ── Single status toggle ──────────────────────────────────
  const handleToggleStatus = async (user: User) => {
    setTogglingId(user.id);
    const newStatus =
      user.status === "yakunlangan" ? "kutmoqda" : "yakunlangan";

    const { error } = await supabase
      .from("users")
      .update({ status: newStatus })
      .eq("id", user.id);

    if (!error) {
      await logActivity(
        "status_change",
        user.id,
        user.full_name,
        `Status: ${user.status} → ${newStatus}`,
      );
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
      );
      addToast(
        "success",
        `${user.full_name} → ${newStatus === "yakunlangan" ? "Yakunlangan" : "Kutmoqda"}`,
      );
    } else {
      addToast("error", "Status o'zgartirishda xatolik");
    }
    setTogglingId(null);
  };

  // ── Bulk status change ────────────────────────────────────
  const handleBulkStatus = async (newStatus: "kutmoqda" | "yakunlangan") => {
    setBulkStatusLoading(true);
    const ids = Array.from(selected);

    const { error } = await supabase
      .from("users")
      .update({ status: newStatus })
      .in("id", ids);

    if (!error) {
      const names = users
        .filter((u) => ids.includes(u.id))
        .map((u) => u.full_name);
      for (let i = 0; i < ids.length; i++) {
        await logActivity(
          "status_change",
          ids[i],
          names[i] ?? "—",
          `Bulk → ${newStatus}`,
        );
      }
      setUsers((prev) =>
        prev.map((u) => (ids.includes(u.id) ? { ...u, status: newStatus } : u)),
      );
      setSelected(new Set());
      addToast(
        "success",
        `${ids.length} ta → ${newStatus === "yakunlangan" ? "Yakunlangan" : "Kutmoqda"}`,
      );
    } else {
      addToast("error", "Xatolik yuz berdi");
    }
    setBulkStatusLoading(false);
  };

  // ── Export CSV ────────────────────────────────────────────
  const exportCSV = () => {
    const rows = [
      ["#", "Ism", "Raqam", "Maqsad", "Status", "Sana"],
      ...filtered.map((u, i) => [
        i + 1,
        u.full_name || "",
        u.number || "",
        u.intention || "",
        u.status || "",
        new Date(u.created_at).toLocaleDateString("uz-UZ"),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("success", "CSV yuklab olindi");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsers([]);
    setFiltered([]);
    setUsername("");
    setPassword("");
    setSearch("");
    setSelected(new Set());
  };

  const kutmoqda = users.filter((u) => u.status === "kutmoqda").length;
  const yakunlangan = users.filter((u) => u.status === "yakunlangan").length;

  // LOGIN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#89aac3] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative bg-white border border-white/60 rounded-2xl w-full max-w-sm p-8 shadow-2xl shadow-[#5a7f9c]/20">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#89aac3]/20 border border-[#89aac3]/40 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-[#4a7a9b]" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
            <p className="text-gray-400 text-xs mt-1 tracking-widest uppercase">
              Best Globalize
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#89aac3] focus:ring-2 focus:ring-[#89aac3]/20 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#89aac3] focus:ring-2 focus:ring-[#89aac3]/20 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-500 text-xs px-3 py-2.5 rounded-lg">
                <X className="w-3.5 h-3.5 shrink-0" />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#89aac3] hover:bg-[#7299b5] text-white text-sm font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Kirish...
                </>
              ) : (
                "Kirish"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f0f5f9] text-gray-800">
      <ToastContainer toasts={toasts} remove={removeToast} />

      {/* ── Single Delete Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => !deleteLoading && setDeleteTarget(null)}
          />
          <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  O'chirishni tasdiqlang
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  <span className="text-gray-800 font-medium">
                    {deleteTarget.full_name}
                  </span>{" "}
                  bazadan butunlay o'chib ketadi.
                </p>
              </div>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-left space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {deleteTarget.number || "—"}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Target className="w-3 h-3 text-gray-400" />
                  {deleteTarget.intention || "—"}
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleteLoading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {deleteLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      O'chirish
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Bulk Delete Modal ── */}
      {bulkDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => !deleteLoading && setBulkDeleteOpen(false)}
          />
          <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bulk o'chirish
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  <span className="text-gray-800 font-medium">
                    {selected.size} ta
                  </span>{" "}
                  foydalanuvchi butunlay o'chib ketadi.
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setBulkDeleteOpen(false)}
                  disabled={deleteLoading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={deleteLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {deleteLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      {selected.size} tasini o'chir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
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
              className="flex items-center gap-2 text-sm text-[#4a7a9b] bg-[#89aac3]/15 px-3 py-1.5 rounded-lg border border-[#89aac3]/30 transition"
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
              <Logs className="w-3.5 h-3.5" />
              Logs
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">{adminUsername}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition px-3 py-1.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Users, label: "Jami", value: users.length, color: "blue" },
            {
              icon: Clock,
              label: "Kutmoqda",
              value: kutmoqda,
              color: "yellow",
            },
            {
              icon: CheckCircle2,
              label: "Yakunlangan",
              value: yakunlangan,
              color: "green",
            },
            {
              icon: Calendar,
              label: "Bugun",
              value: users.filter(
                (u) =>
                  new Date(u.created_at).toDateString() ===
                  new Date().toDateString(),
              ).length,
              color: "purple",
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
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${color === "blue" ? "bg-[#89aac3]/15" : color === "yellow" ? "bg-yellow-50" : color === "green" ? "bg-green-50" : "bg-purple-50"}`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${color === "blue" ? "text-[#4a7a9b]" : color === "yellow" ? "text-yellow-500" : color === "green" ? "text-green-500" : "text-purple-500"}`}
                  />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-5">
          {(
            [
              { key: "all", label: "Barchasi", count: users.length },
              { key: "kutmoqda", label: "Kutmoqda", count: kutmoqda },
              { key: "yakunlangan", label: "Yakunlangan", count: yakunlangan },
            ] as { key: StatusFilter; label: string; count: number }[]
          ).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${statusFilter === key ? (key === "kutmoqda" ? "bg-yellow-50 border-yellow-300 text-yellow-700" : key === "yakunlangan" ? "bg-green-50 border-green-300 text-green-700" : "bg-[#89aac3]/15 border-[#89aac3]/40 text-[#4a7a9b]") : "bg-white border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              {label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-md font-semibold ${statusFilter === key ? (key === "kutmoqda" ? "bg-yellow-100 text-yellow-700" : key === "yakunlangan" ? "bg-green-100 text-green-700" : "bg-[#89aac3]/20 text-[#4a7a9b]") : "bg-gray-100 text-gray-400"}`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ism yoki raqam bo'yicha qidirish..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#89aac3] focus:ring-2 focus:ring-[#89aac3]/20 transition shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() =>
              setSortOrder((p) => (p === "newest" ? "oldest" : "newest"))
            }
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#89aac3] text-gray-500 hover:text-[#4a7a9b] px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm whitespace-nowrap"
          >
            {sortOrder === "newest" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
            {sortOrder === "newest" ? "Eng yangi" : "Eng eski"}
          </button>

          <button
            onClick={() => fetchUsers(true)}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#89aac3] text-gray-500 hover:text-[#4a7a9b] px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm disabled:opacity-60 whitespace-nowrap"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Yangilash
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#89aac3] text-gray-500 hover:text-[#4a7a9b] px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>

        {/* Bulk action bar */}
        {isSomeSelected && (
          <div className="flex items-center gap-3 bg-[#89aac3]/10 border border-[#89aac3]/30 rounded-xl px-4 py-3 mb-4">
            <span className="text-sm font-medium text-[#4a7a9b]">
              {selected.size} ta tanlandi
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => handleBulkStatus("yakunlangan")}
                disabled={bulkStatusLoading}
                className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 text-xs font-medium px-3 py-1.5 rounded-lg transition disabled:opacity-50"
              >
                {bulkStatusLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                Yakunlangan
              </button>
              <button
                onClick={() => handleBulkStatus("kutmoqda")}
                disabled={bulkStatusLoading}
                className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 hover:bg-yellow-100 text-xs font-medium px-3 py-1.5 rounded-lg transition disabled:opacity-50"
              >
                {bulkStatusLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Clock className="w-3.5 h-3.5" />
                )}
                Kutmoqda
              </button>
              <button
                onClick={() => setBulkDeleteOpen(true)}
                className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-xs font-medium px-3 py-1.5 rounded-lg transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                O'chirish
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {usersLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#89aac3]" />
            <p className="text-gray-400 text-sm">Yuklanmoqda...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    {/* Select all */}
                    <th className="px-4 py-4 w-10">
                      <button
                        onClick={toggleSelectAll}
                        className="flex items-center justify-center text-gray-400 hover:text-[#4a7a9b] transition"
                      >
                        {isAllPageSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#4a7a9b]" />
                        ) : isSomeSelected &&
                          paginated.some((u) => selected.has(u.id)) ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-10">
                      <Hash className="w-3.5 h-3.5" />
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Ism
                      </div>
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        Raqam
                      </div>
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" />
                        Maqsad
                      </div>
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Sana
                      </div>
                    </th>
                    <th className="px-4 py-4 w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-16">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Search className="w-5 h-5 text-gray-400" />
                          </div>
                          <p className="text-gray-400 text-sm">
                            {search
                              ? "Hech narsa topilmadi"
                              : "Foydalanuvchilar yo'q"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginated.map((user, index) => {
                      const isYakunlangan = user.status === "yakunlangan";
                      const isToggling = togglingId === user.id;
                      const isSelected = selected.has(user.id);

                      return (
                        <tr
                          key={user.id}
                          className={`hover:bg-[#89aac3]/5 transition-colors duration-150 group ${isYakunlangan ? "opacity-60" : ""} ${isSelected ? "bg-[#89aac3]/5" : ""}`}
                        >
                          {/* Checkbox */}
                          <td className="px-4 py-4">
                            <button
                              onClick={() => toggleSelect(user.id)}
                              className="flex items-center justify-center text-gray-300 hover:text-[#4a7a9b] transition"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-[#4a7a9b]" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                          </td>

                          <td className="px-4 py-4 text-gray-400 text-xs font-mono">
                            {(page - 1) * PAGE_SIZE + index + 1}
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#89aac3]/30 to-[#6b8fa8]/20 border border-[#89aac3]/20 flex items-center justify-center shrink-0 text-xs font-semibold text-[#4a7a9b]">
                                {user.full_name?.charAt(0)?.toUpperCase() ||
                                  "?"}
                              </div>
                              <span
                                className={`font-medium text-gray-700 ${isYakunlangan ? "line-through text-gray-400" : ""}`}
                              >
                                {user.full_name || "—"}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              {user.number || "—"}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            {user.intention ? (
                              <span className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-purple-600 text-xs px-2.5 py-1 rounded-full">
                                <Target className="w-3 h-3" />
                                {user.intention}
                              </span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleToggleStatus(user)}
                              disabled={isToggling}
                              title={
                                isYakunlangan
                                  ? "Kutmoqdaga qaytarish"
                                  : "Yakunlangan deb belgilash"
                              }
                              className="flex items-center gap-1.5 transition-all"
                            >
                              {isToggling ? (
                                <Loader2 className="w-4 h-4 animate-spin text-[#89aac3]" />
                              ) : isYakunlangan ? (
                                <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-600 text-xs px-2.5 py-1 rounded-full hover:bg-green-100 transition">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Yakunlangan
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-600 text-xs px-2.5 py-1 rounded-full hover:bg-yellow-100 transition">
                                  <Clock className="w-3 h-3" />
                                  Kutmoqda
                                </span>
                              )}
                            </button>
                          </td>

                          <td className="px-4 py-4 text-gray-400 text-xs font-mono">
                            {new Date(user.created_at).toLocaleDateString(
                              "uz-UZ",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <button
                              onClick={() => setDeleteTarget(user)}
                              className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            {filtered.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/40">
                <p className="text-xs text-gray-400">
                  {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filtered.length)} /{" "}
                  {filtered.length} ta
                  {search && ` — "${search}"`}
                </p>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-[#4a7a9b] hover:border-[#89aac3] disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (p) =>
                        p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                    )
                    .reduce<(number | "…")[]>((acc, p, i, arr) => {
                      if (i > 0 && p - (arr[i - 1] as number) > 1)
                        acc.push("…");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "…" ? (
                        <span
                          key={`ellipsis-${i}`}
                          className="w-7 h-7 flex items-center justify-center text-xs text-gray-400"
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition ${page === p ? "bg-[#89aac3] text-white border border-[#89aac3]" : "border border-gray-200 text-gray-500 hover:text-[#4a7a9b] hover:border-[#89aac3]"}`}
                        >
                          {p}
                        </button>
                      ),
                    )}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-[#4a7a9b] hover:border-[#89aac3] disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <ArrowUpDown className="w-3 h-3" />
                  {sortOrder === "newest" ? "Yangi → Eski" : "Eski → Yangi"}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
