import Link from "next/link";
import { headers } from "next/headers";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/button";
import { PremiumIcon } from "@/components/premium-icon";
import { fulfillTicket } from "@/lib/ticket-fulfillment";
import { buildTicketFromPaystack } from "@/lib/tickets";

type VerifyPageProps = {
  searchParams: Promise<{
    reference?: string | string[];
    trxref?: string | string[];
  }>;
};

type PaystackVerifyResponse = {
  data?: {
    amount?: number;
    currency?: string;
    customer?: {
      email?: string;
    };
    metadata?: {
      buyer_name?: string;
      event_slug?: string;
      event_title?: string;
      quantity?: number;
      ticket_tier_name?: string;
    };
    reference?: string;
    status?: string;
  };
  message?: string;
  status?: boolean;
};

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  maximumFractionDigits: 0,
  style: "currency",
});

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

async function verifyReference(reference: string): Promise<PaystackVerifyResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return {
      message: "Paystack is not configured. Add PAYSTACK_SECRET_KEY to your environment.",
      status: false,
    };
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  return (await response.json()) as PaystackVerifyResponse;
}

async function getOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "bitzsznn.vercel.app";

  return `${protocol}://${host}`;
}

async function sendVerifiedTicketEmail(transaction: NonNullable<PaystackVerifyResponse["data"]>) {
  try {
    return await fulfillTicket(buildTicketFromPaystack(transaction), await getOrigin());
  } catch (error) {
    console.error("Verified ticket email failed", error);
    return { sent: false as const, reason: "Ticket email could not be sent." };
  }
}

export const metadata = {
  title: "Payment Status | Bitzsznn",
  description: "Confirm your Bitzsznn ticket payment status.",
};

export default async function VerifyTicketPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const reference = firstParam(params.reference) ?? firstParam(params.trxref);
  const result = reference ? await verifyReference(reference) : null;
  const paid = result?.status === true && result.data?.status === "success";
  const metadata = result?.data?.metadata;
  const amount = result?.data?.amount ? currency.format(result.data.amount / 100) : null;
  const emailResult = paid && result?.data ? await sendVerifiedTicketEmail(result.data) : null;

  return (
    <main className="min-h-screen bg-[#f7f5f2] pt-28 text-[#183814] md:pt-36">
      <section className="container-shell figma-inner py-12 md:py-20">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#d8e4d2] bg-white p-7 text-center shadow-[0_24px_80px_rgba(24,56,20,0.12)] md:p-12">
          <PremiumIcon className="mx-auto" icon={paid ? CheckCircle2 : XCircle} size="lg" tone={paid ? "green" : "danger"} />

          <p className="mx-auto mt-6 w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
            Payment status
          </p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">
            {paid ? "Payment confirmed." : "Payment not confirmed."}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#183814]/72">
            {paid
              ? emailResult?.sent
                ? "Your Paystack payment was successful. Your QR ticket email has been sent to the email address used at checkout."
                : "Your Paystack payment was successful. If your QR ticket email does not arrive shortly, contact support with your payment reference."
              : result?.message ?? "We could not verify this payment. If you were charged, contact support with your payment reference."}
          </p>

          <div className="mt-8 grid gap-3 rounded-[22px] border border-[#d8e4d2] bg-[#f8fbf4] p-5 text-left text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="text-[#183814]/62">Reference</span>
              <strong>{reference ?? "Missing"}</strong>
            </div>
            {metadata?.event_title ? (
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Event</span>
                <strong>{metadata.event_title}</strong>
              </div>
            ) : null}
            {metadata?.ticket_tier_name ? (
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Ticket</span>
                <strong>{metadata.ticket_tier_name}</strong>
              </div>
            ) : null}
            {metadata?.quantity ? (
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Quantity</span>
                <strong>{metadata.quantity}</strong>
              </div>
            ) : null}
            {amount ? (
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Amount</span>
                <strong>{amount}</strong>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/events">See more events</Button>
            <Button href="/tickets" variant="ghost">
              Back to tickets
            </Button>
          </div>

          <p className="mt-6 text-xs leading-5 text-[#183814]/55">
            Need help? Email <Link className="font-bold text-[#459c0a]" href="mailto:hello@bitzsznn.com">hello@bitzsznn.com</Link> with your reference.
          </p>
        </div>
      </section>
    </main>
  );
}
