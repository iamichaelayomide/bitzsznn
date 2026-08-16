import Link from "next/link";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/button";
import { PremiumIcon } from "@/components/premium-icon";
import { verifyTicketToken } from "@/lib/tickets";

type CheckInPageProps = {
  searchParams: Promise<{
    ticket?: string | string[];
  }>;
};

export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Ticket Check-In | Bitzsznn",
};

const currency = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  maximumFractionDigits: 0,
  style: "currency",
});

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TicketCheckInPage({ searchParams }: CheckInPageProps) {
  const params = await searchParams;
  const ticket = verifyTicketToken(firstParam(params.ticket));
  const valid = Boolean(ticket);

  return (
    <main className="min-h-screen bg-[#f7f5f2] pt-28 text-[#183814] md:pt-36">
      <section className="container-shell figma-inner py-12 md:py-20">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#d8e4d2] bg-white p-7 text-center shadow-[0_24px_80px_rgba(24,56,20,0.12)] md:p-12">
          <PremiumIcon className="mx-auto" icon={valid ? CheckCircle2 : ShieldAlert} size="lg" tone={valid ? "green" : "danger"} />

          <p className="mx-auto mt-6 w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
            Venue check-in
          </p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">
            {valid ? "Valid Bitzsznn ticket." : "Ticket could not be verified."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#183814]/72">
            {valid
              ? "Match the ticket code below with the guest email or Paystack reference before admitting the guest."
              : "This QR code is missing, damaged, or was not signed by Bitzsznn."}
          </p>

          {ticket ? (
            <div className="mt-8 grid gap-3 rounded-[22px] border border-[#d8e4d2] bg-[#f8fbf4] p-5 text-left text-sm">
              <div className="rounded-2xl bg-[#183814] p-5 text-center text-white">
                <span className="block text-xs uppercase tracking-[0.16em] text-white/62">Ticket code</span>
                <strong className="mt-2 block break-words text-2xl">{ticket.ticketCode}</strong>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Name</span>
                <strong>{ticket.buyerName}</strong>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Email</span>
                <strong>{ticket.buyerEmail}</strong>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Event</span>
                <strong>{ticket.eventTitle}</strong>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Ticket</span>
                <strong>{ticket.ticketTierName}</strong>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Quantity</span>
                <strong>{ticket.quantity}</strong>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Amount</span>
                <strong>{currency.format(ticket.amount / 100)}</strong>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[#183814]/62">Reference</span>
                <strong>{ticket.reference}</strong>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/tickets">Buy ticket</Button>
            <Button href="/events" variant="ghost">
              See details
            </Button>
          </div>

          <p className="mt-6 text-xs leading-5 text-[#183814]/55">
            Need help? Email <Link className="font-bold text-[#459c0a]" href="mailto:hello@bitzsznn.com">hello@bitzsznn.com</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
