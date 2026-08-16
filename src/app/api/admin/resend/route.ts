import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { claimEmail, finishEmail, listRsvps, listTicketOrders, resetEmail } from "@/lib/database";
import { sendRsvpEmail } from "@/lib/rsvp-email";
import { sendTicketEmail } from "@/lib/ticket-email";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { id?: string; type?: "rsvp" | "ticket" };
  if (!body.id || !body.type) return NextResponse.json({ error: "Invalid resend request." }, { status: 400 });

  const table = body.type === "rsvp" ? "rsvps" : "ticket_orders";
  const key = body.type === "rsvp" ? "id" : "reference";
  await resetEmail(table, key, body.id);
  if (!(await claimEmail(table, key, body.id))) return NextResponse.json({ error: "Email is already being processed." }, { status: 409 });

  try {
    if (body.type === "rsvp") {
      const record = (await listRsvps()).find((item) => item.id === body.id);
      if (!record) throw new Error("RSVP was not found.");
      await sendRsvpEmail(record);
    } else {
      const record = (await listTicketOrders()).find((item) => item.reference === body.id);
      if (!record) throw new Error("Ticket order was not found.");
      const requestHeaders = await headers();
      const origin = process.env.NEXT_PUBLIC_SITE_URL ?? `${requestHeaders.get("x-forwarded-proto") ?? "https"}://${requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")}`;
      await sendTicketEmail({ amount: record.amount, buyerEmail: record.buyer_email, buyerName: record.buyer_name, currency: record.currency, eventSlug: record.event_slug, eventTitle: record.event_title, issuedAt: record.created_at, quantity: record.quantity, reference: record.reference, ticketCode: record.ticket_code, ticketTierName: record.tier_name }, origin);
    }
    await finishEmail(table, key, body.id, true);
    return NextResponse.json({ success: true });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Email delivery failed.";
    await finishEmail(table, key, body.id, false, reason);
    return NextResponse.json({ error: reason }, { status: 500 });
  }
}
