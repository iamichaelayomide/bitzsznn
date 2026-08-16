import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { HomeTestimonialsCarousel } from "@/components/home-carousels";
import { GuideBand, SectionKicker } from "@/components/inner-page-hero";
import { MotionSection } from "@/components/motion-section";
import { ServiceAccordion } from "@/components/service-accordion";
import { events, services, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Services | Bitzsznn",
  description:
    "Plan culture-led youth events, brand activations, artist collaborations, and community experiences with Bitzsznn.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="section-grid-lines bg-[#0f1c07] pt-28 text-white md:pt-36">
        <div className="container-shell figma-inner grid min-h-[680px] gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <h1 className="hero-title max-w-[560px]">
              Culture-led events.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/76 md:text-lg md:leading-8">
              For brands, artists, founders, and communities that want youth culture without forcing it: we build the event, the story, and the moments people carry home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`mailto:${socialLinks.email}`} showIcon>
                Plan an experience
              </Button>
              <Button className="!bg-[#fbfff4] !text-[#082005] shadow-none hover:!bg-white" href="/events" variant="secondary">
                See events
              </Button>
            </div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-white/10 bg-[#10240c] shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <Image alt="" className="object-cover object-center" fill priority sizes="720px" src="/images/events/services-hero-owambe-highfive.jpg" />
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
              We build the bridge between attention and trust: event strategy, cultural storytelling,
              audience access, and partnership moments that still feel alive after the recap drops.
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
              <SectionKicker>For brands and artists</SectionKicker>
              <h2 className="mt-4 text-[32px] font-medium leading-tight text-[#082005] md:text-[44px]">
                From idea to event.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#40563d] md:text-base">
                We shape the guest flow, event story, ticket path, creator moments, and partner visibility so the activation feels natural instead of pasted on.
              </p>
              <Button className="mt-7" href={`mailto:${socialLinks.email}`}>Work with us</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {events.slice(0, 4).map((event) => (
                <div className="overflow-hidden rounded-[22px] border border-[#dbe6d7] bg-white" key={event.slug}>
                  <div className="relative aspect-[1.35] bg-[#0f1c07]">
                    <Image alt="" className="object-contain" fill sizes="380px" src={event.image} />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#459c0a]">{event.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#082005]">{event.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc] bg-[#d8f7d8]">
        <MotionSection>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <div>
              <SectionKicker>Partner with Bitzsznn</SectionKicker>
              <h2 className="mt-4 text-[34px] font-medium leading-tight text-[#082005] md:text-[52px]">
                Bring your brand into trusted events.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-8 text-[#30472d]">
                We help brands and artists show up with taste: audience strategy, event production, creator moments, content capture, and community access that feels earned.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button className="!bg-[#041102] !text-white shadow-[0_18px_50px_rgba(4,17,2,0.22)] hover:!bg-[#10240c]" href={`mailto:${socialLinks.email}`} variant="secondary">
                  Start a brand partnership
                </Button>
                <Button className="border border-[#041102]/20 bg-white/45 text-[#041102] hover:bg-white" href="/events" variant="ghost">
                  Explore event formats
                </Button>
              </div>
            </div>
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-8">
            <SectionKicker>Community proof</SectionKicker>
            <h2 className="section-title mt-4 max-w-3xl font-semibold text-[#183814]">
              Real words from real people.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#40563d]">
              Proof from people who came for the music, the network, and the story after.
            </p>
          </div>
          <HomeTestimonialsCarousel />
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
