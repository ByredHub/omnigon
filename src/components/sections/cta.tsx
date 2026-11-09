"use client";

import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { useContact } from "../contact-context";
import { Reveal } from "../reveal";

export function CTA({ dict }: { dict: Dictionary }) {
  const contact = useContact();

  return (
    <section className="relative overflow-hidden py-20 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 100%, rgba(161,140,112,0.16), transparent 70%)",
        }}
      />
      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-6xl">
            {dict.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
            {dict.cta.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <button onClick={contact.open} className="btn btn-gold mt-8 w-full !px-9 !py-4 text-base sm:mt-10 sm:w-auto">
            {dict.cta.button}
            <ArrowRight size={17} className="rtl:-scale-x-100" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
