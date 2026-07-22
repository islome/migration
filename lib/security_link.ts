// ────────────────────────────────────────────────────────────────────────────
// security_link — admin sessiya tekshiruvchisi (middleware + route guard)
//
// Kichik HMAC-SHA256 imzolangan token yasaydi va uni httpOnly cookie'da saqlaydi.
// `middleware.ts` va API route'lar `security_link(request)` orqali so'rovda haqiqiy,
// muddati o'tmagan admin sessiyasi borligini tekshiradi.
//
// Web Crypto API (crypto.subtle) ishlatiladi — Edge (middleware) va Node (route)
// ikkalasida ham ishlaydi. Node-ga xos modul import qilinmaydi.
// ────────────────────────────────────────────────────────────────────────────

import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 soat
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;

export type SessionPayload = {
  u: string; // username
  r: "admin"; // role
  exp: number; // muddati (unix sekund)
};

function getSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length > 0 ? s : null;
}

// ── base64url yordamchilar (Edge-safe: btoa/atob + TextEncoder/Decoder) ───────
function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const b64 =
    str.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((str.length + 3) % 4);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );
  return new Uint8Array(sig);
}

// doimiy-vaqt (timing-safe) taqqoslash
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Berilgan admin username uchun imzolangan sessiya tokeni yasaydi. */
export async function signSession(username: string): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const payload: SessionPayload = {
    u: username,
    r: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const data = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = toBase64Url(await hmac(secret, data));
  return `${data}.${sig}`;
}

/** Sessiya tokenini tekshiradi; payload yoki null qaytaradi. */
export async function verifySession(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null; // fail-safe: secret yo'q => kirish yo'q

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, sig] = parts;

  try {
    const expected = await hmac(secret, data);
    const given = fromBase64Url(sig);
    if (!timingSafeEqual(expected, given)) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(data)),
    ) as SessionPayload;

    if (payload.r !== "admin") return null;
    if (
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Middleware/route tekshiruvchisi: bu so'rov haqiqiy admin-mi?
 * Payload qaytaradi (admin) yoki null (ruxsat yo'q).
 */
export async function security_link(
  request: NextRequest,
): Promise<SessionPayload | null> {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  return verifySession(token);
}
