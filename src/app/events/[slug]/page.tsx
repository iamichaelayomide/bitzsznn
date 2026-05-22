import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { TicketFlow } from "@/components/ticket-flow";
import { events } from "@/data/site";

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

  return (
    <main className="bg-[#f7f5f2] text-[#183814]">
      <section className="relative min-h-[660px] overflow-hidden bg-[#0f1c07] pt-28 text-white md:min-h-[760px] md:pt-36">
        <Image alt="" className="object-cover opacity-55" fill priority sizes="100vw" src={event.image} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,8,0.92),rgba(8,11,8,0.52),rgba(8,11,8,0.86))]" />
        <div className="container-shell figma-inner relative z-10 py-16 md:py-24">
          <Link className="text-sm text-white/72 transition hover:text-white" href="/events">
            ← Back to all events
          </Link>
          <div className="mt-10 max-w-5xl md:mt-16">
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              {event.eyebrow}
            </p>
            <h1 className="hero-title mt-6">{event.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{event.description}</p>
            <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
              <div className="rounded-[18px] border border-white/12 bg-white/[0.08] p-4 backdrop-blur">
                <CalendarDays className="size-5 text-[#b8ff2c]" />
                <p className="mt-3 font-semibold">{displayDate}</p>
              </div>
              <div className="rounded-[18px] border border-white/12 bg-white/[0.08] p-4 backdrop-blur">
                <Clock className="size-5 text-[#b8ff2c]" />
                <p className="mt-3 font-semibold">{event.time}</p>
              </div>
              <div className="rounded-[18px] border border-white/12 bg-white/[0.08] p-4 backdrop-blur">
                <MapPin className="size-5 text-[#b8ff2c]" />
                <p className="mt-3 font-semibold">{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid-lines bg-white py-16 md:py-20">
        <div className="container-shell figma-inner">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                Event details
              </p>
              <h2 className="section-title mt-4">What is inside the room?</h2>
            </div>
            <div className="grid gap-3">
              {event.highlights.map((highlight, index) => (
                <div className="rounded-[20px] border border-[#d8e4d2] bg-[#f8fbf4] p-5" key={highlight}>
                  <p className="text-sm font-bold text-[#459c0a]">0{index + 1}</p>
                  <p className="mt-2 text-xl font-semibold">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TicketFlow embedded eventSlug={event.slug} />
    </main>
  );
}
