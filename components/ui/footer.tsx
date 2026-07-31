import { Mail, Phone, UserRoundCheck, UserRoundSearchIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const phoneLink = "tel:+998953449990";
  const phoneNumber = "+998 95 344 99 90";
  return (
    <div>
      <footer className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src="/icons/Hr.png"
                  alt="Global HR Logo"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white leading-tight">
                    Global HR
                  </span>
                  <span className="text-xs text-gray-300 leading-tight">
                    Namangan Filiali
                  </span>
                </div>
              </div>
              <p className="text-gray-100">{t("tagline")}</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">{t("colLinks")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/countries"
                    className="hover:text-gray-600 transition"
                  >
                    {t("countries")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/services"
                    className="hover:text-gray-600 transition"
                  >
                    {t("services")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/guide"
                    className="hover:text-gray-600 transition"
                  >
                    {t("guide")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/blog"
                    className="hover:text-gray-600 transition"
                  >
                    {t("blog")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">{t("colHelp")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about/faq"
                    className="hover:text-gray-600 transition"
                  >
                    {t("faq")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gray-600 transition">
                    {t("developer")}
                  </Link>
                </li>
                <li>
                  <a
                    href="https://gov.uz/oz/migration/activity_page/xususiy-bandlik-agentliklari_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition"
                  >
                    {t("license")}
                  </a>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-600 transition">
                    {t("terms")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                {t("colContact")}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 ml-2">
                  <UserRoundSearchIcon className="w-4 h-4" />
                  <Link
                    href="/about/contact"
                    className="hover:text-gray-600 transition"
                  >
                    {t("contactLink")}
                  </Link>
                </li>
                <li className="flex items-center gap-2 ml-2">
                  <UserRoundCheck className="w-4 h-4" />
                  <Link
                    href="/register"
                    className="hover:text-gray-600 transition"
                  >
                    {t("register")}
                  </Link>
                </li>
                <li className="flex items-center gap-2 ml-2">
                  <Phone className="w-4 h-4" />
                  <a
                    href={phoneLink}
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition flex items-center gap-2"
                  >
                    {phoneNumber}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 ml-2" />
                  <a
                    href="tel:+998992829990"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition flex items-center gap-2"
                  >
                    +998 99 282 99 90
                  </a>
                  <div className="w-4 h-4" />
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 ml-2" />
                  <a
                    href="mailto:akrommannonov@gmail.com"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition flex items-center gap-2"
                  >
                    akrommannonov@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-white">
            <p>{t("rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
