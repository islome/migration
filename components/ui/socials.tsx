"use client";
import { AlertCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const socials = [
  {
    href: "https://t.me/BestGlobalizeNamangan", 
    icon: "/icons/telegram.png",
    alt: "Telegram",
    size: 30,
    hover: "hover:bg-blue-100",
  },
  {
    href: "tel:+998777670017", 
    icon: "/icons/phone-call.png",
    alt: "Phone",
    size: 30,
    hover: "hover:bg-green-100",
  },
  {
    href: "",
    icon: "/icons/whatsapp.png",
    alt: "WhatsApp",
    size: 35,
    hover: "hover:bg-green-100",
  },
  {
    href: "",
    icon: "/icons/instagram.png",
    alt: "Instagram",
    size: 30,
    hover: "hover:bg-red-100",
  },
  {
    href: "",
    icon: "/icons/facebook.png",
    alt: "Facebook",
    size: 30,
    hover: "hover:bg-blue-100",
  },
];

export default function SocialMedias() {
  const [showWarning, setShowWarning] = useState(false);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href) {
      e.preventDefault();
      setShowWarning(true);
    }
  };
  return (
    <>
      <div className="flex gap-4">
        {socials.map((social) => (
          <a
            key={social.alt}
            href={social.href || "#"}
            target={social.href ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={(e) => handleClick(e, social.href)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${social.hover}`}
          >
            <Image
              src={social.icon}
              width={social.size}
              height={social.size}
              alt={social.alt}
            />
          </a>
        ))}
      </div>

      {/* Warning modal */}
      {showWarning && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setShowWarning(false)}
        >
          <div
            className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                <AlertCircle size={20} className="text-yellow-500" />
              </div>
              <button
                onClick={() => setShowWarning(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">Hali faol emas</h3>
            <p className="text-sm text-gray-500">
              Bu ijtimoiy tarmoq sahifasi hali ulangan emas. Tez orada
              faollashtiriladi.
            </p>

            <button
              onClick={() => setShowWarning(false)}
              className="mt-5 w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}
    </>
  );
}
