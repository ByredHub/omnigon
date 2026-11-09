"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { useContact } from "./contact-context";
import { LangSwitcher } from "./navbar";
import { LogoMark, LogoWordmark } from "./logo";

export function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const contact = useContact();
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => null
  );
  const nav = [
    { href: "#services", label: dict.nav.services },
    { href: "#ai", label: dict.nav.ai },
    { href: "#process", label: dict.nav.process },
    { href: "#why", label: dict.nav.why },
  ];

  return (
    <footer className="bg-navy-deep text-ivory">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,2fr)_minmax(0,3fr)_minmax(0,2fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <LogoWordmark className="h-4 w-auto" />
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/55">{dict.footer.desc}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-champagne-light">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ivory/40">
              {dict.footer.navTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ivory/70 transition-colors hover:text-champagne-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ivory/40">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {dict.services.categories.map((c) => (
                <li key={c.id}>
                  <a href="#services" className="text-ivory/70 transition-colors hover:text-champagne-light">
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ivory/40">
              {dict.footer.contactTitle}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-ivory/55">{dict.footer.contactNote}</p>
            <button
              onClick={contact.open}
              className="btn btn-ghost-light mt-5 !px-5 !py-2.5 text-sm"
            >
              {dict.cta.button}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 text-xs text-ivory/40 sm:flex-row sm:items-center md:mt-14">
          <p>
            © {year ?? "—"} OMNIGON. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-ivory/40">{dict.footer.langLabel}:</span>
            <LangSwitcher lang={lang} dark />
          </div>
        </div>
      </div>
    </footer>
  );
}
