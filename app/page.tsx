import {
  ArrowRight,
  Globe,
  Users,
  FileCheck,
  TrendingUp,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  const phoneLink = "tel:+998777670017";
  const phoneNumber = "+998 77 767 00 17";
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Bepul konsultatsiya
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Qonuniy yo'l bilan <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
              Chet elga ishga
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Xalqaro mehnat bozorida ish topish va barcha rasmiy hujjatlarni
            tayyorlashda professional yordam. Sizning orzuingizdagi davlatda
            ishlash imkoniyati.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/countries"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 text-lg font-semibold"
            >
              Davlatlarni ko'rish
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={telegramLink}
              target="_blank"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Maslahat olish
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Muvaffaqiyatli mijozlar</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Davlatlar bilan hamkorlik</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <FileCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Viza olish darajasi</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">5+</h3>
              <p className="text-gray-600">Yillik tajriba</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Countries */}
      <section id="countries" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ommabop yo'nalishlar
          </h2>
          <p className="text-xl text-gray-600">
            Eng ko'p talabga ega davlatlar va ularning imkoniyatlari
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              country: "Germaniya",
              flag: "🇩🇪",
              salary: "$3,500 - $6,000",
              jobs: "Muhandislik, IT, Sog'liqni saqlash",
              visa: "Work visa - 3-6 oy",
            },
            {
              country: "Polsha",
              flag: "🇵🇱",
              salary: "$1,800 - $3,500",
              jobs: "Qurilish, Logistika, Ishlab chiqarish",
              visa: "Work permit - 2-4 oy",
            },
            {
              country: "Kanada",
              flag: "🇨🇦",
              salary: "$4,000 - $7,500",
              jobs: "IT, Muhandislik, Moliya",
              visa: "Skilled worker - 6-12 oy",
            },
            {
              country: "Buyuk Britaniya",
              flag: "🇬🇧",
              salary: "$3,800 - $6,500",
              jobs: "Sog'liqni saqlash, IT, Ta'lim",
              visa: "Skilled worker visa - 3-8 oy",
            },
            {
              country: "Dubay (BAA)",
              flag: "🇦🇪",
              salary: "$2,500 - $8,000",
              jobs: "Qurilish, Turizm, Moliya",
              visa: "Employment visa - 1-3 oy",
            },
            {
              country: "Chexiya",
              flag: "🇨🇿",
              salary: "$2,000 - $4,000",
              jobs: "Ishlab chiqarish, IT, Xizmat ko'rsatish",
              visa: "Employee card - 3-5 oy",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{item.flag}</span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.country}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Oylik maosh</p>
                    <p className="font-semibold text-gray-900">{item.salary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Mashhur sohalar</p>
                    <p className="font-semibold text-gray-900">{item.jobs}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Viza muddati</p>
                    <p className="font-semibold text-gray-900">{item.visa}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                Batafsil ma'lumot
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Jarayon qanday ishlaydi?
            </h2>
            <p className="text-xl text-blue-100">
              4 ta oddiy qadam orqali maqsadingizga erishing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Konsultatsiya",
                desc: "Bepul maslahat va to'liq ma'lumot olish",
              },
              {
                step: "2",
                title: "Hujjatlar",
                desc: "Barcha kerakli hujjatlarni tayyorlash",
              },
              {
                step: "3",
                title: "Viza jarayoni",
                desc: "Viza uchun ariza topshirish va kuzatish",
              },
              {
                step: "4",
                title: "Jo'nash",
                desc: "Yo'lga tayyorlik va qo'llab-quvvatlash",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 text-3xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bizning xizmatlar
          </h2>
          <p className="text-xl text-gray-600">
            Sizga kerak bo'lgan barcha yordam bir joyda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MessageCircle className="w-8 h-8" />,
              title: "Shaxsiy konsultatsiya",
              desc: "Mutaxassislarimiz bilan individual maslakat va yo'l-yo'riq",
              color: "blue",
            },
            {
              icon: <FileCheck className="w-8 h-8" />,
              title: "Hujjat tayyorlash",
              desc: "Barcha rasmiy hujjatlarni to'g'ri va tez tayyorlash",
              color: "green",
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: "Tarjima xizmati",
              desc: "Notar tasdiqli professional tarjimalar",
              color: "purple",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-${item.color}-100 rounded-full mb-6 text-${item.color}-600`}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <button className="text-blue-600 font-semibold hover:gap-3 flex items-center gap-2 transition-all">
                Batafsil
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bizning manzil
          </h2>
          <p className="text-xl text-gray-600">
            Ofisimizga tashrif buyuring yoki biz bilan bog'laning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Bog'lanish ma'lumotlari
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telefon raqam</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-semibold text-gray-900">
                      bestglobalizenamangan@mail.uz
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Manzil</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Namangan Viloyati, To'raqo'rg'on tumani, Yangiobod MFY
                    </p>
                    <p className="text-gray-600">
                      Mo'njal: To'raqo'rg'on Bandlik binosi
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ish vaqti</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Dushanba - Shanba
                    </p>
                    <p className="text-gray-600">09:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Ijtimoiy tarmoqlar
                </h4>
                <div className="flex gap-4">
                  <a
                    href={telegramLink}
                    className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <a
                    href={phoneLink}
                    className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition"
                  >
                    <Phone className="w-6 h-6" />
                  </a>
                  <a
                    href="bestglobalizenamangan@mail.uz"
                    className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-[500px]">
            <iframe
              src="https://www.google.com/maps?q=41.004075,71.510085&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Best Globalize Office Location"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Best Globalize</span>
              </div>
              <p className="text-gray-400">
                Xalqaro mehnat bozorida ishonchli hamkoringiz
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Havolalar</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
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
                    Qo'llanma
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
                  <Link
                    href="https://gov.uz/oz/migration/activity_page/xususiy-bandlik-agentliklari_"
                    className="hover:text-blue-400 transition"
                  >
                    Litsenziya
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    Shartlar
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
                  +998 77 767 00 17
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
