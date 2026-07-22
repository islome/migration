import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { signSession, ADMIN_COOKIE, SESSION_MAX_AGE } from "@/lib/security_link";

// Admin login — credentiallar server tomonda tekshiriladi, muvaffaqiyatда
// imzolangan httpOnly cookie o'rnatiladi. Bu cookie'ni middleware o'qiydi.
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

    // TODO(xavfsizlik): parol hozir ochiq matnda solishtirilyapti (mavjud
    // `admin` jadvali shunday). Keyinchalik bcrypt/argon2 hashга o'tkazish kerak.
    const { data, error } = await supabase
      .from("admin")
      .select("id, username")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
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
  } catch {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
