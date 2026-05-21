import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { MotionSection } from "@/components/motion-section";
import { services, socialLinks, stats } from "@/data/site";

const avatars = [1, 2, 3, 4, 5];

const eventCards = [
  { status: "Upcoming", muted: false },
  { status: "Upcoming", muted: false, featured: true },
  { status: "Past event", muted: true },
  { status: "Past event", muted: true },
];

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
        <div className="container-shell figma-inner">
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

      <GuideSection className="py-[22px]" id="community">
        <div className="container-shell figma-inner">
          <div className="grid gap-4">
            <div className="grid min-h-[482px] overflow-hidden rounded-[16px] border border-[#9c999947] bg-[#f7f5f2] p-8 md:p-9 lg:grid-cols-[1fr_0.78fr_1.12fr] lg:gap-4">
              <div className="flex flex-col justify-center">
                <h2 className="text-[38px] font-medium leading-none text-[#082005] md:text-[50px]">
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
                <p className="max-w-[649px] text-[20px] leading-normal text-[#afb5ae] md:text-[24px]">
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
                <h2 className="max-w-[388px] text-[40px] font-medium leading-none text-black md:text-[50px]">
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

      <GuideSection className="py-[60px] md:py-[73px]" id="services">
        <div className="container-shell figma-inner">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div>
              <FigmaLabel>Our services</FigmaLabel>
              <h2 className="mt-5 text-[34px] font-medium leading-none text-[#082005] md:text-[45px]">What do we do?</h2>
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

      <GuideSection className="overflow-hidden border-b-0 bg-[#0f1c07] py-[38px] text-white before:bg-white/10 after:bg-white/10" id="events">
        <div className="container-shell figma-inner">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[992px]">
              <FigmaLabel>Events</FigmaLabel>
              <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-[69px]">
                <h2 className="text-[36px] font-medium leading-none text-white md:text-[47px]">the Bitzsznn experience</h2>
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

            <div className="no-scrollbar -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-2">
              {eventCards.map((event, index) => (
                <article
                  className={`shrink-0 snap-center overflow-hidden rounded-t-[16px] rounded-b-[8px] bg-[#0c1605] ${
                    event.featured ? "w-[min(82vw,446px)]" : "w-[min(78vw,373px)]"
                  }`}
                  key={`${event.status}-${index}`}
                >
                  <div className={`bg-[#eee] p-6 ${event.featured ? "min-h-[140px]" : "min-h-[117px]"}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-center leading-none text-[#332d2d]">
                        <p className="font-mono text-[12px]">MAY</p>
                        <p className="mt-1 text-[20px] font-medium">21</p>
                      </div>
                      <div className="h-10 w-px bg-[#a9a9a9]" />
                      <h3 className={`${event.featured ? "text-[24px]" : "text-[20px]"} font-semibold text-[#282f27]`}>
                        Batch A2 POP Party
                      </h3>
                    </div>
                    <p className="mt-2 max-w-[400px] text-[13px] leading-[1.35] text-[#6d6666] md:text-[15px]">
                      A social experience for good music, new faces, and shared memories...
                    </p>
                  </div>
                  <div className={`relative ${event.featured ? "h-[372px]" : "h-[311px]"}`}>
                    <Image alt="" className="object-cover" fill sizes="446px" src="/images/event-good-vibes.png" />
                    <span className="absolute right-6 top-4 rounded-full border border-white bg-[#c8f6aa] px-3 py-1 text-[10px] text-[#090e09]">
                      {event.status}
                    </span>
                    <div className="absolute bottom-8 left-1/2 flex w-[82%] -translate-x-1/2 gap-2">
                      <Button className={`min-h-0 flex-1 rounded-[20px] px-4 py-2 text-[15px] ${event.muted ? "bg-[#ede8de] text-[#8a8173] shadow-none hover:bg-[#ede8de]" : "bg-black text-white shadow-none hover:bg-[#111]"}`} href="/tickets">
                        Buy ticket
                      </Button>
                      <Button className="min-h-0 flex-1 rounded-[20px] bg-[#eee] px-4 py-2 text-[15px] text-black shadow-none hover:bg-white" href="/events" variant="secondary">
                        View details
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection className="border-b-0 bg-[#0f1c07] py-[74px] text-white before:bg-white/10 after:bg-white/10">
        <div className="container-shell figma-inner">
          <div className="grid gap-12 lg:grid-cols-[0.76fr_1fr] lg:items-center">
            <div>
              <FigmaLabel>Community</FigmaLabel>
              <h2 className="mt-4 text-[38px] font-medium leading-none text-white md:text-[50px]">
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
            <div className="min-h-[360px] rounded-[10px] bg-[#d8f7d8] lg:min-h-[529px]" />
          </div>
        </div>
      </GuideSection>

      <GuideSection className="overflow-hidden py-[60px] md:py-[83px]">
        <div className="container-shell figma-inner">
          <div className="rounded-[14px] border border-[#9c999947] bg-[#d8f7d8] px-8 py-7 md:px-11">
            <FigmaLabel>Testimonials</FigmaLabel>
            <div className="mt-4 grid gap-6 lg:grid-cols-[321px_1fr] lg:items-center lg:gap-[178px]">
              <h2 className="text-[38px] font-medium leading-none text-[#082005] md:text-[44px]">
                real words from
                <br />real people.
              </h2>
              <p className="max-w-[376px] text-[16px] leading-[1.2] text-[#183814] md:text-[18px]">
                Hear what people are saying about the Bitzszn community and events and all.
              </p>
            </div>
          </div>

          <div className="relative mt-6">
            <div className="no-scrollbar -mx-8 flex snap-x gap-[71px] overflow-x-auto px-8 pb-10">
              {[0, 1, 2].map((item) => (
                <article
                  className={`flex w-[min(82vw,601px)] shrink-0 snap-center gap-5 transition ${item === 1 ? "opacity-100" : "opacity-40"}`}
                  key={item}
                >
                  <Quote className="mt-1 size-10 shrink-0 fill-[#131010] text-[#131010]" />
                  <div className="max-w-[540px]">
                    <div className="flex gap-2 text-[#459c0a]">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star className="size-5 fill-current" key={star} />
                      ))}
                    </div>
                    <p className="mt-4 text-[22px] font-semibold leading-normal text-[#343933] md:text-[25px]">
                      Bitzsznn feels bigger than a regular event. You meet people, enjoy the night, and still feel connected after.
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <div className="size-[54px] rounded bg-[#a0c1f2]" />
                      <div>
                        <p className="text-[18px] font-semibold text-[#183814]">Amaka E.</p>
                        <p className="mt-1 text-[18px] font-medium text-[#434d42]">Community Member</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              <button aria-label="Previous testimonial" className="grid size-[54px] place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 md:size-[67px]">
                <ArrowLeft className="size-6" />
              </button>
              <button aria-label="Next testimonial" className="grid size-[54px] place-items-center rounded-full bg-[#459c0a] text-[#041102] transition hover:scale-105 md:size-[67px]">
                <ArrowRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection className="py-[80px] md:py-[92px]" id="faq">
        <div className="container-shell figma-inner">
          <div className="mx-auto max-w-[926px]">
            <FigmaLabel>Why choose us?</FigmaLabel>
            <h2 className="mt-4 text-[36px] font-medium leading-tight text-[#082005] md:text-[44px]">Find quick answers to common questions.</h2>
            <div className="mt-9">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </GuideSection>

      <footer className="relative overflow-hidden border-t border-white/10 bg-[#111] py-20 text-white md:py-[108px]" id="contact">
        <p className="pointer-events-none absolute bottom-[-88px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[120px] leading-none text-[rgba(189,175,175,0.1)] md:text-[251px]">
          BITZSZNN
        </p>
        <div className="container-shell figma-inner relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="max-w-[494px]">
              <h2 className="text-[58px] font-normal leading-[0.99] md:text-[82px]">
                Vibes.
                <br />
                Networking.
                <br />
                Opportunity.
              </h2>
              <p className="mt-5 max-w-[477px] text-[16px] leading-normal text-[#d7dbd4]">
                A youth cultural community for corps members, creatives, builders, artists, and storytellers shaping moments that move people.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[14px] font-bold uppercase text-[#459c0a] md:text-[17px]">Links</p>
                <div className="mt-3 grid gap-2 text-[16px] font-extralight text-white md:text-[17px]">
                  <Link href="/services">Services</Link>
                  <Link href="/events">Event</Link>
                  <Link href="/#community">Community</Link>
                  <Link href="/about">About Us</Link>
                </div>
              </div>
              <div>
                <p className="font-mono text-[14px] font-bold uppercase text-[#459c0a] md:text-[17px]">Actions</p>
                <div className="mt-3 grid gap-2 text-[16px] font-extralight text-white md:text-[17px]">
                  <a href={socialLinks.whatsapp}>Join the Community</a>
                  <Link href="#contact">Contact US</Link>
                  <Link href="/tickets">Buy Ticket</Link>
                </div>
              </div>
              <div>
                <p className="font-mono text-[14px] font-bold uppercase text-[#459c0a] md:text-[17px]">Social</p>
                <div className="mt-3 grid gap-2 text-[16px] font-extralight text-white md:text-[17px]">
                  <a href={socialLinks.instagram}>Instagram</a>
                  <a href={socialLinks.instagram}>TikTok</a>
                  <a href={socialLinks.instagram}>X/Twitter</a>
                  <a href={socialLinks.whatsapp}>WhatsApp</a>
                </div>
              </div>
              <div>
                <p className="font-mono text-[14px] font-bold uppercase text-[#459c0a] md:text-[17px]">Contact</p>
                <p className="mt-3 text-[16px] font-extralight text-white md:text-[17px]">{socialLinks.email}</p>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[14px] text-white">© Bitzsznn 2026. All rights reserved.</p>
            <Button className="w-fit rounded-[20px] px-7 py-4 text-[17px]" href={socialLinks.whatsapp}>
              Join the community
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
}
