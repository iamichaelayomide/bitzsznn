import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/button";
import { galleryMoments, events, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery | Bitzsznn",
  description:
    "Explore Bitzsznn event photos, people, rooms, and recap moments from the culture community.",
};

const photoPool = [
  ...galleryMoments,
  ...events.map((event) => ({
    name: event.title,
    role: event.location,
    image: event.image,
    caption: event.summary,
  })),
  ...galleryMoments.map((moment) => ({
    ...moment,
    name: `${moment.name} recap`,
  })),
];

export default function GalleryPage() {
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
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#459c0a]">Bitzsznn archive</p>
            <h1 className="mt-4 text-[34px] font-semibold leading-[1.02] text-[#082005] md:text-[54px]">
              People, rooms, and moments worth keeping.
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-7 text-[#30472d] md:text-[18px]">
              A clean wall of photos from the experiences, faces, and little in-between moments that make Bitzsznn feel like more than one night.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell figma-inner">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photoPool.map((photo, index) => (
              <article
                className="group overflow-hidden rounded-[18px] border border-[#dce8d8] bg-white shadow-[0_16px_44px_rgba(24,56,20,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(24,56,20,0.16)]"
                key={`${photo.name}-${index}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#d8f7d8]">
                  <Image
                    alt={photo.caption}
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
                    src={photo.image}
                  />
                </div>
                <div className="min-h-[124px] p-5">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#459c0a]">{photo.role}</p>
                  <h2 className="mt-2 text-[18px] font-semibold leading-tight text-[#082005]">{photo.name}</h2>
                  <p className="mt-2 text-[14px] leading-6 text-[#40563d]">{photo.caption}</p>
                </div>
              </article>
            ))}
          </div>
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
              <Button href="/events">View events</Button>
              <Button className="bg-white text-[#082005] shadow-none hover:bg-[#f5f7ef]" href={socialLinks.whatsapp} variant="secondary">
                Join community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
