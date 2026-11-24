import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(); // ./i18n/request.ts ni o'qiydi

const nextConfig: NextConfig = {
  // ~/package-lock.json mavjud bo'lgani uchun Turbopack root'ni noto'g'ri
  // aniqlaydi (tailwindcss topilmaydi) — loyiha papkasiga qat'iy bog'laymiz.
  turbopack: { root: __dirname },
};

export default withNextIntl(nextConfig);
