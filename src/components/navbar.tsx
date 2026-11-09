"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { localeNames, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { useContact } from "./contact-context";
import { LogoLockup } from "./logo";

const COOKIE = "omnigon-lang";

function setCookie(name: string, value: string) {
  globalThis.document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

export function LangSwitcher({ lang, dark = false }: { lang: Locale; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    setCookie(COOKIE, next);
    setOpen(false);
    const rest = pathname.replace(/^\/(en|ru|ar)/, "") || "/";
    router.push(`/${next}${rest === "/" ? "" : rest}`);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
          dark
            ? "border-white/20 text-ivory/80 hover:border-champagne-light hover:text-champagne-light"
            : "border-slate/15 text-slate hover:border-champagne hover:text-champagne-dark"
        }`}
      >
        <Globe size={15} />
        <span className="uppercase">{lang}</span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute end-0 z-50 min-w-36 overflow-hidden rounded-2xl border border-sand bg-white p-1.5 shadow-xl ${
                dark ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
              {locales.map((l) => (
                <li key={l}>
                  <button
                    role="option"
                    aria-selected={l === lang}
                    onClick={() => switchTo(l)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-start text-sm transition-colors ${
                      l === lang ? "bg-sand-light font-semibold text-navy" : "text-slate hover:bg-ivory"
                    }`}
                  >
                    {localeNames[l]}
                    {l === lang && <span className="h-1.5 w-1.5 rounded-full bg-champagne" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const contact = useContact();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#ai", label: dict.nav.ai },
    { href: "#process", label: dict.nav.process },
    { href: "#why", label: dict.nav.why },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_8px_32px_-16px_rgba(23,43,58,0.25)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href={`/${lang}`} aria-label="OMNIGON" className="shrink-0">
          <LogoLockup />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="gold-underline text-sm font-medium text-slate hover:text-navy">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitcher lang={lang} />
          <button onClick={contact.open} className="btn btn-primary hidden !px-5 !py-2.5 text-sm whitespace-nowrap lg:inline-flex">
            {dict.nav.contact}
          </button>
          <button
            className="-me-2 rounded-full p-2 text-navy lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={dict.nav.menu}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory lg:hidden"
          >
            <div className="container-x flex h-16 shrink-0 items-center justify-between">
              <LogoLockup />
              <button onClick={() => setMenuOpen(false)} aria-label={dict.nav.close} className="rounded-full p-2 text-navy">
                <X size={24} />
              </button>
            </div>
            <nav className="container-x mt-6 flex flex-1 flex-col gap-1 pb-10">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="flex items-center justify-between border-b hairline py-4 text-xl font-semibold text-navy sm:py-5 sm:text-2xl"
                >
                  {l.label}
                  <ArrowUpRight size={20} className="text-champagne rtl:-scale-x-100" />
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => {
                  setMenuOpen(false);
                  contact.open();
                }}
                className="btn btn-primary mt-auto w-full"
              >
                {dict.nav.contact}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
