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
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validatsiya
    if (
      !formData.full_name.trim() ||
      !formData.number.trim() ||
      !formData.intention
    ) {
      setError("Barcha maydonlarni to'ldiring");
      setLoading(false);
      return;
    }

    // O'zbekiston telefon raqami uchun yaxshiroq tekshiruv
    const cleanedPhone = formData.number.replace(/\s+/g, "");
    if (!/^(?:\+998|998|0)?[3-9][0-9]{8}$/.test(cleanedPhone)) {
      setError("Telefon raqam noto'g'ri formatda (+998 XX XXX XX XX)");
      setLoading(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase.from("users").insert({
        full_name: formData.full_name.trim(),
        number: formData.number.trim(),
        intention: formData.intention,
      });

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setFormData({ full_name: "", number: "", intention: "" });
      setTimeout(() => {
        setSuccess(false);
        router.push("/country");
      }, 6000);
    } catch (err: any) {
      console.error("Supabase xatosi:", err);
      setError(
        err.message?.includes("duplicate")
          ? "Bu raqam allaqachon ro'yxatdan o'tgan"
          : "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Ro'yxatdan o'tish
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Ma'lumotlaringizni qoldiring — tez orada bog'lanamiz
          </p>
        </div>

        {/* Form Card – premium ko'rinish */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden transition-all duration-300">
          <div className="px-8 py-10 sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Floating Label Input – Full Name */}
              <div className="relative">
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl text-gray-900 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="full_name"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 pointer-events-none"
                >
                  <User className="inline w-4 h-4 mr-2" />
                  To'liq ismingiz
                </label>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  id="number"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl text-gray-900 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="number"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 pointer-events-none"
                >
                  <Phone className="inline w-4 h-4 mr-2" />
                  Telefon raqamingiz
                </label>
              </div>

              {/* Intention – Select with floating label */}
              <div className="relative">
                <select
                  id="intention"
                  value={formData.intention}
                  onChange={(e) =>
                    setFormData({ ...formData, intention: e.target.value })
                  }
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 appearance-none"
                  required
                >
                  <option value="" disabled hidden></option>
                  {intentions.map((intent) => (
                    <option key={intent.value} value={intent.value}>
                      {intent.label}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="intention"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 pointer-events-none flex items-center"
                >
                  <Target className="inline w-4 h-4 mr-2" />
                  Maqsadingiz
                </label>
                {/* Custom arrow for select */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Messages – with animation */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">
                      Muvaffaqiyatli yuborildi!
                    </p>
                    <p className="text-green-600 text-sm mt-0.5">
                      Tez orada aloqaga chiqamiz.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button – premium style */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:from-gray-800 hover:to-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    Yuborish
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
                <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>
            </form>

            {/* Back link */}
            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                ← Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
