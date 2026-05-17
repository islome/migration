"use client";

import { useState } from "react";
import SpecialBlogSection from "@/components/ui/blog";
import Country from "@/components/ui/country";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SocialMedias from "@/components/ui/socials";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Users,
  FileCheck,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Languages,
  MonitorCheck,
  UserCheck,
  PlaneTakeoff,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

export default function Home() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  const phoneNumber = "+998 77 767 00 17";
  const [serviceModal, setServiceModal] = useState<number | null>(null);

  const services = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Shaxsiy konsultatsiya",
      desc: "Mutaxassislarimiz bilan individual maslakat va yo'l-yo'riq",
      details:
        "Sizga mos ish yo'nalishini aniqlash, hujjatlar va mehnat shartlari bo'yicha individual maslahat. Biz sizga barcha savollarga javob beramiz va keyingi qadamlaringizni rejalashtiramiz.",
      color: "blue",
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Hujjat tayyorlash",
      desc: "Barcha rasmiy hujjatlarni to'g'ri va tez tayyorlash",
      details:
        "Rasmiy hujjatlarni to'plash, tarjima qilish va tasdiqlash jarayonini boshqaramiz. Hujjatlaringizni konsullik va ish beruvchi talablari asosida tayyorlab beramiz.",
      color: "green",
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: "Tarjima xizmati",
      desc: "Notar tasdiqli professional tarjimalar",
      details:
        "Notar tasdiqli tarjimalar, konsullik hujjatlari va ish shartnomalari uchun professional tarjima xizmatlari. Matnlarni aniq va tez tarjima qilamiz.",
      color: "purple",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Til kurslari",
      desc: "Chet el tillarini o'rganish uchun professional kurslar",
      details:
        "Chet tilini ish muhitida o'rganish, imtihonlar uchun tayyorlanish va amaliy muloqotga yo'naltirilgan darslar. Til bilimlaringizni ishga tayyorlaymiz.",
      color: "orange",
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Ish beruvchilar bilan aloqa",
      desc: "Xorijdagi ishonchli kompaniyalar bilan bog'lanish",
      details:
        "Siz uchun mos ish beruvchilarni topish, intervyu tashkil etish va ish takliflarini olishda yordam beramiz. Ish beruvchilar bilan to'g'ri aloqani yo'lga qo'yamiz.",
      color: "gray",
    },
    {
      icon: <MonitorCheck className="w-8 h-8" />,
      title: "To'liq monitoring",
      desc: "Ishga joylashganingizdan keyin doimiy qo'llab-quvvatlash",
      details:
        "Yangi joyga ko'chib o'tganingizdan keyin ham doimiy qo'llab-quvvatlash, muammolarni hal qilish va yangilanishlarni taqdim etamiz.",
      color: "yellow",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden pt-10">
      <Header />

      <section className="container mx-auto px-6 py-20 md:py-28 mt-20">
        <div className="max-w-4xl mx-auto mt-2 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span
              className="block"
              style={{
                animation:
                  "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
              }}
            >
              Qonuniy yo&apos;l bilan
            </span>
            <span
              className="block bg-linear-to-r from-[#14202e] to-[#2d4356] bg-clip-text text-transparent"
              style={{
                animation:
                  "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
              }}
            >
              <span className="text-green-500">Chet el</span>ga ishga
            </span>
          </h1>

          <p
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            style={{
              animation:
                "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both",
            }}
          >
            Xalqaro mehnat bozorida ish topish va barcha rasmiy hujjatlarni
            tayyorlashda professional yordam. Sizning orzuingizdagi davlatda
            ishlash imkoniyati.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              animation:
                "fadeSlideUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1s both",
            }}
          >
            <Link
              href="/countries"
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 text-lg font-semibold"
            >
              Davlatlarni ko&apos;rish
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Maslahat olish
            </Link>
          </div>
        </div>

        <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      </section>

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
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10+</h3>
              <p className="text-gray-600">Davlatlar bilan hamkorlik</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <FileCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">95%</h3>
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

      <section id="countries" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ommabop yo&apos;nalishlar
          </h2>
          <p className="text-xl text-gray-600">
            Eng ko&apos;p talabga ega davlatlar va ularning imkoniyatlari
          </p>
        </div>

        <Country />
      </section>

      <section className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-white relative py-20">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Jarayon qanday ishlaydi?
            </h2>
            <p className="text-xl text-blue-100">
              4 ta oddiy qadam orqali maqsadingizga erishing
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16"
            >
              <path
                d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div
              className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-white/30"
              style={{ width: "calc(100% - 10rem)", left: "5rem" }}
            />

            {[
              {
                step: "1",
                title: "Konsultatsiya",
                desc: "Bepul maslahat va to'liq ma'lumot olish",
                icon: (
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Hujjatlar",
                desc: "Barcha kerakli hujjatlarni tayyorlash",
                icon: (
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Viza jarayoni",
                desc: "Viza uchun ariza topshirish va kuzatish",
                icon: (
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                ),
              },
              {
                step: "4",
                title: "Jo'nash",
                desc: "Yo'lga tayyorlik va qo'llab-quvvatlash",
                icon: <PlaneTakeoff className="w-8 h-8 mx-auto mb-2" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 text-3xl font-bold border-4 border-white/40">
                  {item.step}
                </div>
                {item.icon}
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bizning xizmatlar
          </h2>
          <p className="text-xl text-gray-600">
            Sizga kerak bo&#39;lgan barcha yordam bir joyda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105"
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
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setServiceModal(index);
                }}
                className="text-blue-600 font-semibold hover:gap-3 flex items-center gap-2 transition-all cursor-pointer"
              >
                Batafsil
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <Sheet
        open={serviceModal !== null}
        onOpenChange={(open) => {
          if (!open) setServiceModal(null);
        }}
      >
        <SheetContent
          side="bottom"
          className="max-w-5xl mx-auto rounded-t-[2rem] bg-white p-8 sm:p-10"
        >
          {serviceModal !== null && (
            <>
              <SheetHeader className="space-y-4">
                <SheetTitle className="text-3xl font-bold text-gray-900">
                  {services[serviceModal].title}
                </SheetTitle>
                <SheetDescription className="text-gray-600">
                  {services[serviceModal].desc}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4 text-gray-700">
                <p className="text-lg leading-8">
                  {services[serviceModal].details}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Nima uchun bu xizmat?
                    </h4>
                    <p className="text-gray-600 leading-7">
                      Bizning xizmatimiz sizga jarayonni qisqartirish va xavfsiz yurish uchun mo&#39;ljallangan.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Qanday yordam beramiz?
                    </h4>
                    <p className="text-gray-600 leading-7">
                      Har bir bosqichda shaxsiy yondashuv, hujjat nazorati va doimiy aloqa taqdim etamiz.
                    </p>
                  </div>
                </div>
              </div>
              <SheetFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Ma&#39;lumotni to&#39;liq o&#39;rganib chiqing, keyin biz bilan bog&#39;laning.
                </p>
                <div className="flex items-center gap-3">
                  <SheetClose className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Yopish
                  </SheetClose>
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center rounded-full border border-blue-600 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Maslahat olish
                  </a>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <SpecialBlogSection />
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bizning manzil
          </h2>
          <p className="text-xl text-gray-600">
            Ofisimizga tashrif buyuring yoki biz bilan bog&#39;laning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Bog&#39;lanish ma&#39;lumotlari
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
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
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
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
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Manzil</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Namangan Viloyati, To&apos;raqo&apos;rg&apos;on tumani, Yangiobod MFY
                    </p>
                    <p className="text-gray-600">
                      Mo&apos;njal: To&apos;raqo&apos;rg&apos;on Bandlik binosi
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
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
                <SocialMedias />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-125">
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

      <Footer />
    </div>
  );
}
