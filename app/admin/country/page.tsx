"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  BarChart2,
  Clock,
  Construction,
  EditIcon,
  PaperclipIcon,
  Shield,
  TrashIcon,
  Users,
  VoicemailIcon,
} from "lucide-react";

const getAccentColor = (visaSuccess: string) => {
  const num = parseInt(visaSuccess);
  if (num >= 90) return "#16A34A";
  if (num >= 75) return "#2563EB";
  if (num >= 60) return "#D97706";
  return "#DC2626";
};

interface Country {
  id: string;
  name: string;
  name_en: string;
  flag: string;
  short_description: string;
  salary: string;
  popular_jobs: string[];
  visa_duration: string;
  visa_success: string;
  salary_min: number;
  salary_max: number;
}

const DollarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const VisaRing = ({ percent, color }: { percent: number; color: string }) => {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke="#F1F5F9"
        strokeWidth="5"
      />
      <circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x="26"
        y="30"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#1E293B"
      >
        {percent}%
      </text>
    </svg>
  );
};
const SkeletonCard = () => (
  <div
    style={{
      background: "#FFF",
      borderRadius: "20px",
      border: "1.5px solid #E2E8F0",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: "88px",
        background: "linear-gradient(135deg, #0F172A, #1E293B)",
      }}
    />
    <div
      style={{
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {[80, 60, 90, 70].map((w, i) => (
        <div
          key={i}
          style={{
            height: "14px",
            borderRadius: "6px",
            background: "#F1F5F9",
            width: `${w}%`,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  </div>
);

// ─── Country Card ─────────────────────────────────────────────────────────────
const CountryCard = ({
  country,
  onDetail,
  onEdit,
  onDelete,
}: {
  country: Country;
  onDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const accent = getAccentColor(country.visa_success);
  const visaNum = parseInt(country.visa_success);

  const salaryText =
    country.salary ||
    (country.salary_min && country.salary_max
      ? `$${country.salary_min.toLocaleString()} – $${country.salary_max.toLocaleString()}`
      : "—");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        border: `1.5px solid ${hovered ? accent + "40" : "#E2E8F0"}`,
        boxShadow: hovered
          ? `0 20px 60px -10px ${accent}25, 0 4px 20px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: hovered
            ? `linear-gradient(135deg, #0F172A 0%, ${accent}CC 100%)`
            : "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          transition: "background 0.3s ease",
        }}
      >
        <span style={{ fontSize: "42px", lineHeight: 1, color: "white" }}>{country.flag}</span>
        <div>
          <h3
            style={{
              margin: 0,
              color: "#FFF",
              fontSize: "22px",
              fontWeight: "700",
              letterSpacing: "-0.3px",
            }}
          >
            {country.name}
          </h3>
          <p
            style={{
              margin: "2px 0 0",
              color: "#94A3B8",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            {country.name_en}
          </p>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "20px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#475569",
            fontSize: "14px",
            lineHeight: "1.65",
          }}
        >
          {country.short_description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Salary */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "#F0FDF4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#16A34A",
                flexShrink: 0,
              }}
            >
              <DollarIcon />
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#94A3B8",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Oylik maosh
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#0F172A",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {salaryText}
              </p>
            </div>
          </div>

          {/* Popular Jobs */}
          {country.popular_jobs?.length > 0 && (
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2563EB",
                  flexShrink: 0,
                }}
              >
                <BriefcaseIcon />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    color: "#94A3B8",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Mashhur kasblar
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "#0F172A",
                    fontSize: "13.5px",
                    fontWeight: "600",
                  }}
                >
                  {country.popular_jobs.slice(0, 3).join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Visa Duration + Ring */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flex: 1,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#FFF7ED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#EA580C",
                  flexShrink: 0,
                }}
              >
                <ClockIcon />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    color: "#94A3B8",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Viza muddati
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "#0F172A",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  {country.visa_duration || "—"}
                </p>
              </div>
            </div>

            {!isNaN(visaNum) && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <VisaRing percent={visaNum} color={accent} />
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: "#94A3B8",
                      fontSize: "11px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Viza ehtimoli
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "#0F172A",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Muvaffaqiyat
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "0 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <button
          onClick={onDetail}
          style={{
            width: "100%",
            padding: "13px 20px",
            borderRadius: "12px",
            border: "none",
            background: hovered
              ? `linear-gradient(135deg, #0F172A, ${accent})`
              : "#0F172A",
            color: "#FFF",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.3s ease",
          }}
        >
          <span>Batafsil ma'lumot</span>
          <ChevronRight />
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onEdit}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              border: "1.5px solid #E2E8F0",
              background: "#F8FAFC",
              color: "#475569",
              fontSize: "13px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366F1";
              e.currentTarget.style.color = "#6366F1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.color = "#475569";
            }}
          >
            <EditIcon /> Tahrirlash
          </button>
          <button
            onClick={onDelete}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              border: "1.5px solid #FEE2E2",
              background: "#FFF5F5",
              color: "#EF4444",
              fontSize: "13px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FEE2E2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF5F5";
            }}
          >
            <TrashIcon /> O'chirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CountriesPage() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("countries")
        .select(
          "id, name, name_en, flag, short_description, salary, popular_jobs, visa_duration, visa_success, salary_min, salary_max",
        )
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setCountries(data || []);
      setLoading(false);
    };

    fetchCountries();
  }, []);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.name_en.toLowerCase().includes(search.toLowerCase()),
  );
  const deleteCountry = async (id: string) => {
    if (!confirm("Haqiqatan ham bu davlatni o'chirmoqchimisiz?")) return;
    const { error } = await supabase.from("countries").delete().eq("id", id);
    if (error) alert(error.message);
    else setCountries((prev) => prev.filter((c) => c.id !== id));
  };

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
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
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
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)",
          fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
          padding: "40px 24px 60px",
        }}
      >
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "36px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    color: "#0F172A",
                    fontSize: "32px",
                    fontWeight: "800",
                    letterSpacing: "-0.8px",
                  }}
                >
                  Davlatlar boshqaruvi
                </h1>
                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#64748B",
                    fontSize: "15px",
                  }}
                >
                  {loading
                    ? "Yuklanmoqda..."
                    : `${countries.length} ta davlat ro'yhatda`}
                </p>
              </div>

              <button
                onClick={() => router.push("/admin/country/create")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #1E293B, #0F172A)",
                  color: "#FFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(15,23,42,0.3)",
                }}
              >
                <PlusIcon /> Yangi davlat qo'shish
              </button>
            </div>

            {/* Search */}
            <div
              style={{
                marginTop: "24px",
                position: "relative",
                maxWidth: "380px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94A3B8",
                  pointerEvents: "none",
                }}
              >
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Davlat qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 42px",
                  borderRadius: "12px",
                  border: "1.5px solid #E2E8F0",
                  background: "#FFF",
                  fontSize: "14px",
                  color: "#0F172A",
                  outline: "none",
                  boxSizing: "border-box",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
              }}
            >
              {filtered.map((country) => (
                <CountryCard
                  key={country.id}
                  country={country}
                  onDetail={() => router.push(`/admin/country/${country.id}`)}
                  onEdit={() =>
                    router.push(`/admin/country/${country.id}/edit`)
                  }
                  onDelete={() => deleteCountry(country.id)}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#94A3B8",
              }}
            >
              <p style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</p>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                "{search}" uchun natija topilmadi
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
