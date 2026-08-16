"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { socialLinks } from "@/data/site";

const purposes = ["Brand partnership", "Host an event", "Join community", "Press or media", "Other"];

export function ContactForm() {
  const [purpose, setPurpose] = useState(purposes[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`${purpose} enquiry from ${name || "Bitzsznn website"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPurpose: ${purpose}\n\n${message}`);
    return `mailto:${socialLinks.email}?subject=${subject}&body=${body}`;
  }, [email, message, name, purpose]);

  return (
    <form className="rounded-[28px] border border-[#d8e4d2] bg-[#fbfff7] p-5 shadow-[0_20px_70px_rgba(24,56,20,0.08)] md:p-8">
      <div>
        <label className="text-sm font-semibold text-[#082005]" htmlFor="name">Name</label>
        <input className="mt-2 min-h-12 w-full rounded-[16px] border border-[#d8e4d2] bg-white px-4 text-[#082005] outline-none transition focus:border-[#459c0a] focus:ring-4 focus:ring-[#b8ff2c]/30" id="name" onChange={(event) => setName(event.target.value)} placeholder="Your name" value={name} />
      </div>
      <div className="mt-4">
        <label className="text-sm font-semibold text-[#082005]" htmlFor="email">Email</label>
        <input className="mt-2 min-h-12 w-full rounded-[16px] border border-[#d8e4d2] bg-white px-4 text-[#082005] outline-none transition focus:border-[#459c0a] focus:ring-4 focus:ring-[#b8ff2c]/30" id="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" value={email} />
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-[#082005]">Purpose</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {purposes.map((item) => (
            <button
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${purpose === item ? "border-[#459c0a] bg-[#459c0a] text-[#061006]" : "border-[#d8e4d2] bg-white text-[#40563d] hover:border-[#459c0a]"}`}
              key={item}
              onClick={() => setPurpose(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <label className="text-sm font-semibold text-[#082005]" htmlFor="message">Message</label>
        <textarea className="mt-2 min-h-36 w-full resize-y rounded-[18px] border border-[#d8e4d2] bg-white px-4 py-3 text-[#082005] outline-none transition focus:border-[#459c0a] focus:ring-4 focus:ring-[#b8ff2c]/30" id="message" onChange={(event) => setMessage(event.target.value)} placeholder="Tell us what you want to build, host, sponsor, or ask." value={message} />
      </div>
      <a className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[#041102] px-6 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#10240c] sm:w-fit" href={mailto}>
        Send enquiry <ArrowRight className="size-4" strokeWidth={1.8} />
      </a>
    </form>
  );
}
