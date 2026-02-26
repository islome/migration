import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Best Globalize",
  description: "Namangan Viloyati, xususiy bandlik agentligi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={jakarta.className}>
        {children}
        <GoogleAnalytics gaId="G-X4FBPLTCE8" />
      </body>
    </html>
  );
}
