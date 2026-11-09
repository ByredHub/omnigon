"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";

type Status = "idle" | "sending" | "success" | "error";

export function ContactModal({
  dict,
  open,
  onClose,
}: {
  dict: Dictionary["form"];
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    setStatus("idle");
    setErrors({});
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = dict.errors.name;
    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = dict.errors.email;
    if (!String(data.get("message") ?? "").trim()) next.message = dict.errors.message;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data.entries()),
          lang: document.documentElement.lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-slate/15 bg-white/70 px-4 py-3 text-base text-navy placeholder:text-muted/60 outline-none transition-colors focus:border-champagne sm:text-[0.9375rem]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={dict.title}
        >
          <div className="absolute inset-0 bg-navy/45 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-ivory shadow-2xl sm:rounded-3xl"
          >
            <div className="h-1 w-full bg-gradient-to-r from-champagne-light via-champagne to-champagne-light" />
            <button
              onClick={handleClose}
              aria-label={dict.title}
              className="absolute end-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-sand hover:text-navy"
            >
              <X size={18} />
            </button>

            <div className="max-h-[90svh] overflow-y-auto p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-champagne/15 text-champagne-dark">
                    <Check size={26} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">{dict.successTitle}</h3>
                  <p className="mt-2 text-muted">{dict.successText}</p>
                  <button onClick={() => setStatus("idle")} className="btn btn-primary mt-8">
                    {dict.again}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold tracking-tight text-navy">{dict.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{dict.subtitle}</p>

                  <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <input name="name" placeholder={dict.name} className={inputCls} aria-invalid={!!errors.name} />
                        {errors.name && <p className="mt-1.5 text-xs text-champagne-dark">{errors.name}</p>}
                      </div>
                      <div>
                        <input name="email" type="email" placeholder={dict.email} className={inputCls} aria-invalid={!!errors.email} />
                        {errors.email && <p className="mt-1.5 text-xs text-champagne-dark">{errors.email}</p>}
                      </div>
                    </div>
                    <input
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />
                    <input name="company" placeholder={dict.company} className={inputCls} />
                    <select name="topic" className={inputCls} defaultValue={dict.topics[0]}>
                      {dict.topics.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <div>
                      <textarea name="message" rows={4} placeholder={dict.message} className={`${inputCls} resize-none`} aria-invalid={!!errors.message} />
                      {errors.message && <p className="mt-1.5 text-xs text-champagne-dark">{errors.message}</p>}
                    </div>
                    {status === "error" && (
                      <p role="alert" className="rounded-xl border border-champagne/40 bg-champagne/10 px-4 py-3 text-sm text-navy">
                        {dict.errors.send}
                      </p>
                    )}
                    <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
                      {status === "sending" ? dict.sending : dict.submit}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
