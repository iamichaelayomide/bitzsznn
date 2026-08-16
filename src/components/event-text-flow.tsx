"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Music2, Ticket } from "lucide-react";
import { Button } from "@/components/button";
import { PremiumIcon } from "@/components/premium-icon";
import { activeTicketEventSlug } from "@/data/site";

const eventRows = [
  {
    label: "Signature night",
    title: "The Bitzsznn Experience",
    body: "Music, movement, new circles, and the kind of room that makes the service-year transition feel lighter.",
    icon: Music2,
  },
  {
    label: "Next stop",
    title: "Lagos, Nigeria",
    body: "A premium cultural room for corps members, young professionals, creators, founders, and friends of the brand.",
    icon: MapPin,
  },
  {
    label: "Access",
    title: "Tickets and tables",
    body: "Choose your pass, bring your crew, or create a partnership moment that lives beyond the event night.",
    icon: Ticket,
  },
];

export function EventTextFlow() {
  return (
    <div className="space-y-4">
      {eventRows.map((row, index) => {
        const Icon = row.icon;

        return (
          <motion.div
            className="group grid gap-5 rounded-[24px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md md:grid-cols-[180px_1fr_auto] md:items-center md:p-7"
            initial={{ opacity: 0, y: 18 }}
            key={row.title}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -4, borderColor: "rgba(184,255,44,0.42)" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white/62">
              <PremiumIcon icon={Icon} size="sm" tone="dark" />
              {row.label}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white md:text-2xl">{row.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-white/68 md:text-base">{row.body}</p>
            </div>
            {index === 2 ? (
              <Button className="w-full md:w-auto" href={`/events/${activeTicketEventSlug}#tickets`} showIcon>
                Buy Freed At Last
              </Button>
            ) : (
              <CalendarDays className="hidden size-7 text-white/26 transition group-hover:text-[#b8ff2c] md:block" strokeWidth={1.8} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
