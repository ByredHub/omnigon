"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { useContact } from "../contact-context";
import { HeroCanvas } from "./hero-canvas";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ dict }: { dict: Dictionary }) {
  const contact = useContact();

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-20 md:pt-32 md:pb-24">
      {/* warm ambient glows */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(161,140,112,0.14), transparent 70%), radial-gradient(45% 40% at 15% 75%, rgba(232,228,220,0.9), transparent 70%)",
        }}
      />
      <HeroCanvas className="absolute inset-0 h-full w-full opacity-90" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="eyebrow"
          >
            {dict.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-navy sm:text-5xl md:text-7xl"
          >
            {dict.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.28, ease }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.44, ease }}
            className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          >
            <a href="#services" className="btn btn-primary w-full sm:w-auto">
              {dict.hero.primary}
              <ArrowRight size={16} className="rtl:-scale-x-100" />
            </a>
            <button onClick={contact.open} className="btn btn-ghost w-full sm:w-auto">
              {dict.hero.secondary}
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted sm:text-xs"
      >
        {dict.hero.scroll}
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
