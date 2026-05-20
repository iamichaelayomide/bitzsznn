import type { Metadata } from "next";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { GuideBand, InnerPageHero, SectionKicker } from "@/components/inner-page-hero";
import { MotionSection } from "@/components/motion-section";
import { ServiceAccordion } from "@/components/service-accordion";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { reasons, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services | Bitzsznn",
  description:
    "Explore Bitzsznn services across youth culture, events, NYSC community experiences, collaborations, and storytelling.",
};

export default function ServicesPage() {
  return (
    <main>
      <InnerPageHero
        body="We create experiences, connect young people, and open doors for the NYSC and post-NYSC generation."
        primaryCta={{ label: "Join the community", href: "/#community" }}
        secondaryCta={{ label: "Explore events", href: "/events" }}
        title="We’re passionate about building a community"
        tone="sage"
      >
        <div className="relative mt-4 aspect-[2.38/1] w-full max-w-[991px] overflow-hidden rounded-[32px] bg-[#dcecd1] shadow-[0_30px_90px_rgba(24,56,20,0.14)]">
          <div className="absolute inset-6 rounded-[24px] border border-white/50" />
          <div className="absolute left-6 top-6 rounded-full bg-white/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4b8d16]">
            Bitzsznn experience
          </div>
          <div className="absolute bottom-6 left-6 right-6 grid gap-3 text-left md:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <div className="rounded-[20px] bg-white/72 p-4 backdrop-blur" key={service.title}>
                <p className="text-xs font-bold text-[#4b8d16]">{service.number}</p>
                <p className="mt-2 text-sm font-semibold text-[#183814]">{service.title}</p>
              </div>
            ))}
          </div>
        </div>
      </InnerPageHero>

      <GuideBand id="services">
        <MotionSection>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <SectionKicker>Our services</SectionKicker>
              <h2 className="mt-4 text-5xl font-semibold leading-none text-[#183814] md:text-7xl">
                What do we do?
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#183814]/70 md:text-lg">
              Bitzsznn builds the bridge between vibes and value: event experiences, cultural storytelling,
              community access, and partnership moments that feel alive long after the night ends.
            </p>
          </div>

          <div className="mt-14">
            <ServiceAccordion />
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="grid gap-5 md:grid-cols-3">
            {reasons.map((reason) => (
              <div
                className="rounded-[24px] border border-[#dbe6d7] bg-[#f8fbf4] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,56,20,0.1)]"
                key={reason.title}
              >
                <h3 className="text-2xl font-semibold text-[#183814]">{reason.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#183814]/68">{reason.body}</p>
              </div>
            ))}
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <SectionKicker>Real words from real people</SectionKicker>
              <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-none text-[#183814] md:text-7xl">
                Built for people who show up.
              </h2>
            </div>
            <Button href="/tickets" showIcon>
              Buy tickets
            </Button>
          </div>
          <TestimonialSlider />
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-10 text-center">
            <SectionKicker>FAQ</SectionKicker>
            <h2 className="mt-4 text-5xl font-semibold text-[#183814] md:text-7xl">Questions before the vibe?</h2>
          </div>
          <FaqAccordion />
        </MotionSection>
      </GuideBand>
    </main>
  );
}
