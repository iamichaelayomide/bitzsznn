"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { services } from "@/data/site";

const servicePanels = [
  {
    image: "/images/event-good-vibes.png",
    stats: [
      { value: "30+", label: "experiences hosted" },
      { value: "4+", label: "cities and states touched" },
    ],
  },
  {
    image: "/images/community-party-1.png",
    stats: [
      { value: "500+", label: "community members" },
      { value: "70%", label: "NYSC and post-NYSC crowd" },
    ],
  },
  {
    image: "/images/community-good-vibes.png",
    stats: [
      { value: "50+", label: "collaborations secured" },
      { value: "3", label: "activation formats" },
    ],
  },
  {
    image: "/images/community-party-2.png",
    stats: [
      { value: "24h", label: "recap-ready moments" },
      { value: "5", label: "content touchpoints" },
    ],
  },
  {
    image: "/images/values-good-vibes.png",
    stats: [
      { value: "500+", label: "people in the network" },
      { value: "50+", label: "warm intros and partners" },
    ],
  },
];

export function ServiceAccordion() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const currentPanel = servicePanels[active] ?? servicePanels[0];
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
                    className="ml-[84px] max-w-2xl overflow-hidden pt-4 text-sm leading-7 text-[#40563d] md:text-base"
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
        className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#cbdcc4] bg-[#10240c] p-0 shadow-[0_24px_80px_rgba(24,56,20,0.16)]"
        layout
      >
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex h-full flex-col justify-between"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: 12 }}
            key={current.title}
            transition={{ duration: 0.24 }}
          >
            <div className="relative min-h-[230px] overflow-hidden">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="560px"
                src={currentPanel.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.06),rgba(8,11,8,0.72))]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div className="grid size-14 place-items-center rounded-full bg-[#fbfff4] text-[#183814]">
                  <Icon className="size-6" />
                </div>
                <p className="rounded-full bg-[#d7f8b8] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#10240c]">
                  Bitzsznn service
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
              <div>
                <div className="mb-5 hidden size-16 place-items-center rounded-full bg-[#183814] text-white">
                <Icon className="size-7" />
                </div>
                <h3 className="text-2xl font-semibold leading-tight text-[#fbfff4] md:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-8 text-[#dce8d8]">
                  {current.body}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3">
                {currentPanel.stats.map((stat) => (
                <div className="rounded-[18px] border border-white/10 bg-[#fbfff4] p-4" key={stat.label}>
                  <p className="text-2xl font-semibold text-[#183814]">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#43563f]">
                    {stat.label}
                  </p>
                </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
