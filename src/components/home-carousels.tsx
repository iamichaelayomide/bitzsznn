"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { events, testimonials } from "@/data/site";

const testimonialImages = [
  "/images/community-party-1.png",
  "/images/community-party-2.png",
  "/images/community-good-vibes.png",
  "/images/event-good-vibes.png",
  "/images/values-good-vibes.png",
  "/images/about-hero.png",
  "/images/hero-crowd.png",
  "/images/community-party-1.png",
  "/images/community-party-2.png",
  "/images/community-good-vibes.png",
  "/images/event-good-vibes.png",
  "/images/values-good-vibes.png",
];

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
  const [active, setActive] = useState(1);

  function go(direction: number) {
    setActive((value) => (value + direction + testimonials.length) % testimonials.length);
  }

  const activeItem = testimonials[active];

  return (
    <div className="relative mt-8">
      <div className="grid gap-5 rounded-[22px] border border-[#d9e5d4] bg-[#fbfff4] p-5 shadow-[0_20px_70px_rgba(24,56,20,0.08)] md:grid-cols-[190px_1fr] md:p-7">
        <div className="relative aspect-[0.92] overflow-hidden rounded-[28px] bg-[#d8f7d8] md:aspect-auto md:min-h-[220px]">
          <Image alt="" className="object-cover" fill sizes="220px" src={testimonialImages[active % testimonialImages.length]} />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <Quote className="size-9 fill-current text-[#183814]" />
            <div className="mt-4 flex gap-1 text-[#459c0a]">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star className="size-4 fill-current" key={star} />
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-[17px] font-semibold leading-[1.45] text-[#183814] md:text-[20px]">
              {activeItem.quote}
            </p>
          </div>
          <div className="mt-6">
            <p className="text-[17px] font-semibold text-[#183814]">{activeItem.name}</p>
            <p className="mt-1 text-[15px] font-medium text-[#434d42]">{activeItem.role}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        <button aria-label="Previous testimonial" className="grid size-[54px] place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 md:size-[67px]" onClick={() => go(-1)} type="button">
          <ArrowLeft className="size-6" />
        </button>
        <button aria-label="Next testimonial" className="grid size-[54px] place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 md:size-[67px]" onClick={() => go(1)} type="button">
          <ArrowRight className="size-6" />
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((item, index) => (
          <button
            aria-label={`Select testimonial from ${item.name}`}
            className={`h-2 rounded-full transition-all ${index === active ? "w-8 bg-[#459c0a]" : "w-2 bg-[#cbd8c7]"}`}
            key={item.name}
            onClick={() => setActive(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
