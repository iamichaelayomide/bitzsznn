"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { services, stats } from "@/data/site";

export function ServiceAccordion() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = current.icon;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:gap-14">
      <div className="border-t border-[#dbe6d7]">
        {services.map((item, index) => {
          const isOpen = active === index;
          const RowIcon = item.icon;

          return (
            <motion.button
              className="group w-full border-b border-[#dbe6d7] py-5 text-left"
              key={item.title}
              onClick={() => setActive(index)}
              type="button"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-[#4b8d16]">{item.number}</span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f0f6eb] text-[#183814] transition group-hover:bg-[#dff0d7]">
                  <RowIcon className="size-5" />
                </span>
                <span className="flex-1 text-lg font-semibold text-[#183814] md:text-2xl">{item.title}</span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dbe6d7]">
                  <Plus className={`size-5 transition duration-200 ${isOpen ? "rotate-45 text-[#4b8d16]" : ""}`} />
                </span>
              </div>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.p
                    animate={{ height: "auto", opacity: 1 }}
                    className="ml-[84px] max-w-2xl overflow-hidden pt-4 text-sm leading-7 text-[#183814]/68 md:text-base"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.body}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#dbe6d7] bg-[#dcecd1] p-7 shadow-[0_24px_80px_rgba(24,56,20,0.12)] md:p-9"
        layout
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]" />
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex h-full flex-col justify-between"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: 12 }}
            key={current.title}
            transition={{ duration: 0.24 }}
          >
            <div>
              <div className="mb-7 grid size-16 place-items-center rounded-full bg-[#183814] text-white">
                <Icon className="size-7" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#4b8d16]">
                Bitzsznn service
              </p>
              <h3 className="mt-4 text-4xl font-semibold leading-none text-[#183814] md:text-5xl">
                {current.title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-8 text-[#183814]/72">
                {current.body}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {stats.slice(0, 2).map((stat) => (
                <div className="rounded-[18px] bg-white/72 p-4" key={stat.label}>
                  <p className="text-3xl font-semibold text-[#183814]">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#183814]/62">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
