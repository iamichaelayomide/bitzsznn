import nodemailer from "nodemailer";
import QRCode from "qrcode";
import { createTicketToken, TicketPayload } from "@/lib/tickets";

type EmailResult =
  | {
      sent: true;
    }
  | {
      reason: string;
      sent: false;
    };

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;
  const replyTo = process.env.MAIL_REPLY_TO ?? user;

  if (!host || !user || !pass || !from) {
    return null;
  }

  return {
    from,
    replyTo,
    transport: {
      auth: {
        pass,
        user,
      },
      host,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
    },
  };
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-NG", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount / 100);
}

function escapeHtml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getGreetingName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export async function sendTicketEmail(ticket: TicketPayload, origin: string): Promise<EmailResult> {
  const config = getSmtpConfig();

  if (!config) {
    return {
      reason: "Gmail SMTP is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, and MAIL_FROM.",
      sent: false,
    };
  }

  const token = createTicketToken(ticket);
  const checkInUrl = new URL("/tickets/check-in", origin);
  checkInUrl.searchParams.set("ticket", token);

  const qrBuffer = await QRCode.toBuffer(checkInUrl.toString(), {
    errorCorrectionLevel: "M",
    margin: 1,
    type: "png",
    width: 520,
  });

  const transporter = nodemailer.createTransport(config.transport);
  const amount = formatAmount(ticket.amount, ticket.currency);
  const greetingName = getGreetingName(ticket.buyerName);

  await transporter.sendMail({
    attachments: [
      {
        cid: "bitzsznn-ticket-qr",
        content: qrBuffer,
        contentType: "image/png",
        filename: `${ticket.ticketCode}.png`,
      },
    ],
    from: config.from,
    html: `
      <div style="margin:0;background:#f7f5f2;padding:28px;font-family:Arial,sans-serif;color:#183814">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d8e4d2;border-radius:24px;padding:28px">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#459c0a">Bitzsznn ticket</p>
          <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#183814">Hi ${escapeHtml(greetingName)}, congratulations.</h1>
          <p style="margin:0 0 14px;font-size:17px;line-height:1.6;color:#183814"><strong>Your Bitzsznn ticket is confirmed.</strong></p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#40563d">Your payment is complete and your spot is locked in. Keep this email safe and show the QR code at the venue for check-in.</p>
          <div style="margin:0 0 22px;background:#183814;border-radius:18px;padding:18px;text-align:center;color:#ffffff">
            <span style="display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65)">Your 12-character ticket code</span>
            <strong style="display:block;margin-top:8px;font-size:30px;letter-spacing:.12em">${escapeHtml(ticket.ticketCode)}</strong>
          </div>
          <div style="text-align:center;margin:24px 0">
            <img alt="Bitzsznn QR ticket" src="cid:bitzsznn-ticket-qr" style="width:260px;max-width:100%;border:1px solid #d8e4d2;border-radius:18px;padding:10px" />
          </div>
          <div style="background:#f8fbf4;border:1px solid #d8e4d2;border-radius:18px;padding:18px;font-size:14px;line-height:1.7">
            <p style="margin:0"><strong>Ticket code:</strong> ${escapeHtml(ticket.ticketCode)}</p>
            <p style="margin:8px 0 0"><strong>Name:</strong> ${escapeHtml(ticket.buyerName)}</p>
            <p style="margin:8px 0 0"><strong>Event:</strong> ${escapeHtml(ticket.eventTitle)}</p>
            <p style="margin:8px 0 0"><strong>Ticket:</strong> ${escapeHtml(ticket.ticketTierName)} x ${escapeHtml(ticket.quantity)}</p>
            <p style="margin:8px 0 0"><strong>Amount:</strong> ${escapeHtml(amount)}</p>
            <p style="margin:8px 0 0"><strong>Paystack reference:</strong> ${escapeHtml(ticket.reference)}</p>
          </div>
          <p style="margin:22px 0 0;font-size:12px;line-height:1.6;color:#6d7b68">The QR code and ticket code are tied to your successful Paystack payment. If you need help, reply to this email.</p>
        </div>
      </div>
    `,
    replyTo: config.replyTo,
    subject: `Congrats, your Bitzsznn ticket is confirmed: ${ticket.ticketCode}`,
    text: [
      `Hi ${greetingName}, congratulations.`,
      "Your Bitzsznn ticket is confirmed.",
      `Unique access code: ${ticket.ticketCode}`,
      `Name: ${ticket.buyerName}`,
      `Event: ${ticket.eventTitle}`,
      `Ticket: ${ticket.ticketTierName} x ${ticket.quantity}`,
      `Amount: ${amount}`,
      `Paystack reference: ${ticket.reference}`,
      `Venue scan link: ${checkInUrl.toString()}`,
    ].join("\n"),
    to: ticket.buyerEmail,
  });

  return { sent: true };
}
