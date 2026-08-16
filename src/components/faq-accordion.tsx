"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/site";

export function FaqAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-5xl">
      {faqs.map((item, index) => {
        const isOpen = active === index;
        return (
          <div className="border-b border-[#dce8d8]" key={item.question}>
            <button
              className={`flex w-full items-center justify-between gap-5 px-0 py-5 text-left transition md:py-6 ${
                isOpen ? "rounded-t-[2px] bg-[#d8f7d8] px-5 md:px-6" : ""
              }`}
              onClick={() => setActive(isOpen ? -1 : index)}
              type="button"
            >
              <span className="text-base font-semibold text-[#183814] md:text-lg">{item.question}</span>
              <span className={`grid size-10 shrink-0 place-items-center rounded-[14px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition ${
                isOpen ? "border-[#459c0a] bg-[#459c0a] text-[#061006]" : "border-[#dce8d8] bg-white text-[#183814]"
              }`}>
                <Plus className={`size-5 transition duration-200 ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.8} />
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
                  <div className="bg-[#d8f7d8] px-5 pb-5 md:px-6 md:pb-6">
                    <p className="max-w-3xl text-sm leading-7 text-[#183814] md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
