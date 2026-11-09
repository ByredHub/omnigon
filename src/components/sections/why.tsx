import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal, RevealGroup, RevealItem } from "../reveal";

export function Why({ dict }: { dict: Dictionary }) {
  return (
    <section id="why" className="grain relative scroll-mt-20 overflow-hidden bg-navy-deep py-20 text-ivory md:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(55% 45% at 15% 15%, rgba(38,61,74,0.7), transparent 70%)",
        }}
      />
      <div className="container-x relative grid gap-10 md:gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">{dict.why.label}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
              {dict.why.title}
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="divide-y divide-white/10">
          {dict.why.items.map((item, i) => (
            <RevealItem key={item.title}>
              <div className="group flex items-start gap-4 py-6 transition-colors duration-500 first:pt-0 hover:bg-white/[0.03] sm:gap-6 sm:py-7 md:items-center">
                <span className="mt-0.5 shrink-0 font-mono text-sm text-champagne-light/70">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-ivory transition-colors duration-500 group-hover:text-champagne-light">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ivory/55">{item.desc}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-champagne-light opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 rtl:-scale-x-100 md:mt-0"
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
