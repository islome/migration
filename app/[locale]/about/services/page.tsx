"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  FileCheck,
  Languages,
  MessageCircle,
  MonitorCheck,
  UserCheck,
  BookOpen,
} from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useTranslations } from "next-intl";

// ─── Scroll animatsiya uchun hook ──────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Vizual meta (ikonka/ranglar) — matn tarjima faylidan keladi
const serviceMeta = [
  {
    icon: MessageCircle,
    key: "s1" as const,
    badgeColor: "bg-green-100 text-green-700",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    accentColor: "group-hover:border-blue-400",
  },
  {
    icon: FileCheck,
    key: "s2" as const,
    badgeColor: "bg-blue-100 text-blue-700",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    accentColor: "group-hover:border-green-400",
  },
  {
    icon: Languages,
    key: "s3" as const,
    badgeColor: "bg-purple-100 text-purple-700",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    accentColor: "group-hover:border-purple-400",
  },
  {
    icon: BookOpen,
    key: "s4" as const,
    badgeColor: "bg-orange-100 text-orange-700",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    accentColor: "group-hover:border-orange-400",
  },
  {
    icon: UserCheck,
    key: "s5" as const,
    badgeColor: "bg-gray-100 text-gray-700",
    iconBg: "bg-gray-50",
    iconColor: "text-gray-600",
    accentColor: "group-hover:border-gray-400",
  },
  {
    icon: MonitorCheck,
    key: "s6" as const,
    badgeColor: "bg-yellow-100 text-yellow-700",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    accentColor: "group-hover:border-yellow-400",
  },
];

type ServiceItem = {
  icon: (typeof serviceMeta)[number]["icon"];
  title: string;
  desc: string;
  badge: string;
  badgeColor: string;
  iconBg: string;
  iconColor: string;
  accentColor: string;
};

function ServiceCard({
  item,
  index,
  detailLabel,
}: {
  item: ServiceItem;
  index: number;
  detailLabel: string;
}) {
  const { ref, inView } = useInView();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
      }}
    >
      <div
        className={`group bg-white rounded-2xl p-7 border-2 border-transparent ${item.accentColor} shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
      >
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center`}
          >
            <Icon className={`w-7 h-7 ${item.iconColor}`} />
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badgeColor}`}
          >
            {item.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {item.desc}
        </p>

        <button className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:gap-3 transition-all duration-200">
          {detailLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations("servicesPage");
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();

  const services: ServiceItem[] = serviceMeta.map((meta) => ({
    icon: meta.icon,
    title: t(`${meta.key}Title`),
    desc: t(`${meta.key}Desc`),
    badge: t(`${meta.key}Badge`),
    badgeColor: meta.badgeColor,
    iconBg: meta.iconBg,
    iconColor: meta.iconColor,
    accentColor: meta.accentColor,
  }));

  const stats = [
    { value: 1000, suffix: "+", label: t("stat1") },
    { value: 10, suffix: "+", label: t("stat2") },
    { value: 95, suffix: "%", label: t("stat3") },
    { value: 5, suffix: t("stat4Suffix"), label: t("stat4") },
  ];

  return (
    <section id="services" className="bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-18 mt-20 pb-18">
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto"
          style={{
            transition: "opacity 0.7s ease, transform 0.7s ease",
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-500">{t("subtitle")}</p>
        </div>
      </div>

      {/* ── Service Cards ── */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <ServiceCard
              key={index}
              item={item}
              index={index}
              detailLabel={t("detail")}
            />
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 py-14">
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{
              transition: "opacity 0.7s ease, transform 0.7s ease",
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? "translateY(0)" : "translateY(24px)",
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-1">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
