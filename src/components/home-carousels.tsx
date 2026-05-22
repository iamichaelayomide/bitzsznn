"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { events, testimonials } from "@/data/site";

const testimonialImages = [
  "/images/avatar-1.png",
  "/images/avatar-2.png",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];

export function HomeEventsCarousel() {
  return (
    <div className="relative mt-12">
      <div className="group no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-10 pt-2 sm:-mx-6 sm:px-6 lg:gap-6">
        {events.map((event) => (
          <article
            className="w-[min(82vw,380px)] shrink-0 snap-center overflow-hidden rounded-[16px] bg-[#f7f8f2] text-[#10240c] shadow-[0_12px_36px_rgba(0,0,0,0.16)] transition-[transform,box-shadow,border-color] duration-300 hover:z-10 hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_30px_80px_rgba(0,0,0,0.34)] focus-within:ring-4 focus-within:ring-[#b8ff2c]/45"
            key={event.slug}
          >
            <div className="min-h-[132px] bg-[#f7f8f2] p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 text-center leading-none text-[#193214]">
                  <p className="font-mono text-[12px] uppercase">{event.date.split(" ")[0]}</p>
                  <p className="mt-1 text-[20px] font-semibold">{event.date.split(" ")[1]?.replace(",", "")}</p>
                </div>
                <div className="h-10 w-px bg-[#9fa59d]" />
                <h3 className="text-[20px] font-semibold text-[#10240c]">{event.title}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-[1.45] text-[#354a30]">{event.summary}</p>
            </div>
            <div className="relative h-[290px]">
              <Image alt="" className="object-cover" fill sizes="446px" src={event.image} />
              <span className="absolute right-5 top-4 rounded-full border border-white bg-[#d7f8b8] px-3 py-1 text-[11px] font-semibold text-[#091309]">
                {event.eyebrow}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.76))] p-5">
                <div className="flex gap-2">
                <Button className="min-h-0 flex-1 rounded-[18px] bg-[#459c0a] px-4 py-3 text-[14px] text-[#061006] shadow-none hover:bg-[#5dc716]" href={`/events/${event.slug}`}>
                  View event
                </Button>
                <Button className="min-h-0 flex-1 rounded-[18px] bg-[#fbfff4] px-4 py-3 text-[14px] text-[#0b1709] shadow-none hover:bg-white" href={`/events/${event.slug}#tickets`} variant="secondary">
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
      <div className="no-scrollbar -mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-8 sm:-mx-8 sm:px-8 lg:gap-10" ref={railRef}>
        {testimonials.map((item, index) => {
          const selected = index === active;
          return (
            <button
              className={`flex w-[min(86vw,620px)] shrink-0 snap-center gap-4 rounded-[18px] border border-[#d9e5d4] bg-[#fbfff4] p-5 text-left transition duration-300 md:gap-5 md:p-7 ${
                selected ? "scale-100 opacity-100" : "scale-[0.94] opacity-45"
              }`}
              key={`${item.name}-${index}`}
              onClick={() => setActive(index)}
              type="button"
            >
              <Quote className={`mt-1 size-9 shrink-0 fill-current ${selected ? "text-[#183814]" : "text-[#74806f]"}`} />
              <div className="max-w-[540px]">
                <div className={`flex gap-2 ${selected ? "text-[#459c0a]" : "text-[#8b9488]"}`}>
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star className="size-5 fill-current" key={star} />
                  ))}
                </div>
                <p className={`mt-4 text-[19px] leading-[1.45] md:text-[22px] ${selected ? "font-semibold text-[#183814]" : "font-medium text-[#4f5c4c]"}`}>
                  {item.quote}
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <div className="relative size-[58px] overflow-hidden rounded-[12px] bg-[#d8f7d8]">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="58px"
                      src={testimonialImages[index % testimonialImages.length]}
                    />
                  </div>
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
