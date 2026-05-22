"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/button";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="container-shell">
        <nav className="flex min-h-14 items-center justify-between rounded-[18px] border border-white/10 bg-[rgba(17,22,17,0.82)] px-3 shadow-[var(--shadow-soft)] backdrop-blur-xl md:min-h-[78px] md:rounded-[20px] md:px-7">
          <Link aria-label="Bitzsznn home" className="relative h-[46px] w-[106px] shrink-0 overflow-hidden md:h-[54px] md:w-[124px]" href="/">
            {/* The Figma logo asset is intentionally cropped inside its frame. */}
            <Image
              alt="Bitzsznn"
              className="absolute -left-[21%] -top-[97%] h-[308%] w-[136%] max-w-none object-cover"
              height={166}
              src="/images/bitzsznn-logo.png"
              width={169}
            />
          </Link>

          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link
                className="relative transition duration-200 hover:text-foreground after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button className="min-h-11 px-5 py-2 text-sm" href="/events">
              View events
            </Button>
          </div>

          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-foreground md:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open ? (
          <div className="mt-2 rounded-[20px] border border-white/10 bg-[rgba(17,22,17,0.94)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl md:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/8 hover:text-foreground"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button className="mt-3 w-full" href="/events">
              View events
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
