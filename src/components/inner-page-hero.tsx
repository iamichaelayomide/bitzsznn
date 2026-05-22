import Image from "next/image";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

type InnerPageHeroProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: string;
  tone?: "light" | "dark" | "sage";
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
};

export function InnerPageHero({
  eyebrow,
  title,
  body,
  image,
  tone = "light",
  primaryCta,
  secondaryCta,
  children,
}: InnerPageHeroProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        "section-grid-lines relative isolate overflow-hidden pt-28 md:pt-36",
        isDark ? "min-h-[720px] bg-[#080b08] text-white" : "bg-white text-[#11210f]",
      )}
    >
      {image ? (
        <>
          <Image
            alt=""
            className="-z-20 object-cover"
            fill
            priority
            sizes="100vw"
            src={image}
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,11,8,0.48),rgba(8,11,8,0.78))]" />
        </>
      ) : null}

      <div
        className={cn(
          "container-shell relative z-10 flex min-h-[560px] flex-col items-center justify-center px-4 py-14 text-center md:min-h-[640px] md:px-12",
          tone === "sage" ? "gap-10" : "gap-7",
        )}
      >
        {eyebrow ? (
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-[0.26em]",
              isDark ? "text-white/70" : "text-[#4b8d16]",
            )}
          >
            {eyebrow}
          </p>
        ) : null}

        <div className="mx-auto max-w-5xl">
          <h1
            className={cn(
              "hero-title",
              isDark ? "text-white" : "text-[#183814]",
            )}
          >
            {title}
          </h1>
          {body ? (
            <p
              className={cn(
                "mx-auto mt-7 max-w-3xl text-base leading-8 md:text-lg",
                isDark ? "text-white/76" : "text-[#183814]/72",
              )}
            >
              {body}
            </p>
          ) : null}
        </div>

        {primaryCta || secondaryCta ? (
          <div className="flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row">
            {primaryCta ? (
              <Button className="w-full sm:w-auto" href={primaryCta.href} showIcon>
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button className="w-full sm:w-auto" href={secondaryCta.href} variant={isDark ? "ghost" : "secondary"}>
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}

export function GuideBand({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={cn("section-grid-lines bg-white text-[#183814]", className)} id={id}>
      <div className="container-shell px-4 py-16 md:px-12 md:py-24">{children}</div>
    </section>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#4b8d16]">
      {children}
    </p>
  );
}
