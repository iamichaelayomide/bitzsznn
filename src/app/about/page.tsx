import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { GuideBand, InnerPageHero, SectionKicker } from "@/components/inner-page-hero";
import { MotionSection } from "@/components/motion-section";
import { PremiumIcon } from "@/components/premium-icon";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { stats, teamMembers, values } from "@/data/site";

export const metadata: Metadata = {
  title: "About Bitzsznn | Youth Culture, NYSC Events & Community",
  description:
    "Meet Bitzsznn, the youth cultural community creating NYSC events, post-NYSC experiences, brand activations, music moments, and real connection across Nigeria.",
};

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
                  <PremiumIcon icon={Icon} tone="green" />
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
            <SectionKicker>Team</SectionKicker>
            <h2 className="section-title mt-4 font-semibold text-[#183814]">
              The people moving the room.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#40563d]">
              The Bitzsznn crew behind the hosting, visuals, music, welfare, community, and recap moments.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <article
                className="group overflow-hidden rounded-[20px] border border-[#dbe6d7] bg-[#f8fbf4] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,56,20,0.12)] focus-within:-translate-y-1 focus-within:shadow-[0_24px_70px_rgba(24,56,20,0.12)]"
                key={member.name}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#dcecd1]">
                  <Image
                    alt={`${member.name}, ${member.role}`}
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={member.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.72))] opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
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
