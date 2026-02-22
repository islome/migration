"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  User,
  Phone,
  Target,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const intentions = [
  { value: "Malumot berish", label: "Ma'lumot olish" },
  { value: "Konsultatsiya", label: "Konsultatsiyaga yozilish" },
  { value: "Aloqaga chiqish", label: "Aloqaga chiqish" },
  { value: "Vizaga yordam", label: "Viza olishda yordam" },
  { value: "Ish topish", label: "Ish topishda yordam" },
  { value: "Boshqa masala", label: "Boshqa" },
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

    if (!formData.full_name || !formData.number || !formData.intention) {
      setError("Barcha maydonlarni to'ldiring");
      setLoading(false);
      return;
    }

    if (formData.number.length !== 9) {
      setError("Telefon raqamni to'liq kiriting (9 ta raqam)");
      setLoading(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from("users")
        .insert([
          {
            full_name: formData.full_name.trim(),
            number: formData.number.trim(),
            intention: formData.intention,
          },
        ])
        .select();

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setFormData({ full_name: "", number: "", intention: "" });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-scree">
      <Header />
      <div className="flex items-center justify-center px-4 py-20 mt-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ro'yxatdan o'tish
            </h1>
            <p className="text-gray-500 text-sm">
              Ma'lumotlaringizni qoldiring — biz 24 soat ichida bog'lanamiz
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 animate-div">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide"
                >
                  To'liq ismingiz
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6f93b0] focus:border-transparent transition-all"
                    placeholder="Ism Familiya"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="number"
                  className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide"
                >
                  Telefon raqamingiz
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-11 text-sm text-gray-800 font-medium pointer-events-none">
                    +998
                  </span>
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    id="number"
                    value={formData.number}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                      setFormData({ ...formData, number: digits });
                    }}
                    className="w-full pl-24 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6f93b0] focus:border-transparent transition-all"
                    placeholder="90 123 45 67"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="intention"
                  className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide"
                >
                  Maqsadingiz
                </label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="intention"
                    value={formData.intention}
                    onChange={(e) =>
                      setFormData({ ...formData, intention: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6f93b0] focus:border-transparent transition-all appearance-none bg-white"
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

              <div className="h-px bg-gray-100" />

              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3 animate-in">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                  <p>{error}</p>
                </div>
              )}

              {success && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3 animate-in">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-green-700 font-semibold text-sm">
                      Muvaffaqiyatli yuborildi!
                    </p>
                    <p className="text-green-600 text-xs mt-0.5">
                      Tez orada siz bilan bog'lanamiz.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-br from-[#89aac3] to-[#6f93b0] hover:bg-[#1e2f3d] text-white py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2.5 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    Yuborish
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
