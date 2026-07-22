import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { signSession, ADMIN_COOKIE, SESSION_MAX_AGE } from "@/lib/security_link";
import { verifyPassword, hashPassword, isHashed } from "@/lib/password";

// Admin login — credentiallar SERVER tomonда service_role bilan tekshiriladi.
// Shu tufayli `admin` jadvalini anon uchun butunlay yopish mumkin (parollar
// endi brauzerga chiqmaydi). Muvaffaqiyatда imzolangan httpOnly cookie qo'yiladi.
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

    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from("admin")
      .select("id, username, password")
      .eq("username", username)
      .single();

    if (error || !data) {
      // Diagnostika (faqat server logi). Bo'sh natija ko'pincha =
      // env'dagi kalit anon key (service_role emas) + admin jadvali qulflangan.
      let keyRole = "?";
      try {
        const part = (process.env.SUPABASE_SERVICE_ROLE_KEY || "")
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        keyRole = JSON.parse(Buffer.from(part, "base64").toString()).role;
      } catch {
        keyRole = "decode-fail (sb_secret_ yangi format?)";
      }
      console.error(
        "[login] admin topilmadi:",
        error?.message ?? "0 qator qaytdi",
        "| username:",
        username,
        "| ENV KEY ROLE:",
        keyRole,
        "(<- 'service_role' bo'lishi shart!)",
      );
      return NextResponse.json(
        { error: "Username yoki parol noto'g'ri" },
        { status: 401 },
      );
    }

    const ok = await verifyPassword(password, data.password);
    if (!ok) {
      console.error("[login] parol mos kelmadi | username:", username);
      return NextResponse.json(
        { error: "Username yoki parol noto'g'ri" },
        { status: 401 },
      );
    }

    // upgrade-on-login: eski ochiq-matndagi parolni hash'ga o'tkazamiz
    if (!isHashed(data.password)) {
      try {
        const hashed = await hashPassword(password);
        await db.from("admin").update({ password: hashed }).eq("id", data.id);
      } catch {
        /* upgrade muvaffaqiyatsiz bo'lsa ham login davom etadi */
      }
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
    // ko'pincha: SUPABASE_SERVICE_ROLE_KEY yo'q/noto'g'ri -> getSupabaseAdmin throw
    console.error("[login] kutilmagan xato:", e);
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
