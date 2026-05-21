"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { events, testimonials } from "@/data/site";

export function HomeEventsCarousel() {
  return (
    <div className="relative mt-16">
      <div className="group no-scrollbar -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-2">
        {events.map((event) => (
          <article
            className="w-[min(78vw,373px)] shrink-0 snap-center overflow-hidden rounded-t-[16px] rounded-b-[8px] bg-[#0c1605] transition-[width,transform,box-shadow] duration-300 hover:w-[min(82vw,446px)] hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(0,0,0,0.34)]"
            key={event.slug}
          >
            <div className="min-h-[122px] bg-[#f4f4f1] p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 text-center leading-none text-[#193214]">
                  <p className="font-mono text-[12px] uppercase">{event.date.split(" ")[0]}</p>
                  <p className="mt-1 text-[20px] font-semibold">{event.date.split(" ")[1]?.replace(",", "")}</p>
                </div>
                <div className="h-10 w-px bg-[#9fa59d]" />
                <h3 className="text-[20px] font-semibold text-[#10240c]">{event.title}</h3>
              </div>
              <p className="mt-2 text-[13px] leading-[1.35] text-[#394535]">{event.summary}</p>
            </div>
            <div className="relative h-[311px]">
              <Image alt="" className="object-cover" fill sizes="446px" src={event.image} />
              <span className="absolute right-6 top-4 rounded-full border border-white bg-[#c8f6aa] px-3 py-1 text-[10px] text-[#090e09]">
                {event.eyebrow}
              </span>
              <div className="absolute bottom-8 left-1/2 flex w-[82%] -translate-x-1/2 gap-2">
                <Button className="min-h-0 flex-1 rounded-[20px] bg-black px-4 py-2 text-[15px] text-white shadow-none hover:bg-[#111]" href={`/events/${event.slug}`}>
                  View event
                </Button>
                <Button className="min-h-0 flex-1 rounded-[20px] bg-[#f5f5f5] px-4 py-2 text-[15px] text-black shadow-none hover:bg-white" href={`/events/${event.slug}#tickets`} variant="secondary">
                  Tickets
                </Button>
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
  const railRef = useRef<HTMLDivElement>(null);

  function go(direction: number) {
    setActive((value) => {
      const next = (value + direction + testimonials.length) % testimonials.length;
      railRef.current?.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      return next;
    });
  }

  return (
    <div className="relative mt-6">
      <div className="no-scrollbar -mx-8 flex snap-x gap-[71px] overflow-x-auto px-8 pb-10" ref={railRef}>
        {testimonials.map((item, index) => {
          const selected = index === active;
          return (
            <button
              className={`flex w-[min(82vw,601px)] shrink-0 snap-center gap-5 text-left transition duration-300 ${
                selected ? "scale-100 opacity-100" : "scale-[0.94] opacity-45"
              }`}
              key={`${item.name}-${index}`}
              onClick={() => setActive(index)}
              type="button"
            >
              <Quote className={`mt-1 size-10 shrink-0 fill-current ${selected ? "text-[#131010]" : "text-[#74806f]"}`} />
              <div className="max-w-[540px]">
                <div className={`flex gap-2 ${selected ? "text-[#459c0a]" : "text-[#8b9488]"}`}>
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star className="size-5 fill-current" key={star} />
                  ))}
                </div>
                <p className={`mt-4 text-[22px] leading-normal md:text-[25px] ${selected ? "font-semibold text-[#183814]" : "font-medium text-[#5a6557]"}`}>
                  {item.quote}
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <div className="size-[54px] rounded bg-[#a0c1f2]" />
                  <div>
                    <p className="text-[18px] font-semibold text-[#183814]">{item.name}</p>
                    <p className="mt-1 text-[18px] font-medium text-[#434d42]">{item.role}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center gap-2">
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
