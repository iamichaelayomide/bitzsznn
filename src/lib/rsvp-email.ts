import "server-only";

import nodemailer from "nodemailer";
import { events } from "@/data/site";
import type { RsvpRecord } from "@/lib/database";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

export async function sendRsvpEmail(rsvp: RsvpRecord) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;
  if (!host || !user || !pass || !from) throw new Error("Confirmation email is not configured.");

  const event = events.find((item) => item.slug === rsvp.event_slug);
  if (!event) throw new Error("RSVP event was not found.");
  const firstName = rsvp.full_name.trim().split(/\s+/)[0] || "there";
  const transporter = nodemailer.createTransport({
    auth: { pass, user },
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
  });

  await transporter.sendMail({
    from,
    replyTo: process.env.MAIL_REPLY_TO ?? user,
    subject: `Your RSVP is confirmed — ${event.title}`,
    to: rsvp.email,
    text: [
      `Hi ${firstName},`,
      `Your reservation for ${event.title} is confirmed.`,
      `${event.date} · ${event.location}`,
      "We will send the exact date, time, and venue details as soon as they are announced.",
      "Keep this email as your reservation confirmation. We can't wait to welcome you home.",
    ].join("\n\n"),
    html: `<div style="margin:0;background:#f7f5f2;padding:28px;font-family:Arial,sans-serif;color:#183814"><div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #d8e4d2;border-radius:24px;padding:28px"><p style="margin:0 0 12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#459c0a">Bitzsznn RSVP</p><h1 style="margin:0 0 16px;font-size:30px;line-height:1.2">Hi ${escapeHtml(firstName)}, your spot is reserved.</h1><p style="font-size:17px;line-height:1.7"><strong>${escapeHtml(event.title)}</strong></p><div style="margin:22px 0;background:#183814;border-radius:18px;padding:20px;color:#fff"><p style="margin:0 0 8px"><strong>Date:</strong> ${escapeHtml(event.date)}</p><p style="margin:0"><strong>Location:</strong> ${escapeHtml(event.location)}</p></div><p style="font-size:15px;line-height:1.7;color:#40563d">We will send the exact date, time, and venue details as soon as they are announced. Keep this email as your reservation confirmation.</p><p style="font-size:15px;line-height:1.7;color:#40563d">We can't wait to welcome you home. ❤️🏡</p></div></div>`,
  });
}
