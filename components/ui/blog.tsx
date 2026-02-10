"use client";

import Link from "next/link";
import { ArrowRight, Play, Pause, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function SpecialBlogSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      console.error("Video yuklashda xatolik");
      setIsLoading(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Video ijro etishda xatolik:", error);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Chap tomon - Blog Content */}
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
                  <span className="text-red-600 font-bold mt-1 flex-shrink-0">
                    ❌
                  </span>
                  <span>
                    «Evropaga ish», «kafolatli ish», «oson hujjatlar» kabi
                    jozibali takliflar ortida ko'pincha qonunbuzarlik va
                    firibgarlik bo'lishi mumkin.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1 flex-shrink-0">
                    📌
                  </span>
                  <span>
                    Migratsiya agentligi noqonuniy migratsiyani tashkil
                    etayotgan va bunday reklamalarni tarqatayotgan shaxslarga
                    qarshi qat'iy choralar ko'rmoqda.
                  </span>
                </p>

                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1 flex-shrink-0">
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
                    <span className="text-green-600 font-bold flex-shrink-0">
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
                  <span className="text-blue-600 font-bold mt-1 flex-shrink-0">
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

            {/* O'ng tomon - Video */}
            <div className="relative bg-gray-900 min-h-[300px] lg:min-h-0 order-1 lg:order-2">
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                </div>
              )}

              {/* Video Element */}
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ display: isLoading ? "none" : "block" }}
              >
                <source src="/ogoh.mp4" type="video/mp4" />
                Brauzeringiz video formatini qo'llab-quvvatlamaydi.
              </video>

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
                  isPlaying ? "opacity-30" : "opacity-60"
                }`}
              />

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="absolute inset-0 flex items-center justify-center group disabled:cursor-not-allowed z-20"
                aria-label={isPlaying ? "Video to'xtatish" : "Video ijro etish"}
              >
                <div
                  className={`bg-white/20 backdrop-blur-md rounded-full p-5 lg:p-6 transition-all duration-300 ${
                    isPlaying
                      ? "opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                      : "opacity-100 scale-100 group-hover:scale-110"
                  } group-hover:bg-white/30`}
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-white" />
                  ) : (
                    <Play className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-white ml-1" />
                  )}
                </div>
              </button>

              {/* Status Badge */}
              <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 bg-white/20 backdrop-blur-md rounded-full px-3 lg:px-4 py-2 flex items-center gap-2 z-10">
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-300"
                  }`}
                />
                <span className="text-white text-xs lg:text-sm font-medium">
                  {isPlaying ? "Ijro etilmoqda" : "To`xtatilgan"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
