import { NextRequest, NextResponse } from "next/server";
import { events, getTicketTiersForEvent, isTicketedEvent } from "@/data/site";

type InitializeBody = {
  buyer?: {
    email?: string;
    name?: string;
    phone?: string;
  };
  eventSlug?: string;
  quantity?: number;
  tierId?: string;
};

type PaystackInitializeResponse = {
  data?: {
    access_code?: string;
    authorization_url?: string;
    reference?: string;
  };
  message?: string;
  status?: boolean;
};

const PAYSTACK_INITIALIZE_URL = "https://api.paystack.co/transaction/initialize";
const MAX_QUANTITY = 10;

function isTestPaystackKey(secretKey: string) {
  return secretKey.trim().startsWith("sk_test");
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getTotalKobo(price: number, quantity: number) {
  const subtotal = price * quantity;
  const serviceFee = Math.round(subtotal * 0.03);
  return (subtotal + serviceFee) * 100;
}

function makeReference() {
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase();
  return `BTZ-${Date.now()}-${random}`;
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return jsonError("Paystack is not configured. Add PAYSTACK_SECRET_KEY to your environment.", 500);
  }

  if (process.env.VERCEL_ENV === "production" && isTestPaystackKey(secretKey)) {
    return jsonError("Live payments are not enabled yet. Add a Paystack live secret key in Vercel.", 500);
  }

  let body: InitializeBody;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid payment request.");
  }

  const event = events.find((item) => item.slug === body.eventSlug);
  const tier = event ? getTicketTiersForEvent(event.slug).find((item) => item.id === body.tierId) : undefined;
  const quantity = Number(body.quantity);
  const buyerName = body.buyer?.name?.trim() ?? "";
  const buyerEmail = body.buyer?.email?.trim().toLowerCase() ?? "";
  const buyerPhone = body.buyer?.phone?.trim() ?? "";

  if (!event || !tier) {
    return jsonError("Selected event or ticket tier is invalid.");
  }

  if (!isTicketedEvent(event.slug)) {
    return jsonError("Online ticket sales are only active for Freed At Last right now.");
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return jsonError(`Quantity must be between 1 and ${MAX_QUANTITY}.`);
  }

  if (buyerName.length < 2 || !buyerEmail.includes("@") || buyerPhone.length < 7) {
    return jsonError("Please provide a valid name, email, and phone number.");
  }

  const reference = makeReference();
  const amount = getTotalKobo(tier.price, quantity);
  const callbackUrl = new URL("/tickets/verify", request.nextUrl.origin);

  const paystackResponse = await fetch(PAYSTACK_INITIALIZE_URL, {
    body: JSON.stringify({
      amount,
      callback_url: callbackUrl.toString(),
      currency: "NGN",
      email: buyerEmail,
      metadata: {
        buyer_name: buyerName,
        buyer_phone: buyerPhone,
        event_slug: event.slug,
        event_title: event.title,
        quantity,
        ticket_tier: tier.id,
        ticket_tier_name: tier.name,
      },
      reference,
    }),
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const payload = (await paystackResponse.json()) as PaystackInitializeResponse;

  if (!paystackResponse.ok || !payload.status || !payload.data?.authorization_url) {
    return jsonError(payload.message ?? "Paystack could not initialize this payment.", 502);
  }

  return NextResponse.json({
    accessCode: payload.data.access_code,
    authorizationUrl: payload.data.authorization_url,
    reference: payload.data.reference ?? reference,
  });
}
