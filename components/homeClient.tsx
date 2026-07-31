"use client";

import { useState } from "react";
import SpecialBlogSection from "@/components/ui/blog";
import type { Blog } from "@/lib/blogs";
import Country from "@/components/ui/country";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SocialMedias from "@/components/ui/socials";
import { Reveal } from "@/components/ui/reveal";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Globe,
  Users,
  FileCheck,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Languages,
  MonitorCheck,
  UserCheck,
  PlaneTakeoff,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

export default function HomeClient({
  latestBlog,
}: {
  latestBlog: Blog | null;
}) {
  const tHero = useTranslations("hero");
  const tStats = useTranslations("stats");
  const tPopular = useTranslations("popular");
  const tProcess = useTranslations("process");
  const tServices = useTranslations("services");
  const tContact = useTranslations("contact");

  const telegramLink = "https://t.me/migrationuz";
  const phoneNumber = "+998 95 344 99 90";
  const [serviceModal, setServiceModal] = useState<number | null>(null);

  const services = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: tServices("s1Title"),
      desc: tServices("s1Desc"),
      details: tServices("s1Details"),
      color: "blue",
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: tServices("s2Title"),
      desc: tServices("s2Desc"),
      details: tServices("s2Details"),
      color: "green",
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: tServices("s3Title"),
      desc: tServices("s3Desc"),
      details: tServices("s3Details"),
      color: "purple",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: tServices("s4Title"),
      desc: tServices("s4Desc"),
      details: tServices("s4Details"),
      color: "orange",
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: tServices("s5Title"),
      desc: tServices("s5Desc"),
      details: tServices("s5Details"),
      color: "gray",
    },
    {
      icon: <MonitorCheck className="w-8 h-8" />,
      title: tServices("s6Title"),
      desc: tServices("s6Desc"),
      details: tServices("s6Details"),
      color: "yellow",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: tProcess("step1Title"),
      desc: tProcess("step1Desc"),
      icon: (
        <svg
          className="w-8 h-8 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      ),
    },
    {
      step: "2",
      title: tProcess("step2Title"),
      desc: tProcess("step2Desc"),
      icon: (
        <svg
          className="w-8 h-8 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      step: "3",
      title: tProcess("step3Title"),
      desc: tProcess("step3Desc"),
      icon: (
        <svg
          className="w-8 h-8 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      step: "4",
      title: tProcess("step4Title"),
      desc: tProcess("step4Desc"),
      icon: <PlaneTakeoff className="w-8 h-8 mx-auto mb-2" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden pt-10">
      <Header />

      <section className="container mx-auto px-6 py-24 md:py-32 mt-20">
        <div className="max-w-5xl mx-auto mt-2 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
            <span
              className="block"
              style={{
                animation:
                  "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
              }}
            >
              {tHero("line1")}
            </span>
            <span
              className="block bg-linear-to-r from-[#14202e] to-[#2d4356] bg-clip-text text-transparent"
              style={{
                animation:
                  "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
              }}
            >
              <span className="text-green-500">{tHero("green")}</span>
              {tHero("tail")}
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            style={{
              animation:
                "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both",
            }}
          >
            {tHero("subtitle")}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              animation:
                "fadeSlideUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1s both",
            }}
          >
            <Link
              href="/countries"
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 text-xl font-semibold"
            >
              {tHero("ctaCountries")}
              <ArrowRight className="w-6 h-6" />
            </Link>
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-blue-600 text-blue-600 px-10 py-5 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 text-xl font-semibold"
            >
              <MessageCircle className="w-6 h-6" />
              {tHero("ctaConsult")}
            </a>
          </div>
        </div>

        <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Reveal delay={0}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">1000+</h3>
                <p className="text-gray-600">{tStats("clients")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">10+</h3>
                <p className="text-gray-600">{tStats("countries")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <FileCheck className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">95%</h3>
                <p className="text-gray-600">{tStats("visa")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">5+</h3>
                <p className="text-gray-600">{tStats("experience")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="countries" className="container mx-auto px-4 py-20">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tPopular("title")}
            </h2>
            <p className="text-xl text-gray-600">{tPopular("subtitle")}</p>
          </div>
        </Reveal>

        <Country />
      </section>

      <section className="bg-linear-to-br from-[#89aac3] to-[#6f93b0] text-white relative py-20">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">{tProcess("title")}</h2>
              <p className="text-xl text-blue-100">{tProcess("subtitle")}</p>
            </div>
          </Reveal>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16"
            >
              <path
                d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div
              className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-white/30"
              style={{ width: "calc(100% - 10rem)", left: "5rem" }}
            />

            {processSteps.map((item, index) => (
              <Reveal
                key={index}
                delay={index * 0.12}
                className="text-center relative z-10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 text-3xl font-bold border-4 border-white/40">
                  {item.step}
                </div>
                {item.icon}
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="container mx-auto px-4 py-20">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tServices("title")}
            </h2>
            <p className="text-xl text-gray-600">{tServices("subtitle")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <Reveal key={index} delay={(index % 3) * 0.1} className="h-full">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 h-full">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-${item.color}-100 rounded-full mb-6 text-${item.color}-600`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.desc}</p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setServiceModal(index);
                  }}
                  className="text-blue-600 font-semibold hover:gap-3 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {tServices("detail")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Sheet
        open={serviceModal !== null}
        onOpenChange={(open) => {
          if (!open) setServiceModal(null);
        }}
      >
        <SheetContent
          side="bottom"
          className="max-w-5xl mx-auto rounded-t-[2rem] bg-white p-8 sm:p-10"
        >
          {serviceModal !== null && (
            <>
              <SheetHeader className="space-y-4">
                <SheetTitle className="text-3xl font-bold text-gray-900">
                  {services[serviceModal].title}
                </SheetTitle>
                <SheetDescription className="text-gray-600">
                  {services[serviceModal].desc}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4 text-gray-700">
                <p className="text-lg leading-8">
                  {services[serviceModal].details}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {tServices("whyTitle")}
                    </h4>
                    <p className="text-gray-600 leading-7">
                      {tServices("whyText")}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {tServices("howTitle")}
                    </h4>
                    <p className="text-gray-600 leading-7">
                      {tServices("howText")}
                    </p>
                  </div>
                </div>
              </div>
              <SheetFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">{tServices("note")}</p>
                <div className="flex items-center gap-3">
                  <SheetClose className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                    {tServices("close")}
                  </SheetClose>
                  <a
                    href="https://t.me/NAMANGAN2308"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center rounded-full border border-blue-600 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    {tServices("consult")}
                  </a>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <SpecialBlogSection blog={latestBlog} />
      <section id="contact" className="container mx-auto px-4 py-20">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {tContact("title")}
            </h2>
            <p className="text-xl text-gray-600">{tContact("subtitle")}</p>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {tContact("infoTitle")}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {tContact("phoneLabel")}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {tContact("emailLabel")}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      akrommannonov@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {tContact("addressLabel")}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {tContact("addressValue")}
                    </p>
                    <p className="text-gray-600">{tContact("addressHint")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {tContact("hoursLabel")}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {tContact("hoursDays")}
                    </p>
                    <p className="text-gray-600">{tContact("hoursTime")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  {tContact("socialTitle")}
                </h4>
                <SocialMedias />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-125">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3913.6942047380985!2d71.68843707603943!3d40.98715997135355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDU5JzEzLjgiTiA3McKwNDEnMjcuNiJF!5e1!3m2!1sen!2sde!4v1784150664724!5m2!1sen!2sde"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Global HR Office Location"
            />
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
