import { AlertTriangle, CheckCircle2, Sparkles, type LucideIcon } from "lucide-react";

// Blog kategoriyalari uchun yagona manba: bosh sahifa bo'limi, kartochkalar
// va detail sahifa bir xil rang/ikonka/label ishlatadi.
// labelKey — "blogSection" namespace'idagi tarjima kaliti.
export type BlogCategory = {
  labelKey: "catNew" | "catWarning" | "catSuccess";
  gradient: string;
  Icon: LucideIcon;
};

const categories: Record<string, BlogCategory> = {
  new: {
    labelKey: "catNew",
    gradient: "from-blue-600 to-indigo-600",
    Icon: Sparkles,
  },
  warning: {
    labelKey: "catWarning",
    gradient: "from-red-600 to-orange-600",
    Icon: AlertTriangle,
  },
  successful_job: {
    labelKey: "catSuccess",
    gradient: "from-green-600 to-emerald-600",
    Icon: CheckCircle2,
  },
};

const fallback: BlogCategory = {
  labelKey: "catNew",
  gradient: "from-gray-700 to-gray-900",
  Icon: Sparkles,
};

export function getBlogCategory(category: string): BlogCategory {
  return categories[category] ?? fallback;
}

// Sana qo'lda formatlanadi: toLocaleDateString server (Node) va brauzerda
// turlicha chiqadi (masalan, Chrome uz uchun "2026 M07 31" beradi) —
// bu hydration xatosiga olib keladi. Vaqt mintaqasi ham qat'iy: Toshkent (UTC+5).
const MONTHS: Record<string, string[]> = {
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const TASHKENT_OFFSET_MS = 5 * 60 * 60 * 1000; // O'zbekistonda DST yo'q

export function formatBlogDate(iso: string, locale: string): string {
  const d = new Date(Date.parse(iso) + TASHKENT_OFFSET_MS);
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  const month = (MONTHS[locale] ?? MONTHS.uz)[d.getUTCMonth()];

  if (locale === "en") return `${month} ${day}, ${year}`;
  if (locale === "ru") return `${day} ${month} ${year} г.`;
  return `${day}-${month}, ${year}`;
}

// ~200 so'z/daqiqa; kamida 1 daqiqa.
export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
