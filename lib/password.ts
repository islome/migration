import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// ────────────────────────────────────────────────────────────────────────────
// Parol hash — Node built-in scrypt (dependency shart emas, industry-standard KDF).
// Format:  scrypt$<salt_hex>$<hash_hex>
//
// Eski ochiq-matndagi parollar bilan mos: verifyPassword() hash bo'lmasa,
// oddiy solishtiradi. Login muvaffaqiyatli bo'lganda parol avtomatik hash'ga
// yangilanadi (login route'dagi "upgrade-on-login").
// ────────────────────────────────────────────────────────────────────────────

const scryptAsync = promisify(scrypt);
const PREFIX = "scrypt";
const KEYLEN = 64;

export function isHashed(stored: string): boolean {
  return typeof stored === "string" && stored.startsWith(PREFIX + "$");
}

export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(plain, salt, KEYLEN)) as Buffer;
  return `${PREFIX}$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(
  plain: string,
  stored: string,
): Promise<boolean> {
  if (!stored) return false;

  // Legacy: hash emas -> ochiq matn solishtirish
  if (!isHashed(stored)) {
    return plain === stored;
  }

  const [, salt, hashHex] = stored.split("$");
  if (!salt || !hashHex) return false;

  const derived = (await scryptAsync(plain, salt, KEYLEN)) as Buffer;
  const storedBuf = Buffer.from(hashHex, "hex");
  if (storedBuf.length !== derived.length) return false;
  return timingSafeEqual(storedBuf, derived);
}
