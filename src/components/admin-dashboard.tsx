"use client";

import { useMemo, useState } from "react";
import { Download, LogOut, Mail, Search, Ticket, UsersRound, type LucideIcon } from "lucide-react";
import type { RsvpRecord, TicketOrderRecord } from "@/lib/database";

type Props = { rsvps: RsvpRecord[]; tickets: TicketOrderRecord[]; rsvpSettings: Record<string, boolean>; eventNames: Record<string, string> };

export function AdminDashboard({ rsvps, tickets, rsvpSettings, eventNames }: Props) {
  const [query, setQuery] = useState("");
  const [eventSlug, setEventSlug] = useState("all");
  const [busy, setBusy] = useState("");
  const revenue = tickets.reduce((sum, item) => sum + item.amount, 0);
  const statCards: Array<{ icon: LucideIcon; label: string; value: number | string }> = [
    { icon: UsersRound, label: "Total RSVPs", value: rsvps.length },
    { icon: Ticket, label: "Paid tickets", value: tickets.reduce((sum, item) => sum + item.quantity, 0) },
    { icon: Ticket, label: "Ticket orders", value: tickets.length },
    { icon: Ticket, label: "Ticket revenue", value: new Intl.NumberFormat("en-NG", { currency: "NGN", maximumFractionDigits: 0, style: "currency" }).format(revenue / 100) },
  ];
  const eventOptions = Array.from(new Set([...rsvps.map((item) => item.event_slug), ...tickets.map((item) => item.event_slug)]));
  const rows = useMemo(() => {
    const normalized = [
      ...rsvps.map((item) => ({ createdAt: item.created_at, email: item.email, emailStatus: item.email_status, eventSlug: item.event_slug, id: item.id, name: item.full_name, phone: item.phone, quantity: 1, social: item.social_handle, type: "rsvp" as const })),
      ...tickets.map((item) => ({ createdAt: item.created_at, email: item.buyer_email, emailStatus: item.email_status, eventSlug: item.event_slug, id: item.reference, name: item.buyer_name, phone: item.buyer_phone, quantity: item.quantity, social: "—", type: "ticket" as const })),
    ];
    const term = query.trim().toLowerCase();
    return normalized.filter((item) => (eventSlug === "all" || item.eventSlug === eventSlug) && (!term || [item.name, item.email, item.phone, item.social, item.id].some((value) => value.toLowerCase().includes(term))));
  }, [eventSlug, query, rsvps, tickets]);

  async function updateEvent(slug: string, open: boolean) {
    setBusy(slug);
    await fetch("/api/admin/events", { body: JSON.stringify({ eventSlug: slug, open }), headers: { "Content-Type": "application/json" }, method: "PATCH" });
    window.location.reload();
  }

  async function resend(type: "rsvp" | "ticket", id: string) {
    setBusy(id);
    const response = await fetch("/api/admin/resend", { body: JSON.stringify({ id, type }), headers: { "Content-Type": "application/json" }, method: "POST" });
    if (!response.ok) alert((await response.json()).error ?? "Email could not be sent.");
    window.location.reload();
  }

  function exportCsv() {
    const cells = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [["Type", "Event", "Name", "Email", "Phone", "Social handle", "Quantity", "Email status", "Registered at"], ...rows.map((item) => [item.type, eventNames[item.eventSlug] ?? item.eventSlug, item.name, item.email, item.phone, item.social, item.quantity, item.emailStatus, item.createdAt])].map((row) => row.map(cells).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = `bitzsznn-attendees-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click(); URL.revokeObjectURL(link.href);
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.assign("/admin/login"); }

  return <main className="min-h-screen bg-[#f7f5f2] pt-28 text-[#183814] md:pt-36"><section className="container-shell figma-inner pb-20"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#459c0a]">Private dashboard</p><h1 className="hero-title mt-4">Guest operations.</h1><p className="mt-4 text-[#183814]/65">Every RSVP and confirmed Paystack ticket, organized by event.</p></div><button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-[#d8e4d2] bg-white px-4 text-sm font-bold" onClick={logout}><LogOut className="size-4" /> Sign out</button></div>
    <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{statCards.map(({ icon: Icon, label, value }) => <div className="rounded-[22px] border border-[#d8e4d2] bg-white p-5 shadow-[0_14px_40px_rgba(24,56,20,.06)]" key={label}><Icon className="size-5 text-[#459c0a]" /><p className="mt-5 text-3xl font-semibold">{String(value)}</p><p className="mt-1 text-sm text-[#183814]/58">{label}</p></div>)}</div>
    {Object.entries(rsvpSettings).length ? <div className="mt-8 rounded-[22px] border border-[#d8e4d2] bg-white p-5"><h2 className="text-lg font-bold">RSVP controls</h2><div className="mt-4 grid gap-3">{Object.entries(rsvpSettings).map(([slug, open]) => <div className="flex flex-col justify-between gap-3 rounded-2xl bg-[#f8fbf4] p-4 sm:flex-row sm:items-center" key={slug}><div><p className="font-bold">{eventNames[slug] ?? slug}</p><p className="mt-1 text-sm text-[#183814]/58">Registration is {open ? "open" : "closed"}.</p></div><button className={`min-h-10 rounded-xl px-4 text-sm font-bold ${open ? "bg-[#183814] text-white" : "bg-[#459c0a] text-[#061006]"}`} disabled={busy === slug} onClick={() => updateEvent(slug, !open)}>{open ? "Close RSVPs" : "Reopen RSVPs"}</button></div>)}</div></div> : null}
    <div className="mt-8 overflow-hidden rounded-[22px] border border-[#d8e4d2] bg-white"><div className="flex flex-col gap-4 border-b border-[#d8e4d2] p-5 lg:flex-row lg:items-center"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#183814]/40" /><input className="min-h-12 w-full rounded-2xl border border-[#d8e4d2] bg-[#f8fbf4] pl-11 pr-4 outline-none focus:border-[#459c0a]" onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email, phone, social handle..." value={query} /></div><select className="min-h-12 rounded-2xl border border-[#d8e4d2] bg-[#f8fbf4] px-4" onChange={(event) => setEventSlug(event.target.value)} value={eventSlug}><option value="all">All events</option>{eventOptions.map((slug) => <option key={slug} value={slug}>{eventNames[slug] ?? slug}</option>)}</select><button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-[#459c0a] px-5 text-sm font-bold text-[#061006]" onClick={exportCsv}><Download className="size-4" /> Export CSV</button></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="bg-[#f8fbf4] text-xs uppercase tracking-[.08em] text-[#183814]/55"><tr>{["Guest", "Contact", "Social", "Event", "Access", "Email", "Registered", "Action"].map((heading) => <th className="px-5 py-4" key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((item) => <tr className="border-t border-[#e5ede1]" key={`${item.type}-${item.id}`}><td className="px-5 py-4 font-bold">{item.name}</td><td className="px-5 py-4"><a className="block text-[#459c0a]" href={`mailto:${item.email}`}>{item.email}</a><a className="mt-1 block text-[#183814]/60" href={`tel:${item.phone}`}>{item.phone || "—"}</a></td><td className="px-5 py-4">{item.social}</td><td className="px-5 py-4 max-w-[220px]">{eventNames[item.eventSlug] ?? item.eventSlug}</td><td className="px-5 py-4"><span className="rounded-full bg-[#eef7e9] px-3 py-1 text-xs font-bold">{item.type === "rsvp" ? "RSVP" : `Ticket × ${item.quantity}`}</span></td><td className="px-5 py-4"><span className={item.emailStatus === "sent" ? "text-green-700" : item.emailStatus === "failed" ? "text-red-700" : "text-amber-700"}>{item.emailStatus}</span></td><td className="px-5 py-4 text-[#183814]/60">{new Date(item.createdAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</td><td className="px-5 py-4"><button className="inline-flex items-center gap-2 font-bold text-[#459c0a] disabled:opacity-40" disabled={busy === item.id} onClick={() => resend(item.type, item.id)}><Mail className="size-4" /> Resend</button></td></tr>)}{rows.length === 0 ? <tr><td className="px-5 py-12 text-center text-[#183814]/55" colSpan={8}>No guests match this view.</td></tr> : null}</tbody></table></div></div>
  </section></main>;
}
