import { NextRequest, NextResponse } from "next/server";
import { events, isRsvpEvent } from "@/data/site";
import { claimEmail, createRsvp, findRsvp, finishEmail, isDuplicateDatabaseError, isEventRsvpOpen } from "@/lib/database";
import { sendRsvpEmail } from "@/lib/rsvp-email";

type RsvpBody = { email?: string; eventSlug?: string; fullName?: string; phone?: string; socialHandle?: string };

export async function GET(request: NextRequest) {
  const eventSlug = request.nextUrl.searchParams.get("eventSlug") ?? "";
  if (!isRsvpEvent(eventSlug)) return NextResponse.json({ error: "This event does not accept RSVPs." }, { status: 404 });
  try {
    return NextResponse.json({ open: await isEventRsvpOpen(eventSlug) });
  } catch {
    return NextResponse.json({ error: "RSVP service is not configured." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let body: RsvpBody;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid RSVP request." }, { status: 400 }); }

  const eventSlug = body.eventSlug?.trim() ?? "";
  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";
  const socialHandle = body.socialHandle?.trim() ?? "";
  const event = events.find((item) => item.slug === eventSlug);

  if (!event || !isRsvpEvent(eventSlug)) return NextResponse.json({ error: "This event does not accept RSVPs." }, { status: 400 });
  if (fullName.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 7 || socialHandle.length < 2) {
    return NextResponse.json({ error: "Please provide your name, a valid email, phone number, and social media handle." }, { status: 400 });
  }

  try {
    if (!(await isEventRsvpOpen(eventSlug))) return NextResponse.json({ error: "RSVPs are currently closed for this event." }, { status: 409 });

    let rsvp;
    try {
      rsvp = await createRsvp({ email, event_slug: eventSlug, full_name: fullName, phone, social_handle: socialHandle });
    } catch (error) {
      if (!isDuplicateDatabaseError(error)) throw error;
      const existing = await findRsvp(eventSlug, email);
      return NextResponse.json({ alreadyReserved: true, emailSent: existing?.email_status === "sent", success: true });
    }

    let emailSent = false;
    if (await claimEmail("rsvps", "id", rsvp.id)) {
      try {
        await sendRsvpEmail(rsvp);
        await finishEmail("rsvps", "id", rsvp.id, true);
        emailSent = true;
      } catch (error) {
        const reason = error instanceof Error ? error.message : "Email delivery failed.";
        await finishEmail("rsvps", "id", rsvp.id, false, reason);
      }
    }

    return NextResponse.json({ emailSent, success: true });
  } catch (error) {
    console.error("RSVP submission failed", error);
    return NextResponse.json({ error: "We could not save your RSVP. Please try again shortly." }, { status: 500 });
  }
}
