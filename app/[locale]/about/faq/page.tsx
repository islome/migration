"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle, MessageCircle, Loader2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
  order_index: number;
};

type FAQItem = {
  id: string;
  category_id: string;
  question: string;
  answer: string;
  is_active: boolean;
  order_index: number;
};

export default function FAQPage() {
  const t = useTranslations("faq");
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<FAQItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [{ data: cats, error: catsErr }, { data: faqs, error: faqsErr }] =
        await Promise.all([
          supabase.from("faq_categories").select("*").order("order_index"),
          supabase
            .from("faq_items")
            .select("*")
            .eq("is_active", true)
            .order("order_index"),
        ]);

      if (catsErr || faqsErr) {
        setLoadFailed(true);
      } else {
        setCategories(cats || []);
        setItems(faqs || []);
        if (cats?.length) setActiveCategory(cats[0].id);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const currentFAQs = items.filter((i) => i.category_id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            {t("back")}
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-sm text-gray-400">{t("crumb")}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle size={18} className="text-blue-500" />
            <span className="text-sm font-medium text-blue-500">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-500 text-base">
            {t("subtitle")}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={28} />
          </div>
        )}

        {/* Error */}
        {loadFailed && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-5 py-4">
            {t("loadError")}
          </div>
        )}

        {/* Content */}
        {!loading && !loadFailed && (
          <>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8 animate-div">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                    activeCategory === cat.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`ml-2 text-xs ${
                      activeCategory === cat.id ? "opacity-70" : "opacity-50"
                    }`}
                  >
                    {items.filter((i) => i.category_id === cat.id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Accordion */}
            {currentFAQs.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-div">
                <Accordion
                  type="single"
                  collapsible
                  className="divide-y divide-gray-100"
                >
                  {currentFAQs.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border-0"
                    >
                      <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 transition-colors text-gray-800 font-medium text-[15px] [&>svg]:text-gray-400">
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
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <p className="text-gray-400 text-sm">
                  {t("empty")}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between gap-4 animate-div">
              <div className="flex items-start gap-3">
                <MessageCircle
                  size={20}
                  className="text-blue-500 mt-0.5 shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-800 mb-0.5">
                    {t("ctaTitle")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("ctaText")}
                  </p>
                </div>
              </div>
              <a
                href="tel:+998953449990"
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                {t("ctaBtn")}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
