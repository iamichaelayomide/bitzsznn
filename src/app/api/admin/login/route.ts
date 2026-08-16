import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSession, passwordsMatch } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!passwordsMatch(body.password ?? "")) return NextResponse.json({ error: "Incorrect admin password." }, { status: 401 });
  const session = createAdminSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, session.value, { httpOnly: true, maxAge: session.maxAge, path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  return response;
}
