import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Images } from "lucide-react";
import { galleryMoments } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery | Bitzsznn",
  description: "Explore Bitzsznn event memories in a canvas-style gallery.",
};

const canvasPositions = [
  "left-[80px] top-[120px] w-[310px] rotate-[-5deg]",
  "left-[470px] top-[80px] w-[250px] rotate-[3deg]",
  "left-[790px] top-[160px] w-[360px] rotate-[-2deg]",
  "left-[1190px] top-[90px] w-[280px] rotate-[6deg]",
  "left-[250px] top-[560px] w-[390px] rotate-[2deg]",
  "left-[760px] top-[610px] w-[280px] rotate-[-7deg]",
  "left-[1110px] top-[520px] w-[360px] rotate-[4deg]",
  "left-[1510px] top-[300px] w-[300px] rotate-[-3deg]",
];

export default function GalleryPage() {
  const canvasItems = [...galleryMoments, ...galleryMoments.slice(0, 2)];

  return (
    <main className="min-h-screen bg-[#080b08] pt-28 text-[#fbfff4] md:pt-36">
      <section className="container-shell figma-inner">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="inline-flex rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Infinite gallery
            </p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.75rem,4vw,2.875rem)] font-medium leading-[1]">
              A canvas of moments before they move on.
            </h1>
          </div>
          <Link
            className="inline-flex w-fit items-center gap-2 rounded-[18px] border border-white/14 bg-white/8 px-5 py-4 font-semibold text-[#fbfff4] transition hover:-translate-y-0.5 hover:border-[#459c0a]"
            href="/events"
          >
            <ArrowLeft className="size-4" /> Back to events
          </Link>
        </div>
      </section>

      <section className="mt-10 border-y border-white/10 bg-[#0f1c07]">
        <div className="h-[calc(100vh-220px)] min-h-[620px] overflow-auto">
          <div className="relative h-[1120px] w-[1920px] bg-[radial-gradient(circle_at_34%_28%,rgba(69,156,10,0.18),transparent_28rem),radial-gradient(circle_at_76%_58%,rgba(216,247,216,0.08),transparent_30rem),#0f1c07]">
            <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#081108]/80 px-4 py-3 text-sm text-[#dce8d8] backdrop-blur">
              <Images className="size-4 text-[#b8ff2c]" />
              Scroll the canvas to explore the full Bitzsznn archive.
            </div>

            {canvasItems.map((item, index) => (
              <article
                className={`group absolute ${canvasPositions[index]} transition duration-300 hover:z-20 hover:rotate-0 hover:scale-[1.03]`}
                key={`${item.caption}-${index}`}
              >
                <div className="relative aspect-[0.78] overflow-hidden rounded-[18px] border border-white/12 bg-[#10240c] shadow-[0_28px_80px_rgba(0,0,0,0.36)]">
                  <Image
                    alt={item.caption}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="390px"
                    src={item.image}
                  />
                </div>
                <div className="mt-3 rounded-[16px] border border-white/10 bg-[#081108]/82 p-4 backdrop-blur">
                  <h2 className="text-lg font-semibold text-[#fbfff4]">{item.caption}</h2>
                  <p className="mt-1 text-sm text-[#cfe4c8]">{item.name} - {item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
