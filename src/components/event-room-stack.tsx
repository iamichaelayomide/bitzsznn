"use client";

import { motion } from "framer-motion";

type EventRoomStackProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  items: string[];
};

export function EventRoomStack({
  eyebrow = "What to expect",
  title = "What to expect",
  body = "Every Bitzsznn event is built to help people enter easily, connect naturally, and leave with a memory worth sharing.",
  items,
}: EventRoomStackProps) {
  return (
    <section className="section-grid-lines bg-white py-[var(--space-section-sm)] text-[#183814] md:py-[var(--space-section-md)]">
      <div className="container-shell figma-inner">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-32 lg:pr-10">
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              {eyebrow}
            </p>
            <h2 className="mt-5 max-w-[420px] font-[var(--font-display)] text-[32px] font-normal leading-tight text-[#082005] md:text-[40px]">
              {title}
            </h2>
            <p className="mt-5 max-w-[500px] text-[15px] leading-8 text-[#40563d] md:text-base">
              {body}
            </p>
          </div>

          <div className="relative grid gap-4 md:gap-5">
            {items.map((item, index) => (
              <motion.article
                className="sticky rounded-[22px] border border-[#d8e4d2] bg-[#f8fbf4] p-6 shadow-[0_18px_50px_rgba(24,56,20,0.06)] md:p-8"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                key={item}
                style={{ top: `${96 + index * 16}px`, zIndex: index + 1 }}
                transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.45 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <span className="font-mono text-sm font-bold text-[#459c0a]">0{index + 1}</span>
                <p className="mt-5 text-[19px] font-semibold leading-snug text-[#082005] md:text-[24px]">
                  {item}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
