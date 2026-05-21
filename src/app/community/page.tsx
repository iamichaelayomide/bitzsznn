import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/button";
import { MotionSection } from "@/components/motion-section";
import { socialLinks, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Community | Bitzsznn",
  description: "Join the Bitzsznn community for events, memories, updates, collaborations, and post-NYSC connection.",
};

const communityBenefits = [
  "Early event drops before public announcements",
  "A warmer way to meet people after NYSC, school, or relocation",
  "Creator, brand, and collaboration opportunities",
  "Recap photos, shared memories, and community conversations",
];

export default function CommunityPage() {
  return (
    <main className="bg-[#f7f5f2] text-[#183814]">
      <section className="section-grid-lines bg-[#0f1c07] pt-28 text-white md:pt-36">
        <div className="container-shell figma-inner grid min-h-[720px] gap-10 py-16 md:py-24 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Community
            </p>
            <h1 className="mt-6 text-[clamp(3.2rem,8vw,7.6rem)] font-medium leading-[0.92]">
              Find your people before the moment moves on.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              Bitzsznn brings corps members, graduates, creatives, founders, and culturally plugged-in young people
              into rooms where connection feels natural.
            </p>
            <Button className="mt-8" href={socialLinks.whatsapp} showIcon>
              Join the community
            </Button>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[18px]">
            <Image alt="" className="object-cover" fill sizes="650px" src="/images/community-good-vibes.png" />
          </div>
        </div>
      </section>

      <section className="section-grid-lines bg-white py-16 md:py-24">
        <div className="container-shell figma-inner">
          <MotionSection>
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
              <div>
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  Why join?
                </p>
                <h2 className="mt-4 text-5xl font-medium leading-none md:text-7xl">Vibes that turn into access.</h2>
              </div>
              <div className="grid gap-4">
                {communityBenefits.map((benefit) => (
                  <div className="flex gap-3 rounded-[22px] border border-[#d8e4d2] bg-[#f8fbf4] p-5" key={benefit}>
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#459c0a]" />
                    <p className="text-lg font-semibold">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div className="rounded-[24px] border border-[#d8e4d2] bg-[#d8f7d8] p-6" key={stat.label}>
                  <p className="text-5xl font-semibold">{stat.value}</p>
                  <p className="mt-3 font-semibold">{stat.label}</p>
                  <p className="mt-3 text-sm leading-6 text-[#183814]/72">{stat.body}</p>
                </div>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>
    </main>
  );
}
