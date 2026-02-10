"use client"
import Link from "next/link";
import { ArrowRight, Play, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function SpecialBlogSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    const video = document.getElementById("blog-video") as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="py-16 bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Chap tomon - Blog Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-block mb-4">
                <span className="bg-linear-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                  <AlertTriangle className="w-4 h-4" />
                  Muhim ogohlantirish
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                ❗️ OGOH BO'LING! NORASMIY ISH TAKLIFLARIGA ALDANMANG
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">❌</span>
                  <span>
                    «Evropaga ish», «kafolatli ish», «oson hujjatlar» kabi
                    jozibali takliflar ortida ko'pincha qonunbuzarlik va
                    firibgarlik bo'lishi mumkin.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">📌</span>
                  <span>
                    Migratsiya agentligi noqonuniy migratsiyani tashkil
                    etayotgan va bunday reklamalarni tarqatayotgan shaxslarga
                    qarshi qat'iy choralar ko'rmoqda.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">🛡</span>
                  <span>
                    O'rganishlar davomida "Euro Brand Consulting" MChJ tomonidan
                    yuritilgan "Visaconsult UZ" Telegram kanali orqali turli
                    davlatlarga ishga joylashtiris h bo'yicha litsenziyasiz
                    reklama tarqatilgani aniqlandi.
                  </span>
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mt-6">
                  <p className="font-semibold text-orange-800 mb-2">
                    ⚠️ ESLATMA!
                  </p>
                  <p className="text-orange-900 mb-3">
                    Xorijda ishlash bilan bog'liq barcha jarayonlar:
                  </p>
                  <p className="flex items-start gap-2 text-orange-900">
                    <span className="text-green-600 font-bold">✔️</span>
                    <span>
                      Davlat tomonidan — Migratsiya agentligi, xususiy sektorda
                      — faqat litsenziyaga ega Xususiy bandlik agentliklari
                      orqali amalga oshirilishi shart.
                    </span>
                  </p>
                </div>

                <p className="flex items-start gap-2 mt-4">
                  <span className="text-blue-600 font-bold mt-1">🔎</span>
                  <span>
                    <strong>Xorijda ish taklifi oldingizmi?</strong> Ishonch
                    hosil qilish uchun tashkilotning litsenziyasi mavjudligini{" "}
                    <a
                      href="#"
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
                className="group inline-flex items-center gap-3 bg-linear-to-r from-[#14202e] to-[#2d4356] text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold w-fit mt-8"
              >
                Batafsil ma'lumot
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* O'ng tomon - Video */}
            <div className="relative bg-gray-900 flex items-center justify-center overflow-hidden">
              <video
                id="blog-video"
                loop
                muted
                playsInline
                className="w-full h-full object-cover cursor-pointer"
                onClick={handleVideoClick}
              >
                <source src="/ogoh.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay */}
              <div
                className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none"
                style={{ opacity: isPlaying ? 0.3 : 0.6 }}
              ></div>

              {/* Play Button */}
              {!isPlaying && (
                <button
                  onClick={handleVideoClick}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="bg-white/30 backdrop-blur-md rounded-full p-6 group-hover:bg-white/40 transition-all duration-300 group-hover:scale-110">
                    <Play className="w-12 h-12 text-white fill-white" />
                  </div>
                </button>
              )}

              {/* Status Badge */}
              <div className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-400"}`}
                ></div>
                <span className="text-white text-sm font-medium">
                  {isPlaying ? "Playing" : "Paused"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
