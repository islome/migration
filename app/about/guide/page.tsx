"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Plane,
  Briefcase,
  Home,
  CreditCard,
  Phone,
  ChevronDown,
  ChevronUp,
  Info,
  UserRoundCheck,
} from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Link from "next/link";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Konsultatsiya",
    duration: "1 kun",
    color: "blue",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    dotColor: "bg-blue-500",
    description:
      "Mutaxassisimiz bilan bepul maslahat uchun murojaat qiling. Biz sizning hujjatlaringizni, tajribangizni va maqsadingizni ko'rib chiqamiz va eng mos yo'nalishni tavsiya etamiz.",
    substeps: [
      "Shaxsiy ma'lumotlar va tajriba tahlili",
      "Mos mamlakatlar va ish turlari aniqlash",
      "Taxminiy muddat va xarajatlar haqida ma'lumot",
    ],
  },
  {
    number: "02",
    icon: FileText,
    title: "Hujjat tayyorlash",
    duration: "5-14 kun",
    color: "green",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
    dotColor: "bg-green-500",
    description:
      "Bizning hujjat mutaxassislarimiz barcha zarur qog'ozlarni to'g'ri tartibda tayyorlaydi. Pasport, diplomlar, mehnat daftarchasi, tibbiy sertifikatlar va boshqalar.",
    substeps: [
      "Pasport va shaxsiy hujjatlar tayyorlash",
      "Diploma va sertifikatlar tarjimasi (notar tasdiqli)",
      "Mehnat tajribasi hujjatlarini rasmiylashtirish",
      "Tibbiy ko'rik va sertifikat olish",
    ],
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Viza ariza",
    duration: "7-30 kun",
    color: "purple",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    dotColor: "bg-purple-500",
    description:
      "Viza turi va mamlakatga qarab to'g'ri ariza to'ldiriladi. Biz konsullik tashrifini ham tashkil qilib beramiz va intervyuga tayyorlash xizmatini ko'rsatamiz.",
    substeps: [
      "Viza turi aniqlash (mehnat, D, Schengen va h.k.)",
      "Online ariza to'ldirish va hujjatlar paketini yig'ish",
      "Konsullik tashrifini belgilash",
      "Intervyu uchun tayyorlov",
    ],
    note: "Viza muddati mamlakatga qarab farq qiladi. Aniq muddat uchun biz bilan bog'laning.",
  },
  {
    number: "04",
    icon: Briefcase,
    title: "Ish shartnomasi",
    duration: "3-10 kun",
    color: "orange",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200",
    dotColor: "bg-orange-500",
    description:
      "Xorijdagi hamkor kompaniyalarimiz bilan bog'liq bo'lgan ish o'rniga joylashtiramiz. Shartnoma shartlari, ish haqi, turar joy va boshqa imtiyozlar oldindan kelishiladi.",
    substeps: [
      "Ish beruvchi bilan tanishish va intervyu",
      "Shartnoma shartlarini ko'rib chiqish",
      "Rasmiy mehnat shartnomasini imzolash",
      "Ish haqiga nisbatan verifikatsiya",
    ],
    note: "Ish haqi, ish soati va turar joy sharoitlari haqida aniq ma'lumot uchun biz bilan bog'laning.",
  },
  {
    number: "05",
    icon: Plane,
    title: "Jo'nab ketish",
    duration: "1-3 kun",
    color: "sky",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    borderColor: "border-sky-200",
    dotColor: "bg-sky-500",
    description:
      "Sayohat kunida nima qilish kerakligi haqida batafsil ko'rsatmalar beramiz. Aeroportdan kutib olish, birinchi tunash joyi va ishga kirish tartibi.",
    substeps: [
      "Aviabilet va bagaj tayyorlash bo'yicha maslahat",
      "Chegara o'tish qoidalari va bojxona",
      "Aeroportdan kutib olish xizmati (ba'zi mamlakatlarda)",
      "Birinchi kunlar uchun amaliy ko'rsatmalar",
    ],
  },
  {
    number: "06",
    icon: Home,
    title: "Joylashish & Monitoring",
    duration: "Doimiy",
    color: "teal",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    borderColor: "border-teal-200",
    dotColor: "bg-teal-500",
    description:
      "Yangi mamlakatga ko'nikish jarayonida doimiy qo'llab-quvvatlaymiz. Bank hisobini ochish, mahalliy ro'yxatga olish, tibbiy sug'urta va boshqa masalalarda yordam.",
    substeps: [
      "Turar joyga joylashish va ro'yxatdan o'tish",
      "Bank hisobini ochish",
      "Sog'liqni saqlash va sug'urta rasmiylashtiruvi",
      "Har oylik holat-tekshiruv va qo'llab-quvvatlash",
    ],
  },
];

const countries = [
  {
    name: "Germaniya",
    flag: "🇩🇪",
    jobs: "Muhandis, Hamshira, IT mutaxassis",
    minSalary: "€2,000",
    visaTime: "4-8 hafta",
  },
  {
    name: "Polsha",
    flag: "🇵🇱",
    jobs: "Ishlab chiqarish, Qurilish, Logistika",
    minSalary: "€1,200",
    visaTime: "2-4 hafta",
  },
  {
    name: "Chexiya",
    flag: "🇨🇿",
    jobs: "Fabrika, Ombor, Restoran",
    minSalary: "€1,100",
    visaTime: "3-6 hafta",
  },
  {
    name: "Janubiy Koreya",
    flag: "🇰🇷",
    jobs: "Ishlab chiqarish, Elektron sanoat",
    minSalary: "$1,800",
    visaTime: "6-12 hafta",
  },
  {
    name: "BAA",
    flag: "🇦🇪",
    jobs: "Qurilish, Xizmat, IT, Tibbiyot",
    minSalary: "$1,500",
    visaTime: "2-4 hafta",
  },
  {
    name: "Vengriya",
    flag: "🇭🇺",
    jobs: "Avtomobil sanoati, Logistika",
    minSalary: "€1,000",
    visaTime: "3-5 hafta",
  },
];

const warnings = [
  "Pasportingiz kamida 12 oy amal qilishi kerak",
  "Hujjatlardagi barcha ma'lumotlar to'g'ri va bir xil bo'lishi shart",
  "Tibbiy sertifikat faqat akkreditatsiyalangan klinikada olinadi",
  "Noma'lum vositachilar orqali ketmaslik — firibgarlik xavfi bor",
  "Ish shartnomasi imzolanmagan holda pul to'lamang",
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = step.icon;

  return (
    <Reveal delay={index * 0.08}>
      <div
        className={`bg-white rounded-2xl border-2 ${step.borderColor} overflow-hidden transition-shadow duration-300 hover:shadow-md`}
      >
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-4 p-6 text-left"
        >
          {/* Step number */}
          <span className="text-3xl font-black text-gray-500 shrink-0 w-10 leading-none">
            {step.number}
          </span>

          {/* Icon */}
          <div
            className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-6 h-6 ${step.iconColor}`} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-base">{step.title}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400">{step.duration}</span>
            </div>
          </div>

          {/* Toggle */}
          {open ? (
            <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
          )}
        </button>

        {/* Body */}
        {open && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-5">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {step.description}
            </p>
            <ul className="space-y-2 mb-4">
              {step.substeps.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-700"
                >
                  <CheckCircle2
                    className={`w-4 h-4 mt-0.5 shrink-0 ${step.iconColor}`}
                  />
                  {s}
                </li>
              ))}
            </ul>
            {step.note && (
              <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  {step.note}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}

// ─── Main Page ─────────────────────────────────────────
export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12 mt-20">
        <div
          className="mb-14"
          style={{
            animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Xorijga ishlashga chiqish —<br />
            <span className="text-blue-600">qadamlik yo'riqnoma</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Konsultatsiyadan tortib, yangi mamlakatda turmush o'rnatishgacha
            bo'lgan butun jarayonni tushuntirdik. Aniq bilmasang — biz yordamga
            tayyormiz.
          </p>
        </div>

        <Reveal>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block" />
            Jarayon bosqichlari
          </h2>
        </Reveal>

        <div className="space-y-3 mb-16">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        <Reveal className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-green-500 rounded-full inline-block" />
            Ommabop mamlakatlar
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Mamlakat
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Ish turlari
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Min. maosh
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Viza muddati
              </span>
            </div>
            {countries.map((c, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors items-center"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {c.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 pr-4">{c.jobs}</span>
                <span className="text-sm font-bold text-green-600">
                  {c.minSalary}
                </span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">{c.visaTime}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
            <Info size={12} />
            Maosh va viza muddatlari taxminiy. Aniq ma'lumot uchun biz bilan
            bog'laning.
          </p>
        </Reveal>

        <Reveal className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-amber-400 rounded-full inline-block" />
            Muhim ogohlantirishlar
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800 text-sm">
                Xorijga ketishdan oldin buni bilishingiz shart
              </span>
            </div>
            <ul className="space-y-3">
              {warnings.map((w, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-amber-800"
                >
                  <span className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold text-amber-700 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full inline-block" />
            Asosiy hujjatlar ro'yxati
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Xalqaro pasport (12 oy amal qilishi kerak)",
              "Tug'ilganlik guvohnomasi (tarjima bilan)",
              "Nikoh / ajralish guvohnomasi (agar bor bo'lsa)",
              "Ta'lim diplomi (notar tasdiqli tarjima)",
              "Mehnat daftarchasi yoki tajriba hujjati",
              "Tibbiy ma'lumotnoma (tuberkulyoz va h.k.)",
              "Bank hisobi ko'chirmasi (ba'zi mamlakatlarda)",
              "Jinoyat yo'qligi haqida ma'lumotnoma",
              "2 dona 3×4 rasm (oq fon)",
              "To'ldiruvchi ariza shakli",
            ].map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="text-sm text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
            <Info size={12} />
            Ro'yxat mamlakatga qarab o'zgarishi mumkin. To'liq ro'yxat uchun biz
            bilan bog'laning.
          </p>
        </Reveal>

        <Reveal>
          <div className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Savolingiz bormi?
            </h3>
            <p className="text-gray-200 text-sm mb-6 max-w-md mx-auto">
              Har bir vaziyat o'ziga xos. Aniq ma'lumot olish uchun
              mutaxassislarimiz bilan bog'laning — bepul konsultatsiya berishdan
              xursandmiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+998777670017"
                className="flex items-center justify-center gap-2 bg-white text-blue-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Qo'ng'iroq qilish
              </a>
              <a
                href="https://t.me/BestGlobalizeNamangan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram orqali yozish
              </a>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-blue-400 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <UserRoundCheck className="w-5 h-5" />
                Ma'lumot qoldirish
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
      <Footer />
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
