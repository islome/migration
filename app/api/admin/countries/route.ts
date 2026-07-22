import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminGuard";

// Sessiya bilan himoyalangan country yozuvi (service_role). Shu tufayli
// `countries` jadvalini anon uchun public-read + write-yopiq qilib qulflash mumkin.
// Eslatma: rasm upload hozircha client'da anon storage orqali (country-images
// public bucket) qoladi — rasm public kontent, past xavf.

// ── Yaratish ─────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body?.id) {
      return NextResponse.json({ error: "ID kerak" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { error } = await db.from("countries").insert(body);
    if (error) {
      // 23505 = unique_violation (ID band)
      const msg =
        error.code === "23505"
          ? "Bu ID allaqachon mavjud"
          : error.message || "Saqlashda xatolik";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// ── Tahrirlash ───────────────────────────────────────────────────────────────
export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, ...patch } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID kerak" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { error } = await db.from("countries").update(patch).eq("id", id);
    if (error) {
      return NextResponse.json(
        { error: error.message || "Saqlashda xatolik" },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// ── O'chirish ────────────────────────────────────────────────────────────────
export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID kerak" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const { error } = await db.from("countries").delete().eq("id", id);
    if (error) {
      return NextResponse.json(
        { error: error.message || "O'chirishda xatolik" },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
