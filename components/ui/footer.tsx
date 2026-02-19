import { Factory, Mail, Phone, UserRoundSearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  const phoneLink = "tel:+998777670017";
  const phoneNumber = "+998 77 767 00 17";
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Factory className="w-8 h-8 text-white" />
                <span className="text-xl font-bold text-white">
                  Best Globalize
                </span>
              </div>
              <p className="text-gray-400">
                Xalqaro mehnat bozorida ishonchli hamkoringiz
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Havolalar</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/countries"
                    className="hover:text-blue-400 transition"
                  >
                    Davlatlar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#hizmatlar"
                    className="hover:text-blue-400 transition"
                  >
                    Xizmatlar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    Qo'llanma
                  </Link>
                </li>
                <li>
                  <Link href="blog" className="hover:text-blue-400 transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Yordam</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 transition"
                  >
                    Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://gov.uz/oz/migration/activity_page/xususiy-bandlik-agentliklari_"
                    className="hover:text-blue-400 transition"
                  >
                    Litsenziya
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    Shartlar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Bog'lanish</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 ml-2">
                  <UserRoundSearchIcon className="w-4 h-4" />
                  <Link
                    href="/about/contact"
                    className="hover:text-blue-400 transition"
                  >
                    Aloqa
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href={phoneLink}
                    className="hover:text-blue-400 transition flex items-center gap-2"
                  ></a>
                  <Phone className="w-4 h-4" />
                  {phoneNumber}
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition flex items-center gap-2"
                  ></a>
                  <Mail className="w-4 h-4" />
                  bestglobalizenam@gmail.uz
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Best Globalize. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
