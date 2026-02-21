import {
  Factory,
  Mail,
  Phone,
  UserRoundCheck,
  UserRoundSearchIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const telegramLink = "https://t.me/BestGlobalizeNamangan";
  const phoneLink = "tel:+998777670017";
  const phoneNumber = "+998 77 767 00 17";
  return (
    <div>
      <footer className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Factory className="w-8 h-8 text-white" />
                <span className="text-xl font-bold text-white">
                  Best Globalize
                </span>
              </div>
              <p className="text-gray-100">
                Xalqaro mehnat bozorida ishonchli hamkoringiz
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Havolalar</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/countries"
                    className="hover:text-gray-600 transition"
                  >
                    Davlatlar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#hizmatlar"
                    className="hover:text-gray-600 transition"
                  >
                    Xizmatlar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-600 transition">
                    Qo'llanma
                  </Link>
                </li>
                <li>
                  <Link href="blog" className="hover:text-gray-600 transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Yordam</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about/faq" className="hover:text-gray-600 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-600 transition"
                  >
                    Developer
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://gov.uz/oz/migration/activity_page/xususiy-bandlik-agentliklari_"
                    className="hover:text-gray-600 transition"
                  >
                    Litsenziya
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-600 transition">
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
                    className="hover:text-gray-600 transition"
                  >
                    Aloqa
                  </Link>
                </li>
                <li className="flex items-center gap-2 ml-2">
                  <UserRoundCheck className="w-4 h-4" />
                  <Link
                    href="/register"
                    className="hover:text-gray-600 transition"
                  >
                    Ma'lumot qoldirish
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href={phoneLink}
                    className="hover:text-gray-600 transition flex items-center gap-2"
                  ></a>
                  <Phone className="w-4 h-4" />
                  {phoneNumber}
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition flex items-center gap-2"
                  ></a>
                  <Mail className="w-4 h-4" />
                  bestglobalizenam@gmail.uz
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-white">
            <p>&copy; 2026 Best Globalize. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
