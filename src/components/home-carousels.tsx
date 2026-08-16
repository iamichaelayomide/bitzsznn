"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/button";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { events, isTicketedEvent } from "@/data/site";

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
    <div className="relative mt-10">
      <button aria-label="Previous event" className="absolute left-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-[#459c0a] text-[#041102] shadow-[0_16px_36px_rgba(69,156,10,0.24)] transition hover:scale-105 lg:grid" onClick={() => move(-1)} type="button">
        <ArrowLeft className="size-5" strokeWidth={1.8} />
      </button>
      <button aria-label="Next event" className="absolute right-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-[#459c0a] text-[#041102] shadow-[0_16px_36px_rgba(69,156,10,0.24)] transition hover:scale-105 lg:grid" onClick={() => move(1)} type="button">
        <ArrowRight className="size-5" strokeWidth={1.8} />
      </button>
      <div className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-10 pt-2 sm:-mx-6 sm:px-6 lg:gap-6" ref={railRef}>
        {displayEvents.map((event, index) => (
          (() => {
            const ticketActive = isTicketedEvent(event.slug);
            const actionHref = ticketActive ? `/events/${event.slug}#tickets` : `/events/${event.slug}`;
            const actionLabel = ticketActive ? "Buy ticket" : "See details";
            return (
          <article
            className="group w-[min(88vw,360px)] shrink-0 snap-center overflow-hidden rounded-[16px] border border-white/10 bg-white text-[#10240c] shadow-[0_12px_34px_rgba(0,0,0,0.14)] transition-[transform,box-shadow,border-color] duration-300 hover:z-10 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)] focus-within:ring-4 focus-within:ring-[#b8ff2c]/45 sm:w-[min(82vw,360px)]"
            key={`${event.slug}-${index}`}
          >
            <div className="min-h-[128px] bg-[#f7f8f2] p-5">
              <div className="flex items-center gap-3">
                <div className="w-8 text-center leading-none text-[#193214]">
                  <p className="font-mono text-[12px] uppercase">{shortDate(event.date).split(" ")[0]}</p>
                  <p className="mt-1 text-[19px] font-semibold">{shortDate(event.date).split(" ")[1]}</p>
                </div>
                <div className="h-10 w-px bg-[#9fa59d]" />
                <h3 className="text-[18px] font-semibold leading-tight text-[#10240c]">{event.title}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-[1.45] text-[#354a30]">{event.summary}</p>
            </div>
            <div className="relative h-[248px] md:h-[278px]">
              <Image alt="" className="object-cover transition duration-500 group-hover:scale-[1.035]" fill sizes="446px" src={event.image} />
              <span className="absolute right-5 top-4 rounded-full border border-white bg-[#d7f8b8] px-3 py-1 text-[11px] font-semibold text-[#091309]">
                {event.eyebrow}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.55))] p-5">
                <div className="flex gap-2">
                <Button className="min-h-0 flex-1 rounded-[12px] !bg-white px-3 py-2.5 text-[13px] !text-[#071007] shadow-none hover:!bg-[#e9f5df] md:px-4 md:text-[14px]" href={`/events/${event.slug}`} variant="secondary">
                  See details
                </Button>
                <Button className="min-h-0 flex-1 rounded-[12px] bg-[#459c0a] px-3 py-2.5 text-[13px] text-[#061006] shadow-none hover:bg-[#5dc716] md:px-4 md:text-[14px]" href={actionHref}>
                  {actionLabel}
                </Button>
                </div>
              </div>
            </div>
          </article>
            );
          })()
        ))}
      </div>
    </div>
  );
}

export function HomeTestimonialsCarousel() {
  return <TestimonialSlider />;
}
