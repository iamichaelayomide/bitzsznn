"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShieldCheck, Ticket } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/button";
import { events, socialLinks, ticketTiers } from "@/data/site";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  maximumFractionDigits: 0,
  style: "currency",
});

type Buyer = {
  name: string;
  email: string;
  phone: string;
};

type TicketFlowProps = {
  eventSlug?: string;
  embedded?: boolean;
};

function makeCode() {
  return `BTZ-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
}

export function TicketFlow({ eventSlug = "batch-a2-pop-party", embedded = false }: TicketFlowProps) {
  const event = events.find((item) => item.slug === eventSlug) ?? events[0];
  const [selectedId, setSelectedId] = useState("standard");
  const [quantity, setQuantity] = useState(1);
  const [buyer, setBuyer] = useState<Buyer>({ name: "", email: "", phone: "" });
  const [confirmationCode, setConfirmationCode] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const eventTicket = "ticketPrice" in event && typeof event.ticketPrice === "number"
    ? [{ id: "standard", name: "General Admission", price: event.ticketPrice, description: "Entry to the full Batch B POP Party experience.", perks: ["General entry", "Music and games", "Networking access"], featured: true }]
    : ticketTiers;
  const selectedTier = eventTicket.find((tier) => tier.id === selectedId) ?? eventTicket[0]!;
  const subtotal = selectedTier.price * quantity;
  const isPaidEvent = "ticketPrice" in event;
  const serviceFee = isPaidEvent ? 0 : Math.round(subtotal * 0.03);
  const total = subtotal + serviceFee;
  const confirmed = confirmationCode.length > 0;

  const canSubmit = useMemo(
    () => buyer.name.trim().length > 1 && buyer.email.includes("@") && buyer.phone.trim().length > 6,
    [buyer],
  );

  async function submitOrder(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!canSubmit) return;

    if (!isPaidEvent) {
      setConfirmationCode(makeCode());
      return;
    }

    setIsPaying(true);
    setPaymentError("");
    try {
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...buyer, eventSlug: event.slug, quantity }),
      });
      const result = (await response.json()) as { authorizationUrl?: string; error?: string };
      if (!response.ok || !result.authorizationUrl) {
        throw new Error(result.error || "Payment could not be started.");
      }
      window.location.assign(result.authorizationUrl);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Payment could not be started.");
      setIsPaying(false);
    }
  }

  const checkout = (
    <section className="section-grid-lines overflow-hidden bg-[#f7f5f2] py-10 text-[#183814] md:py-20" id="tickets">
      <div className="container-shell figma-inner">
        <AnimatePresence mode="wait">
          {confirmed ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl rounded-[28px] border border-[#d8e4d2] bg-white p-8 text-center shadow-[0_24px_80px_rgba(24,56,20,0.12)] md:p-12"
              exit={{ opacity: 0, y: -16 }}
              initial={{ opacity: 0, y: 16 }}
              key="confirmed"
            >
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#459c0a] text-white">
                <Check className="size-8" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold md:text-3xl">Your ticket request is in.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[#183814]/72">
                Thanks, {buyer.name}. Your {selectedTier.name} order for {event.title} has been recorded.
                Use this code at confirmation: <strong className="text-[#183814]">{confirmationCode}</strong>.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#183814]/62">
                In this frontend version, the email message is prepared conceptually but not sent by a server yet.
                Connect Resend, Paystack, Flutterwave, or another provider to deliver the ticket automatically.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={socialLinks.whatsapp}>Confirm on WhatsApp</Button>
                <Button href="/events" variant="ghost">
                  See more events
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              animate={{ opacity: 1, y: 0 }}
              className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:gap-8"
              exit={{ opacity: 0, y: -16 }}
              initial={{ opacity: 0, y: 16 }}
              key="form"
              onSubmit={submitOrder}
            >
              <div className="min-w-0">
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  Tickets
                </p>
                <h2 className="section-title mt-4">Choose your access.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#183814]/72">
                  {isPaidEvent
                    ? `Pay securely for ${event.title}. Your ticket costs ${currency.format(selectedTier.price)} per person.`
                    : `Select a ticket for ${event.title}. Your details create a reservation code you can use for follow-up confirmation.`}
                </p>
                <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4">
                  {eventTicket.map((tier) => {
                    const selected = tier.id === selectedId;
                    return (
                      <button
                        className={cn(
                          "group min-h-[220px] w-full min-w-0 rounded-[20px] border p-4 text-left transition duration-200 hover:-translate-y-1 md:min-h-[250px] md:rounded-[24px] md:p-5",
                          selected
                            ? "border-[#459c0a] bg-[#d8f7d8] shadow-[0_22px_60px_rgba(75,165,11,0.18)]"
                            : "border-[#d8e4d2] bg-white hover:border-[#459c0a]/60",
                        )}
                        key={tier.id}
                        onClick={() => setSelectedId(tier.id)}
                        type="button"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="grid size-12 place-items-center rounded-2xl bg-[#eef7e9]">
                            <Ticket className={cn("size-6", selected ? "text-[#459c0a]" : "text-[#183814]/62")} />
                          </div>
                          {tier.featured ? (
                            <span className="rounded-full bg-[#459c0a] px-3 py-1 text-xs font-bold text-white">
                              Popular
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-6 text-lg font-semibold md:mt-8 md:text-xl">{tier.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#183814]/70">{tier.description}</p>
                        <p className="mt-4 text-xl font-semibold text-[#459c0a] md:mt-5 md:text-2xl">{currency.format(tier.price)}</p>
                        <ul className="mt-4 grid gap-2 text-sm text-[#183814]/72 md:mt-5">
                          {tier.perks.map((perk) => (
                            <li className="flex items-center gap-2" key={perk}>
                              <Check className="size-4 text-[#459c0a]" />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside className="h-fit min-w-0 rounded-[22px] border border-[#d8e4d2] bg-white p-4 shadow-[0_24px_80px_rgba(24,56,20,0.12)] md:rounded-[28px] md:p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-semibold md:text-2xl">Order summary</h2>
                <div className="mt-5 rounded-2xl border border-[#d8e4d2] bg-[#f8fbf4] p-4">
                  <p className="text-sm font-semibold text-[#459c0a]">{event.title}</p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <p className="font-bold">{selectedTier.name}</p>
                      <p className="mt-1 text-sm text-[#183814]/68">{selectedTier.description}</p>
                    </div>
                    <p className="shrink-0 font-bold text-[#459c0a]">{currency.format(selectedTier.price)}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-[#183814]/68">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button aria-label="Decrease quantity" className="grid size-10 place-items-center rounded-full border border-[#d8e4d2] bg-white transition hover:bg-[#eef7e9]" onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button">
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{quantity}</span>
                      <button aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full border border-[#d8e4d2] bg-white transition hover:bg-[#eef7e9]" onClick={() => setQuantity((value) => Math.min(10, value + 1))} type="button">
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {[
                    ["Full name", "name", "Your name", "text"],
                    ["Email address", "email", "you@example.com", "email"],
                    ["Phone number", "phone", "+234...", "text"],
                  ].map(([label, key, placeholder, type]) => (
                    <label className="grid gap-2 text-sm font-bold" key={key}>
                      {label}
                      <input
                        className="min-h-12 w-full min-w-0 rounded-2xl border border-[#d8e4d2] bg-[#f8fbf4] px-4 text-[#183814] outline-none transition placeholder:text-[#183814]/45 focus:border-[#459c0a]"
                        onChange={(inputEvent) => setBuyer((value) => ({ ...value, [key]: inputEvent.target.value }))}
                        placeholder={placeholder}
                        required
                        type={type}
                        value={buyer[key as keyof Buyer]}
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-[#d8e4d2] pt-5 text-sm">
                  <div className="flex justify-between text-[#183814]/68">
                    <span>Subtotal</span>
                    <span>{currency.format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#183814]/68">
                    <span>Service fee</span>
                    <span>{currency.format(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{currency.format(total)}</span>
                  </div>
                </div>

                {paymentError ? <p className="mt-4 text-sm font-semibold text-red-700" role="alert">{paymentError}</p> : null}
                <Button className="mt-6 w-full disabled:pointer-events-none disabled:opacity-50" disabled={!canSubmit || isPaying} type="submit">
                  {isPaidEvent ? (isPaying ? "Opening secure payment…" : `Pay ${currency.format(total)}`) : "Reserve my ticket"}
                </Button>
                <div className="mt-4 flex gap-2 rounded-2xl bg-[#eef7e9] p-3 text-xs leading-5 text-[#183814]/72">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#459c0a]" />
                  {isPaidEvent
                    ? "Payment is processed securely by Paystack. Bitzsznn does not store your card or bank details."
                    : "No payment is charged in this v1 flow. Confirmation code is generated after submission."}
                </div>
              </aside>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );

  if (embedded) {
    return checkout;
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f5f2]">
      <section className="relative overflow-hidden bg-[#0f1c07] pt-24 text-white md:pt-36">
        <div className="container-shell figma-inner py-12 md:py-24">
          <Link className="text-sm text-white/70 transition hover:text-white" href="/events">
            ← Back to events
          </Link>
          <div className="mt-10 max-w-4xl">
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Ticket checkout
            </p>
            <h1 className="mt-5 text-[34px] font-semibold leading-[1.05] md:text-[54px]">Reserve access for {event.title}.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 md:text-lg md:leading-8">{event.summary}</p>
          </div>
        </div>
      </section>
      {checkout}
    </main>
  );
}
