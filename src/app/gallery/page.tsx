import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/button";
import { GalleryFeed } from "@/components/gallery-feed";
import { events, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery | Bitzsznn",
  description:
    "Explore Bitzsznn event photos, people, rooms, and recap moments from the culture community.",
};

type GalleryPageProps = {
  searchParams?: Promise<{ event?: string }>;
};

const eventGalleryImages = [
  "/images/event-good-vibes.png",
  "/images/community-party-2.png",
  "/images/community-good-vibes.png",
  "/images/community-party-1.png",
  "/images/values-good-vibes.png",
  "/images/about-hero.png",
  "/images/hero-crowd.png",
  "/images/events-hero.png",
];

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const selectedEvent = events.find((event) => event.slug === params?.event);
  const sourceEvents = selectedEvent ? [selectedEvent] : events;
  const photoPool = sourceEvents.flatMap((event, eventIndex) =>
    eventGalleryImages.map((_, imageIndex) => ({
      name: event.title,
      role: `${event.date.split(", ")[1] ?? "2026"} / ${event.location}`,
      image: eventGalleryImages[(imageIndex + eventIndex) % eventGalleryImages.length],
      caption: imageIndex === 0 ? event.summary : `${event.title} recap moment ${imageIndex + 1}`,
    })),
  );

  return (
    <main className="overflow-hidden bg-[#fbfff4] text-[#10240c]">
      <section className="relative overflow-hidden border-b border-[#dce8d8] pb-16 pt-36 md:pb-20 md:pt-44">
        <Image
          alt=""
          className="object-cover opacity-20"
          fill
          priority
          sizes="100vw"
          src="/images/hero-crowd.png"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,255,244,0.7),rgba(251,255,244,0.98))]" />
        <div className="container-shell figma-inner relative z-10">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-[#cddbc8] bg-white/80 px-4 py-2 text-sm font-semibold text-[#183814] transition hover:-translate-y-0.5 hover:border-[#459c0a]"
            href="/events"
          >
            <ArrowLeft className="size-4" />
            Back to events
          </Link>
          <div className="mx-auto mt-12 max-w-[760px] text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#459c0a]">{selectedEvent ? selectedEvent.title : "Bitzsznn archive"}</p>
            <h1 className="mt-4 text-[34px] font-semibold leading-[1.02] text-[#082005] md:text-[54px]">
              {selectedEvent ? "A closer look at the room." : "People, rooms, and moments worth keeping."}
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-7 text-[#30472d] md:text-[18px]">
              A clean wall of photos from the experiences, faces, and little in-between moments that make Bitzsznn feel like more than one night.
            </p>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8">
        <div className="container-shell figma-inner">
          <GalleryFeed photos={photoPool} />
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
              <Button className="!bg-white !text-[#082005] shadow-none hover:!bg-[#f5f7ef]" href={selectedEvent ? `/events/${selectedEvent.slug}#tickets` : socialLinks.whatsapp} variant="secondary">
                {selectedEvent ? "Buy ticket" : "Join community"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
