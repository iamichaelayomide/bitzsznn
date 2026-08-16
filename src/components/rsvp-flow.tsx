"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Heart, ShieldCheck } from "lucide-react";
import { PremiumIcon } from "@/components/premium-icon";

export function RsvpFlow({ eventSlug, eventTitle }: { eventSlug: string; eventTitle: string }) {
  const [form, setForm] = useState({ email: "", fullName: "", phone: "", socialHandle: "" });
  const [status, setStatus] = useState<"form" | "submitting" | "success" | "closed">("form");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/rsvp?eventSlug=${encodeURIComponent(eventSlug)}`)
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => { if (payload?.open === false) setStatus("closed"); })
      .catch(() => undefined);
  }, [eventSlug]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/rsvp", {
        body: JSON.stringify({ ...form, eventSlug }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = await response.json();
      if (!response.ok) {
        if (response.status === 409) setStatus("closed");
        else setStatus("form");
        throw new Error(payload.error ?? "Unable to reserve your spot.");
      }
      setMessage(payload.alreadyReserved
        ? "You already have a reservation for this event. Your spot remains confirmed."
        : payload.emailSent
          ? "Your spot is reserved and a confirmation email is on its way."
          : "Your spot is reserved. If the email does not arrive, the Bitzsznn team can resend it.");
      setStatus("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to reserve your spot.");
    }
  }

  return (
    <section className="section-grid-lines bg-[#f7f5f2] py-14 text-[#183814] md:py-24" id="rsvp">
      <div className="container-shell figma-inner">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#d8e4d2] bg-white p-6 shadow-[0_24px_80px_rgba(24,56,20,0.12)] md:p-10">
          {status === "success" ? (
            <div className="py-8 text-center">
              <PremiumIcon className="mx-auto" icon={CheckCircle2} size="lg" tone="green" />
              <p className="mx-auto mt-6 w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">RSVP confirmed</p>
              <h2 className="section-title mt-5">We&apos;ll see you in Abuja.</h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-[#183814]/72">{message}</p>
            </div>
          ) : status === "closed" ? (
            <div className="py-8 text-center">
              <PremiumIcon className="mx-auto" icon={Heart} size="lg" tone="green" />
              <h2 className="section-title mt-5">RSVPs are currently closed.</h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-[#183814]/72">Follow Bitzsznn for updates about {eventTitle}.</p>
              {message ? <p className="mt-4 text-sm text-red-700">{message}</p> : null}
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">Free RSVP</p>
              <h2 className="section-title mt-5">Reserve your spot.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#183814]/72">Join the guest list for {eventTitle}. Exact date, time, and venue details will be shared with confirmed guests.</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {[
                  ["Full name", "fullName", "Your full name", "text"],
                  ["Email address", "email", "you@example.com", "email"],
                  ["Phone number", "phone", "+234...", "tel"],
                  ["Social media handle", "socialHandle", "@yourhandle", "text"],
                ].map(([label, key, placeholder, type]) => (
                  <label className="grid gap-2 text-sm font-bold" key={key}>{label}
                    <input className="min-h-12 rounded-2xl border border-[#d8e4d2] bg-[#f8fbf4] px-4 outline-none transition placeholder:text-[#183814]/40 focus:border-[#459c0a]" onChange={(event) => setForm((value) => ({ ...value, [key]: event.target.value }))} placeholder={placeholder} required type={type} value={form[key as keyof typeof form]} />
                  </label>
                ))}
              </div>
              {message ? <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{message}</p> : null}
              <button className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[#459c0a] px-6 py-3 text-sm font-semibold text-[#061006] transition hover:-translate-y-0.5 hover:bg-[#5dc716] disabled:opacity-50" disabled={status === "submitting"} type="submit">{status === "submitting" ? "Reserving your spot..." : "Reserve your spot"}</button>
              <div className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#183814]/62"><ShieldCheck className="size-4 text-[#459c0a]" />Your details are private and only available to the Bitzsznn event team.</div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
