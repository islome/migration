import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Global HR Namangan",
  description: "Namangan Viloyati, xususiy bandlik agentligi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // [locale] segmentidan tashqarida (admin) default "uz" qaytadi
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={jakarta.className}>
        {children}
        <GoogleAnalytics gaId="G-X4FBPLTCE8" />
      </body>
    </html>
  );
}
