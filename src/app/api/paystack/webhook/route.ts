import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { fulfillTicket } from "@/lib/ticket-fulfillment";
import { buildTicketFromPaystack } from "@/lib/tickets";

type PaystackWebhookEvent = {
  data?: {
    amount?: number;
    currency?: string;
    customer?: {
      email?: string;
    };
    metadata?: {
      buyer_name?: string;
      buyer_phone?: string;
      event_slug?: string;
      event_title?: string;
      quantity?: number | string;
      ticket_tier_name?: string;
    };
    reference?: string;
    status?: string;
  };
  event?: string;
};

function isValidSignature(body: string, signature: string | null, secret: string) {
  if (!signature) {
    return false;
  }

  const expected = createHmac("sha512", secret).update(body).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(signature, "hex");

  return expectedBuffer.length === providedBuffer.length && timingSafeEqual(expectedBuffer, providedBuffer);
}

function getOrigin(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;

  return `${protocol}://${host}`;
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ error: "Paystack is not configured." }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!isValidSignature(body, signature, secretKey)) {
    return NextResponse.json({ error: "Invalid Paystack signature." }, { status: 401 });
  }

  let webhookEvent: PaystackWebhookEvent;

  try {
    webhookEvent = JSON.parse(body) as PaystackWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  if (webhookEvent.event !== "charge.success" || webhookEvent.data?.status !== "success") {
    return NextResponse.json({ received: true });
  }

  try {
    const ticket = buildTicketFromPaystack(webhookEvent.data);
    const emailResult = await fulfillTicket(ticket, getOrigin(request));

    return NextResponse.json({
      emailSent: emailResult.sent,
      received: true,
    });
  } catch (error) {
    console.error("Paystack webhook ticket email failed", error);
    return NextResponse.json({ error: "Ticket email failed." }, { status: 500 });
  }
}
