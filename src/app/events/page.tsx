import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { EventsGallerySection } from "@/components/event-gallery";
import { EventRoomStack } from "@/components/event-room-stack";
import { MotionSection } from "@/components/motion-section";
import { cultureEventPhotos, events, eventHighlights, isRsvpEvent, isTicketedEvent, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Events | Bitzsznn",
  description: "See upcoming Bitzsznn events and choose the experience you want to attend.",
};

export default function EventsPage() {
  const upcoming = events;
  const orbitCards = [
    "left-[9%] top-[46%] -rotate-[4deg]",
    "left-[16%] top-[65%] rotate-[2deg]",
    "left-[37%] top-[50%] -rotate-[4deg]",
    "right-[22%] top-[38%] rotate-[7deg]",
    "right-[20%] top-[64%] -rotate-[4deg]",
  ];
  const eventProof = [
    { value: "30+", label: "Events organized", className: "left-[5%] top-[68%]" },
    { value: "10+", label: "Cities reached", className: "left-[35%] top-[43%]" },
    { value: "500+", label: "Community member", className: "right-[36%] top-[57%]" },
    { value: "30+", label: "Brand collaborations", className: "left-[38%] top-[76%]" },
    { value: "100%", label: "Event sellouts", className: "right-[9%] top-[61%]" },
  ];
  const formatDate = (date: string) => date.replace(",", "").split(" ").slice(0, 3).join(" ");

  return (
    <main className="bg-[#080b08]">
      <section className="section-grid-lines relative overflow-hidden bg-[#0f1c07] pt-28 text-white lg:hidden">
        <Image alt="" className="object-cover opacity-45" fill priority sizes="100vw" src={cultureEventPhotos[0]} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.72),rgba(8,11,8,0.94))]" />
        <div className="container-shell figma-inner relative z-10 flex min-h-[680px] flex-col items-center justify-center py-16 text-center">
          <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
            Events
          </p>
          <h1 className="hero-title mt-6 max-w-5xl">
            Upcoming
            <br />
            events.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">
            POP parties, link-ups, creator rooms, and recap-worthy nights for young people finding their next circle.
          </p>
          <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div className="rounded-[18px] border border-white/12 bg-white/[0.07] p-4 backdrop-blur" key={stat.label}>
                <p className="text-xl font-semibold text-white md:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid-lines relative hidden min-h-[1025px] overflow-hidden bg-[#231a1a] pt-28 text-white lg:block">
        <Image
          alt="Bitzsznn crowd energy"
          className="object-cover opacity-40"
          fill
          priority
          sizes="100vw"
          src={cultureEventPhotos[1]}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(69,156,10,0.24),rgba(8,11,8,0.66)_44%,rgba(8,11,8,0.9)_100%)]" />
        <div className="absolute left-1/2 top-[44%] h-[420px] w-[900px] -translate-x-1/2 rounded-[50%] border border-dashed border-white/35 opacity-70" />
        <div className="absolute left-[26%] top-[57%] h-[290px] w-[420px] -rotate-[9deg] rounded-[50%] border border-dashed border-white/28 opacity-70" />
        <div className="absolute right-[12%] top-[53%] h-[300px] w-[420px] rotate-[13deg] rounded-[50%] border border-dashed border-white/28 opacity-70" />

        <div className="container-shell figma-inner relative z-10 min-h-[897px]">
          <div className="mx-auto mt-[72px] flex w-[560px] max-w-full flex-col items-center gap-6 text-center">
            <div>
              <h1 className="hero-title text-white">
                Upcoming
                <br />
                events.
              </h1>
              <p className="mt-4 text-[18px] leading-normal text-white/86">
                POP parties, link-ups, and creator rooms
                <br />
                built for people finding their next circle.
              </p>
            </div>
            <a
              className="inline-flex min-h-[50px] items-center justify-center rounded-[14px] bg-[#459c0a] px-6 py-3 text-[15px] font-semibold text-[#090e09] shadow-[0_16px_38px_rgba(69,156,10,0.28)] transition duration-200 hover:-translate-y-1 hover:bg-[#5dc716] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#b8ff2c]"
              href="#upcoming-events"
            >
              View all events
            </a>
          </div>

          {orbitCards.map((className, index) => (
            <div
              className={`absolute h-[213px] w-[185px] overflow-hidden rounded-[7px] bg-[#10240c] shadow-[0_24px_60px_rgba(0,0,0,0.34)] ring-1 ring-white/18 transition duration-300 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] ${className}`}
              key={className}
            >
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="185px"
                src={events[index % events.length].image}
              />
            </div>
          ))}

          {eventProof.map((item) => (
            <div
              className={`absolute z-20 inline-flex items-center gap-1 rounded-full border border-white bg-[#1d1d1d] px-3 py-2 text-[#e7e3e3] shadow-[0_12px_32px_rgba(0,0,0,0.28)] ${item.className}`}
              key={item.label}
            >
              <span className="text-[15px] font-medium leading-none">{item.value}</span>
              <span className="text-[11px] leading-none">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-grid-lines bg-[#0f1c07] py-16 text-white md:py-24" id="upcoming-events">
        <div className="container-shell figma-inner">
          <MotionSection>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  Upcoming events
                </p>
                <h2 className="section-title mt-5">Next events.</h2>
              </div>
              <p className="max-w-[430px] text-lg leading-7 text-white/72">
                Pick the next room, check the details, and reserve your access before the list closes.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((event) => {
                const ticketActive = isTicketedEvent(event.slug);
                const rsvpActive = isRsvpEvent(event.slug);

                return (
                  <article
                    className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-[18px] bg-[#f7f8f2] text-[#10240c] shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_30px_90px_rgba(0,0,0,0.34)] md:min-h-[610px]"
                    key={event.slug}
                  >
                  <div className="relative h-[300px] shrink-0 bg-[#071007]">
                    <Image alt="" className="object-contain transition duration-500 group-hover:scale-105" fill sizes="420px" src={event.image} />
                    <span className="absolute right-5 top-5 rounded-full border border-white bg-[#c8f6aa] px-3 py-1 text-xs text-[#090e09]">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-3 text-sm font-medium text-[#39533a]">
                      <span className="inline-flex items-center gap-2"><CalendarDays className="size-4" strokeWidth={1.8} /> {formatDate(event.date)}</span>
                      <span className="inline-flex items-center gap-2"><MapPin className="size-4" strokeWidth={1.8} /> {event.location}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold leading-tight text-[#10240c]">{event.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#30472d]">{event.summary}</p>
                    <div className="mt-auto grid gap-3 sm:grid-cols-2">
                      <Link className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-[#d8e4d2] bg-white px-4 py-3 text-sm font-semibold text-[#071007] transition hover:-translate-y-0.5 hover:bg-[#eef7e9]" href={`/events/${event.slug}`}>
                        See details
                      </Link>
                      {ticketActive ? (
                        <Link className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[#459c0a] px-4 py-3 text-sm font-semibold text-[#061006] transition hover:-translate-y-0.5 hover:bg-[#5dc716]" href={`/events/${event.slug}#tickets`}>
                          Buy ticket
                        </Link>
                      ) : rsvpActive ? (
                        <Link className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[#459c0a] px-4 py-3 text-sm font-semibold text-[#061006] transition hover:-translate-y-0.5 hover:bg-[#5dc716]" href={`/events/${event.slug}#rsvp`}>
                          RSVP now
                        </Link>
                      ) : (
                        <span className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-[#d8e4d2] bg-[#eef2e9] px-4 py-3 text-sm font-semibold text-[#40563d]/70">
                          Tickets inactive
                        </span>
                      )}
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </MotionSection>
        </div>
      </section>

      <EventsGallerySection />

      <EventRoomStack items={eventHighlights} />
    </main>
  );
}
