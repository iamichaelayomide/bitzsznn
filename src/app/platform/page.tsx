import type { Metadata } from "next";
import { PlatformBuilder } from "@/components/platform-builder";

export const metadata: Metadata = {
  title: "RoomPass by Bitzsznn | Event Ticketing Platform for Parties",
  description:
    "RoomPass by Bitzsznn is an event ticketing platform concept for promoters, brands, artists, and party organizers to publish events, sell tickets, track promo codes, and manage attendees.",
};

const features = [
  "Publish branded event pages with flyer upload, dates, location, ticket tiers, and share links.",
  "Sell tickets with unique QR codes, confirmation emails, and attendee lists.",
  "Create promoter codes, track sales by channel, and reward people pushing the event.",
  "Give organizers a dashboard for revenue, check-ins, ticket inventory, and campaign performance.",
  "Ship as a responsive web app first, then wrap the same flows into iOS and Android apps.",
];

export default function PlatformPage() {
  return (
    <main className="bg-[#fbfff4] text-[#183814]">
      <section className="section-grid-lines bg-[#0f1c07] pt-32 text-white md:pt-40">
        <div className="container-shell figma-inner py-[var(--space-section-md)]">
          <div className="max-w-4xl">
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Product by Bitzsznn
            </p>
            <h1 className="hero-title mt-6">
              RoomPass helps promoters publish events, sell tickets, and track the people pushing the room.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
              Think ticketing, flyer pages, promo codes, QR access, and sales tracking for parties, brand activations, artist shows, and culture nights.
            </p>
          </div>
        </div>
      </section>

      <section className="section-grid-lines py-[var(--space-section-md)]">
        <div className="container-shell figma-inner">
          <PlatformBuilder />
        </div>
      </section>

      <section className="section-grid-lines border-t border-[#d8e4d2] bg-white py-[var(--space-section-sm)]">
        <div className="container-shell figma-inner grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Full product flow
            </p>
            <h2 className="mt-5 text-[32px] font-medium leading-tight text-[#082005] md:text-[44px]">
              Built for organizers, promoters, and guests.
            </h2>
          </div>
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <div className="rounded-[22px] border border-[#d8e4d2] bg-[#f8fbf4] p-5" key={feature}>
                <span className="font-mono text-sm font-bold text-[#459c0a]">0{index + 1}</span>
                <p className="mt-3 text-lg font-semibold leading-snug text-[#082005]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
