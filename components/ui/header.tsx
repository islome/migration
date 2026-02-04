import { Factory } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
    const telegramLink = "https://t.me/BestGlobalizeNamangan";
  return (
    <div>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Factory className="w-8 h-8 text-black" />
            <span className="text-2xl font-bold bg-black bg-clip-text text-transparent">
              Best Globalize
            </span>
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
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Bog'lanish
            </Link>
          </div>

          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Bepul konsultatsiya
          </a>
        </nav>
      </header>
    </div>
  );
}
