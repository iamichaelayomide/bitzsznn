import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Images, MapPin } from "lucide-react";
import { Button } from "@/components/button";
import { GalleryFeed } from "@/components/gallery-feed";
import { events, isTicketedEvent, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery | Bitzsznn",
  description:
    "Explore Bitzsznn event photos, people, rooms, and recap moments from the culture community.",
};

type GalleryPageProps = {
  searchParams?: Promise<{ event?: string }>;
};

function eventPhotos(event: (typeof events)[number]) {
  const gallery = "gallery" in event && Array.isArray(event.gallery) ? event.gallery : [event.image];
  return Array.from(new Set(gallery));
}

function formatDate(date: string) {
  return date.replace(",", "").split(" ").slice(0, 3).join(" ");
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const selectedEvent = events.find((event) => event.slug === params?.event);
  const photoPool = selectedEvent
    ? eventPhotos(selectedEvent).map((image, imageIndex) => ({
      caption: imageIndex === 0 ? selectedEvent.summary : `${selectedEvent.title} recap moment ${imageIndex + 1}`,
      image,
      name: selectedEvent.title,
      role: `${selectedEvent.date.split(", ")[1] ?? selectedEvent.date} / ${selectedEvent.location}`,
    }))
    : [];
  const eventGroups = events.map((event) => ({
    ...event,
    photoCount: eventPhotos(event).length,
  }));
  const selectedTicketActive = selectedEvent ? isTicketedEvent(selectedEvent.slug) : false;

  return (
    <main className="overflow-hidden bg-[#fbfff4] text-[#10240c]">
      <section className="relative overflow-hidden border-b border-[#dce8d8] pb-16 pt-36 md:pb-20 md:pt-44">
        <Image
          alt=""
          className="object-cover opacity-20"
          fill
          priority
          sizes="100vw"
          src="/images/events/owambe-cover.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,255,244,0.7),rgba(251,255,244,0.98))]" />
        <div className="container-shell figma-inner relative z-10">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-[#cddbc8] bg-white/80 px-4 py-2 text-sm font-semibold text-[#183814] transition hover:-translate-y-0.5 hover:border-[#459c0a]"
            href="/events"
          >
            <ArrowLeft className="size-4" strokeWidth={1.8} />
            Back to events
          </Link>
          <div className="mx-auto mt-12 max-w-[760px] text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#459c0a]">{selectedEvent ? selectedEvent.title : "Bitzsznn archive"}</p>
            <h1 className="mt-4 text-[34px] font-semibold leading-[1.02] text-[#082005] md:text-[54px]">
              {selectedEvent ? "Event photo wall." : "Browse by event."}
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-7 text-[#30472d] md:text-[18px]">
              {selectedEvent
                ? "Photos, recap moments, and the little in-between memories from this Bitzsznn experience."
                : "Choose an event first, then open the photos and recap moments from that specific room."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8">
        <div className="container-shell figma-inner">
          {selectedEvent ? (
            <GalleryFeed photos={photoPool} />
          ) : (
            <div className="grid gap-5 py-6 md:grid-cols-2 xl:grid-cols-3">
              {eventGroups.map((event) => {
                const ticketActive = isTicketedEvent(event.slug);
                return (
                  <article
                    className="group overflow-hidden rounded-[20px] border border-[#d8e4d2] bg-white shadow-[0_18px_60px_rgba(24,56,20,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(24,56,20,0.14)]"
                    key={event.slug}
                  >
                    <Link className="block focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#b8ff2c]" href={`/gallery?event=${event.slug}`}>
                      <div className="relative aspect-square overflow-hidden bg-[#071007]">
                        <Image alt={event.title} className="object-contain transition duration-500 group-hover:scale-[1.04]" fill sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw" src={event.image} />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.54))]" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#2f7a13]">
                          {event.category}
                        </span>
                        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#183814]">
                          <Images className="size-4" strokeWidth={1.8} />
                          {event.photoCount} photos
                        </span>
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-3 text-sm font-medium text-[#40563d]">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="size-4" strokeWidth={1.8} />
                          {formatDate(event.date)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="size-4" strokeWidth={1.8} />
                          {event.location}
                        </span>
                      </div>
                      <h2 className="mt-4 text-[22px] font-semibold leading-tight text-[#082005]">{event.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-[#40563d]">{event.summary}</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <Link className="inline-flex min-h-11 items-center justify-center rounded-[14px] border border-[#d8e4d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#071007] transition hover:-translate-y-0.5 hover:bg-[#eef7e9]" href={`/gallery?event=${event.slug}`}>
                          See pictures
                        </Link>
                        {ticketActive ? (
                          <Link className="inline-flex min-h-11 items-center justify-center rounded-[14px] bg-[#459c0a] px-4 py-2.5 text-sm font-semibold text-[#061006] transition hover:-translate-y-0.5 hover:bg-[#5dc716]" href={`/events/${event.slug}#tickets`}>
                            Buy ticket
                          </Link>
                        ) : (
                          <Link className="inline-flex min-h-11 items-center justify-center rounded-[14px] border border-[#d8e4d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#071007] transition hover:-translate-y-0.5 hover:bg-[#eef7e9]" href={`/events/${event.slug}`}>
                            See details
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell figma-inner">
          <div className="overflow-hidden rounded-[24px] bg-[#0f1c07] p-8 text-center text-white md:p-12">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#b8ff2c]">Want your moment here?</p>
            <h2 className="mx-auto mt-4 max-w-[640px] text-[28px] font-semibold leading-tight md:text-[40px]">
              Join the next room and leave with photos, people, and a story.
            </h2>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" href="/events">View events</Button>
              <Button className="!bg-white !text-[#082005] shadow-none hover:!bg-[#f5f7ef]" href={selectedEvent ? (selectedTicketActive ? `/events/${selectedEvent.slug}#tickets` : `/events/${selectedEvent.slug}`) : socialLinks.whatsapp} variant="secondary">
                {selectedEvent ? (selectedTicketActive ? "Buy ticket" : "See details") : "Join community"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
