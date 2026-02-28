"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Shield,
  BarChart2,
  Users,
  Loader2,
  TrendingUp,
  PieChart as PieIcon,
  CheckCircle2,
  Clock,
  Logs,
  FileQuestion,
  PencilIcon,
  Construction,
} from "lucide-react";

type User = {
  id: string;
  status: "kutmoqda" | "yakunlangan";
  intention: string;
};

const intentions = [
  { value: "Malumot berish", label: "Ma'lumot olish" },
  { value: "Konsultatsiya", label: "Konsultatsiyaga yozilish" },
  { value: "Aloqaga chiqish", label: "Aloqaga chiqish" },
  { value: "Vizaga yordam", label: "Viza olishda yordam" },
  { value: "Ish topish", label: "Ish topishda yordam" },
  { value: "Boshqa", label: "Boshqa" },
];

const STATUS_COLORS = {
  kutmoqda: "#f59e0b",
  yakunlangan: "#22c55e",
};

const BAR_COLORS = [
  "#89aac3",
  "#6b8fa8",
  "#a8c4d8",
  "#4a7a9b",
  "#7bb3cc",
  "#5d9ab8",
];

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-800">
          {payload[0].value}{" "}
          <span className="text-sm font-normal text-gray-400">ta</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs text-gray-500 mb-1">{payload[0].name}</p>
        <p
          className="text-lg font-bold"
          style={{ color: payload[0].payload.fill }}
        >
          {payload[0].value}{" "}
          <span className="text-sm font-normal text-gray-400">ta</span>
        </p>
        <p className="text-xs text-gray-400">{payload[0].payload.percent}%</p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, status, intention");
      if (!error && data) setUsers(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const total = users.length;
  const kutmoqdaCount = users.filter((u) => u.status === "kutmoqda").length;
  const yakunlanganCount = users.filter(
    (u) => u.status === "yakunlangan",
  ).length;

  const statusData = [
    {
      name: "Kutmoqda",
      value: kutmoqdaCount,
      fill: STATUS_COLORS.kutmoqda,
      percent: total > 0 ? ((kutmoqdaCount / total) * 100).toFixed(1) : "0",
    },
    {
      name: "Yakunlangan",
      value: yakunlanganCount,
      fill: STATUS_COLORS.yakunlangan,
      percent: total > 0 ? ((yakunlanganCount / total) * 100).toFixed(1) : "0",
    },
  ];

  const intentionData = intentions.map((int, i) => ({
    label: int.label,
    shortLabel:
      int.label.length > 14 ? int.label.slice(0, 13) + "…" : int.label,
    count: users.filter((u) => u.intention === int.value).length,
    fill: BAR_COLORS[i % BAR_COLORS.length],
  }));

  const maxIntention = Math.max(...intentionData.map((d) => d.count), 1);

  return (
    <div className="min-h-screen bg-[#f0f5f9]">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
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
              className="flex items-center gap-2 text-sm text-[#4a7a9b] bg-[#89aac3]/15 px-3 py-1.5 rounded-lg border border-[#89aac3]/30 transition"
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
              <PencilIcon className="w-3.5 h-3.5" />
              Blogs
            </Link>
            <Link
              href="/admin/faq"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <FileQuestion className="w-3.5 h-3.5" />
              FAQs
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-[#4a7a9b]" />
            <h1 className="text-xl font-bold text-gray-800">Statistika</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Foydalanuvchilar holati va maqsadlari tahlili
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#89aac3]" />
            <p className="text-gray-400 text-sm">Yuklanmoqda...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top summary cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Jami
                  </span>
                  <div className="w-8 h-8 bg-[#89aac3]/15 rounded-xl flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#4a7a9b]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{total}</p>
                <p className="text-xs text-gray-400 mt-1">ta foydalanuvchi</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Kutmoqda
                  </span>
                  <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-yellow-500">
                  {kutmoqdaCount}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {total > 0 ? ((kutmoqdaCount / total) * 100).toFixed(1) : "0"}
                  % jami dan
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Yakunlangan
                  </span>
                  <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-500">
                  {yakunlanganCount}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {total > 0
                    ? ((yakunlanganCount / total) * 100).toFixed(1)
                    : "0"}
                  % jami dan
                </p>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Pie Chart — Status */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <PieIcon className="w-4 h-4 text-[#4a7a9b]" />
                  <h2 className="text-sm font-semibold text-gray-700">
                    Status taqsimoti
                  </h2>
                </div>
                <p className="text-xs text-gray-400 mb-6">
                  Kutmoqda va yakunlangan nisbati
                </p>

                {total === 0 ? (
                  <div className="flex items-center justify-center h-48 text-gray-300 text-sm">
                    Ma'lumot yo'q
                  </div>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          labelLine={false}
                          label={renderCustomLabel}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomPieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="flex flex-col gap-2 mt-4">
                      {statusData.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 border border-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ background: item.fill }}
                            />
                            <span className="text-xs text-gray-600 font-medium">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-800">
                              {item.value}
                            </span>
                            <span className="text-xs text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded-md">
                              {item.percent}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Bar Chart — Intentions */}
              <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart2 className="w-4 h-4 text-[#4a7a9b]" />
                  <h2 className="text-sm font-semibold text-gray-700">
                    Maqsadlar tahlili
                  </h2>
                </div>
                <p className="text-xs text-gray-400 mb-6">
                  Har bir maqsad bo'yicha murojaat soni
                </p>

                {total === 0 ? (
                  <div className="flex items-center justify-center h-48 text-gray-300 text-sm">
                    Ma'lumot yo'q
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={intentionData}
                      margin={{ top: 5, right: 10, left: -20, bottom: 60 }}
                      barSize={32}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="shortLabel"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        tickLine={false}
                        axisLine={false}
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        domain={[0, maxIntention + 1]}
                      />
                      <Tooltip
                        content={<CustomBarTooltip />}
                        cursor={{ fill: "#f0f5f9" }}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {intentionData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Intention breakdown list */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[#4a7a9b]" />
                <h2 className="text-sm font-semibold text-gray-700">
                  Maqsadlar reytingi
                </h2>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Ko'p murojaatdan kamiga qarab tartiblangan
              </p>

              <div className="space-y-3">
                {[...intentionData]
                  .sort((a, b) => b.count - a.count)
                  .map((item, index) => {
                    const pct =
                      total > 0 ? Math.round((item.count / total) * 100) : 0;
                    return (
                      <div key={item.label} className="flex items-center gap-4">
                        <span className="text-xs font-mono text-gray-300 w-5 text-right">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-600 w-48 shrink-0 truncate">
                          {item.label}
                        </span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${maxIntention > 0 ? (item.count / maxIntention) * 100 : 0}%`,
                              background: item.fill,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-bold text-gray-700 w-6 text-right">
                            {item.count}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-md w-12 text-center">
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
