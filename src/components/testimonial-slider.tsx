"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { PremiumIcon } from "@/components/premium-icon";
import { testimonials } from "@/data/site";

export function TestimonialSlider() {
  const [active, setActive] = useState(2);
  const item = testimonials[active];

  const go = (direction: number) => {
    setActive((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#dbe6d7] bg-[#fbfff7] p-5 shadow-[0_18px_60px_rgba(24,56,20,0.07)] md:p-7 lg:p-9">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="min-h-[230px] md:min-h-[270px]"
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
        <PremiumIcon icon={Quote} size="lg" tone="green" />
        <p className="mt-7 max-w-5xl text-[19px] font-semibold leading-[1.44] text-[#082005] md:mt-10 md:text-[27px] lg:text-[30px]">
          &quot;{item.quote}&quot;
        </p>
        <div className="mt-8 flex items-center gap-4 md:mt-10">
          <div className="grid size-[52px] shrink-0 place-items-center rounded-[16px] bg-[#d8f7d8] text-[18px] font-bold text-[#183814] ring-4 ring-[#eaf6e4]">
            {item.name.slice(0, 1)}
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#082005] md:text-[18px]">{item.name}</p>
            <p className="mt-1 text-sm text-[#43563f] md:text-[16px]">{item.role}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mt-8">
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
            className="grid size-11 place-items-center rounded-full border border-[#dbe6d7] bg-white text-[#183814] transition hover:-translate-y-0.5 hover:border-[#4b8d16] md:size-12"
            onClick={() => go(-1)}
            type="button"
          >
            <ArrowLeft className="size-5" strokeWidth={1.8} />
          </button>
          <button
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full bg-[#4b8d16] text-white transition hover:-translate-y-0.5 hover:bg-[#183814] md:size-12"
            onClick={() => go(1)}
            type="button"
          >
            <ArrowRight className="size-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}
