import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/button";
import { EventRoomStack } from "@/components/event-room-stack";
import { PremiumIcon } from "@/components/premium-icon";
import { TicketFlow } from "@/components/ticket-flow";
import { RsvpFlow } from "@/components/rsvp-flow";
import { events, isRsvpEvent, isTicketedEvent } from "@/data/site";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  return {
    title: event ? `${event.title} | Bitzsznn Events` : "Event | Bitzsznn",
    description: event?.summary,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }
  const displayDate = event.date.replace(",", "").split(" ").slice(0, 3).join(" ");
  const heroTitle = "heroTitle" in event && typeof event.heroTitle === "string" ? event.heroTitle : event.title;
  const overlayImage = "imageOverlay" in event && typeof event.imageOverlay === "string" ? event.imageOverlay : null;
  const ticketActive = isTicketedEvent(event.slug);
  const rsvpActive = isRsvpEvent(event.slug);

  return (
    <main className="bg-[#f7f5f2] text-[#183814]">
      <section className="relative overflow-hidden bg-[#0f1c07] pt-28 text-white md:pt-36">
        <Image alt="" className="object-cover opacity-55" fill priority sizes="100vw" src={event.image} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,8,0.92),rgba(8,11,8,0.52),rgba(8,11,8,0.86))]" />
        <div className="container-shell figma-inner relative z-10 grid min-h-[680px] gap-10 py-16 md:py-20 lg:grid-cols-[0.92fr_1fr] lg:items-center">
          <div className="max-w-3xl text-left">
            <p className="w-fit rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              {event.eyebrow}
            </p>
            <h1 className="hero-title mt-6 max-w-[620px]">{heroTitle}</h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/82 md:text-base md:leading-8">{event.summary}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {ticketActive ? (
                <Button className="rounded-[14px] px-6 text-[15px]" href="#tickets">
                  Buy ticket
                </Button>
              ) : null}
              {rsvpActive ? (
                <Button className="rounded-[14px] px-6 text-[15px]" href="#rsvp">
                  Reserve your spot
                </Button>
              ) : null}
              <Button className="rounded-[14px] border-white/28 !bg-[#071007] px-6 text-[15px] !text-white shadow-none hover:!bg-[#111611]" href="#event-details" variant="secondary">
                See details
              </Button>
              {!ticketActive && !rsvpActive ? (
                <Button className="rounded-[14px] border-white/28 !bg-white px-6 text-[15px] !text-[#071007] shadow-none hover:!bg-[#e9f5df]" href={`/gallery?event=${event.slug}`} variant="secondary">
                  View event archive
                </Button>
              ) : null}
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-[16px] border border-white/12 bg-white/[0.08] p-4 backdrop-blur">
                <PremiumIcon icon={CalendarDays} size="sm" tone="dark" />
                <p className="mt-3 text-sm font-semibold">{displayDate}</p>
              </div>
              <div className="rounded-[16px] border border-white/12 bg-white/[0.08] p-4 backdrop-blur">
                <PremiumIcon icon={Clock} size="sm" tone="dark" />
                <p className="mt-3 text-sm font-semibold">{event.time}</p>
              </div>
              <div className="rounded-[16px] border border-white/12 bg-white/[0.08] p-4 backdrop-blur">
                <PremiumIcon icon={MapPin} size="sm" tone="dark" />
                <p className="mt-3 text-sm font-semibold">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto min-h-[500px] w-full max-w-[560px] overflow-hidden rounded-[18px] border border-white/14 bg-[#071007] shadow-[0_28px_90px_rgba(0,0,0,0.36)] md:min-h-[620px]">
            <Image alt={event.title} className="object-contain p-2" fill priority sizes="(min-width: 1024px) 42vw, 100vw" src={event.image} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,7,0),rgba(7,16,7,0.36))]" />
            {overlayImage ? (
              <div className="absolute bottom-4 left-4 w-[48%] max-w-[260px] -rotate-2 overflow-hidden rounded-[14px] border border-white/28 bg-[#071007] shadow-[0_18px_48px_rgba(0,0,0,0.42)]">
                <Image
                  alt={`${event.title} anticipation flyer`}
                  className="h-auto w-full object-cover"
                  height={360}
                  sizes="(min-width: 1024px) 18vw, 44vw"
                  src={overlayImage}
                  width={640}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div id="event-details">
        <EventRoomStack eyebrow="Event details" items={event.highlights} />
      </div>

      {!ticketActive && !rsvpActive ? (
        <section className="section-grid-lines bg-[#f7f5f2] pb-16 text-[#183814] md:pb-20">
          <div className="container-shell figma-inner">
            <div className="rounded-[22px] border border-[#d8e4d2] bg-white p-6 shadow-[0_18px_50px_rgba(24,56,20,0.06)] md:flex md:items-center md:justify-between md:gap-8 md:p-8">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#459c0a]">Event archive</p>
                <h2 className="mt-3 text-2xl font-semibold text-[#082005] md:text-3xl">See the full photo wall.</h2>
              </div>
              <Button className="mt-6 md:mt-0" href={`/gallery?event=${event.slug}`} showIcon>
                View event archive
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {ticketActive ? <TicketFlow embedded eventSlug={event.slug} /> : null}
      {rsvpActive ? <RsvpFlow eventSlug={event.slug} eventTitle={event.title} /> : null}
    </main>
  );
}
