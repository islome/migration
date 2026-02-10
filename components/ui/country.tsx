import { countries } from "@/lib/countries-data";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  DollarSign,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";

export default function Country() {
  const displayedCountries = countries.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCountries.map((country) => (
          <div
            key={country.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
          >
            {/* Country Header */}
            <div className="bg-linear-to-r from-[#89aac3] to-[#6f93b0] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-6xl">{country.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {country.name}
                    </h3>
                    <p className="text-blue-100 text-sm">{country.nameEn}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Country Info */}
            <div className="p-6">
              <p className="text-gray-600 mb-6 line-clamp-3">
                {country.shortDescription}
              </p>

              {/* Quick Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Oylik maosh</p>
                    <p className="font-semibold text-gray-900">
                      {country.salary}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Mashhur kasblar</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {country.popularJobs.slice(0, 3).join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Viza muddati</p>
                    <p className="font-semibold text-gray-900">
                      {country.visaDuration}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Viza olish ehtimoli</p>
                    <p className="font-semibold text-gray-900">
                      {country.visaSuccess}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/countries/${country.id}`}
                className="w-full bg-[#2d4356] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 group-hover:gap-3"
              >
                Batafsil ma'lumot
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Ko'proq ko'rish tugmasi */}
      {countries.length > 3 && (
        <div className="flex justify-center mt-12">
          <Link
            href="/countries"
            className="group bg-linear-to-r from-[#89aac3] to-[#6f93b0] text-black px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-3 hover:gap-4"
          >
            Ko'proq davlatlarni ko'rish
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
