"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/data/site";

const testimonialImages = [
  "/images/avatar-5.png",
  "/images/avatar-3.png",
  "/images/avatar-2.png",
  "/images/avatar-4.png",
  "/images/avatar-1.png",
  "/images/community-party-1.png",
  "/images/community-good-vibes.png",
  "/images/event-good-vibes.png",
];

export function TestimonialSlider() {
  const [active, setActive] = useState(2);
  const item = testimonials[active];

  const go = (direction: number) => {
    setActive((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#dbe6d7] bg-[#fbfff7] p-5 shadow-[0_18px_70px_rgba(24,56,20,0.06)] md:p-8 lg:p-10">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="min-h-[250px] md:min-h-[300px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0, x: 24 }}
        key={item.name}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          if (info.offset.x > 60) go(-1);
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid size-12 place-items-center rounded-full bg-[#183814] text-white md:size-[60px]">
          <Quote className="size-5 fill-current md:size-6" />
        </div>
        <p className="mt-8 max-w-5xl text-[20px] font-semibold leading-[1.42] text-[#082005] md:mt-12 md:text-[30px] lg:text-[34px]">
          &quot;{item.quote}&quot;
        </p>
        <div className="mt-8 flex items-center gap-4 md:mt-10">
          <div className="relative size-[62px] overflow-hidden rounded-[18px] bg-[#d8f7d8] ring-4 ring-[#d8f7d8]">
            <Image
              alt={`${item.name} testimonial portrait`}
              className="object-cover"
              fill
              sizes="72px"
              src={testimonialImages[active % testimonialImages.length]}
            />
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#082005] md:text-[18px]">{item.name}</p>
            <p className="mt-1 text-sm text-[#43563f] md:text-[16px]">{item.role}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center justify-between gap-4 md:mt-8">
        <div className="flex gap-2">
          {testimonials.map((entry, index) => (
            <button
              aria-label={`Show testimonial from ${entry.name}`}
              className={`h-2.5 rounded-full transition-all ${
                index === active ? "w-9 bg-[#4b8d16]" : "w-2.5 bg-[#dbe6d7] hover:bg-[#b8d0ad]"
              }`}
              key={entry.name}
              onClick={() => setActive(index)}
              type="button"
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            aria-label="Previous testimonial"
            className="grid size-11 place-items-center rounded-full border border-[#dbe6d7] bg-white text-[#183814] transition hover:-translate-y-0.5 hover:border-[#4b8d16] md:size-14"
            onClick={() => go(-1)}
            type="button"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full bg-[#4b8d16] text-white transition hover:-translate-y-0.5 hover:bg-[#183814] md:size-14"
            onClick={() => go(1)}
            type="button"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
