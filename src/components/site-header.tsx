"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/button";
import { navItems, socialLinks } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="container-shell">
        <nav className="premium-surface flex min-h-14 items-center justify-between rounded-[16px] px-3 md:min-h-[70px] md:px-6">
          <Link aria-label="Bitzsznn home" className="relative h-[42px] w-[102px] shrink-0 overflow-hidden md:h-[48px] md:w-[116px]" href="/">
            {/* The Figma logo asset is intentionally cropped inside its frame. */}
            <Image
              alt="Bitzsznn"
              className="absolute -left-[21%] -top-[97%] h-[308%] w-[136%] max-w-none object-cover"
              height={166}
              src="/images/bitzsznn-logo.png"
              width={169}
            />
          </Link>

          <div className="hidden items-center gap-6 text-[13px] font-medium text-[#d8e5d3] md:flex">
            {navItems.map((item) => (
              <Link
                className="relative rounded-full px-2 py-2 transition duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8ff2c] after:absolute after:bottom-1 after:left-2 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-[calc(100%-1rem)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button className="min-h-11 rounded-[14px] px-5 py-2 text-sm" href={socialLinks.whatsapp}>
              Join community
            </Button>
          </div>

          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="grid size-10 place-items-center rounded-[14px] border border-white/10 bg-white/5 text-foreground transition hover:bg-white/10 md:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="size-5" strokeWidth={1.8} /> : <Menu className="size-5" strokeWidth={1.8} />}
          </button>
        </nav>

        {open ? (
          <div className="premium-surface mt-2 rounded-[16px] p-3 md:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  className="rounded-[12px] px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/8 hover:text-foreground"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button className="mt-3 w-full" href={socialLinks.whatsapp}>
              Join community
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
