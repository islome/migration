import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminGuard";

// Sessiya bilan himoyalangan users boshqaruvi. service_role RLS'ni chetlab
// o'tadi, shuning uchun `users` jadvalini anon uchun to'liq yopish mumkin.

const VALID_STATUS = ["kutmoqda", "yakunlangan"] as const;
type Status = (typeof VALID_STATUS)[number];

async function logActivity(
  db: ReturnType<typeof getSupabaseAdmin>,
  entry: {
    action: string;
    user_id: string;
    user_name: string;
    details: string;
    performed_by: string;
  },
) {
  try {
    await db.from("activity_log").insert(entry);
  } catch {
    /* logging xatosi asosiy amalни buzmasin */
  }
}

// ── Ro'yxat ──────────────────────────────────────────────────────────────────
export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from("users")
      .select("id, full_name, number, created_at, intention, status")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ users: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// ── Status o'zgartirish (bitta yoki bulk) ────────────────────────────────────
export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { ids, status } = (await request.json()) as {
      ids?: string[];
      status?: Status;
    };
    if (!Array.isArray(ids) || ids.length === 0 || !status) {
      return NextResponse.json({ error: "ids va status kerak" }, { status: 400 });
    }
    if (!VALID_STATUS.includes(status)) {
      return NextResponse.json({ error: "Status noto'g'ri" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data: affected } = await db
      .from("users")
      .select("id, full_name")
      .in("id", ids);

    const { error } = await db.from("users").update({ status }).in("id", ids);
    if (error) throw error;

    for (const u of affected ?? []) {
      await logActivity(db, {
        action: "status_change",
        user_id: u.id,
        user_name: u.full_name ?? "—",
        details: `Status -> ${status}`,
        performed_by: session.u,
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// ── O'chirish (bitta yoki bulk) ──────────────────────────────────────────────
export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { ids } = (await request.json()) as { ids?: string[] };
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "ids kerak" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { data: affected } = await db
      .from("users")
      .select("id, full_name")
      .in("id", ids);

    const { error } = await db.from("users").delete().in("id", ids);
    if (error) throw error;

    for (const u of affected ?? []) {
      await logActivity(db, {
        action: "delete",
        user_id: u.id,
        user_name: u.full_name ?? "—",
        details: "Foydalanuvchi o'chirildi",
        performed_by: session.u,
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
