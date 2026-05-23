"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/button";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { events } from "@/data/site";

function shortDate(date: string) {
  return date.replace(",", "").split(" ").slice(0, 3).join(" ");
}

export function HomeEventsCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const displayEvents = events;

  function move(direction: number) {
    railRef.current?.scrollBy({ left: direction * 390, behavior: "smooth" });
  }

  return (
    <div className="relative mt-12">
      <button aria-label="Previous event" className="absolute left-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 lg:grid" onClick={() => move(-1)} type="button">
        <ArrowLeft className="size-5" />
      </button>
      <button aria-label="Next event" className="absolute right-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 lg:grid" onClick={() => move(1)} type="button">
        <ArrowRight className="size-5" />
      </button>
      <div className="group no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-10 pt-2 sm:-mx-6 sm:px-6 lg:gap-6" ref={railRef}>
        {displayEvents.map((event, index) => (
          <article
            className="w-[min(88vw,380px)] shrink-0 snap-center overflow-hidden rounded-[16px] bg-[#f7f8f2] text-[#10240c] shadow-[0_12px_36px_rgba(0,0,0,0.16)] transition-[transform,box-shadow,border-color] duration-300 hover:z-10 hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_30px_80px_rgba(0,0,0,0.34)] focus-within:ring-4 focus-within:ring-[#b8ff2c]/45 sm:w-[min(82vw,380px)]"
            key={`${event.slug}-${index}`}
          >
            <div className="min-h-[132px] bg-[#f7f8f2] p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 text-center leading-none text-[#193214]">
                  <p className="font-mono text-[12px] uppercase">{shortDate(event.date).split(" ")[0]}</p>
                  <p className="mt-1 text-[20px] font-semibold">{shortDate(event.date).split(" ")[1]}</p>
                </div>
                <div className="h-10 w-px bg-[#9fa59d]" />
                <h3 className="text-[20px] font-semibold text-[#10240c]">{event.title}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-[1.45] text-[#354a30]">{event.summary}</p>
            </div>
            <div className="relative h-[260px] md:h-[290px]">
              <Image alt="" className="object-cover" fill sizes="446px" src={event.image} />
              <span className="absolute right-5 top-4 rounded-full border border-white bg-[#d7f8b8] px-3 py-1 text-[11px] font-semibold text-[#091309]">
                {event.eyebrow}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.76))] p-5">
                <div className="flex gap-2">
                <Button className="min-h-0 flex-1 rounded-[16px] bg-[#459c0a] px-3 py-3 text-[13px] text-[#061006] shadow-none hover:bg-[#5dc716] md:rounded-[18px] md:px-4 md:text-[14px]" href={`/events/${event.slug}`}>
                  View event
                </Button>
                <Button className="min-h-0 flex-1 rounded-[16px] bg-[#fbfff4] px-3 py-3 text-[13px] text-[#0b1709] shadow-none hover:bg-white md:rounded-[18px] md:px-4 md:text-[14px]" href={`/events/${event.slug}#tickets`} variant="secondary">
                  Tickets
                </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function HomeTestimonialsCarousel() {
  return <TestimonialSlider />;
}
