"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, Ticket } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/button";
import { socialLinks, ticketTiers } from "@/data/site";
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

export function TicketFlow() {
  const [selectedId, setSelectedId] = useState("standard");
  const [quantity, setQuantity] = useState(1);
  const [buyer, setBuyer] = useState<Buyer>({ name: "", email: "", phone: "" });
  const [confirmed, setConfirmed] = useState(false);

  const selectedTier = ticketTiers.find((tier) => tier.id === selectedId) ?? ticketTiers[1];
  const subtotal = selectedTier.price * quantity;
  const serviceFee = Math.round(subtotal * 0.03);
  const total = subtotal + serviceFee;

  const canSubmit = useMemo(
    () => buyer.name.trim().length > 1 && buyer.email.includes("@") && buyer.phone.trim().length > 6,
    [buyer],
  );

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) {
      setConfirmed(true);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            alt="Concert crowd"
            className="h-full w-full object-cover opacity-45"
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=85"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,11,8,0.96),rgba(8,11,8,0.78),rgba(8,11,8,0.92))]" />
        </div>

        <div className="container-shell relative z-10 py-8 md:py-10">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
            href="/"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
          <div className="grid gap-8 py-14 lg:grid-cols-[1fr_0.62fr] lg:items-end">
            <div>
              <p className="mb-5 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Ticket checkout
              </p>
              <h1 className="text-balance text-5xl font-black leading-tight md:text-7xl">Choose your Bitzsznn experience.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Pick your pass, add your details, and reserve your spot. This first version confirms your intent without charging a payment card.
              </p>
            </div>
            <div className="rounded-[24px] border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-primary" />
                <p className="font-bold">Frontend reservation flow</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                No live payment is taken here yet. The confirmation screen can later connect to Stripe, Paystack, Flutterwave, or a ticketing platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid-lines py-12 md:py-20">
        <div className="container-shell">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-3xl rounded-[28px] border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)] md:p-12"
                exit={{ opacity: 0, y: -16 }}
                initial={{ opacity: 0, y: 16 }}
                key="confirmed"
              >
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-8" />
                </div>
                <h2 className="mt-6 text-4xl font-black">Your spot is reserved.</h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  Thanks, {buyer.name}. We have prepared a {selectedTier.name} reservation for {quantity} ticket{quantity > 1 ? "s" : ""}. A real checkout provider can be plugged in next.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href={socialLinks.whatsapp}>Confirm on WhatsApp</Button>
                  <Button href="/" variant="ghost">
                    Return home
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-8 lg:grid-cols-[1fr_420px]"
                exit={{ opacity: 0, y: -16 }}
                initial={{ opacity: 0, y: 16 }}
                key="form"
                onSubmit={submitOrder}
              >
                <div>
                  <h2 className="text-2xl font-black md:text-3xl">Select a pass</h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {ticketTiers.map((tier) => {
                      const selected = tier.id === selectedId;
                      return (
                        <button
                          className={cn(
                            "group min-h-[250px] rounded-[24px] border p-5 text-left transition duration-200 hover:-translate-y-1",
                            selected
                              ? "border-primary bg-primary/12 shadow-[0_22px_60px_rgba(75,165,11,0.2)]"
                              : "border-border bg-surface hover:border-primary/45 hover:bg-surface-elevated",
                          )}
                          key={tier.id}
                          onClick={() => setSelectedId(tier.id)}
                          type="button"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="grid size-12 place-items-center rounded-2xl bg-white/8">
                              <Ticket className={cn("size-6", selected ? "text-primary" : "text-muted-foreground")} />
                            </div>
                            {tier.featured ? (
                              <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-accent-foreground">
                                Popular
                              </span>
                            ) : null}
                          </div>
                          <h3 className="mt-8 text-xl font-black">{tier.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{tier.description}</p>
                          <p className="mt-5 text-3xl font-black text-primary">{currency.format(tier.price)}</p>
                          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
                            {tier.perks.map((perk) => (
                              <li className="flex items-center gap-2" key={perk}>
                                <Check className="size-4 text-primary" />
                                {perk}
                              </li>
                            ))}
                          </ul>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <aside className="h-fit rounded-[28px] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] md:p-6 lg:sticky lg:top-8">
                  <h2 className="text-2xl font-black">Order summary</h2>
                  <div className="mt-5 rounded-2xl border border-border bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold">{selectedTier.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{selectedTier.description}</p>
                      </div>
                      <p className="font-black text-primary">{currency.format(selectedTier.price)}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Decrease quantity"
                          className="grid size-10 place-items-center rounded-full border border-border bg-white/5 transition hover:bg-white/10"
                          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                          type="button"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-8 text-center font-black">{quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          className="grid size-10 place-items-center rounded-full border border-border bg-white/5 transition hover:bg-white/10"
                          onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                          type="button"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <label className="grid gap-2 text-sm font-bold">
                      Full name
                      <input
                        className="min-h-12 rounded-2xl border border-border bg-white/5 px-4 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary"
                        onChange={(event) => setBuyer((value) => ({ ...value, name: event.target.value }))}
                        placeholder="Your name"
                        required
                        value={buyer.name}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-bold">
                      Email address
                      <input
                        className="min-h-12 rounded-2xl border border-border bg-white/5 px-4 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary"
                        onChange={(event) => setBuyer((value) => ({ ...value, email: event.target.value }))}
                        placeholder="you@example.com"
                        required
                        type="email"
                        value={buyer.email}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-bold">
                      Phone number
                      <input
                        className="min-h-12 rounded-2xl border border-border bg-white/5 px-4 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary"
                        onChange={(event) => setBuyer((value) => ({ ...value, phone: event.target.value }))}
                        placeholder="+234..."
                        required
                        value={buyer.phone}
                      />
                    </label>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{currency.format(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Service fee</span>
                      <span>{currency.format(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-black">
                      <span>Total</span>
                      <span>{currency.format(total)}</span>
                    </div>
                  </div>

                  <Button className="mt-6 w-full disabled:pointer-events-none disabled:opacity-50" type="submit">
                    Reserve ticket
                  </Button>
                  {!canSubmit ? (
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      Add your name, email, and phone number to activate confirmation.
                    </p>
                  ) : null}
                </aside>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
