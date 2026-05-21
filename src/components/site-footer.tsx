import Link from "next/link";
import { Button } from "@/components/button";
import { socialLinks } from "@/data/site";

export function SiteFooter() {
  return (
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
              A youth cultural community for corps members, creatives, builders, artists, and storytellers shaping
              moments that move people.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[14px] font-bold uppercase text-[#459c0a] md:text-[17px]">Links</p>
              <div className="mt-3 grid gap-2 text-[16px] font-extralight text-white md:text-[17px]">
                <Link href="/services">Services</Link>
                <Link href="/events">Events</Link>
                <Link href="/community">Community</Link>
                <Link href="/about">About Us</Link>
              </div>
            </div>
            <div>
              <p className="font-mono text-[14px] font-bold uppercase text-[#459c0a] md:text-[17px]">Actions</p>
              <div className="mt-3 grid gap-2 text-[16px] font-extralight text-white md:text-[17px]">
                <a href={socialLinks.whatsapp}>Join the Community</a>
                <Link href="/events">View Events</Link>
                <Link href="/#contact">Contact Us</Link>
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
  );
}
