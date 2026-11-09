"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { ContactModal } from "./contact-modal";

const ContactContext = createContext<{ open: () => void }>({ open: () => {} });

export function useContact() {
  return useContext(ContactContext);
}

export function ContactShell({
  children,
  dict,
}: {
  children: ReactNode;
  dict: Dictionary["form"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ open }}>
      {children}
      <ContactModal dict={dict} open={isOpen} onClose={close} />
    </ContactContext.Provider>
  );
}
