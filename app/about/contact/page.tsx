"use client";

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Facebook,
  Instagram,
  Send,
  Linkedin,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { useWorkingHours } from "@/utils/workingHours";

export default function ContactPage() {
  const { workingHours, isCurrentlyOpen } = useWorkingHours();
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Telefon",
      value: "+998 77 767 00 17",
      link: "tel:+998777670017",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "info@migrationuz.com",
      link: "mailto:info@migrationuz.com",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Manzil",
      value: "Toshkent sh, Amir Temur ko'chasi 108",
      link: "https://www.google.com/maps?q=41.004075,71.510085&z=17&output=embed",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Veb-sayt",
      value: "www.bestglobilizenam.uz",
      link: "https://www.bestglobalizenam.uz",
      color: "bg-green-50 text-green-600",
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      link: "https://facebook.com",
      color: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      link: "https://instagram.com",
      color: "hover:bg-pink-50 hover:text-pink-600",
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5" />,
      link: "https://t.me/BestGlobalizeNamangan",
      color: "hover:bg-sky-50 hover:text-sky-600",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      link: "https://linkedin.com/bestglobalize",
      color: "hover:bg-blue-50 hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      link: "https://wa.me/998777670017",
      color: "hover:bg-green-50 hover:text-green-600",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      link: "https://youtube.com",
      color: "hover:bg-red-50 hover:text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bog'lanish
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bizning jamoamiz sizga yordam berishga tayyor
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Kontakt ma'lumotlar
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${item.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                      <p className="text-gray-900 font-medium">{item.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className="pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Ijtimoiy tarmoqlar
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg transition-all duration-300 ${social.color}`}
                  >
                    <div className="mb-2">{social.icon}</div>
                    <span className="text-xs font-medium text-gray-700">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Ish vaqti
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-6 pb-4 border-b border-gray-300">
                <Clock className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">
                  Ish soatlari
                </span>
              </div>
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700 font-medium">
                      {schedule.day}
                    </span>
                    <span
                      className={`text-sm font-semibold ${schedule.isOpen ? "text-green-600" : "text-red-600"}`}
                    >
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${
                      isCurrentlyOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    {isCurrentlyOpen ? "Hozir ochiq" : "Hozir yopiq"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Bizning manzil
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps?q=41.004075,71.510085&z=17&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>

          {/* Quick Info Below Map */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 font-medium mb-1">
                Ish kunlari
              </p>
              <p className="text-xs text-blue-800">Dushanba - Shanba</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <p className="text-sm text-purple-600 font-medium mb-1">
                Tezkor aloqa
              </p>
              <p className="text-xs text-purple-800">24/7 Telegram</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600 font-medium mb-1">
                Javob vaqti
              </p>
              <p className="text-xs text-green-800">1 soat ichida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
