import { Globe2, Landmark, Scale, Sparkles, Wallet } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal, RevealGroup, RevealItem } from "../reveal";

const icons = [Landmark, Scale, Globe2, Wallet, Sparkles];

export function Trust({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y hairline bg-white/60">
      <div className="container-x py-12 md:py-16">
        <Reveal>
          <p className="eyebrow">{dict.trust.label}</p>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:mt-10 lg:grid-cols-5">
          {dict.trust.items.map((item, i) => {
            const Icon = icons[i] ?? Landmark;
            return (
              <RevealItem key={item.title} className="group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border hairline-gold bg-ivory text-champagne-dark transition-all duration-500 group-hover:-translate-y-1 group-hover:border-champagne group-hover:shadow-[0_12px_28px_-12px_rgba(161,140,112,0.5)]">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-navy sm:mt-4 sm:text-[0.95rem]">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{item.desc}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
