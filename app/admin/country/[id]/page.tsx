import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  FileText,
  TrendingUp,
  Home,
  Car,
  ShoppingCart,
  Heart,
  Users,
  Briefcase,
  GraduationCap,
  Languages,
} from "lucide-react";
import Footer from "@/components/ui/footer";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface Country {
  id: string;
  name: string;
  name_en: string;
  flag: string;
  short_description: string;
  full_description: string;
  salary: string;
  visa_duration: string;
  visa_success: string;
  language: string;
  currency: string;
  background_image: string | null;
  req_age: string;
  req_education: string;
  req_language: string;
  req_experience: string;
  salary_min: number;
  salary_max: number;
  salary_average: number;
  tax_rate: string;
  life_housing: string;
  life_transport: string;
  life_food: string;
  life_healthcare: string;
  popular_jobs: string[];
  benefits: string[];
  documents: string[];
  process: ProcessStep[];
}

export async function generateStaticParams() {
  const { data } = await supabase.from("countries").select("id");
  return (data ?? []).map((c) => ({ id: c.id }));
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: country, error } = await supabase
    .from("countries")
    .select("*")
    .eq("id", id)
    .single<Country>();

  if (error || !country) notFound();

  const visaNum = parseInt(country.visa_success);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* ── Hero ── */}
      <div
        style={{
          position: "relative",
          height: "380px",
          overflow: "hidden",
          background: country.background_image
            ? `url(${country.background_image}) center/cover no-repeat`
            : "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "32px 24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/admin/countries"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              padding: "8px 16px",
              borderRadius: "10px",
              width: "fit-content",
            }}
          >
            <ArrowLeft size={16} /> Orqaga
          </Link>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "64px", lineHeight: 1 }}>
                {country.flag}
              </span>
              <div>
                <h1
                  style={{
                    margin: 0,
                    color: "#FFF",
                    fontSize: "40px",
                    fontWeight: "800",
                    letterSpacing: "-1px",
                  }}
                >
                  {country.name}
                </h1>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "16px",
                  }}
                >
                  {country.name_en}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {country.language && (
                <Chip icon={<Languages size={13} />} label={country.language} />
              )}
              {country.currency && (
                <Chip
                  icon={<DollarSign size={13} />}
                  label={country.currency}
                />
              )}
              {country.visa_success && (
                <Chip
                  icon={<Award size={13} />}
                  label={`Viza: ${country.visa_success}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Tavsif */}
            <Section title="Davlat haqida">
              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  lineHeight: "1.75",
                  fontSize: "15px",
                }}
              >
                {country.full_description || country.short_description}
              </p>
            </Section>

            {/* Mashhur kasblar */}
            {country.popular_jobs?.length > 0 && (
              <Section title="Mashhur kasblar" icon={<Briefcase size={18} />}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {country.popular_jobs.map((job, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        background: "#EFF6FF",
                        color: "#2563EB",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {job}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Imtiyozlar */}
            {country.benefits?.length > 0 && (
              <Section title="Imtiyozlar" icon={<CheckCircle size={18} />}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {country.benefits.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <CheckCircle
                        size={16}
                        color="#16A34A"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Hujjatlar */}
            {country.documents?.length > 0 && (
              <Section title="Kerakli hujjatlar" icon={<FileText size={18} />}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {country.documents.map((doc, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <span
                        style={{
                          color: "#6366F1",
                          fontWeight: "700",
                          fontSize: "13px",
                          minWidth: "22px",
                        }}
                      >
                        {i + 1}.
                      </span>
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Jarayon */}
            {country.process?.length > 0 && (
              <Section
                title="Jarayon bosqichlari"
                icon={<TrendingUp size={18} />}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "0" }}
                >
                  {country.process.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "#4F46E5",
                            color: "#FFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            fontWeight: "700",
                            flexShrink: 0,
                          }}
                        >
                          {step.step}
                        </div>
                        {i < country.process.length - 1 && (
                          <div
                            style={{
                              width: "2px",
                              flex: 1,
                              background: "#E2E8F0",
                              margin: "4px 0",
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          paddingBottom:
                            i < country.process.length - 1 ? "20px" : "0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "4px",
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: "15px",
                              fontWeight: "700",
                              color: "#0F172A",
                            }}
                          >
                            {step.title}
                          </h4>
                          {step.duration && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#6366F1",
                                fontWeight: "600",
                                background: "#EEF2FF",
                                padding: "2px 8px",
                                borderRadius: "20px",
                              }}
                            >
                              {step.duration}
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            color: "#64748B",
                            lineHeight: "1.6",
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Hayot */}
            {(country.life_housing ||
              country.life_transport ||
              country.life_food ||
              country.life_healthcare) && (
              <Section title="Hayot haqida ma'lumot" icon={<Home size={18} />}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  {country.life_housing && (
                    <LifeCard
                      icon={<Home size={16} />}
                      label="Uy-joy"
                      text={country.life_housing}
                      color="#F0FDF4"
                      iconColor="#16A34A"
                    />
                  )}
                  {country.life_transport && (
                    <LifeCard
                      icon={<Car size={16} />}
                      label="Transport"
                      text={country.life_transport}
                      color="#EFF6FF"
                      iconColor="#2563EB"
                    />
                  )}
                  {country.life_food && (
                    <LifeCard
                      icon={<ShoppingCart size={16} />}
                      label="Ovqatlanish"
                      text={country.life_food}
                      color="#FFF7ED"
                      iconColor="#EA580C"
                    />
                  )}
                  {country.life_healthcare && (
                    <LifeCard
                      icon={<Heart size={16} />}
                      label="Sog'liqni saqlash"
                      text={country.life_healthcare}
                      color="#FDF4FF"
                      iconColor="#9333EA"
                    />
                  )}
                </div>
              </Section>
            )}
          </div>

          {/* Right sidebar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              position: "sticky",
              top: "24px",
            }}
          >
            {/* Maosh kartasi */}
            <div
              style={{
                background: "linear-gradient(135deg, #0F172A, #1E293B)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px",
                  color: "#94A3B8",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Oylik maosh
              </p>
              <p
                style={{
                  margin: "0 0 16px",
                  color: "#FFF",
                  fontSize: "26px",
                  fontWeight: "800",
                }}
              >
                {country.salary ||
                  (country.salary_min && country.salary_max
                    ? `$${country.salary_min.toLocaleString()} – $${country.salary_max.toLocaleString()}`
                    : "—")}
              </p>
              {country.salary_average > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: "12px",
                  }}
                >
                  <StatItem
                    label="O'rtacha"
                    value={`$${country.salary_average.toLocaleString()}`}
                  />
                  {country.tax_rate && (
                    <StatItem label="Soliq" value={country.tax_rate} />
                  )}
                </div>
              )}
            </div>

            {/* Viza info */}
            <div
              style={{
                background: "#FFF",
                borderRadius: "16px",
                border: "1.5px solid #E2E8F0",
                padding: "20px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#0F172A",
                }}
              >
                Viza ma'lumotlari
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {country.visa_duration && (
                  <InfoRow
                    icon={<Clock size={15} />}
                    label="Viza muddati"
                    value={country.visa_duration}
                  />
                )}
                {!isNaN(visaNum) && (
                  <InfoRow
                    icon={<Award size={15} />}
                    label="Muvaffaqiyat"
                    value={country.visa_success}
                    highlight
                  />
                )}
              </div>
            </div>

            {/* Talablar */}
            {(country.req_age ||
              country.req_education ||
              country.req_language ||
              country.req_experience) && (
              <div
                style={{
                  background: "#FFF",
                  borderRadius: "16px",
                  border: "1.5px solid #E2E8F0",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#0F172A",
                  }}
                >
                  Talablar
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {country.req_age && (
                    <InfoRow
                      icon={<Users size={15} />}
                      label="Yosh"
                      value={country.req_age}
                    />
                  )}
                  {country.req_education && (
                    <InfoRow
                      icon={<GraduationCap size={15} />}
                      label="Ta'lim"
                      value={country.req_education}
                    />
                  )}
                  {country.req_language && (
                    <InfoRow
                      icon={<Languages size={15} />}
                      label="Til"
                      value={country.req_language}
                    />
                  )}
                  {country.req_experience && (
                    <InfoRow
                      icon={<Briefcase size={15} />}
                      label="Tajriba"
                      value={country.req_experience}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#FFF",
        borderRadius: "16px",
        border: "1.5px solid #E2E8F0",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #F1F5F9",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {icon && <span style={{ color: "#6366F1" }}>{icon}</span>}
        <h2
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "700",
            color: "#0F172A",
          }}
        >
          {title}
        </h2>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
        color: "#FFF",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "500",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {icon} {label}
    </div>
  );
}

function LifeCard({
  icon,
  label,
  text,
  color,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  color: string;
  iconColor: string;
}) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "12px",
        background: color,
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "6px",
          color: iconColor,
        }}
      >
        {icon}
        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.4px",
          }}
        >
          {label}
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#374151",
          lineHeight: "1.5",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#94A3B8",
        }}
      >
        {icon}
        <span style={{ fontSize: "13px", color: "#64748B" }}>{label}</span>
      </div>
      <span
        style={{
          fontSize: "13px",
          fontWeight: "700",
          color: highlight ? "#16A34A" : "#0F172A",
          background: highlight ? "#F0FDF4" : "transparent",
          padding: highlight ? "2px 8px" : "0",
          borderRadius: highlight ? "20px" : "0",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          margin: 0,
          color: "#94A3B8",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.4px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "2px 0 0",
          color: "#FFF",
          fontSize: "15px",
          fontWeight: "700",
        }}
      >
        {value}
      </p>
    </div>
  );
}
