import { NextResponse } from "next/server";
import { events } from "@/data/site";

type PaymentRequest = {
  email?: string;
  eventSlug?: string;
  name?: string;
  phone?: string;
  quantity?: number;
};

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  const body = (await request.json()) as PaymentRequest;
  const event = events.find((item) => item.slug === body.eventSlug);
  const quantity = Number(body.quantity);

  if (!event || !("ticketPrice" in event) || !event.ticketPrice) {
    return NextResponse.json({ error: "This event is not available for online payment." }, { status: 400 });
  }
  if (!body.email?.includes("@") || !body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "Please provide valid buyer details." }, { status: 400 });
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return NextResponse.json({ error: "Choose between 1 and 10 tickets." }, { status: 400 });
  }

  const amount = event.ticketPrice * quantity * 100;
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const origin = configuredOrigin || new URL(request.url).origin;
  const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: String(amount),
      callback_url: `${origin}/payments/callback`,
      currency: "NGN",
      email: body.email,
      metadata: JSON.stringify({
        eventSlug: event.slug,
        eventTitle: event.title,
        name: body.name.trim(),
        phone: body.phone.trim(),
        quantity,
      }),
    }),
    cache: "no-store",
  });

  const result = (await paystackResponse.json()) as {
    data?: { authorization_url?: string };
    message?: string;
    status?: boolean;
  };

  if (!paystackResponse.ok || !result.status || !result.data?.authorization_url) {
    return NextResponse.json({ error: result.message || "Payment could not be started." }, { status: 502 });
  }

  return NextResponse.json({ authorizationUrl: result.data.authorization_url });
}
