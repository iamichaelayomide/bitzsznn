"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Copy, ImagePlus, QrCode, Ticket, TrendingUp } from "lucide-react";

const starterTiers = [
  { name: "Early Bird", price: 5000, sold: 42 },
  { name: "Regular", price: 10000, sold: 84 },
  { name: "VIP Table", price: 150000, sold: 7 },
];

export function PlatformBuilder() {
  const [eventName, setEventName] = useState("Soft Life Link-Up");
  const [city, setCity] = useState("Lagos, Nigeria");
  const [code, setCode] = useState("SOFTLIFE25");
  const [tier, setTier] = useState(starterTiers[1].name);

  const activeTier = starterTiers.find((item) => item.name === tier) ?? starterTiers[1];
  const totalSales = useMemo(() => starterTiers.reduce((sum, item) => sum + item.price * item.sold, 0), []);
  const link = `roompass.app/${eventName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "event"}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[30px] border border-[#d8e4d2] bg-[#fbfff7] p-5 md:p-7">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-[#082005]">
            Event name
            <input className="min-h-12 rounded-[16px] border border-[#d8e4d2] bg-white px-4 outline-none focus:border-[#459c0a] focus:ring-4 focus:ring-[#b8ff2c]/30" onChange={(event) => setEventName(event.target.value)} value={eventName} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#082005]">
            City
            <input className="min-h-12 rounded-[16px] border border-[#d8e4d2] bg-white px-4 outline-none focus:border-[#459c0a] focus:ring-4 focus:ring-[#b8ff2c]/30" onChange={(event) => setCity(event.target.value)} value={city} />
          </label>
          <div className="rounded-[22px] border border-dashed border-[#9ec28f] bg-white p-5">
            <div className="grid size-12 place-items-center rounded-full bg-[#d8f7d8] text-[#082005]">
              <ImagePlus className="size-5" />
            </div>
            <p className="mt-4 font-semibold text-[#082005]">Upload flyer or cover art</p>
            <p className="mt-2 text-sm leading-6 text-[#40563d]">Drag in a flyer, crop it for web/mobile, and RoomPass turns it into a shareable ticket page.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#082005]">Ticket tier</p>
            <div className="mt-3 grid gap-2">
              {starterTiers.map((item) => (
                <button className={`flex items-center justify-between rounded-[18px] border p-4 text-left transition ${tier === item.name ? "border-[#459c0a] bg-[#d8f7d8]" : "border-[#d8e4d2] bg-white hover:border-[#459c0a]"}`} key={item.name} onClick={() => setTier(item.name)} type="button">
                  <span className="font-semibold text-[#082005]">{item.name}</span>
                  <span className="text-sm font-bold text-[#459c0a]">NGN {item.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-[#082005]">
            Promoter code
            <input className="min-h-12 rounded-[16px] border border-[#d8e4d2] bg-white px-4 uppercase outline-none focus:border-[#459c0a] focus:ring-4 focus:ring-[#b8ff2c]/30" onChange={(event) => setCode(event.target.value.toUpperCase())} value={code} />
          </label>
        </div>
      </div>

      <div className="rounded-[30px] bg-[#0f1c07] p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.24)] md:p-7">
        <div className="grid gap-5 md:grid-cols-[0.85fr_1fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-[24px]">
            <Image alt="" className="object-cover" fill sizes="420px" src="/images/community-party-2.png" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0.05),rgba(8,11,8,0.72))]" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="rounded-full bg-[#b8ff2c] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#061006]">Live preview</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight">{eventName}</h3>
              <p className="mt-2 text-sm text-white/78">{city}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-[22px] border border-white/12 bg-white/8 p-5">
              <p className="text-sm text-white/68">Shareable event link</p>
              <div className="mt-3 flex items-center justify-between gap-3 rounded-[16px] bg-white px-4 py-3 text-[#082005]">
                <span className="truncate text-sm font-semibold">{link}</span>
                <Copy className="size-4 shrink-0" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric icon={Ticket} label="Selected ticket" value={activeTier.name} />
              <Metric icon={QrCode} label="Promo code" value={code || "CODE"} />
              <Metric icon={TrendingUp} label="Tracked sales" value={`NGN ${totalSales.toLocaleString()}`} wide />
            </div>
            <div className="mt-auto rounded-[22px] bg-[#d8f7d8] p-5 text-[#082005]">
              <p className="font-semibold">Organizer dashboard</p>
              <p className="mt-2 text-sm leading-6 text-[#40563d]">Track sales by ticket tier, promoter code, city, and channel. Export attendees and scan QR codes at the door.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, wide = false }: { icon: typeof Ticket; label: string; value: string; wide?: boolean }) {
  return (
    <div className={`rounded-[20px] border border-white/12 bg-white/8 p-4 ${wide ? "sm:col-span-2" : ""}`}>
      <Icon className="size-5 text-[#b8ff2c]" />
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/58">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
