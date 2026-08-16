import { createHmac, timingSafeEqual } from "crypto";

export type TicketPayload = {
  amount: number;
  buyerEmail: string;
  buyerName: string;
  buyerPhone?: string;
  currency: string;
  eventSlug: string;
  eventTitle: string;
  issuedAt: string;
  quantity: number;
  reference: string;
  ticketCode: string;
  ticketTierName: string;
};

type PaystackTransaction = {
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
};

const TOKEN_VERSION = "v1";
const TICKET_CODE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TICKET_CODE_LENGTH = 12;

function getSigningSecret() {
  const secret = process.env.TICKET_SIGNING_SECRET ?? process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    throw new Error("Ticket signing is not configured. Add TICKET_SIGNING_SECRET or PAYSTACK_SECRET_KEY.");
  }

  return secret;
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSigningSecret()).update(encodedPayload).digest("base64url");
}

export function makeTicketCode(reference: string) {
  let code = "";
  let nonce = 0;

  while (code.length < TICKET_CODE_LENGTH) {
    const digest = createHmac("sha256", getSigningSecret()).update(`${reference}:${nonce}`).digest();

    for (const byte of digest) {
      if (byte < 252) {
        code += TICKET_CODE_ALPHABET[byte % TICKET_CODE_ALPHABET.length];
      }

      if (code.length === TICKET_CODE_LENGTH) {
        break;
      }
    }

    nonce += 1;
  }

  return code;
}

export function buildTicketFromPaystack(transaction: PaystackTransaction): TicketPayload {
  const metadata = transaction.metadata ?? {};
  const reference = transaction.reference;
  const buyerEmail = transaction.customer?.email;

  if (!reference || !buyerEmail) {
    throw new Error("Paystack transaction is missing a reference or customer email.");
  }

  const quantity = Number(metadata.quantity ?? 1);

  return {
    amount: Number(transaction.amount ?? 0),
    buyerEmail,
    buyerName: metadata.buyer_name ?? "Bitzsznn guest",
    buyerPhone: metadata.buyer_phone ?? "",
    currency: transaction.currency ?? "NGN",
    eventSlug: metadata.event_slug ?? "",
    eventTitle: metadata.event_title ?? "Bitzsznn Event",
    issuedAt: new Date().toISOString(),
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    reference,
    ticketCode: makeTicketCode(reference),
    ticketTierName: metadata.ticket_tier_name ?? "Ticket",
  };
}

export function createTicketToken(payload: TicketPayload) {
  const encodedPayload = base64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  return `${TOKEN_VERSION}.${encodedPayload}.${signature}`;
}

export function verifyTicketToken(token?: string | null): TicketPayload | null {
  if (!token) {
    return null;
  }

  const [version, encodedPayload, signature] = token.split(".");

  if (version !== TOKEN_VERSION || !encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== providedBuffer.length || !timingSafeEqual(expectedBuffer, providedBuffer)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as TicketPayload;
  } catch {
    return null;
  }
}
