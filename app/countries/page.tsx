"use client";

import { countries } from "@/lib/countries-data";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Clock,
  Award,
  ChevronRight,
  MessageCircle,
  UserRoundCheck,
  ShieldCheckIcon,
} from "lucide-react";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

export default function CountriesPage() {
  const telegramLink = "https://t.me/migrationuz";
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
    <div className="min-h-screen bg-white">
      <header className="bg-white/80 backdrop-blur-md shadow-sm fixed left-0 w-full top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group">
            <div className="relative h-8 w-[150px] md:w-[180px] flex items-center overflow-hidden">
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
                <Link href="/" className="flex items-center">
                  <Image
                    src="/icons/logo.png"
                    alt="Global HR logo"
                    width={140}
                    height={42}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                </Link>
              </div>

              <div
                className={`absolute inset-0 flex items-center transition-all duration-300 ${
                  showLogo
                    ? "pointer-events-none translate-y-2 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <span className="text-xl md:text-2xl font-bold bg-black bg-clip-text text-transparent">
                  <Link href="/">Global HR</Link>
                </span>
              </div>
            </div>
            <Link
              href="/admin"
              className="hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              title="Admin panel"
            >
              <ShieldCheckIcon className="w-4 h-4 text-gray-400 hover:text-blue-600 transition-colors duration-200 hover:scale-130" />
            </Link>
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
              Qo&apos;llanma
            </Link>
            <Link
              href="/about/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Bog&apos;lanish
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

      <section className="bg-white text-black py-20 mt-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Ish Topish Uchun{" "}
            <span
              style={{
                animation:
                  "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
              }}
              className="bg-blue-600 bg-clip-text text-transparent"
            >
              Eng Yaxshi
            </span>{" "}
            Davlatlar
          </h1>
          <p
            style={{
              animation:
                "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both",
            }}
            className="text-xl text-gray-500 max-w-3xl mx-auto mb-8"
          >
            Dunyoning turli burchaklarida <strong>qonuniy ish topish</strong> va{" "}
            <strong>yashash imkoniyati</strong>. Har bir davlat haqida batafsil
            ma'lumot va professional yordam.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-div">
            <div className="bg-gray-300 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold">{countries.length}+</p>
              <p className="text-black">Davlatlar</p>
            </div>
            <div className="bg-gray-300 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold">1000+</p>
              <p className="text-black">Muvaffaqiyatli mijozlar</p>
            </div>
            <div className="bg-gray-300 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold">95%+</p>
              <p className="text-black">Viza olish darajasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="container bg-white mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              {/* Country Header */}
              <div className="bg-linear-to-r from-[#14202e] to-[#2d4356] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-6xl">{country.flag}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {country.name}
                      </h3>
                      <p className="text-blue-100 text-sm">{country.nameEn}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Country Info */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {country.shortDescription}
                </p>

                {/* Quick Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Oylik maosh</p>
                      <p className="font-semibold text-gray-900">
                        {country.salary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Mashhur kasblar</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {country.popularJobs.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Viza muddati</p>
                      <p className="font-semibold text-gray-900">
                        {country.visaDuration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Viza olish ehtimoli
                      </p>
                      <p className="font-semibold text-gray-900">
                        {country.visaSuccess}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/countries/${country.id}`}
                  className="w-full bg-[#2d4356] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Batafsil ma'lumot
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Qaysi davlat sizga mos kelishini bilmayapsizmi?
          </h2>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Mutaxassislarimiz sizga eng mos davlatni tanlashda va barcha
            jarayonlarda yordam beradi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-lg font-semibold justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Telegramda yozish
            </a>
            <Link
              href="/register"
              className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-lg font-semibold justify-center"
            >
              <UserRoundCheck className="w-5 h-5" />
              Ma'lumot qoldirish
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
