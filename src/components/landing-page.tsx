import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck2,
  Camera,
  CheckCircle2,
  Handshake,
  MapPin,
  Music2,
  ShieldCheck,
  Sparkles,
  Ticket,
  UsersRound,
} from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { HomeEventsCarousel, HomeTestimonialsCarousel } from "@/components/home-carousels";
import { PremiumIcon } from "@/components/premium-icon";
import { ParallaxImage, Reveal, ScrollProgress } from "@/components/premium-motion";
import { cultureEventPhotos, events, partnerLogos, socialLinks, stats } from "@/data/site";

const avatars = cultureEventPhotos.slice(9, 14);
const tickerLogos = [...partnerLogos, ...partnerLogos];

const promiseCards = [
  {
    icon: Music2,
    title: "Culture-first events",
    body: "Music, hosting, crowd flow, photos, and details planned so the night feels intentional from entry to last song.",
  },
  {
    icon: UsersRound,
    title: "NYSC to next chapter",
    body: "A warmer way for corps members, graduates, creators, and young professionals to find their next circle.",
  },
  {
    icon: Handshake,
    title: "Brand-ready community",
    body: "Partners get credible access to youth culture through moments people actually attend, share, and remember.",
  },
];

const journey = [
  "Pick the event that matches your energy.",
  "Reserve your ticket before the list closes.",
  "Arrive to a hosted experience with music, photos, and warm introductions.",
  "Stay connected through recaps, community updates, and the next invite.",
];

const activationRoutes = [
  "POP parties and service-year send-offs",
  "City link-ups for post-NYSC connection",
  "Creator nights, music events, and cultural pop-ups",
  "Brand activations that feel native to the crowd",
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.14em] ${
        dark
          ? "border border-white/18 bg-white/10 text-white"
          : "border border-[#d4e2cf] bg-white text-[#2f5427]"
      }`}
    >
      {children}
    </span>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`section-grid-lines relative overflow-hidden border-b border-[#dce8d8] ${className}`} id={id}>
      {children}
    </section>
  );
}

export function LandingPage() {
  const featuredEvent = events[0];

  return (
    <main className="overflow-x-clip bg-[#fbfcf8] text-[#071007]">
      <ScrollProgress />

      <section className="relative overflow-hidden bg-[#f7faf3] pt-28 text-[#071007] md:pt-32" id="home">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_22%_10%,rgba(75,165,11,0.22),transparent_32%),linear-gradient(180deg,#ffffff,#f7faf3)]" />
        <div className="container-shell figma-inner relative z-10 grid min-h-[720px] gap-10 pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20">
          <Reveal className="mx-auto max-w-[760px] text-center lg:mx-0 lg:text-left">
            <Eyebrow>Bitzsznn presents culture-led events</Eyebrow>
            <h1 className="hero-title mt-6 max-w-[720px] text-[#071007]">
              Vibes meet opportunity.
            </h1>
            <p className="mt-6 max-w-[610px] text-[16px] leading-8 text-[#33512d] md:text-[18px]">
              Bitzsznn builds premium youth culture experiences for corps members, recent graduates, creators, brands, and the people looking for their next circle.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button className="rounded-[14px] px-6 text-[15px]" href={`/events/${featuredEvent.slug}#tickets`} showIcon>
                Buy ticket
              </Button>
              <Button className="rounded-[14px] border-[#15310f] !bg-white px-6 text-[15px] !text-[#071007] shadow-none hover:!bg-[#071007] hover:!text-white" href="/events" variant="ghost">
                See events
              </Button>
            </div>
            <div className="mt-8 flex max-w-[610px] flex-col gap-4 text-sm leading-6 text-[#33512d] sm:flex-row sm:items-center lg:justify-start">
              <div className="flex shrink-0 -space-x-2">
                {avatars.map((avatar) => (
                  <Image alt="" className="size-9 rounded-full border-2 border-white object-cover shadow-sm" height={40} key={avatar} src={avatar} width={40} />
                ))}
              </div>
              <p className="min-w-0 max-w-[460px]">
                Trusted by young professionals, creators, community builders, artists, and youth-facing brands.
              </p>
            </div>
          </Reveal>

          <Reveal className="relative min-h-[520px]" delay={0.12}>
            <div className="absolute left-[4%] top-4 z-20 rounded-full border border-[#dce8d8] bg-white px-4 py-2 text-sm font-semibold text-[#183814] shadow-[0_16px_50px_rgba(24,56,20,0.12)]">
              500+ community members
            </div>
            <div className="absolute bottom-10 right-0 z-20 hidden rounded-full border border-[#dce8d8] bg-white px-4 py-2 text-sm font-semibold text-[#183814] shadow-[0_16px_50px_rgba(24,56,20,0.12)] sm:block">
              30+ hosted experiences
            </div>
            <ParallaxImage
              alt="Bitzsznn event crowd"
              className="absolute left-0 top-16 h-[380px] w-[58%] overflow-hidden rounded-[18px] border border-white bg-[#071007] shadow-[0_24px_80px_rgba(24,56,20,0.16)]"
              imgClassName="object-cover"
              priority
              sizes="(min-width: 1024px) 42vw, 70vw"
              src={cultureEventPhotos[0]}
            />
            <ParallaxImage
              alt="Bitzsznn party moment"
              className="absolute bottom-0 right-0 h-[390px] w-[58%] overflow-hidden rounded-[18px] border border-white bg-[#071007] shadow-[0_28px_90px_rgba(24,56,20,0.18)]"
              imgClassName="object-cover"
              sizes="(min-width: 1024px) 42vw, 70vw"
              src={cultureEventPhotos[1]}
            />
            <div className="absolute left-[34%] top-[59%] z-30 rounded-[16px] border border-white/80 bg-white/92 p-4 text-[#071007] shadow-[0_22px_70px_rgba(24,56,20,0.16)] backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#3f9108]">Next event</p>
              <p className="mt-2 max-w-[210px] text-lg font-bold leading-tight">{featuredEvent.title}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#40563d]">
                <MapPin className="size-4" strokeWidth={1.8} />
                {featuredEvent.location}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="bg-white py-10">
        <div className="container-shell figma-inner">
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="logo-ticker ticker-pause flex w-max items-center gap-10 py-3">
              {tickerLogos.map((logo, index) => (
                <span
                  aria-label={logo.label}
                  className="partner-ticker-item inline-flex h-[82px] w-[178px] shrink-0 items-center justify-center"
                  key={`${logo.label}-${index}`}
                >
                  <Image
                    alt=""
                    className="partner-ticker-logo h-full w-full object-contain"
                    height={90}
                    src={logo.image}
                    width={190}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-[64px] md:py-[90px]" id="about">
        <div className="container-shell figma-inner">
          <Reveal className="mx-auto max-w-[980px] text-center">
            <Eyebrow>Why Bitzsznn works</Eyebrow>
            <h2 className="section-title mt-5 text-[#071007]">
              Connection feels natural.
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] text-[16px] leading-8 text-[#40563d]">
              We shape the event before doors open: audience, ticketing, entry flow, hosting, content, music, and post-event community.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal className="lift-card rounded-[16px] border border-[#dce8d8] bg-[#fbfcf8] p-5" delay={index * 0.04} key={stat.label}>
                <p className="text-[30px] font-extrabold leading-none text-[#071007] md:text-[36px]">
                  <AnimatedNumber value={stat.value} />
                </p>
                <h3 className="mt-4 text-[15px] font-bold leading-tight text-[#183814]">{stat.label}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#40563d]">{stat.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[#f7faf3] py-[64px] md:py-[92px]" id="services">
        <div className="container-shell figma-inner">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <Reveal>
              <h2 className="section-title max-w-[620px] text-[#071007]">
                Plan the event.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-[620px] text-[16px] leading-8 text-[#40563d]">
                From POP parties to creator pop-ups and brand activations, Bitzsznn gives young culture a premium system: clear tickets, better energy, strong visuals, and a crowd that understands why they showed up.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {promiseCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal className="lift-card rounded-[16px] border border-[#dce8d8] bg-white p-6" delay={index * 0.06} key={card.title}>
                  <PremiumIcon icon={Icon} tone="green" />
                  <h3 className="mt-7 text-[20px] font-bold leading-tight text-[#071007]">{card.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#40563d]">{card.body}</p>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="relative min-h-[360px] overflow-hidden rounded-[18px] border border-[#dce8d8] bg-[#071007] p-6 text-white md:p-8">
              <ParallaxImage
                alt="People at a Bitzsznn experience"
                className="absolute inset-0"
                imgClassName="object-cover opacity-70"
                sizes="(min-width: 1024px) 58vw, 100vw"
                src="/images/events/meet-your-people-panel.jpg"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,7,0.9),rgba(7,16,7,0.42),rgba(7,16,7,0.7))]" />
              <div className="relative z-10 max-w-[520px]">
                <Eyebrow dark>For guests</Eyebrow>
                <h3 className="mt-5 text-[26px] font-bold leading-tight md:text-[34px]">Meet your people.</h3>
                <p className="mt-4 text-[16px] leading-8 text-[#edf6e9]">
                  Every event is designed to be easy to enter, easy to enjoy, and easy to remember.
                </p>
              </div>
            </Reveal>
            <Reveal className="rounded-[18px] border border-[#dce8d8] bg-white p-6 md:p-8" delay={0.08}>
              <h3 className="text-[24px] font-bold leading-tight text-[#071007]">Best-fit activations</h3>
              <div className="mt-6 grid gap-3">
                {activationRoutes.map((route) => (
                  <div className="flex gap-3 rounded-[14px] border border-[#e3eadf] bg-[#fbfcf8] p-4 text-[15px] font-semibold text-[#183814]" key={route}>
                    <PremiumIcon className="mt-0.5" icon={CheckCircle2} size="sm" tone="green" />
                    <span>{route}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-[#071007] py-[64px] text-white md:py-[92px]" id="events">
        <div className="container-shell figma-inner">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow dark>Tickets and events</Eyebrow>
              <h2 className="section-title mt-5 max-w-[520px] text-white">Next events.</h2>
            </div>
            <Link
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-[#b8ff2c] px-5 py-2.5 text-sm font-bold !text-[#071007] shadow-none transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#b8ff2c]"
              href="/events"
            >
              View all events
            </Link>
          </Reveal>
          <HomeEventsCarousel />
        </div>
      </Section>

      <Section className="bg-white py-[64px] md:py-[92px]">
        <div className="container-shell figma-inner grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <Reveal className="relative min-h-[480px] overflow-hidden rounded-[18px] border border-[#dce8d8] bg-[#071007]">
            <ParallaxImage
              alt="Bitzsznn good vibes only"
              className="absolute inset-0"
              imgClassName="object-cover object-center"
              sizes="(min-width: 1024px) 46vw, 100vw"
              src="/images/events/pop-rave-dj-booth-wide.jpg"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>How it flows</Eyebrow>
            <h2 className="section-title mt-5 max-w-[520px] text-[#071007]">Easy entry.</h2>
            <div className="mt-8 grid gap-4">
              {journey.map((item, index) => (
                <div className="grid gap-4 rounded-[16px] border border-[#dce8d8] bg-[#fbfcf8] p-5 sm:grid-cols-[56px_1fr]" key={item}>
                  <span className="grid size-12 place-items-center rounded-full bg-[#071007] text-sm font-bold text-white">0{index + 1}</span>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#071007]">{item}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-[#40563d]">
                      {index === 0 && "Event pages make the date, city, audience, and value clear before anyone taps buy."}
                      {index === 1 && "Ticket CTAs stay direct and visible because conversion should never feel hidden."}
                      {index === 2 && "The event is hosted, photographed, and shaped for social comfort."}
                      {index === 3 && "The night becomes proof, content, and the next reason to return."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white py-[64px] md:py-[92px]">
        <div className="container-shell figma-inner">
          <Reveal className="mb-10 max-w-3xl">
            <Eyebrow>Community proof</Eyebrow>
            <h2 className="section-title mt-5 text-[#071007]">People feel seen.</h2>
          </Reveal>
          <Reveal>
            <HomeTestimonialsCarousel />
          </Reveal>
        </div>
      </Section>

      <Section className="bg-[#071007] py-[64px] text-white md:py-[92px]" id="community">
        <div className="container-shell figma-inner grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Reveal>
            <Eyebrow dark>Join the community</Eyebrow>
            <h2 className="section-title mt-5 max-w-[520px] text-white">Get early drops.</h2>
            <p className="mt-5 max-w-[620px] text-[16px] leading-8 text-[#edf6e9]">
              Come for the event. Stay for the people, opportunities, and memories that travel after the night ends.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-[14px] px-6 text-[15px]" href={socialLinks.whatsapp} showIcon>
                Join the community
              </Button>
              <Button className="rounded-[14px] border-white/30 bg-transparent px-6 text-[15px] text-white shadow-none hover:bg-white hover:text-[#071007]" href="/contact" variant="ghost">
                Partner with us
              </Button>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-3" delay={0.08}>
            {[
              { icon: Ticket, label: "Ticketing" },
              { icon: CalendarCheck2, label: "Hosted flow" },
              { icon: Camera, label: "Recap content" },
              { icon: ShieldCheck, label: "Premium crowd" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="rounded-[16px] border border-white/12 bg-white/8 p-5" key={item.label}>
                  <PremiumIcon icon={Icon} tone="dark" />
                  <p className="mt-5 text-[18px] font-bold text-white">{item.label}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white py-[64px] md:py-[92px]" id="faq">
        <div className="container-shell figma-inner">
          <Reveal className="mx-auto max-w-[926px]">
            <Eyebrow>Quick answers</Eyebrow>
            <h2 className="section-title mt-5 text-[#071007]">Before you enter.</h2>
            <div className="mt-9">
              <FaqAccordion />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-b-0 bg-[#f7faf3] py-[28px]">
        <div className="container-shell figma-inner">
          <Reveal className="grid overflow-hidden rounded-[18px] border border-[#dce8d8] bg-white shadow-[0_24px_80px_rgba(24,56,20,0.08)] lg:grid-cols-[1fr_0.82fr]">
            <div className="p-6 md:p-10">
              <PremiumIcon icon={Sparkles} size="lg" tone="green" />
              <h2 className="section-title mt-5 max-w-[520px] text-[#071007]">Enter the event.</h2>
              <p className="mt-4 max-w-[560px] text-[16px] leading-8 text-[#40563d]">
                Buy the next ticket, bring your people, or talk to us about building a culture-led activation for your audience.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-[14px] px-6 text-[15px]" href={`/events/${featuredEvent.slug}#tickets`}>
                  Buy ticket
                </Button>
                <Button className="rounded-[14px] border-[#15310f] !bg-white px-6 text-[15px] !text-[#071007] shadow-none hover:!bg-[#071007] hover:!text-white" href="/contact" variant="ghost">
                  See details
                </Button>
              </div>
            </div>
            <div className="relative min-h-[320px] bg-[#071007]">
              <Image
                alt="Bitzsznn community party"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                src={cultureEventPhotos[8]}
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
