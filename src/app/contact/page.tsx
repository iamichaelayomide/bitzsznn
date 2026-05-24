import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Bitzsznn | Brand Partnerships, Events & Community",
  description:
    "Contact Bitzsznn for brand partnerships, youth culture activations, NYSC events, community experiences, press, and event hosting enquiries.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#fbfff4] text-[#183814]">
      <section className="section-grid-lines pt-32 md:pt-40">
        <div className="container-shell figma-inner grid gap-10 py-[var(--space-section-md)] lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <p className="w-fit rounded-[14px] bg-[#d7e8d5] px-2 py-1 font-mono text-xs uppercase text-[#1d1d1d]">
              Contact us
            </p>
            <h1 className="hero-title mt-6 max-w-[680px] text-[#082005]">
              Let&apos;s build the room properly.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#40563d] md:text-lg">
              Reach out for brand partnerships, event hosting, community collaborations, artist activations, media requests, or anything else you want Bitzsznn to help shape.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
