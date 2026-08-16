import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { activeRsvpEventSlugs, events } from "@/data/site";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isEventRsvpOpen, listRsvps, listTicketOrders } from "@/lib/database";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [rsvps, tickets, settings] = await Promise.all([
    listRsvps(),
    listTicketOrders(),
    Promise.all(activeRsvpEventSlugs.map(async (slug) => [slug, await isEventRsvpOpen(slug)] as const)),
  ]);
  return <AdminDashboard eventNames={Object.fromEntries(events.map((event) => [event.slug, event.title]))} rsvpSettings={Object.fromEntries(settings)} rsvps={rsvps} tickets={tickets} />;
}
