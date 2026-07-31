import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { security_link } from "@/lib/security_link";
import { routing } from "@/i18n/routing";

// Next.js 16 "proxy" konvensiyasi (eski nomi "middleware"). Edge runtime'da ishlaydi.
//
// Ikki vazifa bitta proxy'da:
//   1) /admin/* — imzolangan sessiya tekshiruvi (eski xatti-harakat, o'zgarmagan):
//        /admin           -> tekshirilmaydi (login sahifasi ochiq)
//        /admin/...       -> sessiya yo'q bo'lsa 404 ga rewrite
//   2) qolgan public yo'llar — next-intl locale routing (uz prefikssiz, /ru, /en)
export const config = {
  // api, _next, statik fayllar (nuqtali) chetlab o'tiladi
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin: locale'siz, faqat sessiya gate ──
  if (pathname === "/admin") {
    return NextResponse.next(); // login sahifasi hammaga ochiq
  }
  if (pathname.startsWith("/admin/")) {
    const session = await security_link(request);
    if (session) {
      return NextResponse.next();
    }
    // Admin emas -> 404 (app/not-found.tsx) ga rewrite
    const url = request.nextUrl.clone();
    url.pathname = "/_admin_blocked";
    return NextResponse.rewrite(url);
  }

  // ── Public: locale aniqlash/prefikslash (next-intl) ──
  return intlMiddleware(request);
}
