import { countries } from "@/lib/countries-data";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  DollarSign,
  Clock,
  Award,
  Globe,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

export default function CountriesPage() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  const phoneLink = "tel:+998777670017";
  const phoneNumber = "+998 77 767 00 17";
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Best Globalize
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Bosh sahifa
            </Link>
            <Link href="/countries" className="text-blue-600 font-semibold">
              Davlatlar
            </Link>
            <Link
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Xizmatlar
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
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Bepul konsultatsiya
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Ish Topish Uchun Eng Yaxshi Davlatlar
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Dunyoning turli burchaklarida qonuniy ish topish va yashash
            imkoniyati. Har bir davlat haqida batafsil ma'lumot va professional
            yordam.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold">{countries.length}+</p>
              <p className="text-blue-100">Davlatlar</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold">1000+</p>
              <p className="text-blue-100">Muvaffaqiyatli mijozlar</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold">95%+</p>
              <p className="text-blue-100">Viza olish darajasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              {/* Country Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
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
                    <DollarSign className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Oylik maosh</p>
                      <p className="font-semibold text-gray-900">
                        {country.salary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Mashhur kasblar</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {country.popularJobs.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Viza muddati</p>
                      <p className="font-semibold text-gray-900">
                        {country.visaDuration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
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

                {/* CTA Button */}
                <Link
                  href={`/countries/${country.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Batafsil ma'lumot
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Qaysi davlat sizga mos kelishini bilmayapsizmi?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Mutaxassislarimiz sizga eng mos davlatni tanlashda va barcha
            jarayonlarda yordam beradi.
          </p>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-lg font-semibold justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            Telegramda yozish
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">
                  Best Globalize
                </span>
              </div>
              <p className="text-gray-400">
                Xalqaro mehnat bozorida ishonchli hamkoringiz
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Havolalar</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-blue-400 transition">
                    Bosh sahifa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/countries"
                    className="hover:text-blue-400 transition"
                  >
                    Davlatlar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    Xizmatlar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Yordam</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    Bog'lanish
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    Maxfiylik
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Bog'lanish</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <a
                    href={phoneLink}
                    className="hover:text-blue-400 transition flex items-center gap-2"
                  ></a>
                  <Phone className="w-4 h-4" />
                  {phoneNumber}
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition flex items-center gap-2"
                  ></a>
                  <Mail className="w-4 h-4" />
                  migrationnamangan@mail.uz
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Best Globalize. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
