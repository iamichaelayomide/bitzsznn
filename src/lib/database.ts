import "server-only";

export type RsvpRecord = {
  id: string;
  event_slug: string;
  full_name: string;
  email: string;
  phone: string;
  social_handle: string;
  email_status: "pending" | "sending" | "sent" | "failed";
  email_sent_at: string | null;
  email_error: string | null;
  created_at: string;
};

export type TicketOrderRecord = {
  reference: string;
  event_slug: string;
  event_title: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  quantity: number;
  amount: number;
  currency: string;
  tier_name: string;
  ticket_code: string;
  email_status: "pending" | "sending" | "sent" | "failed";
  email_sent_at: string | null;
  email_error: string | null;
  created_at: string;
};

type DatabaseError = Error & { status?: number };

function getDatabaseConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Database is not configured. Add SUPABASE_URL and SUPABASE_SECRET_KEY.");
  }

  return { key, url: url.replace(/\/$/, "") };
}

async function databaseFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { key, url } = getDatabaseConfig();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Content-Type", "application/json");
  if (!key.startsWith("sb_secret_")) headers.set("Authorization", `Bearer ${key}`);
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers,
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(body || `Database request failed (${response.status}).`) as DatabaseError;
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function isDuplicateDatabaseError(error: unknown) {
  return error instanceof Error && (error as DatabaseError).status === 409;
}

export async function createRsvp(input: Pick<RsvpRecord, "email" | "event_slug" | "full_name" | "phone" | "social_handle">) {
  const rows = await databaseFetch<RsvpRecord[]>("rsvps", {
    body: JSON.stringify({ ...input, email_status: "pending" }),
    headers: { Prefer: "return=representation" },
    method: "POST",
  });

  return rows[0];
}

export async function findRsvp(eventSlug: string, email: string) {
  const rows = await databaseFetch<RsvpRecord[]>(
    `rsvps?event_slug=eq.${encodeURIComponent(eventSlug)}&email=eq.${encodeURIComponent(email)}&limit=1`,
  );
  return rows[0] ?? null;
}

export async function listRsvps() {
  return databaseFetch<RsvpRecord[]>("rsvps?select=*&order=created_at.desc");
}

export async function listTicketOrders() {
  return databaseFetch<TicketOrderRecord[]>("ticket_orders?select=*&order=created_at.desc");
}

export async function isEventRsvpOpen(eventSlug: string) {
  const rows = await databaseFetch<Array<{ rsvp_open: boolean }>>(
    `event_settings?event_slug=eq.${encodeURIComponent(eventSlug)}&select=rsvp_open&limit=1`,
  );
  return rows[0]?.rsvp_open ?? true;
}

export async function setEventRsvpOpen(eventSlug: string, open: boolean) {
  await databaseFetch("event_settings?on_conflict=event_slug", {
    body: JSON.stringify({ event_slug: eventSlug, rsvp_open: open, updated_at: new Date().toISOString() }),
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    method: "POST",
  });
}

export async function saveTicketOrder(order: Omit<TicketOrderRecord, "created_at" | "email_error" | "email_sent_at" | "email_status">) {
  await databaseFetch("ticket_orders?on_conflict=reference", {
    body: JSON.stringify({ ...order, email_status: "pending" }),
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    method: "POST",
  });

  const rows = await databaseFetch<TicketOrderRecord[]>(
    `ticket_orders?reference=eq.${encodeURIComponent(order.reference)}&limit=1`,
  );
  return rows[0];
}

type EmailTable = "rsvps" | "ticket_orders";

export async function claimEmail(table: EmailTable, key: string, value: string) {
  const rows = await databaseFetch<Array<{ email_status: string }>>(
    `${table}?${key}=eq.${encodeURIComponent(value)}&email_status=eq.pending`,
    {
      body: JSON.stringify({ email_status: "sending", email_error: null }),
      headers: { Prefer: "return=representation" },
      method: "PATCH",
    },
  );
  return rows.length > 0;
}

export async function resetEmail(table: EmailTable, key: string, value: string) {
  await databaseFetch(`${table}?${key}=eq.${encodeURIComponent(value)}`, {
    body: JSON.stringify({ email_status: "pending", email_error: null }),
    headers: { Prefer: "return=minimal" },
    method: "PATCH",
  });
}

export async function finishEmail(table: EmailTable, key: string, value: string, sent: boolean, reason?: string) {
  await databaseFetch(`${table}?${key}=eq.${encodeURIComponent(value)}`, {
    body: JSON.stringify({
      email_error: sent ? null : reason?.slice(0, 500) ?? "Email delivery failed.",
      email_sent_at: sent ? new Date().toISOString() : null,
      email_status: sent ? "sent" : "failed",
    }),
    headers: { Prefer: "return=minimal" },
    method: "PATCH",
  });
}
