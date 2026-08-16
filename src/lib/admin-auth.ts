import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "bitzsznn_admin";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Add ADMIN_SESSION_SECRET to the environment.");
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function passwordsMatch(provided: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = String(expires);
  return { maxAge: SESSION_DURATION_SECONDS, value: `${payload}.${sign(payload)}` };
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) <= Date.now() / 1000) return false;
  const expected = Buffer.from(sign(expires));
  const provided = Buffer.from(signature);
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}
