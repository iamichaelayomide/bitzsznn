import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

const steps = [
  ["01", "Come in early", "Get the event drops, community updates, and open calls before they go public."],
  ["02", "Find your people", "Meet corps members, graduates, creators, founders, and friends of friends without the awkwardness."],
  ["03", "Stay after the night", "Keep the recaps, intros, photos, and collaborations moving after the event ends."],
];

export default function CommunityPage() {
  return (
    <main className="bg-white text-[#183814]">
      <section className="section-grid-lines bg-[#0f1c07] pt-28 text-white md:pt-36">
        <div className="container-shell figma-inner grid min-h-[640px] gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Community
            </p>
            <h1 className="mt-6 max-w-[760px] text-[44px] font-medium leading-[1.04] md:text-[76px]">
              Find your people before the moment moves on.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/76 md:text-lg md:leading-8">
              A living circle for corps members, graduates, creatives, founders, and culturally plugged-in young people who want connection beyond one night.
            </p>
            <Button className="mt-8" href={socialLinks.whatsapp} showIcon>
              Join the community
            </Button>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <Image alt="" className="object-cover" fill priority sizes="650px" src="/images/community-good-vibes.png" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.04),rgba(8,11,8,0.7))]" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[18px] border border-white/14 bg-[#081108]/86 p-5 backdrop-blur sm:grid-cols-2">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold text-[#fbfff4]">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#cfe4c8]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid-lines bg-white py-14 md:py-20">
        <div className="container-shell figma-inner">
          <MotionSection>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr]">
              <div>
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  Why join?
                </p>
                <h2 className="mt-4 text-[34px] font-medium leading-tight text-[#082005] md:text-[48px]">
                  Vibes that turn into access.
                </h2>
              </div>
              <div className="grid gap-4">
                {communityBenefits.map((benefit) => (
                  <div className="flex gap-4 rounded-[28px] border border-[#d8e4d2] bg-[#f8fbf4] p-6" key={benefit}>
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#459c0a]" />
                    <p className="text-[18px] font-semibold leading-snug md:text-[21px]">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-grid-lines bg-[#f7f8f2] py-14 md:py-20">
        <div className="container-shell figma-inner">
          <MotionSection>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div className="relative min-h-[480px] overflow-hidden rounded-[26px] border border-[#d8e4d2] bg-[#10240c]">
                <Image alt="" className="object-cover" fill sizes="760px" src="/images/community-party-1.png" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.68))]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-[20px] bg-white/90 p-5 text-[#082005] backdrop-blur">
                  <p className="font-semibold">Inside the community</p>
                  <p className="mt-2 text-sm leading-6 text-[#40563d]">
                    Updates, invites, recaps, warm introductions, and community conversations that keep the experience alive.
                  </p>
                </div>
              </div>
              <div>
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  How it works
                </p>
                <h2 className="mt-4 text-[32px] font-medium leading-tight text-[#082005] md:text-[44px]">
                  Join once. Keep getting pulled into the right rooms.
                </h2>
                <div className="mt-8 grid gap-4">
                  {steps.map(([number, title, body]) => (
                    <div className="rounded-[24px] border border-[#d8e4d2] bg-white p-5" key={title}>
                      <p className="font-mono text-sm font-bold text-[#459c0a]">{number}</p>
                      <h3 className="mt-3 text-xl font-semibold text-[#082005]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#40563d]">{body}</p>
                    </div>
                  ))}
                </div>
                <a className="mt-8 inline-flex items-center gap-2 rounded-[18px] bg-[#459c0a] px-6 py-4 font-semibold text-[#061006] transition hover:-translate-y-0.5 hover:bg-[#5dc716]" href={socialLinks.whatsapp}>
                  Join the WhatsApp community <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>
    </main>
  );
}
