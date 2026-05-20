import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { MotionSection } from "@/components/motion-section";
import { SiteHeader } from "@/components/site-header";
import {
  eventHighlights,
  reasons,
  services,
  socialLinks,
  stats,
  upcomingEvent,
  values,
} from "@/data/site";

const avatars = [1, 2, 3, 4, 5];

export function LandingPage() {
  const EventIcon = upcomingEvent.icon;
  const PinIcon = upcomingEvent.pinIcon;

  return (
    <main className="overflow-x-hidden">
      <SiteHeader />

      <section className="relative min-h-[780px] overflow-hidden border-b border-border md:min-h-screen" id="home">
        <Image
          alt="Bitzsznn community at an event"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/hero-crowd.png"
        />
        <div className="absolute inset-0 bg-[var(--image-overlay)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(184,255,44,0.2),transparent_24rem)]" />

        <div className="container-shell relative z-10 flex min-h-[780px] flex-col justify-center pt-28 md:min-h-screen">
          <div className="max-w-xl">
            <h1 className="text-balance text-5xl font-black leading-[0.98] tracking-normal text-white md:text-7xl lg:text-[82px]">
              Vibes. Networking. Opportunity.
            </h1>
            <p className="mt-5 max-w-[520px] text-base leading-7 text-muted-foreground">
              Bitzsznn creates cultural experiences for NYSC and post-NYSC young people, turning shared moments into connection, memories, and access.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={socialLinks.whatsapp}>Join the community</Button>
              <Button href="#events" variant="secondary">
                Explore events
              </Button>
            </div>
          </div>

          <div className="mt-16 max-w-sm text-center text-sm leading-6 text-white md:absolute md:bottom-16 md:left-1/2 md:mt-0 md:-translate-x-1/2">
            <p>
              <strong>+50 trusted partners</strong> and 4,000 people have gotten an unforgettable experience.
            </p>
            <div className="mt-4 flex justify-center -space-x-2">
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

      <MotionSection className="section-grid-lines border-b border-border py-20 md:py-28" id="about">
        <div className="container-shell">
          <div className="mx-auto mb-10 w-fit rounded-full border border-border bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Our short story
          </div>
          <h2 className="text-balance max-w-6xl text-4xl font-black leading-tight md:text-6xl">
            We represent the moments before they move on.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            More than a headcount and bigger than one party, Bitzsznn connects ambitious, culturally plugged-in young people who know how to have a good time and still want something meaningful from the room.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div className="border-t border-border pt-6" key={stat.label}>
                <p className="text-5xl font-black text-primary md:text-6xl">{stat.value}</p>
                <h3 className="mt-4 font-bold text-foreground">{stat.label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-grid-lines border-b border-border py-20 md:py-28" id="community">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <div className="mb-6 w-fit rounded-full border border-border bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Our values
              </div>
              <h2 className="text-balance text-4xl font-black leading-tight md:text-6xl">
                More than a party. A community.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              We build culture where fun meets opportunity: music, events, creators, partners, memories, and rooms where young people can actually connect.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="group relative min-h-[540px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-soft)]">
              <img
                alt="Friends at a premium nightlife event"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1300&q=85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">500+ community members</span>
                <span className="rounded-full bg-white px-4 py-3 text-sm font-bold text-[#111611]">Vibes with value</span>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article
                    className="group rounded-[var(--radius-card)] border border-border bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:border-primary/45 hover:bg-surface-elevated hover:shadow-[var(--shadow-lift)]"
                    key={value.title}
                  >
                    <Icon className="size-7 text-primary" />
                    <h3 className="mt-16 text-lg font-bold">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-grid-lines border-b border-border py-20 md:py-28" id="services">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-6 w-fit rounded-full border border-border bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Our services
              </div>
              <h2 className="text-4xl font-black md:text-6xl">What do we do?</h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              From cultural nights to branded activations, we create experiences that feel alive in the moment and useful after.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  className={`group min-h-[320px] rounded-[var(--radius-card)] border border-border bg-surface p-7 transition duration-200 hover:-translate-y-1 hover:border-primary/45 hover:bg-surface-elevated ${index === 4 ? "xl:min-h-[660px]" : ""}`}
                  key={service.title}
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-bold text-muted-foreground">{service.number}</span>
                    <Icon className="size-7 text-accent" />
                  </div>
                  <div className={index === 4 ? "xl:mt-[390px]" : "mt-28"}>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-grid-lines border-b border-border py-20 md:py-28">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative min-h-[420px] overflow-hidden rounded-[var(--radius-card)] border border-border">
              <img
                alt="Crowd dancing under concert lights"
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1300&q=85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div>
              <div className="mb-6 w-fit rounded-full border border-border bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Why choose us?
              </div>
              <h2 className="text-balance text-4xl font-black leading-tight md:text-6xl">A unique experience for a unique season.</h2>
              <div className="mt-8 divide-y divide-border">
                {reasons.map((reason, index) => (
                  <div className="py-6" key={reason.title}>
                    <div className="flex gap-5">
                      <span className="font-bold text-primary">0{index + 1}</span>
                      <div>
                        <h3 className="font-bold">{reason.title}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{reason.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-grid-lines border-b border-border py-20 md:py-28" id="events">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface shadow-[var(--shadow-soft)]">
            <img
              alt="Bitzsznn event stage lights"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,8,0.94),rgba(8,11,8,0.58),rgba(8,11,8,0.82))]" />
            <div className="relative z-10 grid min-h-[640px] gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_0.78fr] lg:p-16">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-6 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Events
                  </div>
                  <h2 className="text-balance max-w-3xl text-5xl font-black leading-tight md:text-7xl">
                    The Bitzsznn Experience
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                    A night built for the people who want the music, the memories, the network, and the door that opens after the event.
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button href="/tickets">Buy tickets</Button>
                  <Button href={socialLinks.whatsapp} variant="ghost">
                    Partner with us
                  </Button>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/15 bg-black/30 p-6 backdrop-blur-md">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#111611]">
                    <EventIcon className="size-4" />
                    {upcomingEvent.date}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
                    <PinIcon className="size-4" />
                    {upcomingEvent.location}
                  </span>
                </div>
                <div className="mt-10 grid gap-4">
                  {eventHighlights.map((highlight) => (
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-semibold text-foreground" key={highlight}>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-grid-lines border-b border-border py-20 md:py-28" id="faq">
        <div className="container-shell">
          <div className="mx-auto mb-10 max-w-5xl">
            <div className="mb-6 w-fit rounded-full border border-border bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              FAQ
            </div>
            <h2 className="text-balance text-4xl font-black md:text-6xl">Find quick answers to common questions.</h2>
          </div>
          <FaqAccordion />
        </div>
      </MotionSection>

      <MotionSection className="py-20 md:py-28" id="contact">
        <div className="container-shell">
          <div className="grid gap-8 rounded-[28px] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] md:p-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2 className="text-balance text-4xl font-black leading-tight md:text-6xl">Bring Bitzsznn into your next moment.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Join the community, buy tickets, or talk to us about partnerships, hosting, activations, and cultural experiences.
              </p>
            </div>
            <div className="grid content-end gap-3">
              <Link
                className="group flex items-center justify-between rounded-2xl border border-border bg-white/5 p-5 transition hover:border-primary/50 hover:bg-white/10"
                href={socialLinks.whatsapp}
              >
                <span className="inline-flex items-center gap-3 font-bold">
                  <MessageCircle className="size-5 text-primary" />
                  Message on WhatsApp
                </span>
                <ArrowUpRight className="size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                className="group flex items-center justify-between rounded-2xl border border-border bg-white/5 p-5 transition hover:border-primary/50 hover:bg-white/10"
                href={socialLinks.instagram}
              >
                <span className="inline-flex items-center gap-3 font-bold">
                  <Instagram className="size-5 text-accent" />
                  Follow on Instagram
                </span>
                <ArrowUpRight className="size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </MotionSection>

      <footer className="border-t border-border py-8">
        <div className="container-shell flex flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>Bitzsznn. Vibes. Networking. Opportunity.</p>
          <p>Built around NYSC, entertainment, memories, connection, and transition.</p>
        </div>
      </footer>
    </main>
  );
}
