import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ────────────────────────────────────────────────────────────────────────────
// Service-role Supabase client — SERVER ONLY.
// service_role key RLS'ni chetlab o'tadi, shuning uchun bu client HECH QACHON
// brauzerga chiqmasligi kerak. Faqat server API route'lar ichida ishlating.
// Kalit: SUPABASE_SERVICE_ROLE_KEY (NEXT_PUBLIC_ EMAS!).
// ────────────────────────────────────────────────────────────────────────────

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseAdmin() faqat serverda ishlatiladi");
  }
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY yoki NEXT_PUBLIC_SUPABASE_URL env yo'q",
    );
  }

  client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}
