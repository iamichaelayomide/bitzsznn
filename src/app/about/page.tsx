import type { Metadata } from "next";
import Image from "next/image";
import { Instagram, Plus, Twitter } from "lucide-react";
import { Button } from "@/components/button";
import { GuideBand, InnerPageHero, SectionKicker } from "@/components/inner-page-hero";
import { MotionSection } from "@/components/motion-section";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { stats, values } from "@/data/site";

export const metadata: Metadata = {
  title: "About Bitzsznn | Youth Culture, NYSC Events & Community",
  description:
    "Meet Bitzsznn, the youth cultural community creating NYSC events, post-NYSC experiences, brand activations, music moments, and real connection across Nigeria.",
};

const team = [
  { name: "Michael Ayomide", role: "Brand direction", image: "/images/community-party-1.png", instagram: "https://instagram.com", x: "https://x.com" },
  { name: "Amaka E.", role: "Community experience", image: "/images/community-good-vibes.png", instagram: "https://instagram.com", x: "https://x.com" },
  { name: "Timi A.", role: "Events strategy", image: "/images/event-good-vibes.png", instagram: "https://instagram.com", x: "https://x.com" },
  { name: "Ife B.", role: "Culture and content", image: "/images/community-party-2.png", instagram: "https://instagram.com", x: "https://x.com" },
  { name: "Dara K.", role: "Partnerships", image: "/images/values-good-vibes.png", instagram: "https://instagram.com", x: "https://x.com" },
  { name: "Zainab O.", role: "Audience growth", image: "/images/about-hero.png", instagram: "https://instagram.com", x: "https://x.com" },
];

export default function AboutPage() {
  return (
    <main>
      <InnerPageHero
        body="We turn NYSC transitions, music nights, creator rooms, and brand activations into cultural moments people remember and share."
        eyebrow="About us"
        image="/images/about-hero.png"
        primaryCta={{ label: "Join the community", href: "/community" }}
        secondaryCta={{ label: "View events", href: "/events" }}
        title="At Bitzsznn, we craft youth culture with real community, sharp storytelling, and rooms that move people."
        tone="dark"
      />

      <GuideBand>
        <MotionSection>
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
            <div>
              <SectionKicker>Our story</SectionKicker>
              <h2 className="section-title mt-4 font-semibold text-[#183814]">
                More than a party.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#183814]/72 md:text-lg">
              <p>
                Bitzsznn is a youth cultural community brand built around NYSC and post-NYSC lifestyle,
                entertainment, music, events, shared memories, connection, and transition.
              </p>
              <p>
                We create rooms where people can vibe freely, meet people who matter, document memories,
                and step into new opportunities with confidence.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div className="rounded-[24px] border border-[#dbe6d7] bg-[#f8fbf4] p-6" key={stat.label}>
                <p className="text-2xl font-semibold text-[#183814] md:text-3xl">{stat.value}</p>
                <p className="mt-3 font-semibold text-[#183814]">{stat.label}</p>
                <p className="mt-3 text-sm leading-6 text-[#183814]/62">{stat.body}</p>
              </div>
            ))}
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionKicker>What drives us</SectionKicker>
              <h2 className="section-title mt-4 font-semibold text-[#183814]">
                Vibes with a purpose.
              </h2>
            </div>
            <Button href="/events" showIcon>
              View events
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  className="rounded-[24px] border border-[#dbe6d7] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:bg-[#f8fbf4]"
                  key={value.title}
                >
                  <div className="grid size-12 place-items-center rounded-full bg-[#dcecd1] text-[#183814]">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-[#183814]">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#183814]/68">{value.body}</p>
                </div>
              );
            })}
          </div>
        </MotionSection>
      </GuideBand>

      <GuideBand className="border-t border-[#e1eadc]" id="team">
        <MotionSection>
          <div className="mb-10">
            <SectionKicker>Meet our team</SectionKicker>
            <h2 className="section-title mt-4 font-semibold text-[#183814]">
              The people behind the rooms, recaps, and relationships.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#40563d]">
              A small culture team shaping event strategy, brand partnerships, community experience, content, and audience growth for Bitzsznn.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article
                className="group overflow-hidden rounded-[28px] border border-[#dbe6d7] bg-[#f8fbf4] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,56,20,0.12)] focus-within:-translate-y-1 focus-within:shadow-[0_24px_70px_rgba(24,56,20,0.12)]"
                key={member.name}
              >
                <div className="relative aspect-[0.9] overflow-hidden bg-[#dcecd1]">
                  <Image
                    alt={`${member.name}, ${member.role}`}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    src={member.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.72))] opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
                  <div className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-[#459c0a] text-[#061006] shadow-[0_16px_34px_rgba(69,156,10,0.34)] transition duration-200 group-hover:scale-105 group-focus-within:scale-105">
                    <Plus className="size-5 stroke-[2.4]" />
                  </div>
                  <div className="absolute bottom-4 right-4 flex translate-y-3 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <a aria-label={`${member.name} on Instagram`} className="grid size-11 place-items-center rounded-full bg-white text-[#082005] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#d8f7d8]" href={member.instagram} rel="noreferrer" target="_blank">
                      <Instagram className="size-5" />
                    </a>
                    <a aria-label={`${member.name} on X`} className="grid size-11 place-items-center rounded-full bg-white text-[#082005] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#d8f7d8]" href={member.x} rel="noreferrer" target="_blank">
                      <Twitter className="size-5" />
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#183814]">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#40563d]">{member.role}</p>
                </div>
              </article>
            ))}
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
          </div>
          <TestimonialSlider />
        </MotionSection>
      </GuideBand>
    </main>
  );
}
