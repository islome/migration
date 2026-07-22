import { NextResponse, type NextRequest } from "next/server";
import { security_link } from "@/lib/security_link";

// Next.js 16 "proxy" konvensiyasi (eski nomi "middleware"). Edge runtime'da ishlaydi.
// `:path+` => 1+ segment. Shu tufayli:
//   /admin            -> mos kelmaydi (login sahifasi hammaga ochiq)
//   /admin/country    -> tekshiriladi
//   /admin/blogs/...  -> tekshiriladi
export const config = {
  matcher: ["/admin/:path+"],
};

export async function proxy(request: NextRequest) {
  const session = await security_link(request);

  // Haqiqiy admin sessiyasi bor -> o'tkazamiz
  if (session) {
    return NextResponse.next();
  }

  // Admin emas -> sahifani "yo'q" qilib ko'rsatamiz (404).
  // Mavjud bo'lmagan (va /admin/ dan tashqaridagi) yo'lga rewrite qilamiz:
  // Next unmatched yo'l uchun `app/not-found.tsx` ni 404 status bilan render qiladi.
  // /admin/ dan tashqarida bo'lgani uchun proxy qayta ishga tushmaydi (loop yo'q).
  const url = request.nextUrl.clone();
  url.pathname = "/_admin_blocked";
  return NextResponse.rewrite(url);
}
