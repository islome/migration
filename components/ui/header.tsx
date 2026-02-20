"use client";
import { cn } from "@/lib/utils";
import { Factory, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "./separator";

export default function Header() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <header className="bg-white/80 backdrop-blur-md shadow-sm fixed left-0 w-full top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="group flex items-center gap-3 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10 pointer-events-none",
              )}
            >
              <ShieldCheckIcon
                className="-ml-1 text-green-500  hidden md:block"
                aria-label="admin-panel"
              />
              <Separator
                orientation="vertical"
                className="h-5 bg-gray-300/80"
              />
            </div>

            <div className="flex items-center gap-3">
              <Factory className="w-7 h-7 md:w-8 md:h-8 text-black hidden md:block transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent tracking-tight">
                <Link href="/">Best Globalize</Link>
              </span>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/countries"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Davlatlar
            </Link>
            <Link
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Xizmatlar
            </Link>
            <Link
              href="#guide"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Qo'llanma
            </Link>
            <Link
              href="/about/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Bog'lanish
            </Link>
          </div>

          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
          >
            <span className="hidden sm:inline">Bepul konsultatsiya</span>
            <span className="sm:hidden">Konsultatsiya</span>
          </a>
        </nav>
      </header>
    </div>
  );
}
