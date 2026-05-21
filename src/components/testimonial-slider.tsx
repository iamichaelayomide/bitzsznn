"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Bitzsznn feels bigger than a regular night out. You come for the music, then leave with new people, clean memories, and actual access.",
    name: "Timi A.",
    role: "Post-NYSC creative",
  },
  {
    quote:
      "The crowd was intentional, the energy was premium, and the content after the event made everyone want to be part of the next one.",
    name: "Amaka E.",
    role: "Brand partner",
  },
  {
    quote:
      "It helped me meet people in a new city without the awkwardness. Bitzsznn understands the transition season perfectly.",
    name: "Dara K.",
    role: "Community member",
  },
];

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  const go = (direction: number) => {
    setActive((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#dbe6d7] bg-[#f8fbf4] p-5 md:p-8">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="min-h-[220px]"
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
        <div className="grid size-12 place-items-center rounded-full bg-[#183814] text-white">
          <Quote className="size-5" />
        </div>
        <p className="mt-8 max-w-4xl text-xl font-semibold leading-[1.35] text-[#183814] md:text-3xl">
          &quot;{item.quote}&quot;
        </p>
        <div className="mt-8">
          <p className="font-bold text-[#183814]">{item.name}</p>
          <p className="mt-1 text-sm text-[#183814]/62">{item.role}</p>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {testimonials.map((entry, index) => (
            <button
              aria-label={`Show testimonial from ${entry.name}`}
              className={`h-2.5 rounded-full transition-all ${
                index === active ? "w-9 bg-[#4b8d16]" : "w-2.5 bg-[#dbe6d7]"
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
            className="grid size-11 place-items-center rounded-full border border-[#dbe6d7] bg-white text-[#183814] transition hover:-translate-y-0.5 hover:border-[#4b8d16]"
            onClick={() => go(-1)}
            type="button"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full bg-[#183814] text-white transition hover:-translate-y-0.5 hover:bg-[#4b8d16]"
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
