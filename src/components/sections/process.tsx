"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal } from "../reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="scroll-mt-20 bg-sand-light/60 py-20 md:py-36">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{dict.process.label}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
            {dict.process.title}
          </h2>
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          {/* connecting line */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.6, ease }}
            className="absolute start-0 top-6 hidden h-px w-full origin-left bg-gradient-to-r from-champagne/10 via-champagne/60 to-champagne/10 rtl:origin-right lg:block"
          />

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
            {dict.process.steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease }}
                className="relative"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/50 bg-ivory font-mono text-sm font-semibold text-champagne-dark shadow-[0_0_0_8px_rgba(240,237,230,1)]">
                  {s.num}
                </div>
                <h3 className="mt-6 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
