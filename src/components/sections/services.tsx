"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { useContact } from "../contact-context";
import { Reveal } from "../reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Services({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState(0);
  const contact = useContact();
  const cats = dict.services.categories;
  const cat = cats[active];

  return (
    <section id="services" className="scroll-mt-20 overflow-hidden py-20 md:py-36">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{dict.services.label}</p>
        </Reveal>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.1}>
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
              {dict.services.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md text-base leading-relaxed text-muted">{dict.services.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid min-w-0 gap-8 md:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* category rail */}
          <Reveal delay={0.15} className="min-w-0">
            <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {cats.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`group relative w-[78vw] max-w-72 shrink-0 snap-start rounded-2xl border p-5 text-start transition-all duration-500 lg:w-auto lg:max-w-none lg:p-6 ${
                    i === active
                      ? "border-champagne/50 bg-white shadow-[0_20px_50px_-24px_rgba(23,43,58,0.35)]"
                      : "hairline border bg-transparent hover:border-champagne/40 hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className={`font-mono text-xs tracking-widest ${
                        i === active ? "text-champagne-dark" : "text-muted/70"
                      }`}
                    >
                      {c.num}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className={`transition-all duration-500 rtl:-scale-x-100 ${
                        i === active ? "text-champagne opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </div>
                  <h3 className={`mt-2 text-lg font-bold ${i === active ? "text-navy" : "text-slate"}`}>
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{c.desc}</p>
                  {i === active && (
                    <motion.span
                      layoutId="cat-indicator"
                      className="absolute inset-y-4 start-0 w-[3px] rounded-full bg-champagne"
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          {/* items panel */}
          <div className="relative min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease }}
                className="grid content-start gap-4 sm:grid-cols-2"
              >
                {cat.items.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={contact.open}
                    className={`group relative flex min-w-0 flex-col rounded-2xl border bg-white p-5 text-start transition-all duration-500 hover:-translate-y-1.5 hover:border-champagne/50 hover:shadow-[0_24px_50px_-24px_rgba(23,43,58,0.4)] sm:p-6 ${
                      i === 0 ? "hairline-gold sm:col-span-2" : "hairline"
                    }`}
                  >
                    <h4 className="flex items-start justify-between gap-3 font-bold text-navy">
                      <span className="min-w-0 break-words">{item.title}</span>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-champagne opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                      />
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-champagne-dark opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {dict.services.explore}
                    </span>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
