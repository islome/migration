"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  User,
  Phone,
  Target,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const intentions = [
  { value: "malumot_ber", label: "Ma'lumot olish" },
  { value: "konsultatsiya", label: "Konsultatsiyaga yozilish" },
  { value: "aloqa", label: "Aloqaga chiqish" },
  { value: "viza_yordam", label: "Viza olishda yordam" },
  { value: "ish_topish", label: "Ish topishda yordam" },
  { value: "boshqa", label: "Boshqa" },
];

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    number: "",
    intention: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validatsiya
    if (!formData.full_name || !formData.number || !formData.intention) {
      setError("Barcha maydonlarni to'ldiring");
      setLoading(false);
      return;
    }

    // Telefon raqam validatsiyasi (oddiy)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(formData.number)) {
      setError("Telefon raqamni to'g'ri kiriting");
      setLoading(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from("registrations")
        .insert([
          {
            full_name: formData.full_name.trim(),
            number: formData.number.trim(),
            intention: formData.intention,
          },
        ])
        .select();

      if (supabaseError) throw supabaseError;

      // Muvaffaqiyatli
      setSuccess(true);
      setFormData({ full_name: "", number: "", intention: "" });

      // 3 soniyadan keyin success xabarni yashirish
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ro'yxatdan o'tish
          </h1>
          <p className="text-gray-600 text-lg">
            Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                To'liq ismingiz
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Ism Familiya"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Telefon raqamingiz
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="number"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="+998 90 123 45 67"
                  required
                />
              </div>
            </div>

            {/* Intention */}
            <div>
              <label
                htmlFor="intention"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Maqsadingiz
              </label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="intention"
                  value={formData.intention}
                  onChange={(e) =>
                    setFormData({ ...formData, intention: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Tanlang...</option>
                  {intentions.map((intent) => (
                    <option key={intent.value} value={intent.value}>
                      {intent.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-green-700 font-semibold">
                    Muvaffaqiyatli yuborildi!
                  </p>
                  <p className="text-green-600 text-sm">
                    Tez orada siz bilan bog'lanamiz.
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#14202e] to-[#2d4356] text-white py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Yuborilmoqda...
                </>
              ) : (
                <>
                  Yuborish
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              ← Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
