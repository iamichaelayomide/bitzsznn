import "server-only";

import { claimEmail, finishEmail, saveTicketOrder } from "@/lib/database";
import { sendTicketEmail } from "@/lib/ticket-email";
import type { TicketPayload } from "@/lib/tickets";

export async function fulfillTicket(ticket: TicketPayload, origin: string) {
  const order = await saveTicketOrder({
    amount: ticket.amount,
    buyer_email: ticket.buyerEmail,
    buyer_name: ticket.buyerName,
    buyer_phone: ticket.buyerPhone ?? "",
    currency: ticket.currency,
    event_slug: ticket.eventSlug,
    event_title: ticket.eventTitle,
    quantity: ticket.quantity,
    reference: ticket.reference,
    ticket_code: ticket.ticketCode,
    tier_name: ticket.ticketTierName,
  });

  if (order.email_status === "sent") return { alreadyProcessed: true, sent: true };
  if (!(await claimEmail("ticket_orders", "reference", ticket.reference))) return { alreadyProcessed: true, sent: false };

  try {
    const result = await sendTicketEmail(ticket, origin);
    await finishEmail("ticket_orders", "reference", ticket.reference, result.sent, result.sent ? undefined : result.reason);
    return result;
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Ticket email failed.";
    await finishEmail("ticket_orders", "reference", ticket.reference, false, reason);
    throw error;
  }
}
