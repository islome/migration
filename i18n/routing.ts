import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  // uz — prefikssiz (mavjud URL'lar buzilmaydi), ru/en — /ru/..., /en/...
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
