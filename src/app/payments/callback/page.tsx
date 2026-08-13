import Link from "next/link";
import { CheckCircle2, CircleX } from "lucide-react";
import { events } from "@/data/site";

type CallbackPageProps = {
  searchParams: Promise<{ reference?: string }>;
};

type Verification = {
  data?: {
    amount?: number;
    metadata?: { eventSlug?: string; quantity?: number } | string;
    status?: string;
  };
  status?: boolean;
};

export default async function PaymentCallbackPage({ searchParams }: CallbackPageProps) {
  const { reference } = await searchParams;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  let paid = false;

  if (reference && secretKey) {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: "no-store",
    });
    const result = (await response.json()) as Verification;
    const rawMetadata = result.data?.metadata;
    let metadata: { eventSlug?: string; quantity?: number } = {};
    if (typeof rawMetadata === "string") {
      try { metadata = JSON.parse(rawMetadata) as typeof metadata; } catch { metadata = {}; }
    } else if (rawMetadata) {
      metadata = rawMetadata;
    }
    const event = events.find((item) => item.slug === metadata.eventSlug);
    const expectedAmount = event && "ticketPrice" in event && event.ticketPrice
      ? event.ticketPrice * Number(metadata.quantity || 1) * 100
      : 0;
    paid = Boolean(response.ok && result.status && result.data?.status === "success" && expectedAmount > 0 && result.data.amount === expectedAmount);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0f1c07] px-5 py-28 text-white">
      <section className="w-full max-w-2xl rounded-[28px] border border-white/12 bg-white/[0.07] p-8 text-center shadow-2xl backdrop-blur md:p-12">
        {paid ? <CheckCircle2 className="mx-auto size-16 text-[#b8ff2c]" /> : <CircleX className="mx-auto size-16 text-red-300" />}
        <h1 className="mt-6 text-3xl font-semibold md:text-5xl">{paid ? "Payment confirmed." : "Payment not confirmed."}</h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-white/72">
          {paid
            ? "Your Batch B POP Party ticket payment was successful. Keep your Paystack receipt and payment reference for entry confirmation."
            : "We could not verify a successful payment. If you were charged, keep your payment reference and contact Bitzsznn before trying again."}
        </p>
        {reference ? <p className="mt-5 font-mono text-sm text-white/60">Reference: {reference}</p> : null}
        <Link className="mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#459c0a] px-6 font-semibold text-[#061006] transition hover:bg-[#5dc716]" href="/events/batch-b-pop-party-akure">
          Back to event
        </Link>
      </section>
    </main>
  );
}
