"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Minus, Plus, ShieldCheck, Ticket } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/button";
import { PremiumIcon } from "@/components/premium-icon";
import { activeTicketEventSlug, events, getTicketTiersForEvent, isTicketedEvent } from "@/data/site";
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

export function TicketFlow({ eventSlug = activeTicketEventSlug, embedded = false }: TicketFlowProps) {
  const event = events.find((item) => item.slug === eventSlug) ?? events[0];
  const eventTicketTiers = getTicketTiersForEvent(event.slug);
  const ticketActive = isTicketedEvent(event.slug);
  const [selectedId, setSelectedId] = useState(eventTicketTiers[0]?.id ?? "standard");
  const [quantity, setQuantity] = useState(1);
  const [buyer, setBuyer] = useState<Buyer>({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedTier = eventTicketTiers.find((tier) => tier.id === selectedId) ?? eventTicketTiers[0];
  const subtotal = selectedTier.price * quantity;
  const serviceFee = Math.round(subtotal * 0.03);
  const total = subtotal + serviceFee;

  const canSubmit = ticketActive && buyer.name.trim().length > 1 && buyer.email.includes("@") && buyer.phone.trim().length > 6;

  async function startPayment() {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/paystack/initialize", {
        body: JSON.stringify({
          buyer,
          eventSlug: event.slug,
          quantity,
          tierId: selectedTier.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = await response.json();

      if (!response.ok || !payload.authorizationUrl) {
        throw new Error(payload.error ?? "Unable to start payment. Please try again.");
      }

      window.location.assign(payload.authorizationUrl);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to start payment. Please try again.");
      setIsSubmitting(false);
    }
  }

  function submitOrder(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    void startPayment();
  }

  const checkout = (
    <section className="section-grid-lines overflow-hidden bg-[#f7f5f2] py-10 text-[#183814] md:py-20" id="tickets">
      <div className="container-shell figma-inner">
        {!ticketActive ? (
          <div className="rounded-[24px] border border-[#d8e4d2] bg-white p-6 text-center shadow-[0_24px_80px_rgba(24,56,20,0.1)] md:p-10">
            <p className="mx-auto w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Tickets inactive
            </p>
            <h2 className="section-title mt-4">Tickets are not open for this event.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#183814]/72">
              Freed At Last is the only event currently accepting online ticket payments.
            </p>
            <Button className="mt-6" href={`/events/${activeTicketEventSlug}#tickets`}>
              Buy Freed At Last ticket
            </Button>
          </div>
        ) : (
            <motion.form
              animate={{ opacity: 1, y: 0 }}
              className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:gap-8"
              initial={{ opacity: 0, y: 16 }}
              onSubmit={submitOrder}
            >
              <div className="min-w-0">
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  Tickets
                </p>
                <h2 className="section-title mt-4">Choose your access.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#183814]/72">
                  Select a ticket for {event.title}. You will be redirected to Paystack to complete your payment securely.
                </p>
                <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4">
                  {eventTicketTiers.map((tier) => {
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
                          <PremiumIcon icon={Ticket} tone={selected ? "green" : "light"} />
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
                              <Check className="size-4 text-[#459c0a]" strokeWidth={1.8} />
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
                        <Minus className="size-4" strokeWidth={1.8} />
                      </button>
                      <span className="w-8 text-center font-bold">{quantity}</span>
                      <button aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full border border-[#d8e4d2] bg-white transition hover:bg-[#eef7e9]" onClick={() => setQuantity((value) => Math.min(10, value + 1))} type="button">
                        <Plus className="size-4" strokeWidth={1.8} />
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

                {errorMessage ? (
                  <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                <Button className="mt-6 w-full disabled:pointer-events-none disabled:opacity-50" disabled={!canSubmit || isSubmitting} onClick={startPayment} type="button">
                  {isSubmitting ? "Starting payment..." : "Pay with Paystack"}
                </Button>
                <div className="mt-4 flex gap-2 rounded-2xl bg-[#eef7e9] p-3 text-xs leading-5 text-[#183814]/72">
                  <PremiumIcon icon={ShieldCheck} size="sm" tone="green" />
                  Payment is processed by Paystack. Bitzsznn never sees or stores your card details.
                </div>
              </aside>
            </motion.form>
        )}
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
