"use server";

import { revalidatePath } from "next/cache";

// Blog yaratilgan/tahrirlangan/o'chirilgandan so'ng public va admin
// ro'yxatlarini DARHOL yangilash (ISR cache'ni bust qilish).
// Shu tufayli yangi blog saytda kech chiqmaydi.
export async function revalidateBlogs() {
  revalidatePath("/"); // bosh sahifa (SpecialBlogSection — oxirgi blog)
  revalidatePath("/about/blog"); // public ro'yxat
  revalidatePath("/about/blog/[id]", "page"); // barcha detail sahifalar
  revalidatePath("/about/blog/warning"); // warning sahifasi (oxirgi blog)
  revalidatePath("/admin/blogs"); // admin ro'yxat
}
