import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { GuideBand, SectionKicker } from "@/components/inner-page-hero";
import { MotionSection } from "@/components/motion-section";
import { ServiceAccordion } from "@/components/service-accordion";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { events, reasons, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services | Bitzsznn",
  description:
    "Explore Bitzsznn services across youth culture, events, NYSC community experiences, collaborations, and storytelling.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="section-grid-lines bg-[#0f1c07] pt-28 text-white md:pt-36">
        <div className="container-shell figma-inner grid min-h-[650px] gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Services
            </p>
            <h1 className="mt-6 max-w-[720px] text-[42px] font-medium leading-[1.04] md:text-[72px]">
              We build the room, the story, and the access.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/76 md:text-lg md:leading-8">
              Bitzsznn creates cultural experiences for NYSC, post-NYSC, creators, brands, and young people moving into what comes next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/community" showIcon>
                Join the community
              </Button>
              <Button className="bg-white text-[#082005] shadow-none hover:bg-[#f5f7ef]" href="/events" variant="secondary">
                Explore events
              </Button>
            </div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-white/10 bg-[#10240c] shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <Image alt="" className="object-cover" fill priority sizes="720px" src="/images/community-party-2.png" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.04),rgba(8,11,8,0.72))]" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 text-left md:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <div className="rounded-[18px] border border-white/12 bg-[#081108]/82 p-4 backdrop-blur" key={service.title}>
                  <p className="text-xs font-bold text-[#b8ff2c]">{service.number}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{service.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GuideBand id="services">
        <MotionSection>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <SectionKicker>Our services</SectionKicker>
              <h2 className="section-title mt-4 font-semibold text-[#183814]">
                What do we do?
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#183814]/70">
              Bitzsznn builds the bridge between vibes and value: event experiences, cultural storytelling,
              community access, and partnership moments that feel alive long after the night ends.
            </p>
          </div>
          <div className="mt-12">
            <ServiceAccordion />
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc] bg-[#f8fbf4]">
        <MotionSection>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <div>
              <SectionKicker>Event production</SectionKicker>
              <h2 className="mt-4 text-[32px] font-medium leading-tight text-[#082005] md:text-[44px]">
                From event concept to the room people post about.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#40563d] md:text-base">
                We shape the guest flow, event story, ticket path, recap moments, and partner visibility so every experience feels intentional.
              </p>
              <Button className="mt-7" href="/events">View events</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {events.slice(0, 4).map((event) => (
                <div className="overflow-hidden rounded-[22px] border border-[#dbe6d7] bg-white" key={event.slug}>
                  <div className="relative aspect-[1.35]">
                    <Image alt="" className="object-cover" fill sizes="380px" src={event.image} />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#459c0a]">{event.location}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#082005]">{event.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-8">
            <SectionKicker>Meet our team</SectionKicker>
            <h2 className="mt-4 text-[32px] font-medium leading-tight text-[#082005] md:text-[44px]">
              People behind the rooms.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Michael Ayomide", "Brand direction", "/images/avatar-1.png"],
              ["Amaka E.", "Community experience", "/images/avatar-2.png"],
              ["Timi A.", "Events strategy", "/images/avatar-3.png"],
              ["Ife B.", "Culture and content", "/images/avatar-4.png"],
            ].map(([name, role, image]) => (
              <article className="overflow-hidden rounded-[22px] border border-[#dbe6d7] bg-[#f8fbf4]" key={name}>
                <div className="relative aspect-square bg-[#d8f7d8]">
                  <Image alt="" className="object-cover" fill sizes="280px" src={image} />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#082005]">{name}</h3>
                  <p className="mt-1 text-sm text-[#40563d]">{role}</p>
                </div>
              </article>
            ))}
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="grid gap-5 md:grid-cols-3">
            {reasons.map((reason) => (
              <div className="rounded-[24px] border border-[#dbe6d7] bg-[#f8fbf4] p-6" key={reason.title}>
                <h3 className="text-xl font-semibold text-[#183814]">{reason.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#183814]/68">{reason.body}</p>
              </div>
            ))}
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-8">
            <SectionKicker>Real words from real people</SectionKicker>
            <h2 className="section-title mt-4 max-w-3xl font-semibold text-[#183814]">
              Built for people who show up.
            </h2>
          </div>
          <TestimonialSlider />
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-10 text-center">
            <SectionKicker>FAQ</SectionKicker>
            <h2 className="section-title mt-4 font-semibold text-[#183814]">Questions before the vibe?</h2>
          </div>
          <FaqAccordion />
        </MotionSection>
      </GuideBand>
    </main>
  );
}
