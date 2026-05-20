import type { Metadata } from "next";
import { Button } from "@/components/button";
import { EventTextFlow } from "@/components/event-text-flow";
import { InnerPageHero } from "@/components/inner-page-hero";
import { MotionSection } from "@/components/motion-section";
import { eventHighlights, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Events | Bitzsznn",
  description:
    "Explore the Bitzsznn Experience, a premium youth culture event built around vibes, networking, opportunity, and shared memories.",
};

export default function EventsPage() {
  return (
    <main className="bg-[#080b08]">
      <InnerPageHero
        body="A community of ambitious, high-network young people who like to vibe, connect, and step into the next season together."
        image="/images/events-hero.png"
        primaryCta={{ label: "View all events", href: "#event-details" }}
        secondaryCta={{ label: "Buy tickets", href: "/tickets" }}
        title="More than a party, an experience."
        tone="dark"
      >
        <div className="mt-3 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div className="rounded-[18px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur" key={stat.label}>
              <p className="text-2xl font-semibold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/58">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </InnerPageHero>

      <section className="section-grid-lines relative overflow-hidden bg-[#080b08] text-white" id="event-details">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(184,255,44,0.14),transparent_30rem)]" />
        <div className="container-shell relative z-10 px-4 py-16 md:px-12 md:py-24">
          <MotionSection>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#b8ff2c]">Events</p>
                <h1 className="mt-4 text-5xl font-semibold leading-none text-white md:text-7xl">
                  Built for the moments before they move on.
                </h1>
              </div>
              <p className="max-w-2xl text-base leading-8 text-white/68 md:text-lg">
                Every Bitzsznn night is shaped for energy, intention, and access, so the people in the room
                become part of the story, not just the crowd.
              </p>
            </div>

            <div className="mt-12">
              <EventTextFlow />
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-grid-lines border-t border-white/10 bg-[#0d120c] text-white">
        <div className="container-shell px-4 py-16 md:px-12 md:py-24">
          <MotionSection>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#b8ff2c]">What to expect</p>
                <h2 className="mt-4 text-5xl font-semibold leading-none md:text-7xl">
                  Vibes. Networking. Opportunity.
                </h2>
              </div>
              <div className="grid gap-3">
                {eventHighlights.map((highlight, index) => (
                  <div
                    className="flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#b8ff2c]/40 hover:bg-white/[0.07]"
                    key={highlight}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#b8ff2c] text-sm font-bold text-[#071007]">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold text-white/82 md:text-base">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur md:flex-row md:items-center md:p-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b8ff2c]">Ready?</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Secure your access.</h3>
              </div>
              <Button className="w-full md:w-auto" href="/tickets" showIcon>
                Buy tickets
              </Button>
            </div>
          </MotionSection>
        </div>
      </section>
    </main>
  );
}
