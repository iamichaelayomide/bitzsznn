import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/button";
import { MotionSection } from "@/components/motion-section";
import { events, eventHighlights, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Events | Bitzsznn",
  description: "See upcoming Bitzsznn events and choose the experience you want to attend.",
};

export default function EventsPage() {
  const upcoming = events.filter((event) => event.eyebrow === "Upcoming");

  return (
    <main className="bg-[#080b08]">
      <section className="section-grid-lines relative overflow-hidden bg-[#0f1c07] pt-28 text-white md:pt-36">
        <Image alt="" className="object-cover opacity-45" fill priority sizes="100vw" src="/images/events-hero.png" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.72),rgba(8,11,8,0.94))]" />
        <div className="container-shell figma-inner relative z-10 flex min-h-[680px] flex-col items-center justify-center py-16 text-center">
          <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
            Events
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.85rem,6.4vw,6.8rem)] font-medium leading-[0.96]">
            More than a party, an experience.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">
            See what is coming up, choose the room that fits your season, and reserve access from the event page.
          </p>
          <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div className="rounded-[18px] border border-white/12 bg-white/[0.07] p-4 backdrop-blur" key={stat.label}>
                <p className="text-2xl font-semibold text-white md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid-lines bg-[#0f1c07] py-16 text-white md:py-24">
        <div className="container-shell figma-inner">
          <MotionSection>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  Upcoming events
                </p>
                <h2 className="mt-5 text-5xl font-medium leading-none md:text-7xl">Pick your next room.</h2>
              </div>
              <p className="max-w-[430px] text-lg leading-7 text-white/72">
                Each event has its own details, ticket tiers, and confirmation flow.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((event) => (
                <Link
                  className="group flex h-full min-h-[610px] flex-col overflow-hidden rounded-[18px] bg-[#f7f8f2] text-[#10240c] shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_30px_90px_rgba(0,0,0,0.34)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#b8ff2c]"
                  href={`/events/${event.slug}`}
                  key={event.slug}
                >
                  <div className="relative h-[300px] shrink-0">
                    <Image alt="" className="object-cover transition duration-500 group-hover:scale-105" fill sizes="420px" src={event.image} />
                    <span className="absolute right-5 top-5 rounded-full border border-white bg-[#c8f6aa] px-3 py-1 text-xs text-[#090e09]">
                      {event.eyebrow}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-3 text-sm font-medium text-[#39533a]">
                      <span className="inline-flex items-center gap-2"><CalendarDays className="size-4" /> {event.date}</span>
                      <span className="inline-flex items-center gap-2"><MapPin className="size-4" /> {event.location}</span>
                    </div>
                    <h3 className="mt-5 text-3xl font-semibold leading-none text-[#10240c]">{event.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#30472d]">{event.summary}</p>
                    <div className="mt-auto inline-flex w-fit rounded-[18px] bg-[#459c0a] px-5 py-3 font-semibold text-[#061006]">
                      View event
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-grid-lines bg-white py-16 text-[#183814] md:py-24">
        <div className="container-shell figma-inner">
          <MotionSection>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
              <div>
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  What to expect
                </p>
                <h2 className="mt-4 text-4xl font-medium leading-tight md:text-6xl">Vibes. Networking. Opportunity.</h2>
              </div>
              <div className="grid gap-3">
                {eventHighlights.map((highlight, index) => (
                  <div className="flex items-center gap-4 rounded-[20px] border border-[#d8e4d2] bg-[#f8fbf4] p-5 transition hover:-translate-y-1 hover:border-[#459c0a]/50" key={highlight}>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#459c0a] text-sm font-bold text-white">{index + 1}</span>
                    <p className="text-sm font-semibold md:text-base">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-14 rounded-[28px] border border-[#d8e4d2] bg-[#d8f7d8] p-6 md:p-8">
              <h3 className="text-3xl font-medium md:text-5xl">Want the full list?</h3>
              <p className="mt-3 max-w-2xl text-[#183814]/72">Browse every active event, choose the one that fits your crew, then reserve tickets from the event page.</p>
              <Button className="mt-6" href="/events/batch-a2-pop-party" showIcon>
                See latest event
              </Button>
            </div>
          </MotionSection>
        </div>
      </section>
    </main>
  );
}
