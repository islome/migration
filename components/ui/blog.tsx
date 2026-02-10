"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, AlertTriangle } from "lucide-react";

export default function SpecialBlogSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                  <AlertTriangle className="w-4 h-4" />
                  Muhim ogohlantirish
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                ❗️ OGOH BO'LING! NORASMIY ISH TAKLIFLARIGA ALDANMANG
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed text-sm lg:text-base">
                <p className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1 shrink-0">
                    ❌
                  </span>
                  <span>
                    «Evropaga ish», «kafolatli ish», «oson hujjatlar» kabi
                    jozibali takliflar ortida ko'pincha qonunbuzarlik va
                    firibgarlik bo'lishi mumkin.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1 shrink-0">
                    📌
                  </span>
                  <span>
                    Migratsiya agentligi noqonuniy migratsiyani tashkil
                    etayotgan va bunday reklamalarni tarqatayotgan shaxslarga
                    qarshi qat'iy choralar ko'rmoqda.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1 shrink-0">
                    🛡
                  </span>
                  <span>
                    O'rganishlar davomida "Euro Brand Consulting" MChJ tomonidan
                    yuritilgan "Visaconsult UZ" Telegram kanali orqali turli
                    davlatlarga ishga joylashtiris h bo'yicha litsenziyasiz
                    reklama tarqatilgani aniqlandi.
                  </span>
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg my-4">
                  <p className="font-semibold text-orange-800 mb-2 text-sm lg:text-base">
                    ⚠️ ESLATMA!
                  </p>
                  <p className="text-orange-900 mb-2 text-sm">
                    Xorijda ishlash bilan bog'liq barcha jarayonlar:
                  </p>
                  <p className="flex items-start gap-2 text-orange-900 text-sm">
                    <span className="text-green-600 font-bold shrink-0">
                      ✔️
                    </span>
                    <span>
                      Davlat tomonidan — Migratsiya agentligi, xususiy sektorda
                      — faqat litsenziyaga ega Xususiy bandlik agentliklari
                      orqali amalga oshirilishi shart.
                    </span>
                  </p>
                </div>

                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1 shrink-0">
                    🔎
                  </span>
                  <span className="text-sm lg:text-base">
                    <strong>Xorijda ish taklifi oldingizmi?</strong> Ishonch
                    hosil qilish uchun tashkilotning litsenziyasi mavjudligini{" "}
                    <a
                      href="https://gov.uz/oz/migration/activity_page/xususiy-bandlik-agentliklari_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      bu havoladan
                    </a>{" "}
                    yoki <strong>12-82</strong> qisqa raqami orqali tekshiring.
                  </span>
                </p>
              </div>

              <Link
                href="/blog/ogohlantirish"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#14202e] to-[#2d4356] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold w-fit mt-6 lg:mt-8 text-sm lg:text-base"
              >
                Batafsil ma'lumot
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="relative bg-gray-900 order-1 lg:order-2 flex items-center justify-center overflow-hidden">
              <img
                src="/screenshot_blog.png"
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <a
                href="https://ojhqnvlgqlxyiipzzneq.supabase.co/storage/v1/object/public/blog/ogoh%20(1).mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 group"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-8 group-hover:bg-white/30 transition-all group-hover:scale-110">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
