"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FolderPlus,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

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

// ─── Category Modal ────────────────────────────────────
function CategoryModal({
  category,
  onSave,
  onClose,
}: {
  category: Category | null;
  onSave: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(category?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setLoading(true);
    if (category?.id) {
      await supabase
        .from("faq_categories")
        .update({ name })
        .eq("id", category.id);
    } else {
      await supabase.from("faq_categories").insert({ name, order_index: 99 });
    }
    setLoading(false);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-sm shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            {category ? "Kategoriyani tahrirlash" : "Yangi kategoriya"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Kategoriya nomi"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Bekor
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Item Modal ────────────────────────────────────
function FAQModal({
  item,
  categories,
  defaultCategoryId,
  onSave,
  onClose,
}: {
  item: FAQItem | null;
  categories: Category[];
  defaultCategoryId: string;
  onSave: () => void;
  onClose: () => void;
}) {
  const [question, setQuestion] = useState(item?.question || "");
  const [answer, setAnswer] = useState(item?.answer || "");
  const [categoryId, setCategoryId] = useState(
    item?.category_id || defaultCategoryId || categories[0]?.id || "",
  );
  const [isActive, setIsActive] = useState(item?.is_active ?? true);
  const [loading, setLoading] = useState(false);

  const canSave = question.trim() && answer.trim() && categoryId;

  const handleSave = async () => {
    if (!canSave) return;
    setLoading(true);
    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      category_id: categoryId,
      is_active: isActive,
    };
    if (item?.id) {
      await supabase.from("faq_items").update(payload).eq("id", item.id);
    } else {
      await supabase.from("faq_items").insert({ ...payload, order_index: 99 });
    }
    setLoading(false);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-lg shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">
            {item ? "Savolni tahrirlash" : "Yangi savol-javob"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Kategoriya
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Savol
            </label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Savol matnini kiriting..."
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Javob
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Javob matnini kiriting..."
            />
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Faol</p>
              <p className="text-xs text-gray-400 mt-0.5">
                O'chirilsa FAQ sahifasida ko'rinmaydi
              </p>
            </div>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                isActive ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Bekor
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !canSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────
export default function FAQAdminPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const [categoryModal, setCategoryModal] = useState<null | "new" | Category>(
    null,
  );
  const [faqModal, setFaqModal] = useState<null | {
    item: FAQItem | null;
    categoryId: string;
  }>(null);

  const loadData = async () => {
    const [{ data: cats }, { data: faqs }] = await Promise.all([
      supabase.from("faq_categories").select("*").order("order_index"),
      supabase.from("faq_items").select("*").order("order_index"),
    ]);
    const catList: Category[] = cats || [];
    setCategories(catList);
    setItems(faqs || []);
    setExpanded((prev) => {
      const next: Record<string, boolean> = {};
      catList.forEach((c) => {
        next[c.id] = prev[c.id] ?? true;
      });
      return next;
    });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteCategory = async (id: string) => {
    if (
      !confirm(
        "Kategoriyani o'chirsangiz, undagi barcha savollar ham o'chadi. Davom etasizmi?",
      )
    )
      return;
    await supabase.from("faq_categories").delete().eq("id", id);
    loadData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Ushbu savol-javobni o'chirishni tasdiqlaysizmi?")) return;
    await supabase.from("faq_items").delete().eq("id", id);
    loadData();
  };

  const toggleActive = async (item: FAQItem) => {
    await supabase
      .from("faq_items")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, is_active: !i.is_active } : i,
      ),
    );
  };

  const toggleExpand = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const catItems = (catId: string) =>
    items.filter((i) => i.category_id === catId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Orqaga
            </button>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm font-semibold text-gray-800">
              FAQ Admin
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FAQ Boshqaruvi</h1>
            <p className="text-sm text-gray-400 mt-1">
              {categories.length} ta kategoriya · {items.length} ta savol-javob
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCategoryModal("new")}
              className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FolderPlus size={15} />
              Kategoriya
            </button>
            <button
              onClick={() =>
                setFaqModal({ item: null, categoryId: categories[0]?.id })
              }
              disabled={categories.length === 0}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus size={15} />
              Savol qo'shish
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={28} />
          </div>
        )}

        {/* List */}
        {!loading && (
          <div className="space-y-3">
            {categories.map((cat) => {
              const list = catItems(cat.id);
              const isOpen = expanded[cat.id];

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  {/* Category row */}
                  <div className="flex items-center gap-3 px-5 py-4">
                    <button
                      onClick={() => toggleExpand(cat.id)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      {isOpen ? (
                        <ChevronUp
                          size={16}
                          className="text-gray-400 shrink-0"
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="text-gray-400 shrink-0"
                        />
                      )}
                      <span className="font-semibold text-gray-800">
                        {cat.name}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {list.length}
                      </span>
                    </button>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() =>
                          setFaqModal({ item: null, categoryId: cat.id })
                        }
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Savol qo'shish"
                      >
                        <Plus size={15} />
                      </button>
                      <button
                        onClick={() => setCategoryModal(cat)}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* FAQ items */}
                  {isOpen && (
                    <div className="border-t border-gray-100 divide-y divide-gray-100">
                      {list.length === 0 ? (
                        <div className="py-8 text-center">
                          <p className="text-sm text-gray-400 mb-2">
                            Bu kategoriyada hali savollar yo'q
                          </p>
                          <button
                            onClick={() =>
                              setFaqModal({ item: null, categoryId: cat.id })
                            }
                            className="text-sm text-blue-600 hover:underline"
                          >
                            + Savol qo'shish
                          </button>
                        </div>
                      ) : (
                        list.map((faq) => (
                          <div
                            key={faq.id}
                            className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 group transition-colors"
                          >
                            {/* Toggle */}
                            <button
                              onClick={() => toggleActive(faq)}
                              className={`mt-0.5 shrink-0 relative w-9 h-5 rounded-full transition-colors duration-200 ${
                                faq.is_active ? "bg-blue-600" : "bg-gray-200"
                              }`}
                              title={
                                faq.is_active ? "Nofaol qilish" : "Faol qilish"
                              }
                            >
                              <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                                  faq.is_active
                                    ? "translate-x-4"
                                    : "translate-x-0"
                                }`}
                              />
                            </button>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium mb-0.5 ${
                                  faq.is_active
                                    ? "text-gray-800"
                                    : "text-gray-400"
                                }`}
                              >
                                {faq.question}
                              </p>
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {faq.answer}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                onClick={() =>
                                  setFaqModal({
                                    item: faq,
                                    categoryId: faq.category_id,
                                  })
                                }
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => deleteItem(faq.id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {categories.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-14 text-center">
                <p className="text-gray-400 text-sm mb-3">
                  Hali kategoriyalar yo'q
                </p>
                <button
                  onClick={() => setCategoryModal("new")}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Birinchi kategoriyani qo'shing →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {categoryModal && (
        <CategoryModal
          category={categoryModal === "new" ? null : categoryModal}
          onSave={() => {
            setCategoryModal(null);
            loadData();
          }}
          onClose={() => setCategoryModal(null)}
        />
      )}

      {faqModal && (
        <FAQModal
          item={faqModal.item}
          categories={categories}
          defaultCategoryId={faqModal.categoryId}
          onSave={() => {
            setFaqModal(null);
            loadData();
          }}
          onClose={() => setFaqModal(null)}
        />
      )}
    </div>
  );
}
