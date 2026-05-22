import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { HomeEventsCarousel, HomeTestimonialsCarousel } from "@/components/home-carousels";
import { MotionSection } from "@/components/motion-section";
import { services, socialLinks, stats } from "@/data/site";

const avatars = [1, 2, 3, 4, 5];

const communityBullets = [
  "Early event updates",
  "Community conversations",
  "Opportunities & collaborations",
  "Shared memories",
];

function FigmaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-tight text-[#1d1d1d] md:text-[12px]">
      {children}
    </span>
  );
}

function GuideSection({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <MotionSection
      className={`relative border-b border-[#dce8d8] bg-white text-[#183814] before:absolute before:bottom-0 before:left-[max(16px,calc((100%-1320px)/2))] before:top-0 before:w-px before:bg-[#dce8d8] after:absolute after:bottom-0 after:right-[max(16px,calc((100%-1320px)/2))] after:top-0 after:w-px after:bg-[#dce8d8] ${className}`}
      id={id}
      style={style}
    >
      {children}
    </MotionSection>
  );
}

export function LandingPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <section className="relative min-h-[680px] overflow-hidden border-b border-[#1e2a1e] md:min-h-screen" id="home">
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

        <div className="container-shell relative z-10 flex min-h-[680px] flex-col justify-center pt-28 md:min-h-screen">
          <div className="max-w-[470px] px-1 md:ml-[48px] md:px-0">
            <h1 className="hero-title text-white">
              Vibes.
              <br />
              Networking.
              <br />
              Opportunity.
            </h1>
            <p className="mt-5 max-w-[468px] text-[15px] leading-[1.6] text-[#d7e4d1] md:text-[16px]">
              A youth cultural community built around NYSC life, post-NYSC transition, entertainment, music, events, shared memories, and real connection.
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <Button className="min-h-[56px] rounded-[18px] px-6 text-[16px] md:min-h-[70px] md:rounded-[20px] md:px-8 md:text-[20px]" href={socialLinks.whatsapp}>
                Join the community
              </Button>
              <Button className="min-h-[56px] rounded-[18px] px-6 text-[16px] md:min-h-[70px] md:rounded-[20px] md:px-5 md:text-[20px]" href="/events" variant="secondary">
                View events
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
        <div className="container-shell figma-inner">
          <div className="mx-auto text-center">
            <FigmaLabel>Our short story</FigmaLabel>
          </div>
          <h2 className="mx-auto mt-6 max-w-[980px] text-center text-[22px] font-semibold leading-[1.24] text-[#183814] md:text-[32px]">
            We&apos;re more than a headcount; <span className="font-bold text-[#459c0a]">we&apos;re a community.</span> We connect ambitious, culturally plugged-in young people who know how to{" "}
            <span className="font-bold text-[#459c0a]">have a good time.</span>
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[70px] xl:gap-[103px]">
            {stats.map((stat) => (
              <div className="max-w-[245px]" key={stat.label}>
                <p className="text-[28px] font-bold leading-none text-[#183814] md:text-[34px]">{stat.value}</p>
                <h3 className="mt-3 text-[16px] font-bold leading-tight text-[#183814] md:text-[18px]">{stat.label}</h3>
                <p className="mt-2 text-[15px] leading-[1.24] text-[#183814] md:text-[16px]">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[60px] md:py-[73px]" id="services">
        <div className="container-shell figma-inner">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div>
              <FigmaLabel>Our services</FigmaLabel>
              <h2 className="section-title mt-5 text-[#082005]">What do we do?</h2>
            </div>
            <p className="max-w-[385px] text-[16px] leading-[1.2] text-[#183814] md:text-[18px]">
              Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
            </p>
            <Button className="min-h-[63px] rounded-[20px] border border-[#041102] bg-transparent px-5 text-[18px] text-[#041102] shadow-none hover:bg-[#041102] hover:text-white" href="/services" variant="ghost">
              View all services
            </Button>
          </div>

          <div className="mt-14 grid auto-rows-[236px] gap-4 sm:auto-rows-[270px] lg:grid-cols-3 lg:auto-rows-[334px] lg:gap-5">
            {services.map((service, index) => {
              const placement =
                index === 2
                  ? "lg:col-start-1 lg:row-start-2"
                  : index === 3
                    ? "lg:col-start-2 lg:row-start-2"
                    : index === 4
                      ? "lg:col-start-3 lg:row-start-1 lg:row-span-2"
                      : "";

              return (
                <article
                  className={`relative flex overflow-hidden rounded-[8px] border border-black/20 bg-[#f7f5f2] p-6 text-[#183814] transition duration-200 hover:-translate-y-1 hover:border-[#459c0a]/50 hover:shadow-[0_20px_55px_rgba(24,56,20,0.1)] ${
                    index === 4 ? "lg:row-span-2" : ""
                  } ${placement}`}
                  key={service.title}
                >
                  <Sparkles className="absolute -right-9 -top-9 size-40 text-[#459c0a]/25" />
                  <span className="text-[22px] font-semibold leading-none md:text-[25px]">{service.number}</span>
                  <div className={`mt-auto max-w-[315px] ${index === 4 ? "lg:pb-2" : ""}`}>
                    <h3 className="text-[21px] font-semibold leading-tight md:text-[25px]">{service.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.34] md:text-[16px]">
                      Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </GuideSection>

      <GuideSection className="overflow-hidden border-b-0 py-[38px] text-white before:bg-white/10 after:bg-white/10" id="events" style={{ backgroundColor: "#0f1c07", color: "#fbfff4" }}>
        <div className="container-shell figma-inner">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[992px]">
              <FigmaLabel>Events</FigmaLabel>
              <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-[69px]">
                <h2 className="section-title text-white">the Bitzsznn experience</h2>
                <p className="max-w-[395px] text-[16px] leading-[1.2] text-[#e5e8e4] md:text-[19px]">
                  Clean posters, clear details, and a direct path into the room.
                </p>
              </div>
            </div>
            <Button className="min-h-[70px] rounded-[22px] border border-[#459c0a] bg-transparent px-5 text-[18px] text-[#459c0a] shadow-none hover:bg-[#459c0a] hover:text-[#041102]" href="/events" variant="ghost">
              View all events
            </Button>
          </div>

          <div className="relative mt-16">
            <button aria-label="Previous event" className="absolute left-0 top-1/2 z-10 hidden size-[67px] -translate-y-1/2 place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 xl:grid">
              <ArrowLeft className="size-7" />
            </button>
            <button aria-label="Next event" className="absolute right-0 top-1/2 z-10 hidden size-[67px] -translate-y-1/2 place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 xl:grid">
              <ArrowRight className="size-7" />
            </button>

            <HomeEventsCarousel />
          </div>
        </div>
      </GuideSection>

      <GuideSection className="border-b-0 py-[64px] text-white before:bg-white/10 after:bg-white/10" style={{ backgroundColor: "#0f1c07", color: "#fbfff4" }}>
        <div className="container-shell figma-inner">
          <div className="grid gap-12 lg:grid-cols-[0.76fr_1fr] lg:items-center">
            <div>
              <FigmaLabel>Community</FigmaLabel>
              <h2 className="section-title mt-4 text-white">
                built around community
              </h2>
              <p className="mt-6 max-w-[541px] text-[18px] leading-[1.2] text-[#e5e8e4] md:text-[20px]">
                The Bitzsznn community is where the energy continues before and after every event. It is where young people connect, share memories, hear about what is next, and find their next circle.
              </p>
              <div className="mt-9 grid max-w-[507px] gap-x-10 gap-y-3 sm:grid-cols-2">
                {communityBullets.map((bullet) => (
                  <div className="flex items-center gap-2 text-[16px] font-medium text-[#f0f1ef] md:text-[18px]" key={bullet}>
                    <CheckCircle2 className="size-4 text-[#d8f7d8]" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-16 min-h-[70px] rounded-[22px] px-8 text-[19px]" href={socialLinks.whatsapp}>
                Join the community
              </Button>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[18px] border border-white/10 bg-[#10180d] shadow-[0_28px_90px_rgba(0,0,0,0.32)] lg:min-h-[500px]">
              <Image
                alt="People enjoying a Bitzsznn community night"
                className="object-cover"
                fill
                sizes="720px"
                src="/images/community-party-1.png"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.04),rgba(8,11,8,0.62))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[16px] border border-white/14 bg-[#0b1208]/82 p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b8ff2c]">Inside the room</p>
                <p className="mt-2 text-[18px] font-semibold leading-snug text-[#fbfff4]">
                  Music, familiar faces, clean memories, and the next connection waiting nearby.
                </p>
              </div>
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection className="overflow-hidden py-[60px] md:py-[83px]">
        <div className="container-shell figma-inner">
          <div className="rounded-[14px] border border-[#9c999947] bg-[#d8f7d8] px-8 py-7 md:px-11">
            <FigmaLabel>Testimonials</FigmaLabel>
            <div className="mt-4 grid gap-6 lg:grid-cols-[321px_1fr] lg:items-center lg:gap-[178px]">
              <h2 className="section-title text-[#082005]">
                real words from
                <br />real people.
              </h2>
              <p className="max-w-[376px] text-[16px] leading-[1.2] text-[#183814] md:text-[18px]">
                Hear what people are saying about the Bitzszn community and events and all.
              </p>
            </div>
          </div>

          <HomeTestimonialsCarousel />
        </div>
      </GuideSection>

      <GuideSection className="py-[80px] md:py-[92px]" id="faq">
        <div className="container-shell figma-inner">
          <div className="mx-auto max-w-[926px]">
            <FigmaLabel>Why choose us?</FigmaLabel>
            <h2 className="section-title mt-4 text-[#082005]">Find quick answers to common questions.</h2>
            <div className="mt-9">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[22px]" id="community">
        <div className="container-shell figma-inner">
          <div className="grid gap-4">
            <div className="grid min-h-[482px] overflow-hidden rounded-[16px] border border-[#9c999947] bg-[#f7f5f2] p-8 md:p-9 lg:grid-cols-[1fr_0.78fr_1.12fr] lg:gap-4">
              <div className="flex flex-col justify-center">
                <h2 className="section-title text-[#082005]">
                  more than a party.
                  <br />a community.
                </h2>
                <p className="mt-6 max-w-[423px] text-[16px] leading-[1.5] text-[#183814]">
                  Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
                </p>
                <Button className="mt-10 min-h-[70px] w-fit rounded-[22px] px-5 text-[20px]" href="/events">
                  Explore events
                </Button>
              </div>
              <div className="relative hidden min-h-[448px] overflow-hidden rounded-[10px] lg:block">
                <Image alt="" className="object-cover" fill sizes="205px" src="/images/community-party-1.png" />
              </div>
              <div className="relative min-h-[360px] overflow-hidden rounded-[10px] lg:min-h-[448px]">
                <Image alt="" className="object-cover" fill sizes="303px" src="/images/community-party-2.png" />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.12fr_1fr]">
              <div className="overflow-hidden rounded-[16px] bg-black p-4 text-white md:p-8">
                <p className="max-w-[649px] text-[17px] leading-[1.5] text-[#c5cec1] md:text-[20px]">
                  Growing, meet new people, and finding their next circle. Represent the moments before they move on.
                </p>
                <div className="relative mt-8 min-h-[297px] overflow-hidden rounded-[10px]">
                  <Image alt="" className="object-cover" fill sizes="681px" src="/images/community-good-vibes.png" />
                  <div className="absolute left-6 top-6 rounded-full border border-white bg-[#1d1d1d] px-5 py-4 text-white">
                    <strong className="text-[22px] font-medium">30+</strong> <span className="text-[16px]">Events Hosted</span>
                  </div>
                  <div className="absolute right-4 top-[46%] rounded-full border border-white bg-[#1d1d1d] px-5 py-4 text-white">
                    <strong className="text-[22px] font-medium">500+</strong> <span className="text-[16px]">Community members</span>
                  </div>
                  <div className="absolute bottom-7 left-[18%] rounded-full border border-white bg-[#1d1d1d] px-5 py-4 text-[16px] text-white">
                    Vibes with value
                  </div>
                </div>
              </div>
              <div className="rounded-[16px] border border-[#9c999947] bg-[#d8f7d8] p-8 md:p-12">
                <h2 className="section-title max-w-[388px] text-black">
                  join the Bitzszn community now!
                </h2>
                <p className="mt-6 max-w-[429px] text-[16px] leading-[1.5] text-[#343a33]">
                  Bitzsznn creates experiences that connect young people through music, events, culture, memories, and opportunity.
                </p>
                <Button className="mt-14 min-h-[70px] rounded-[22px] bg-[#041102] px-5 text-[20px] text-[#edebeb] shadow-none hover:bg-[#10240c]" href={socialLinks.whatsapp}>
                  Join the community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </GuideSection>

    </main>
  );
}
