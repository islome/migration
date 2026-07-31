"use client";
import { ArrowRight, MapPin, Briefcase, Code } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const t = useTranslations("aboutDev");

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white text-gray-800">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="relative h-10 md:h-12 w-[150px] md:w-[190px] flex items-center overflow-hidden">
            {/* Logo rasm holati */}
            <div
              className={`absolute inset-0 flex items-center transition-all duration-300 ${
                showLogo
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              style={{
                animation: showLogo
                  ? "fadeSlideUp 0.35s ease-out both"
                  : undefined,
              }}
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/icons/logo.png"
                  alt="Global HR logo"
                  width={140}
                  height={42}
                  className="h-8 w-auto object-contain"
                  priority
                />
                <span className="hidden md:block text-[14px] leading-tight text-gray-500">
                  Namangan
                  <br />
                  Filiali
                </span>
              </Link>
            </div>

            {/* Matn holati */}
            <div
              className={`absolute inset-0 flex items-center transition-all duration-300 ${
                showLogo
                  ? "pointer-events-none translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <Link href="/" className="flex flex-col leading-tight">
                <span className="text-xl md:text-2xl font-bold bg-black bg-clip-text text-transparent">
                  Global HR
                </span>
                <span className="text-[10px] md:text-xs text-gray-500">
                  Namangan Filiali
                </span>
              </Link>
            </div>
          </div>
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">← Bosh sahifa</Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16 md:py-24 max-w-5xl">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <div className="sticky top-24">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-4 border-white shadow-2xl mx-auto md:mx-0 relative">
                <Image
                  src="/developer.jpg"
                  alt="Islombek Kamoliddinov"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-6 md:mt-8 space-y-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Islombek
                </h1>
                <p className="text-xl text-blue-600 font-medium">{t("role")}</p>

                <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{t("location")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-5 h-5" />
                    <span>{t("work")}</span>
                  </div>
                </div>

                <div className="flex gap-6 justify-center md:justify-start mt-8">
                  <a
                    href="tel:+998882300277"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    {t("phone")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-10">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Islombek Kamoliddinov
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>{t("bio1")}</p>
                <p>{t("bio2")}</p>
                <p>{t("bio3")}</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {t("eduTitle")}
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{t("edu1Title")}</h4>
                    <p className="text-gray-600 mt-1">{t("edu1Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{t("edu2Title")}</h4>
                    <p className="text-gray-600 mt-1">{t("edu2Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{t("edu3Title")}</h4>
                    <p className="text-gray-600 mt-1">{t("edu3Desc")}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Oxirgi CTA */}
            <section className="pt-12">
              <div className="bg-linear-to-r from-[#89aac3] to-[#6f93b0] rounded-2xl p-10 text-white text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {t("ctaTitle")}
                </h3>
                <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  {t("ctaText")}
                </p>

                <a
                  href="https://t.me/justislombek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {t("ctaBtn")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
