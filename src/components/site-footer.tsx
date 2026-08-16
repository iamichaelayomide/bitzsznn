import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { cultureEventPhotos, socialLinks } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#111] py-14 text-white md:py-20" id="contact">
      <p className="pointer-events-none absolute bottom-[-88px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[120px] leading-none text-[rgba(189,175,175,0.1)] md:text-[251px]">
        BITZSZNN
      </p>
      <div className="container-shell figma-inner relative z-10">
        <div className="relative mb-14 overflow-hidden rounded-[24px] border border-white/12 bg-[#d8f7d8] p-7 text-[#082005] md:p-10">
          <Image
            alt=""
            className="object-cover opacity-25"
            fill
            sizes="1320px"
            src={cultureEventPhotos[1]}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(216,247,216,0.96),rgba(216,247,216,0.78),rgba(216,247,216,0.92))]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#459c0a]">
                Before the next room opens
              </p>
              <h2 className="mt-3 max-w-[700px] text-[28px] font-semibold leading-[1.08] md:text-[40px]">
                Bring Bitzsznn to your people, your brand, or your city.
              </h2>
              <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[#30472d] md:text-[17px]">
                Partner on an experience, join the community list, or tell us what kind of room you want to build next.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button className="!bg-[#041102] !text-white shadow-none hover:!bg-[#10240c]" href="/contact" variant="secondary">
                Partner with us
              </Button>
              <Button href={socialLinks.whatsapp}>Join community</Button>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="max-w-[494px]">
            <h2 className="text-[30px] font-normal leading-[1.08] md:text-[44px]">
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
                <Link href="/platform">RoomPass</Link>
                <Link href="/community">Community</Link>
                <Link href="/about">About Us</Link>
              </div>
            </div>
            <div>
              <p className="font-mono text-[14px] font-bold uppercase text-[#459c0a] md:text-[17px]">Actions</p>
              <div className="mt-3 grid gap-2 text-[16px] font-extralight text-white md:text-[17px]">
                <a href={socialLinks.whatsapp}>Join the Community</a>
                <Link href="/events">View Events</Link>
                <Link href="/contact">Contact Us</Link>
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
          <p className="text-[14px] text-white">&copy; Bitzsznn 2026. All rights reserved.</p>
          <Button className="w-fit rounded-[20px] px-7 py-4 text-[17px]" href={socialLinks.whatsapp}>
            Join the community
          </Button>
        </div>
      </div>
    </footer>
  );
}
