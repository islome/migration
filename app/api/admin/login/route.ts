import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { signSession, ADMIN_COOKIE, SESSION_MAX_AGE } from "@/lib/security_link";
import { verifyPassword } from "@/lib/password";

// Admin login — ANON key bilan `admin` jadvalini o'qiydi.
// SHART: `admin` jadvalida anon SELECT policy ochiq bo'lishi kerak
// (supabase/rls_policies.sql -> admin bo'limi).
// Muvaffaqiyatда imzolangan httpOnly cookie qo'yiladi — session + proxy shunga
// tayanadi (ular o'zgarmaydi).
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username va parol kerak" },
        { status: 400 },
      );
    }

    if (!process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { error: "Server sozlanmagan: ADMIN_SESSION_SECRET yo'q" },
        { status: 500 },
      );
    }

    const { data, error } = await supabase
      .from("admin")
      .select("id, username, password")
      .eq("username", username)
      .single();

    if (error || !data) {
      // Bo'sh natija ko'pincha = admin jadvalida anon SELECT policy yo'q.
      console.error(
        "[login] admin topilmadi:",
        error?.message ?? "0 qator qaytdi",
        "| username:",
        username,
        "| admin RLS anon SELECT ochiqmi tekshiring",
      );
      return NextResponse.json(
        { error: "Username yoki parol noto'g'ri" },
        { status: 401 },
      );
    }

    // verifyPassword ochiq-matn va scrypt hash ikkalasini ham qo'llaydi.
    const ok = await verifyPassword(password, data.password);
    if (!ok) {
      console.error("[login] parol mos kelmadi | username:", username);
      return NextResponse.json(
        { error: "Username yoki parol noto'g'ri" },
        { status: 401 },
      );
    }

    const resolvedName = data.username ?? username;
    const token = await signSession(resolvedName);

    const res = NextResponse.json({ ok: true, username: resolvedName });
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (e) {
    console.error("[login] kutilmagan xato:", e);
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
