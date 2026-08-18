import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "mlwd_admin";
const SESSION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSigningKey(): string | null {
  return process.env.SESSION_SECRET ?? null;
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function createSessionCookie(): string {
  const key = getSigningKey();
  if (!key) throw new Error("SESSION_SECRET is not set");
  const expiry = String(Date.now() + SESSION_MS);
  const token = `${expiry}.${sign(expiry, key)}`;
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MS / 1000}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

export function isAuthorized(cookieHeader: string | undefined): boolean {
  const key = getSigningKey();
  if (!key) return false;

  const cookies = parseCookies(cookieHeader);
  const token = cookies[COOKIE_NAME];
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;

  const expectedSig = sign(expiry, key);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  return Number(expiry) > Date.now();
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  return timingSafeStringEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) &&
    timingSafeStringEqual(password, adminPassword);
}
