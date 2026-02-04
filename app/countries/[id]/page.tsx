import { getCountryById, countries } from "@/lib/countries-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Globe,
  ArrowLeft,
  DollarSign,
  Clock,
  Award,
  MapPin,
  CheckCircle,
  FileText,
  TrendingUp,
  Home,
  Car,
  ShoppingCart,
  Heart,
  ChevronRight,
  Users,
  Briefcase,
  GraduationCap,
  Languages,
} from "lucide-react";
import Header from "@/components/ui/header";

export async function generateStaticParams() {
  return countries.map((country) => ({
    id: country.id,
  }));
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const country = getCountryById(id);

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      

      <Header />
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${country.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 to-purple-900/90"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-8xl">{country.flag}</span>
              <div>
                <h1 className="text-5xl font-bold mb-2">{country.name}</h1>
                <p className="text-2xl text-blue-100">{country.nameEn}</p>
              </div>
            </div>
            <p className="text-xl text-blue-100 mt-6">
              {country.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="bg-white shadow-lg -mt-16 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Oylik maosh</p>
              <p className="text-xl font-bold text-gray-900">
                {country.salary}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-3">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Viza muddati</p>
              <p className="text-xl font-bold text-gray-900">
                {country.visaDuration}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-3">
                <Award className="w-7 h-7 text-purple-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Muvaffaqiyat</p>
              <p className="text-xl font-bold text-gray-900">
                {country.visaSuccess}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full mb-3">
                <Languages className="w-7 h-7 text-orange-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Til</p>
              <p className="text-xl font-bold text-gray-900">
                {country.language}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Salary Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                Maosh haqida ma'lumot
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Minimal</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${country.salaryDetails.min.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Maksimal</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${country.salaryDetails.max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">O'rtacha</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${country.salaryDetails.average.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Soliq</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {country.salaryDetails.taxRate}
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Valyuta:</strong> {country.currency}
                </p>
              </div>
            </div>

            {/* Popular Jobs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                Mashhur kasblar
              </h2>
              <div className="flex flex-wrap gap-3">
                {country.popularJobs.map((job, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600" />
                Talablar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Yosh</p>
                    <p className="text-gray-600">{country.requirements.age}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Ma'lumot</p>
                    <p className="text-gray-600">
                      {country.requirements.education}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Til</p>
                    <p className="text-gray-600">
                      {country.requirements.language}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Tajriba</p>
                    <p className="text-gray-600">
                      {country.requirements.experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-600" />
                Afzalliklar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {country.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Jarayon bosqichlari
              </h2>
              <div className="space-y-6">
                {country.process.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <span className="text-sm text-blue-600 font-semibold">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Life Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Hayot haqida ma'lumot
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <Home className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Uy-joy</p>
                    <p className="text-gray-700">{country.lifeInfo.housing}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <Car className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Transport
                    </p>
                    <p className="text-gray-700">
                      {country.lifeInfo.transport}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Ovqatlanish
                    </p>
                    <p className="text-gray-700">{country.lifeInfo.food}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <Heart className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Sog'liqni saqlash
                    </p>
                    <p className="text-gray-700">
                      {country.lifeInfo.healthcare}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Documents */}
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Kerakli hujjatlar
              </h3>
              <ul className="space-y-3">
                {country.documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Yordam kerakmi?</h3>
              <p className="text-blue-100 mb-6">
                Mutaxassislarimiz bilan bog'laning va bepul konsultatsiya oling!
              </p>
              <Link
                href="/contact"
                className="w-full bg-white text-blue-600 py-3 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                Konsultatsiya olish
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Best Globalize. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
