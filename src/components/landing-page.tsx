import Image from "next/image";
import {
  Bot,
  MessageCircle,
  RefreshCcw,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { MotionSection } from "@/components/motion-section";
import { SiteHeader } from "@/components/site-header";
import { services, socialLinks, stats } from "@/data/site";

const avatars = [1, 2, 3, 4, 5];

const valueCards = [
  {
    icon: UsersRound,
    title: "Speed without compromise",
    body: "Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.",
  },
  {
    icon: MessageCircle,
    title: "Speed without compromise",
    body: "Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.",
  },
  {
    icon: RefreshCcw,
    title: "Speed without compromise",
    body: "Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.",
  },
  {
    icon: Bot,
    title: "Speed without compromise",
    body: "Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.",
  },
];

const whyItems = [
  {
    title: "Scenic Routes",
    body: "Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.",
  },
  {
    title: "Scenic Routes",
    body: "Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.",
  },
  {
    title: "Scenic Routes",
    body: "Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.",
  },
];

function FigmaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-tight text-[#1d1d1d] md:text-[13px]">
      {children}
    </span>
  );
}

function GuideSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <MotionSection
      className={`relative border-b border-[#dce8d8] bg-white text-[#183814] before:absolute before:bottom-0 before:left-[max(16px,calc((100%-1320px)/2))] before:top-0 before:w-px before:bg-[#dce8d8] after:absolute after:bottom-0 after:right-[max(16px,calc((100%-1320px)/2))] after:top-0 after:w-px after:bg-[#dce8d8] ${className}`}
      id={id}
    >
      {children}
    </MotionSection>
  );
}

export function LandingPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <SiteHeader />

      <section className="relative min-h-[780px] overflow-hidden border-b border-[#1e2a1e] md:min-h-screen" id="home">
        <Image
          alt="Bitzsznn community at an event"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/hero-crowd.png"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,8,0.84),rgba(8,11,8,0.12),rgba(8,11,8,0.5))]" />
        <div className="absolute inset-0 bg-[#459c0a]/20 mix-blend-multiply" />

        <div className="container-shell relative z-10 flex min-h-[780px] flex-col justify-center pt-28 md:min-h-screen">
          <div className="max-w-[470px] md:ml-[48px]">
            <h1 className="text-[52px] font-black leading-[0.99] tracking-normal text-white sm:text-[64px] lg:text-[72px]">
              Vibes.
              <br />
              Networking.
              <br />
              Opportunity.
            </h1>
            <p className="mt-5 max-w-[468px] text-[16px] leading-[1.5] text-[#c1d5bf]">
              A youth cultural community built around NYSC life, post-NYSC transition, entertainment, music, events, shared memories, and real connection.
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <Button className="min-h-[70px] rounded-[20px] px-8 text-[20px]" href={socialLinks.whatsapp}>
                Join the community
              </Button>
              <Button className="min-h-[70px] rounded-[20px] px-5 text-[20px]" href="#events" variant="secondary">
                Explore events
              </Button>
            </div>
          </div>

          <div className="mt-16 max-w-[331px] text-center text-[16px] leading-6 text-white md:absolute md:bottom-[58px] md:left-1/2 md:mt-0 md:-translate-x-1/2">
            <p>
              <strong>+50 trusted partners</strong> and 4,000 people have gotten an unforgettable experience.
            </p>
            <div className="mt-5 flex justify-center -space-x-2">
              {avatars.map((avatar) => (
                <Image
                  alt=""
                  className="size-9 rounded-full border-2 border-white object-cover"
                  height={40}
                  key={avatar}
                  src={`/images/avatar-${avatar}.png`}
                  width={40}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <GuideSection className="py-[64px] md:py-[90px]" id="about">
        <div className="container-shell">
          <div className="mx-auto text-center">
            <FigmaLabel>Our short story</FigmaLabel>
          </div>
          <h2 className="mx-auto mt-6 max-w-[1198px] text-center text-[30px] font-semibold leading-[1.14] text-[#183814] md:text-[40px]">
            We&apos;re more than a headcount; <span className="font-bold text-[#459c0a]">we&apos;re a community.</span> We connect ambitious, culturally plugged-in young people who know how to{" "}
            <span className="font-bold text-[#459c0a]">have a good time.</span>
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[70px] xl:gap-[103px]">
            {stats.map((stat) => (
              <div className="max-w-[245px]" key={stat.label}>
                <p className="text-[46px] font-bold leading-none text-[#183814] md:text-[50px]">{stat.value}</p>
                <h3 className="mt-3 text-[18px] font-bold leading-tight text-[#183814] md:text-[20px]">{stat.label}</h3>
                <p className="mt-2 text-[15px] leading-[1.24] text-[#183814] md:text-[16px]">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[60px] md:py-[98px]" id="community">
        <div className="container-shell">
          <div className="rounded-[15px] border border-black/10 bg-[#d8f7d8] p-8 md:p-[46px]">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <FigmaLabel>Our values</FigmaLabel>
                <h2 className="mt-5 max-w-[420px] text-[38px] font-medium leading-none text-[#082005] md:text-[46px]">
                  more than a party.
                  <br />a community.
                </h2>
              </div>
              <p className="max-w-[395px] text-[18px] leading-[1.2] text-[#183814]">
                Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
              </p>
              <Button className="min-h-[66px] rounded-[20px] bg-[#041102] px-6 text-[18px] text-[#edebeb] hover:bg-[#10240c]" href="#about">
                Our manifesto
              </Button>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[0.92fr_1.38fr]">
            <div className="relative min-h-[394px] overflow-hidden rounded-[15px] md:min-h-[554px]">
              <Image
                alt="Good vibes only shirt at a Bitzsznn event"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 502px"
                src="/images/values-good-vibes.png"
              />
              <div className="absolute left-[20%] top-[20%] rounded-full border border-white bg-[#1d1d1d] px-5 py-4 text-white md:left-[104px] md:top-[82px]">
                <strong className="text-[22px] font-medium">30+</strong> <span className="text-[16px]">Events Hosted</span>
              </div>
              <div className="absolute right-3 top-[42%] rounded-full border border-white bg-[#1d1d1d] px-5 py-4 text-white md:right-2">
                <strong className="text-[22px] font-medium">500+</strong> <span className="text-[16px]">Community members</span>
              </div>
              <div className="absolute bottom-[60px] left-[58px] rounded-full border border-white bg-[#1d1d1d] px-5 py-4 text-[16px] text-white">
                Vibes with value
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {valueCards.map((value, index) => {
                const Icon = value.icon;
                return (
                  <article className="min-h-[190px] rounded-[8px] border border-black/20 bg-white p-5 text-[#183814] md:min-h-[271px]" key={`${value.title}-${index}`}>
                    <Icon className="size-6 stroke-[1.5] text-[#041102]" />
                    <h3 className="mt-16 text-[17px] font-bold leading-tight">{value.title}</h3>
                    <p className="mt-2 max-w-[278px] text-[15px] leading-[1.2]">{value.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[64px] md:py-[73px]" id="services">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div>
              <FigmaLabel>Our services</FigmaLabel>
              <h2 className="mt-5 text-[38px] font-medium leading-none text-[#082005] md:text-[46px]">What do we do?</h2>
            </div>
            <p className="max-w-[385px] text-[18px] leading-[1.2] text-[#183814]">
              Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
            </p>
            <Button className="min-h-[63px] rounded-[20px] bg-[#041102] px-5 text-[18px] text-[#edebeb] hover:bg-[#10240c]" href="#services">
              View all services
            </Button>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  className={`relative overflow-hidden rounded-[20px] border border-black/10 bg-[#d8f7d8] p-6 text-[#183814] ${index === 4 ? "lg:row-span-2 lg:min-h-[681px]" : "min-h-[334px]"}`}
                  key={service.title}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[17px] font-bold">{service.number}</span>
                    <Sparkles className="absolute -right-8 -top-9 size-40 text-[#459c0a]/20" />
                  </div>
                  <div className={index === 4 ? "mt-[330px]" : "mt-28"}>
                    <Icon className="mb-4 size-6 text-[#459c0a]" />
                    <h3 className="text-[17px] font-bold leading-tight">{index < 2 ? "Long-Form Video Editing" : service.title}</h3>
                    <p className="mt-3 max-w-[315px] text-[15px] leading-[1.45]">
                      Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[70px] md:py-[90px]" id="events">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.35fr] lg:items-center">
            <div>
              <FigmaLabel>Why choose us?</FigmaLabel>
              <h2 className="mt-5 text-[38px] font-medium leading-none text-[#082005] md:text-[46px]">unique experience</h2>
              <p className="mt-4 max-w-[398px] text-[18px] leading-[1.25] text-[#183814]">
                Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
              </p>
            </div>
            <div className="grid gap-8">
              {whyItems.map((item, index) => (
                <article className="border-b border-[#c9d9c4] pb-7" key={`${item.title}-${index}`}>
                  <div className="flex gap-6">
                    <span className="w-8 text-[17px] font-bold text-[#183814]">0{index + 1}</span>
                    <div>
                      <h3 className="text-[17px] font-bold text-[#183814]">{item.title}</h3>
                      <p className="mt-4 max-w-[571px] text-[16px] leading-[1.4] text-[#183814]">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[80px] md:py-[92px]" id="faq">
        <div className="container-shell">
          <div className="mx-auto max-w-[926px]">
            <FigmaLabel>Why choose us?</FigmaLabel>
            <h2 className="mt-4 text-[36px] font-medium leading-tight text-[#082005] md:text-[44px]">Find quick answers to common questions.</h2>
            <div className="mt-9">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[70px]" id="contact">
        <div className="container-shell">
          <div className="relative min-h-[420px] overflow-hidden rounded-[20px] bg-[#183814] p-8 text-white md:p-12">
            <div className="absolute inset-0 opacity-25">
              <Image alt="" className="object-cover" fill sizes="100vw" src="/images/hero-crowd.png" />
            </div>
            <div className="relative z-10 max-w-[429px]">
              <h2 className="text-[42px] font-medium leading-[1.2]">join the Bitzszn community now!</h2>
              <p className="mt-5 text-[18px] leading-[1.35] text-[#d7e8d5]">
                Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
              </p>
              <Button className="mt-16 min-h-[70px] rounded-[20px] px-5 text-[20px]" href={socialLinks.whatsapp}>
                Join the community
              </Button>
            </div>
          </div>
        </div>
      </GuideSection>

      <footer className="border-t border-[#dce8d8] bg-white py-8 text-[#183814]">
        <div className="container-shell flex flex-col justify-between gap-4 text-sm md:flex-row">
          <p>Bitzsznn. Vibes. Networking. Opportunity.</p>
          <p>Built around NYSC, entertainment, memories, connection, and transition.</p>
        </div>
      </footer>
    </main>
  );
}
