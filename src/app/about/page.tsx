import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { GuideBand, InnerPageHero, SectionKicker } from "@/components/inner-page-hero";
import { MotionSection } from "@/components/motion-section";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { stats, values } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us | Bitzsznn",
  description:
    "Meet Bitzsznn, a youth cultural community brand for NYSC and post-NYSC lifestyle, entertainment, connection, and opportunity.",
};

const team = [
  { name: "Michael Ayomide", role: "Brand direction", image: "/images/community-party-1.png" },
  { name: "Amaka E.", role: "Community experience", image: "/images/community-good-vibes.png" },
  { name: "Timi A.", role: "Events strategy", image: "/images/event-good-vibes.png" },
  { name: "Ife B.", role: "Culture and content", image: "/images/community-party-2.png" },
];

export default function AboutPage() {
  return (
    <main>
      <InnerPageHero
        body="We represent moments before they move on, turning raw youth energy into connection, memories, and access."
        eyebrow="About us"
        image="/images/about-hero.png"
        primaryCta={{ label: "Join the community", href: "/community" }}
        secondaryCta={{ label: "View events", href: "/events" }}
        title="At Bitzsznn, we craft cultural experiences with creative storytelling and real community."
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

      <GuideBand className="border-t border-[#e1eadc]" id="team">
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

      <GuideBand className="border-t border-[#e1eadc]">
        <MotionSection>
          <div className="mb-10">
            <SectionKicker>Meet our team</SectionKicker>
            <h2 className="section-title mt-4 font-semibold text-[#183814]">
              The people behind the moments.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article
                className="group overflow-hidden rounded-[28px] border border-[#dbe6d7] bg-[#f8fbf4] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,56,20,0.12)]"
                key={member.name}
              >
                <div className="aspect-[0.82] overflow-hidden bg-[#dcecd1]">
                  <Image
                    alt={`${member.name}, ${member.role}`}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                    height={520}
                    src={member.image}
                    width={426}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#183814]">{member.name}</h3>
                  <p className="mt-1 text-sm text-[#183814]/62">{member.role}</p>
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
