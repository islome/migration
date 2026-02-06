"use client"
import { ArrowRight, MapPin, Briefcase, Code, Factory } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white text-gray-800">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            <Factory className="w-8 h-8 text-black hidden md:block" />
            <span className="text-xl md:text-2xl font-bold bg-black bg-clip-text text-transparent">
              Best Globalize
            </span>
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1"
          >
            Bosh sahifaga qaytish <ArrowRight className="w-6 h-6" />
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16 md:py-24 max-w-5xl">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <div className="sticky top-24">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-2xl mx-auto md:mx-0">
                {/* Agar rasmingiz bo'lsa shu yerga qo'ying */}
                <Image
                  src="/developer.jpg"
                  alt="Background"
                  fill
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="w-full h-full bg-linear-to-br from-[#89aac3] to-[#6f93b0] flex items-center justify-center text-white text-7xl font-bold">
                  Mr.
                </div>
              </div>

              <div className="mt-8 space-y-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Islombek
                </h1>
                <p className="text-xl text-blue-600 font-medium">
                  Frontend Developer
                </p>

                <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>Namangan, O'zbekiston</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-5 h-5" />
                    <span>Freelance</span>
                  </div>
                </div>

                <div className="flex gap-6 justify-center md:justify-start mt-8">
                  <a
                    href="https://t.me/justislombek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Telegram
                  </a>
                  {/* Agar GitHub yoki LinkedIn bo'lsa qo'shishingiz mumkin */}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-10">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Salom, men Islombek Kamoliddinov
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  Men zamonaviy, chiroyli va foydalanuvchiga qulay veb-saytlar
                  yaratishga ixtisoslashgan frontend dasturchiman. Har bir
                  loyihada toza kod, tezkor ishlash va estetik dizaynga katta
                  e'tibor beraman.
                </p>
                <p>
                  So'nggi yillarda turli yo'nalishdagi loyihalar (tijorat
                  saytlari, shaxsiy brendlar, xizmat platformalari va boshqalar)
                  ustida ishlaganman.
                </p>
                <p>
                  Hozirda mustaqil (freelance) tarzda faoliyat yuritaman va har
                  bir mijozning g'oyasini eng yaxshi shaklda hayotga tatbiq
                  etishga intilaman.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Ta'lim va tajriba
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      Frontend Development
                    </h4>
                    <p className="text-gray-600 mt-1">
                      2020 - hozirgacha • Mustaqil o'qish, real loyihalar va
                      doimiy amaliyot
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">PDP University</h4>
                    <p className="text-gray-600 mt-1">
                      Frontend yo'nalishi • Hozirda o'qishda
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      Freelance Frontend Developer
                    </h4>
                    <p className="text-gray-600 mt-1">
                      2022 - hozirgacha • O'zbekiston va xalqaro mijozlar bilan
                      hamkorlik
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Oxirgi CTA */}
            <section className="pt-12">
              <div className="bg-linear-to-r from-[#89aac3] to-[#6f93b0] rounded-2xl p-10 text-white text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Professional veb-sayt kerakmi?
                </h3>
                <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Agar sizga chiroyli dizaynli, tez ishlaydigan va zamonaviy
                  sayt kerak bo'lsa, hozir yozing - birgalikda ajoyib loyiha
                  qilamiz.
                </p>

                <a
                  href="https://t.me/justislombek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Telegram orqali bog'lanish
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
