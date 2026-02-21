"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle, MessageCircle } from "lucide-react";

const faqData = [
  {
    category: "Visa & Hujjatlar",
    questions: [
      {
        id: "q1",
        question: "Immigratsiya uchun qanday asosiy hujjatlar kerak?",
        answer:
          "Asosiy hujjatlar qatoriga: amal qiluvchi pasport (kamida 6 oy muddati qolgan), tug'ilganlik guvohnomasi, nikoh guvohnomasi (agar mavjud bo'lsa), ta'lim diplomi va ish tajribasi hujjatlari kiradi. Har bir mamlakat uchun qo'shimcha talablar farq qilishi mumkin.",
      },
      {
        id: "q2",
        question: "Viza rad etilsa nima qilish kerak?",
        answer:
          "Viza rad etilganda siz 30 kun ichida apellyatsiya ariza topshirishingiz mumkin. Rad etish sababini diqqat bilan o'qib, etishmayotgan hujjatlarni to'ldiring. Ko'pincha qo'shimcha moliyaviy kafolat yoki ish taklifi viza olish imkoniyatini oshiradi. Immigratsiya advokati bilan maslahatlashing.",
      },
      {
        id: "q3",
        question: "Hujjatlarni notarius orqali tasdiqlash shartmi?",
        answer:
          "Ha, aksariyat mamlakatlarga topshiriladigan hujjatlar notarius tomonidan tasdiqlangan va apostil muhri bosilgan bo'lishi shart. Shuningdek, rasmiy hujjat tarjimoni tomonidan amalga oshirilgan tarjima ham talab qilinadi.",
      },
    ],
  },
  {
    category: "Jarayon & Muddatlar",
    questions: [
      {
        id: "q4",
        question: "Immigratsiya jarayoni qancha vaqt oladi?",
        answer:
          "Muddatlar mamlakatga va kategoriyaga qarab farq qiladi. Oddiy ish vizasi 2-6 oy, doimiy yashash huquqi (PR) 1-3 yil, fuqarolik esa 3-10 yil davom etishi mumkin. Bizning mutaxassislarimiz sizning holatiga qarab aniq muddatni aytib bera oladi.",
      },
      {
        id: "q5",
        question: "Ariza topshirgandan keyin holatni qayerdan kuzatib borish mumkin?",
        answer:
          "Ariza topshirilgandan so'ng foydalanuvchining uyali aloqa raqami  orqali tracking raqami yuboriladi. Shundan foydalanib emigratsiya xizmatining rasmiy saytida yoki bizning mijoz portalimizda arizangiz holatini real vaqtda kuzatib borishingiz mumkin.",
      },
      {
        id: "q6",
        question: "Jarayon davomida mamlakatdan chiqib ketsa bo'ladimi?",
        answer:
          "Bu siz ariza topshirgan kategoriyaga bog'liq. Ko'pgina hollarda ariza ko'rib chiqilayotgan vaqtda mamlakatdan chiqib ketish mumkin, lekin qaytib kirish uchun ruxsatnoma (re-entry permit) olish zarur bo'lishi mumkin. Mutaxassisimiz bilan oldindan maslahatlashing.",
      },
    ],
  },
  {
    category: "Moliyaviy Talablar",
    questions: [
      {
        id: "q7",
        question: "Qancha pul mablag'i talab qilinadi?",
        answer:
          "Moliyaviy talab mamlakatga qarab farq qiladi. Masalan, Kanada uchun oila boshiga $13,000-$25,000 CAD, Germaniya uchun oyiga €1,100 bank hisobida bo'lishi talab etiladi. To'liq ro'yxat uchun biz bilan bog'laning.",
      },
      {
        id: "q8",
        question: "Xizmatlaringiz uchun narx qancha?",
        answer:
          "Bizning narxlarimiz xizmat turiga qarab belgilanadi: konsultatsiya (bepul 30 daqiqa), hujjat tayyorlash (500$-1200$), to'liq immigratsiya paketi (2000$-5000$). Aniq narx siz tanlagan yo'nalish va holatga qarab individual belgilanadi.",
      },
    ],
  },

];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Visa & Hujjatlar");

  const currentFAQs =
    faqData.find((c) => c.category === activeCategory)?.questions || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
          >
            <ArrowLeft size={16} />
            Orqaga
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-sm text-gray-400">FAQ</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle size={18} className="text-blue-500" />
            <span className="text-sm font-medium text-blue-500">
              Ko'p so'raladigan savollar
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Savollaringizga javob topamiz
          </h1>
          <p className="text-gray-500 text-base">
            Immigratsiya jarayoni haqida eng tez-tez beriladigan savollar va
            ularning javoblari.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 animate-div">
          {faqData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                activeCategory === cat.category
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat.category}
              <span
                className={`ml-2 text-xs ${
                  activeCategory === cat.category ? "opacity-70" : "opacity-50"
                }`}
              >
                {cat.questions.length}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-div">
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-gray-100"
          >
            {currentFAQs.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-0">
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 transition-colors duration-150 text-gray-800 font-medium text-[15px] [&>svg]:text-gray-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-0">
                  <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-blue-200 pl-4">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between gap-4 animate-div">
          <div className="flex items-start gap-3">
            <MessageCircle
              size={20}
              className="text-blue-500 mt-0.5 shrink-0"
            />
            <div>
              <p className="font-semibold text-gray-800 mb-0.5">
                Savolingiz javobsiz qoldimi?
              </p>
              <p className="text-sm text-gray-500">
                Mutaxassislarimiz bepul 30 daqiqalik konsultatsiya beradi.
              </p>
            </div>
          </div>
          <a
            href="https://t.me/BestGlobalizeNamangan"
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-150"
          >
            Bog'lanish
          </a>
        </div>
      </div>
    </div>
  );
}
