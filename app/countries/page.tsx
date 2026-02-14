import { countries } from "@/lib/countries-data";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  DollarSign,
  Clock,
  Award,
  ChevronRight,
  MessageCircle,
  FactoryIcon,
  UserRoundCheck,
} from "lucide-react";
import Footer from "@/components/ui/footer";

export default function CountriesPage() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FactoryIcon className="w-8 h-8 text-black hidden md:block" />
            <span className="text-2xl font-bold bg-black bg-clip-text text-transparent">
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
            className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="hidden sm:inline">Bepul konsultatsiya</span>
            <span className="sm:hidden">Konsultatsiya</span>
          </a>
        </nav>
      </header>

      <section className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-white py-20">
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

      <section className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Qaysi davlat sizga mos kelishini bilmayapsizmi?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Mutaxassislarimiz sizga eng mos davlatni tanlashda va barcha
            jarayonlarda yordam beradi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-lg font-semibold justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Telegramda yozish
            </a>
            <Link
              href="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-lg font-semibold justify-center"
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
