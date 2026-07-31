"use server";

import { revalidatePath } from "next/cache";

// Blog yaratilgan/tahrirlangan/o'chirilgandan so'ng public va admin
// ro'yxatlarini DARHOL yangilash (ISR cache'ni bust qilish).
// Shu tufayli yangi blog saytda kech chiqmaydi.
export async function revalidateBlogs() {
  // Public sahifalar endi [locale] ostida — pattern orqali barcha locale'lar yangilanadi
  revalidatePath("/[locale]", "page"); // bosh sahifa (SpecialBlogSection)
  revalidatePath("/[locale]/about/blog", "page"); // public ro'yxat
  revalidatePath("/[locale]/about/blog/[id]", "page"); // barcha detail sahifalar
  revalidatePath("/[locale]/about/blog/warning", "page"); // warning sahifasi
  revalidatePath("/admin/blogs"); // admin ro'yxat (locale'siz)
}
