"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/site";

export function FaqAccordion() {
  const [active, setActive] = useState(-1);

  return (
    <div className="mx-auto max-w-5xl">
      {faqs.map((item, index) => {
        const isOpen = active === index;
        return (
          <div className="border-b border-border" key={item.question}>
            <button
              className="flex w-full items-center justify-between gap-5 py-5 text-left md:py-6"
              onClick={() => setActive(isOpen ? -1 : index)}
              type="button"
            >
              <span className="text-base font-semibold text-[#183814] md:text-lg">{item.question}</span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dce8d8] bg-white text-[#183814]">
                <Plus className={`size-5 transition duration-200 ${isOpen ? "rotate-45 text-primary" : ""}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="max-w-3xl pb-6 text-sm leading-7 text-[#183814]/80 md:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
