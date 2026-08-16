import { NextRequest, NextResponse } from "next/server";
import { isRsvpEvent } from "@/data/site";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { setEventRsvpOpen } from "@/lib/database";

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { eventSlug?: string; open?: boolean };
  if (!body.eventSlug || !isRsvpEvent(body.eventSlug) || typeof body.open !== "boolean") return NextResponse.json({ error: "Invalid event update." }, { status: 400 });
  await setEventRsvpOpen(body.eventSlug, body.open);
  return NextResponse.json({ success: true });
}
