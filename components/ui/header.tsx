import { Factory, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  return (
    <div>
      <header className="bg-white/80 backdrop-blur-md shadow-sm fixed left-0 w-full top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group">
            <Factory className="w-8 h-8 text-black hidden md:block" />
            <span className="text-xl md:text-2xl font-bold bg-black bg-clip-text text-transparent">
              <Link href={"/"}>Best Globalize</Link>
            </span>
            <Link
              href="/admin"
              className="hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ml-1"
              title="Admin panel"
            >
              <ShieldCheckIcon className="w-4 h-4 text-gray-400 hover:text-blue-600 transition-colors duration-200 hover:scale-130" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/countries"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Davlatlar
            </Link>
            <Link
              href="/about/services"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Xizmatlar
            </Link>
            <Link
              href="/about/guide"
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
