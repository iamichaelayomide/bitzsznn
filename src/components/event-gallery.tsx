"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { galleryMoments } from "@/data/site";

export function EventsGallerySection() {
  const railRef = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    railRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  }

  return (
    <section className="section-grid-lines overflow-hidden bg-white py-16 text-[#10240c] md:py-20">
      <div className="container-shell figma-inner">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="text-[40px] font-medium leading-none text-[#082005] md:text-[44px]">
              Events gallery
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#30472d]">
              Swipe through the people, rooms, and recap moments that make Bitzsznn feel bigger than one night.
            </p>
          </div>
          <Link
            className="inline-flex w-fit items-center justify-center rounded-[18px] bg-[#459c0a] px-6 py-4 font-semibold text-[#061006] transition hover:-translate-y-0.5 hover:bg-[#5dc716]"
            href="/gallery"
          >
            Open infinite gallery <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>

      <div className="relative mt-10">
        <button
          aria-label="Previous gallery item"
          className="absolute left-[max(16px,calc((100%-1320px)/2+24px))] top-[38%] z-20 grid size-14 place-items-center rounded-l-full bg-[#ebe7e2] text-[#10240c] shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition hover:-translate-x-1"
          onClick={() => scroll(-1)}
          type="button"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          aria-label="Next gallery item"
          className="absolute right-[max(16px,calc((100%-1320px)/2+24px))] top-[38%] z-20 grid size-14 place-items-center rounded-r-full bg-[#ebe7e2] text-[#10240c] shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition hover:translate-x-1"
          onClick={() => scroll(1)}
          type="button"
        >
          <ArrowRight className="size-5" />
        </button>

        <div
          className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-[max(16px,calc((100%-1320px)/2+16px))] pb-10 pt-2"
          ref={railRef}
        >
          {galleryMoments.map((item, index) => {
            const featured = index === 2;
            return (
              <article
                className={`shrink-0 snap-center transition duration-300 hover:-translate-y-2 ${
                  featured ? "w-[min(78vw,352px)]" : "w-[min(70vw,287px)]"
                }`}
                key={`${item.name}-${index}`}
              >
                <div
                  className={`relative overflow-hidden bg-[#d8f7d8] shadow-[0_18px_55px_rgba(24,56,20,0.12)] ${
                    featured ? "h-[468px]" : "h-[382px]"
                  }`}
                >
                  <Image
                    alt={item.caption}
                    className="object-cover"
                    fill
                    sizes={featured ? "352px" : "287px"}
                    src={item.image}
                  />
                </div>
                <div className={`mt-5 ${featured ? "text-[25px] leading-[1.2]" : "text-[20px] leading-[1.2]"}`}>
                  <h3 className="font-semibold text-[#183814]">{item.name}</h3>
                  <p className="mt-2 font-medium text-[#434d42]">{item.role}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

