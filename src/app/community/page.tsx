import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles, UsersRound } from "lucide-react";
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

const communitySteps = [
  {
    title: "Join the circle",
    body: "Get plugged into updates, community drops, and the next room before it goes public.",
    icon: UsersRound,
  },
  {
    title: "Show up with ease",
    body: "Find events, people, and prompts that make conversation feel natural from the first hour.",
    icon: Sparkles,
  },
  {
    title: "Stay connected",
    body: "Keep the memories, recaps, intros, and collaboration energy moving after the night.",
    icon: MessageCircle,
  },
];

export default function CommunityPage() {
  return (
    <main className="bg-[#f7f5f2] text-[#183814]">
      <section className="section-grid-lines bg-[#0f1c07] pt-28 text-white md:pt-36">
        <div className="container-shell figma-inner grid min-h-[660px] gap-10 py-14 md:py-20 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Community
            </p>
            <h1 className="hero-title mt-6">
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
          <div className="relative min-h-[420px] overflow-hidden rounded-[18px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <Image alt="" className="object-cover" fill sizes="650px" src="/images/community-good-vibes.png" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.58))]" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[16px] border border-white/14 bg-[#081108]/82 p-5 backdrop-blur sm:grid-cols-2">
              <div>
                <p className="text-3xl font-semibold text-[#fbfff4]">500+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#cfe4c8]">community members</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#fbfff4]">30+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#cfe4c8]">experiences hosted</p>
              </div>
            </div>
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
                <h2 className="section-title mt-4">Vibes that turn into access.</h2>
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

      <section className="section-grid-lines bg-[#f7f8f2] py-16 md:py-24">
        <div className="container-shell figma-inner">
          <MotionSection>
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-center">
              <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-[#d8e4d2]">
                <Image alt="" className="object-cover" fill sizes="620px" src="/images/community-party-1.png" />
              </div>
              <div>
                <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
                  How it works
                </p>
                <h2 className="section-title mt-4 max-w-2xl text-[#10240c]">
                  The community keeps the event alive.
                </h2>
                <div className="mt-8 grid gap-4">
                  {communitySteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div className="group flex gap-4 rounded-[20px] border border-[#d8e4d2] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#459c0a]/50" key={step.title}>
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d8f7d8] text-[#183814] transition group-hover:bg-[#459c0a] group-hover:text-[#061006]">
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold text-[#10240c]">{step.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[#39533a]">{step.body}</p>
                        </div>
                      </div>
                    );
                  })}
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
