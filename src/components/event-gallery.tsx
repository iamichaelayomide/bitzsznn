"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { events, isTicketedEvent } from "@/data/site";

export function EventsGallerySection() {
  const railRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedEvent = selectedIndex === null ? null : events[selectedIndex];
  const selectedTicketActive = selectedEvent ? isTicketedEvent(selectedEvent.slug) : false;

  function scroll(direction: number) {
    railRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  }

  function closeModal() {
    if (!modalRef.current) {
      setSelectedIndex(null);
      return;
    }

    gsap.to(modalRef.current, {
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.inOut",
      onComplete: () => setSelectedIndex(null),
      scale: 0.98,
    });
  }

  useEffect(() => {
    if (!railRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = railRef.current.querySelectorAll(".event-gallery-card");
    const tween = gsap.to(cards, {
      duration: 4.2,
      ease: "sine.inOut",
      repeat: -1,
      rotation: (index) => (index % 2 === 0 ? 1.2 : -1.2),
      stagger: 0.16,
      y: (index) => (index % 2 === 0 ? -8 : 8),
      yoyo: true,
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!modalRef.current || selectedIndex === null) return;

    gsap.fromTo(
      modalRef.current,
      { autoAlpha: 0, scale: 0.98 },
      { autoAlpha: 1, duration: 0.28, ease: "power2.out", scale: 1 },
    );
  }, [selectedIndex]);

  return (
    <section className="section-grid-lines overflow-hidden bg-white py-16 text-[#10240c] md:py-20">
      <div className="container-shell figma-inner">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="section-title text-[#082005]">
              Events gallery
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#30472d]">
              Swipe through the people, parties, and recap moments that make Bitzsznn feel bigger than one night.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-10">
        <button
          aria-label="Previous gallery item"
          className="absolute left-[max(16px,calc((100%-1320px)/2+24px))] top-[38%] z-20 hidden size-14 place-items-center rounded-l-full bg-[#459c0a] text-[#061006] shadow-[0_16px_40px_rgba(69,156,10,0.25)] transition hover:-translate-x-1 hover:bg-[#5dc716] md:grid"
          onClick={() => scroll(-1)}
          type="button"
        >
          <ArrowLeft className="size-5" strokeWidth={1.8} />
        </button>
        <button
          aria-label="Next gallery item"
          className="absolute right-[max(16px,calc((100%-1320px)/2+24px))] top-[38%] z-20 hidden size-14 place-items-center rounded-r-full bg-[#459c0a] text-[#061006] shadow-[0_16px_40px_rgba(69,156,10,0.25)] transition hover:translate-x-1 hover:bg-[#5dc716] md:grid"
          onClick={() => scroll(1)}
          type="button"
        >
          <ArrowRight className="size-5" strokeWidth={1.8} />
        </button>

        <div
          className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-[max(16px,calc((100%-1320px)/2+16px))] pb-10 pt-2"
          ref={railRef}
        >
          {events.map((item, index) => {
            const year = item.date.split(", ")[1] ?? item.date;
            return (
              <button
                aria-label={`Open ${item.title} preview`}
                className="event-gallery-card w-[min(78vw,312px)] shrink-0 snap-center text-left transition duration-300 hover:-translate-y-2 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#b8ff2c]"
                key={`${item.slug}-${index}`}
                onClick={() => setSelectedIndex(index)}
                type="button"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#0f1c07] shadow-[0_18px_55px_rgba(24,56,20,0.12)]">
                  <Image
                    alt={item.title}
                    className="object-contain"
                    fill
                    sizes="312px"
                    src={item.image}
                  />
                </div>
                <div className="mt-4 min-h-[74px] text-[15px] leading-[1.35]">
                  <h3 className="font-semibold text-[#183814]">{item.title}</h3>
                  <p className="mt-1 font-medium text-[#434d42]">{item.category} / {year}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedEvent ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[80] grid place-items-center bg-[#071007]/86 p-4 opacity-0 backdrop-blur-md"
          onClick={closeModal}
          ref={modalRef}
          role="dialog"
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[18px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.42)]" onClick={(event) => event.stopPropagation()}>
            <button
              aria-label="Close event preview"
              className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white text-[#071007] shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition hover:bg-[#d8f7d8]"
              onClick={closeModal}
              type="button"
            >
              <X className="size-5" strokeWidth={1.8} />
            </button>
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[360px] bg-[#071007] md:min-h-[560px]">
                <Image alt={selectedEvent.title} className="object-contain" fill sizes="(min-width: 1024px) 58vw, 100vw" src={selectedEvent.image} />
              </div>
              <div className="flex flex-col justify-center p-6 text-[#071007] md:p-8">
                <p className="w-fit rounded-full bg-[#d8f7d8] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2f7a13]">
                  {selectedEvent.category}
                </p>
                <h3 className="mt-5 font-[var(--font-display)] text-[34px] leading-none md:text-[48px]">
                  {selectedEvent.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[#40563d]">
                  {selectedEvent.summary}
                </p>
                <div className="mt-6 grid gap-3 text-sm font-semibold text-[#183814]">
                  <span>{selectedEvent.date}</span>
                  <span>{selectedEvent.time}</span>
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-[#d8e4d2] bg-white px-4 py-3 text-sm font-semibold text-[#071007] transition hover:-translate-y-0.5 hover:bg-[#eef7e9]"
                    href={`/events/${selectedEvent.slug}`}
                  >
                    See details
                  </Link>
                  {selectedTicketActive ? (
                    <Link
                      className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[#459c0a] px-4 py-3 text-sm font-semibold text-[#061006] transition hover:-translate-y-0.5 hover:bg-[#5dc716]"
                      href={`/events/${selectedEvent.slug}#tickets`}
                    >
                      Buy ticket
                    </Link>
                  ) : (
                    <Link
                      className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-[#d8e4d2] bg-white px-4 py-3 text-sm font-semibold text-[#071007] transition hover:-translate-y-0.5 hover:bg-[#eef7e9]"
                      href={`/gallery?event=${selectedEvent.slug}`}
                    >
                      See pictures
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
