import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import CountryDetailView, {
  type CountryDetail,
} from "@/components/CountryDetailView";

// Har 60 soniyada yangilanadi — admin country'ni o'zgartirsa, public tomon ham
// yangilanadi (to'liq rebuild kutmasdan).
export const revalidate = 60;

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
    .single<CountryDetail>();

  if (error || !country) notFound();

  return (
    <CountryDetailView
      country={country}
      backHref="/countries"
      backLabel="Barcha davlatlar"
      showConsultation
    />
  );
}
