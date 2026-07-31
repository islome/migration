"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./languageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [showLogo, setShowLogo] = useState(false);

  const isActive = (href: string) => {
    if (href === "/countries") {
      return pathname === "/countries" || pathname.startsWith("/countries/");
    }

    if (href === "/about/services") {
      return (
        pathname === "/about/services" || pathname.startsWith("/about/services")
      );
    }

    if (href === "/about/guide") {
      return pathname === "/about/guide" || pathname.startsWith("/about/guide");
    }

    if (href === "/about/contact") {
      return (
        pathname === "/about/contact" || pathname.startsWith("/about/contact")
      );
    }

    return pathname === href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <header className="bg-white/80 backdrop-blur-md shadow-sm fixed left-0 w-full top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group">
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
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/countries"
              className={`transition ${
                isActive("/countries")
                  ? "font-bold text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {t("countries")}
            </Link>
            <Link
              href="/about/services"
              className={`transition ${
                isActive("/about/services")
                  ? "font-bold text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {t("services")}
            </Link>
            <Link
              href="/about/guide"
              className={`transition ${
                isActive("/about/guide")
                  ? "font-bold text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {t("guide")}
            </Link>
            <Link
              href="/about/contact"
              className={`transition ${
                isActive("/about/contact")
                  ? "font-bold text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher />
            <a
              href="https://t.me/NAMANGAN2308"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              <span className="hidden sm:inline">{t("consultFull")}</span>
              <span className="sm:hidden">{t("consultShort")}</span>
            </a>
          </div>
        </nav>
      </header>

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
