import { cookies } from "next/headers";
import {
  verifySession,
  ADMIN_COOKIE,
  type SessionPayload,
} from "@/lib/security_link";

// ────────────────────────────────────────────────────────────────────────────
// Server route guard. API route'lar (/api/admin/*) proxy bilan himoyalanmaydi
// (proxy faqat /admin/* sahifalarни tekshiradi), shuning uchun har bir sezgir
// route O'ZINI himoya qilishi shart. requireAdmin() sessiyani qaytaradi yoki null.
// ────────────────────────────────────────────────────────────────────────────
export async function requireAdmin(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return verifySession(token);
}
