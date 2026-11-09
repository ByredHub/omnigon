"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Cpu, X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal } from "../reveal";

const ease = [0.22, 1, 0.36, 1] as const;

function FlowDiagram({ labels }: { labels: Dictionary["ai"]["nodes"] }) {
  const nodes = [labels.intake, labels.classify, labels.decide, labels.execute, labels.report];
  return (
    <div className="relative">
      <svg viewBox="0 0 560 120" className="w-full" role="img" aria-label="AI workflow diagram">
        <defs>
          <linearGradient id="flowline" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a18c70" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#a18c70" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a18c70" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M40 60 C 120 20, 180 100, 280 60 S 440 20, 520 60"
          fill="none"
          stroke="url(#flowline)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="animate-[dash_20s_linear_infinite]"
        />
        {nodes.map((n, i) => {
          const x = 40 + (i * 480) / (nodes.length - 1);
          const y = i % 2 === 0 ? 60 : 60;
          return (
            <g key={n}>
              <circle cx={x} cy={y} r="20" fill="rgba(255,255,255,0.04)" stroke="rgba(161,140,112,0.5)" />
              <circle cx={x} cy={y} r="4" fill="#a18c70" />
              <text
                x={x}
                y={y + 38}
                textAnchor="middle"
                fill="rgba(232,228,220,0.75)"
                fontSize="11"
                fontFamily="inherit"
              >
                {n}
              </text>
            </g>
          );
        })}
      </svg>
      <style>{`@keyframes dash { to { stroke-dashoffset: -280; } }`}</style>
    </div>
  );
}

export function AISection({ dict }: { dict: Dictionary }) {
  const [after, setAfter] = useState(false);
  const items = after ? dict.ai.afterItems : dict.ai.beforeItems;

  return (
    <section id="ai" className="grain relative scroll-mt-20 overflow-hidden bg-navy py-20 text-ivory md:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 80% 20%, rgba(161,140,112,0.16), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(38,61,74,0.8), transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">{dict.ai.label}</p>
        </Reveal>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-end">
          <Reveal delay={0.1}>
            <h2 className="max-w-lg text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
              {dict.ai.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md text-base leading-relaxed text-sand/80">{dict.ai.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid min-w-0 gap-6 md:mt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* before / after card */}
          <Reveal delay={0.15} className="min-w-0">
            <div className="glass-dark overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-5">
                <div className="grid w-full grid-cols-2 gap-1 rounded-full border border-white/15 p-1 sm:flex sm:w-auto">
                  {[dict.ai.before, dict.ai.after].map((label, i) => (
                    <button
                      key={label}
                      onClick={() => setAfter(i === 1)}
                      aria-pressed={after === (i === 1)}
                      className={`relative rounded-full px-3 py-2 text-center text-xs font-semibold leading-tight transition-colors duration-500 sm:px-4 sm:text-sm ${
                        after === (i === 1) ? "text-navy" : "text-ivory/70 hover:text-ivory"
                      }`}
                    >
                      {after === (i === 1) && (
                        <motion.span
                          layoutId="ba-pill"
                          className="absolute inset-0 rounded-full bg-champagne"
                          transition={{ duration: 0.5, ease }}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  ))}
                </div>
                <Cpu size={20} className="hidden shrink-0 text-champagne-light sm:block" />
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={after ? "after" : "before"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease }}
                    className="space-y-4"
                  >
                    {items.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            after ? "bg-champagne/25 text-champagne-light" : "bg-white/10 text-ivory/50"
                          }`}
                        >
                          {after ? <Check size={12} /> : <X size={12} />}
                        </span>
                        <span className={after ? "text-ivory" : "text-ivory/60"}>{t}</span>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* flow diagram */}
          <Reveal delay={0.25} className="flex min-w-0 items-center">
            <div className="glass-dark w-full rounded-3xl p-5 sm:p-6 md:p-8">
              <FlowDiagram labels={dict.ai.nodes} />
              <p className="mt-6 text-center text-sm text-ivory/60">{dict.ai.subtitle.split(".")[0]}.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
