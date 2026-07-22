import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, ADMIN_COOKIE } from "@/lib/security_link";

// Joriy sessiya holatini qaytaradi. Cookie httpOnly bo'lgani uchun client uni
// o'qiy olmaydi — shu route orqali so'raydi (login-form vs dashboard uchun).
export async function GET() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  const session = await verifySession(token);

  if (!session) {
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ ok: true, username: session.u });
}
